"use client"

import { ArrowLeft, Calendar, Database, Globe, AlertCircle, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditDelaysChart } from "@/components/credit-delays-chart"
import { PaymentTrendsChart } from "@/components/payment-trends-chart"
import { PaymentRiskHeatmap } from "@/components/payment-risk-heatmap"
import { GlobalPaymentComparison } from "@/components/global-payment-comparison"

export default function RetrasosPagosPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="border-b bg-gradient-to-br from-indigo-50 via-purple-50/30 to-slate-50 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-slate-950">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <a href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </a>
            </Button>
          </div>

          <div className="max-w-4xl">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
              Percepciones y Riesgo Comercial
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Retrasos en Pagos Comerciales
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Análisis de días promedio de retraso en pagos más allá de términos acordados. 
              América Latina comparada con Asia, MENA y Norteamérica/Europa. Basado en encuestas FCIB 2023-2025.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-indigo-600" />
                <span className="text-muted-foreground">124 observaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-indigo-600" />
                <span className="text-muted-foreground">30+ países</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span className="text-muted-foreground">2023-2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-12">
          
          {/* Disclaimer Card */}
          <Card className="border-2 border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-400">
                <AlertCircle className="h-5 w-5" />
                Contexto Metodológico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Finance, Credit and International Business Survey (FCIB)</strong> es una encuesta mensual/trimestral 
                de empresas globales que captura percepciones sobre riesgo de crédito comercial, días de retraso en pagos, 
                y tendencias en términos de pago.
              </p>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Los datos reflejan <strong>percepciones reportadas</strong> y no son estadísticas bancarias oficiales. 
                Sin embargo, constituyen un indicador líder valioso de tensiones en crédito comercial y riesgo de 
                contraparte en comercio internacional.
              </p>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-900">
                <div className="text-xs font-semibold mb-1 text-blue-900 dark:text-blue-300">Fuente</div>
                <div className="text-xs text-muted-foreground">
                  Elaboración propia a partir de Finance, Credit and International Business Survey 2023-2025
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Comparación Global */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Comparación Regional</h2>
              <p className="text-muted-foreground">
                América Latina en contexto global: retrasos promedio 15-45 días vs. 8-12 días en economías desarrolladas
              </p>
            </div>
            <GlobalPaymentComparison />
          </div>

          <Separator />

          {/* Delays por País */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Retrasos por País (2024-2025)</h2>
              <p className="text-muted-foreground">
                Promedio de días más allá de términos acordados para los principales países de cada región
              </p>
            </div>
            <CreditDelaysChart />
          </div>

          <Separator />

          {/* Tendencias de Incremento */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Tendencia de Retrasos</h2>
              <p className="text-muted-foreground">
                Porcentaje de empresas reportando incremento en retrasos de pagos (2024-2025)
              </p>
            </div>
            <PaymentTrendsChart />
          </div>

          <Separator />

          {/* Mapa de Riesgo */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Mapa de Riesgo Global</h2>
              <p className="text-muted-foreground">
                Relación entre días de retraso y porcentaje de empresas reportando incrementos. 
                Los países en la zona superior derecha presentan mayor riesgo comercial.
              </p>
            </div>
            <PaymentRiskHeatmap />
          </div>

          {/* Interpretación y Conclusiones */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Hallazgos Clave
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-600">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Brecha Regional Persistente</h4>
                    <p className="text-sm text-muted-foreground">
                      América Latina mantiene retrasos promedio 2-4x superiores a economías desarrolladas, 
                      reflejando menor profundidad financiera y mayor riesgo crediticio percibido.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-600">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Heterogeneidad Intra-Regional</h4>
                    <p className="text-sm text-muted-foreground">
                      Dentro de LAC, Chile muestra mejores indicadores (15-25 días) mientras que otros países 
                      registran 30-45 días, correlacionado con profundidad del sistema financiero doméstico.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-600">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Indicador Líder de Tensiones</h4>
                    <p className="text-sm text-muted-foreground">
                      El incremento en retrasos (tendencia creciente 2024-2025) anticipa posibles problemas 
                      de liquidez y mayor demanda futura de instrumentos de trade finance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
