import { ThemeTokens } from './presets';

export const generateCSS = (tokens: ThemeTokens): string => {
  return `:root {
  /* Colors */
  --color-primary: ${tokens.colors.primary};
  --color-primary-dark: ${tokens.colors.primaryDark};
  --color-primary-light: ${tokens.colors.primaryLight};
  --color-secondary: ${tokens.colors.secondary};
  --color-success: ${tokens.colors.success};
  --color-warning: ${tokens.colors.warning};
  --color-error: ${tokens.colors.error};
  --color-background: ${tokens.colors.background};
  --color-surface: ${tokens.colors.surface};
  --color-text: ${tokens.colors.text};
  --color-text-secondary: ${tokens.colors.textSecondary};
  --color-border: ${tokens.colors.border};

  /* Typography */
  --font-family: ${tokens.typography.fontFamily};
  --font-family-mono: ${tokens.typography.fontFamilyMono};
  --font-size-base: ${tokens.typography.fontSizeBase}px;
  --font-size-small: ${tokens.typography.fontSizeSmall}px;
  --font-size-large: ${tokens.typography.fontSizeLarge}px;
  --font-size-h1: ${tokens.typography.fontSizeH1}px;
  --font-size-h2: ${tokens.typography.fontSizeH2}px;
  --font-size-h3: ${tokens.typography.fontSizeH3}px;
  --font-weight-normal: ${tokens.typography.fontWeightNormal};
  --font-weight-medium: ${tokens.typography.fontWeightMedium};
  --font-weight-bold: ${tokens.typography.fontWeightBold};
  --line-height: ${tokens.typography.lineHeight};

  /* Spacing */
  --spacing-xs: ${tokens.spacing.xs}px;
  --spacing-sm: ${tokens.spacing.sm}px;
  --spacing-md: ${tokens.spacing.md}px;
  --spacing-lg: ${tokens.spacing.lg}px;
  --spacing-xl: ${tokens.spacing.xl}px;
  --spacing-xxl: ${tokens.spacing.xxl}px;

  /* Border Radius */
  --radius-sm: ${tokens.borderRadius.sm}px;
  --radius-md: ${tokens.borderRadius.md}px;
  --radius-lg: ${tokens.borderRadius.lg}px;
  --radius-full: ${tokens.borderRadius.full}px;

  /* Shadows */
  --shadow-sm: ${tokens.shadows.sm};
  --shadow-md: ${tokens.shadows.md};
  --shadow-lg: ${tokens.shadows.lg};
}`;
};

export const generateJSON = (tokens: ThemeTokens): string => {
  return JSON.stringify(tokens, null, 2);
};

export const generateTypeScript = (tokens: ThemeTokens): string => {
  return `import { ThemeTokens } from './types';

export const theme: ThemeTokens = ${JSON.stringify(tokens, null, 2)};

export default theme;`;
};

export const generateFigmaTokens = (tokens: ThemeTokens): string => {
  const figmaTokens = {
    colors: Object.entries(tokens.colors).reduce((acc, [key, value]) => {
      acc[key] = {
        value,
        type: 'color',
      };
      return acc;
    }, {} as Record<string, { value: string; type: string }>),
    typography: {
      fontFamily: {
        value: tokens.typography.fontFamily,
        type: 'fontFamily',
      },
      fontFamilyMono: {
        value: tokens.typography.fontFamilyMono,
        type: 'fontFamily',
      },
      fontSize: {
        base: {
          value: tokens.typography.fontSizeBase,
          type: 'fontSize',
        },
        small: {
          value: tokens.typography.fontSizeSmall,
          type: 'fontSize',
        },
        large: {
          value: tokens.typography.fontSizeLarge,
          type: 'fontSize',
        },
        h1: {
          value: tokens.typography.fontSizeH1,
          type: 'fontSize',
        },
        h2: {
          value: tokens.typography.fontSizeH2,
          type: 'fontSize',
        },
        h3: {
          value: tokens.typography.fontSizeH3,
          type: 'fontSize',
        },
      },
      fontWeight: {
        normal: {
          value: tokens.typography.fontWeightNormal,
          type: 'fontWeight',
        },
        medium: {
          value: tokens.typography.fontWeightMedium,
          type: 'fontWeight',
        },
        bold: {
          value: tokens.typography.fontWeightBold,
          type: 'fontWeight',
        },
      },
      lineHeight: {
        value: tokens.typography.lineHeight,
        type: 'lineHeight',
      },
    },
    spacing: Object.entries(tokens.spacing).reduce((acc, [key, value]) => {
      acc[key] = {
        value: `${value}px`,
        type: 'spacing',
      };
      return acc;
    }, {} as Record<string, { value: string; type: string }>),
    borderRadius: Object.entries(tokens.borderRadius).reduce((acc, [key, value]) => {
      acc[key] = {
        value: `${value}px`,
        type: 'borderRadius',
      };
      return acc;
    }, {} as Record<string, { value: string; type: string }>),
    shadows: Object.entries(tokens.shadows).reduce((acc, [key, value]) => {
      acc[key] = {
        value,
        type: 'boxShadow',
      };
      return acc;
    }, {} as Record<string, { value: string; type: string }>),
  };

  return JSON.stringify(figmaTokens, null, 2);
};

export const generateSCSS = (tokens: ThemeTokens): string => {
  return `// Colors
$color-primary: ${tokens.colors.primary};
$color-primary-dark: ${tokens.colors.primaryDark};
$color-primary-light: ${tokens.colors.primaryLight};
$color-secondary: ${tokens.colors.secondary};
$color-success: ${tokens.colors.success};
$color-warning: ${tokens.colors.warning};
$color-error: ${tokens.colors.error};
$color-background: ${tokens.colors.background};
$color-surface: ${tokens.colors.surface};
$color-text: ${tokens.colors.text};
$color-text-secondary: ${tokens.colors.textSecondary};
$color-border: ${tokens.colors.border};

// Typography
$font-family: ${tokens.typography.fontFamily};
$font-family-mono: ${tokens.typography.fontFamilyMono};
$font-size-base: ${tokens.typography.fontSizeBase}px;
$font-size-small: ${tokens.typography.fontSizeSmall}px;
$font-size-large: ${tokens.typography.fontSizeLarge}px;
$font-size-h1: ${tokens.typography.fontSizeH1}px;
$font-size-h2: ${tokens.typography.fontSizeH2}px;
$font-size-h3: ${tokens.typography.fontSizeH3}px;
$font-weight-normal: ${tokens.typography.fontWeightNormal};
$font-weight-medium: ${tokens.typography.fontWeightMedium};
$font-weight-bold: ${tokens.typography.fontWeightBold};
$line-height: ${tokens.typography.lineHeight};

// Spacing
$spacing-xs: ${tokens.spacing.xs}px;
$spacing-sm: ${tokens.spacing.sm}px;
$spacing-md: ${tokens.spacing.md}px;
$spacing-lg: ${tokens.spacing.lg}px;
$spacing-xl: ${tokens.spacing.xl}px;
$spacing-xxl: ${tokens.spacing.xxl}px;

// Border Radius
$radius-sm: ${tokens.borderRadius.sm}px;
$radius-md: ${tokens.borderRadius.md}px;
$radius-lg: ${tokens.borderRadius.lg}px;
$radius-full: ${tokens.borderRadius.full}px;

// Shadows
$shadow-sm: ${tokens.shadows.sm};
$shadow-md: ${tokens.shadows.md};
$shadow-lg: ${tokens.shadows.lg};
`;
};
