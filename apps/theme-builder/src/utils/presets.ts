export interface ThemeTokens {
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontFamilyMono: string;
    fontSizeBase: number;
    fontSizeSmall: number;
    fontSizeLarge: number;
    fontSizeH1: number;
    fontSizeH2: number;
    fontSizeH3: number;
    fontWeightNormal: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    lineHeight: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export const defaultTheme: ThemeTokens = {
  colors: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    primaryLight: '#60a5fa',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    fontSizeBase: 16,
    fontSizeSmall: 14,
    fontSizeLarge: 18,
    fontSizeH1: 36,
    fontSizeH2: 30,
    fontSizeH3: 24,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    lineHeight: 1.5,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

export const darkTheme: ThemeTokens = {
  colors: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    primaryLight: '#60a5fa',
    secondary: '#a78bfa',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#9ca3af',
    border: '#374151',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    fontSizeBase: 16,
    fontSizeSmall: 14,
    fontSizeLarge: 18,
    fontSizeH1: 36,
    fontSizeH2: 30,
    fontSizeH3: 24,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    lineHeight: 1.5,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  },
};

export const oceanTheme: ThemeTokens = {
  colors: {
    primary: '#0891b2',
    primaryDark: '#0e7490',
    primaryLight: '#06b6d4',
    secondary: '#14b8a6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#f0fdfa',
    surface: '#ccfbf1',
    text: '#134e4a',
    textSecondary: '#5f8581',
    border: '#99f6e4',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    fontSizeBase: 16,
    fontSizeSmall: 14,
    fontSizeLarge: 18,
    fontSizeH1: 36,
    fontSizeH2: 30,
    fontSizeH3: 24,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    lineHeight: 1.5,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(6, 182, 212, 0.1)',
    md: '0 4px 6px -1px rgba(6, 182, 212, 0.2), 0 2px 4px -1px rgba(6, 182, 212, 0.1)',
    lg: '0 10px 15px -3px rgba(6, 182, 212, 0.2), 0 4px 6px -2px rgba(6, 182, 212, 0.1)',
  },
};

export const forestTheme: ThemeTokens = {
  colors: {
    primary: '#16a34a',
    primaryDark: '#15803d',
    primaryLight: '#22c55e',
    secondary: '#84cc16',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#f7fee7',
    surface: '#ecfccb',
    text: '#14532d',
    textSecondary: '#4d7c5a',
    border: '#d9f99d',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    fontSizeBase: 16,
    fontSizeSmall: 14,
    fontSizeLarge: 18,
    fontSizeH1: 36,
    fontSizeH2: 30,
    fontSizeH3: 24,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    lineHeight: 1.5,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(34, 197, 94, 0.1)',
    md: '0 4px 6px -1px rgba(34, 197, 94, 0.2), 0 2px 4px -1px rgba(34, 197, 94, 0.1)',
    lg: '0 10px 15px -3px rgba(34, 197, 94, 0.2), 0 4px 6px -2px rgba(34, 197, 94, 0.1)',
  },
};

export const sunsetTheme: ThemeTokens = {
  colors: {
    primary: '#f97316',
    primaryDark: '#ea580c',
    primaryLight: '#fb923c',
    secondary: '#dc2626',
    success: '#10b981',
    warning: '#fbbf24',
    error: '#dc2626',
    background: '#fff7ed',
    surface: '#ffedd5',
    text: '#7c2d12',
    textSecondary: '#9a5a3a',
    border: '#fed7aa',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    fontSizeBase: 16,
    fontSizeSmall: 14,
    fontSizeLarge: 18,
    fontSizeH1: 36,
    fontSizeH2: 30,
    fontSizeH3: 24,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    lineHeight: 1.5,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(249, 115, 22, 0.1)',
    md: '0 4px 6px -1px rgba(249, 115, 22, 0.2), 0 2px 4px -1px rgba(249, 115, 22, 0.1)',
    lg: '0 10px 15px -3px rgba(249, 115, 22, 0.2), 0 4px 6px -2px rgba(249, 115, 22, 0.1)',
  },
};

export const presetThemes = {
  default: { name: 'Default', tokens: defaultTheme },
  dark: { name: 'Dark Mode', tokens: darkTheme },
  ocean: { name: 'Ocean', tokens: oceanTheme },
  forest: { name: 'Forest', tokens: forestTheme },
  sunset: { name: 'Sunset', tokens: sunsetTheme },
};
