"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp } from "lucide-react"
import annualData from "@/data/peru/04_annual_growth_data.json"

export function AnnualEvolution() {
  const firstValue = annualData.data[0].amount_usd
  const lastValue = annualData.data[annualData.data.length - 1].amount_usd
  const years = annualData.data.length - 1
  const cagr = (Math.pow(lastValue / firstValue, 1 / years) - 1) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Evolución Anual de Trade Finance
        </CardTitle>
        <CardDescription>
          Cartera anual 2010-2024 (USD millones) y tasas de crecimiento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={annualData.data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="anio" 
                className="text-xs"
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
                formatter={(value: number, name: string) => [
                  name === 'amount_usd' ? `USD ${value.toFixed(0)}M` : `${value.toFixed(1)}%`,
                  name === 'amount_usd' ? 'Cartera' : 'YoY Growth'
                ]}
              />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="amount_usd" 
                stroke="hsl(142, 76%, 36%)" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">CAGR 2010-2024</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{cagr.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">Crecimiento anual</div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Recuperación 2021-22</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">+27.8%</div>
            <div className="text-xs text-muted-foreground mt-1">Post-COVID (líder LAC)</div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
            <div className="text-xs text-muted-foreground mb-1">Cartera 2024</div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              USD {lastValue.toFixed(0)}M
            </div>
            <div className="text-xs text-muted-foreground mt-1">Valor actual</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Recuperación Excepcional Post-COVID:</strong> Perú experimentó el 
            rebote más fuerte de LAC (+27.8% en 2021-22), impulsado por exportaciones mineras (cobre, oro) y 
            agrícolas (café, palta, arándanos). Aunque el CAGR de largo plazo es modesto (2.3%), la resiliencia 
            reciente es notable.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {annualData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
