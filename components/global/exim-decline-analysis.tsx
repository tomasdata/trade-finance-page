"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { AlertTriangle } from "lucide-react"
import eximAuth from '@/public/data/global/exim_authorizations_by_country.json'

export function EXIMDeclineAnalysis() {
  const brazilData = eximAuth.data
    .filter((d: any) => d.country_group === 'Brazil')
    .sort((a: any, b: any) => a.fiscal_year - b.fiscal_year)

  const mexicoData = eximAuth.data
    .filter((d: any) => d.country_group === 'Mexico')
    .sort((a: any, b: any) => a.fiscal_year - b.fiscal_year)

  const combinedData = brazilData.map((b: any, index: number) => ({
    year: b.fiscal_year,
    Brazil_approved: b.approved_usd_millions,
    Brazil_txns: b.txn_count,
    Mexico_approved: mexicoData[index]?.approved_usd_millions || 0,
    Mexico_txns: mexicoData[index]?.txn_count || 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          EXIM Bank USA: Retiro Gradual de Latinoamérica (2007-2025)
        </CardTitle>
        <CardDescription>
          Evolución de autorizaciones EXIM. CAGRs negativos: Brasil -3.6%, México -19.5%. 
          Contexto: crisis subprime 2008, políticas Trump 2017-2020, COVID 2020.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis 
              yAxisId="left"
              label={{ value: 'USD Millions', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              label={{ value: 'Transacciones', angle: 90, position: 'insideRight', style: { fontSize: 11 } }}
              tick={{ fontSize: 11 }}
            />
            <Tooltip 
              formatter={(value: any) => value.toLocaleString()}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            
            <Bar yAxisId="left" dataKey="Brazil_approved" fill="#16a34a" fillOpacity={0.7} name="Brasil (USD M)" />
            <Bar yAxisId="left" dataKey="Mexico_approved" fill="#2563eb" fillOpacity={0.7} name="México (USD M)" />
            <Line yAxisId="right" type="monotone" dataKey="Brazil_txns" stroke="#15803d" strokeWidth={2} name="Brasil (Txns)" />
            <Line yAxisId="right" type="monotone" dataKey="Mexico_txns" stroke="#1e40af" strokeWidth={2} name="México (Txns)" />
          </ComposedChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-900">
            <div className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">📉 Peak vs. 2025</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• México: USD 2,826M (2012) → USD 54M (2025) = <strong>-98%</strong></div>
              <div>• Brasil: USD 967M (2012) → USD 160M (2025) = <strong>-83%</strong></div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-900">
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">💡 Contexto Político</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• 2008-2012: Expansión post-crisis (estímulo Obama)</div>
              <div>• 2013-2016: Normalización</div>
              <div>• 2017-2020: Contracción Trump (America First)</div>
              <div>• 2021-2025: Recuperación lenta Biden</div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          <strong>Interpretación económica:</strong> El retiro de EXIM refleja cambio en política comercial USA 
          (menor apoyo a exportadores) y mayor competencia de ECAs europeas/asiáticas (UKEF, Euler Hermes, NEXI). 
          No indica contracción del mercado TF, sino <strong>sustitución de financiamiento oficial por comercial</strong>.
        </p>
      </CardContent>
    </Card>
  )
}
