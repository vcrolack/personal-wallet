# 💰 Personal Wallet

Una aplicación web moderna de gestión de finanzas personales y presupuestos, construida con Angular 20 y diseñada para ayudarte a tomar el control de tu dinero.

## 📋 Descripción

Personal Wallet es una SPA (Single Page Application) que permite a los usuarios:

- 📊 **Gestionar presupuestos** con asignación de categorías
- 💳 **Administrar cuentas bancarias** y tipos de transacciones
- 📈 **Visualizar datos financieros** mediante gráficos interactivos
- 🎯 **Aplicar la regla 50/30/20** (Necesidades, Deseos, Ahorros)
- 📱 **Dashboard intuitivo** con resumen de gastos y análisis

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| ⚡ Framework | Angular 20 (Standalone Components) |
| 📝 Lenguaje | TypeScript 5.9 |
| 🎨 Estilos | Tailwind CSS 4 |
| 📊 Gráficos | ApexCharts + ng-apexcharts |
| 🔌 Backend | Supabase + API Meraki |
| 🔄 Reactividad | RxJS 7 + Angular Signals |
| 🎯 Iconos | Lucide Angular |

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular y escalable:

```
src/
├── 📁 app/
│   ├── 🧠 core/                    # Lógica central de la aplicación
│   │   ├── services/               # 15 servicios de negocio
│   │   ├── models/                 # Interfaces TypeScript
│   │   ├── dtos/                   # Data Transfer Objects
│   │   ├── requests/               # Payloads HTTP
│   │   ├── responses/              # Tipos de respuesta API
│   │   ├── mappers/                # Transformación DTO → Model
│   │   ├── guards/                 # Protección de rutas
│   │   ├── interceptors/           # Interceptores HTTP
│   │   └── enums/                  # Enumeraciones
│   │
│   ├── 🎯 features/                # Módulos de funcionalidad
│   │   ├── auth/                   # 🔐 Autenticación
│   │   ├── dashboard/              # 📊 Panel principal
│   │   ├── budgets/                # 💵 Presupuestos
│   │   ├── transactions/           # 💳 Transacciones
│   │   ├── accounts/               # 🏦 Cuentas bancarias
│   │   ├── catalog/                # 📚 Categorías y reglas
│   │   └── settings/               # ⚙️ Configuración
│   │
│   └── 🧩 common/                  # Componentes compartidos
│       ├── components/
│       │   ├── form/               # Inputs, buttons, selects
│       │   ├── layout/             # Sidebar, header, tabs
│       │   ├── charts/             # Pie chart, donut chart
│       │   └── ui/                 # Table, modal, badge, etc.
│       └── pipes/                  # Pipes personalizados
│
├── 🌍 environments/                # Configuración por ambiente
└── 🎨 styles.css                   # Estilos globales
```

## ✨ Características Principales

### 🔐 Autenticación
- Login con gestión de tokens
- Protección de rutas con guards
- Integración con API Meraki

### 📊 Dashboard
- Vista general de finanzas
- Contador de montos totales
- Seguimiento de fecha actual

### 💵 Presupuestos
- CRUD completo de presupuestos
- Asignación de categorías
- Vista detallada con:
  - 🎨 Sección hero
  - 📋 Lista de categorías
  - 📈 Resumen visual con gráficos
  - ⏳ Skeleton loaders

### 📚 Catálogo
- **Categorías**: Gestión con regla 50/30/20
  - 🏠 Necesidades (50%)
  - 🎉 Deseos (30%)
  - 💰 Ahorros (20%)
- **Reglas**: Configuración de presupuestos

### 💳 Transacciones
- Registro de movimientos
- Vinculación con presupuestos
- Tipos de transacción personalizables

### 🏦 Cuentas
- Gestión de múltiples cuentas bancarias
- Seguimiento por institución financiera

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd personal-wallet

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | 🚀 Inicia el servidor de desarrollo |
| `npm run build` | 📦 Compila para producción |
| `npm run watch` | 👀 Compila en modo watch |
| `npm test` | 🧪 Ejecuta tests unitarios |

## 🔧 Configuración de Entornos

### Desarrollo
```typescript
{
  merakiUrl: 'http://localhost:6001/api/v1',
  supabaseUrl: '...',
  supabaseKey: '...'
}
```

### Producción
Configurar las variables en `src/environments/environment.ts`

## 📐 Patrones de Diseño

- ✅ **Standalone Components** - Sin NgModules
- ✅ **Reactive Programming** - RxJS + Signals
- ✅ **Mapper Pattern** - Transformación de datos
- ✅ **Service-Based Architecture** - Lógica centralizada
- ✅ **Guard-Based Protection** - Seguridad en rutas
- ✅ **HTTP Interceptors** - Manejo de peticiones

## 🌐 Localización

La aplicación está configurada para español (Chile) `es-CL` por defecto.

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| 📝 Líneas de código TS | ~4,800+ |
| 🔧 Servicios | 15 |
| 📦 DTOs | 10 |
| 🗺️ Mappers | 7 |
| 🧩 Componentes comunes | 20+ |
| 🎯 Módulos de features | 7 |

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso personal.

---

<p align="center">
  Hecho con ❤️ usando Angular 20
</p>
