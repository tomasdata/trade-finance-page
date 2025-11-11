"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Building2 } from "lucide-react"
import firmSizeData from "@/data/brazil/01_tf_by_firm_size_data.json"

const COLORS = {
  "PJ - Grande": "hsl(217, 91%, 60%)",
  "PJ - Médio": "hsl(142, 76%, 36%)",
  "PJ - Pequeno": "hsl(47, 96%, 53%)",
  "PJ - Micro": "hsl(24, 95%, 53%)",
  "PJ - Indisponível": "hsl(0, 0%, 70%)",
}

export function FirmSizeChart() {
  const chartData = firmSizeData.data.map((item: any) => ({
    ...item,
    carteira_bn: Math.round(item.carteira_ativa_total / 1000 * 10) / 10,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Cartera de Trade Finance por Tamaño de Empresa
        </CardTitle>
        <CardDescription>
          Distribución del portafolio activo según clasificación de tamaño (BRL miles de millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="porte" 
                className="text-xs"
                angle={-15}
                textAnchor="end"
                height={100}
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
                formatter={(value: number) => [`BRL ${value.toFixed(1)} bn`, 'Cartera Activa']}
              />
              <Bar dataKey="carteira_bn" radius={[8, 8, 0, 0]}>
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.porte as keyof typeof COLORS] || COLORS["PJ - Indisponível"]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {chartData.slice(0, 4).map((item: any) => (
            <div key={item.porte} className="p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1 truncate">{item.porte}</div>
              <div className="text-lg font-bold">{item.pct_carteira}%</div>
              <div className="text-xs text-muted-foreground">de la cartera</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Hallazgo Clave:</strong> Las grandes empresas concentran el 
            78.1% de la cartera de trade finance con solo el 26.4% de las operaciones, evidenciando una 
            barrera de acceso significativa para PYMEs.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {firmSizeData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
