// ============================================================
// SearchScreen — full-text pathology search
// ============================================================

import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useTheme } from '../context/ThemeContext';
import { useTabBar } from '../context/TabBarContext';
import { usePremium } from '../context/PremiumContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { usePathologySearch } from '../hooks/usePathologySearch';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { SearchBar } from '../components/SearchBar';
import { PathologyCard } from '../components/PathologyCard';
import { neuCard } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import type { ThemeColors } from '../utils/colors';
import type { RootStackParamList, TabParamList, SearchResult } from '../types';
import { FlashList } from '@shopify/flash-list';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Busqueda'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function SearchScreen() {
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { query, setQuery, results, clearSearch } = usePathologySearch();
  const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();
  const navigation = useNavigation<NavigationProp>();
  const { handleScroll } = useTabBar();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, rs);

  const handlePathologyPress = useCallback(
    (pathologyId: string, isPremiumPathology: boolean) => {
      if (query.trim().length >= 2) addSearch(query.trim());
      if (isPremiumPathology && !isPremium) {
        navigation.navigate('PremiumScreen');
      } else {
        navigation.navigate('PathologyDetail', { pathologyId });
      }
    },
    [navigation, isPremium, query, addSearch],
  );

  const handleHistoryPress = useCallback(
    (q: string) => {
      setQuery(q);
    },
    [setQuery],
  );

  const renderResult = useCallback(
    ({ item }: { item: SearchResult }) => (
      <PathologyCard
        pathology={item.pathology}
        onPress={() => handlePathologyPress(item.pathology.id, item.pathology.isPremium)}
        isFavorite={isFavorite(item.pathology.id)}
        onToggleFavorite={() => toggleFavorite(item.pathology.id)}
        isPremiumLocked={item.pathology.isPremium && !isPremium}
      />
    ),
    [handlePathologyPress, isFavorite, toggleFavorite, isPremium],
  );

  const showHistory = query.length === 0 && history.length > 0;
  const showEmpty = query.length >= 2 && results.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + rs.space(SPACING.lg) }]}
      >
        <Text style={styles.headerTitle}>Buscar Patologias</Text>
        <Text style={styles.headerSubtitle}>
          {results.length > 0
            ? `${results.length} resultado${results.length !== 1 ? 's' : ''}`
            : 'Busca por nombre, signos, sintomas o sistema'}
        </Text>
      </LinearGradient>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={clearSearch}
        placeholder="Buscar patología..."
        autoFocus={false}
      />

      {showHistory && (
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Búsquedas recientes</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={[styles.historyClear, { color: colors.primary }]}>Limpiar</Text>
            </TouchableOpacity>
          </View>
          {history.map(h => (
            <TouchableOpacity
              key={h.query}
              style={styles.historyRow}
              onPress={() => handleHistoryPress(h.query)}
            >
              <MaterialCommunityIcons name="history" size={16} color={colors.textLight} />
              <Text style={styles.historyText} numberOfLines={1}>{h.query}</Text>
              <TouchableOpacity onPress={() => removeSearch(h.query)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <MaterialCommunityIcons name="close" size={16} color={colors.textLight} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {showEmpty && (
        <View style={styles.emptyState}>
          <View style={{
            width: 72, height: 72, borderRadius: 36,
            backgroundColor: colors.textLight + '15', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12,
          }}>
            <MaterialCommunityIcons name="text-search" size={32} color={colors.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>Sin resultados</Text>
          <Text style={styles.emptyText}>No se encontraron patologías para "{query}"</Text>
        </View>
      )}

      {results.length > 0 && (
        <FlashList
          data={results}
          renderItem={renderResult}
          keyExtractor={item => item.pathology.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + rs.space(80) }]}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingBottom: rs.space(SPACING.xl),
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
      fontSize: rs.font(13),
      fontWeight: '500',
      color: colors.gradientText,
      opacity: 0.82,
    },
    listContent: {
      paddingHorizontal: rs.space(SPACING.md),
      paddingTop: rs.space(SPACING.sm),
    },
    historySection: {
      paddingHorizontal: rs.space(SPACING.lg),
      paddingTop: rs.space(SPACING.md),
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: rs.space(SPACING.sm),
    },
    historyTitle: {
      fontSize: rs.font(14),
      fontWeight: '700',
      color: colors.text,
    },
    historyClear: {
      fontSize: rs.font(13),
      fontWeight: '600',
    },
    historyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: rs.space(SPACING.sm),
      gap: rs.space(SPACING.sm),
    },
    historyText: {
      flex: 1,
      fontSize: rs.font(14),
      color: colors.textSecondary,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: rs.space(SPACING.xxxl),
      gap: rs.space(SPACING.sm),
    },
    emptyTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.text,
    },
    emptyText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
