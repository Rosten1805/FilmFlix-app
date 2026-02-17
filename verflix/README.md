# Verflix - Netflix-like Application

Una aplicación tipo Netflix construida con TMDB API, React 18 (legacy), Tailwind CSS y shadcn/ui.

## 🚀 Quick Start

```bash
# Instalación
npm install

# Development
npm run dev

# Build
npm run build
```

## 📚 Documentación

### Planificación & Análisis
- [API Endpoints](DOCS/api_endpoints.md) - Endpoints TMDB, rate limiting, transformaciones
- [Modelo de Datos](DOCS/data_model.md) - Schema 3NF, entidades, validación
- [Arquitectura](DOCS/arquitectura.md) - Capas, flujo de datos, React 18 legacy

### Desarrollo
- [UI Kit & Design System](DOCS/ui_kit.md) - Componentes shadcn/ui, tokens Tailwind, especificaciones
- [Design System Spec](DOCS/design_system_spec.md) - Especificación completa: tokens, estados, variantes, accesibilidad
- [Component Catalog](DOCS/component_catalog.md) - Referencia visual rápida de componentes
- [TMDB Setup Guide](DOCS/tmdb_setup.md) - Guía para obtener credenciales de TMDB
- [Plan de Commits](DOCS/plan_commits.md) - Conventional commits, tags, ciclo de release
- [Dependencias](DOCS/dependencias.md) - Gestión de versiones, security policy

### Release Management
- [Versionado & Release](DOCS/versionado_release.md) - SemVer, release notes, automation
- [Changelog](DOCS/changelog.md) - Historial de versiones y cambios

## 🎯 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 (clases + setState) |
| Estilos | Tailwind CSS v3 |
| Componentes UI | shadcn/ui |
| HTTP Client | Fetch API + HTTPClient wrapper |
| State | LocalStorage + Context API |
| API Externa | TMDB v3 |

## 📋 Current Release

**Version**: v0.2.0 (Documentation Complete)  
**Status**: Ready for Implementation

### Features Completados
- ✅ Documentación de API endpoints con análisis completo
- ✅ Modelo de datos normalizado (3NF)
- ✅ Arquitectura de sistema completa
- ✅ Plan de commits secuenciados (25 commits)
- ✅ UI Kit & Design System specification

### Próximos Pasos
- 🔄 Implementación de componentes UI
- 🔄 Setup de proyecto React
- 🔄 HTTPClient + Normalizer layer
- 🔄 Home & Grid components

## 🎨 Design System

Paleta de colores dark-first optimizada para streaming:
- **Fondo principal**: `#0b0b0f` (casi negro)
- **Superficies**: `#11131a` / `#151827` (gris oscuro)
- **Texto**: `#f2f2f7` (blanco roto)
- **Acentos**: Purpura/Rosa (gradientes Netflix-style)

Ver [UI Kit completo](DOCS/ui_kit.md) para tokens, componentes y especificaciones de accesibilidad.

## 🏗️ Project Structure

```
verflix/
├── DOCS/
│   ├── api_endpoints.md
│   ├── data_model.md
│   ├── arquitectura.md
│   ├── ui_kit.md              # Design System
│   ├── plan_commits.md
│   ├── versionado_release.md
│   ├── dependencias.md
│   └── changelog.md
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── media/
│   ├── pages/
│   ├── services/
│   └── App.js
└── README.md
```

## 📖 Cómo Usar Esta Documentación

1. **Nuevo en el proyecto**: Lee [arquitectura.md](DOCS/arquitectura.md)
2. **Setup inicial**: Sigue [TMDB Setup Guide](DOCS/tmdb_setup.md) para configurar la API
3. **Implementar componentes**:
   - Ver [Design System Spec](DOCS/design_system_spec.md) para especificaciones completas
   - Usa [Component Catalog](DOCS/component_catalog.md) como referencia rápida
4. **Entender la data**: Consulta [data_model.md](DOCS/data_model.md)
5. **Release nuevo**: Sigue [versionado_release.md](DOCS/versionado_release.md)

## 🔗 Enlaces Útiles

- [TMDB API Docs](https://developer.themoviedb.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React 18 Docs](https://react.dev)

## 📝 License

MIT