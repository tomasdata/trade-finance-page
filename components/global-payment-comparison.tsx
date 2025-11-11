"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import creditData from "@/data/credit_data.json"

interface CreditDataItem {
  survey_year: number
  survey_month: number
  country: string
  avg_days_beyond_terms: number | null
}

export function GlobalPaymentComparison({ onViewMore }: { onViewMore?: () => void }) {
  // Clasificar países por región
  const lacCountries = ["Mexico", "Brazil", "Chile", "Colombia", "Peru", "Argentina", "Venezuela", "Ecuador"]
  const asiaCountries = ["China", "Japan", "South Korea", "Taiwan", "India", "Singapore", "Malaysia", "Indonesia"]
  const menaCountries = ["UAE", "Saudi Arabia", "Egypt", "Turkey", "Israel", "Lebanon"]
  const otherCountries = ["United States", "Canada", "Germany", "France", "United Kingdom", "Italy", "Poland", "Spain"]

  // Calcular promedio por región (2024-2025 para datos recientes)
  const calculateRegionAverage = (countries: string[]) => {
    const regionData = (creditData.data as CreditDataItem[]).filter(
      item => countries.includes(item.country) && 
      item.survey_year >= 2024 && 
      item.avg_days_beyond_terms !== null
    )
    
    if (regionData.length === 0) return 0
    
    const sum = regionData.reduce((acc, item) => acc + (item.avg_days_beyond_terms || 0), 0)
    return Math.round((sum / regionData.length) * 10) / 10
  }

  const chartData = [
    {
      region: "América Latina",
      days: calculateRegionAverage(lacCountries),
      isLAC: true,
      samples: (creditData.data as CreditDataItem[]).filter(
        item => lacCountries.includes(item.country) && item.survey_year >= 2024
      ).length
    },
    {
      region: "Asia",
      days: calculateRegionAverage(asiaCountries),
      isLAC: false,
      samples: (creditData.data as CreditDataItem[]).filter(
        item => asiaCountries.includes(item.country) && item.survey_year >= 2024
      ).length
    },
    {
      region: "MENA",
      days: calculateRegionAverage(menaCountries),
      isLAC: false,
      samples: (creditData.data as CreditDataItem[]).filter(
        item => menaCountries.includes(item.country) && item.survey_year >= 2024
      ).length
    },
    {
      region: "Norteamérica & Europa",
      days: calculateRegionAverage(otherCountries),
      isLAC: false,
      samples: (creditData.data as CreditDataItem[]).filter(
        item => otherCountries.includes(item.country) && item.survey_year >= 2024
      ).length
    },
  ].filter(item => item.days > 0)

  const lacData = chartData.find(item => item.isLAC)
  const globalAvg = chartData.reduce((sum, item) => sum + item.days, 0) / chartData.length

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-900 shadow-xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Globe className="h-6 w-6 text-blue-600" />
              Retrasos en Pagos Comerciales: Comparación Global
            </CardTitle>
            <CardDescription>
              Días promedio de retraso en pagos más allá de términos acordados por región (2024-2025)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="region" 
                className="text-xs"
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'Días de retraso', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} días (${props.payload.samples} observaciones)`,
                  'Promedio'
                ]}
              />
              <Bar dataKey="days" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isLAC ? "hsl(217, 91%, 60%)" : "hsl(215, 20%, 65%)"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">América Latina</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {lacData?.days || 0} días
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {lacData && lacData.days > globalAvg 
                ? `+${Math.round((lacData.days - globalAvg) * 10) / 10} vs promedio global`
                : 'Mejor que promedio global'
              }
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-muted-foreground mb-1">Promedio Global</div>
            <div className="text-2xl font-bold">
              {Math.round(globalAvg * 10) / 10} días
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {chartData.length} regiones analizadas
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">Mejor Región</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-400">
              {chartData.reduce((min, item) => item.days < min.days ? item : min).region}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {chartData.reduce((min, item) => item.days < min.days ? item : min).days} días promedio
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
          <div className="flex items-start gap-2">
            <div className="flex-1 text-sm text-muted-foreground">
              <strong className="text-foreground">Contexto:</strong> Los retrasos en pagos reflejan tensiones 
              en el flujo de efectivo comercial y dificultades de acceso a trade finance. América Latina muestra 
              retrasos {lacData && lacData.days > globalAvg ? "superiores" : "similares"} al promedio global, 
              indicando la necesidad de mejores instrumentos de financiamiento.
            </div>
          </div>
        </div>

        {onViewMore && (
          <Button 
            onClick={onViewMore} 
            className="w-full gap-2"
            variant="outline"
          >
            Ver análisis detallado por país
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        <div className="text-xs text-muted-foreground italic text-center">
          Fuente: {creditData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
