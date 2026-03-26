import { useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

/** Simple fade-in on mount */
export function useFadeIn(duration: number = 400, delay: number = 0) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [opacity, duration, delay]);

  return opacity;
}

/** Staggered entrance for a list of items */
export function useStaggeredEntrance(count: number, staggerDelay: number = 80) {
  const anims = useRef<Animated.Value[]>([]);

  if (anims.current.length !== count) {
    anims.current = Array.from({ length: count }, () => new Animated.Value(0));
  }

  useEffect(() => {
    const animations = anims.current.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 350,
        delay: i * staggerDelay,
        useNativeDriver: true,
      }),
    );
    Animated.stagger(staggerDelay, animations).start();
  }, [count, staggerDelay]);

  return anims.current;
}

/** Press scale animation for cards */
export function useCardPressAnimation() {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scale]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scale]);

  return { scale, onPressIn, onPressOut };
}

/** Neumorphic press — softer spring with scale to 0.97 */
export function useNeuPressAnimation() {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 30,
      bounciness: 3,
    }).start();
  }, [scale]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 3,
    }).start();
  }, [scale]);

  return { scale, onPressIn, onPressOut };
}

/** Header shrink on scroll — returns interpolated values */
export function useScrollHeaderAnimation(scrollY: Animated.Value) {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [140, 80],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return { headerHeight, titleScale, titleOpacity };
}
