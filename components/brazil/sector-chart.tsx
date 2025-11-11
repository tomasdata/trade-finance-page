"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts"
import { Factory } from "lucide-react"
import sectorData from "@/data/brazil/02_tf_by_sector_data.json"

export default function SectorChart() {
  const avg_portfolio = sectorData.data.reduce((sum: number, d: any) => sum + d.carteira_ativa_total / d.records, 0) / sectorData.data.length

  const chartData = sectorData.data.map((item: any) => ({
    ...item,
    avg_op: item.carteira_ativa_total / item.records,
    sector_name: item.cnae_secao.replace("PJ - ", "").substring(0, 35),
    pct_market: (item.carteira_ativa_total / sectorData.data.reduce((sum: number, d: any) => sum + d.carteira_ativa_total, 0)) * 100,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="h-5 w-5 text-indigo-600" />
          Tamaño Promedio de Operación por Sector
        </CardTitle>
        <CardDescription>
          Dónde están las PYMEs: sectores con operaciones más pequeñas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Gráfico principal */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Operación Promedio por Sector (BRL miles)</h4>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 20, left: 200, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  type="number"
                  className="text-xs"
                  label={{ value: 'BRL miles', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  type="category"
                  dataKey="sector_name" 
                  className="text-xs"
                  width={190}
                />
                <ReferenceLine 
                  x={avg_portfolio} 
                  stroke="hsl(0, 0%, 50%)" 
                  strokeDasharray="5 5"
                  label={{ value: `Promedio: BRL ${avg_portfolio.toFixed(0)}k`, position: 'top' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'avg_op') return [`BRL ${value.toFixed(0)} mil`, 'Promedio']
                    if (name === 'pct_market') return [`${value.toFixed(1)}%`, 'Del mercado']
                    return [value, name]
                  }}
                />
                <Bar 
                  dataKey="avg_op" 
                  fill="hsl(263, 70%, 50%)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de sectores */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Análisis Sectorial: Oportunidades para PyMEs</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="px-3 py-2 text-left">Sector</th>
                  <th className="px-3 py-2 text-right">Operaciones</th>
                  <th className="px-3 py-2 text-right">Promedio</th>
                  <th className="px-3 py-2 text-right">vs Promedio</th>
                  <th className="px-3 py-2 text-right">% Mercado</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item: any) => (
                  <tr key={item.cnae_secao} className="border-b">
                    <td className="px-3 py-2 text-sm max-w-xs truncate">{item.sector_name}</td>
                    <td className="px-3 py-2 text-right text-xs">{(item.records/1000).toFixed(1)}k</td>
                    <td className={`px-3 py-2 text-right font-semibold ${item.avg_op < avg_portfolio * 0.7 ? 'text-red-600 dark:text-red-400' : ''}`}>
                      BRL {item.avg_op.toFixed(0)}k
                    </td>
                    <td className={`px-3 py-2 text-right ${item.avg_op < avg_portfolio ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {((item.avg_op / avg_portfolio - 1) * 100).toFixed(0)}%
                    </td>
                    <td className="px-3 py-2 text-right">{item.pct_market.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 space-y-3 p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-900">
          <h5 className="font-semibold text-foreground">Hallazgos Clave</h5>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong className="text-red-600 dark:text-red-400">Construcción (BRL 13k):</strong> 30% por debajo del promedio. 
              Sector con PyMEs muy pequeñas, probablemente necesitadas de financiamiento.
            </li>
            <li>
              <strong className="text-red-600 dark:text-red-400">Profesionales/Tech (BRL 19k):</strong> 47% por debajo. 
              Bajo acceso: análisis de riesgo difícil para servicios sin colateral.
            </li>
            <li>
              <strong className="text-green-600 dark:text-green-400">Minería (BRL 78k):</strong> 2.1x promedio. 
              Operaciones grandes, poca dispersión, sector concentrado.
            </li>
            <li>
              <strong>⚠️ Implicación:</strong> Construcción + Tech son sectores subfinanciados con PyMEs pequeñas. 
              Oportunidad para programas de agregación de demanda o garantías públicas.
            </li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {sectorData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
