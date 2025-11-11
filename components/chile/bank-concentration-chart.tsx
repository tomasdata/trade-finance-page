"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Building2 } from "lucide-react"
import bankData from "@/data/chile/01_bank_concentration_data.json"

export function BankConcentrationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Concentración Bancaria en Trade Finance
        </CardTitle>
        <CardDescription>
          Top 10 bancos por cartera en moneda extranjera (CLP trillones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={bankData.data} 
              layout="vertical"
              margin={{ top: 20, right: 20, left: 120, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                className="text-xs"
                label={{ value: 'CLP Trillones', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="category"
                dataKey="NombreInstitucion" 
                className="text-xs"
                width={110}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `CLP ${value.toFixed(2)} T (${props.payload.market_share}%)`,
                  props.payload.NombreInstitucion
                ]}
              />
              <Bar dataKey="amount_fx" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Banco Líder</div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-400">{bankData.data[0].NombreInstitucion}</div>
            <div className="text-xs text-muted-foreground mt-1">{bankData.data[0].market_share}% market share</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Top 3 Bancos</div>
            <div className="text-2xl font-bold">{bankData.data.slice(0, 3).reduce((sum: number, bank: any) => sum + bank.market_share, 0).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">del mercado</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Top 5 Bancos</div>
            <div className="text-2xl font-bold">{bankData.data.slice(0, 5).reduce((sum: number, bank: any) => sum + bank.market_share, 0).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">del mercado</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Hallazgo Clave:</strong> BCI lidera con 20.1% de participación, 
            2.7x más grande que el segundo player. Alta concentración en top 5 bancos refleja el oligopolio 
            bancario chileno en trade finance.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {bankData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
