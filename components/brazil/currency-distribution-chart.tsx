"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts"
import { DollarSign } from "lucide-react"
import currencyData from "@/data/brazil/08_currency_by_maturity_data.json"

const COLORS = {
  brl: "hsl(142, 76%, 36%)",
  usd: "hsl(217, 91%, 60%)",
}

export function CurrencyDistributionChart() {
  const chartData = currencyData.data.map((item: any) => ({
    ...item,
    brl_bn: Math.round(item.brl_amount / 1000 * 10) / 10,
    usd_bn: Math.round(item.usd_amount / 1000 * 10) / 10,
    name: item.maturity_bucket,
  }))

  const totalBRL = chartData.reduce((sum, item) => sum + item.brl_bn, 0)
  const totalUSD = chartData.reduce((sum, item) => sum + item.usd_bn, 0)
  const totalAll = totalBRL + totalUSD
  const usdPercentage = ((totalUSD / totalAll) * 100).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-600" />
          Distribución de Divisas por Plazo
        </CardTitle>
        <CardDescription>
          Composición BRL vs USD en diferentes horizontes de vencimiento (BRL miles de millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'BRL Miles de Millones', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string) => [
                  `BRL ${value.toFixed(1)} bn`,
                  name === 'brl_bn' ? 'BRL' : 'USD'
                ]}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => value === 'brl_bn' ? 'BRL' : 'USD'}
              />
              <Bar dataKey="brl_bn" fill={COLORS.brl} radius={[8, 0, 0, 8]} name="brl_bn" />
              <Bar dataKey="usd_bn" fill={COLORS.usd} radius={[0, 8, 8, 0]} name="usd_bn" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">BRL Total</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              BRL {totalBRL.toFixed(1)}bn
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {((totalBRL / totalAll) * 100).toFixed(1)}% de cartera
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">USD Total</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              BRL {totalUSD.toFixed(1)}bn
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {usdPercentage}% de cartera
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Cartera Total</div>
            <div className="text-2xl font-bold">
              BRL {totalAll.toFixed(1)}bn
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              BRL + USD equivalente
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Exposición en Divisas:</strong> Aproximadamente 20% de la cartera 
            de trade finance está denominada en USD. Esta composición refleja la naturaleza del comercio internacional, 
            donde USD es la divisa referencial para transacciones globales, especialmente en commodities y manufactura.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {currencyData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
