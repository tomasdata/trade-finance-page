"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Building2 } from "lucide-react"
import bankData from "@/data/peru/03_bank_concentration_data.json"

export function BankConcentration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Concentración Bancaria
        </CardTitle>
        <CardDescription>
          Top 10 bancos por cartera de trade finance (PEN millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={bankData.data} 
              layout="vertical"
              margin={{ top: 20, right: 20, left: 140, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                className="text-xs"
                label={{ value: 'PEN Millones', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="category"
                dataKey="institucion_std" 
                className="text-xs"
                width={130}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `PEN ${value.toFixed(0)}M (${props.payload.market_share}%)`,
                  props.payload.institucion_std
                ]}
              />
              <Bar dataKey="amount_pen" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Líder</div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-400">{bankData.data[0].institucion_std}</div>
            <div className="text-xs text-muted-foreground mt-1">{bankData.data[0].market_share}% market share</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Top 5 (CR5)</div>
            <div className="text-2xl font-bold">88.6%</div>
            <div className="text-xs text-muted-foreground mt-1">Alta concentración</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Top 3</div>
            <div className="text-2xl font-bold">
              {(bankData.data[0].market_share + bankData.data[1].market_share + bankData.data[2].market_share).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">del mercado</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Oligopolio Extremo:</strong> BBVA Perú lidera con 28.7%, seguido por 
            BCP y Scotiabank. Con CR5 de 88.6%, Perú tiene una de las concentraciones más altas de LAC, comparable 
            con México. Esto limita competencia y eleva costos para exportadores.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {bankData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
