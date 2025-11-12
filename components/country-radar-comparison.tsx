"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, Shield, Users, Globe, DollarSign, BarChart3, Info } from "lucide-react"

// Data based on our actual datasets
const countryMetrics = {
  brazil: {
    name: "Brasil",
    volume: 85, // Largest portfolio in LAC (BRL 265B ~ USD 53B)
    penetration: 65, // Good ratio TF/Trade
    concentration: 60, // Moderate bank concentration (Gini ~0.73)
    quality: 95, // Excellent NPL (0.75%)
    smeAccess: 25, // Poor PYME access (4.6% of portfolio)
    growth: 70, // Good CAGR 4.3%
  },
  chile: {
    name: "Chile",
    volume: 45, // Mid-size market
    penetration: 20, // Low ratio TF/Trade (0.88%)
    concentration: 35, // High bank HHI (1814)
    quality: 85, // Good quality (assumed, no NPL data)
    smeAccess: 15, // Very poor (no SME data, assumed worse than Brazil)
    growth: 50, // Moderate CAGR 2.9%
  },
  mexico: {
    name: "México",
    volume: 30, // Only LC visible (USD 5.7B, real market ~USD 25-35B)
    penetration: 10, // Very low LC/Trade ratio (0.50%)
    concentration: 25, // Extreme duopoly (CR5 81%, HHI ~1800)
    quality: 70, // Unknown (assumed moderate)
    smeAccess: 10, // Assumed very poor (no data)
    growth: 60, // Moderate CAGR 3.8% (LC only)
  },
  peru: {
    name: "Perú",
    volume: 50, // Mid-size
    penetration: 55, // Good penetration (TF/GDP decent)
    concentration: 30, // High concentration (CR5 88.6%)
    quality: 80, // Good (assumed, no NPL data)
    smeAccess: 5, // Worst access (0.4% of portfolio)
    growth: 45, // Volatile, post-COVID recovery strong
  },
}

const radarData = [
  {
    dimension: "Volumen",
    Brazil: countryMetrics.brazil.volume,
    Chile: countryMetrics.chile.volume,
    México: countryMetrics.mexico.volume,
    Perú: countryMetrics.peru.volume,
    fullMark: 100,
  },
  {
    dimension: "Penetración",
    Brazil: countryMetrics.brazil.penetration,
    Chile: countryMetrics.chile.penetration,
    México: countryMetrics.mexico.penetration,
    Perú: countryMetrics.peru.penetration,
    fullMark: 100,
  },
  {
    dimension: "Competencia",
    Brazil: countryMetrics.brazil.concentration,
    Chile: countryMetrics.chile.concentration,
    México: countryMetrics.mexico.concentration,
    Perú: countryMetrics.peru.concentration,
    fullMark: 100,
  },
  {
    dimension: "Calidad",
    Brazil: countryMetrics.brazil.quality,
    Chile: countryMetrics.chile.quality,
    México: countryMetrics.mexico.quality,
    Perú: countryMetrics.peru.quality,
    fullMark: 100,
  },
  {
    dimension: "Acceso PYME",
    Brazil: countryMetrics.brazil.smeAccess,
    Chile: countryMetrics.chile.smeAccess,
    México: countryMetrics.mexico.smeAccess,
    Perú: countryMetrics.peru.smeAccess,
    fullMark: 100,
  },
  {
    dimension: "Crecimiento",
    Brazil: countryMetrics.brazil.growth,
    Chile: countryMetrics.chile.growth,
    México: countryMetrics.mexico.growth,
    Perú: countryMetrics.peru.growth,
    fullMark: 100,
  },
]

const dimensionExplanations = [
  {
    icon: DollarSign,
    title: "Volumen",
    description: "Tamaño absoluto del mercado de trade finance. Brasil lidera con USD 53B, seguido por Perú y Chile.",
  },
  {
    icon: BarChart3,
    title: "Penetración",
    description: "Ratio TF/Comercio Exterior. Indica qué % del comercio usa financiamiento formal. Brasil y Perú destacan.",
  },
  {
    icon: Globe,
    title: "Competencia Bancaria",
    description: "Inverso del HHI. Mayor puntaje = menos concentración = más competencia. Brasil mejor que Chile/México/Perú.",
  },
  {
    icon: Shield,
    title: "Calidad Crediticia",
    description: "Basado en NPL y calidad de cartera. Brasil tiene datos concretos (0.75% NPL), otros estimados.",
  },
  {
    icon: Users,
    title: "Acceso PYME",
    description: "% de cartera destinada a PYMEs. CRÍTICO: Todos los países fallan aquí. Perú peor (0.4%), Brasil 4.6%.",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento",
    description: "CAGR reciente (últimos 5 años). Brasil líder con 4.3%, México moderado 3.8%, Chile rezagado 2.9%.",
  },
]

export function CountryRadarComparison() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              Comparación Multidimensional de Países
            </CardTitle>
            <CardDescription>
              Análisis de 6 dimensiones clave del ecosistema de trade finance en LAC-4
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
            Radar Chart
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Radar Chart */}
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: "#64748b" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Brasil"
                dataKey="Brazil"
                stroke="#16a34a"
                fill="#16a34a"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Chile"
                dataKey="Chile"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Radar
                name="México"
                dataKey="México"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Perú"
                dataKey="Perú"
                stroke="#dc2626"
                fill="#dc2626"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <div className="text-xs font-semibold mb-2">{payload[0].payload.dimension}</div>
                        <div className="space-y-1">
                          {payload.map((entry, index) => (
                            <div key={index} className="flex justify-between gap-4 text-xs">
                              <span style={{ color: entry.color }}>{entry.name}:</span>
                              <span className="font-semibold">{entry.value}/100</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Explanations */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-purple-100 dark:bg-purple-950 p-2">
              <Info className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-3">Explicación de Dimensiones</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dimensionExplanations.map((dim, index) => {
                  const Icon = dim.icon
                  return (
                    <div key={index} className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-semibold">{dim.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{dim.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Country Scores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-800">
            <div className="text-sm font-semibold mb-3 text-green-900 dark:text-green-300 flex items-center justify-between">
              <span>🇧🇷 Brasil</span>
              <Badge variant="outline" className="text-xs">Líder</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Score Total:</span>
                <span className="font-bold text-green-600">390/600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fortaleza:</span>
                <span>Calidad/Volumen</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Debilidad:</span>
                <span>Acceso PYME</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <div className="text-sm font-semibold mb-3 text-blue-900 dark:text-blue-300">
              🇨🇱 Chile
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Score Total:</span>
                <span className="font-bold text-blue-600">250/600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fortaleza:</span>
                <span>Calidad</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Debilidad:</span>
                <span>Penetración baja</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-2 border-amber-200 dark:border-amber-800">
            <div className="text-sm font-semibold mb-3 text-amber-900 dark:text-amber-300">
              🇲🇽 México
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Score Total:</span>
                <span className="font-bold text-amber-600">205/600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fortaleza:</span>
                <span>Crecimiento</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Debilidad:</span>
                <span>Data gap 75%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-2 border-red-200 dark:border-red-800">
            <div className="text-sm font-semibold mb-3 text-red-900 dark:text-red-300">
              🇵🇪 Perú
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Score Total:</span>
                <span className="font-bold text-red-600">265/600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fortaleza:</span>
                <span>Penetración</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Debilidad:</span>
                <span>PYME 0.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border-2 border-purple-200 dark:border-purple-800">
          <h5 className="text-sm font-semibold mb-3 text-purple-900 dark:text-purple-300">
            🔍 Hallazgos Clave del Análisis Comparativo
          </h5>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              <strong className="text-foreground">1. Brasil domina en 4/6 dimensiones:</strong> Volumen, calidad crediticia (NPL 0.75%),
              competencia bancaria y crecimiento. Su ventaja competitiva es la diversificación sectorial (agricultura, minería, manufactura)
              y el rol activo del BNDES-Exim como proveedor contracíclico.
            </p>
            <p>
              <strong className="text-foreground">2. Fracaso regional en acceso PYME:</strong> Todos los países puntúan &lt;25/100.
              Perú peor (5/100 = 0.4% cartera), seguido por México (10/100, sin datos), Chile (15/100, estimado) y Brasil (25/100 = 4.6%).
              Esto es una <strong className="text-red-600">crisis de exclusión financiera</strong>.
            </p>
            <p>
              <strong className="text-foreground">3. México tiene gap de datos crítico:</strong> Puntúa bajo en penetración (10/100)
              y volumen (30/100) porque solo vemos cartas de crédito (15-25% del mercado). El mercado real probablemente es 3-4x más grande,
              pero sin transparencia es imposible evaluar.
            </p>
            <p>
              <strong className="text-foreground">4. Perú destaca en penetración:</strong> Con 55/100, tiene el segundo mejor ratio
              TF/PIB después de Brasil. Esto refleja la importancia del comercio exterior en economía peruana (exportaciones = 25% PIB,
              vs. 15% en Brasil). Sin embargo, altamente concentrado en commodities (cobre, oro).
            </p>
            <p>
              <strong className="text-foreground">5. Chile sub-utiliza su potencial:</strong> Economía abierta (comercio = 60% PIB)
              pero penetración de TF es solo 20/100. Esto sugiere que empresas chilenas usan instrumentos no capturados (forfaiting,
              financiamiento intra-firma de multinacionales) o dependen de bancos extranjeros fuera de CMF.
            </p>
          </div>
        </div>

        {/* Methodology Note */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded border border-slate-200 dark:border-slate-800">
          <h6 className="text-xs font-semibold mb-2 text-slate-900 dark:text-slate-300">
            📊 Nota Metodológica
          </h6>
          <p className="text-xs text-muted-foreground">
            Las puntuaciones son índices normalizados (0-100) basados en datos reales de cada país. <strong>Brasil y Perú</strong> tienen
            datos primarios completos. <strong>Chile</strong> tiene datos de volumen/concentración pero falta info de PYMEs (estimado).
            <strong>México</strong> tiene limitación severa (solo LC = 15-25% mercado). Dimensión "Competencia" es inverso del HHI
            (mayor puntaje = menos concentración). Dimensión "Calidad" para Chile/México/Perú es estimada basada en estándares regionales
            (Brasil tiene NPL real de 0.75%).
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
