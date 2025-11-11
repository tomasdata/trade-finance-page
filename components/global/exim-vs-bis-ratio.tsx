"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Info } from "lucide-react"
import eximSummary from '@/public/data/global/exim_latam_summary.json'
import bisConc from '@/public/data/global/bis_concentration_latest.json'

export function EximVsBisRatio() {
  const ratios = eximSummary.data.map((exim: any) => {
    const bisCountry = bisConc.data.find((b: any) => b.country === exim.country_group)
    const ratio = (exim.disbursed_usd_billion / bisCountry.total_usd_billions) * 100
    
    return {
      country: exim.country_group,
      exim: exim.disbursed_usd_billion,
      bis: bisCountry.total_usd_billions,
      ratio: ratio,
    }
  }).sort((a: any, b: any) => b.ratio - a.ratio)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          EXIM vs. Mercado Total (BIS): La Marginalidad de Programas Oficiales
        </CardTitle>
        <CardDescription>
          Comparación EXIM desembolsado (2007-2025) vs. exposición bancaria BIS (2024-Q4). 
          Evidencia: programas oficiales USA son &lt;0.5% del financiamiento internacional total.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {ratios.map((r: any) => (
            <div key={r.country}>
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold">{r.country}</div>
                <div className="text-sm text-muted-foreground">
                  {r.ratio < 1 ? r.ratio.toFixed(2) : r.ratio.toFixed(1)}%
                </div>
              </div>
              <Progress value={Math.min(r.ratio, 100)} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>EXIM: USD {r.exim.toFixed(1)}bn</span>
                <span>BIS: USD {r.bis.toFixed(0)}bn</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-900">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2">🔬 Implicaciones Académicas</h4>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>1. Sesgo de estudios basados en EXIM:</strong> Papers que usan solo datos EXIM 
              (ej. análisis firm-level con EXIM exposure) capturan &lt;0.5% del mercado. 
              Resultados NO generalizables al TF comercial.
            </p>
            <p>
              <strong>2. Diferencia conceptual:</strong> EXIM mide <em>política comercial</em> (garantías oficiales, 
              estrategia geopolítica USA). BIS mide <em>mercado real</em> (decisiones bancarias privadas).
            </p>
            <p>
              <strong>3. Para análisis riguroso:</strong> Usar BIS como baseline de "cuánto TF existe" y 
              EXIM como variable de política (tratamiento cuasi-experimental).
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-900">
          <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2">⚠️ Disclaimer Metodológico</h4>
          <p className="text-xs text-muted-foreground">
            Comparación imperfecta: BIS incluye préstamos corporativos + soberana + interbancario (no solo TF puro). 
            EXIM solo mide garantías/seguros oficiales. El ratio real EXIM/TF comercial podría ser 5-10x mayor 
            si aisláramos TF del total BIS. Aún así, EXIM sigue siendo minoritario.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
