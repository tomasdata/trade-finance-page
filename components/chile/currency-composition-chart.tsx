"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { DollarSign } from "lucide-react"
import currencyData from "@/data/chile/02_currency_composition_data.json"

const COLORS = ["hsl(217, 91%, 60%)", "hsl(142, 76%, 36%)", "hsl(24, 95%, 53%)"]

export function CurrencyCompositionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Composición por Moneda
        </CardTitle>
        <CardDescription>
          Distribución de la cartera de trade finance por tipo de moneda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currencyData.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({currency_type, pct}) => `${currency_type}: ${pct}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="pct"
              >
                {currencyData.data.map((entry: any, index: number) => (
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

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {currencyData.data.map((item: any) => (
            <div key={item.currency_type} className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">{item.currency_type}</div>
              <div className="text-2xl font-bold">{item.pct}%</div>
              <div className="text-xs text-muted-foreground mt-1">CLP {item.amount.toFixed(1)} mil T</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Hallazgo Clave:</strong> 78.3% de la cartera está denominada 
            en pesos chilenos, a pesar de que trade finance típicamente se asocia con moneda extranjera. 
            Esto sugiere predominio de operaciones domésticas o cobertura cambiaria significativa.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {currencyData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
