// ============================================================
// Typography scale — standardized text styles
// ============================================================

import { TextStyle } from 'react-native';
import type { ResponsiveScale } from './responsive';

export const TYPOGRAPHY = {
  display1: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  } as TextStyle,
  display2: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  } as TextStyle,
  heading1: {
    fontSize: 20,
    fontWeight: '700',
  } as TextStyle,
  heading2: {
    fontSize: 18,
    fontWeight: '700',
  } as TextStyle,
  heading3: {
    fontSize: 16,
    fontWeight: '700',
  } as TextStyle,
  body1: {
    fontSize: 15,
    fontWeight: '400',
  } as TextStyle,
  body2: {
    fontSize: 14,
    fontWeight: '400',
  } as TextStyle,
  body3: {
    fontSize: 13,
    fontWeight: '400',
  } as TextStyle,
  label1: {
    fontSize: 14,
    fontWeight: '600',
  } as TextStyle,
  label2: {
    fontSize: 13,
    fontWeight: '600',
  } as TextStyle,
  label3: {
    fontSize: 12,
    fontWeight: '600',
  } as TextStyle,
  caption1: {
    fontSize: 12,
    fontWeight: '500',
  } as TextStyle,
  caption2: {
    fontSize: 11,
    fontWeight: '600',
  } as TextStyle,
  caption3: {
    fontSize: 10,
    fontWeight: '600',
  } as TextStyle,
} as const;

/** Returns TYPOGRAPHY tokens with font sizes scaled by rs.font() */
export function scaledTypography(rs: ResponsiveScale) {
  const result = {} as Record<keyof typeof TYPOGRAPHY, TextStyle>;
  for (const key of Object.keys(TYPOGRAPHY) as (keyof typeof TYPOGRAPHY)[]) {
    const token = TYPOGRAPHY[key];
    result[key] = { ...token, fontSize: rs.font(token.fontSize as number) };
  }
  return result;
}
