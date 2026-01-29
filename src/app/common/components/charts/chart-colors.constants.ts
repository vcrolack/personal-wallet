/**
 * Paleta de colores para gráficos, alineada con los tokens del design system.
 *
 * Los valores hex corresponden a los definidos en tailwind.config.js
 * para mantener coherencia visual entre charts (canvas/SVG) y el UI.
 */
export const CHART_COLORS = {
  primary500: '#8b5cf6',
  primary400: '#9333ea',
  primary300: '#ae60ff',
  primary200: '#c996ff',

  neonPurple: '#bf5af2',
  neonBlue: '#5e5ce6',

  success: '#30d158',
  warning: '#ffd60a',
  danger: '#ff453a',
  info: '#5e5ce6',

  surfaceSubtle: '#232334',
  contentMuted: '#5c5873',
} as const;

/** Secuencia de colores para series de datos múltiples */
export const CHART_SERIES_PALETTE = [
  CHART_COLORS.primary500,
  CHART_COLORS.primary300,
  CHART_COLORS.danger,
  CHART_COLORS.warning,
  CHART_COLORS.success,
  CHART_COLORS.neonBlue,
  CHART_COLORS.surfaceSubtle,
] as const;
