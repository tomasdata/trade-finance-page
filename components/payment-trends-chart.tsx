"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingDown, Info } from "lucide-react"
import creditData from "@/data/credit_data.json"

interface CreditDataItem {
  survey_year: number
  survey_month: number
  country: string
  payment_delays_increasing_pct: number | null
}

export function PaymentTrendsChart() {
  // Datos de tendencia temporal para países seleccionados
  const selectedCountries = ["Mexico", "Brazil", "Chile", "Colombia"]
  
  // Agrupar por año-mes
  const monthlyData = new Map<string, any>()
  
  ;(creditData.data as CreditDataItem[]).forEach(item => {
    if (!selectedCountries.includes(item.country) || !item.payment_delays_increasing_pct) return
    
    const key = `${item.survey_year}-${String(item.survey_month).padStart(2, '0')}`
    
    if (!monthlyData.has(key)) {
      monthlyData.set(key, {
        period: key,
        year: item.survey_year,
        month: item.survey_month,
      })
    }
    
    monthlyData.get(key)![item.country] = item.payment_delays_increasing_pct
  })
  
  // Convertir a array y ordenar
  const chartData = Array.from(monthlyData.values())
    .filter(d => d.year >= 2024)
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })
    .slice(0, 12) // Últimos 12 meses con datos
  
  const colors = {
    Mexico: "#10b981",
    Brazil: "#3b82f6",
    Chile: "#8b5cf6",
    Colombia: "#f59e0b",
  }

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-900">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-purple-600" />
              Tendencia de Retrasos en Pagos
            </CardTitle>
            <CardDescription>
              Porcentaje de empresas reportando incremento en retrasos (2024-2025)
            </CardDescription>
          </div>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="period" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                className="text-xs"
                label={{ value: '% empresas', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              
              {selectedCountries.map((country) => (
                <Line
                  key={country}
                  type="monotone"
                  dataKey={country}
                  stroke={colors[country as keyof typeof colors]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name={country}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <strong>Nota:</strong> Un porcentaje alto indica que más empresas están experimentando incrementos 
              en los tiempos de cobro, lo que refleja tensiones en flujos de efectivo comercial y puede señalar 
              dificultades en acceso a trade finance.
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground italic">
          Fuente: {creditData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
