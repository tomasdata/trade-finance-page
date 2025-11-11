"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"
import { Clock } from "lucide-react"
import maturityData from "@/data/brazil/04_maturity_structure_data.json"

const GRADIENT_COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(142, 76%, 36%)",
  "hsl(47, 96%, 53%)",
  "hsl(24, 95%, 53%)",
  "hsl(263, 70%, 50%)",
  "hsl(340, 82%, 52%)",
]

export default function MaturityStructureChart() {
  const chartData = maturityData.data.map((item: any) => ({
    ...item,
    name: item.maturity_bucket,
    value: item.pct,
    bn: item.amount,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-teal-600" />
          Estructura de Vencimientos - Análisis Temporal
        </CardTitle>
        <CardDescription>
          Distribución de la cartera por plazos (muestra ciclo típico de trade finance)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
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
                label={{ value: 'Participación (%)', angle: -90, position: 'insideLeft' }}
              />
              <ReferenceLine 
                y={39.5} 
                stroke="hsl(142, 76%, 36%)" 
                strokeDasharray="5 5"
                label={{ value: 'Pico: 39.5%', position: 'right', fill: 'hsl(142, 76%, 36%)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'value') return [`${value.toFixed(1)}%`, 'Participación']
                  return [value, name]
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={GRADIENT_COLORS[index % GRADIENT_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Concentración Temporal</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/20 rounded border">
                <span className="text-sm">Corto Plazo (0-90d)</span>
                <span className="font-bold">15.6%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                <span className="text-sm"><strong>Mediano (91-360d)</strong></span>
                <span className="font-bold text-green-700 dark:text-green-400">39.5%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/20 rounded border">
                <span className="text-sm">Largo Plazo (&gt;360d)</span>
                <span className="font-bold">45.0%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
            <h4 className="font-semibold text-foreground mb-3">Interpretación Económica</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La distribución muestra una <strong>curva de ciclo comercial típica</strong>: pre-embarque (0-90d), 
              operaciones estándar (91-360d con pico), y financiamiento a medio-largo plazo (&gt;360d). 
              La concentración en 91-360d refleja ciclos de exportación-importación de 3-6 meses.
            </p>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {maturityData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
