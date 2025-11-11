"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts"
import { Building2 } from "lucide-react"
import firmSizeData from "@/data/brazil/01_tf_by_firm_size_data.json"

export function FirmSizeChart() {
  const chartData = firmSizeData.data
    .filter((item: any) => item.porte !== "PJ - Indisponível")
    .map((item: any) => ({
      ...item,
      avg_operation: item.carteira_ativa_total / item.records,
      efficiency: item.pct_carteira / item.pct_records,
      name: item.porte.replace("PJ - ", ""),
    }))
    .sort((a: any, b: any) => b.avg_operation - a.avg_operation)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Tamaño Promedio de Operación y Eficiencia del Mercado
        </CardTitle>
        <CardDescription>
          Costo implícito: operaciones pequeñas pagan mayor % en costos administrativos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Gráfico 1: Tamaño promedio por firma */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">1. Tamaño Promedio de Operación (BRL miles)</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  angle={-15}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  className="text-xs"
                  label={{ value: 'BRL miles', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  formatter={(value: number) => `BRL ${(value).toFixed(0)} mil`}
                  labelFormatter={(label) => `Categoría: ${label}`}
                />
                <Bar dataKey="avg_operation" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Eficiencia de mercado */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">2. Eficiencia de Mercado (Amplificador: % Cartera / % Operaciones)</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  angle={-15}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  className="text-xs"
                  label={{ value: 'Amplificador (x)', angle: -90, position: 'insideLeft' }}
                />
                <ReferenceLine y={1} stroke="hsl(0, 0%, 50%)" strokeDasharray="5 5" label="Neutral (1x)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  formatter={(value: number) => `${value.toFixed(1)}x`}
                  labelFormatter={(label) => `Categoría: ${label}`}
                />
                <Bar dataKey="efficiency" fill="hsl(142, 76%, 36%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de análisis */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Análisis: Barrera de Acceso para PYMEs</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-2 text-left">Categoría</th>
                  <th className="px-4 py-2 text-right">Promedio Op</th>
                  <th className="px-4 py-2 text-right">% Operaciones</th>
                  <th className="px-4 py-2 text-right">% Cartera</th>
                  <th className="px-4 py-2 text-right">Amplificador</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item: any) => (
                  <tr key={item.porte} className="border-b">
                    <td className="px-4 py-2 font-medium">{item.name}</td>
                    <td className="px-4 py-2 text-right">BRL {(item.avg_operation).toFixed(0)}k</td>
                    <td className="px-4 py-2 text-right">{item.pct_records.toFixed(1)}%</td>
                    <td className="px-4 py-2 text-right">{item.pct_carteira.toFixed(1)}%</td>
                    <td className={`px-4 py-2 text-right font-bold ${item.efficiency > 1.5 ? 'text-blue-600 dark:text-blue-400' : item.efficiency < 0.5 ? 'text-red-600 dark:text-red-400' : ''}`}>
                      {item.efficiency.toFixed(1)}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
          <h5 className="font-semibold text-foreground">Interpretación Económica</h5>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong>Grande (3.0x):</strong> Procesa 26.4% de operaciones pero captura 78% de cartera. 
              Economías de escala evidentes. Costo administrativo por BRL muy bajo.
            </li>
            <li>
              <strong>Pequeño (0.1x):</strong> Procesa 15.6% de operaciones pero solo 2.2% de cartera. 
              <span className="text-red-600 dark:text-red-400 font-bold"> Discriminado: paga costo % 10x más alto.</span>
            </li>
            <li>
              <strong>Micro (0.6x):</strong> Apenas 4% de operaciones, 2.4% de cartera. 
              Tamaño promedio es intermedio pero disperso.
            </li>
            <li>
              <strong>⚠️ Barrera estructural:</strong> Los costos fijos (documentación, análisis) no escalan. 
              PYMEs subfinanciadas porque no pueden asumir el costo % relativo.
            </li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {firmSizeData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
