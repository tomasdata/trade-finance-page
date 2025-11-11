# Estructura de Navegación Actual

## Páginas Existentes

### 1. Landing Page `/`
- ✅ Tiene Navbar
- Secciones:
  - Hero con estadísticas
  - #overview - Panorama Global con card "Datos & Análisis" (enlaza a /datos)
  - #instruments - Instrumentos de TF
  - #analysis - Análisis LAC (barreras)
  - #global - Perspectiva Global (expansible)
  - #countries - Perfiles por país (expansible)

### 2. Datos & Análisis `/datos`
- ✅ Tiene Navbar
- ✅ Enlazado desde navbar ("Datos & Análisis")
- ✅ Enlazado desde landing (#overview card)
- Contenido: BIS + EXIM análisis completo
- **PROBLEMA**: El título dice "Financiamiento Internacional" pero la navbar dice "Datos & Análisis"

### 3. Panorama Global `/panorama/brecha-global`
- ❌ NO tiene Navbar
- ❌ NO está enlazado desde ningún lado
- Contenido: 2 gráficos (EximVsBisRatio, BISLendersSankey)
- **PROBLEMA**: Esta debería ser la página a donde va el card de "Brecha de Trade Finance" del landing

### 4. Panorama EXIM/BIS `/panorama/exim-bis`  
- ❌ NO tiene Navbar
- ❌ NO está enlazado desde ningún lado
- **PROBLEMA**: Posiblemente duplicada con /datos?

### 5. Páginas de Países
- `/paises/brasil` ❌ NO tiene Navbar, ❌ NO enlazado
- `/paises/chile` ❌ NO tiene Navbar, ❌ NO enlazado
- `/paises/mexico` ❌ NO tiene Navbar, ❌ NO enlazado
- `/paises/peru` ❌ NO tiene Navbar, ❌ NO enlazado

**PROBLEMA**: Los CountryCard tienen `hasDetailPage` prop pero el onClick solo expande la sección en el landing, no navega a la página individual

## Navbar Actual

```
Inicio (/) ✅
Instrumentos (#instruments) ✅ 
Países (#countries) ✅
Datos & Análisis (/datos) ✅
Global (#global) ✅
```

## Problemas Principales

1. **Páginas huérfanas**: `/panorama/*` y `/paises/*` existen pero no se puede llegar a ellas
2. **CountryCard engañoso**: Dice "hasDetailPage" pero no navega
3. **Duplicación posible**: ¿/datos vs /panorama/exim-bis?
4. **Navbar incompleto**: Falta dropdown o sección para "Panorama" con subsecciones
5. **Card de Brecha Global**: No enlaza a su página dedicada

## Propuesta de Solución

### Opción A: Convertir todo en landing único (más simple)
- Eliminar páginas `/panorama/*` y `/paises/*`
- Mantener todo expansible en landing
- Solo mantener `/datos` como página separada

### Opción B: Navegación completa (más complejo)
- Agregar al navbar:
  - Dropdown "Panorama" con:
    - Brecha Global (/panorama/brecha-global)
    - EXIM/BIS (/panorama/exim-bis)
  - Dropdown "Países" con enlaces directos a /paises/{pais}
- Agregar Navbar a todas las páginas
- Conectar CountryCard para navegar a páginas individuales
