"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, AlertCircle } from "lucide-react"
import creditData from "@/data/credit_data.json"

interface CreditDataItem {
  survey_year: number
  survey_month: number
  country: string
  avg_days_beyond_terms: number | null
  payment_delays_increasing_pct: number | null
}

export function CreditDelaysChart() {
  // Filtrar datos de LAC para mostrar días promedio de retraso
  const lacCountries = ["Mexico", "Brazil", "Chile", "Colombia", "Peru", "Argentina"]
  
  // Agrupar por país y calcular promedio de retrasos en 2024-2025
  const processedData = lacCountries.map(country => {
    const countryData = (creditData.data as CreditDataItem[]).filter(
      item => item.country === country && 
      item.survey_year >= 2024 && 
      item.avg_days_beyond_terms !== null
    )
    
    if (countryData.length === 0) return null
    
    const avgDays = countryData.reduce((sum, item) => sum + (item.avg_days_beyond_terms || 0), 0) / countryData.length
    const avgIncreasing = countryData.reduce((sum, item) => sum + (item.payment_delays_increasing_pct || 0), 0) / countryData.length
    
    return {
      country,
      avgDays: Math.round(avgDays * 10) / 10,
      increasing: Math.round(avgIncreasing * 10) / 10,
    }
  }).filter(Boolean)

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-slate-950">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Retrasos en Pagos Comerciales - LAC
            </CardTitle>
            <CardDescription>
              Días promedio de retraso más allá de términos acordados (2024-2025)
            </CardDescription>
          </div>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="country" 
                className="text-xs"
                angle={-45}
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
                formatter={(value: number) => [`${value} días`, '']}
              />
              <Bar 
                dataKey="avgDays" 
                fill="hsl(217, 91%, 60%)" 
                radius={[6, 6, 0, 0]}
                name="Días promedio de retraso"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
            <div className="text-xs text-muted-foreground mb-1">País con mayor retraso</div>
            <div className="text-lg font-bold text-orange-700 dark:text-orange-400">
              {processedData.length > 0 
                ? processedData.reduce((max, item) => item && item.avgDays > (max?.avgDays || 0) ? item : max).country
                : 'N/A'}
            </div>
          </div>
          
          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">País con menor retraso</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-400">
              {processedData.length > 0 
                ? processedData.reduce((min, item) => item && item.avgDays < (min?.avgDays || Infinity) ? item : min).country
                : 'N/A'}
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
