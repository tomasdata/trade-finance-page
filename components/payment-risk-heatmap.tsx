"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from "recharts"
import { TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import creditData from "@/data/credit_data.json"

interface CreditDataItem {
  survey_year: number
  survey_month: number
  country: string
  avg_days_beyond_terms: number | null
  payment_delays_increasing_pct: number | null
}

export function PaymentRiskHeatmap({ onViewMore }: { onViewMore?: () => void }) {
  // Clasificar países LAC
  const lacCountries = ["Mexico", "Brazil", "Chile", "Colombia", "Peru", "Argentina", "Venezuela", "Ecuador"]

  // Procesar datos: agrupar por país y calcular promedios
  const countryMap = new Map<string, { delays: number[], increasing: number[], count: number }>()

  ;(creditData.data as CreditDataItem[]).forEach(item => {
    if (item.survey_year < 2024) return // Solo datos recientes
    if (!item.avg_days_beyond_terms && !item.payment_delays_increasing_pct) return

    if (!countryMap.has(item.country)) {
      countryMap.set(item.country, { delays: [], increasing: [], count: 0 })
    }

    const data = countryMap.get(item.country)!
    if (item.avg_days_beyond_terms !== null) data.delays.push(item.avg_days_beyond_terms)
    if (item.payment_delays_increasing_pct !== null) data.increasing.push(item.payment_delays_increasing_pct)
    data.count++
  })

  // Convertir a formato para scatter
  const scatterData = Array.from(countryMap.entries())
    .map(([country, data]) => {
      if (data.delays.length === 0 || data.increasing.length === 0) return null

      const avgDelays = data.delays.reduce((a, b) => a + b, 0) / data.delays.length
      const avgIncreasing = data.increasing.reduce((a, b) => a + b, 0) / data.increasing.length

      return {
        country,
        x: Math.round(avgDelays * 10) / 10,
        y: Math.round(avgIncreasing * 10) / 10,
        z: data.count * 100, // Para el tamaño del punto
        isLAC: lacCountries.includes(country),
        observations: data.count
      }
    })
    .filter(item => item !== null)
    .sort((a, b) => (b?.z || 0) - (a?.z || 0)) // Países con más datos primero

  // Calcular cuadrantes
  const avgX = scatterData.reduce((sum, item) => sum + (item?.x || 0), 0) / scatterData.length
  const avgY = scatterData.reduce((sum, item) => sum + (item?.y || 0), 0) / scatterData.length

  const lacCount = scatterData.filter(item => item?.isLAC).length
  const highRiskLAC = scatterData.filter(item => item?.isLAC && (item.x > avgX && item.y > avgY)).length

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-900 shadow-xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              Mapa de Riesgo de Pagos: Panorama Global
            </CardTitle>
            <CardDescription>
              Relación entre días de retraso y empresas reportando incremento en demoras (2024-2025)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Días de retraso"
                className="text-xs"
                label={{ value: 'Días promedio de retraso', position: 'insideBottom', offset: -15 }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="% empresas con incremento"
                className="text-xs"
                label={{ value: '% empresas reportando incremento', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis type="number" dataKey="z" range={[100, 800]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-bold">{data.country}</div>
                          {data.isLAC && (
                            <Badge variant="secondary" className="text-xs">LAC</Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Días retraso:</span>
                            <span className="font-semibold">{data.x} días</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">% incremento:</span>
                            <span className="font-semibold">{data.y}%</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Observaciones:</span>
                            <span className="font-semibold">{data.observations}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter name="Países" data={scatterData}>
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry?.isLAC ? "hsl(217, 91%, 60%)" : "hsl(215, 20%, 65%)"}
                    fillOpacity={entry?.isLAC ? 0.8 : 0.4}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-600"></div>
            <span>América Latina ({lacCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-slate-400"></div>
            <span>Otras regiones ({scatterData.length - lacCount})</span>
          </div>
        </div>

        {/* Analysis Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="text-xs text-muted-foreground mb-1">Países LAC</div>
            <div className="text-xl font-bold text-blue-700 dark:text-blue-400">{lacCount}</div>
            <div className="text-xs text-muted-foreground mt-1">En análisis</div>
          </div>

          <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
            <div className="text-xs text-muted-foreground mb-1">LAC Alto Riesgo</div>
            <div className="text-xl font-bold text-orange-700 dark:text-orange-400">{highRiskLAC}</div>
            <div className="text-xs text-muted-foreground mt-1">Cuadrante superior derecho</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-muted-foreground mb-1">Total Países</div>
            <div className="text-xl font-bold">{scatterData.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Con datos suficientes</div>
          </div>

          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="text-xs text-muted-foreground mb-1">Mejor Posición LAC</div>
            <div className="text-sm font-bold text-green-700 dark:text-green-400 truncate">
              {scatterData
                .filter(item => item?.isLAC)
                .reduce((min, item) => (item && item.x < (min?.x || Infinity)) ? item : min, scatterData[0])?.country || 'N/A'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Menor retraso</div>
          </div>
        </div>

        {/* Insight */}
        <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong className="text-foreground">Interpretación:</strong> El cuadrante superior derecho 
              representa mayor riesgo (altos retrasos + tendencia creciente). Los países LAC en azul muestran 
              su posición relativa frente al panorama global.
            </p>
            <p className="text-xs">
              El tamaño de los círculos representa la cantidad de observaciones disponibles para cada país.
            </p>
          </div>
        </div>

        {onViewMore && (
          <Button 
            onClick={onViewMore} 
            className="w-full gap-2"
            variant="outline"
          >
            Ver tendencias temporales detalladas
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        <div className="text-xs text-muted-foreground italic text-center">
          Fuente: {creditData.metadata.source}
        </div>
      </CardContent>
    </Card>
  )
}
