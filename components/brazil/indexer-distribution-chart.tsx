"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Zap } from "lucide-react"
import indexerData from "@/data/brazil/07_indexer_distribution_data.json"

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(142, 76%, 36%)",
  "hsl(47, 96%, 53%)",
  "hsl(24, 95%, 53%)",
  "hsl(263, 70%, 50%)",
]

export function IndexerDistributionChart() {
  const chartData = indexerData.data.map((item: any) => ({
    ...item,
    name: item.indexador,
    value: item.pct,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          Distribución por Tipo de Indexador
        </CardTitle>
        <CardDescription>
          Composición de tasas de interés en la cartera de trade finance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`${value}%`, 'Participación']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Prefijado</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">46.4%</div>
            <div className="text-xs text-muted-foreground mt-1">Tasas fijas</div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">Posfijado + Flotantes</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">46.1%</div>
            <div className="text-xs text-muted-foreground mt-1">Tasas variables</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Estructura de Tasas Equilibrada:</strong> La cartera está casi 
            equidistribuida entre tasas prefijadas (46.4%) y variables (46.1%), reflejando estrategias de 
            gestión de riesgo de tasa diferenciadas según el horizonte temporal y condiciones de mercado.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {indexerData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
