"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"
import { Info, AlertTriangle, TrendingUp } from "lucide-react"
import bankData from "@/data/chile/01_bank_concentration_data.json"

interface BankRecord {
  NombreInstitucion: string
  amount_fx: number
  market_share: number
  cumulative_share: number
}

export function HHIAnalysisChart() {
  // Calculate HHI (sum of squared market shares)
  const hhi = Math.round(
    bankData.data.reduce((sum: number, bank: BankRecord) => {
      return sum + Math.pow(bank.market_share, 2)
    }, 0)
  )

  // Calculate CR3 (top 3 concentration ratio) and CR5
  const cr3 = bankData.data.slice(0, 3).reduce((sum: number, bank: BankRecord) => sum + bank.market_share, 0)
  const cr5 = bankData.data.slice(0, 5).reduce((sum: number, bank: BankRecord) => sum + bank.market_share, 0)

  // HHI Interpretation
  const getHHIInterpretation = (hhi: number) => {
    if (hhi < 1500) {
      return {
        level: "No Concentrado",
        color: "bg-green-100 text-green-700 border-green-300",
        description: "Mercado competitivo con múltiples actores",
        icon: "✓",
        concern: "low"
      }
    }
    if (hhi < 2500) {
      return {
        level: "Moderadamente Concentrado",
        color: "bg-yellow-100 text-yellow-700 border-yellow-300",
        description: "Concentración moderada, puede limitar competencia",
        icon: "⚠",
        concern: "medium"
      }
    }
    return {
      level: "Altamente Concentrado",
      color: "bg-red-100 text-red-700 border-red-300",
      description: "Oligopolio con riesgo anticompetitivo",
      icon: "⚠",
      concern: "high"
    }
  }

  const interpretation = getHHIInterpretation(hhi)

  // Prepare data for visualization
  const chartData = bankData.data.map((bank: BankRecord) => ({
    name: bank.NombreInstitucion.split(" ").slice(0, 2).join(" "), // Shorten names
    share: Math.round(bank.market_share * 10) / 10,
    contribution: Math.round(Math.pow(bank.market_share, 2))
  }))

  // Color coding based on market share
  const getBarColor = (share: number) => {
    if (share >= 20) return "#dc2626" // red-600
    if (share >= 10) return "#f59e0b" // amber-500
    return "#3b82f6" // blue-500
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Índice de Herfindahl-Hirschman (HHI)
              <Badge variant="outline" className={`font-mono text-xs ${interpretation.color}`}>
                HHI = {hhi}
              </Badge>
            </CardTitle>
            <CardDescription>
              Medición de concentración de mercado bancario en trade finance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* HHI Explanation Banner */}
        <div className={`p-4 rounded-lg border-2 ${interpretation.color}`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">{interpretation.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">{interpretation.level}</h4>
              <p className="text-xs">{interpretation.description}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                label={{ value: "Market Share (%)", angle: -90, position: "insideLeft" }}
                domain={[0, 35]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <div className="grid gap-2">
                          <div className="text-xs font-semibold">
                            {payload[0].payload.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Market Share: <strong className="text-blue-600">{payload[0].value}%</strong>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Contribución HHI: <strong>{payload[0].payload.contribution}</strong>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <ReferenceLine y={20} stroke="#dc2626" strokeDasharray="3 3" label={{ value: "Dominancia (20%)", position: "right", fontSize: 10 }} />
              <Bar dataKey="share" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.share)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-xs font-semibold mb-1 text-blue-900 dark:text-blue-300">HHI Index</div>
            <div className="text-2xl font-bold text-blue-600">{hhi}</div>
            <div className="text-xs text-muted-foreground mt-1">{interpretation.level}</div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="text-xs font-semibold mb-1 text-amber-900 dark:text-amber-300">CR3 Ratio</div>
            <div className="text-2xl font-bold text-amber-600">{cr3.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">Top 3 bancos</div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-xs font-semibold mb-1 text-purple-900 dark:text-purple-300">CR5 Ratio</div>
            <div className="text-2xl font-bold text-purple-600">{cr5.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">Top 5 bancos</div>
          </div>
        </div>

        {/* Analysis */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2">
              <Info className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-sm">¿Qué significa el HHI?</h4>
              <p className="text-xs text-muted-foreground">
                El Índice de Herfindahl-Hirschman mide concentración de mercado sumando los cuadrados de las
                participaciones de mercado. Un HHI de <strong>{hhi}</strong> indica un mercado{" "}
                <strong className="text-foreground">{interpretation.level.toLowerCase()}</strong>. El Departamento
                de Justicia de EE.UU. considera preocupante cualquier HHI &gt; 2,500.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-xs font-semibold mb-2 text-blue-900 dark:text-blue-300 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Oligopolio de Hecho
              </div>
              <p className="text-xs text-muted-foreground">
                Con CR3 de {cr3.toFixed(1)}%, los 3 bancos principales (BCI, Itaú Corpbanca, Santander)
                controlan casi dos tercios del mercado. Esto limita opciones para exportadores y
                potencialmente eleva costos de servicios de trade finance.
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${
              interpretation.concern === "high"
                ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
            }`}>
              <div className={`text-xs font-semibold mb-2 flex items-center gap-2 ${
                interpretation.concern === "high" ? "text-red-900 dark:text-red-300" : "text-amber-900 dark:text-amber-300"
              }`}>
                <AlertTriangle className="h-3 w-3" />
                Implicación para PYMEs
              </div>
              <p className="text-xs text-muted-foreground">
                La alta concentración bancaria (HHI = {hhi}) reduce competencia por clientes PYME.
                Sin alternativas reales, las empresas pequeñas enfrentan comisiones más altas y
                requisitos más estrictos. BancoEstado (7.4% market share) es insuficiente como contrapeso.
              </p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20 rounded-lg border-2 border-slate-200 dark:border-slate-800">
            <h5 className="text-xs font-semibold mb-2 text-slate-900 dark:text-slate-300">
              📊 Contexto Internacional
            </h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Chile ({hhi}) tiene concentración bancaria similar a México (HHI ≈ 1,800 en TF) y superior a Brasil
              (HHI ≈ 1,200). Los mercados LAC típicamente muestran HHI entre 1,500-2,500 (moderado a alto).
              Economías desarrolladas como Alemania o EE.UU. tienen HHI &lt; 1,000 en banca comercial. Esta concentración
              refleja barreras regulatorias de entrada, economías de escala en infraestructura de TF, y adquisiciones
              históricas (ej. fusión Itaú-Corpbanca 2016).
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
