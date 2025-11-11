"use client"

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import stateData from "@/data/brazil/03_tf_by_state_data.json"
import coordinatesData from "@/data/brazil/10_states_coordinates.json"

export function BrazilMapChart() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mapContainer.current || mapInstance.current) return

    // Importar Leaflet solo en el cliente
    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css')
      
      try {
        // Crear mapa
        const map = L.default.map(mapContainer.current!).setView([-14.2350, -51.9253], 4)
      
      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      // Merge de datos
      const stateDataMap = new Map(stateData.data.map(d => [d.uf, d]))
      
      // Calcular min/max para colorear
      const avgOps = stateData.data.map(d => d.carteira_ativa_total / d.records)
      const max_avg = Math.max(...avgOps)
      const min_avg = Math.min(...avgOps)

      // Agregar marcadores
      coordinatesData.states.forEach(state => {
        const state_info = stateDataMap.get(state.uf)
        if (!state_info) return

        const avg_op = state_info.carteira_ativa_total / state_info.records
        const pct_cartera = (state_info.carteira_ativa_total / 
          stateData.data.reduce((sum, d) => sum + d.carteira_ativa_total, 0)) * 100

        // Color basado en tamaño promedio (gradiente rojo a azul)
        const normalized = (avg_op - min_avg) / (max_avg - min_avg)
        const hue = normalized * 240
        const color = `hsl(${hue}, 70%, 50%)`

        // Radio del círculo proporcional a # operaciones
        const radius = Math.sqrt(state_info.records) * 30

        // Crear círculo
        const circle = L.default.circle([state.lat, state.lng], {
          radius: radius,
          color: color,
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.6,
          fillColor: color,
        })

        // Popup con información
        const popupContent = `
          <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
            <strong style="font-size: 14px;">${state.name}</strong><br/>
            <strong>Operaciones:</strong> ${(state_info.records/1000).toFixed(1)}k<br/>
            <strong>Promedio:</strong> BRL ${avg_op.toFixed(0)}k<br/>
            <strong>Cartera:</strong> ${pct_cartera.toFixed(1)}%<br/>
            <strong>Región:</strong> ${state.region}
          </div>
        `

        circle.bindPopup(popupContent, { maxWidth: 250 })
        circle.on('mouseover', function() { this.openPopup() })
        circle.on('mouseout', function() { this.closePopup() })
        circle.addTo(map)

        // Agregar etiqueta de estado
        L.default.marker([state.lat, state.lng], {
          icon: L.default.divIcon({
            className: 'leaflet-state-label',
            html: `<div style="
              background: rgba(255, 255, 255, 0.95);
              border: 2px solid ${color};
              border-radius: 4px;
              padding: 4px 8px;
              font-size: 12px;
              font-weight: bold;
              text-align: center;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              color: #333;
              min-width: 40px;
            ">${state.uf}</div>`,
            iconSize: [50, 28],
            iconAnchor: [25, 14],
          })
        }).addTo(map)
      })

      mapInstance.current = map
      } catch (error) {
        console.error('Error inicializando mapa:', error)
      }
    })

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [isClient])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-600" />
          Mapa Interactivo: Trade Finance por Estado
        </CardTitle>
        <CardDescription>
          Tamaño de círculo = cantidad de operaciones. Color = tamaño promedio de operación (rojo=pequeño, azul=grande)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          ref={mapContainer}
          style={{ 
            height: '500px', 
            width: '100%', 
            borderRadius: '8px',
            border: '2px solid #e5e7eb',
            position: 'relative',
            zIndex: 1,
          }} 
        />

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Leyenda del Mapa</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200">
              <div className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">🔴 Rojo (Pequeño)</div>
              <div className="text-xs text-muted-foreground">
                Operación promedio baja (~BRL 10-20k). PyMEs pequeñas, subfinanciadas.
              </div>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200">
              <div className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">🟡 Amarillo (Medio)</div>
              <div className="text-xs text-muted-foreground">
                Operación promedio media (~BRL 40-50k). Mezcla de empresas.
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200">
              <div className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">🔵 Azul (Grande)</div>
              <div className="text-xs text-muted-foreground">
                Operación promedio alta (~BRL 90k+). Operaciones grandes, consolidadas.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/20 rounded border">
          <h5 className="font-semibold text-foreground">Cómo Leer el Mapa</h5>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong>📍 Tamaño del círculo:</strong> Proporcional a cantidad de operaciones. 
              Círculos más grandes = más operaciones en ese estado.
            </li>
            <li>
              <strong>🎨 Color del círculo:</strong> Indica tamaño promedio de operación. 
              Rojo = operaciones pequeñas, Azul = operaciones grandes.
            </li>
            <li>
              <strong>🏷️ Etiqueta con sigla:</strong> Código del estado (SP, SC, RS, etc).
              Haz clic en cualquier círculo para ver detalles.
            </li>
            <li>
              <strong>💡 Interpretación:</strong> Círculos rojos grandes = región con muchas PyMEs pequeñas. 
              Círculos azules = concentración de operaciones grandes.
            </li>
          </ul>
        </div>

        <div className="space-y-3 p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded border border-indigo-200 dark:border-indigo-900">
          <h5 className="font-semibold text-foreground">📊 Patrones Observables</h5>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong className="text-red-600 dark:text-red-400">🔴 Sur (SC, RS, PR):</strong> Círculos ROJOS GRANDES = muchas PyMEs pequeñas.
            </li>
            <li>
              <strong className="text-yellow-600 dark:text-yellow-400">🟡 Sudeste (SP):</strong> Círculo grande AMARILLO = operaciones medias.
            </li>
            <li>
              <strong className="text-blue-600 dark:text-blue-400">🔵 RJ:</strong> Círculo pequeño pero AZUL = operaciones grandes.
            </li>
            <li>
              <strong className="text-slate-600 dark:text-slate-400">⚪ Nordeste/Centro-Oeste:</strong> Baja penetración, mercado virgen.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
