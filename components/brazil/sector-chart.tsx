"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Factory } from "lucide-react"
import sectorData from "@/data/brazil/02_tf_by_sector_data.json"

export function SectorChart() {
  const chartData = sectorData.data.map((item: any) => ({
    ...item,
    carteira_bn: Math.round(item.carteira_ativa_total / 1000 * 10) / 10,
    sector_short: item.cnae_secao.length > 30 ? item.cnae_secao.substring(0, 27) + '...' : item.cnae_secao
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="h-5 w-5 text-indigo-600" />
          Trade Finance por Sector Económico
        </CardTitle>
        <CardDescription>
          Top 10 sectores CNAE con mayor cartera activa (BRL miles de millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 20, right: 20, left: 150, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number"
                className="text-xs"
                label={{ value: 'BRL Miles de Millones', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="category"
                dataKey="sector_short" 
                className="text-xs"
                width={140}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `BRL ${value.toFixed(1)} bn`,
                  props.payload.cnae_secao
                ]}
              />
              <Bar 
                dataKey="carteira_bn" 
                fill="hsl(263, 70%, 50%)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Hallazgo Clave:</strong> Las industrias manufactureras dominan 
            con el 54.8% de las operaciones de trade finance, seguidas por el comercio (mayorista y minorista). 
            Esto refleja la estructura exportadora de Brasil, centrada en commodities industriales y agrícolas.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {sectorData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
