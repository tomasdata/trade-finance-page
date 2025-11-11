"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine } from 'recharts'
import { TrendingDown } from "lucide-react"
import eximSMB from '@/data/global/exim_small_business_share.json'

const COLORS: Record<string, string> = {
  'Mexico': '#16a34a',
  'Brazil': '#2563eb',
  'Peru': '#7c3aed',
  'Chile': '#dc2626',
}

const BENCHMARK = 35 // Global best practice for SME access to export finance

export function EXIMPymeAccess() {
  const data = eximSMB.data
    .map((d: any) => ({
      country: d.country_group,
      share: d.small_business_share_pct,
      amount: d.small_business_usd_millions,
      total: d.approved_usd_millions,
    }))
    .sort((a, b) => b.share - a.share)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-500" />
          Acceso PYME a Financiamiento Oficial: La Gran Brecha
        </CardTitle>
        <CardDescription>
          Participación de pequeñas empresas en programa EXIM (2007-2025). 
          Benchmark global: 35-40% en ECAs líderes (UKEF, NEXI). LAC-4 está rezagado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="country" tick={{ fontSize: 12 }} />
            <YAxis 
              label={{ value: '% del Total Aprobado', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
              tick={{ fontSize: 11 }}
              domain={[0, 40]}
            />
            <Tooltip 
              formatter={(value: any, name: string, props: any) => [
                `${value.toFixed(1)}% (USD ${props.payload.amount.toFixed(0)}M)`,
                'PYME Share'
              ]}
              contentStyle={{ fontSize: 12 }}
            />
            
            <ReferenceLine 
              y={BENCHMARK} 
              stroke="#f59e0b" 
              strokeDasharray="5 5" 
              strokeWidth={2}
              label={{ 
                value: 'Benchmark Global (35%)', 
                position: 'right', 
                fill: '#f59e0b',
                fontSize: 11,
                fontWeight: 'bold'
              }}
            />
            
            <Bar dataKey="share" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.country]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
            <div className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">🏆 Líder: México</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• 20.9% de acceso PYME (USD 3,620M)</div>
              <div>• Contexto: T-MEC incentiva export SMEs</div>
              <div>• Aún 14pp bajo benchmark global</div>
            </div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-900">
            <div className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">📉 Rezagado: Chile</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Solo 2.7% acceso PYME (USD 78M)</div>
              <div>• 32pp bajo benchmark global</div>
              <div>• EXIM Chile dominado por minería (grandes corp.)</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-900">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2">💡 Drivers de Exclusión PYME</h4>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>1. Colateral insuficiente:</strong> PYMEs no tienen activos para garantizar operaciones EXIM 
              (requerimiento típico: 100-110% del monto aprobado).
            </p>
            <p>
              <strong>2. Costos de transacción:</strong> Aplicación EXIM requiere due diligence costoso. 
              No escala para tickets &lt;USD 500K (típico de PYME).
            </p>
            <p>
              <strong>3. Sesgo sectorial:</strong> EXIM concentrado en aeroespacial (Brasil: Embraer), 
              minería (Chile: cobre), manufactura pesada (México: automotriz). 
              Sectores PYME (agroindustria, textil) sub-representados.
            </p>
            <p>
              <strong>4. Falta de awareness:</strong> 70% de PYMEs exportadoras desconocen existencia de ECAs 
              (Encuesta ICC 2023).
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          <strong>Benchmark internacional:</strong> UKEF (UK): 38% PYME | NEXI (Japón): 42% PYME | 
          Euler Hermes (Alemania): 35% PYME. LAC necesita programas específicos (ej. ventanillas PYME, 
          garantías parciales, digitalización aplicaciones).
        </p>
      </CardContent>
    </Card>
  )
}
