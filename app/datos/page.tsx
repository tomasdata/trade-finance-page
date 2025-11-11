"use client"

import { useState } from "react"
import { ArrowLeft, Database, TrendingUp, Globe, BarChart3, Calendar, Download } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { GlobalPaymentComparison } from "@/components/global-payment-comparison"
import { PaymentRiskHeatmap } from "@/components/payment-risk-heatmap"
import { CreditDelaysChart } from "@/components/credit-delays-chart"
import { PaymentTrendsChart } from "@/components/payment-trends-chart"

export default function DatosPage() {
  const [activeTab, setActiveTab] = useState("global")

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="border-b bg-gradient-to-br from-indigo-50 via-blue-50/30 to-slate-50 dark:from-indigo-950/20 dark:via-blue-950/10 dark:to-slate-950">
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
              Análisis de Datos
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Panorama de Pagos Comerciales
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Análisis profundo de retrasos en pagos, tendencias temporales y comparación internacional 
              basado en datos del Finance, Credit and International Business Survey 2023-2025
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
                <span className="text-muted-foreground">Período 2023-2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          
          {/* Context Card */}
          <Card className="mb-12 border-2 border-indigo-200 dark:border-indigo-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Sobre este Análisis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Esta página presenta un análisis exhaustivo de los retrasos en pagos comerciales y su impacto 
                en el acceso a trade finance. Los datos provienen de encuestas mensuales realizadas a empresas 
                exportadoras a nivel mundial, permitiendo comparar la situación de América Latina con otras regiones.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="text-sm font-semibold mb-1 text-blue-900 dark:text-blue-300">Indicador Principal</div>
                  <div className="text-xs text-muted-foreground">
                    Días promedio de retraso más allá de términos de pago acordados
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
                  <div className="text-sm font-semibold mb-1 text-purple-900 dark:text-purple-300">Tendencia Crítica</div>
                  <div className="text-xs text-muted-foreground">
                    % de empresas reportando incremento en demoras de cobro
                  </div>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
                  <div className="text-sm font-semibold mb-1 text-teal-900 dark:text-teal-300">Implicación</div>
                  <div className="text-xs text-muted-foreground">
                    Mayor retraso = mayor necesidad de instrumentos de trade finance
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
              <TabsTrigger value="global" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Comparación Global</span>
                <span className="sm:hidden">Global</span>
              </TabsTrigger>
              <TabsTrigger value="lac" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Detalle LAC</span>
                <span className="sm:hidden">LAC</span>
              </TabsTrigger>
              <TabsTrigger value="tendencias" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Tendencias</span>
                <span className="sm:hidden">Tiempo</span>
              </TabsTrigger>
            </TabsList>

            {/* Global Comparison Tab */}
            <TabsContent value="global" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Panorama Mundial</h2>
                <p className="text-muted-foreground mb-6">
                  Comparación de América Latina con otras regiones del mundo en términos de retrasos en pagos comerciales
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <GlobalPaymentComparison />
                <PaymentRiskHeatmap />
              </div>

              <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 border-amber-200 dark:border-amber-900">
                <CardHeader>
                  <CardTitle className="text-lg">Interpretación de Resultados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Gráfico de Barras:</strong> Muestra el promedio regional de días 
                    de retraso. Un valor más alto indica que las empresas en esa región esperan más tiempo para recibir 
                    pagos después de la fecha acordada, lo que genera tensiones en el flujo de caja y mayor necesidad 
                    de financiamiento puente.
                  </p>
                  <p>
                    <strong className="text-foreground">Mapa de Riesgo:</strong> El scatter plot relaciona dos dimensiones: 
                    días de retraso (eje X) y porcentaje de empresas reportando incremento en demoras (eje Y). Los países 
                    en el cuadrante superior derecho enfrentan la situación más crítica: altos retrasos que además están 
                    empeorando.
                  </p>
                  <p>
                    <strong className="text-foreground">Implicación para LAC:</strong> La posición de América Latina en 
                    estos gráficos refleja el desafío estructural de acceso a instrumentos de trade finance. Mejorar esta 
                    situación requiere ampliar la oferta de seguros de crédito, garantías y factoring internacional.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* LAC Detail Tab */}
            <TabsContent value="lac" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Análisis Detallado: América Latina</h2>
                <p className="text-muted-foreground mb-6">
                  Comparación entre países de la región LAC y evolución de indicadores clave
                </p>
              </div>

              <div className="space-y-8">
                <CreditDelaysChart />

                <Card>
                  <CardHeader>
                    <CardTitle>Contexto Regional</CardTitle>
                    <CardDescription>Factores que explican las diferencias entre países LAC</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Países con Menores Retrasos</h4>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>Mayor desarrollo de instituciones de trade finance</li>
                          <li>Programas gubernamentales de garantía más robustos</li>
                          <li>Mejor integración con cadenas globales de valor</li>
                          <li>Marcos legales más favorables para factoring y seguros</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Países con Mayores Retrasos</h4>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>Limitada oferta de instrumentos especializados</li>
                          <li>Volatilidad macroeconómica e inflación alta</li>
                          <li>Menor participación de banca internacional</li>
                          <li>Burocracia y costos transaccionales elevados</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <p>
                      <strong className="text-foreground">Oportunidad de Mejora:</strong> Los países LAC con mejores 
                      indicadores demuestran que es posible reducir los retrasos mediante políticas públicas adecuadas, 
                      fortalecimiento institucional y mayor participación del sector privado en esquemas de garantía y 
                      financiamiento comercial.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="tendencias" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Tendencias Temporales</h2>
                <p className="text-muted-foreground mb-6">
                  Evolución de los retrasos en pagos a lo largo del tiempo (2024-2025)
                </p>
              </div>

              <div className="space-y-8">
                <PaymentTrendsChart />

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Factores que Explican la Tendencia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">Ciclo Económico Global</h5>
                        <p>
                          Períodos de desaceleración económica se correlacionan con mayor porcentaje de empresas 
                          reportando incremento en demoras, debido a la restricción del crédito comercial.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">Shocks de Liquidez</h5>
                        <p>
                          Eventos como crisis cambiarias, subida de tasas de interés o disrupciones en cadenas de 
                          suministro impactan la capacidad de pago de importadores.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">Políticas de Trade Finance</h5>
                        <p>
                          Cambios en programas de garantía, nuevos esquemas de seguro de crédito o reformas 
                          regulatorias pueden mejorar (o empeorar) la situación.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Implicaciones para Políticas Públicas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Monitoreo Continuo:</strong> Los gobiernos y bancos de 
                        desarrollo deben seguir estas tendencias de cerca para anticipar crisis de liquidez en el 
                        sector exportador.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Intervención Contracíclica:</strong> Cuando el porcentaje 
                        de empresas con retrasos crecientes supera cierto umbral, es momento de activar líneas de 
                        crédito de emergencia o ampliar coberturas de garantía.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Coordinación Regional:</strong> Los países LAC podrían 
                        beneficiarse de mecanismos de alerta temprana compartidos y fondos regionales de garantía 
                        que se activen cuando múltiples países muestran deterioro simultáneo.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Methodology Section */}
          <Separator className="my-12" />

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Metodología y Fuentes</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Database className="h-5 w-5 text-indigo-600" />
                  Sobre los Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Fuente Principal</h5>
                    <p>
                      Finance, Credit and International Business (FCIB) Survey - Encuesta mensual a empresas 
                      exportadoras sobre términos de pago, experiencias de cobro y percepciones de riesgo.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Cobertura</h5>
                    <p>
                      Más de 30 países en América Latina, Asia, Europa, MENA y Norteamérica. Período analizado: 
                      enero 2023 - octubre 2025. Total de 124 observaciones país-mes procesadas.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Variables Clave</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Días promedio de retraso más allá de términos</li>
                      <li>% empresas reportando incremento en demoras</li>
                      <li>Distribución de términos de pago (30, 60, 90+ días)</li>
                      <li>Tendencia de retrasos (incrementando/estable/decreciendo)</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Procesamiento</h5>
                    <p>
                      Los datos fueron agregados por región y país para permitir comparaciones significativas. 
                      Se calcularon promedios ponderados para el período 2024-2025 para reflejar la situación actual.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <Download className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-foreground">Elaboración propia</strong> a partir de informes Finance, Credit and 
                    International Business Survey 2023-2025. Los datos originales fueron transformados siguiendo metodología 
                    documentada en el repositorio del proyecto.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
