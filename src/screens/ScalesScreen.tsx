// ============================================================
// ScalesScreen — clinical scales list (Tab 4)
// ============================================================

import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { useTabBar } from '../context/TabBarContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { usePathologyData } from '../hooks/usePathologyData';
import { SearchBar } from '../components/SearchBar';
import { PremiumGate } from '../components/PremiumGate';
import { neuCard, neuCardSubtle, neuPill } from '../utils/neumorphism';
import { SCALE_COLORS, SCALE_ICONS, type ThemeColors } from '../utils/colors';
import type { ClinicalScale, RootStackParamList, TabParamList } from '../types';
import { SPACING, RADIUS } from '../utils/spacing';

// ─────────────────────────────────────────────
// Navigation type
// ─────────────────────────────────────────────

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Escalas'>,
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
// ScaleCard
// ─────────────────────────────────────────────

interface ScaleCardProps {
  scale: ClinicalScale;
  onPress: (scale: ClinicalScale) => void;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function ScaleCard({ scale, onPress, colors, rs }: ScaleCardProps) {
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const accentColor = SCALE_COLORS[scale.categoria] ?? colors.primary;
  const iconName = SCALE_ICONS[scale.categoria] ?? 'clipboard-pulse-outline';

  return (
    <TouchableOpacity
      style={[styles.scaleCard, { borderLeftColor: accentColor, borderLeftWidth: 4 }]}
      onPress={() => onPress(scale)}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={scale.nombre}
    >
      <View style={styles.scaleCardTop}>
        <View style={[styles.scaleIconWrap, { backgroundColor: accentColor + '18' }]}>
          <MaterialCommunityIcons name={iconName} size={22} color={accentColor} />
        </View>
        <View style={styles.scaleCardCenter}>
          <Text style={styles.scaleName} numberOfLines={1}>{scale.nombre}</Text>
          <Text style={styles.scaleDesc} numberOfLines={2}>{scale.descripcion}</Text>
        </View>
        <View style={[styles.abreviaturaBadge, { backgroundColor: accentColor + '18' }]}>
          <Text style={[styles.abreviaturaText, { color: accentColor }]}>{scale.abreviatura}</Text>
        </View>
      </View>
      <View style={styles.scaleCardBottom}>
        <View style={[styles.categoriaPill, { backgroundColor: accentColor + '15' }]}>
          <Text style={[styles.categoriaText, { color: accentColor }]}>
            {scale.categoria.replace(/_/g, ' ')}
          </Text>
        </View>
        <View style={styles.rangoWrap}>
          <MaterialCommunityIcons name="arrow-right" size={14} color={colors.textLight} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// ScalesScreen
// ─────────────────────────────────────────────

export function ScalesScreen() {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { scales } = usePathologyData();
  const { handleScroll } = useTabBar();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const { opacity, translateY } = useFadeIn(380, 60);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(scales.map(s => s.categoria)));
    return ['Todas', ...cats.sort()];
  }, [scales]);

  // Filtered list
  const filtered = useMemo(() => {
    let result = scales;
    if (selectedCategory !== 'Todas') {
      result = result.filter(s => s.categoria === selectedCategory);
    }
    if (query.trim().length > 0) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        s =>
          s.nombre.toLowerCase().includes(q) ||
          s.abreviatura.toLowerCase().includes(q) ||
          s.descripcion.toLowerCase().includes(q),
      );
    }
    return result;
  }, [scales, selectedCategory, query]);

  const handleScalePress = useCallback(
    (scale: ClinicalScale) => {
      navigation.navigate('ScaleDetail', { scaleId: scale.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ClinicalScale }) => (
      <ScaleCard
        scale={item}
        onPress={handleScalePress}
        colors={colors}
        rs={rs}
      />
    ),
    [handleScalePress, colors, rs],
  );

  const keyExtractor = useCallback((item: ClinicalScale) => item.id, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View>
        {/* Search */}
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Buscar escala clinica..."
        />

        {/* Category filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {categories.map(cat => {
            const isActive = cat === selectedCategory;
            const accentColor =
              cat === 'Todas' ? colors.primary : (SCALE_COLORS[cat] ?? colors.primary);
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.chip,
                  isActive
                    ? { backgroundColor: accentColor, borderColor: accentColor }
                    : { backgroundColor: colors.neuSurface, borderColor: colors.border },
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: isActive ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {cat.replace(/_/g, ' ')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Result count */}
        <Text style={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? 'escala' : 'escalas'}
        </Text>
      </View>
    ),
    [query, categories, selectedCategory, filtered.length, colors, rs, styles],
  );

  const ListFooterComponent = useMemo(
    () => (
      <View style={styles.quickLinksSection}>
        <Text style={styles.quickLinksTitle}>Acceso rapido</Text>
        <View style={styles.quickLinksRow}>
          <TouchableOpacity
            style={[styles.quickLinkCard, { borderLeftColor: '#2563EB', borderLeftWidth: 4 }]}
            onPress={() => navigation.navigate('LabValues')}
            activeOpacity={0.75}
          >
            <MaterialCommunityIcons name="test-tube" size={24} color="#2563EB" />
            <View style={styles.quickLinkText}>
              <Text style={styles.quickLinkName}>Valores de Laboratorio</Text>
              <Text style={styles.quickLinkSub}>Rangos de referencia</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickLinkCard, { borderLeftColor: '#DC2626', borderLeftWidth: 4 }]}
            onPress={() => navigation.navigate('EmergencyProtocols')}
            activeOpacity={0.75}
          >
            <MaterialCommunityIcons name="ambulance" size={24} color="#DC2626" />
            <View style={styles.quickLinkText}>
              <Text style={styles.quickLinkName}>Protocolos de Emergencia</Text>
              <Text style={styles.quickLinkSub}>Actuacion por patologia</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [navigation, colors, styles],
  );

  const EmptyComponent = useMemo(
    () => (
      <View style={styles.emptyWrap}>
        <MaterialCommunityIcons
          name="clipboard-search-outline"
          size={52}
          color={colors.textLight}
        />
        <Text style={styles.emptyText}>No se encontraron escalas</Text>
        <Text style={styles.emptySubText}>Intenta con otra busqueda o categoria</Text>
      </View>
    ),
    [colors, styles],
  );

  return (
    <PremiumGate feature="Escalas Clinicas">
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
            <Text style={styles.headerTitle}>Escalas Clinicas</Text>
            <Text style={styles.headerSubtitle}>
              {scales.length} escalas de valoracion de enfermeria
            </Text>
          </Animated.View>
        </LinearGradient>

        {/* List */}
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + rs.space(SPACING.xl) },
          ]}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={EmptyComponent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          initialNumToRender={12}
          removeClippedSubviews={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
    </PremiumGate>
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
      paddingTop: rs.space(SPACING.sm),
    },
    chipsRow: {
      paddingHorizontal: rs.space(SPACING.lg),
      paddingVertical: rs.space(SPACING.sm),
      gap: rs.space(SPACING.sm),
    },
    chip: {
      paddingHorizontal: rs.space(SPACING.md),
      paddingVertical: rs.space(SPACING.xs + 2),
      borderRadius: RADIUS.pill,
      borderWidth: 1,
    },
    chipText: {
      fontSize: rs.font(12),
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    resultCount: {
      fontSize: rs.font(12),
      color: colors.textLight,
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.xs),
    },
    // Scale card
    scaleCard: {
      marginHorizontal: rs.space(SPACING.lg),
      marginVertical: rs.space(SPACING.xs),
      padding: rs.space(SPACING.md),
      borderRadius: RADIUS.lg,
      ...neuCard(colors),
    },
    scaleCardTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: rs.space(SPACING.sm),
    },
    scaleIconWrap: {
      width: 40,
      height: 40,
      borderRadius: RADIUS.sm,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rs.space(SPACING.sm),
      flexShrink: 0,
    },
    scaleCardCenter: {
      flex: 1,
      marginRight: rs.space(SPACING.sm),
    },
    scaleName: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
      marginBottom: 2,
    },
    scaleDesc: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: rs.font(13) * 1.45,
    },
    abreviaturaBadge: {
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: rs.space(SPACING.xs - 1),
      borderRadius: RADIUS.xs,
      flexShrink: 0,
      alignSelf: 'flex-start',
    },
    abreviaturaText: {
      fontSize: rs.font(11),
      fontWeight: '800',
      letterSpacing: 0.3,
    },
    scaleCardBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoriaPill: {
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: 2,
      borderRadius: RADIUS.pill,
    },
    categoriaText: {
      fontSize: rs.font(11),
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    rangoWrap: {
      padding: rs.space(SPACING.xs),
    },
    // Empty state
    emptyWrap: {
      alignItems: 'center',
      paddingVertical: rs.space(SPACING.xxxl),
    },
    emptyText: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      marginTop: rs.space(SPACING.md),
    },
    emptySubText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      marginTop: rs.space(SPACING.xs),
    },
    // Quick links
    quickLinksSection: {
      marginTop: rs.space(SPACING.xxl),
      paddingHorizontal: rs.space(SPACING.lg),
    },
    quickLinksTitle: {
      fontSize: rs.font(13),
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: rs.space(SPACING.sm),
    },
    quickLinksRow: {
      gap: rs.space(SPACING.sm),
    },
    quickLinkCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: rs.space(SPACING.md),
      borderRadius: RADIUS.lg,
      marginBottom: rs.space(SPACING.xs),
      ...neuCardSubtle(colors),
    },
    quickLinkText: {
      flex: 1,
      marginLeft: rs.space(SPACING.md),
    },
    quickLinkName: {
      fontSize: rs.font(14),
      fontWeight: '700',
      color: colors.text,
    },
    quickLinkSub: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      marginTop: 1,
    },
  });
