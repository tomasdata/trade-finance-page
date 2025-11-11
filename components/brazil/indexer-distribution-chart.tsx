"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts"
import { Zap } from "lucide-react"
import indexerData from "@/data/brazil/07_indexer_distribution_data.json"

export function IndexerDistributionChart() {
  // Group data: Fixed vs Variable
  const fixedRate = indexerData.data.find((d: any) => d.indexador === "Prefixado")?.pct || 0
  const variableRates = indexerData.data
    .filter((d: any) => ["Pós-fixado", "Flutuantes"].includes(d.indexador))
    .reduce((sum: number, d: any) => sum + d.pct, 0)
  const others = indexerData.data
    .filter((d: any) => !["Prefixado", "Pós-fixado", "Flutuantes"].includes(d.indexador))
    .reduce((sum: number, d: any) => sum + d.pct, 0)

  const chartData = [
    {
      category: "Composición de Tasas",
      "Prefijado": fixedRate,
      "Variables": variableRates,
      "Otros": others,
    }
  ]

  const detailData = indexerData.data.map((item: any) => ({
    ...item,
    name: item.indexador,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-600" />
          Estructura de Tasas de Interés
        </CardTitle>
        <CardDescription>
          Composición fijo vs variable y gestión de riesgo de tasa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 20, left: 150, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" className="text-xs" />
              <YAxis 
                type="category"
                dataKey="category" 
                className="text-xs"
                width={140}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
              <Legend />
              <Bar dataKey="Prefijado" stackId="a" fill="hsl(217, 91%, 60%)" />
              <Bar dataKey="Variables" stackId="a" fill="hsl(142, 76%, 36%)" />
              <Bar dataKey="Otros" stackId="a" fill="hsl(220, 13%, 60%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 space-y-4">
          <h4 className="font-semibold text-foreground">Desglose por Tipo de Indexador</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {detailData.map((item: any) => (
              <div key={item.indexador} className="p-3 bg-slate-50 dark:bg-slate-900/20 rounded border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.indexador}</span>
                  <span className="font-bold text-lg">{item.pct.toFixed(2)}%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.count.toLocaleString()} operaciones
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900">
          <h5 className="font-semibold text-foreground mb-2">Análisis de Gestión de Riesgo</h5>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La <strong>casi equipartición (46.4% fijo vs 46.1% variable)</strong> muestra que los bancos brasileños 
            utilizan ambas estrategias según el plazo de la operación: tasas fijas para pre-embarque (corto plazo) 
            y variables para financiamiento a mayor horizonte. Esto permite transferir riesgo de tasa apropiadamente 
            a los actores económicos.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {indexerData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
