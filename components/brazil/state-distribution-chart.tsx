"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { MapPin } from "lucide-react"
import stateData from "@/data/brazil/03_tf_by_state_data.json"

const STATE_NAMES: { [key: string]: string } = {
  'SP': 'São Paulo',
  'RS': 'Rio Grande do Sul',
  'SC': 'Santa Catarina',
  'PR': 'Paraná',
  'MG': 'Minas Gerais',
  'RJ': 'Rio de Janeiro',
  'BA': 'Bahia',
  'PE': 'Pernambuco',
  'CE': 'Ceará',
  'GO': 'Goiás',
  'MT': 'Mato Grosso',
  'PA': 'Pará',
}

export function StateDistributionChart() {
  const avg_portfolio = stateData.data.reduce((sum: number, d: any) => sum + d.carteira_ativa_total / d.records, 0) / stateData.data.length

  const chartData = stateData.data.map((item: any) => ({
    ...item,
    avg_op: item.carteira_ativa_total / item.records,
    state_name: STATE_NAMES[item.uf] || item.uf,
    pct_carteira: (item.carteira_ativa_total / stateData.data.reduce((sum: number, d: any) => sum + d.carteira_ativa_total, 0)) * 100,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-600" />
          Disparidades Regionales: Tamaño Promedio de Operación
        </CardTitle>
        <CardDescription>
          Dónde están las PyMEs regionales: análisis de dispersión geográfica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Gráfico principal */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Operación Promedio por Estado (BRL miles)</h4>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 20, left: 120, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  type="number"
                  className="text-xs"
                  label={{ value: 'BRL miles', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  type="category"
                  dataKey="state_name" 
                  className="text-xs"
                  width={110}
                />
                <ReferenceLine 
                  x={avg_portfolio} 
                  stroke="hsl(0, 0%, 50%)" 
                  strokeDasharray="5 5"
                  label={{ value: `Promedio: BRL ${avg_portfolio.toFixed(0)}k`, position: 'top', fill: 'hsl(0, 0%, 50%)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'avg_op') return [`BRL ${value.toFixed(0)} mil`, 'Promedio']
                    if (name === 'pct_carteira') return [`${value.toFixed(1)}%`, 'Del mercado']
                    return [value, name]
                  }}
                />
                <Bar 
                  dataKey="avg_op" 
                  fill="hsl(0, 100%, 50%)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla comparativa */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Análisis Regional: Concentración vs Dispersión</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="px-3 py-2 text-left">Estado</th>
                  <th className="px-3 py-2 text-right">Operaciones</th>
                  <th className="px-3 py-2 text-right">Promedio</th>
                  <th className="px-3 py-2 text-right">vs Promedio</th>
                  <th className="px-3 py-2 text-right">Cartera %</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item: any) => (
                  <tr key={item.uf} className="border-b">
                    <td className="px-3 py-2 font-medium">{item.state_name}</td>
                    <td className="px-3 py-2 text-right text-xs">{(item.records/1000).toFixed(1)}k</td>
                    <td className={`px-3 py-2 text-right font-semibold ${item.avg_op < avg_portfolio * 0.8 ? 'text-red-600 dark:text-red-400' : item.avg_op > avg_portfolio * 1.2 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                      BRL {item.avg_op.toFixed(0)}k
                    </td>
                    <td className={`px-3 py-2 text-right ${item.avg_op < avg_portfolio ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                      {((item.avg_op / avg_portfolio - 1) * 100).toFixed(0)}%
                    </td>
                    <td className="px-3 py-2 text-right">{item.pct_carteira.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 space-y-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
          <h5 className="font-semibold text-foreground">Hallazgos Clave: Geografía del Financiamiento</h5>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong className="text-red-600 dark:text-red-400">SC (Santa Catarina) - BRL 11k:</strong> 77% por debajo del promedio. 
              13.4% de operaciones pero solo 4.5% de cartera. Región con PyMEs muy pequeñas, probablemente textiles y alimentos.
            </li>
            <li>
              <strong className="text-red-600 dark:text-red-400">RS (Rio Grande do Sul) - BRL 15k:</strong> 69% por debajo. 
              17.4% de operaciones, 7.4% cartera. Muchas cooperativas agrícolas de pequeño tamaño.
            </li>
            <li>
              <strong className="text-blue-600 dark:text-blue-400">RJ (Rio de Janeiro) - BRL 97k:</strong> 2.0x promedio. 
              Operaciones GRANDES (finanzas, petróleo). Solo 4.3% de operaciones pero 12.2% de cartera.
            </li>
            <li>
              <strong className="text-blue-600 dark:text-blue-400">SP (São Paulo) - BRL 48k:</strong> 0.5x promedio pero operaciones sólidas. 
              32.5% de operaciones, 45.4% cartera. Economías de escala significativas.
            </li>
            <li>
              <strong>⚠️ Implicación Policy:</strong> SC y RS tienen PyMEs masivas subfinanciadas. 
              Oportunidad para agregadores regionales o cooperativas de crédito especializadas.
            </li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic text-center">
          Fuente: {stateData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
