"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Building2 } from "lucide-react"
import bankData from "@/data/mexico/01_bank_concentration_data.json"

export function LCBankConcentration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-green-600" />
          Concentración Bancaria en Cartas de Crédito
        </CardTitle>
        <CardDescription>
          Top 10 bancos por volumen de LC (USD millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={bankData.data} 
              layout="vertical"
              margin={{ top: 20, right: 20, left: 130, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                className="text-xs"
                label={{ value: 'USD Millones', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="category"
                dataKey="institucion" 
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
                  `USD ${value.toFixed(1)} M (${props.payload.market_share}%)`,
                  props.payload.institucion
                ]}
              />
              <Bar dataKey="lc_usd" fill="hsl(142, 76%, 36%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">Duopolio</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-400">
              {(bankData.data[0].market_share + bankData.data[1].market_share).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">BBVA + Santander</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Top 5 (CR5)</div>
            <div className="text-2xl font-bold">81.0%</div>
            <div className="text-xs text-muted-foreground mt-1">Alta concentración</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Bancos Extranjeros</div>
            <div className="text-2xl font-bold">68.4%</div>
            <div className="text-xs text-muted-foreground mt-1">del mercado</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Duopolio Extremo:</strong> BBVA México y Santander controlan 
            50.9% del mercado de cartas de crédito. Con CR5 de 81.0%, México tiene una de las concentraciones 
            más altas en LAC, limitando competencia y acceso para PYMEs.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {bankData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
