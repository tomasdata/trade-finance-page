"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Calendar } from "lucide-react"
import seasonalityData from "@/data/mexico/03_lc_seasonality_data.json"

const MONTH_NAMES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export function LCSeasonality() {
  const chartData = seasonalityData.data.map((item: any) => ({
    ...item,
    monthName: MONTH_NAMES[item.month - 1],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-orange-600" />
          Estacionalidad de Cartas de Crédito
        </CardTitle>
        <CardDescription>
          Índice de estacionalidad por mes (promedio = 100)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="monthName" 
                className="text-xs"
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'Índice (100 = promedio)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `Índice: ${value.toFixed(1)} (USD ${props.payload.avg_lc_usd.toFixed(1)}M)`,
                  'Estacionalidad'
                ]}
              />
              <Bar dataKey="index" radius={[8, 8, 0, 0]}>
                {chartData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.index >= 100 ? "hsl(142, 76%, 36%)" : "hsl(220, 13%, 60%)"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">Picos Estacionales</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-400">Oct-Nov</div>
            <div className="text-xs text-muted-foreground mt-1">+7-10% sobre promedio</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Meses Bajos</div>
            <div className="text-lg font-bold">Ene-Feb</div>
            <div className="text-xs text-muted-foreground mt-1">-5-7% bajo promedio</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Patrón Claro:</strong> Las LC alcanzan su pico en octubre-noviembre, 
            preparando inventarios para la temporada navideña y Buen Fin. Enero-febrero son los meses más bajos 
            post-fiestas. Este patrón es consistente con el ciclo retail de México.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {seasonalityData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
