# 🚀 Guía de Ejecución del Dashboard - Trade Finance LAC

## 📋 Requisitos Previos

- Node.js 18+ instalado
- pnpm instalado (ya configurado)

## 🏃‍♂️ Comandos para Ejecutar

### 1. Iniciar el Servidor de Desarrollo

```bash
# Navega al directorio del proyecto
cd /Users/tomasfernandez/Documents/Tomas/Trade-Finance-Dash/trade-finance-page

# Inicia el servidor
pnpm run dev
```

El dashboard estará disponible en: **http://localhost:3000**

### 2. Navegación del Dashboard

El dashboard ahora tiene dos secciones principales:

#### 🏠 Página Principal (`/`)
- Hero section con estadísticas clave
- Vista general de instrumentos de trade finance
- Perfiles de países (Chile, Perú, Brasil, Colombia, México)
- Análisis LAC y perspectiva global
- **Preview card** con link a análisis de datos completo

#### 📊 Página de Datos y Análisis (`/datos`)
- **Nueva página dedicada** con análisis exhaustivo de datos
- 3 tabs interactivos:
  - **Comparación Global**: LAC vs resto del mundo
  - **Detalle LAC**: Análisis por país de la región
  - **Tendencias**: Evolución temporal 2024-2025
- Interpretaciones y contexto en cada sección
- Metodología y fuentes documentadas

### 3. Ver los Gráficos

Una vez iniciado el servidor:

1. Abre `http://localhost:3000`
2. En la sección **"Panorama Global"** verás un **preview card** con estadísticas
3. Haz clic en **"Ver análisis completo"** o navega a `/datos`
4. Explora los 3 tabs con visualizaciones detalladas:

#### Tab 1: Comparación Global
- **Gráfico de Barras Regional**: Días promedio de retraso por región
- **Scatter Plot de Riesgo**: Relaciona retrasos con % empresas reportando incremento
- **Cards de Estadísticas**: LAC vs promedio global, mejor región
- **Interpretación**: Contexto y análisis de resultados

#### Tab 2: Detalle LAC
- **Gráfico de Barras por País**: Comparación entre países latinoamericanos
- **Análisis Contextual**: Factores que explican diferencias
- **Oportunidades**: Políticas públicas y mejores prácticas

#### Tab 3: Tendencias
- **Líneas de Tiempo**: Evolución mensual 2024-2025
- **Factores Explicativos**: Ciclo económico, shocks de liquidez
- **Implicaciones**: Políticas contracíclicas y coordinación regional

## 🎨 Características de los Nuevos Gráficos

### ✨ Enfoque Global
- Comparan América Latina con el resto del mundo
- Destacan a LAC con colores distintivos (azul)
- Muestran contexto internacional para entender la brecha regional

### 📈 Datos Procesados
- **Fuente**: Finance, Credit and International Business Survey 2023-2025
- **Período**: 2024-2025 (datos más recientes)
- **Países**: 30+ países en dataset
- **Regiones**: LAC, Asia, MENA, Norteamérica & Europa

### 🔄 Interactividad
- Tooltips informativos al pasar el mouse
- Botones para expandir análisis detallado
- Estadísticas clave en cards
- Insights contextuales

## 📁 Estructura de Componentes

```
components/
├── global-payment-comparison.tsx   # Gráfico comparación global
├── payment-risk-heatmap.tsx        # Mapa de riesgo scatter
├── credit-delays-chart.tsx         # Detalle por país (expandible)
└── payment-trends-chart.tsx        # Tendencias temporales (expandible)
```

## 🔧 Otros Comandos Útiles

### Build de Producción
```bash
pnpm run build
```

### Verificar Tipos
```bash
pnpm run lint
```

### Ver Estructura del Proyecto
```bash
tree -L 2 -I 'node_modules|.next'
```

## 📊 Agregar Más Datos en el Futuro

### Proceso de transformación CSV → JSON

1. **Coloca tu CSV** en `/transformacion-json/`
   ```bash
   cd transformacion-json
   ```

2. **Ejecuta el script Python**
   ```bash
   python3 csv_to_json.py tu_archivo.csv
   ```

3. **Copia el JSON generado** a `/data/`
   ```bash
   cp output/tu_archivo.json ../data/
   ```

4. **Crea un nuevo componente** en `/components/` que importe el JSON
5. **Intégralo** en `app/page.tsx`

## 🎯 Próximos Pasos Sugeridos

1. ✅ **Ver los gráficos en acción**: `pnpm run dev`
2. 📸 **Tomar screenshots** para documentación
3. 🔄 **Iterar en diseño** si es necesario
4. 📊 **Agregar más datasets** siguiendo el proceso de transformación
5. 🚀 **Deploy a Vercel** cuando estés satisfecho

## 🐛 Troubleshooting

### Puerto 3000 ocupado
```bash
# Liberar puerto 3000
lsof -ti:3000 | xargs kill -9

# Luego reinicia
pnpm run dev
```

### Error de dependencias
```bash
# Reinstalar dependencias
rm -rf node_modules
pnpm install
```

### Error de build
```bash
# Limpiar cache
rm -rf .next
pnpm run build
```

## 📚 Documentación Adicional

- **`.claude`**: Reglas del proyecto y stack tecnológico
- **`transformacion-json/README.md`**: Guía de transformación de datos
- **Next.js Docs**: https://nextjs.org/docs
- **Recharts Docs**: https://recharts.org/

---

¡Disfruta explorando el dashboard! 🎉
