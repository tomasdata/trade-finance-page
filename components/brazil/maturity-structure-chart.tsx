"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Clock } from "lucide-react"
import maturityData from "@/data/brazil/04_maturity_structure_data.json"

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(142, 76%, 36%)",
  "hsl(47, 96%, 53%)",
  "hsl(24, 95%, 53%)",
  "hsl(263, 70%, 50%)",
  "hsl(340, 82%, 52%)",
]

export function MaturityStructureChart() {
  const chartData = maturityData.data.map((item: any) => ({
    ...item,
    name: item.maturity_bucket,
    value: item.pct,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-teal-600" />
          Estructura de Vencimientos
        </CardTitle>
        <CardDescription>
          Distribución de la cartera por plazos de vencimiento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry: any, index: number) => (
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
          {chartData.slice(0, 3).map((item: any, index: number) => (
            <div key={item.name} className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">{item.name}</div>
              <div className="text-2xl font-bold">{item.pct}%</div>
              <div className="text-xs text-muted-foreground mt-1">de la cartera</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Hallazgo Clave:</strong> El rango de 91-360 días es el bucket 
            dominante con 39.5% de la cartera, alineado con los ciclos típicos de exportación e importación. 
            La concentración en plazos medios (90-360 días) refleja el perfil de riesgo moderado del trade finance brasileño.
          </p>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {maturityData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
