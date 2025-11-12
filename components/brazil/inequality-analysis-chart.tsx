"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts"
import { Info, TrendingUp } from "lucide-react"
import firmSizeData from "@/data/brazil/01_tf_by_firm_size_data.json"

interface FirmSizeRecord {
  porte: string
  records: number
  carteira_ativa_total: number
  pct_records: number
  pct_carteira: number
}

export function InequalityAnalysisChart() {
  // Sort by firm size (smallest to largest)
  const sortOrder: { [key: string]: number } = {
    "PJ - Micro": 1,
    "PJ - Pequeno": 2,
    "PJ - Médio": 3,
    "PJ - Grande": 4,
    "PJ - Indisponível": 5,
  }

  const sortedData = [...firmSizeData.data]
    .filter((d: FirmSizeRecord) => d.porte !== "PJ - Indisponível")
    .sort((a: FirmSizeRecord, b: FirmSizeRecord) => sortOrder[a.porte] - sortOrder[b.porte])

  // Calculate cumulative percentages for Lorenz Curve
  let cumRecords = 0
  let cumCarteira = 0

  const lorenzData = [
    { cumPctFirms: 0, cumPctPortfolio: 0, equalityLine: 0 }
  ]

  sortedData.forEach((item: FirmSizeRecord) => {
    cumRecords += item.pct_records
    cumCarteira += item.pct_carteira
    lorenzData.push({
      cumPctFirms: Math.round(cumRecords * 10) / 10,
      cumPctPortfolio: Math.round(cumCarteira * 10) / 10,
      equalityLine: Math.round(cumRecords * 10) / 10,
    })
  })

  // Calculate Gini Coefficient using trapezoidal rule
  let giniArea = 0
  for (let i = 1; i < lorenzData.length; i++) {
    const width = lorenzData[i].cumPctFirms - lorenzData[i - 1].cumPctFirms
    const avgHeight = (lorenzData[i].cumPctPortfolio + lorenzData[i - 1].cumPctPortfolio) / 2
    giniArea += width * avgHeight
  }
  const giniCoefficient = Math.round((5000 - giniArea) / 5000 * 1000) / 1000

  // Interpretation
  const getGiniInterpretation = (gini: number) => {
    if (gini < 0.3) return { level: "Baja", color: "text-green-600", description: "distribución relativamente equitativa" }
    if (gini < 0.5) return { level: "Moderada", color: "text-yellow-600", description: "desigualdad moderada" }
    return { level: "Alta", color: "text-red-600", description: "concentración extrema de recursos" }
  }

  const interpretation = getGiniInterpretation(giniCoefficient)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Análisis de Desigualdad (Curva de Lorenz)
              <Badge variant="outline" className="font-mono text-xs">
                Gini = {giniCoefficient.toFixed(3)}
              </Badge>
            </CardTitle>
            <CardDescription>
              Distribución de cartera de trade finance por tamaño de empresa
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={lorenzData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="lorenzGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="cumPctFirms"
                label={{ value: "% Acumulado de Operaciones", position: "insideBottom", offset: -5 }}
                domain={[0, 100]}
              />
              <YAxis
                label={{ value: "% Acumulado de Cartera", angle: -90, position: "insideLeft" }}
                domain={[0, 100]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <div className="grid gap-2">
                          <div className="text-xs text-muted-foreground">
                            <strong>{payload[0].value}%</strong> de las operaciones
                          </div>
                          <div className="text-xs text-muted-foreground">
                            controlan <strong className="text-blue-600">{payload[1]?.value}%</strong> de la cartera
                          </div>
                          {payload[0].value !== payload[1]?.value && (
                            <div className="text-xs border-t pt-2 mt-1">
                              Gap de desigualdad: <strong>{Math.abs((payload[0].value as number) - (payload[1]?.value as number)).toFixed(1)}%</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="line"
              />
              <ReferenceLine
                stroke="#94a3b8"
                strokeDasharray="5 5"
                segment={[
                  { x: 0, y: 0 },
                  { x: 100, y: 100 },
                ]}
              />
              <Area
                type="monotone"
                dataKey="cumPctPortfolio"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#lorenzGradient)"
                name="Distribución Real"
              />
              <Area
                type="monotone"
                dataKey="equalityLine"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                name="Igualdad Perfecta"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Interpretation */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2">
              <Info className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-sm">Interpretación del Índice de Gini</h4>
              <p className="text-sm text-muted-foreground">
                El coeficiente de Gini de <strong className={interpretation.color}>{giniCoefficient.toFixed(3)}</strong> indica{" "}
                <strong className={interpretation.color}>{interpretation.level.toLowerCase()} desigualdad</strong> en la
                distribución del financiamiento comercial. Esto representa {interpretation.description} en el acceso
                a trade finance por tamaño de empresa.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-xs font-semibold mb-2 text-blue-900 dark:text-blue-300 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Hallazgo Clave
              </div>
              <p className="text-xs text-muted-foreground">
                <strong>Micro + Pequeñas empresas:</strong> Realizan 19.6% de las operaciones pero
                controlan solo 4.6% de la cartera total. Esto indica operaciones de bajo valor
                (posiblemente insumos/bienes intermedios).
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="text-xs font-semibold mb-2 text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <Info className="h-3 w-3" />
                Concentración
              </div>
              <p className="text-xs text-muted-foreground">
                <strong>Grandes empresas:</strong> Con solo 26.4% de las operaciones, capturan
                78.1% de la cartera. Ratio de 3:1, sugiriendo acceso privilegiado a crédito
                de mayor monto (commodities/bienes de capital).
              </p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg border-2 border-red-200 dark:border-red-800">
            <h5 className="text-xs font-semibold mb-2 text-red-900 dark:text-red-300">
              ⚠️ Implicación Económica
            </h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              La alta concentración (Gini = {giniCoefficient.toFixed(3)}) sugiere <strong>racionamiento crediticio</strong>
              hacia PYMEs. Posibles causas: (1) garantías insuficientes, (2) asimetría de información bancaria,
              (3) costos de transacción fijos que penalizan operaciones pequeñas. Si las PYMEs tuvieran acceso
              proporcional a su participación en operaciones, la cartera PYME sería 4.3x mayor (+USD 12.4 mil millones).
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
