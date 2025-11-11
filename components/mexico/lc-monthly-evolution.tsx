"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import monthlyData from "@/data/mexico/04_monthly_evolution_data.json"

export function LCMonthlyEvolution() {
  const chartData = monthlyData.data.map((item: any) => ({
    ...item,
    date: new Date(item.year_month).toLocaleDateString('es-MX', { year: 'numeric', month: 'short' }),
  }))

  const firstValue = chartData[0].lc_usd
  const lastValue = chartData[chartData.length - 1].lc_usd
  const growth = ((lastValue / firstValue - 1) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Evolución Mensual de Cartas de Crédito
        </CardTitle>
        <CardDescription>
          Serie temporal enero 2022 - agosto 2025 (USD millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={Math.floor(chartData.length / 8)}
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'USD Millones', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`USD ${value.toFixed(1)} M`, 'LC']}
              />
              <Line 
                type="monotone" 
                dataKey="lc_usd" 
                stroke="hsl(142, 76%, 36%)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Crecimiento 2022-2025</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{growth.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">CAGR ~3.8%</div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">Promedio Mensual</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              USD {(chartData.reduce((sum: number, d: any) => sum + d.lc_usd, 0) / chartData.length).toFixed(0)}M
            </div>
            <div className="text-xs text-muted-foreground mt-1">2022-2025</div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
            <div className="text-xs text-muted-foreground mb-1">Agosto 2025</div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              USD {lastValue.toFixed(0)}M
            </div>
            <div className="text-xs text-muted-foreground mt-1">Último dato</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Nearshoring Moderado:</strong> Las LC crecieron 7.7% desde 2023, 
            pero esto queda muy por debajo del boom de IED (+19.3%). Esto sugiere que las nuevas inversiones 
            nearshoring usan otros instrumentos (open account, financiamiento directo) o aún no se reflejan en LC.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {monthlyData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
