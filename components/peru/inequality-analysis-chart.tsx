"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts"
import { Info, TrendingUp } from "lucide-react"
import firmSizeData from "@/data/peru/01_tf_by_firm_size_data.json"

interface FirmSizeRecord {
  size: string
  amount_pen: number
  amount_usd: number
  pct: number
}

export function InequalityAnalysisChart() {
  // Sort by firm size (smallest to largest)
  const sortOrder: { [key: string]: number } = {
    "Micro": 1,
    "Small": 2,
    "Medium": 3,
    "Large": 4,
    "Corporate": 5,
  }

  const sortedData = [...firmSizeData.data].sort(
    (a: FirmSizeRecord, b: FirmSizeRecord) => sortOrder[a.size] - sortOrder[b.size]
  )

  // Calculate cumulative percentages for Lorenz Curve
  // Note: Peru data doesn't have operation count, so we'll use firm size categories as proxy
  // Assuming equal weight for categories (20% each) for operation distribution
  const assumedOpPct = 100 / sortedData.length

  let cumOps = 0
  let cumCarteira = 0

  const lorenzData = [
    { cumPctFirms: 0, cumPctPortfolio: 0, equalityLine: 0 }
  ]

  sortedData.forEach((item: FirmSizeRecord) => {
    cumOps += assumedOpPct
    cumCarteira += item.pct
    lorenzData.push({
      cumPctFirms: Math.round(cumOps * 10) / 10,
      cumPctPortfolio: Math.round(cumCarteira * 10) / 10,
      equalityLine: Math.round(cumOps * 10) / 10,
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

  // Calculate actual statistics
  const smeTotal = sortedData
    .filter((d: FirmSizeRecord) => ["Micro", "Small"].includes(d.size))
    .reduce((sum: number, d: FirmSizeRecord) => sum + d.pct, 0)

  const corporateTotal = sortedData
    .filter((d: FirmSizeRecord) => ["Corporate", "Large"].includes(d.size))
    .reduce((sum: number, d: FirmSizeRecord) => sum + d.pct, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Análisis de Desigualdad (Curva de Lorenz)
              <Badge variant="outline" className="font-mono text-xs">
                Gini ≈ {giniCoefficient.toFixed(3)}
              </Badge>
            </CardTitle>
            <CardDescription>
              Distribución de cartera de trade finance por tamaño de empresa
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-muted-foreground">
            <strong className="text-amber-900 dark:text-amber-300">Nota metodológica:</strong> Los datos de Perú no
            incluyen número de operaciones. Este análisis asume distribución uniforme entre categorías de tamaño
            como proxy. El Gini real podría ser más alto si las grandes empresas tienen más operaciones.
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={lorenzData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="lorenzGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="cumPctFirms"
                label={{ value: "% Acumulado de Categorías de Tamaño", position: "insideBottom", offset: -5 }}
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
                            <strong>{payload[0].value}%</strong> de las categorías
                          </div>
                          <div className="text-xs text-muted-foreground">
                            controlan <strong className="text-purple-600">{payload[1]?.value}%</strong> de la cartera
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
                stroke="#8b5cf6"
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
            <div className="rounded-full bg-purple-100 dark:bg-purple-950 p-2">
              <Info className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-sm">Interpretación del Índice de Gini</h4>
              <p className="text-sm text-muted-foreground">
                El coeficiente de Gini estimado de <strong className={interpretation.color}>{giniCoefficient.toFixed(3)}</strong> indica{" "}
                <strong className={interpretation.color}>{interpretation.level.toLowerCase()} desigualdad</strong> en la
                distribución del financiamiento comercial. Esto representa {interpretation.description} en el acceso
                a trade finance por tamaño de empresa en Perú.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-xs font-semibold mb-2 text-purple-900 dark:text-purple-300 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                PYMEs Marginadas
              </div>
              <p className="text-xs text-muted-foreground">
                <strong>Micro + Pequeñas empresas:</strong> Solo controlan {smeTotal.toFixed(2)}% de la cartera
                de trade finance. Esto es consistente con el patrón regional de exclusión PYME del financiamiento
                de comercio exterior.
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="text-xs font-semibold mb-2 text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <Info className="h-3 w-3" />
                Dominancia Corporate
              </div>
              <p className="text-xs text-muted-foreground">
                <strong>Corporate + Large:</strong> Capturan {corporateTotal.toFixed(2)}% de la cartera total.
                Probablemente empresas exportadoras de minería (cobre, oro) y agroindustria (espárragos, uvas),
                sectores tradicionales peruanos.
              </p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg border-2 border-red-200 dark:border-red-800">
            <h5 className="text-xs font-semibold mb-2 text-red-900 dark:text-red-300">
              ⚠️ Implicación Económica
            </h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              La alta concentración en empresas grandes indica un <strong>mercado dual</strong> en trade finance peruano:
              (1) Sector formal/exportador grande con acceso pleno a crédito internacional, y (2) PYMEs exportadoras
              sub-atendidas, dependiendo de recursos propios o factoring informal. La dolarización elevada del sistema
              bancario peruano (~40% de créditos) podría ser una barrera adicional para PYMEs sin cobertura cambiaria.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
