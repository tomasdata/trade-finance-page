"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import annualData from "@/data/chile/03_annual_summary_data.json"

export function AnnualEvolutionChart() {
  const firstValue = annualData.data[0].amount_total
  const lastValue = annualData.data[annualData.data.length - 1].amount_total
  const years = annualData.data.length
  const cagr = (Math.pow(lastValue / firstValue, 1 / years) - 1) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-teal-600" />
          Evolución Anual de Trade Finance
        </CardTitle>
        <CardDescription>
          Cartera total y por moneda 2015-2024 (CLP trillones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={annualData.data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="Anho" 
                className="text-xs"
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'CLP Trillones', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => `CLP ${value.toFixed(2)} T`}
              />
              <Legend />
              <Line type="monotone" dataKey="amount_total" stroke="hsl(217, 91%, 60%)" strokeWidth={2} name="Total" />
              <Line type="monotone" dataKey="amount_fx" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Moneda Extranjera" />
              <Line type="monotone" dataKey="amount_clp" stroke="hsl(24, 95%, 53%)" strokeWidth={2} name="Peso Chileno" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
            <div className="text-xs text-muted-foreground mb-1">CAGR 2015-2024</div>
            <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">{cagr.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">Crecimiento anual</div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Valor 2024</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              CLP {lastValue.toFixed(1)}T
            </div>
            <div className="text-xs text-muted-foreground mt-1">Cartera total</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Crecimiento Total</div>
            <div className="text-2xl font-bold">
              {((lastValue / firstValue - 1) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">2015-2024</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Tendencia:</strong> Crecimiento moderado del 2.9% anual, más lento 
            que Brasil o Perú. La estabilidad económica y cambiaria de Chile reduce la necesidad de instrumentos 
            de cobertura, pero también limita el dinamismo del sector.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {annualData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
