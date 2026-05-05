// ============================================================
// LabValuesScreen — reference lab values with ranges and nursing implications
// ============================================================

import React, {
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react';
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

import type { RootStackParamList, LabValue, LabCategory, LabRange } from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { LAB_COLORS, type ThemeColors } from '../utils/colors';
import { neuCard } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import { SearchBar } from '../components/SearchBar';
import { PremiumGate } from '../components/PremiumGate';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'LabValues'>;

const CATEGORY_LABELS: Record<LabCategory, string> = {
  hematologia: 'Hematología',
  bioquimica: 'Bioquímica',
  coagulacion: 'Coagulación',
  hepatico: 'Hepático',
  renal: 'Renal',
  cardiaco: 'Cardíaco',
  endocrino: 'Endocrino',
  orina: 'Orina',
  gasometria: 'Gasometría',
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

interface RangeRowProps {
  label: string;
  range: LabRange;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function RangeRow({ label, range, colors, rs }: RangeRowProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(4) }}>
      <Text style={{ fontSize: rs.font(12), color: colors.textLight, width: rs.space(100) }}>
        {label}
      </Text>
      <Text style={{ fontSize: rs.font(13), fontWeight: '600', color: colors.text }}>
        {range.min} – {range.max}
        <Text style={{ fontSize: rs.font(11), fontWeight: '400', color: colors.textSecondary }}>
          {' '}{range.unidad}
        </Text>
      </Text>
    </View>
  );
}

interface LabCardProps {
  item: LabValue;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function LabCard({ item, colors, rs }: LabCardProps) {
  const [expanded, setExpanded] = useState(false);
  const catColor = LAB_COLORS[item.categoria] ?? colors.primary;

  return (
    <View style={[neuCard(colors), { marginHorizontal: rs.space(SPACING.lg), marginBottom: rs.space(SPACING.md), padding: rs.space(SPACING.lg) }]}>
      {/* Header row */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: rs.space(SPACING.sm) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: rs.font(16), fontWeight: '700', color: colors.text, marginBottom: rs.space(2) }}>
            {item.nombre}
          </Text>
          {/* Category pill */}
          <View style={{
            alignSelf: 'flex-start',
            backgroundColor: catColor + '18',
            borderRadius: RADIUS.pill,
            paddingHorizontal: rs.space(SPACING.sm),
            paddingVertical: rs.space(2),
            borderWidth: 1,
            borderColor: catColor + '40',
          }}>
            <Text style={{ fontSize: rs.font(11), fontWeight: '600', color: catColor }}>
              {CATEGORY_LABELS[item.categoria]}
            </Text>
          </View>
        </View>
        {/* Abbreviation badge */}
        <View style={{
          backgroundColor: catColor + '15',
          borderRadius: RADIUS.sm,
          paddingHorizontal: rs.space(SPACING.sm),
          paddingVertical: rs.space(4),
          borderWidth: 1,
          borderColor: catColor + '35',
          minWidth: rs.space(52),
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: rs.font(13), fontWeight: '800', color: catColor }}>
            {item.abreviatura}
          </Text>
        </View>
      </View>

      {/* Ranges */}
      <View style={{ marginBottom: rs.space(SPACING.sm) }}>
        <Text style={{ fontSize: rs.font(12), fontWeight: '700', color: colors.textSecondary, marginBottom: rs.space(6), textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Rangos de Referencia
        </Text>
        {item.rangos.adulto && (
          <RangeRow label="Adulto" range={item.rangos.adulto} colors={colors} rs={rs} />
        )}
        {item.rangos.adultoHombre && (
          <RangeRow label="Hombre" range={item.rangos.adultoHombre} colors={colors} rs={rs} />
        )}
        {item.rangos.adultoMujer && (
          <RangeRow label="Mujer" range={item.rangos.adultoMujer} colors={colors} rs={rs} />
        )}
        {item.rangos.pediatrico && (
          <RangeRow label="Pediátrico" range={item.rangos.pediatrico} colors={colors} rs={rs} />
        )}
      </View>

      {/* Significado alto / bajo */}
      {item.significadoAlto ? (
        <View style={{
          backgroundColor: colors.error + '10',
          borderLeftWidth: 3,
          borderLeftColor: colors.error,
          borderRadius: RADIUS.xs,
          padding: rs.space(SPACING.sm),
          marginBottom: rs.space(6),
        }}>
          <Text style={{ fontSize: rs.font(11), fontWeight: '700', color: colors.error, marginBottom: rs.space(2) }}>
            ELEVADO
          </Text>
          <Text style={{ fontSize: rs.font(12), color: colors.text, lineHeight: 18 }}>
            {item.significadoAlto}
          </Text>
        </View>
      ) : null}

      {item.significadoBajo ? (
        <View style={{
          backgroundColor: colors.info + '10',
          borderLeftWidth: 3,
          borderLeftColor: colors.info,
          borderRadius: RADIUS.xs,
          padding: rs.space(SPACING.sm),
          marginBottom: rs.space(SPACING.sm),
        }}>
          <Text style={{ fontSize: rs.font(11), fontWeight: '700', color: colors.info, marginBottom: rs.space(2) }}>
            BAJO
          </Text>
          <Text style={{ fontSize: rs.font(12), color: colors.text, lineHeight: 18 }}>
            {item.significadoBajo}
          </Text>
        </View>
      ) : null}

      {/* Nursing implications — collapsible */}
      {item.implicacionesEnfermeria && item.implicacionesEnfermeria.length > 0 && (
        <TouchableOpacity
          onPress={() => setExpanded(prev => !prev)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: rs.space(SPACING.sm),
            borderTopWidth: 0.5,
            borderTopColor: colors.border,
            marginTop: rs.space(4),
          }}
        >
          <MaterialCommunityIcons
            name="stethoscope"
            size={16}
            color={colors.nursing}
            style={{ marginRight: rs.space(6) }}
          />
          <Text style={{ flex: 1, fontSize: rs.font(13), fontWeight: '600', color: colors.nursing }}>
            Implicaciones de Enfermería
          </Text>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      )}

      {expanded && (
        <View style={{ marginTop: rs.space(4) }}>
          {item.implicacionesEnfermeria.map((imp, idx) => (
            <View key={idx} style={{ flexDirection: 'row', marginBottom: rs.space(6) }}>
              <Text style={{ fontSize: rs.font(12), color: colors.nursing, marginRight: rs.space(6), marginTop: 2 }}>
                •
              </Text>
              <Text style={{ flex: 1, fontSize: rs.font(13), color: colors.text, lineHeight: 19 }}>
                {imp}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────

export function LabValuesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { labValues } = usePathologyData();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<LabCategory | 'todos'>('todos');

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Valores de Laboratorio' });
  }, [navigation]);

  const categories = useMemo<('todos' | LabCategory)[]>(() => {
    const unique = new Set<LabCategory>();
    labValues.forEach(lv => unique.add(lv.categoria));
    return ['todos', ...Array.from(unique)] as ('todos' | LabCategory)[];
  }, [labValues]);

  const filtered = useMemo(() => {
    let result = labValues;
    if (activeCategory !== 'todos') {
      result = result.filter(lv => lv.categoria === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        lv =>
          lv.nombre.toLowerCase().includes(q) ||
          lv.abreviatura.toLowerCase().includes(q) ||
          lv.categoria.toLowerCase().includes(q),
      );
    }
    return result;
  }, [labValues, activeCategory, query]);

  const renderItem = useCallback(
    ({ item }: { item: LabValue }) => (
      <LabCard item={item} colors={colors} rs={rs} />
    ),
    [colors, rs],
  );

  const keyExtractor = useCallback((item: LabValue) => item.id, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Buscar valor de laboratorio..."
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
            const catColor = cat === 'todos' ? colors.primary : (LAB_COLORS[cat] ?? colors.primary);
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.75}
                style={[
                  styles.chip,
                  isActive
                    ? { backgroundColor: catColor, borderColor: catColor }
                    : { backgroundColor: colors.neuSurface, borderColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: isActive ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {cat === 'todos' ? 'Todos' : CATEGORY_LABELS[cat as LabCategory]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.resultCount}>
          {filtered.length} valor{filtered.length !== 1 ? 'es' : ''}
        </Text>
      </View>
    ),
    [query, categories, activeCategory, filtered.length, colors, styles],
  );

  return (
    <PremiumGate feature="Valores de Laboratorio">
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
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
              <MaterialCommunityIcons name="flask-empty-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyText}>No se encontraron valores</Text>
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
