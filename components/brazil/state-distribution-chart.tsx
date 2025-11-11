"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { MapPin } from "lucide-react"
import stateData from "@/data/brazil/03_tf_by_state_data.json"

const STATE_NAMES: { [key: string]: string } = {
  'SP': 'São Paulo',
  'RS': 'Rio Grande do Sul',
  'SC': 'Santa Catarina',
  'PR': 'Paraná',
  'MG': 'Minas Gerais',
  'RJ': 'Rio de Janeiro',
  'BA': 'Bahia',
  'PE': 'Pernambuco',
  'CE': 'Ceará',
  'GO': 'Goiás',
}

export function StateDistributionChart() {
  const chartData = stateData.data.map((item: any) => ({
    ...item,
    carteira_bn: Math.round(item.carteira_ativa_total / 1000 * 10) / 10,
    state_name: STATE_NAMES[item.uf] || item.uf,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-600" />
          Distribución Geográfica del Trade Finance
        </CardTitle>
        <CardDescription>
          Top 10 estados brasileños por cartera activa (BRL miles de millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 20, right: 20, left: 130, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number"
                className="text-xs"
                label={{ value: 'BRL Miles de Millones', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="category"
                dataKey="state_name" 
                className="text-xs"
                width={120}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `BRL ${value.toFixed(1)} bn`,
                  props.payload.state_name
                ]}
              />
              <Bar 
                dataKey="carteira_bn" 
                radius={[0, 4, 4, 0]}
              >
                {chartData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? "hsl(217, 91%, 60%)" : "hsl(220, 13%, 60%)"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">São Paulo</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">38.7%</div>
            <div className="text-xs text-muted-foreground mt-1">de todas las operaciones</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Top 3 Estados</div>
            <div className="text-2xl font-bold">65%</div>
            <div className="text-xs text-muted-foreground mt-1">de la cartera total</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Región Sur</div>
            <div className="text-2xl font-bold">42%</div>
            <div className="text-xs text-muted-foreground mt-1">RS + SC + PR</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Concentración Regional:</strong> São Paulo concentra casi el 40% 
            de todas las operaciones de trade finance, reflejando su rol como centro financiero y exportador. 
            La región Sur (RS, SC, PR) representa otro 42%, destacando la importancia del comercio internacional 
            en estos estados.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {stateData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
