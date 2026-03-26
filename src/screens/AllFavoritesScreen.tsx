// ============================================================
// AllFavoritesScreen — full list of favorited pathologies
// ============================================================

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { PathologyCard } from '../components/PathologyCard';
import { SPACING } from '../utils/spacing';
import type { ThemeColors } from '../utils/colors';
import type { Pathology, RootStackParamList } from '../types';

// ─────────────────────────────────────────────
// useFadeIn
// ─────────────────────────────────────────────

function useFadeIn(duration = 400, delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, duration, delay]);

  return { opacity, translateY };
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'AllFavorites'>;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function AllFavoritesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { favorites, toggleFavorite, isFavorite } = useFavoritesContext();
  const { getPathologyById, getBodySystemById } = usePathologyData();

  const styles = createStyles(colors, rs);
  const { opacity, translateY } = useFadeIn(380, 40);

  // Resolve pathology objects from favorite IDs
  const favoritePathologies = useMemo((): Pathology[] => {
    return favorites
      .map(id => getPathologyById(id))
      .filter((p): p is Pathology => p !== undefined);
  }, [favorites, getPathologyById]);

  const handlePress = useCallback((pathology: Pathology) => {
    navigation.navigate('PathologyDetail', {
      pathologyId: pathology.id,
      pathologyName: pathology.nombre,
    });
  }, [navigation]);

  const keyExtractor = useCallback((item: Pathology) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Pathology }) => {
      const system = getBodySystemById(item.bodySystemId);
      return (
        <PathologyCard
          pathology={item}
          onPress={() => handlePress(item)}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
          bodySystemName={system?.nombre}
        />
      );
    },
    [handlePress, isFavorite, toggleFavorite, getBodySystemById],
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="heart-off-outline" size={rs.font(64)} color={colors.textLight} />
      <Text style={styles.emptyTitle}>Sin favoritos</Text>
      <Text style={styles.emptySubtitle}>
        Agrega patologias a favoritos tocando el icono de corazon en cualquier ficha.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + rs.space(SPACING.lg) }]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={rs.font(22)} color={colors.gradientText} />
        </TouchableOpacity>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Text style={styles.headerTitle}>Mis Favoritos</Text>
          <Text style={styles.headerSubtitle}>
            {favoritePathologies.length}{' '}
            {favoritePathologies.length === 1 ? 'patologia guardada' : 'patologias guardadas'}
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* List */}
      <FlatList
        data={favoritePathologies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + rs.space(SPACING.xl) },
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        removeClippedSubviews={false}
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
    backButton: {
      marginBottom: rs.space(SPACING.md),
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
      paddingTop: rs.space(SPACING.md),
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: rs.space(SPACING.xxxl),
      paddingTop: rs.space(80),
      gap: rs.space(SPACING.md),
    },
    emptyTitle: {
      fontSize: rs.font(20),
      fontWeight: '700',
      color: colors.textSecondary,
    },
    emptySubtitle: {
      fontSize: rs.font(14),
      color: colors.textLight,
      textAlign: 'center',
      lineHeight: rs.font(21),
    },
  });
