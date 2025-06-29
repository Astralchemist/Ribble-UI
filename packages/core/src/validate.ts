import semantic from './tokens/color/semantic.json';
import light from './tokens/color/light.json';
import dark from './tokens/color/dark.json';
import typography from './tokens/typography.json';
import spacing from './tokens/spacing.json';
import radius from './tokens/radius.json';
import shadow from './tokens/shadow.json';
import animation from './tokens/animation.json';
import breakpoint from './tokens/breakpoint.json';
import zIndex from './tokens/z-index.json';
import {
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  RadiusTokens,
  ShadowTokens,
  AnimationTokens,
  BreakpointTokens,
  ZIndexTokens,
} from './types';

export function validateColorTokens(tokens: any): tokens is ColorTokens {
  return (
    typeof tokens.primary === 'string' &&
    typeof tokens.secondary === 'string' &&
    typeof tokens.success === 'string' &&
    typeof tokens.warning === 'string' &&
    typeof tokens.error === 'string' &&
    typeof tokens.neutral === 'string'
  );
}

export function validatePaletteTokens(tokens: any): boolean {
  return (
    typeof tokens.blue?.['600'] === 'string' &&
    typeof tokens.purple?.['500'] === 'string' &&
    typeof tokens.green?.['500'] === 'string' &&
    typeof tokens.yellow?.['500'] === 'string' &&
    typeof tokens.red?.['600'] === 'string' &&
    typeof tokens.gray?.['500'] === 'string'
  );
}

export function validateTypographyTokens(tokens: any): tokens is TypographyTokens {
  return (
    typeof tokens.fontFamily === 'object' &&
    typeof tokens.fontSize === 'object' &&
    typeof tokens.lineHeight === 'object' &&
    typeof tokens.fontWeight === 'object'
  );
}

export function validateSpacingTokens(tokens: any): tokens is SpacingTokens {
  return typeof tokens['0'] === 'string' && typeof tokens['8'] === 'string';
}

export function validateRadiusTokens(tokens: any): tokens is RadiusTokens {
  return typeof tokens.md === 'string' && typeof tokens.full === 'string';
}

export function validateShadowTokens(tokens: any): tokens is ShadowTokens {
  return typeof tokens.md === 'string' && typeof tokens.xl === 'string';
}

export function validateAnimationTokens(tokens: any): tokens is AnimationTokens {
  return typeof tokens.duration === 'object' && typeof tokens.easing === 'object';
}

export function validateBreakpointTokens(tokens: any): tokens is BreakpointTokens {
  return typeof tokens.xs === 'string' && typeof tokens.xl === 'string';
}

export function validateZIndexTokens(tokens: any): tokens is ZIndexTokens {
  return typeof tokens.base === 'number' && typeof tokens.tooltip === 'number';
}

// Validate all tokens and theme completeness
if (!validateColorTokens(semantic)) throw new Error('Invalid semantic color tokens');
if (!validatePaletteTokens(light)) throw new Error('Invalid light palette tokens');
if (!validatePaletteTokens(dark)) throw new Error('Invalid dark palette tokens');
if (!validateTypographyTokens(typography)) throw new Error('Invalid typography tokens');
if (!validateSpacingTokens(spacing)) throw new Error('Invalid spacing tokens');
if (!validateRadiusTokens(radius)) throw new Error('Invalid radius tokens');
if (!validateShadowTokens(shadow)) throw new Error('Invalid shadow tokens');
if (!validateAnimationTokens(animation)) throw new Error('Invalid animation tokens');
if (!validateBreakpointTokens(breakpoint)) throw new Error('Invalid breakpoint tokens');
if (!validateZIndexTokens(zIndex)) throw new Error('Invalid z-index tokens');
