// ============================================================
// SystemsScreen — body systems grid (2 columns)
// ============================================================

import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useTheme } from '../context/ThemeContext';
import { useTabBar } from '../context/TabBarContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { usePathologyData } from '../hooks/usePathologyData';
import { BodySystemCard } from '../components/BodySystemCard';
import type { ThemeColors } from '../utils/colors';
import type { BodySystem, RootStackParamList, TabParamList } from '../types';
import { SPACING } from '../utils/spacing';

// ─────────────────────────────────────────────
// Navigation type
// ─────────────────────────────────────────────

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Sistemas'>,
  NativeStackNavigationProp<RootStackParamList>
>;

// ─────────────────────────────────────────────
// useFadeIn — simple opacity entrance animation
// ─────────────────────────────────────────────

function useFadeIn(duration = 400, delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY, duration, delay]);

  return { opacity, translateY };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function SystemsScreen() {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { bodySystems, getSystemPathologyCount } = usePathologyData();
  const { handleScroll } = useTabBar();
  const styles = createStyles(colors, rs);

  const { opacity, translateY } = useFadeIn(380, 60);

  const handleSystemPress = useCallback(
    (system: BodySystem) => {
      navigation.navigate('SystemPathologies', {
        systemId: system.id,
        systemName: system.nombre,
        systemColor: system.color,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: BodySystem }) => (
      <BodySystemCard
        system={item}
        onPress={handleSystemPress}
        pathologyCount={getSystemPathologyCount(item.id)}
      />
    ),
    [handleSystemPress, getSystemPathologyCount],
  );

  const keyExtractor = useCallback((item: BodySystem) => item.id, []);

  const ListHeaderComponent = (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>
        Selecciona un sistema para explorar sus patologías
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Gradient header */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + rs.space(SPACING.lg) }]}
      >
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Text style={styles.headerTitle}>Sistemas Corporales</Text>
          <Text style={styles.headerSubtitle}>{bodySystems.length} sistemas del cuerpo humano</Text>
        </Animated.View>
      </LinearGradient>

      {/* Grid */}
      <FlatList
        data={bodySystems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + rs.space(80) },
        ]}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        removeClippedSubviews={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles factory
// ─────────────────────────────────────────────

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingBottom: rs.space(SPACING.xxl),
      paddingHorizontal: rs.space(SPACING.xxl),
    },
    headerTitle: {
      fontSize: rs.font(26),
      fontWeight: '800',
      color: colors.gradientText,
      letterSpacing: -0.5,
      marginBottom: rs.space(4),
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      fontWeight: '500',
      color: colors.gradientText,
      opacity: 0.82,
    },
    listContent: {
      paddingTop: rs.space(SPACING.lg),
      paddingHorizontal: rs.space(SPACING.sm),
    },
    listHeader: {
      paddingHorizontal: rs.space(SPACING.md),
      paddingBottom: rs.space(SPACING.sm),
    },
    listHeaderText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
