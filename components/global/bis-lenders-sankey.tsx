"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts'
import bisLenders from '@/public/data/global/bis_exposure_by_reporting_country_latest.json'

const COUNTRY_COLORS: Record<string, string> = {
  'Brazil': '#16a34a',
  'Spain': '#dc2626',
  'United States': '#2563eb',
  'United Kingdom': '#7c3aed',
  'France': '#0891b2',
  'Japan': '#ea580c',
  'Chile': '#c026d3',
  'Germany': '#65a30d',
}

export function BISLendersSankey() {
  const brazilData = bisLenders.data
    .filter((d: any) => d.country === 'Brazil')
    .slice(0, 8)
    .map((d: any) => ({
      name: d['Reporting country'],
      value: d.usd_billions,
      share: d.share_pct,
    }))

  const mexicoData = bisLenders.data
    .filter((d: any) => d.country === 'Mexico')
    .slice(0, 6)
    .map((d: any) => ({
      name: d['Reporting country'],
      value: d.usd_billions,
      share: d.share_pct,
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dependencia Externa: Quién Financia a Latinoamérica</CardTitle>
        <CardDescription>
          Top prestamistas internacionales por país receptor (2024-Q4). 
          Home bias: Brasil 47.7% doméstico, Chile 42.5%, México/Perú 0% (100% extranjero).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Brazil */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">🇧🇷 Brasil (USD 7,682bn total)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brazilData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" tick={{ fontSize: 11 }} label={{ value: 'USD Billions', position: 'insideBottom', offset: -5 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                <Tooltip 
                  formatter={(value: any, name: string, props: any) => [
                    `USD ${value.toFixed(1)}bn (${props.payload.share.toFixed(1)}%)`, 
                    'Exposición'
                  ]}
                  contentStyle={{ fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {brazilData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[entry.name] || '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Insight:</strong> Brasil tiene el mayor home bias (47.7%), seguido de España (26.3%). USA solo 12.4%.
            </p>
          </div>

          {/* Mexico */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">🇲🇽 México (USD 4,500bn total)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={mexicoData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" tick={{ fontSize: 11 }} label={{ value: 'USD Billions', position: 'insideBottom', offset: -5 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                <Tooltip 
                  formatter={(value: any, name: string, props: any) => [
                    `USD ${value.toFixed(1)}bn (${props.payload.share.toFixed(1)}%)`, 
                    'Exposición'
                  ]}
                  contentStyle={{ fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {mexicoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[entry.name] || '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Insight:</strong> México 100% dependiente de capital extranjero. España domina (55.8%), USA segundo (25.4%).
            </p>
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-900">
            <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">🌍 Hallazgo Global</h4>
            <p className="text-sm text-muted-foreground">
              España es el <strong>mayor financiador de LAC-4</strong> (36.9% del total, USD 5.4trn), 
              superando a USA (15.7%). Herencia colonial + expansión BBVA/Santander en los 2000s. 
              <span className="block mt-2">
                <strong>Riesgo sistémico:</strong> Alta concentración en España implica que crisis bancaria europea 
                impacta desproporcionadamente a LAC (contagio observado en 2012 crisis deuda soberana).
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
