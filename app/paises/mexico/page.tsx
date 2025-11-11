"use client"

import { useState } from "react"
import { ArrowLeft, Database, TrendingUp, Building2, Calendar, AlertTriangle, BarChart3 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LCBankConcentration } from "@/components/mexico/lc-bank-concentration"
import { LCMonthlyEvolution } from "@/components/mexico/lc-monthly-evolution"
import { LCSeasonality } from "@/components/mexico/lc-seasonality"

export default function MexicoPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="border-b bg-gradient-to-br from-green-50 via-red-50/30 to-slate-50 dark:from-green-950/20 dark:via-red-950/10 dark:to-slate-950">
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
              <div className="text-6xl">🇲🇽</div>
              <div>
                <Badge className="mb-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                  Perfil de País
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  México
                </h1>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Análisis de cartas de crédito (Letters of Credit): 2,204 observaciones de CNBV (2022-2025). 
              <strong> NOTA CRÍTICA:</strong> Estos datos cubren solo ~15-25% del mercado total de trade finance.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">2,204 observaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">10 bancos principales</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">2022-2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          
          <Alert variant="destructive" className="mb-8 border-2">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg">Limitación Crítica de Datos</AlertTitle>
            <AlertDescription className="text-sm mt-2 space-y-2">
              <p>
                <strong>México reporta ÚNICAMENTE cartas de crédito (LC)</strong>, que representan solo el 15-25% 
                del mercado total de trade finance. El mercado completo se estima en USD 25-35 mil millones, pero 
                solo observamos USD 5.7 mil millones en LC.
              </p>
              <p className="text-xs">
                <strong>Faltantes (75-85% del mercado):</strong> Financiamiento pre/post-exportación, préstamos 
                para comercio exterior, garantías, factoring internacional, confirming. CNBV no reporta estos 
                instrumentos de forma desagregada.
              </p>
            </AlertDescription>
          </Alert>
          
          <Card className="mb-12 border-2 border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Sobre este Análisis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Este dashboard analiza el mercado mexicano de cartas de crédito basado en datos de la Comisión 
                Nacional Bancaria y de Valores (CNBV) - Reporte R12A Sección 133. A pesar de las limitaciones, 
                las LC revelan concentración bancaria extrema y el impacto moderado del nearshoring.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="text-sm font-semibold mb-1 text-blue-900 dark:text-blue-300">LC Anuales</div>
                  <div className="text-xs text-muted-foreground">
                    USD 5.7 mil millones (promedio 2022-2025)
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="text-sm font-semibold mb-1 text-green-900 dark:text-green-300">Concentración</div>
                  <div className="text-xs text-muted-foreground">
                    CR5 = 81.0%, duopolio BBVA-Santander (50.9%)
                  </div>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-lg border border-teal-200 dark:border-teal-900">
                  <div className="text-sm font-semibold mb-1 text-teal-900 dark:text-teal-300">Crecimiento</div>
                  <div className="text-xs text-muted-foreground">
                    +3.8% CAGR 2022-2025, +7.7% desde nearshoring 2023
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
              <TabsTrigger value="banks" className="gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Bancos</span>
                <span className="sm:hidden">Banks</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Tendencias</span>
                <span className="sm:hidden">Tiempo</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Panorama de Cartas de Crédito</h2>
                <p className="text-muted-foreground mb-6">
                  Visión integral del mercado mexicano de LC (subset del TF total)
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <LCMonthlyEvolution />
                <LCSeasonality />
              </div>

              <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 border-amber-200 dark:border-amber-900">
                <CardHeader>
                  <CardTitle className="text-lg">Hallazgos Clave</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Nearshoring Subestimado:</strong> Las LC crecieron solo 
                    7.7% desde 2023, muy por debajo del boom de IED (+19.3%). Esto sugiere que las nuevas cadenas 
                    de suministro usan otros instrumentos o aún no impactan LC.
                  </p>
                  <p>
                    <strong className="text-foreground">Estacionalidad Marcada:</strong> Pico en oct-nov (+7-10%) 
                    por temporada navideña y Buen Fin. Mínimo en ene-feb post-fiestas. Patrón consistente con 
                    ciclo retail mexicano.
                  </p>
                  <p>
                    <strong className="text-foreground">USMCA Reduce LC:</strong> Con 66% del comercio con EE.UU., 
                    muchas empresas mexicanas usan open account (cuenta abierta) en lugar de LC, explicando el bajo 
                    ratio LC/Trade (0.50% vs 15-25% benchmark global).
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="banks" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Concentración Bancaria</h2>
                <p className="text-muted-foreground mb-6">
                  Análisis de players en el mercado de cartas de crédito
                </p>
              </div>

              <div className="space-y-8">
                <LCBankConcentration />

                <Card>
                  <CardHeader>
                    <CardTitle>Análisis del Duopolio</CardTitle>
                    <CardDescription>Estructura oligopólica y barreras de acceso</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">BBVA México: Líder Absoluto</h4>
                        <p>
                          Captura ~30% del mercado de LC. Su fortaleza viene de red internacional BBVA Group, 
                          tecnología avanzada y experiencia en comercio exterior. Domina segmento corporativo.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Santander: Segundo Fuerte</h4>
                        <p>
                          Con ~21% de market share, Santander México aprovecha la red global de Santander Group. 
                          Juntos con BBVA forman un duopolio que controla 50.9% del mercado.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Dominancia Extranjera</h4>
                        <p>
                          68.4% del mercado está en manos de bancos extranjeros (BBVA, Santander, HSBC, Scotiabank, 
                          Citibanamex). Solo Banorte representa banca mexicana en top 10.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Barreras para PyMEs</h4>
                        <p>
                          CR5 de 81.0% (extremadamente alto) limita opciones para exportadores pequeños. Sin banca 
                          de desarrollo activa en LC, PyMEs dependen de estos oligopolios con costos elevados.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <p>
                      <strong className="text-foreground">Implicación:</strong> La concentración extrema junto con 
                      la limitada disponibilidad de datos sugiere un mercado de trade finance poco transparente y 
                      con barreras significativas de acceso. Bancomext (banca de desarrollo) existe pero su impacto 
                      en LC no es visible en estos datos CNBV.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Tendencias y Contexto</h2>
                <p className="text-muted-foreground mb-6">
                  Nearshoring, USMCA y el futuro del trade finance mexicano
                </p>
              </div>

              <div className="space-y-8">
                <LCMonthlyEvolution />

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Nearshoring: Expectativa vs Realidad</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">IED Boom:</strong> La inversión extranjera directa en 
                        México creció 19.3% desde 2023, impulsada por empresas que relocalizan desde China (Tesla, 
                        BMW, semiconductores, electrónica).
                      </p>
                      
                      <p>
                        <strong className="text-foreground">LC Moderadas:</strong> Sin embargo, las cartas de crédito 
                        solo crecieron 7.7%, menos de la mitad del ritmo de IED. ¿Por qué?
                      </p>
                      
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Nuevas plantas aún en construcción (lag 2-3 años)</li>
                        <li>Financiamiento intra-firma (matriz financia filial directamente)</li>
                        <li>Open account con proveedores de confianza (especialmente US)</li>
                        <li>Uso de otros instrumentos no capturados (factoring, confirming)</li>
                      </ul>

                      <p>
                        <strong className="text-foreground">Perspectiva:</strong> Se espera que LC crezcan 10-15% 
                        anual 2025-2027 conforme nuevas operaciones nearshoring entren en fase productiva.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Factores Estructurales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">USMCA/T-MEC:</strong> El tratado facilita comercio con 
                        EE.UU. (66% del total), permitiendo open account sin LC. Esto reduce artificialmente el 
                        uso de LC pero no significa ausencia de TF (hay otros instrumentos).
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Diversificación Limitada:</strong> A diferencia de Brasil 
                        o Chile, México depende mucho de un solo socio (USA). Esto simplifica trade finance pero 
                        genera vulnerabilidad ante shocks bilaterales.
                      </p>
                      
                      <p>
                        <strong className="text-foreground">Bancomext Invisible:</strong> El banco de desarrollo 
                        Bancomext debería jugar rol contracíclico, pero no aparece en datos CNBV de LC. O bien 
                        opera en otros instrumentos (garantías, préstamos) o su presencia es marginal.
                      </p>

                      <p>
                        <strong className="text-foreground">Gap de Datos Crítico:</strong> Sin información de 
                        pre/post-export finance, garantías y factoring, es imposible evaluar el mercado completo. 
                        México necesita transparencia mejorada (similar a Brasil SCR).
                      </p>

                      <p>
                        <strong className="text-foreground">Futuro:</strong> Nearshoring traerá más demanda de TF, 
                        especialmente para PyMEs en cadenas de suministro. Se necesitan políticas para evitar que 
                        el duopolio BBVA-Santander capture todo el upside.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-12" />

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Metodología y Limitaciones</h2>
            
            <Card className="border-2 border-amber-200 dark:border-amber-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Sobre los Datos y Sus Limitaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Fuente</h5>
                    <p>
                      CNBV - Reporte R12A Sección 133. Datos mensuales de cartas de crédito (import + export, 
                      no distinguidos) para todos los bancos autorizados. Período: enero 2022 - agosto 2025.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Cobertura</h5>
                    <p>
                      <strong className="text-red-600">SOLO cartas de crédito.</strong> Estimamos que LC 
                      representan 15-25% del mercado total de trade finance. El 75-85% restante NO está cubierto.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">¿Qué Falta?</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Financiamiento pre/post-exportación</li>
                      <li>Préstamos para comercio exterior</li>
                      <li>Garantías bancarias internacionales</li>
                      <li>Factoring y confirming internacional</li>
                      <li>Líneas de crédito revolving para TF</li>
                      <li>Bancomext y banca de desarrollo</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Otras Limitaciones</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Sin desagregación por tamaño de empresa</li>
                      <li>Sin datos sectoriales</li>
                      <li>Sin información geográfica</li>
                      <li>No distingue import vs export</li>
                      <li>Serie temporal muy corta (3 años)</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-2 border-red-300 dark:border-red-800">
                  <p className="text-xs font-semibold text-red-900 dark:text-red-300 mb-2">
                    ⚠️ ADVERTENCIA DE INTERPRETACIÓN
                  </p>
                  <p className="text-xs">
                    Los hallazgos de este dashboard NO representan el mercado completo de trade finance en México. 
                    Son válidos únicamente para el segmento de cartas de crédito, que es minoritario. Conclusiones 
                    sobre concentración bancaria, volúmenes y crecimiento deben tomarse con esta salvedad. El mercado 
                    real es 4-7x más grande que lo observado aquí.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
