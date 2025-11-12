"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  DollarSign,
  Shield,
  FileText,
  CreditCard,
  Globe,
  AlertCircle,
  Building2,
  BookOpen,
  ChevronDown,
  Award,
  BarChart3,
  ExternalLink,
  Lightbulb,
  Target,
  Zap,
  Network,
  Scale,
  Smartphone,
  Database,
  ArrowRight,
  Users,
  MapPin,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { StatCard } from "@/components/stat-card"
import { InstrumentCard } from "@/components/instrument-card"
import { BarrierCard } from "@/components/barrier-card"
import { CountryCard } from "@/components/country-card"
import { EmptyChartState } from "@/components/empty-chart-state"
import { ProgramTable } from "@/components/program-table"
import { CountryDetailCard } from "@/components/country-detail-card"
import { GlobalInitiativeCard } from "@/components/global-initiative-card"
import { LessonCard } from "@/components/lesson-card"
import { GlobalPreviewCard } from "@/components/global-preview-card"
import { FinancingGapAnalysis } from "@/components/financing-gap-analysis"
import { CountryRadarComparison } from "@/components/country-radar-comparison"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const instruments = [
  {
    icon: FileText,
    title: "Cartas de Crédito (L/C)",
    description:
      "Garantía bancaria de pago para transacciones internacionales. Reduce el riesgo entre importador y exportador.",
  },
  {
    icon: Shield,
    title: "Seguro de Crédito a la Exportación",
    description: "Protección contra impago del importador. Cubre riesgos políticos y comerciales.",
  },
  {
    icon: CreditCard,
    title: "Factoring Internacional",
    description: "Adelanto de fondos sobre facturas de exportación. Mejora el flujo de caja inmediato.",
  },
  {
    icon: DollarSign, // Updated from Package to DollarSign
    title: "Financiamiento de Inventarios",
    description: "Crédito colateralizado con mercancías. Permite financiar stock para exportación.",
  },
  {
    icon: TrendingUp, // Updated from Wallet to TrendingUp
    title: "Pre y Post-Embarque",
    description: "Financiamiento antes y después del envío. Cubre todo el ciclo de la operación comercial.",
  },
  {
    icon: Award, // Updated from Truck to Award
    title: "Garantías de Cumplimiento",
    description: "Aseguran la ejecución de contratos comerciales. Esenciales para licitaciones y proyectos.",
  },
]

const barriers = [
  {
    icon: DollarSign,
    title: "Altos Costos de Transacción",
    description:
      "Las comisiones bancarias y costos administrativos pueden alcanzar 2-5% del valor de la operación, limitando el acceso para PYMEs.",
    impact: "Alto" as const,
  },
  {
    icon: FileText,
    title: "Complejidad Documental",
    description:
      "Procesos burocráticos extensos y requisitos documentales estrictos generan barreras de entrada significativas.",
    impact: "Alto" as const,
  },
  {
    icon: Building2,
    title: "Capacidad Institucional Limitada",
    description: "Falta de bancos especializados y oficinas de crédito a la exportación en varios países de la región.",
    impact: "Medio" as const,
  },
  {
    icon: BookOpen,
    title: "Desconocimiento de Instrumentos",
    description:
      "Las empresas exportadoras, especialmente PYMEs, desconocen las opciones de financiamiento disponibles.",
    impact: "Alto" as const,
  },
  {
    icon: AlertCircle, // Updated from Lock to AlertCircle
    title: "Garantías Insuficientes",
    description:
      "Requisitos de colateral elevados dificultan el acceso al crédito para empresas sin activos significativos.",
    impact: "Alto" as const,
  },
  {
    icon: Shield, // Updated from AlertCircle to Shield
    title: "Percepción de Riesgo",
    description:
      "Los bancos perciben alto riesgo en comercio exterior, resultando en menor oferta de productos financieros.",
    impact: "Medio" as const,
  },
]

const countries = [
  { name: "Chile", flag: "🇨🇱", coordinates: [-33.4489, -70.6693] as [number, number] },
  { name: "Perú", flag: "🇵🇪", coordinates: [-12.0464, -77.0428] as [number, number] },
  { name: "Brasil", flag: "🇧🇷", coordinates: [-15.7975, -47.8919] as [number, number] },
  { name: "Colombia", flag: "🇨🇴", coordinates: [4.711, -74.0721] as [number, number] },
  { name: "México", flag: "🇲🇽", coordinates: [19.4326, -99.1332] as [number, number] },
  { name: "Centroamérica", flag: "🌎", coordinates: [14.6349, -90.5069] as [number, number] },
]

const countryPrograms = {
  Chile: {
    institutions: [
      {
        name: "ProChile",
        type: "Promoción",
        description: "Agencia de promoción de exportaciones con 16 oficinas regionales y 57 internacionales",
        link: "https://www.prochile.gob.cl",
      },
      {
        name: "CORFO",
        type: "Financiamiento",
        description: "Corporación de Fomento de la Producción - Programas de garantías",
        link: "https://www.corfo.cl",
      },
      {
        name: "BancoEstado",
        type: "Bancario",
        description: "Banco estatal con líneas de crédito y programa FOGAPE",
        link: "https://www.bancoestado.cl",
      },
    ],
    programs: [
      {
        name: "COBEX (Cobertura Comercio Exterior)",
        type: "Garantía",
        coverage: "Hasta 60%",
        description: "Garantía estatal para créditos de exportación, máximo 35.000 UF para grandes empresas",
        link: "https://www.corfo.cl/sites/cpp/garantias/cobex",
      },
      {
        name: "FOGAPE",
        type: "Garantía",
        coverage: "Variable",
        description: "Fondo de Garantía para Pequeños Empresarios, ampliado durante COVID-19",
        link: "https://www.bancoestado.cl/fogape",
      },
      {
        name: "Cofinanciamiento Ferias",
        type: "Apoyo No Financiero",
        description: "Subsidio para participación en ferias internacionales y misiones comerciales",
        link: "https://www.prochile.gob.cl",
      },
    ],
    stats: {
      operations: "13.690 operaciones (2018-2022)",
      companies: "4.338 empresas beneficiadas",
      amount: "CLP 703.961 millones financiados",
      coverage: "40% de PYMEs exportadoras atendidas",
    },
    sources: [
      {
        title: "Cuenta Pública ProChile 2023",
        url: "https://www.prochile.gob.cl/docs/default-source/participaci%C3%B3n-ciudadana/cuentas-publicas/2023/cuenta-publica-final.pdf",
      },
      {
        title: "Evaluación COBEX - DIPRES",
        url: "https://www.dipres.gob.cl/597/articles-279795_doc_pdf.pdf",
      },
    ],
  },
  Perú: {
    institutions: [
      {
        name: "PromPerú",
        type: "Promoción",
        description: "Comisión de Promoción del Perú para la Exportación y el Turismo",
        link: "https://www.promperu.gob.pe",
      },
      {
        name: "COFIDE",
        type: "Financiamiento",
        description: "Corporación Financiera de Desarrollo - Banco de segundo piso",
        link: "https://www.cofide.com.pe",
      },
    ],
    programs: [
      {
        name: "SEPYMEX",
        type: "Seguro",
        coverage: "Hasta 50%",
        description: "Seguro de Crédito a la Exportación para PYMEs (pre y post-embarque)",
        link: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/21941-programa-de-seguro-de-credito-a-la-exportacion-para-las-pymes-sepymex",
      },
      {
        name: "Fondo CRECER",
        type: "Garantía & Crédito",
        coverage: "~50%",
        description: "Fusión de FOGEM, SEPYMEX y otros fondos. Capital inicial S/ 1.200 millones",
        link: "https://www.gob.pe/institucion/produce/noticias/19422-produce-fondo-crecer-permitira-que-tasas-de-interes-de-creditos-para-mypes-se-reduzcan-considerablemente",
      },
      {
        name: "Ruta Exportadora",
        type: "Capacitación",
        description: "Programa guiado para nuevas empresas en internacionalización",
        link: "https://www.promperu.gob.pe",
      },
    ],
    stats: {
      initial: "US$ 50 millones iniciales SEPYMEX",
      maxCoverage: "US$ 3 millones por empresa",
      crecer: "S/ 1.200 millones (~US$ 330M) Fondo CRECER",
      covid: "50.000+ microempresas apoyadas (FAE-MYPE 2020-21)",
    },
    sources: [
      {
        title: "Programa SEPYMEX - MINCETUR",
        url: "https://www.gob.pe/institucion/mincetur/informes-publicaciones/21941-programa-de-seguro-de-credito-a-la-exportacion-para-las-pymes-sepymex",
      },
      {
        title: "Garantía SEPYMEX - Diario del Exportador",
        url: "https://www.diariodelexportador.com/2017/04/garantia-sepymex-para-las-empresas.html",
      },
    ],
  },
  Colombia: {
    institutions: [
      {
        name: "ProColombia",
        type: "Promoción",
        description: "Agencia de promoción de exportaciones, turismo e inversión",
        link: "https://procolombia.co",
      },
      {
        name: "Bancóldex",
        type: "Financiamiento",
        description: "Banco de Comercio Exterior - Segundo piso y crédito directo",
        link: "https://www.bancoldex.com",
      },
      {
        name: "FNG",
        type: "Garantías",
        description: "Fondo Nacional de Garantías - Uno de los mayores esquemas de garantía en LAC",
        link: "https://www.fng.gov.co",
      },
    ],
    programs: [
      {
        name: "Bancóldex Exporta País",
        type: "Crédito",
        description: "Líneas de redescuento para diversificación de mercados de exportación",
        link: "https://www.bancoldex.com",
      },
      {
        name: "Liquidex (Factoring)",
        type: "Liquidez",
        description: "Plataforma electrónica de factoring para compra de facturas por cobrar",
        link: "https://www.bancoldex.com",
      },
      {
        name: "Garantías FNG",
        type: "Garantía",
        coverage: "50-70%",
        description: "Garantías automáticas y variables según programa (mujeres, innovación, etc.)",
        link: "https://www.fng.gov.co",
      },
      {
        name: "Fábricas de Internacionalización",
        type: "Consultoría",
        description: "Asesoría personalizada de ProColombia para preparación exportadora",
        link: "https://procolombia.co",
      },
    ],
    stats: {
      disbursements: "COP 5,7 billones desembolsados (2021) - ~US$ 1.500M",
      companies: "140.000+ empresas apoyadas anualmente",
      covid: "COP 1+ billón en líneas especiales COVID-19",
      fngTotal: "1,3 millones de garantías acumuladas",
      fng2020: "COP 12 billones garantizados (2020) - US$ 3.300M",
    },
    impact: {
      production: "+24% incremento producción",
      employment: "+11% incremento empleo",
      investment: "+70% incremento inversión",
      productivity: "+12% productividad laboral",
    },
    sources: [
      {
        title: "Efecto ProColombia en Exportaciones 2010-2020",
        url: "https://procolombia.co/system/files/2024-05/efecto_de_los_servicios_de_procolombia_en_las_exportaciones_2010-2020.pdf",
      },
      {
        title: "OECD Economic Survey: Colombia 2019",
        url: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2019/10/oecd-economic-surveys-colombia-2019_41e920cb/e4c64889-en.pdf",
      },
    ],
  },
  Brasil: {
    institutions: [
      {
        name: "Apex-Brasil",
        type: "Promoción",
        description: "Agencia de Promoción de Exportaciones e Inversiones (fundación público-privada)",
        link: "https://www.apexbrasil.com.br",
      },
      {
        name: "BNDES",
        type: "Financiamiento",
        description: "Banco Nacional de Desenvolvimento - Programa BNDES-Exim",
        link: "https://www.bndes.gov.br",
      },
      {
        name: "ABGF",
        type: "Garantías",
        description: "Agência Gestora de Fundos - Administra Fondo de Garantía à Exportação (FGE)",
        link: "https://www.gov.br/abgf",
      },
    ],
    programs: [
      {
        name: "BNDES-Exim Pré-embarque",
        type: "Crédito",
        description: "Capital de giro para producir bienes exportables",
        link: "https://www.bndes.gov.br",
      },
      {
        name: "BNDES-Exim Pós-embarque",
        type: "Crédito al Comprador",
        description: "Financiación al importador extranjero (2-10 años según producto)",
        link: "https://www.bndes.gov.br",
      },
      {
        name: "PROEX Financiamento",
        type: "Crédito",
        coverage: "Hasta US$ 20M",
        description: "Créditos directos del Tesoro para PYMEs exportadoras",
        link: "https://www.gov.br/produtividade-e-comercio-exterior/pt-br/assuntos/comercio-exterior/proex",
      },
      {
        name: "PROEX Equalização",
        type: "Subsidio",
        description: "Subsidio a tasas de interés para igualar condiciones internacionales",
        link: "https://www.gov.br/produtividade-e-comercio-exterior/pt-br/assuntos/comercio-exterior/proex",
      },
      {
        name: "FGE (Seguro Exportación)",
        type: "Garantía",
        coverage: "Hasta 95%",
        description: "Seguro estatal contra riesgos comerciales y políticos (medio/largo plazo)",
        link: "https://www.gov.br/abgf",
      },
      {
        name: "PEIEX (Capacitación)",
        type: "Capacitación",
        description: "Programa de capacitación y asesoría de Apex-Brasil para PYMEs",
        link: "https://www.apexbrasil.com.br",
      },
    ],
    stats: {
      bndesPeak: "R$ 168 mil millones desembolsos totales (2010)",
      exim2005: "US$ 5,86 mil millones créditos exportación (récord 2005)",
      exim2022: "US$ 2,5 mil millones (2022)",
      apexCompanies: "15.000+ empresas asistidas (2019-2020)",
      apexBusiness: "US$ 3.500 millones en negocios generados",
      fgePortfolio: "~USD 14 mil millones en garantías vigentes (2021)",
    },
    sources: [
      {
        title: "BNDES Desembolsos 2005",
        url: "http://www.bndes.gov.br/wps/portal/site/home/imprensa/noticias/conteudo/20051229_not322_05",
      },
    ],
  },
  México: {
    institutions: [
      {
        name: "Bancomext",
        type: "Financiamiento",
        description: "Banco Nacional de Comercio Exterior (1937) - Primer y segundo piso",
        link: "https://www.bancomext.com",
      },
      {
        name: "Nacional Financiera (Nafin)",
        type: "Financiamiento",
        description: "Banco de desarrollo multisectorial - Factoring y garantías",
        link: "https://www.nafin.com",
      },
    ],
    programs: [
      {
        name: "Garantía Automática Bancomext",
        type: "Garantía",
        coverage: "~50%",
        description: "Hasta US$ 250 mil, proceso expedito sin análisis extenso",
        link: "https://www.bancomext.com/productos-y-servicios/garantias/garantia-comprador/",
      },
      {
        name: "Garantía Selectiva Bancomext",
        type: "Garantía",
        coverage: "Variable",
        description: "Para montos mayores, requiere análisis caso por caso",
        link: "https://www.bancomext.com/productos-y-servicios/garantias",
      },
      {
        name: "Factoraje Internacional",
        type: "Liquidez",
        description: "Adelanto de cobro de facturas de exportación",
        link: "https://www.bancomext.com",
      },
      {
        name: "E-Factor (Nafin)",
        type: "Factoring Electrónico",
        description: "Plataforma digital para descuento de cuentas por cobrar",
        link: "https://www.nafin.com",
      },
      {
        name: "Programa de Garantías Conjunto",
        type: "Garantía",
        description: "MXN 112.250 millones (~US$ 5,5 mil millones) Bancomext + Nafin + ABM (2020)",
        link: "https://www.nafin.com/portalnf/content/sobre-nafin/sala-de-prensa/boletin_2019_04.html",
      },
    ],
    stats: {
      bancomext2021: "MXN 266.797 millones (~US$ 13 mil millones) financiamiento",
      companies: "3.482 empresas beneficiadas (2021)",
      pymex: "90% de empresas apoyadas son PyMEX",
      guarantees2019: "MXN 13.431 millones cartera garantizada",
      nafinFactoring: "MXN 94 millones diarios en factoraje (2016)",
    },
    sources: [
      {
        title: "Informe Anual Bancomext 2021",
        url: "https://www.bancomext.com/staticcontent/informe-anual-2021/web/assets/informe-anual-2021.pdf",
      },
      {
        title: "Garantía Comercio Exterior - Bancomext",
        url: "https://www.bancomext.com/productos-y-servicios/garantias/garantia-comprador/",
      },
      {
        title: "Programa de Garantías - Nafin",
        url: "https://www.nafin.com/portalnf/content/sobre-nafin/sala-de-prensa/boletin_2019_04.html",
      },
    ],
  },
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showFullText, setShowFullText] = useState(false)
  const [showGlobalSection, setShowGlobalSection] = useState(false)
  const [mapInitialized, setMapInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !mapInitialized) {
      import("leaflet").then((L) => {
        const map = L.map("lac-map", {
          zoomControl: true,
          scrollWheelZoom: false,
        }).setView([-15, -65], 3.2)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18,
        }).addTo(map)

        // Custom marker style - more prominent
        countries.slice(0, -1).forEach((country) => {
          // Create circle marker with better visibility
          const circle = L.circleMarker([country.coordinates[0], country.coordinates[1]], {
            radius: 12,
            fillColor: "#0d9488",
            color: "#ffffff",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(map)

          // Add pulsing effect on hover
          circle.on("mouseover", function () {
            this.setStyle({
              radius: 15,
              fillOpacity: 1,
            })
          })

          circle.on("mouseout", function () {
            this.setStyle({
              radius: 12,
              fillOpacity: 0.8,
            })
          })

          // Bind popup with better styling
          circle.bindPopup(
            `<div style="text-align: center; font-family: 'Outfit', sans-serif; padding: 4px;">
              <div style="font-size: 32px; margin-bottom: 6px;">${country.flag}</div>
              <div style="font-weight: 700; font-size: 16px; color: #0f172a;">${country.name}</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Click para ver perfil</div>
            </div>`,
            {
              className: "custom-popup",
            },
          )

          // Navigate on click
          circle.on("click", () => {
            setSelectedCountry(country.name)
            document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" })
          })

          // Add country label
          L.marker([country.coordinates[0], country.coordinates[1]], {
            icon: L.divIcon({
              className: "country-label",
              html: `<div style="font-size: 11px; font-weight: 600; color: #0f172a; background: rgba(255,255,255,0.9); padding: 2px 6px; border-radius: 4px; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">${country.name}</div>`,
              iconAnchor: [0, -20],
            }),
            interactive: false,
          }).addTo(map)
        })

        setMapInitialized(true)
      })
    }
  }, [mapInitialized])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative border-b overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/10 dark:to-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src="/shipping-containers-at-port-aerial-view-logistics-.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.07] dark:opacity-[0.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 mb-12 md:mb-16">
            <Badge className="text-sm px-5 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800 shadow-sm">
              Investigación Académica 2024-2025
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="block text-gradient mb-2">Trade Finance</span>
              <span className="block text-foreground/90">América Latina</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-normal px-4 sm:px-6">
              Análisis integral sobre instrumentos, brechas y barreras en el financiamiento del comercio internacional
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-10 md:mb-12 px-0">
            <StatCard icon={Globe} label="Brecha regional estimada" value="USD 124B" trend="down" />
            <StatCard icon={Users} label="PYMEs sin acceso" value="67%" comingSoon />
            <StatCard icon={Building2} label="Países analizados" value="6" />
          </div>

          <div className="flex justify-center px-4">
            <Button
              size="lg"
              className="gap-2 h-12 px-8 text-base bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 hover:from-blue-700 hover:via-teal-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explorar Investigación
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section
        id="overview"
        className="border-b bg-gradient-to-b from-background via-slate-50/30 to-background dark:via-slate-900/10"
      >
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 md:mb-14">
              <Badge className="mb-4 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                Contexto Regional
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">Panorama Global</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                El estado del financiamiento comercial en América Latina
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    El comercio internacional es motor fundamental del crecimiento económico en América Latina. Sin
                    embargo, existe una brecha significativa entre la demanda y oferta de instrumentos de financiamiento
                    del comercio.
                  </p>

                  <Collapsible open={showFullText} onOpenChange={setShowFullText}>
                    <CollapsibleContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Esta brecha afecta desproporcionadamente a las pequeñas y medianas empresas (PYMEs), que
                        representan más del 90% del tejido empresarial pero tienen acceso limitado a productos financieros
                        especializados.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Los instrumentos de trade finance como cartas de crédito, seguros de exportación y garantías son
                        esenciales para mitigar riesgos y facilitar transacciones internacionales, pero su adopción en la
                        región sigue siendo inferior a otras economías emergentes.
                      </p>
                    </CollapsibleContent>

                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="mt-4 gap-2 font-semibold">
                        {showFullText ? "Leer menos" : "Leer más"}
                        <ChevronDown className={`h-4 w-4 transition-transform ${showFullText ? "rotate-180" : ""}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </Collapsible>
                </div>

                <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/puerto-latinoamericano-contenedores-valparaiso-callao.jpg"
                      alt="Puerto latinoamericano - Valparaíso, Callao, Buenaventura"
                      className="w-full h-auto"
                    />
                  </div>

                  <Card className="border-2 border-blue-200 dark:border-blue-900 overflow-hidden shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        Países Analizados en Detalle
                      </CardTitle>
                      <CardDescription>Haz clic en un país para ver su perfil completo</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div
                        id="lac-map"
                        className="w-full h-[450px] md:h-[500px] bg-slate-100 dark:bg-slate-800"
                        style={{ zIndex: 0 }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Data Preview Card */}
              <Card className="border-2 border-indigo-200 dark:border-indigo-900 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl mb-2">
                        <BarChart3 className="h-6 w-6 text-indigo-600" />
                        Análisis de Datos: Retrasos en Pagos Comerciales
                      </CardTitle>
                      <CardDescription className="text-base">
                        Comparación global de días de retraso y tendencias en pagos internacionales
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        Comparación Regional
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Análisis de días promedio de retraso en pagos más allá de términos acordados. 
                        América Latina comparada con Asia, MENA y Norteamérica/Europa.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        Mapa de Riesgo Global
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Visualización scatter plot relacionando retrasos con empresas reportando incremento 
                        en demoras. Identifica países LAC en zonas de alto riesgo.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">124</div>
                      <div className="text-xs text-muted-foreground">Observaciones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">30+</div>
                      <div className="text-xs text-muted-foreground">Países</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">4</div>
                      <div className="text-xs text-muted-foreground">Regiones</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1 gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                      <a href="/panorama/retrasos-pagos">
                        Ver análisis completo
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" asChild>
                      <a href="/panorama/retrasos-pagos">
                        <Database className="h-4 w-4" />
                        Explorar datos
                      </a>
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground italic text-center">
                    Fuente: Elaboración propia a partir de Finance, Credit and International Business Survey 2023-2025
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="instruments" className="border-b bg-white dark:bg-slate-950">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-16 md:py-24">
          <div className="mb-12 md:mb-16 max-w-4xl mx-auto text-center lg:text-left">
            <Badge className="mb-4 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400 border-teal-200 dark:border-teal-800">
              Herramientas Financieras
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Instrumentos de Trade Finance
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Principales mecanismos de financiamiento y mitigación de riesgo en comercio internacional
            </p>
          </div>

          <div className="mb-10 relative rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto">
            <img
              src="/cargo-ship-containers-international-shipping-trade.jpg"
              alt="International cargo"
              className="w-full h-52 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm md:text-base font-semibold drop-shadow-lg">
                Facilitando el comercio global con instrumentos especializados
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto overflow-hidden">
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-2">
              {instruments.map((instrument, index) => (
                <InstrumentCard key={index} {...instrument} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="analysis" className="border-b">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-16 md:py-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold">América Latina en Contexto</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Perfiles de países, barreras estructurales y comparación con otras economías emergentes
            </p>
          </div>

          {/* Perfiles por País - Ahora primero */}
          <div className="mb-16">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Perfiles por País</h3>
              <p className="text-muted-foreground">
                Selecciona un país para ver análisis detallado de su ecosistema de trade finance
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
              {countries.map((country) => (
                <CountryCard
                  key={country.name}
                  name={country.name}
                  flag={country.flag}
                  hasDetailPage={["Brasil", "Chile", "México", "Perú"].includes(country.name)}
                  onClick={() => setSelectedCountry(country.name)}
                />
              ))}
            </div>

            {selectedCountry &&
              selectedCountry !== "Centroamérica" &&
              countryPrograms[selectedCountry as keyof typeof countryPrograms] && (
                <div className="space-y-8 animate-in fade-in-50 duration-500">
                  <Card className="border-2 border-teal-500 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{countries.find((c) => c.name === selectedCountry)?.flag}</div>
                        <div>
                          <CardTitle className="text-3xl">{selectedCountry}</CardTitle>
                          <CardDescription className="text-base">
                            Programas de Apoyo a Exportaciones - Ecosistema Completo
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Institutions Overview */}
                  <CountryDetailCard
                    icon={Building2}
                    title="Marco Institucional"
                    description="Organismos clave en el ecosistema de financiamiento"
                  >
                    <div className="grid md:grid-cols-3 gap-4">
                      {countryPrograms[selectedCountry as keyof typeof countryPrograms].institutions.map((inst, idx) => (
                        <Card key={idx} className="border">
                          <CardHeader>
                            <Badge className="w-fit mb-2">{inst.type}</Badge>
                            <CardTitle className="text-base">{inst.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{inst.description}</p>
                            {inst.link && (
                              <a
                                href={inst.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                              >
                                Sitio oficial
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CountryDetailCard>

                  {/* Programs Table */}
                  <CountryDetailCard
                    icon={Award}
                    title="Instrumentos y Programas"
                    description="Catálogo completo de herramientas de financiamiento disponibles"
                  >
                    <ProgramTable
                      programs={countryPrograms[selectedCountry as keyof typeof countryPrograms].programs}
                      title=""
                    />
                  </CountryDetailCard>

                  {/* Statistics */}
                  <CountryDetailCard
                    icon={BarChart3}
                    title="Montos Operados e Impacto"
                    description="Datos cuantitativos sobre alcance y resultados"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        {Object.entries(countryPrograms[selectedCountry as keyof typeof countryPrograms].stats).map(
                          ([key, value]) => (
                            <div key={key} className="flex flex-col p-4 bg-muted rounded-lg">
                              <span className="text-sm text-muted-foreground capitalize mb-1">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="font-semibold text-lg">{value}</span>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Impact metrics for Colombia */}
                      {selectedCountry === "Colombia" && countryPrograms.Colombia.impact && (
                        <div className="space-y-3">
                          <h5 className="font-semibold text-sm text-muted-foreground mb-3">IMPACTO MEDIDO (BANCÓLDEX)</h5>
                          {Object.entries(countryPrograms.Colombia.impact).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900"
                            >
                              <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                              <span className="font-bold text-green-700 dark:text-green-400">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CountryDetailCard>

                  {/* Sources */}
                  <CountryDetailCard
                    icon={BookOpen}
                    title="Fuentes y Metodología"
                    description="Referencias oficiales y documentación técnica"
                  >
                    <div className="space-y-3">
                      {countryPrograms[selectedCountry as keyof typeof countryPrograms].sources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <ExternalLink className="h-4 w-4 mt-0.5 text-blue-600 group-hover:text-blue-700" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm mb-1 group-hover:text-blue-700">{source.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{source.url}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CountryDetailCard>

                  <Card>
                    <CardContent className="pt-6">
                      <Button variant="outline" onClick={() => setSelectedCountry(null)}>
                        Volver a selección
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
          </div>

          {/* Análisis Regional - Ahora segundo */}
          <Separator className="my-12" />
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Análisis Regional</h3>
            <p className="text-muted-foreground">
              Comparación estructural y barreras críticas en América Latina
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Visión Regional</TabsTrigger>
              <TabsTrigger value="barriers">Barreras Críticas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <CountryRadarComparison />
            </TabsContent>

            <TabsContent value="barriers" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {barriers.map((barrier, index) => (
                  <BarrierCard key={index} {...barrier} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="global" className="border-b bg-gradient-to-b from-background to-purple-50/30 dark:to-purple-950/10">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-16 md:py-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold">Perspectiva Global</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Políticas exitosas y lecciones aprendidas de otras economías emergentes
            </p>
          </div>

          {!showGlobalSection ? (
            <GlobalPreviewCard
              icon={Globe}
              title="Experiencias Internacionales en Trade Finance"
              description="Análisis detallado de programas exitosos en Asia del Sur-Este, India y África Subsahariana. Descubre cómo otras regiones emergentes han cerrado la brecha de financiamiento comercial mediante innovación digital, reformas regulatorias y colaboración público-privada."
              stats={[
                {
                  label: "Brecha global",
                  value: "USD 2,5T",
                  color: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900",
                },
                {
                  label: "Rechazos PYME",
                  value: "40%",
                  color: "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900",
                },
                {
                  label: "Regiones analizadas",
                  value: "3",
                  color: "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-900",
                },
              ]}
              onClick={() => setShowGlobalSection(true)}
            />
          ) : (
            <div className="space-y-12 animate-in fade-in-50 duration-500">
              {/* Context Card */}
              <Card className="border-2 border-purple-200 dark:border-purple-900 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Globe className="h-6 w-6 text-purple-600" />
                    Contexto Global: La Brecha de Financiamiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                      <div className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">USD 2,5 billones</div>
                      <div className="text-sm text-muted-foreground">Brecha global de trade finance (2022)</div>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                      <div className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-1">40%</div>
                      <div className="text-sm text-muted-foreground">
                        Solicitudes PYME rechazadas en Asia Sudoriental
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">44%</div>
                      <div className="text-sm text-muted-foreground">De solicitudes globales provienen de PYMEs</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    En economías emergentes, las PYMEs enfrentan obstáculos sistemáticos: falta de garantías,
                    historiales crediticios incompletos, altos costos AML/KYC y estándares bancarios conservadores. Esto
                    resulta en contratos perdidos, inventario sin vender y recortes de personal cuando no pueden
                    financiar operaciones comerciales.
                  </p>
                </CardContent>
              </Card>

              {/* Regional Tabs */}
              <Tabs defaultValue="asia" className="space-y-8">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
                  <TabsTrigger value="asia">Asia</TabsTrigger>
                  <TabsTrigger value="india">India</TabsTrigger>
                  <TabsTrigger value="africa">África</TabsTrigger>
                </TabsList>

                {/* Asia Tab */}
                <TabsContent value="asia" className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <GlobalInitiativeCard
                      icon={Building2}
                      title="ADB Trade Finance Program"
                      region="Regional - 14 países"
                      description="Programa de garantías y financiamiento operando con 200+ bancos participantes para apoyar operaciones de comercio intrarregional"
                      impact={[
                        { label: "Volumen 2008-2010", value: "US$ 4,3 mil millones" },
                        { label: "Transacciones", value: "1.517 operaciones" },
                        { label: "Comercio intrarregional", value: "50% de cartera (2010)" },
                        { label: "Volumen 2022-2023", value: "US$ 4,7 mil millones" },
                        { label: "Transacciones recientes", value: "21.000 (33% PYMEs)" },
                      ]}
                      sources={[
                        {
                          title: "ADB Trade Finance Report 2020",
                          url: "https://cisp.cachefly.net/assets/articles/attachments/83442_trade_finance_report_sept2020.pdf",
                        },
                        {
                          title: "WTO Asia-Pacific Case Studies",
                          url: "https://www.wto.org/english/tratop_e/devel_e/a4t_e/asia_pacific_case_stories_e.pdf",
                        },
                      ]}
                    />

                    <GlobalInitiativeCard
                      icon={Smartphone}
                      title="Plataformas Digitales Nacionales"
                      region="Singapur, Tailandia, Malasia"
                      description="Infraestructura digital para reducir trámites: Networked Trade Platform (Singapur), BCI e-guarantee (Tailandia), Digital Trade Standards (Malasia)"
                      impact={[
                        { label: "Reducción de tiempos", value: "40-60%" },
                        { label: "Costos administrativos", value: "-50%" },
                        { label: "Países implementando", value: "8 de 10 ASEAN" },
                      ]}
                      sources={[
                        {
                          title: "ASEAN Trade Finance Gap Analysis",
                          url: "https://eastasiaforum.org/2025/11/08/asean-must-close-its-widening-trade-finance-gap/",
                        },
                      ]}
                    />

                    <GlobalInitiativeCard
                      icon={Network}
                      title="Funding Societies (Fintech)"
                      region="Singapur, Indonesia, Malasia, Tailandia"
                      description="Mayor plataforma digital de financiamiento PYME en Sudeste Asiático. Descuento de facturas, préstamos de cadena de suministro y microcréditos 100% en línea"
                      impact={[
                        { label: "Financiamiento desembolsado", value: "US$ 3.000 millones" },
                        { label: "PYMEs beneficiadas", value: "100.000 empresas" },
                        { label: "Transacciones", value: "5 millones acumuladas" },
                        { label: "Fundación", value: "2015 - Singapur" },
                      ]}
                      sources={[
                        {
                          title: "GTR Leaders in Trade 2024",
                          url: "https://www.gtreview.com/magazine/the-digital-trade-issue-2024/gtr-leaders-trade-2024-nominees-winners/",
                        },
                        {
                          title: "CIIP Case Study: Modalku/Funding Societies",
                          url: "https://ciip.com.sg/docs/default-source/default-document-library/ciip_case-study_modalku_v2.pdf",
                        },
                      ]}
                    />

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-900">
                      <CardHeader>
                        <CardTitle className="text-lg">Propuestas Regionales ASEAN</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Scale className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Mecanismo de Garantía Compartida</div>
                            <div className="text-xs text-muted-foreground">
                              Distribuir riesgos entre países miembros
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Documentos Electrónicos Transfronterizos</div>
                            <div className="text-xs text-muted-foreground">
                              Implementar Ley Modelo CNUDMI sobre Documentos Transferibles
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* India Tab */}
                <TabsContent value="india" className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <GlobalInitiativeCard
                      icon={Database}
                      title="TReDS (Trade Receivables Discounting)"
                      region="India - Nacional"
                      description="Plataformas electrónicas donde facturas PYME se subastan entre bancos y financiadores. Mandato gubernamental para empresas grandes (>₹500cr)"
                      impact={[
                        { label: "Volumen total descontado", value: "₹2,18 billones (~US$ 26B)" },
                        { label: "PYMEs beneficiadas", value: "65.000 empresas" },
                        { label: "Cobertura geográfica", value: "1.600 ciudades" },
                        { label: "Volumen FY2022-23", value: "₹76.000 crore" },
                        { label: "Crecimiento anual", value: "2x vs año anterior" },
                      ]}
                      sources={[
                        {
                          title: "India's Factoring Evolution (Factoring Magazine)",
                          url: "https://magazine.factoring.org/magazine-articles/indias-factoring-evolution-a-regulatory-led-growth-story",
                        },
                        {
                          title: "TReDS Platform Analysis - RITHA",
                          url: "https://ritha.eu/storage/1305/2_jaes_SinghGeeta.pdf",
                        },
                      ]}
                    />

                    <GlobalInitiativeCard
                      icon={Shield}
                      title="NIRVIK Scheme (Exportadores)"
                      region="India - ECGC"
                      description="Esquema de garantía para préstamos de exportación administrado por ECGC. Cobertura elevada al 90% (vs 60% anterior) con primas reducidas para PYMEs"
                      impact={[
                        { label: "Cobertura garantía", value: "90% del monto" },
                        { label: "Reducción prima", value: "Hasta 50% para PYMEs" },
                        { label: "Lanzamiento", value: "2020 - Union Budget" },
                        { label: "Objetivo crecimiento", value: "2 dígitos anual" },
                      ]}
                      sources={[
                        {
                          title: "NIRVIK Scheme Overview - Amazon Global Selling",
                          url: "https://sell.amazon.in/grow-your-business/amazon-global-selling/blogs/nirvik-scheme",
                        },
                        {
                          title: "Export Promotion Mission for MSMEs - Modifi",
                          url: "https://www.modifi.com/knowledge/post/indias-export-promotion-mission-a-game-changer-for-msmes-with-collateral-free-loans-and-interest-equalisation",
                        },
                        {
                          title: "NIRVIK Announcement - Ministry of Commerce",
                          url: "https://www.commerce.gov.in/press-releases/enhanced-insurance-cover-for-exporters-affordable-and-accessible-credit-reduction-in-interest-rates-fm-announces-nirvik-scheme-for-exporters-in-union-budget-2020-21/",
                        },
                      ]}
                    />

                    <GlobalInitiativeCard
                      icon={FileText}
                      title="Factoring Regulation Act (Reformado)"
                      region="India - Nacional"
                      description="Ley de factoring enmendada en 2021 para ampliar entidades autorizadas. Aumentó competencia y redujo costos/burocracia para PYMEs"
                      impact={[
                        { label: "Ley original", value: "2011" },
                        { label: "Reforma clave", value: "2021 - Ampliación NBFC" },
                        { label: "Nuevos participantes", value: "+30% (2021-2023)" },
                        { label: "Reducción costos", value: "15-20% promedio" },
                      ]}
                      sources={[
                        {
                          title: "Factoring Regulation Amendment Bill 2020 - PRS India",
                          url: "https://prsindia.org/billtrack/prs-products/prs-standing-committee-report-summary-3508",
                        },
                      ]}
                    />

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900">
                      <CardHeader>
                        <CardTitle className="text-lg">Interest Equalisation Scheme</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Subsidio tasa interés</span>
                          <span className="font-bold text-green-700 dark:text-green-400">3-5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Beneficiarios</span>
                          <span className="font-semibold">PYMEs exportadoras</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Programa de subvención que reduce el costo financiero de préstamos pre y post-embarque para
                          pequeños exportadores
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Africa Tab */}
                <TabsContent value="africa" className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <GlobalInitiativeCard
                      icon={Building2}
                      title="AfDB & Afreximbank Trade Programs"
                      region="África Subsahariana - 44 países"
                      description="Programas de líneas de crédito y garantías a bancos locales. AfDB Trade Finance Program (2013) y Afreximbank AFTRAF (2018)"
                      impact={[
                        { label: "AfDB: Proyectos aprobados", value: "53 proyectos" },
                        { label: "AfDB: Instituciones", value: "324 bancos en 44 países" },
                        { label: "AfDB: Transacciones", value: "~US$ 8.000 millones" },
                        { label: "Afreximbank: Créditos acumulados", value: "US$ 81.000 millones (al 2019)" },
                        { label: "AFTRAF: Red bancaria", value: "350 bancos, 120 facilidades" },
                        { label: "Reducción brecha 2011-2019", value: "US$ 120B → US$ 81B" },
                      ]}
                      sources={[
                        {
                          title: "AfDB Trade Finance Report",
                          url: "https://cisp.cachefly.net/assets/articles/attachments/83442_trade_finance_report_sept2020.pdf",
                        },
                      ]}
                    />

                    <GlobalInitiativeCard
                      icon={CreditCard}
                      title="Expansión del Factoring Africano"
                      region="Egipto, Sudáfrica, Túnez, Nigeria, Kenia"
                      description="Crecimiento del mercado de factoring con marcos legales modernos. Afreximbank lidera esfuerzos de armonización y mejores prácticas"
                      impact={[
                        { label: "Volumen 2015", value: "€18.000 millones" },
                        { label: "Volumen 2019", value: "€24.000 millones" },
                        { label: "Crecimiento anual", value: "~10%" },
                        { label: "Nuevas compañías", value: "15+ en 8 países" },
                      ]}
                      sources={[
                        {
                          title: "Factoring - A Valuable Tool to Boost Trade (African Business)",
                          url: "https://african.business/2021/04/trade-investment/factoring-a-valuable-tool-to-boost-trade",
                        },
                        {
                          title: "Factoring Profile - Making Finance Work for Africa",
                          url: "https://www.mfw4a.org/sites/default/files/resources/factoring_profile_final.pdf",
                        },
                        {
                          title: "2024 Regional Updates Africa - FCI",
                          url: "https://fci.nl/en/news/2024-regional-updates-africa",
                        },
                      ]}
                    />

                    <GlobalInitiativeCard
                      icon={Database}
                      title="MANSA Platform (Afreximbank)"
                      region="Pan-Africana"
                      description="Base de datos de debida diligencia (KYC) que provee información confiable de empresas africanas, reduciendo costos de cumplimiento para bancos"
                      impact={[
                        { label: "Reducción costos KYC", value: "30-40%" },
                        { label: "Empresas registradas", value: "10.000+" },
                        { label: "Países cubiertos", value: "35 países" },
                        { label: "Bancos usuarios", value: "150+" },
                      ]}
                      sources={[
                        {
                          title: "Understanding SME Trade Finance in ASEAN (similar concept)",
                          url: "https://www.eria.org/uploads/media/discussion-papers/FY21/Understanding-SME-Trade-Finance-in-ASEAN_An-Overview.pdf",
                        },
                      ]}
                    />

                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-900">
                      <CardHeader>
                        <CardTitle className="text-lg">Reformas Legales Destacadas</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <div className="font-semibold text-sm flex items-center gap-2">
                            <Badge variant="outline">Nigeria</Badge>
                            Garantías Mobiliarias (2017)
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Registro único de activos muebles - PYMEs usan cuentas por cobrar como colateral
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold text-sm flex items-center gap-2">
                            <Badge variant="outline">Kenia/Madagascar</Badge>
                            Leyes de Factoring
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Marcos específicos para reducir incertidumbre jurídica
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold text-sm flex items-center gap-2">
                            <Badge variant="outline">Pan-Africano</Badge>
                            PAPSS (2022)
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Sistema de pagos en monedas locales - Reduce dependencia del dólar
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              {/* The Cost of the Gap Section */}
              <div className="mt-16">
                <div className="mb-8 text-center">
                  <Badge className="mb-3 bg-red-600">Análisis de Impacto</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">El Costo de la Brecha</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    Cuantificando el impacto económico de la exclusión de PYMEs del financiamiento de comercio exterior
                  </p>
                </div>

                <FinancingGapAnalysis />
              </div>

              {/* Key Success Factors */}
              <div className="mt-16">
                <div className="mb-8 text-center">
                  <Badge className="mb-3 bg-amber-600">Factores Críticos de Éxito</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Lecciones Aprendidas</h3>
                  <p className="text-muted-foreground">Elementos comunes en intervenciones exitosas</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <LessonCard
                    icon={Building2}
                    title="Respaldo Institucional Público-Multilateral"
                    description="Participación activa de bancos de desarrollo y agencias de crédito. Garantías públicas catalizan al sector privado: 1 dólar de garantía moviliza 3-8 dólares en financiamiento comercial adicional."
                    applicability="Alta"
                  />

                  <LessonCard
                    icon={Smartphone}
                    title="Innovación Digital y Eficiencia"
                    description="Plataformas electrónicas aceleran transacciones, mejoran transparencia y reducen costos. TReDS (India), Networked Trade Platform (Singapur), soluciones fintech atienden miles de microtransacciones a escala."
                    applicability="Alta"
                  />

                  <LessonCard
                    icon={FileText}
                    title="Reformas Regulatorias Habilitantes"
                    description="Actualizar marcos legales: permitir firmas digitales, reconocer títulos electrónicos, ampliar licencias de factoring, establecer registros de garantías mobiliarias. La certeza jurídica impulsa oferta."
                    applicability="Alta"
                  />

                  <LessonCard
                    icon={BarChart3}
                    title="Medición de Impacto y Focalización"
                    description="Cuantificar brechas por segmento (PYMEs tienen 56% de rechazos vs 44% de solicitudes). Diseñar programas dedicados con capacitación a bancos locales y líneas especializadas. Monitorear efectividad."
                    applicability="Media"
                  />

                  <LessonCard
                    icon={Users}
                    title="Colaboración Público-Privada"
                    description="Ninguna entidad resuelve sola el problema. Alianzas entre gobierno, organismos internacionales, bancos, fintech y corporaciones compradoras garantizan sostenibilidad y aprendizaje mutuo."
                    applicability="Alta"
                  />

                  <LessonCard
                    icon={Target}
                    title="Enfoque en Capacitación y Cumplimiento"
                    description="Invertir en conocimiento: capacitar oficiales bancarios, desarrollar utilidades compartidas tipo MANSA para KYC regional, reducir costos de debida diligencia. Amplía oferta local y reduce de-risking."
                    applicability="Media"
                  />
                </div>
              </div>

              {/* Applicability to LAC */}
              <Card className="border-2 border-teal-500 shadow-xl bg-gradient-to-br from-teal-50/50 to-blue-50/50 dark:from-teal-950/10 dark:to-blue-950/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-teal-600" />
                    Aplicabilidad a América Latina y el Caribe
                  </CardTitle>
                  <CardDescription>Ideas concretas adaptables a la región</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-950 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <Zap className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Fondo Regional de Garantía Comercial</div>
                          <div className="text-sm text-muted-foreground">
                            Expandir programas tipo ADB/AfDB vía BID/CAF. Mecanismo de garantía compartida entre países
                            (Alianza del Pacífico, SICA) para financiar operaciones intrarregionales.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-950 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <Database className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Plataformas Electrónicas de Factura</div>
                          <div className="text-sm text-muted-foreground">
                            Inspirados en TReDS: crear mercados digitales de descuento de facturas. Chile y México ya
                            tienen factura electrónica - unirlos en plataformas de subastas con participación bancaria.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-950 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <Scale className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Adoptar Ley Modelo CNUDMI</div>
                          <div className="text-sm text-muted-foreground">
                            Reconocer documentos electrónicos transferibles (conocimiento embarque, pagarés) en toda
                            ALC. Armonizar leyes de garantías mobiliarias y factoring.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-950 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <Network className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Alianzas con Fintech Locales</div>
                          <div className="text-sm text-muted-foreground">
                            Conectar fintechs de crowdfunding/factoraje (México, Colombia, Brasil) con bancos públicos y
                            programas de garantía. Sandboxes regulatorios para incluir nuevos actores.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-950 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <BookOpen className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Capacitación y Base KYC Regional</div>
                          <div className="text-sm text-muted-foreground">
                            Esquemas de asistencia técnica a bancos medianos/pequeños (tipo EBRD). Desarrollar utilidad
                            compartida tipo MANSA para certificaciones KYC en español.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-950 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <Target className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Integrar Promoción + Financiamiento</div>
                          <div className="text-sm text-muted-foreground">
                            Coordinar agencias tipo ProChile/ProColombia con ECAs y bancos de desarrollo. One-stop-shop
                            donde empresas acceden a asesoría comercial Y opciones de crédito/garantía simultáneamente.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <p className="text-sm text-muted-foreground italic">
                      <strong>Conclusión:</strong> Mejorar el acceso al trade finance requiere un enfoque integral. Los
                      casos de Asia, India y África en los últimos 15 años demuestran que es posible cerrar brechas con
                      políticas deliberadas: desde crear plataformas electrónicas hasta establecer fondos de garantía
                      regionales. América Latina puede adaptar estas lecciones para que sus PYMEs participen plenamente
                      en el comercio mundial.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Referencias Internacionales
                  </CardTitle>
                  <CardDescription>Fuentes primarias de datos y análisis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm">Asia & Multilaterales</h5>
                      <div className="space-y-1.5">
                        <a
                          href="https://www.wto.org/english/tratop_e/devel_e/a4t_e/asia_pacific_case_stories_e.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>WTO Asia-Pacific Case Stories</span>
                        </a>
                        <a
                          href="https://eastasiaforum.org/2025/11/08/asean-must-close-its-widening-trade-finance-gap/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>ASEAN Trade Finance Gap | East Asia Forum</span>
                        </a>
                        <a
                          href="https://www.gtreview.com/magazine/the-digital-trade-issue-2024/gtr-leaders-trade-2024-nominees-winners/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>GTR Leaders in Trade 2024</span>
                        </a>
                        <a
                          href="https://ciip.com.sg/docs/default-source/default-document-library/ciip_case-study_modalku_v2.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>CIIP Case Study: Funding Societies</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm">India</h5>
                      <div className="space-y-1.5">
                        <a
                          href="https://ritha.eu/storage/1305/2_jaes_SinghGeeta.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>TReDS Platform Analysis - RITHA</span>
                        </a>
                        <a
                          href="https://prsindia.org/billtrack/prs-products/prs-standing-committee-report-summary-3508"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>Factoring Regulation Amendment Bill - PRS India</span>
                        </a>
                        <a
                          href="https://magazine.factoring.org/magazine-articles/indias-factoring-evolution-a-regulatory-led-growth-story"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>India's Factoring Evolution - Factoring Magazine</span>
                        </a>
                        <a
                          href="https://www.commerce.gov.in/press-releases/enhanced-insurance-cover-for-exporters-affordable-and-accessible-credit-reduction-in-interest-rates-fm-announces-nirvik-scheme-for-exporters-in-union-budget-2020-21/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>NIRVIK Scheme Announcement - Ministry of Commerce</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm">África Subsahariana</h5>
                      <div className="space-y-1.5">
                        <a
                          href="https://cisp.cachefly.net/assets/articles/attachments/83442_trade_finance_report_sept2020.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>AfDB Trade Finance Report 2020</span>
                        </a>
                        <a
                          href="https://african.business/2021/04/trade-investment/factoring-a-valuable-tool-to-boost-trade"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>Factoring in Africa - African Business</span>
                        </a>
                        <a
                          href="https://www.mfw4a.org/sites/default/files/resources/factoring_profile_final.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>Factoring Profile - MFW4A</span>
                        </a>
                        <a
                          href="https://fci.nl/en/news/2024-regional-updates-africa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>2024 Regional Updates Africa - FCI</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm">Análisis Comparativos</h5>
                      <div className="space-y-1.5">
                        <a
                          href="https://www.eria.org/uploads/media/discussion-papers/FY21/Understanding-SME-Trade-Finance-in-ASEAN_An-Overview.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>Understanding SME Trade Finance in ASEAN - ERIA</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowGlobalSection(false)}
                  className="w-full max-w-md"
                >
                  Cerrar análisis internacional
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>


      <footer className="border-t bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl py-16 md:py-20">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-teal-600 to-indigo-600 text-white font-bold">
                  TF
                </div>
                <span className="font-bold text-lg">Trade Finance LAC</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Plataforma de investigación académica sobre financiamiento del comercio en América Latina
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navegación</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#overview" className="hover:text-foreground transition-colors">
                    Panorama Global
                  </a>
                </li>
                <li>
                  <a href="#instruments" className="hover:text-foreground transition-colors">
                    Instrumentos
                  </a>
                </li>
                <li>
                  <a href="#countries" className="hover:text-foreground transition-colors">
                    Perfiles de Países
                  </a>
                </li>
                <li>
                  <a href="#analysis" className="hover:text-foreground transition-colors">
                    Análisis LAC
                  </a>
                </li>
                <li>
                  <a href="#global" className="hover:text-foreground transition-colors">
                    Perspectiva Global
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Países</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {countries.slice(0, 5).map((country) => (
                  <li key={country.name}>
                    <button
                      onClick={() => {
                        setSelectedCountry(country.name)
                        document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Metodología
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Fuentes de Datos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Publicaciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-10" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <p>© 2025 Trade Finance LAC. Investigación académica independiente.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Términos
              </a>
              <a
                href="https://tomasdata.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-semibold"
              >
                Desarrollado por tomasdata.io
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
