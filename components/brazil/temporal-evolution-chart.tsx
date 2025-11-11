"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import temporalData from "@/data/brazil/05_temporal_evolution_data.json"

export function TemporalEvolutionChart() {
  const chartData = temporalData.data.map((item: any) => ({
    ...item,
    year: new Date(item.data_base).getFullYear(),
    month: new Date(item.data_base).getMonth() + 1,
    date: new Date(item.data_base).toLocaleDateString('es-BR', { year: 'numeric', month: 'short' }),
  }))

  // Calculate CAGR
  const firstValue = chartData[0].carteira_ativa
  const lastValue = chartData[chartData.length - 1].carteira_ativa
  const years = chartData.length / 12
  const cagr = (Math.pow(lastValue / firstValue, 1 / years) - 1) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Evolución Temporal de la Cartera de Trade Finance
        </CardTitle>
        <CardDescription>
          Cartera activa mensual 2012-2024 (BRL miles de millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={Math.floor(chartData.length / 12)}
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'BRL Miles de Millones', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`BRL ${value.toFixed(2)} bn`, 'Cartera']}
              />
              <Line 
                type="monotone" 
                dataKey="carteira_ativa" 
                stroke="hsl(142, 76%, 36%)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">CAGR 2012-2024</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{cagr.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">Crecimiento anual compuesto</div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Valor Actual (2024)</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              BRL {lastValue.toFixed(1)}bn
            </div>
            <div className="text-xs text-muted-foreground mt-1">Cartera activa</div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
            <div className="text-xs text-muted-foreground mb-1">Crecimiento Total</div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              {((lastValue / firstValue - 1) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">2012-2024</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Tendencia:</strong> Crecimiento sostenido del 4.3% anual, 
            mostrando resiliencia durante COVID-19 (2020-2021). La cartera de trade finance en Brasil ha 
            demostrado ser un instrumento contracíclico durante períodos de volatilidad económica.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {temporalData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
