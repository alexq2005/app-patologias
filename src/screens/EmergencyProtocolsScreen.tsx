// ============================================================
// EmergencyProtocolsScreen — list of emergency protocols with category filter
// ============================================================

import React, { useState, useMemo, useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type {
  RootStackParamList,
  EmergencyProtocol,
  ProtocolCategory,
  ProtocolPriority,
} from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import {
  PROTOCOL_COLORS,
  PROTOCOL_ICONS,
  type ThemeColors,
} from '../utils/colors';
import { neuCard } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import { SearchBar } from '../components/SearchBar';
import { PremiumGate } from '../components/PremiumGate';

// ─────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'EmergencyProtocols'>;

const CATEGORY_LABELS: Record<ProtocolCategory, string> = {
  cardiaco: 'Cardíaco',
  respiratorio: 'Respiratorio',
  neurologico: 'Neurológico',
  metabolico: 'Metabólico',
  sepsis: 'Sepsis',
  trauma: 'Trauma',
  obstetrico: 'Obstétrico',
  pediatrico: 'Pediátrico',
  otro: 'Otro',
};

const PRIORITY_COLORS: Record<ProtocolPriority, string> = {
  critico: '#DC2626',
  urgente: '#EA580C',
  emergente: '#F59E0B',
};

const PRIORITY_LABELS: Record<ProtocolPriority, string> = {
  critico: 'CRÍTICO',
  urgente: 'URGENTE',
  emergente: 'EMERGENTE',
};

// ─────────────────────────────────────────────
// ProtocolCard
// ─────────────────────────────────────────────

interface ProtocolCardProps {
  item: EmergencyProtocol;
  colors: ThemeColors;
  rs: ResponsiveScale;
  onPress: (protocol: EmergencyProtocol) => void;
}

function ProtocolCard({ item, colors, rs, onPress }: ProtocolCardProps) {
  const catColor = PROTOCOL_COLORS[item.categoria] ?? colors.primary;
  const catIcon = PROTOCOL_ICONS[item.categoria] ?? 'hospital-building';
  const priorityColor = PRIORITY_COLORS[item.prioridad];

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.75}
      style={[
        neuCard(colors),
        {
          marginHorizontal: rs.space(SPACING.lg),
          marginBottom: rs.space(SPACING.md),
          padding: rs.space(SPACING.lg),
        },
      ]}
    >
      {/* Top row: name + priority badge */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: rs.space(SPACING.sm),
        }}
      >
        <View style={{ flex: 1, marginRight: rs.space(SPACING.sm) }}>
          <Text
            style={{
              fontSize: rs.font(16),
              fontWeight: '700',
              color: colors.text,
              marginBottom: rs.space(2),
            }}
          >
            {item.nombre}
          </Text>
          {item.abreviatura ? (
            <Text
              style={{
                fontSize: rs.font(12),
                fontWeight: '600',
                color: colors.textSecondary,
              }}
            >
              {item.abreviatura}
            </Text>
          ) : null}
        </View>
        {/* Priority badge */}
        <View
          style={{
            backgroundColor: priorityColor + '18',
            borderRadius: RADIUS.sm,
            paddingHorizontal: rs.space(SPACING.sm),
            paddingVertical: rs.space(4),
            borderWidth: 1,
            borderColor: priorityColor + '45',
          }}
        >
          <Text
            style={{
              fontSize: rs.font(10),
              fontWeight: '800',
              color: priorityColor,
              letterSpacing: 0.5,
            }}
          >
            {PRIORITY_LABELS[item.prioridad]}
          </Text>
        </View>
      </View>

      {/* Category pill + icon */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: rs.space(SPACING.sm),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: catColor + '15',
            borderRadius: RADIUS.pill,
            paddingHorizontal: rs.space(SPACING.sm),
            paddingVertical: rs.space(3),
            borderWidth: 1,
            borderColor: catColor + '35',
            gap: rs.space(4),
          }}
        >
          <MaterialCommunityIcons name={catIcon} size={13} color={catColor} />
          <Text
            style={{
              fontSize: rs.font(12),
              fontWeight: '600',
              color: catColor,
            }}
          >
            {CATEGORY_LABELS[item.categoria]}
          </Text>
        </View>
      </View>

      {/* Description — 2-line clamp */}
      <Text
        numberOfLines={2}
        style={{
          fontSize: rs.font(13),
          color: colors.textSecondary,
          lineHeight: 19,
          marginBottom: rs.space(SPACING.sm),
        }}
      >
        {item.descripcion}
      </Text>

      {/* Footer: red flags count + arrow */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
          paddingTop: rs.space(SPACING.sm),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: rs.space(6),
          }}
        >
          <MaterialCommunityIcons
            name="flag-outline"
            size={14}
            color={colors.error}
          />
          <Text
            style={{
              fontSize: rs.font(12),
              color: colors.error,
              fontWeight: '600',
            }}
          >
            {item.banderasRojas.length} señal
            {item.banderasRojas.length !== 1 ? 'es' : ''} de alarma
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color={colors.textLight}
        />
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────

export function EmergencyProtocolsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { protocols } = usePathologyData();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<
    ProtocolCategory | 'todos'
  >('todos');

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Protocolos de Emergencia' });
  }, [navigation]);

  const categories = useMemo<('todos' | ProtocolCategory)[]>(() => {
    const unique = new Set<ProtocolCategory>();
    protocols.forEach(p => unique.add(p.categoria));
    return ['todos', ...Array.from(unique)] as ('todos' | ProtocolCategory)[];
  }, [protocols]);

  const filtered = useMemo(() => {
    let result = protocols;
    if (activeCategory !== 'todos') {
      result = result.filter(p => p.categoria === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        p =>
          p.nombre.toLowerCase().includes(q) ||
          (p.abreviatura ?? '').toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q),
      );
    }
    return result;
  }, [protocols, activeCategory, query]);

  const handlePress = useCallback(
    (protocol: EmergencyProtocol) => {
      navigation.navigate('ProtocolDetail', { protocolId: protocol.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: EmergencyProtocol }) => (
      <ProtocolCard item={item} colors={colors} rs={rs} onPress={handlePress} />
    ),
    [colors, rs, handlePress],
  );

  const keyExtractor = useCallback((item: EmergencyProtocol) => item.id, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Buscar protocolo de emergencia..."
        />
        {/* Category filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
          style={styles.chipsScroll}
        >
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const catColor =
              cat === 'todos'
                ? colors.primary
                : PROTOCOL_COLORS[cat] ?? colors.primary;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.75}
                style={[
                  styles.chip,
                  isActive
                    ? { backgroundColor: catColor, borderColor: catColor }
                    : {
                        backgroundColor: colors.neuSurface,
                        borderColor: colors.border,
                      },
                ]}
              >
                {cat !== 'todos' && (
                  <MaterialCommunityIcons
                    name={PROTOCOL_ICONS[cat] ?? 'hospital-building'}
                    size={13}
                    color={isActive ? '#FFFFFF' : colors.textSecondary}
                    style={{ marginRight: rs.space(4) }}
                  />
                )}
                <Text
                  style={[
                    styles.chipText,
                    { color: isActive ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {cat === 'todos'
                    ? 'Todos'
                    : CATEGORY_LABELS[cat as ProtocolCategory]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.resultCount}>
          {filtered.length} protocolo{filtered.length !== 1 ? 's' : ''}
        </Text>
      </View>
    ),
    [query, categories, activeCategory, filtered.length, colors, rs, styles],
  );

  return (
    <PremiumGate feature="Protocolos de Emergencia">
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + rs.space(SPACING.xl) },
          ]}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="hospital-building"
                size={48}
                color={colors.textLight}
              />
              <Text style={styles.emptyText}>No se encontraron protocolos</Text>
            </View>
          }
        />
      </View>
    </PremiumGate>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingTop: rs.space(SPACING.sm),
    },
    chipsScroll: {
      marginBottom: rs.space(SPACING.sm),
    },
    chipsContainer: {
      paddingHorizontal: rs.space(SPACING.lg),
      gap: rs.space(SPACING.sm),
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rs.space(SPACING.md),
      paddingVertical: rs.space(7),
      borderRadius: RADIUS.pill,
      borderWidth: 1,
    },
    chipText: {
      fontSize: rs.font(13),
      fontWeight: '600',
    },
    resultCount: {
      fontSize: rs.font(12),
      color: colors.textLight,
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.sm),
    },
    emptyContainer: {
      alignItems: 'center',
      paddingTop: rs.space(60),
      gap: rs.space(SPACING.md),
    },
    emptyText: {
      fontSize: rs.font(15),
      color: colors.textSecondary,
    },
  });
