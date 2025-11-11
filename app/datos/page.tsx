"use client"

import { useState } from "react"
import { ArrowLeft, Database, TrendingUp, Globe, AlertCircle, Calendar, FileText } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { BISCrisisTimeline } from "@/components/global/bis-crisis-timeline"
import { BISLendersSankey } from "@/components/global/bis-lenders-sankey"
import { EXIMDeclineAnalysis } from "@/components/global/exim-decline-analysis"
import { EximVsBisRatio } from "@/components/global/exim-vs-bis-ratio"
import { EXIMPymeAccess } from "@/components/global/exim-pyme-access"

export default function DatosPage() {
  const [activeTab, setActiveTab] = useState("bis")

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
              Panorama Global
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Financiamiento Internacional a Latinoamérica
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Análisis riguroso de 40 años de exposición bancaria internacional (BIS) y programas oficiales USA (EXIM Bank). 
              Evidencia crisis, dependencia externa y exclusión PYME.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-indigo-600" />
                <span className="text-muted-foreground">532 trimestres (BIS 1983-2024)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-indigo-600" />
                <span className="text-muted-foreground">4 países LAC-4 + 152 destinos EXIM</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span className="text-muted-foreground">40 años de crisis y recuperación</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          
          {/* Disclaimer Card */}
          <Card className="mb-12 border-2 border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-400">
                <AlertCircle className="h-5 w-5" />
                Disclaimer Metodológico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>BIS Consolidated Banking Statistics</strong> captura exposición bancaria internacional TOTAL 
                (Trade Finance + préstamos corporativos + exposición soberana + interbancario). 
                No existe base de datos global que aisle Trade Finance puro (gap conocido en literatura académica).
              </p>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>EXIM Bank USA</strong> mide solo programas oficiales de crédito a exportación USA. 
                Representa 0.05-0.35% del mercado total (BIS). No captura el 99.5% restante de financiamiento comercial privado.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-900">
                  <div className="text-xs font-semibold mb-1 text-blue-900 dark:text-blue-300">Fuentes</div>
                  <div className="text-xs text-muted-foreground">
                    BIS: https://www.bis.org/statistics/consstats.htm<br/>
                    EXIM: https://www.exim.gov/data-reports
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-900">
                  <div className="text-xs font-semibold mb-1 text-purple-900 dark:text-purple-300">Referencias</div>
                  <div className="text-xs text-muted-foreground">
                    Hardy & Saffie (2023) JoF<br/>
                    Ahir, Bloom & Furceri WUI
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
              <TabsTrigger value="bis" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">BIS: Mercado Total</span>
                <span className="sm:hidden">BIS</span>
              </TabsTrigger>
              <TabsTrigger value="exim" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">EXIM: Programas Oficiales</span>
                <span className="sm:hidden">EXIM</span>
              </TabsTrigger>
              <TabsTrigger value="comparacion" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Comparación & PYME</span>
                <span className="sm:hidden">Análisis</span>
              </TabsTrigger>
            </TabsList>

            {/* BIS Tab */}
            <TabsContent value="bis" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Exposición Bancaria Internacional (BIS)</h2>
                <p className="text-muted-foreground mb-6">
                  40 años de datos trimestrales (1983-2024). Análisis de crisis, dependencia externa y concentración bancaria.
                </p>
              </div>

              <BISCrisisTimeline />
              <BISLendersSankey />
            </TabsContent>

            {/* EXIM Tab */}
            <TabsContent value="exim" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">EXIM Bank USA: Programas Oficiales (2007-2025)</h2>
                <p className="text-muted-foreground mb-6">
                  Análisis de retiro gradual USA de LAC, estructura de programas (Guarantee/Insurance/Loan) y acceso PYME.
                </p>
              </div>

              <EXIMDeclineAnalysis />
              <EXIMPymeAccess />
            </TabsContent>

            {/* Comparación Tab */}
            <TabsContent value="comparacion" className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">EXIM vs. BIS: Contextualizando Programas Oficiales</h2>
                <p className="text-muted-foreground mb-6">
                  Evidencia empírica de la marginalidad de EXIM (0.05-0.35% del mercado) e implicaciones para investigación académica.
                </p>
              </div>

              <EximVsBisRatio />

              <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-blue-200 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="text-lg">💡 Takeaways para Economistas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">1. EXIM NO es representativo del mercado TF:</strong> Papers que usan solo datos EXIM 
                    (firm-level exposure, efectos de garantías) capturan &lt;0.5% del universo. Resultados NO generalizables. 
                    External validity limitada.
                  </p>
                  <p>
                    <strong className="text-foreground">2. BIS incluye más que TF:</strong> Exposición total = TF + corporate loans + 
                    soberana + interbancario. Para aislar TF, cruzar con datos de comercio (X+M) y asumir ratio TF/Trade ≈ 15-25% 
                    (estimación ICC).
                  </p>
                  <p>
                    <strong className="text-foreground">3. España domina, no USA:</strong> 36.9% del financiamiento LAC viene de bancos 
                    españoles. Implicación: shocks en Eurozona (ej. 2012 crisis deuda) tienen mayor contagio a LAC que shocks USA. 
                    Contraintuitivo dado percepción popular.
                  </p>
                  <p>
                    <strong className="text-foreground">4. Home bias extremadamente bajo:</strong> México/Perú 0% financiamiento doméstico. 
                    Brasil/Chile &lt;50%. Comparar con USA (75%), Alemania (70%). LAC altamente vulnerable a sudden stops.
                  </p>
                  <p>
                    <strong className="text-foreground">5. PYME exclusión estructural:</strong> Acceso PYME 2.7-20.9% vs. benchmark 35-40%. 
                    Policy recommendations: ventanillas PYME, garantías parciales, digitalizar aplicaciones, reducir colateral requerido.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Footer Notes */}
          <div className="mt-16 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">📚 Referencias y Metodología</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Fuentes Primarias</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Bank for International Settlements - CBS Table (1983-2024)</li>
                  <li>Export-Import Bank of the United States - Authorization Reports (2007-2025)</li>
                  <li>Hardy & Saffie (2023) - Network Risk and Key Players, Journal of Finance</li>
                  <li>World Uncertainty Index - Ahir, Bloom & Furceri</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Procesamiento de Datos</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>BIS: Sin ajustes, datos directos quarterly</li>
                  <li>EXIM: Encoding latin1, filtro LAC-4, exclusión offshore borrowers</li>
                  <li>Ratios EXIM/BIS: EXIM disbursed / BIS total 2024-Q4</li>
                  <li>Código disponible en: <code className="text-xs bg-muted px-1 py-0.5 rounded">transformacion-json/</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
