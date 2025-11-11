"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Shield } from "lucide-react"
import nplData from "@/data/brazil/06_npl_analysis_data.json"

const COLORS = ["hsl(142, 76%, 36%)", "hsl(47, 96%, 53%)", "hsl(24, 95%, 53%)"]

const NPL_LABELS: { [key: string]: string } = {
  npl_ratio_15d: "NPL >15 días",
  npl_ratio_inadim: "NPL Inadimplente",
  problem_ratio: "Problem Ratio",
}

export function NPLAnalysisChart() {
  const chartData = nplData.data.map((item: any) => ({
    ...item,
    name: NPL_LABELS[item.indicator] || item.indicator,
    value: item.ratio,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Análisis de Calidad de Cartera (NPL)
        </CardTitle>
        <CardDescription>
          Indicadores de morosidad de trade finance brasileño
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                angle={-15}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'Ratio (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Ratio']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Excelente Calidad de Cartera:</strong> Con un NPL de 0.75% (>15 días), 
            el trade finance brasileño demuestra una calidad crediticia excepcional. Esto refleja el carácter garantizado 
            de las operaciones (cartas de crédito, mercancías) y el análisis riguroso de riesgo.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {nplData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
