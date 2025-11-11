"use client"

import { useState } from "react"
import { ArrowLeft, Database, TrendingUp, Building2, Calendar, Download, BarChart3 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { FirmSizeDistribution } from "@/components/peru/firm-size-distribution"
import { BankConcentration } from "@/components/peru/bank-concentration"
import { AnnualEvolution } from "@/components/peru/annual-evolution"

export default function PeruPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="border-b bg-gradient-to-br from-red-50 via-white to-slate-50 dark:from-red-950/20 dark:via-slate-950 dark:to-slate-950">
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
              <div className="text-6xl">🇵🇪</div>
              <div>
                <Badge className="mb-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                  Perfil de País
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Perú
                </h1>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Análisis del ecosistema de trade finance peruano: 96,496 observaciones de la SBS (2010-2024). 
              Insights sobre exclusión de PYMEs, concentración bancaria extrema y recuperación post-COVID.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-red-600" />
                <span className="text-muted-foreground">96,496 observaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-red-600" />
                <span className="text-muted-foreground">10 bancos principales</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-600" />
                <span className="text-muted-foreground">2010-2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          
          <Card className="mb-12 border-2 border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-600" />
                Sobre este Análisis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Este dashboard analiza el mercado peruano de trade finance basado en datos de la Superintendencia 
                de Banca, Seguros y AFP (SBS) mediante el Sistema de Información de Créditos (SIC). Perú destaca 
                por su recuperación post-COVID líder en LAC, pero también por la exclusión extrema de PYMEs.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="text-sm font-semibold mb-1 text-blue-900 dark:text-blue-300">Cartera 2024</div>
                  <div className="text-xs text-muted-foreground">
                    USD 2,870 millones en trade finance
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <div className="text-sm font-semibold mb-1 text-red-900 dark:text-red-300">Concentración</div>
                  <div className="text-xs text-muted-foreground">
                    CR5 = 88.6%, oligopolio BBVA-BCP-Scotiabank
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="text-sm font-semibold mb-1 text-green-900 dark:text-green-300">Recuperación</div>
                  <div className="text-xs text-muted-foreground">
                    +27.8% crecimiento 2021-22 (líder LAC)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
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
              <TabsTrigger value="evolution" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Evolución</span>
                <span className="sm:hidden">Tiempo</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Panorama General</h2>
                <p className="text-muted-foreground mb-6">
                  Visión integral del mercado peruano de trade finance
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <FirmSizeDistribution />
                <BankConcentration />
              </div>

              <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 border-amber-200 dark:border-amber-900">
                <CardHeader>
                  <CardTitle className="text-lg">Hallazgos Clave del Panorama</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Exclusión PYME Extrema:</strong> Corporate y Large capturan 
                    88.7% del trade finance, dejando solo 2.0% para pequeñas y microempresas. Esta es la concentración 
                    más alta de los 4 países analizados, superando incluso a Brasil.
                  </p>
                  <p>
                    <strong className="text-foreground">Oligopolio Bancario:</strong> BBVA Perú (28.7%), BCP y Scotiabank 
                    controlan el mercado con CR5 de 88.6%. Comparable a México en nivel de concentración, limitando 
                    competencia y encareciendo el acceso.
                  </p>
                  <p>
                    <strong className="text-foreground">Oportunidad:</strong> Con exportaciones no tradicionales creciendo 
                    (agro, textiles, pesca), hay espacio para productos de TF específicos para PYMEs exportadoras, 
                    potencialmente respaldados por COFIDE (banca de desarrollo).
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Estructura del Mercado</h2>
                <p className="text-muted-foreground mb-6">
                  Análisis de actores, segmentos y barreras de acceso
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <FirmSizeDistribution />
                  <BankConcentration />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Análisis de Exclusión PYME</CardTitle>
                    <CardDescription>Barreras sistémicas y oportunidades</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Tasa de Penetración TF</h4>
                        <p>
                          Empresas Large: 4.15% de su crédito total es TF. Empresas Small/Micro: solo 0.5-0.6% es TF. 
                          Esta brecha de 7-8x revela que PYMEs no solo reciben menos TF en términos absolutos, sino 
                          que tienen acceso proporcionalmente mucho menor.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Barreras Identificadas</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Requisitos de garantías excesivos</li>
                          <li>Costos de transacción altos vs. ticket promedio bajo</li>
                          <li>Documentación compleja (carta de crédito, conocimiento de embarque)</li>
                          <li>Falta de historial exportador</li>
                          <li>Concentración bancaria reduce oferta</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Rol de COFIDE</h4>
                        <p>
                          Corporación Financiera de Desarrollo (COFIDE) ofrece líneas de segundo piso para TF, pero 
                          su impacto es limitado. Los bancos intermediarios priorizan corporativos de todas formas. 
                          Se necesita mayor direccionamiento explícito hacia PYMEs.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Exportaciones No Tradicionales</h4>
                        <p>
                          Agro (palta, arándanos, café), textiles (prendas, alpaca) y pesca son sectores PYME-intensivos 
                          con alto potencial exportador. Productos de TF simplificados podrían desbloquear este mercado.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <p>
                      <strong className="text-foreground">Recomendación:</strong> Implementar esquemas de garantía 
                      parcial (ej. 50-70% cubierto por COFIDE o SEACE), líneas de factoring simplificado, y digitalización 
                      del proceso de LC para reducir costos operacionales.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="evolution" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Evolución Temporal</h2>
                <p className="text-muted-foreground mb-6">
                  Tendencias 2010-2024 y recuperación post-COVID
                </p>
              </div>

              <div className="space-y-8">
                <AnnualEvolution />

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Períodos Clave</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2010-2013: Boom Minero</h5>
                        <p>
                          Precios altos de metales (cobre &gt; USD 4/lb) impulsaron exportaciones. TF creció a 
                          USD 3,200M. Perú se consolidó como exportador de commodities.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2014-2016: Ajuste</h5>
                        <p>
                          Caída de precios de commodities. TF se contrajo a USD 2,400M. Crisis política (vacancia 
                          presidencial) generó incertidumbre.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2017-2019: Recuperación Lenta</h5>
                        <p>
                          Crecimiento moderado (2-3% anual). Diversificación exportadora hacia agro ayudó a estabilizar. 
                          TF alcanzó USD 2,600M.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2020: Contracción COVID</h5>
                        <p>
                          Pandemia y lockdown estricto (-11% PIB). TF cayó a USD 2,250M. Exportaciones paralizadas, 
                          puertos operando a capacidad reducida.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2021-2022: Rebote Excepcional</h5>
                        <p>
                          ¡+27.8% de crecimiento! El más fuerte de LAC. Impulsado por precios altos de cobre, demanda 
                          china, y boom agrícola (arándanos, palta). TF llegó a USD 2,870M.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-foreground">2023-2024: Consolidación</h5>
                        <p>
                          Crecimiento se modera pero se mantiene. Incertidumbre política persiste (protestas, cambios 
                          de gabinete), pero sector exportador resiliente.
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
                        <strong className="text-foreground">Dependencia de Commodities:</strong> Cobre representa 
                        ~30% de exportaciones. Precio del metal es el principal driver de TF. Volatilidad de mercados 
                        globales se transmite directamente.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Diversificación Exitosa:</strong> A diferencia de otros 
                        países mineros, Perú ha diversificado hacia agro (palta #1 mundial, arándanos top 3), pesca 
                        (harina de pescado) y textiles. Esto estabiliza demanda de TF.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">China Factor:</strong> 35% de exportaciones van a China. 
                        Demanda china de metales y alimentos sostiene el mercado. Riesgo: sobre-concentración geográfica.
                      </p>

                      <p>
                        <strong className="text-foreground">Institucionalidad Débil:</strong> Inestabilidad política 
                        (5 presidentes en 5 años) no ha detenido las exportaciones, pero genera incertidumbre. Marco 
                        regulatorio de TF es estable (SBS) pero podría simplificarse.
                      </p>

                      <p>
                        <strong className="text-foreground">Dolarización Alta:</strong> ~75% del TF está en USD 
                        (datos 2024), reflejando naturaleza dolarizada de exportaciones. Esto protege contra 
                        devaluación del Sol pero genera riesgo cambiario para importadores.
                      </p>

                      <p>
                        <strong className="text-foreground">Perspectiva 2025-2027:</strong> Crecimiento de 3-5% 
                        anual esperado. Oportunidad en PYMEs agroexportadoras si se reducen barreras de acceso. 
                        Nearshoring desde Asia podría beneficiar a Perú (textiles, manufactura liviana).
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
                      Superintendencia de Banca, Seguros y AFP (SBS) - Sistema de Información de Créditos (SIC). 
                      Datos mensuales de trade finance (&quot;Comercio exterior&quot;) para todos los bancos y financieras 
                      reguladas. Período: enero 2010 - diciembre 2024.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Cobertura</h5>
                    <p>
                      Todos los bancos autorizados por SBS (múltiples, comerciales, COFIDE). Datos desagregados 
                      por tamaño de empresa (Corporate, Large, Medium, Small, Micro) y tipo de crédito.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Variables Incluidas</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Distribución por tamaño de empresa</li>
                      <li>Concentración bancaria (top 10)</li>
                      <li>Series temporales anuales 2010-2024</li>
                      <li>Tasa de penetración TF por segmento</li>
                      <li>Dolarización del portafolio</li>
                      <li>Ratio TF/Comercio total</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Fortalezas</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Serie temporal larga (15 años)</li>
                      <li>Desagregación por tamaño de empresa</li>
                      <li>Datos de penetración TF</li>
                      <li>Transparencia regulatoria alta</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <Download className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-foreground">Datos Originales:</strong> Superintendencia de Banca, Seguros y AFP (SBS) - 
                    Sistema SIC. Elaboración propia a partir de información pública regulatoria. ETL documentado en Scripts/peru_etl.R.
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
