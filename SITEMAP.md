# Trade Finance Dashboard - Mapa del Sitio

## Estructura de Navegación

### Navbar Principal
- **Inicio** → `/` (Landing page)
- **Instrumentos** → `#instruments` (scroll to section)
- **Países** → `#countries` (scroll to section)
- **Datos & Análisis** → `/datos` (página independiente)
- **Global** → `#global` (scroll to section)

---

## 1. Landing Page (`/`)

### Secciones del Landing (en orden):

#### A. Hero Section
- Título principal del proyecto
- Introducción al Trade Finance en LAC
- CTA principal

#### B. Panorama Global (`#overview`)
**Contenido:**
- Contexto regional LAC
- Mapa interactivo con países analizados: Brasil, Chile, Perú, México
- **Card Preview: "Análisis de Datos - Retrasos en Pagos Comerciales"**
  - **Fuente:** FCIB (Finance, Credit and International Business Survey 2023-2025)
  - **Datos:** 124 observaciones, 30+ países, 4 regiones
  - **Métricas:** Días promedio de retraso, tendencias de pago
  - **CTA:** Botón "Ver análisis completo" → `/datos`
  - **Archivo:** `data/credit_data.json`

#### C. Instrumentos de Trade Finance (`#instruments`)
- 6 cards con instrumentos principales:
  1. Cartas de Crédito (L/C)
  2. Seguro de Crédito a la Exportación
  3. Factoring Internacional
  4. Financiamiento de Inventarios
  5. Pre y Post-Embarque
  6. Garantías de Cumplimiento

#### D. América Latina en Contexto (`#analysis`)
- Estadísticas clave de la región
- Barreras de acceso al financiamiento

#### E. Perspectiva Global (`#global`)
**3 Tabs con iniciativas internacionales:**
1. **Asia (ADB, Funding Societies, Plataformas Digitales)**
2. **India (TReDS, NIRVIK, Factoring Regulation Act)**
3. **África (AfCFTA, Afreximbank, Digital Trade Hubs)**

**Lecciones Aprendidas:**
- 5 cards con mejores prácticas globales
- Aplicables a contexto LAC

#### F. Perfiles de Países (`#countries`)
**4 países con análisis detallado:**
- 🇧🇷 **Brasil** → `/paises/brasil`
- 🇨🇱 **Chile** → `/paises/chile`
- 🇲🇽 **México** → `/paises/mexico`
- 🇵🇪 **Perú** → `/paises/peru`

**Por cada país:**
- Instituciones principales
- Programas activos
- Estadísticas clave
- Fuentes oficiales

---

## 2. Página de Datos & Análisis (`/datos`)

### Contenido:
**Header:**
- Título: "Financiamiento Internacional a Latinoamérica"
- Descripción: "40 años de exposición bancaria internacional (BIS) + programas oficiales USA (EXIM Bank)"

**Disclaimer Metodológico:**
- Limitaciones de datos BIS (no aísla Trade Finance puro)
- Alcance de EXIM Bank (0.05-0.35% del mercado total)

**2 Tabs Principales:**

#### Tab 1: BIS (Bank for International Settlements)
**Componentes disponibles:**
1. `BISCrisisTimeline` - Timeline de crisis 1983-2024
2. `BISLendersSankey` - Flujos de financiamiento por país reportante
3. Análisis de concentración bancaria
4. Exposición total por trimestre

**Fuentes:**
- BIS Consolidated Banking Statistics
- Cobertura: LAC-4 (Brasil, Chile, México, Perú) 1983-2024

#### Tab 2: EXIM Bank USA
**Componentes disponibles:**
1. `EXIMDeclineAnalysis` - Caída de programas 2007-2025
2. `EXIMPymeAccess` - Acceso de PYMEs por país
3. `EximVsBisRatio` - Comparación EXIM vs exposición total BIS
4. Distribución por programa (Guarantee, Insurance, Loan, Working Capital)

**Fuentes:**
- Export-Import Bank of the United States
- 51,414 operaciones, 152 países destino, 2007-2025

**CTA:** Botones hacia dashboards de panorama

---

## 3. Dashboards de Panorama

### A. Brecha Global (`/panorama/brecha-global`)
**Fuente:** FCIB Survey 2023-2025
**Archivo:** `data/credit_data.json`

**Componentes:**
1. `PaymentTrendsChart` - Tendencias temporales de retrasos
2. `PaymentRiskHeatmap` - Mapa de calor regional
3. `GlobalPaymentComparison` - Comparación entre regiones
4. `CreditDelaysChart` - Análisis de delays por país

**Destacado:** América Latina vs otras regiones emergentes

### B. EXIM & BIS Profundo (`/panorama/exim-bis`)
**Fuentes combinadas:**
- BIS Consolidated Banking Statistics
- EXIM Bank authorizations
- WUI (World Uncertainty Index) - en integración

**Análisis riguroso:**
- Correlaciones entre exposición bancaria y programas oficiales
- Ratios EXIM/BIS por país y año
- Impacto de crisis globales (2008, 2020)
- Volatilidad pre/post COVID

**Archivos:**
- `data/global/bis_exposure_*.csv`
- `data/global/exim_*.csv`

---

## 4. Dashboards por País

### Brasil (`/paises/brasil`)
**Fuente:** Banco Central do Brasil (BCB)
- **Sample:** Nivel estatal (UF), desagregado por tipo de cliente y sector (CNAE)
- **Período:** Mensual, 2012-2024
- **Variables TF:** Modalidad Comércio Exterior, operaciones, saldos por vencimiento, cartera vencida >15 días

**Componentes (10 gráficos):**
1. Trade Finance por tamaño de firma
2. Composición por moneda
3. Concentración bancaria
4. TF por sector (CNAE)
5. Evolución temporal
6. Análisis de NPL (morosidad)
7. Evolución por tamaño
8. Razón TF/Comercio en el tiempo
9. Estructura de vencimientos
10. Evolución regional top-5

**Archivos:** `data/brazil/*.json` (10 archivos)

### Chile (`/paises/chile`)
**Fuente:** CMF (Comisión para el Mercado Financiero)
- **Sample:** Banco-level, desagregado por moneda y tipo de indexación
- **Período:** Mensual, 2012-2024
- **Variables TF:** Cartas de crédito emitidas/confirmadas, cobranzas, facturas export/import

**Componentes (9 gráficos):**
1. Concentración bancaria
2. Volumen anual L/C
3. Estacionalidad L/C
4. Crecimiento anual
5. Penetración L/C vs comercio
6. Razón L/C/Comercio mensual
7. Distribución indexadores (UF, IPC, USD)
8. Composición por moneda vs vencimiento
9. Resumen anual

**Archivos:** `data/chile/*.json` (9 archivos)

### México (`/paises/mexico`)
**Fuente:** CNBV (Comisión Nacional Bancaria y de Valores)
- **Sample:** Banco-level
- **Período:** Mensual
- **Variables TF:** Créditos comercio exterior, moneda extranjera

**Componentes (8 gráficos):**
1. Evolución mensual
2. Crecimiento anual
3. Concentración bancaria
4. Market share bancario con comercio
5. TF por sector
6. Penetración TF
7. Dolarización en el tiempo
8. Tasas de crecimiento anual

**Archivos:** `data/mexico/*.json` (8 archivos)

### Perú (`/paises/peru`)
**Fuente:** SBS (Superintendencia de Banca, Seguros y AFP)
- **Sample:** Banco-level
- **Período:** Mensual
- **Variables TF:** Créditos comercio exterior

**Componentes (7 gráficos):**
1. Top cuentas bancarias
2. TF por estados
3. Evolución temporal
4. Breakdown export/import
5. Tendencias de crédito export/import
6. Resumen anual
7. Market concentration

**Archivos:** `data/peru/*.json` (7 archivos)

---

## 5. Archivos de Datos

### Estructura de carpetas:
```
data/
├── credit_data.json          # FCIB Survey (landing preview)
├── brazil/                   # 10 JSON files
├── chile/                    # 9 JSON files
├── mexico/                   # 8 JSON files
├── peru/                     # 7 JSON files
└── global/                   # BIS + EXIM + WUI
    ├── bis_exposure_*.csv
    ├── exim_*.csv
    └── [WUI en integración]
```

### Transformaciones pendientes:
```
transformacion-json/
├── output/                   # JSONs generados (FCIB)
└── [Brasil, Chile, México, Perú]/  # CSVs raw pendientes
```

---

## 6. Componentes Reutilizables

### Charts Globales (`components/global/`)
- `BISCrisisTimeline`
- `BISLendersSankey`
- `EXIMDeclineAnalysis`
- `EximVsBisRatio`
- `EXIMPymeAccess`

### Charts Panorama (`components/`)
- `PaymentTrendsChart`
- `PaymentRiskHeatmap`
- `GlobalPaymentComparison`
- `CreditDelaysChart`

### Charts por País (`components/[country]/`)
Cada país tiene sus propios componentes especializados según datos disponibles.

### UI Core (`components/`)
- `Navbar`
- `StatCard`
- `InstrumentCard`
- `CountryCard`
- `GlobalInitiativeCard`
- `LessonCard`
- etc.

---

## 7. Flujo de Usuario

### Ruta típica 1: Explorador general
1. **Landing** → Lee contexto
2. **#overview** → Ve preview FCIB
3. **Click "Ver análisis completo"** → `/datos`
4. **Tab FCIB** → Analiza retrasos de pago
5. **Vuelve** → Explora países específicos

### Ruta típica 2: Investigador de país
1. **Landing** → Scroll directo a `#countries`
2. **Click país (ej. Brasil)** → `/paises/brasil`
3. **Analiza 10 gráficos** detallados
4. **Navega** a otros países LAC

### Ruta típica 3: Analista de financiamiento global
1. **Landing** → Click `Datos & Análisis`
2. **`/datos`** → Tabs BIS y EXIM
3. **Analiza 40 años** de exposición
4. **Click "Ver Panorama"** → `/panorama/exim-bis`
5. **Deep dive** en correlaciones

---

## 8. TODOs y Mejoras Identificadas

### Pendientes de integración:
- [ ] **WUI (World Uncertainty Index)** → Correlacionar con shocks de TF
- [ ] **Hardy & Saffie datasets** (Chile micro-level) → Análisis académico
- [ ] **Bases BACI** (comercio bilateral) → Ya en ETL pero no visualizado en dashboard
- [ ] **Income levels & country correspondence** → Clasificaciones auxiliares

### Mejoras de UX:
- [ ] Breadcrumbs en páginas de países
- [ ] Botón "Volver" más visible en `/panorama/*`
- [ ] Tabs con indicador de contenido cargado
- [ ] Loading states para gráficos pesados
- [ ] Tooltips explicativos en métricas técnicas

### Correcciones pendientes:
- [x] Error SSR en Brasil (window is not defined) → **A RESOLVER**
- [ ] Verificar que todos los JSON estén en `/data` (no solo `/transformacion-json/output`)
- [ ] Normalizar nombres de archivos (algunos muy largos)
- [ ] Agregar metadata consistente a todos los JSON

---

## 9. Fuentes de Datos (Resumen)

| Fuente | Cobertura | Frecuencia | Variables TF | Ubicación |
|--------|-----------|------------|--------------|-----------|
| **FCIB Survey** | Global (30+ países) | Anual/Mensual | Retrasos pago, términos crédito | `data/credit_data.json` |
| **BCB Brasil** | Nivel estatal (UF) | Mensual 2012-2024 | Comércio Exterior, NPL, vencimientos | `data/brazil/` |
| **CMF Chile** | Banco-level | Mensual 2012-2024 | L/C, cobranzas, facturas | `data/chile/` |
| **CNBV México** | Banco-level | Mensual | Créditos comercio exterior | `data/mexico/` |
| **SBS Perú** | Banco-level | Mensual | Créditos comercio exterior | `data/peru/` |
| **BIS** | LAC-4 | Trimestral 1983-2024 | Exposición bancaria internacional | `data/global/bis_*.csv` |
| **EXIM USA** | 152 países | Operacional 2007-2025 | Programas garantías/seguros/préstamos | `data/global/exim_*.csv` |

---

## Metadata de Actualización
- **Última revisión:** 2025-11-11
- **Autor:** Trade Finance LAC Research
- **Versión:** 1.0
- **Estado:** En desarrollo activo

