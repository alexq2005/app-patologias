// ============================================================
// TabBarContext — controls tab bar visibility (hide on scroll)
// ============================================================

import React, { createContext, useContext, useRef, useCallback } from 'react';
import { Animated, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';

interface TabBarContextValue {
  translateY: Animated.Value;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  show: () => void;
}

const TabBarCtx = createContext<TabBarContextValue | null>(null);

export function TabBarProvider({ children }: { children: React.ReactNode }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffsetY = useRef(0);
  const isHidden = useRef(false);

  const show = useCallback(() => {
    if (isHidden.current) {
      isHidden.current = false;
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        speed: 20,
        bounciness: 3,
      }).start();
    }
  }, [translateY]);

  const hide = useCallback(() => {
    if (!isHidden.current) {
      isHidden.current = true;
      Animated.spring(translateY, {
        toValue: 100,
        useNativeDriver: true,
        speed: 20,
        bounciness: 3,
      }).start();
    }
  }, [translateY]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const diff = currentY - lastOffsetY.current;

      // Only react to significant scroll (> 8px) and not at the very top
      if (currentY < 50) {
        show();
      } else if (diff > 8) {
        hide();
      } else if (diff < -8) {
        show();
      }

      lastOffsetY.current = currentY;
    },
    [show, hide],
  );

  return (
    <TabBarCtx.Provider value={{ translateY, handleScroll, show }}>
      {children}
    </TabBarCtx.Provider>
  );
}

export function useTabBar() {
  const ctx = useContext(TabBarCtx);
  if (!ctx) throw new Error('useTabBar must be used within TabBarProvider');
  return ctx;
}
