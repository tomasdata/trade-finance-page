"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Database, TrendingUp, Building2, MapPin, Calendar, Download, BarChart3, Shield } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { FirmSizeChart } from "@/components/brazil/firm-size-chart"
import { TemporalEvolutionChart } from "@/components/brazil/temporal-evolution-chart"
import { SectorChart } from "@/components/brazil/sector-chart"
import { StateDistributionChart } from "@/components/brazil/state-distribution-chart"
import { MaturityStructureChart } from "@/components/brazil/maturity-structure-chart"
import { NPLAnalysisChart } from "@/components/brazil/npl-analysis-chart"
import { IndexerDistributionChart } from "@/components/brazil/indexer-distribution-chart"
import { CurrencyDistributionChart } from "@/components/brazil/currency-distribution-chart"

export default function BrasilPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="border-b bg-gradient-to-br from-green-50 via-blue-50/30 to-slate-50 dark:from-green-950/20 dark:via-blue-950/10 dark:to-slate-950">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a países
            </Button>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">🇧🇷</div>
              <div>
                <Badge className="mb-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                  Perfil de País
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Brasil
                </h1>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Análisis completo del ecosistema de trade finance: 838,167 operaciones registradas por el 
              Banco Central do Brasil (2012-2024). Insights sobre distribución por tamaño de empresa, 
              sectores, estados y evolución temporal.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">838,167 operaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">5 categorías de empresa</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">27 estados</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">2012-2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          
          {/* Context Card */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Sobre este Análisis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Este dashboard presenta un análisis exhaustivo del mercado brasileño de trade finance basado en 
                datos del Sistema de Información de Crédito (SCR) del Banco Central do Brasil. Con más de 838 mil 
                operaciones registradas entre 2012 y 2024, Brasil cuenta con uno de los datasets más completos y 
                transparentes de América Latina.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="text-sm font-semibold mb-1 text-blue-900 dark:text-blue-300">Cartera Total</div>
                  <div className="text-xs text-muted-foreground">
                    BRL 26.6 mil millones en cartera activa (promedio 2012-2024)
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="text-sm font-semibold mb-1 text-green-900 dark:text-green-300">Calidad Crediticia</div>
                  <div className="text-xs text-muted-foreground">
                    NPL de 0.75% (&gt;15 días), excelente calidad de cartera
                  </div>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
                  <div className="text-sm font-semibold mb-1 text-teal-900 dark:text-teal-300">Tendencia</div>
                  <div className="text-xs text-muted-foreground">
                    CAGR de 4.3% anual, crecimiento sostenido post-COVID
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto overflow-x-auto">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Panorama</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="structure" className="gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Estructura</span>
                <span className="sm:hidden">Datos</span>
              </TabsTrigger>
              <TabsTrigger value="geography" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Geografía</span>
                <span className="sm:hidden">Geo</span>
              </TabsTrigger>
              <TabsTrigger value="evolution" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Evolución</span>
                <span className="sm:hidden">Tiempo</span>
              </TabsTrigger>
              <TabsTrigger value="quality" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Calidad</span>
                <span className="sm:hidden">Qtd</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Panorama General</h2>
                <p className="text-muted-foreground mb-6">
                  Visión integral del mercado brasileño de trade finance
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <FirmSizeChart />
                <MaturityStructureChart />
              </div>

              <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 border-amber-200 dark:border-amber-900">
                <CardHeader>
                  <CardTitle className="text-lg">Hallazgos Clave del Panorama</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Concentración en Grandes Empresas:</strong> El 78.1% de 
                    la cartera está en manos de grandes empresas, evidenciando una barrera significativa para 
                    PYMEs. Solo el 4.6% de la cartera corresponde a micro y pequeñas empresas combinadas.
                  </p>
                  <p>
                    <strong className="text-foreground">Plazos Medios Predominan:</strong> El 39.5% de la cartera 
                    se concentra en el bucket de 91-360 días, alineado con los ciclos típicos de comercio internacional. 
                    Esto refleja un perfil de riesgo moderado.
                  </p>
                  <p>
                    <strong className="text-foreground">Implicación:</strong> Existe una oportunidad para desarrollar 
                    productos específicos para PYMEs exportadoras, potencialmente respaldados por garantías públicas 
                    o esquemas de factoring más accesibles.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Structure Tab */}
            <TabsContent value="structure" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Estructura del Mercado</h2>
                <p className="text-muted-foreground mb-6">
                  Distribución por sectores económicos y características de las operaciones
                </p>
              </div>

              <div className="space-y-8">
                <SectorChart />

                <Card>
                  <CardHeader>
                    <CardTitle>Análisis Sectorial Profundo</CardTitle>
                    <CardDescription>Drivers y características por industria</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Manufactura (54.8%)</h4>
                        <p>
                          Las industrias de transformación lideran el uso de trade finance, principalmente en 
                          sectores exportadores como automotriz, maquinaria, químicos y alimentos procesados. 
                          Brasil exporta US$ 340 mil millones anuales, con fuerte presencia manufacturera.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Comercio Mayorista</h4>
                        <p>
                          El segundo sector más relevante, refleja la intermediación de commodities y productos 
                          importados. Muchas operaciones corresponden a financiamiento de importación (pre-embarque) 
                          de insumos para la industria local.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Agricultura</h4>
                        <p>
                          Brasil es potencia agrícola global (soja, café, azúcar, carne). El trade finance es 
                          crítico para financiar ciclos de producción y exportación, especialmente para cooperativas 
                          y productores medianos.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Servicios Limitados</h4>
                        <p>
                          A diferencia de economías más terciarias, los servicios tienen participación marginal en 
                          trade finance brasileño. El foco está en bienes tangibles exportables.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <p>
                      <strong className="text-foreground">Implicación Estratégica:</strong> Las políticas de fomento 
                      al trade finance deben priorizar manufactura y agroindustria, donde Brasil tiene ventajas 
                      competitivas. Instrumentos como el BNDES-Exim y PROEX están bien alineados con esta estructura sectorial.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Geography Tab */}
            <TabsContent value="geography" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Distribución Geográfica</h2>
                <p className="text-muted-foreground mb-6">
                  Análisis por estados brasileños y concentración regional
                </p>
              </div>

              <div className="space-y-8">
                <StateDistributionChart />

                <Card>
                  <CardHeader>
                    <CardTitle>Dinámicas Regionales</CardTitle>
                    <CardDescription>Factores que explican la distribución geográfica</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">São Paulo: Hub Financiero y Exportador</h4>
                        <p>
                          Con 38.7% de operaciones, SP concentra sedes de grandes empresas, puertos (Santos, el 
                          mayor de América Latina), y el ecosistema financiero más desarrollado. Es puerta de 
                          entrada/salida natural del comercio brasileño.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Región Sur: Potencia Exportadora</h4>
                        <p>
                          RS + SC + PR suman 42% de la cartera. Esta región exporta commodities agrícolas, proteína 
                          animal, textiles y productos manufacturados. Fuerte presencia de PyMEs exportadoras y 
                          cooperativas agropecuarias.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Minas Gerais: Minería y Siderurgia</h4>
                        <p>
                          MG aporta ~5% de la cartera, principalmente por exportaciones de hierro, acero y minerales. 
                          Vale y otras mineras intensivas en capital usan trade finance para gestionar flujos complejos.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Regiones Menos Representadas</h4>
                        <p>
                          Norte y Nordeste tienen menor participación, reflejando economías más orientadas al mercado 
                          interno. Políticas regionales podrían incentivar exportaciones desde Bahía, Pernambuco y 
                          Ceará (zonas económicas especiales, beneficios fiscales).
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <p>
                      <strong className="text-foreground">Oportunidad de Diversificación:</strong> Ampliar el acceso 
                      al trade finance en regiones menos atendidas podría impulsar exportaciones no tradicionales y 
                      reducir desigualdades regionales.
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
                  Tendencias de la cartera de trade finance (2012-2024)
                </p>
              </div>

              <div className="space-y-8">
                <TemporalEvolutionChart />

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Períodos Clave</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2012-2014: Crecimiento Moderado</h5>
                        <p>
                          Expansión gradual impulsada por boom de commodities. Brasil exportaba a China en niveles 
                          récord. Cartera creció de BRL 65bn a BRL 110bn.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2015-2016: Crisis y Estancamiento</h5>
                        <p>
                          Recesión económica, crisis política, caída de exportaciones. Cartera se mantuvo flat en 
                          ~BRL 95-105bn. Algunas empresas recurrieron más a TF por restricción de crédito doméstico.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2017-2019: Recuperación</h5>
                        <p>
                          Retorno de confianza, reformas estructurales, exportaciones recuperándose. Cartera alcanzó 
                          BRL 115bn. Mayor participación de medianas empresas.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2020-2021: Resiliencia COVID</h5>
                        <p>
                          A diferencia de otros sectores, trade finance mostró resistencia. Exportaciones agrícolas 
                          crecieron (China demandando alimentos). Cartera se mantuvo en BRL 110-120bn.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2022-2024: Expansión Sostenida</h5>
                        <p>
                          Post-pandemia, exportaciones brasileñas batieron récords (US$ 340bn en 2023). Cartera llegó 
                          a BRL 125-130bn. Nuevos sectores (energías renovables, tecnología) entrando al mercado.
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
                        <strong className="text-foreground">Diversificación de Destinos:</strong> Brasil redujo 
                        dependencia de pocos mercados. Hoy exporta a 190+ países, con China, EE.UU., UE y Argentina 
                        como principales socios. Esto estabiliza la demanda de TF.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Rol del BNDES y Bancomext:</strong> Líneas de crédito 
                        subsidiadas (BNDES-Exim, PROEX) actúan contracíclicamente. Cuando bancos privados restringen, 
                        banca pública compensa.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Digitalización:</strong> Plataformas electrónicas (e-SCR, 
                        sistemas de bancos) reducen costos operacionales y tiempos de aprobación. Fintechs empiezan a 
                        ofrecer factoring de exportación online.
                      </p>

                      <p>
                        <strong className="text-foreground">Calidad de Cartera:</strong> NPL consistentemente bajo 
                        (0.7-0.9%) gracias a garantías (mercancías, cartas de crédito) y análisis riguroso. Bancos 
                        ven TF como segmento de bajo riesgo.
                      </p>

                      <p>
                        <strong className="text-foreground">Perspectiva 2024-2025:</strong> Con Brasil retomando 
                        protagonismo en cadenas globales (nearshoring desde China, transición energética), se espera 
                        crecimiento continuo. Desafío: incluir más PYMEs en este mercado.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Quality Tab */}
            <TabsContent value="quality" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Calidad de Cartera</h2>
                <p className="text-muted-foreground mb-6">
                  Indicadores de riesgo crediticio, tasas y composición de divisas
                </p>
              </div>

              <div className="space-y-8">
                <NPLAnalysisChart />

                <div className="grid lg:grid-cols-2 gap-8">
                  <IndexerDistributionChart />
                  <CurrencyDistributionChart />
                </div>

                <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10 border-green-200 dark:border-green-900">
                  <CardHeader>
                    <CardTitle className="text-lg">Resumen de Indicadores de Riesgo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Cartera de Excelente Calidad</h4>
                        <p>
                          Con un ratio NPL (&gt;15 días) de 0.75%, el trade finance brasileño se posiciona como uno de 
                          los segmentos de menor riesgo en el sistema financiero. Esto es resultado de: (i) garantías 
                          inherentes (mercancías, cartas de crédito), (ii) análisis exhaustivo de empresas exportadoras 
                          y (iii) supervisión activa del BCB.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Gestión de Tasa Equilibrada</h4>
                        <p>
                          La casi equidistribución entre tasas prefijadas (46.4%) y variables (46.1%) refleja estrategias 
                          diferenciadas: tasas fijas para operaciones de corto plazo (pre-embarque) y variables para 
                          financiamiento a mayor plazo. Esto permite a bancos y empresas gestionar riesgos de tasa acorde 
                          a sus horizontes.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Composición de Divisas</h4>
                        <p>
                          Aproximadamente 80% de la cartera está denominada en BRL, lo que mitiga riesgos de devaluación 
                          para empresas importadoras brasileñas. El 20% en USD es natural dado el comercio global, 
                          especialmente en commodities donde USD es la referencia.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Implicación Regulatoria</h4>
                        <p>
                          Estos indicadores justifican tratamientos preferenciales en requerimientos de capital 
                          (Basiléa III) y márgenes regulatorios. Bancos pueden ofrecer tasas más competitivas en TF 
                          versus crédito directo, incentivando el financiamiento del comercio internacional.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  <Database className="h-5 w-5 text-green-600" />
                  Sobre los Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Fuente Principal</h5>
                    <p>
                      Sistema de Información de Crédito (SCR) del Banco Central do Brasil. Dataset público con 
                      838,167 operaciones de trade finance entre enero 2012 y diciembre 2024.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Cobertura</h5>
                    <p>
                      Todas las instituciones financieras autorizadas por el BCB. Incluye bancos comerciales, 
                      bancos de inversión, BNDES, cooperativas de crédito y fintechs con licencia.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Variables Incluidas</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Tamaño de empresa (clasificación BCB)</li>
                      <li>Sector económico (CNAE)</li>
                      <li>Estado/región geográfica</li>
                      <li>Cartera activa y vencida</li>
                      <li>Plazos de vencimiento</li>
                      <li>Tipo de indexador (tasa)</li>
                      <li>Moneda (BRL, USD, EUR)</li>
                      <li>Indicadores de morosidad (NPL)</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Procesamiento</h5>
                    <p>
                      Los datos fueron limpiados, agregados y analizados siguiendo metodología documentada en 
                      repositorio GitHub. Se utilizó R para ETL y estadísticas descriptivas.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <Download className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-foreground">Datos Originales:</strong> Banco Central do Brasil - SCR System. 
                    Elaboración propia a partir de datos públicos. Transformación ETL documentada en Scripts/brasil_etl.R.
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
