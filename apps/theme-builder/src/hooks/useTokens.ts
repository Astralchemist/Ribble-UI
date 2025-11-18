import { useState, useEffect, useCallback } from 'react';
import { ThemeTokens, defaultTheme } from '../utils/presets';

const STORAGE_KEY = 'ribble-ui-theme-tokens';

export const useTokens = () => {
  const [tokens, setTokens] = useState<ThemeTokens>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored tokens:', e);
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  // Save to localStorage whenever tokens change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    applyTokensToDOM(tokens);
  }, [tokens]);

  const updateColor = useCallback((key: keyof ThemeTokens['colors'], value: string) => {
    setTokens((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
  }, []);

  const updateTypography = useCallback(
    (key: keyof ThemeTokens['typography'], value: string | number) => {
      setTokens((prev) => ({
        ...prev,
        typography: {
          ...prev.typography,
          [key]: value,
        },
      }));
    },
    []
  );

  const updateSpacing = useCallback((key: keyof ThemeTokens['spacing'], value: number) => {
    setTokens((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [key]: value,
      },
    }));
  }, []);

  const updateBorderRadius = useCallback(
    (key: keyof ThemeTokens['borderRadius'], value: number) => {
      setTokens((prev) => ({
        ...prev,
        borderRadius: {
          ...prev.borderRadius,
          [key]: value,
        },
      }));
    },
    []
  );

  const updateShadow = useCallback((key: keyof ThemeTokens['shadows'], value: string) => {
    setTokens((prev) => ({
      ...prev,
      shadows: {
        ...prev.shadows,
        [key]: value,
      },
    }));
  }, []);

  const loadTheme = useCallback((newTokens: ThemeTokens) => {
    setTokens(newTokens);
  }, []);

  const resetTheme = useCallback(() => {
    setTokens(defaultTheme);
  }, []);

  const importTheme = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      // Validate the structure
      if (
        parsed.colors &&
        parsed.typography &&
        parsed.spacing &&
        parsed.borderRadius &&
        parsed.shadows
      ) {
        setTokens(parsed);
        return { success: true, message: 'Theme imported successfully!' };
      } else {
        return { success: false, message: 'Invalid theme structure' };
      }
    } catch (e) {
      return { success: false, message: 'Failed to parse JSON: ' + (e as Error).message };
    }
  }, []);

  return {
    tokens,
    updateColor,
    updateTypography,
    updateSpacing,
    updateBorderRadius,
    updateShadow,
    loadTheme,
    resetTheme,
    importTheme,
  };
};

// Apply tokens to DOM as CSS variables for live preview
const applyTokensToDOM = (tokens: ThemeTokens) => {
  const root = document.documentElement;

  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${camelToKebab(key)}`, value);
  });

  // Typography
  root.style.setProperty('--font-family', tokens.typography.fontFamily);
  root.style.setProperty('--font-family-mono', tokens.typography.fontFamilyMono);
  root.style.setProperty('--font-size-base', `${tokens.typography.fontSizeBase}px`);
  root.style.setProperty('--font-size-small', `${tokens.typography.fontSizeSmall}px`);
  root.style.setProperty('--font-size-large', `${tokens.typography.fontSizeLarge}px`);
  root.style.setProperty('--font-size-h1', `${tokens.typography.fontSizeH1}px`);
  root.style.setProperty('--font-size-h2', `${tokens.typography.fontSizeH2}px`);
  root.style.setProperty('--font-size-h3', `${tokens.typography.fontSizeH3}px`);
  root.style.setProperty('--font-weight-normal', `${tokens.typography.fontWeightNormal}`);
  root.style.setProperty('--font-weight-medium', `${tokens.typography.fontWeightMedium}`);
  root.style.setProperty('--font-weight-bold', `${tokens.typography.fontWeightBold}`);
  root.style.setProperty('--line-height', `${tokens.typography.lineHeight}`);

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, `${value}px`);
  });

  // Border Radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, `${value}px`);
  });

  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
};

const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};
