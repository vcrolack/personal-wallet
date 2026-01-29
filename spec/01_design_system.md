# Design System - Personal Wallet

> Cyberpunk sutil. Purpura electrico. Dark by default.

---

## 1. Filosofia

El sistema busca una estetica cyberpunk contenida: fondos oscuros, acentos neon en purpura electrico, bordes sutiles con glow y tipografia limpia. No hay ruido visual innecesario. El neon se usa como acento, no como protagonista.

---

## 2. Paleta de Colores

### 2.1 Configuracion Tailwind

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Primary - Purple Neon
        primary: {
          50:  '#f3e8ff',
          100: '#e4ccff',
          200: '#c996ff',
          300: '#ae60ff',
          400: '#9333ea', // base para light contexts
          500: '#8b5cf6', // main
          600: '#7c3aed', // hover
          700: '#6d28d9', // active/pressed
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },

        // Neon accent - para glows y highlights puntuales
        neon: {
          purple: '#bf5af2',
          blue:   '#5e5ce6',
          pink:   '#ff2d55',
          green:  '#30d158',
        },

        // Surface - capas del dark mode
        surface: {
          base:    '#0a0a0f',   // fondo principal
          raised:  '#12121a',   // cards, modals
          overlay: '#1a1a26',   // dropdowns, popovers
          subtle:  '#232334',   // hover states, bordes activos
        },

        // Text
        content: {
          primary:   '#f0eef6', // texto principal
          secondary: '#a09cb5', // texto secundario
          muted:     '#5c5873', // placeholders, hints
          inverse:   '#0a0a0f', // texto sobre fondos claros
        },

        // Semantic
        success:  '#30d158',
        warning:  '#ffd60a',
        danger:   '#ff453a',
        info:     '#5e5ce6',

        // Border
        border: {
          DEFAULT: '#232334',
          subtle:  '#1a1a26',
          focus:   '#8b5cf6',
        },
      },

      boxShadow: {
        'neon-sm':  '0 0 8px  rgba(139, 92, 246, 0.3)',
        'neon-md':  '0 0 16px rgba(139, 92, 246, 0.25)',
        'neon-lg':  '0 0 32px rgba(139, 92, 246, 0.2)',
        'neon-glow': '0 0 8px rgba(139, 92, 246, 0.4), 0 0 24px rgba(139, 92, 246, 0.15)',
      },

      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #8b5cf6, #5e5ce6)',
        'gradient-surface': 'linear-gradient(180deg, #12121a, #0a0a0f)',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

### 2.2 Tokens de Color - Resumen Visual

| Token | Hex | Uso |
|-------|-----|-----|
| `primary-500` | `#8b5cf6` | Botones, links, elementos activos |
| `primary-600` | `#7c3aed` | Hover de primarios |
| `primary-700` | `#6d28d9` | Active/pressed |
| `neon-purple` | `#bf5af2` | Glows, badges especiales, acentos |
| `neon-blue` | `#5e5ce6` | Gradientes secundarios |
| `neon-pink` | `#ff2d55` | Alertas criticas, badges urgentes |
| `neon-green` | `#30d158` | Exito, ingresos, positivos |
| `surface-base` | `#0a0a0f` | Fondo principal |
| `surface-raised` | `#12121a` | Cards, modals |
| `surface-overlay` | `#1a1a26` | Dropdowns, popovers |
| `surface-subtle` | `#232334` | Hover, bordes activos |
| `content-primary` | `#f0eef6` | Texto principal |
| `content-secondary` | `#a09cb5` | Texto secundario |
| `content-muted` | `#5c5873` | Placeholders, disabled |
| `danger` | `#ff453a` | Errores, gastos negativos |
| `success` | `#30d158` | Confirmaciones, ingresos |
| `warning` | `#ffd60a` | Advertencias, presupuesto cercano al limite |

---

## 3. Tipografia

### 3.1 Escala de Titulos (TitleComponent)

Basado en el componente `app-title` existente, adaptado al dark mode:

| Level | Mobile | Desktop | Tracking | Uso |
|-------|--------|---------|----------|-----|
| `h1` | `text-3xl` (30px) | `text-4xl` (36px) | `tracking-tight` | Titulo de pagina |
| `h2` | `text-xl` (20px) | `text-2xl` (24px) | `tracking-normal` | Titulo de seccion |
| `h3` | `text-base` (16px) | `text-lg` (18px) | `tracking-wide` | Subtitulo, cards |
| `h4` | `text-sm` (14px) | `text-base` (16px) | `tracking-wider` | Labels grandes |

**Color tokens para titulos:**

| Color Key | Clase Tailwind | Cuando usar |
|-----------|---------------|-------------|
| `default` | `text-content-primary` | Titulo general |
| `primary` | `text-primary-500` | Titulo destacado, accion |
| `secondary` | `text-content-secondary` | Titulo de soporte |
| `neon` | `text-neon-purple` | Titulo con acento especial |

### 3.2 Escala de Texto (TextComponent)

Basado en el componente `app-text` existente:

| Variant | Mobile | Desktop | Tracking | Weight default | Uso |
|---------|--------|---------|----------|----------------|-----|
| `2xl` | `text-2xl` (24px) | `text-3xl` (30px) | `tracking-tight` | `font-black` | Metricas hero |
| `xl` | `text-xl` (20px) | `text-2xl` (24px) | `tracking-tight` | `font-black` | Metricas secundarias |
| `lg` | `text-lg` (18px) | `text-xl` (20px) | `tracking-tight` | `font-black` | Valores destacados |
| `value` | `text-base` (16px) | `text-lg` (18px) | `tracking-tight` | `font-black` | Montos, cifras |
| `body` | `text-sm` (14px) | `text-base` (16px) | default | `font-normal` | Texto general |
| `small` | `text-xs` (12px) | `text-sm` (14px) | default | `font-normal` | Texto secundario |
| `xs` | `10px` | `text-xs` (12px) | default | `font-normal` | Captions |
| `label` | `10px` | `10px` | `tracking-widest` | `font-normal` | Labels, overlines |

**Color tokens para texto:**

| Color Key | Clase Tailwind | Cuando usar |
|-----------|---------------|-------------|
| `primary` | `text-primary-500` | Links, texto interactivo |
| `default` | `text-content-primary` | Texto principal |
| `secondary` | `text-content-secondary` | Texto de soporte |
| `muted` | `text-content-muted` | Placeholders, hints |
| `danger` | `text-danger` | Errores, gastos excesivos |
| `success` | `text-success` | Confirmaciones, ingresos |
| `warning` | `text-warning` | Advertencias |

---

## 4. Componentes - Guia de Estilos

### 4.1 Botones

```html
<!-- Primary -->
<button class="bg-primary-500 text-content-primary px-4 py-2 rounded-lg
  hover:bg-primary-600 active:bg-primary-700
  shadow-neon-sm hover:shadow-neon-md
  transition-all duration-200">
  Confirmar
</button>

<!-- Ghost -->
<button class="bg-transparent text-primary-500 px-4 py-2 rounded-lg
  border border-border hover:border-primary-500
  hover:bg-surface-subtle
  transition-all duration-200">
  Cancelar
</button>

<!-- Danger -->
<button class="bg-danger/10 text-danger px-4 py-2 rounded-lg
  hover:bg-danger/20
  transition-all duration-200">
  Eliminar
</button>

<!-- Icon button -->
<button class="p-2 rounded-lg text-content-secondary
  hover:text-primary-500 hover:bg-surface-subtle
  transition-all duration-200">
  <icon />
</button>
```

### 4.2 Inputs

```html
<input class="w-full rounded-lg
  bg-surface-raised border border-border
  px-3 py-2 text-sm text-content-primary
  placeholder-content-muted
  focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:shadow-neon-sm
  disabled:bg-surface-base disabled:text-content-muted disabled:cursor-not-allowed
  transition-all duration-200" />
```

### 4.3 Cards

```html
<!-- Card base -->
<div class="bg-surface-raised border border-border rounded-xl p-6">
  ...
</div>

<!-- Card con hover -->
<div class="bg-surface-raised border border-border rounded-xl p-6
  hover:border-primary-500/30 hover:shadow-neon-sm
  transition-all duration-200 cursor-pointer">
  ...
</div>

<!-- Card destacada -->
<div class="bg-surface-raised border border-primary-500/20 rounded-xl p-6
  shadow-neon-sm">
  ...
</div>
```

### 4.4 Modals

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"></div>

<!-- Modal -->
<div class="bg-surface-raised border border-border rounded-2xl
  shadow-neon-lg p-6 z-50">
  ...
</div>
```

### 4.5 Tables

```html
<table class="w-full">
  <thead>
    <tr class="border-b border-border">
      <th class="text-left text-content-muted text-xs uppercase tracking-widest
        font-medium py-3 px-4">
        Columna
      </th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-border-subtle hover:bg-surface-subtle
      transition-colors duration-150">
      <td class="py-3 px-4 text-sm text-content-primary">
        Valor
      </td>
    </tr>
  </tbody>
</table>
```

### 4.6 Badges / Tags

```html
<!-- Default -->
<span class="px-2 py-0.5 rounded-full text-xs font-medium
  bg-surface-subtle text-content-secondary">
  Label
</span>

<!-- Primary -->
<span class="px-2 py-0.5 rounded-full text-xs font-medium
  bg-primary-500/15 text-primary-400">
  Activo
</span>

<!-- Success -->
<span class="px-2 py-0.5 rounded-full text-xs font-medium
  bg-success/15 text-success">
  Pagado
</span>

<!-- Danger -->
<span class="px-2 py-0.5 rounded-full text-xs font-medium
  bg-danger/15 text-danger">
  Vencido
</span>
```

### 4.7 Autocomplete / Select dropdowns

```html
<!-- Dropdown container -->
<div class="bg-surface-overlay border border-border rounded-lg
  shadow-neon-sm overflow-hidden">
  <!-- Option -->
  <button class="w-full text-left px-3 py-2 text-sm text-content-primary
    hover:bg-surface-subtle hover:text-primary-400
    transition-colors duration-150">
    Opcion
  </button>
</div>
```

---

## 5. Spacing y Layout

### 5.1 Escala de Spacing (Tailwind defaults)

Usar la escala de Tailwind sin modificaciones:

| Token | Valor | Uso |
|-------|-------|-----|
| `gap-1` / `p-1` | 4px | Espacio minimo entre iconos y texto |
| `gap-1.5` | 6px | Espacio label-input |
| `gap-2` | 8px | Espacio entre elementos inline |
| `gap-3` | 12px | Padding interno de inputs |
| `gap-4` | 16px | Espacio entre campos de formulario |
| `gap-6` | 24px | Padding de cards |
| `gap-8` | 32px | Separacion entre secciones |
| `gap-12` | 48px | Separacion entre bloques de pagina |

### 5.2 Border Radius

| Elemento | Clase |
|----------|-------|
| Inputs, badges | `rounded-lg` (8px) |
| Cards | `rounded-xl` (12px) |
| Modals | `rounded-2xl` (16px) |
| Avatars, pills | `rounded-full` |

---

## 6. Efectos Neon - Reglas de Uso

El glow neon es lo que da identidad al sistema. Usarlo con moderacion:

| Contexto | Efecto | Clase |
|----------|--------|-------|
| Focus de inputs | Glow sutil | `focus:shadow-neon-sm` |
| Hover de cards | Glow medio | `hover:shadow-neon-sm` |
| Card destacada | Glow permanente suave | `shadow-neon-sm` |
| Modal | Glow amplio | `shadow-neon-lg` |
| Boton primary hover | Glow medio | `hover:shadow-neon-md` |
| **NO usar en** | Texto, iconos normales, listas | - |

**Regla:** Si un elemento no es interactivo ni destacado, no lleva glow.

---

## 7. Migracion desde el Sistema Actual

### 7.1 Mapeo de colores actuales a nuevos tokens

| Actual | Nuevo | Nota |
|--------|-------|------|
| `text-slate-900` | `text-content-primary` | Texto principal |
| `text-slate-500` | `text-content-secondary` | Texto secundario |
| `text-slate-400` | `text-content-secondary` | Texto de soporte |
| `text-indigo-600` | `text-primary-500` | Color de acento |
| `text-indigo-900` | `text-primary-800` | Acento oscuro |
| `text-gray-700` | `text-content-primary` | Labels |
| `text-gray-400` | `text-content-muted` | Placeholders |
| `text-red-500` | `text-danger` | Errores |
| `text-emerald-500` | `text-success` | Exito |
| `text-blue-600` | `text-info` | Info, links |
| `bg-white` | `bg-surface-raised` | Cards, inputs |
| `bg-gray-50` | `bg-surface-base` | Fondo disabled |
| `border-gray-300` | `border-border` | Bordes generales |
| `border-gray-200` | `border-border-subtle` | Bordes sutiles |
| `bg-indigo-600` | `bg-primary-500` | Elementos activos |
| `focus:border-blue-500` | `focus:border-primary-500` | Focus state |
| `focus:ring-blue-500` | `focus:ring-primary-500` | Focus ring |
| `hover:bg-blue-50` | `hover:bg-surface-subtle` | Hover sutil |

### 7.2 Componentes a actualizar (en orden)

1. `tailwind.config.js` - Agregar tokens
2. `styles.css` / layout global - Aplicar `bg-surface-base` como fondo y `text-content-primary` como texto base
3. `TitleComponent` - Reemplazar colorClasses con nuevos tokens
4. `TextComponent` - Reemplazar colorClasses con nuevos tokens
5. `InputComponent` - Migrar clases del template
6. `ButtonComponent` - Migrar clases del template
7. `AutocompleteComponent` - Migrar clases del template
8. `SelectComponent` - Migrar clases del template
9. `DateSelectorComponent` - Migrar clases del template
10. `TextAreaComponent` - Migrar clases del template
11. `CheckboxComponent` - Migrar clases del template
12. Componentes de pagina (budgets, detail, etc.)
