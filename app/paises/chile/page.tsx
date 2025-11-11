"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ArrowLeft, Database, TrendingUp, Building2, Calendar, Download, BarChart3 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Dynamic imports with SSR disabled
const BankConcentrationChart = dynamic(() => import("@/components/chile/bank-concentration-chart").then(mod => ({ default: mod.BankConcentrationChart })), { ssr: false, loading: () => <div className="h-96 flex items-center justify-center">Cargando...</div> })
const CurrencyCompositionChart = dynamic(() => import("@/components/chile/currency-composition-chart").then(mod => ({ default: mod.CurrencyCompositionChart })), { ssr: false, loading: () => <div className="h-96 flex items-center justify-center">Cargando...</div> })
const AnnualEvolutionChart = dynamic(() => import("@/components/chile/annual-evolution-chart").then(mod => ({ default: mod.AnnualEvolutionChart })), { ssr: false, loading: () => <div className="h-96 flex items-center justify-center">Cargando...</div> })

export default function ChilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto py-20 text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="border-b bg-gradient-to-br from-red-50 via-blue-50/30 to-slate-50 dark:from-red-950/20 dark:via-blue-950/10 dark:to-slate-950">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <a href="/#countries" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a países
              </a>
            </Button>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">🇨🇱</div>
              <div>
                <Badge className="mb-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                  Perfil de País
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Chile
                </h1>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Análisis del ecosistema de trade finance chileno: 762,687 operaciones de la Comisión para el 
              Mercado Financiero (2015-2024). Insights sobre concentración bancaria, composición por moneda 
              y evolución temporal.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-red-600" />
                <span className="text-muted-foreground">762,687 operaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-red-600" />
                <span className="text-muted-foreground">10 bancos principales</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-600" />
                <span className="text-muted-foreground">2015-2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          
          {/* Context Card */}
          <Card className="mb-12 border-2 border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-600" />
                Sobre este Análisis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Este dashboard analiza el mercado chileno de trade finance basado en datos de la Comisión para 
                el Mercado Financiero (CMF) mediante el sistema FECU. Chile destaca por su estabilidad económica 
                y regulación financiera robusta, con un mercado bancario concentrado y transparente.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="text-sm font-semibold mb-1 text-blue-900 dark:text-blue-300">Cartera 2024</div>
                  <div className="text-xs text-muted-foreground">
                    CLP 18.2 trillones en cartera total
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <div className="text-sm font-semibold mb-1 text-red-900 dark:text-red-300">Concentración</div>
                  <div className="text-xs text-muted-foreground">
                    Top 5 bancos controlan 67% del mercado
                  </div>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
                  <div className="text-sm font-semibold mb-1 text-teal-900 dark:text-teal-300">Crecimiento</div>
                  <div className="text-xs text-muted-foreground">
                    2.9% CAGR 2015-2024
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Panorama</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="banks" className="gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Bancos</span>
                <span className="sm:hidden">Banks</span>
              </TabsTrigger>
              <TabsTrigger value="evolution" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Evolución</span>
                <span className="sm:hidden">Tiempo</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Panorama General</h2>
                <p className="text-muted-foreground mb-6">
                  Visión integral del mercado chileno de trade finance
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <CurrencyCompositionChart />
                <AnnualEvolutionChart />
              </div>

              <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 border-amber-200 dark:border-amber-900">
                <CardHeader>
                  <CardTitle className="text-lg">Hallazgos Clave del Panorama</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Dominancia del Peso Chileno:</strong> 78.3% de la cartera 
                    está denominada en CLP, inusualmente alto para trade finance. Esto sugiere que muchas operaciones 
                    son domésticas o que existe extensa cobertura cambiaria.
                  </p>
                  <p>
                    <strong className="text-foreground">Crecimiento Moderado:</strong> El CAGR de 2.9% es menor que 
                    Brasil (4.3%) o Perú, reflejando la madurez y estabilidad del mercado chileno. La volatilidad 
                    es baja pero el dinamismo también.
                  </p>
                  <p>
                    <strong className="text-foreground">Mercado Maduro:</strong> Chile tiene un ecosistema financiero 
                    sofisticado con regulación clara (CMF), pero el bajo ratio TF/Comercio (0.88%) sugiere subutilización 
                    o sub-reporte de instrumentos de trade finance.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Banks Tab */}
            <TabsContent value="banks" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Concentración Bancaria</h2>
                <p className="text-muted-foreground mb-6">
                  Análisis de los principales actores en el mercado de trade finance
                </p>
              </div>

              <div className="space-y-8">
                <BankConcentrationChart />

                <Card>
                  <CardHeader>
                    <CardTitle>Análisis del Mercado Bancario</CardTitle>
                    <CardDescription>Estructura competitiva y dinámica de players</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">BCI: Líder Indiscutido</h4>
                        <p>
                          Banco de Crédito e Inversiones captura 20.1% del mercado de trade finance en moneda 
                          extranjera, 2.7x más grande que el segundo player. Su expertise en comercio exterior 
                          y red internacional lo posicionan como referente.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Concentración Oligopólica</h4>
                        <p>
                          Top 3 controlan 50% del mercado, Top 5 llegan a 67%. Esta concentración es típica del 
                          sistema bancario chileno, donde 5-6 bancos dominan todos los segmentos. Barreras de 
                          entrada altas (capital, red, expertise).
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Bancos Internacionales Presentes</h4>
                        <p>
                          Santander, BBVA, Scotiabank están en el top 10, aprovechando redes globales de sus matrices. 
                          Facilitan operaciones transfronterizas con Europa y América.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Banca Pública Marginal</h4>
                        <p>
                          A diferencia de Brasil (BNDES) o Perú (COFIDE), Chile no tiene banca pública de fomento 
                          activa en trade finance. El mercado es 100% privado, lo que limita acceso para PYMEs.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <p>
                      <strong className="text-foreground">Implicación:</strong> La alta concentración puede limitar 
                      competitividad y acceso. Políticas de fomento deberían considerar líneas de garantía o fondos 
                      de segundo piso para diversificar oferta.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Evolution Tab */}
            <TabsContent value="evolution" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Evolución Temporal</h2>
                <p className="text-muted-foreground mb-6">
                  Tendencias del mercado de trade finance 2015-2024
                </p>
              </div>

              <div className="space-y-8">
                <AnnualEvolutionChart />

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Períodos Clave</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2015-2017: Estabilidad</h5>
                        <p>
                          Cartera se mantiene en ~CLP 14-15T. Economía chilena creciendo modestamente post-boom 
                          de commodities. Precio del cobre estable.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2018-2019: Crecimiento</h5>
                        <p>
                          Ligera expansión a CLP 16-17T. Diversificación exportadora (vino, salmón, frutas, servicios) 
                          complementa el cobre. Mayor integración con Asia-Pacífico (TPP11).
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2020-2021: COVID y Estallido Social</h5>
                        <p>
                          A pesar de turbulencia (protestas 2019, pandemia 2020), trade finance se mantiene. 
                          Exportaciones de recursos naturales sostuvieron la demanda.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2022-2024: Moderación</h5>
                        <p>
                          Cartera llega a CLP 18T pero crecimiento se desacelera. Incertidumbre política (proceso 
                          constitucional), inflación global y tasas altas afectan inversión.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Factores Estructurales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Estabilidad como Activo y Pasivo:</strong> La economía 
                        estable de Chile reduce riesgos, pero también la necesidad percibida de instrumentos de 
                        cobertura sofisticados.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Concentración Exportadora:</strong> Cobre representa 
                        ~50% de exportaciones. Diversificación hacia agro, vino, salmón avanza pero lentamente.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Regulación Clara:</strong> CMF proporciona transparencia 
                        y supervisión robusta, generando confianza pero también rigidez (menos innovación fintech 
                        en TF comparado con Brasil).
                      </p>

                      <p>
                        <strong className="text-foreground">Acceso PyME Limitado:</strong> Sin banca pública de 
                        fomento, PyMEs exportadoras enfrentan barreras. CORFO y ProChile ofrecen garantías pero 
                        cobertura es insuficiente.
                      </p>

                      <p>
                        <strong className="text-foreground">Perspectiva:</strong> Crecimiento será moderado (2-3% 
                        anual) a menos que haya reformas pro-PyME o nuevos acuerdos comerciales que expandan 
                        exportaciones no tradicionales.
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
                  <Database className="h-5 w-5 text-red-600" />
                  Sobre los Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Fuente Principal</h5>
                    <p>
                      Comisión para el Mercado Financiero (CMF) - Sistema FECU. Información financiera agregada 
                      de bancos operando en Chile. Período mensual 2015-2024.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Cobertura</h5>
                    <p>
                      Todos los bancos autorizados por CMF. Datos agregados a nivel nacional (no hay desagregación 
                      regional ni por tamaño de empresa).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Variables Incluidas</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Concentración bancaria (top 10)</li>
                      <li>Composición por moneda (CLP, FX, UF)</li>
                      <li>Series temporales anuales</li>
                      <li>Cuentas CMF (créditos comercio exterior)</li>
                      <li>Breakdown export vs import financing</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Limitaciones</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Sin datos de tamaño de empresa</li>
                      <li>Sin desagregación geográfica</li>
                      <li>Sin datos sectoriales directos</li>
                      <li>Ratio TF/Comercio bajo (0.88%)</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <Download className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-foreground">Datos Originales:</strong> Comisión para el Mercado Financiero (CMF) - 
                    Sistema FECU. Elaboración propia a partir de información pública agregada de bancos. ETL documentado en Scripts/chile_etl.R.
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
