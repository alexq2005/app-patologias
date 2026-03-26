// ============================================================
// Neumorphism utilities — reusable ViewStyle generators
// Android: elevation + dual borders (no iOS shadowColor support)
// ============================================================

import { ViewStyle } from 'react-native';
import type { ThemeColors } from './colors';
import { RADIUS } from './spacing';

/** Standard card — elevation 3, radius 18, dual borders */
export function neuCard(colors: ThemeColors): ViewStyle {
  return {
    backgroundColor: colors.neuSurface,
    borderRadius: RADIUS.lg,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 0.5,
    borderTopColor: colors.neuBorderLight,
    borderLeftColor: colors.neuBorderLight,
    borderBottomColor: colors.neuBorderDark,
    borderRightColor: colors.neuBorderDark,
    overflow: 'visible' as const,
  };
}

/** Subtle card — elevation 1, radius 16 */
export function neuCardSubtle(colors: ThemeColors): ViewStyle {
  return {
    backgroundColor: colors.neuSurface,
    borderRadius: RADIUS.md + 2,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    borderWidth: 0.5,
    borderTopColor: colors.neuBorderLight,
    borderLeftColor: colors.neuBorderLight,
    borderBottomColor: colors.neuBorderDark,
    borderRightColor: colors.neuBorderDark,
    overflow: 'visible' as const,
  };
}

/** Floating elements — elevation 8, radius 24 */
export function neuElevated(colors: ThemeColors): ViewStyle {
  return {
    backgroundColor: colors.neuSurface,
    borderRadius: RADIUS.xl,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 0.5,
    borderTopColor: colors.neuBorderLight,
    borderLeftColor: colors.neuBorderLight,
    borderBottomColor: colors.neuBorderDark,
    borderRightColor: colors.neuBorderDark,
    overflow: 'visible' as const,
  };
}

/** Inset/sunken — inputs, search fields (inverted borders, darker bg) */
export function neuInset(colors: ThemeColors): ViewStyle {
  return {
    backgroundColor: colors.neuInsetBg,
    borderRadius: RADIUS.md,
    elevation: 0,
    borderWidth: 1,
    borderTopColor: colors.neuInsetBorderTop,
    borderLeftColor: colors.neuInsetBorderTop,
    borderBottomColor: colors.neuInsetBorderBottom,
    borderRightColor: colors.neuInsetBorderBottom,
    overflow: 'visible' as const,
  };
}

/** Pressed state — flattened, lower elevation, darker bg */
export function neuCardPressed(colors: ThemeColors): ViewStyle {
  return {
    backgroundColor: colors.neuSurfacePressed,
    borderRadius: RADIUS.lg,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    borderWidth: 0.5,
    borderTopColor: colors.neuBorderDark,
    borderLeftColor: colors.neuBorderDark,
    borderBottomColor: colors.neuBorderLight,
    borderRightColor: colors.neuBorderLight,
    overflow: 'visible' as const,
  };
}

/** Pills/badges/chips — small rounded elements */
export function neuPill(colors: ThemeColors): ViewStyle {
  return {
    backgroundColor: colors.neuSurface,
    borderRadius: RADIUS.pill,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.06,
    shadowRadius: 1.5,
    borderWidth: 0.5,
    borderTopColor: colors.neuBorderLight,
    borderLeftColor: colors.neuBorderLight,
    borderBottomColor: colors.neuBorderDark,
    borderRightColor: colors.neuBorderDark,
    overflow: 'visible' as const,
  };
}
