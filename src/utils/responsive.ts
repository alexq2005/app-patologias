// ============================================================
// Responsive scaling — adapts UI to screen width
// Base: 360dp (common Android phone width)
// ============================================================

import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

const BASE_WIDTH = 360;
const MAX_SCALE = 1.5;
const MAX_SPACE_SCALE = 1.3;
const TABLET_BREAKPOINT = 600;

export interface ResponsiveScale {
  /** Scaled font size — smooth curve (power 0.75), min clamp to original × 0.85 */
  font: (size: number) => number;
  /** Scaled spacing — linear, capped at 1.3× */
  space: (size: number) => number;
  /** Raw scale factor (screenWidth / 360) */
  scale: number;
  /** Current screen width in dp */
  width: number;
  /** Dynamic column count for grids */
  cols: (minItemWidth: number) => number;
  /** True if screen width >= 600dp */
  isTablet: boolean;
}

export function useResponsiveScale(): ResponsiveScale {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const rawScale = width / BASE_WIDTH;
    const isTablet = width >= TABLET_BREAKPOINT;

    const font = (size: number): number => {
      const factor = Math.pow(rawScale, 0.75);
      const scaled = size * Math.min(factor, MAX_SCALE);
      // Never go below 85% of original size
      const clamped = Math.max(scaled, size * 0.85);
      // Round to nearest 0.5 for crisp rendering
      return Math.round(clamped * 2) / 2;
    };

    const space = (size: number): number => {
      const factor = Math.min(rawScale, MAX_SPACE_SCALE);
      return Math.round(size * factor);
    };

    const cols = (minItemWidth: number): number => {
      const available = isTablet ? Math.min(width, 680) : width;
      return Math.max(1, Math.floor(available / minItemWidth));
    };

    return { font, space, scale: rawScale, width, cols, isTablet };
  }, [width]);
}
