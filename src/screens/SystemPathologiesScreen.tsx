// ============================================================
// SystemPathologiesScreen — all pathologies within a body system
// ============================================================

import React, { useState, useMemo, useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import type { RootStackParamList, Pathology, BodySystemId } from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { getSystemImage } from '../utils/systemImages';
import { PathologyCard } from '../components/PathologyCard';
import { SearchBar } from '../components/SearchBar';
import type { ThemeColors } from '../utils/colors';
import { FlashList } from '@shopify/flash-list';

// ── Types ─────────────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'SystemPathologies'>;

// ── Helpers ───────────────────────────────────────────────────

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function matchesQuery(pathology: Pathology, query: string): boolean {
  if (!query) return true;
  const q = normalizeText(query);
  return (
    normalizeText(pathology.nombre).includes(q) ||
    normalizeText(pathology.definicion).includes(q) ||
    pathology.factoresRiesgo.some(f => normalizeText(f).includes(q)) ||
    pathology.signosYSintomas.signos.some(s => normalizeText(s).includes(q)) ||
    pathology.signosYSintomas.sintomas.some(s => normalizeText(s).includes(q))
  );
}

// ── Screen ────────────────────────────────────────────────────

export function SystemPathologiesScreen({ navigation, route }: Props) {
  const { systemId, systemName, systemColor } = route.params;

  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const { isPremium } = usePremium();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { getPathologiesBySystem } = usePathologyData();

  const [searchQuery, setSearchQuery] = useState('');

  // Set navigation header options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: systemName,
      headerStyle: { backgroundColor: systemColor },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: '700' as const },
    });
  }, [navigation, systemName, systemColor]);

  // All pathologies for this system, sorted: free first, then premium
  const allPathologies = useMemo(() => {
    const raw = getPathologiesBySystem(systemId);
    return [
      ...raw.filter(p => !p.isPremium),
      ...raw.filter(p => p.isPremium),
    ];
  }, [getPathologiesBySystem, systemId]);

  // Filtered list based on search query
  const filteredPathologies = useMemo(() => {
    if (!searchQuery.trim()) return allPathologies;
    return allPathologies.filter(p => matchesQuery(p, searchQuery.trim()));
  }, [allPathologies, searchQuery]);

  const handleClearSearch = useCallback(() => setSearchQuery(''), []);

  const handleCardPress = useCallback(
    (pathology: Pathology) => {
      const isLocked = pathology.isPremium && !isPremium;
      if (isLocked) {
        navigation.navigate('PremiumScreen');
      } else {
        navigation.navigate('PathologyDetail', { pathologyId: pathology.id, pathologyName: pathology.nombre });
      }
    },
    [navigation, isPremium],
  );

  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  // ── Render items ──────────────────────────────────────────

  const renderItem = useCallback(
    ({ item }: { item: Pathology }) => {
      const isLocked = item.isPremium && !isPremium;
      return (
        <PathologyCard
          pathology={item}
          onPress={() => handleCardPress(item)}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
          isPremiumLocked={isLocked}
        />
      );
    },
    [isPremium, isFavorite, toggleFavorite, handleCardPress],
  );

  const keyExtractor = useCallback((item: Pathology) => item.id, []);

  // ── List header: SearchBar + count ────────────────────────

  const ListHeader = useMemo(
    () => (
      <View style={styles.listHeader}>
        {/* System image banner */}
        <View style={styles.bannerWrap}>
          <Image
            source={getSystemImage(systemId as BodySystemId)}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={[systemColor + 'AA', systemColor + '30', 'transparent']}
            style={styles.bannerGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
          placeholder={`Buscar en ${systemName}...`}
        />
        <View style={styles.countRow}>
          <View style={[styles.countDot, { backgroundColor: systemColor }]} />
          <Text style={styles.countText}>
            {filteredPathologies.length}{' '}
            {filteredPathologies.length === 1 ? 'patología' : 'patologías'}
            {searchQuery.trim() ? ' encontradas' : ' en este sistema'}
          </Text>
        </View>
      </View>
    ),
     
    [searchQuery, filteredPathologies.length, systemColor, systemId, systemName, styles, handleClearSearch],
  );

  // ── Empty state ───────────────────────────────────────────

  const ListEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="magnify-remove-outline"
          size={rs.font(56)}
          color={colors.textLight}
        />
        <Text style={styles.emptyTitle}>Sin resultados</Text>
        <Text style={styles.emptySubtitle}>
          {searchQuery.trim()
            ? `No se encontraron patologías que coincidan con "${searchQuery.trim()}"`
            : 'No hay patologías en este sistema'}
        </Text>
      </View>
    ),
    [searchQuery, colors, rs, styles],
  );

  // ── Render ────────────────────────────────────────────────

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={systemColor}
        translucent={false}
      />
      <FlashList
        data={filteredPathologies}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        removeClippedSubviews={Platform.OS === 'android'}
      />
    </View>
  );
}

// ── Styles factory ────────────────────────────────────────────

function createStyles(colors: ThemeColors, rs: ResponsiveScale) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.neuBackground,
    },
    listContent: {
      paddingBottom: rs.space(32),
    },
    listHeader: {
      paddingTop: 0,
    },
    bannerWrap: {
      height: rs.space(120),
      overflow: 'hidden',
      position: 'relative',
    },
    bannerImage: {
      width: '100%',
      height: '100%',
    },
    bannerGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60%',
    },
    countRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rs.space(20),
      paddingBottom: rs.space(8),
      gap: rs.space(6),
    },
    countDot: {
      width: rs.space(8),
      height: rs.space(8),
      borderRadius: rs.space(4),
    },
    countText: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      fontWeight: '500',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: rs.space(40),
      paddingTop: rs.space(80),
      gap: rs.space(12),
    },
    emptyTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.text,
      marginTop: rs.space(8),
    },
    emptySubtitle: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: rs.font(21),
    },
  });
}
