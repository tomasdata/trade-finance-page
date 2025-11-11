"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Users } from "lucide-react"
import firmSizeData from "@/data/peru/01_tf_by_firm_size_data.json"

const COLORS = {
  Corporate: "hsl(217, 91%, 60%)",
  Large: "hsl(142, 76%, 36%)",
  Medium: "hsl(24, 95%, 53%)",
  Small: "hsl(263, 70%, 50%)",
  Micro: "hsl(340, 82%, 52%)",
}

export function FirmSizeDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Distribución por Tamaño de Empresa
        </CardTitle>
        <CardDescription>
          Cartera de trade finance por segmento empresarial (USD millones)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={firmSizeData.data} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="size" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                className="text-xs"
                label={{ value: 'USD Millones', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `USD ${value.toFixed(0)}M (${props.payload.pct}%)`,
                  props.payload.size
                ]}
              />
              <Bar dataKey="amount_usd" radius={[8, 8, 0, 0]}>
                {firmSizeData.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.size as keyof typeof COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
            <div className="text-xs text-muted-foreground mb-1">Corporate + Large</div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">88.7%</div>
            <div className="text-xs text-muted-foreground mt-1">de la cartera</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Medium</div>
            <div className="text-2xl font-bold">9.3%</div>
            <div className="text-xs text-muted-foreground mt-1">participación</div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
            <div className="text-xs text-muted-foreground mb-1">Small + Micro</div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">2.0%</div>
            <div className="text-xs text-muted-foreground mt-1">exclusión extrema</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Exclusión Extrema de PYMEs:</strong> Corporate y Large capturan 
            88.7% del trade finance, dejando solo 2.0% para pequeñas y microempresas. Esta concentración es aún 
            más pronunciada que en Brasil (82%) y revela barreras sistémicas de acceso.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {firmSizeData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
