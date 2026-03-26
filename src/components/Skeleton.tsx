import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height, borderRadius = 8, style }: SkeletonProps) {
  const { colors } = useTheme();
  const pulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.border,
          opacity: pulse,
        },
        style,
      ]}
    />
  );
}

export function SkeletonCard() {
  const { colors } = useTheme();
  return (
    <View style={[skeletonStyles.card, { backgroundColor: colors.surface }]}>
      <View style={skeletonStyles.cardHeader}>
        <Skeleton width={40} height={40} borderRadius={20} />
        <View style={skeletonStyles.cardTitleArea}>
          <Skeleton width="70%" height={16} />
          <Skeleton width="40%" height={12} style={{ marginTop: 6 }} />
        </View>
      </View>
      <Skeleton width="100%" height={12} style={{ marginTop: 12 }} />
      <Skeleton width="80%" height={12} style={{ marginTop: 6 }} />
    </View>
  );
}

export function SkeletonList({ count = 4 }: { count?: number }) {
  return (
    <View style={skeletonStyles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

export function SkeletonDrugDetail() {
  const { colors } = useTheme();
  return (
    <View style={[skeletonStyles.detailContainer, { backgroundColor: colors.background }]}>
      <View style={[skeletonStyles.detailHeader, { backgroundColor: colors.primary }]}>
        <Skeleton width="50%" height={14} borderRadius={4} />
        <Skeleton width="80%" height={24} borderRadius={4} style={{ marginTop: 8 }} />
        <Skeleton width="60%" height={14} borderRadius={4} style={{ marginTop: 6 }} />
      </View>
      <View style={skeletonStyles.detailBody}>
        <View style={[skeletonStyles.card, { backgroundColor: colors.surface }]}>
          <Skeleton width="40%" height={18} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <Skeleton width={60} height={24} borderRadius={12} />
            <Skeleton width={50} height={24} borderRadius={12} />
            <Skeleton width={55} height={24} borderRadius={12} />
          </View>
          <Skeleton width="100%" height={50} borderRadius={8} style={{ marginTop: 12 }} />
        </View>
        <SkeletonCard />
        <SkeletonCard />
      </View>
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 18,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleArea: {
    flex: 1,
    marginLeft: 12,
  },
  list: {
    paddingTop: 12,
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  detailBody: {
    paddingTop: 16,
  },
});
