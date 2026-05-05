// ============================================================
// NandaScreen — NANDA-NIC-NOC taxonomy browser
// Aggregates all unique NANDA diagnoses from all pathologies
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
  StyleSheet,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type {
  RootStackParamList,
  NandaDiagnosis,
  NicIntervention,
  NocResult,
} from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { type ThemeColors } from '../utils/colors';
import { neuCard } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import { SearchBar } from '../components/SearchBar';
import { PremiumGate } from '../components/PremiumGate';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'NandaScreen'>;

interface NandaEntry {
  nanda: NandaDiagnosis;
  nics: NicIntervention[];
  nocs: NocResult[];
  pathologyNames: string[];
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

interface BulletListProps {
  items: string[];
  color: string;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function BulletList({ items, color, colors, rs }: BulletListProps) {
  return (
    <View>
      {items.map((item, idx) => (
        <View key={idx} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: rs.space(4) }}>
          <Text style={{ fontSize: rs.font(13), color, marginRight: rs.space(6), marginTop: 1 }}>
            •
          </Text>
          <Text style={{ flex: 1, fontSize: rs.font(13), color: colors.text, lineHeight: 19 }}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

interface NicCardProps {
  nic: NicIntervention;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function NicCard({ nic, colors, rs }: NicCardProps) {
  return (
    <View style={{
      backgroundColor: colors.secondary + '0D',
      borderRadius: RADIUS.sm,
      padding: rs.space(SPACING.md),
      borderWidth: 1,
      borderColor: colors.secondary + '25',
      marginBottom: rs.space(SPACING.sm),
      borderLeftWidth: 3,
      borderLeftColor: colors.secondary,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(SPACING.sm), gap: rs.space(SPACING.sm) }}>
        <View style={{
          backgroundColor: colors.secondary + '20',
          borderRadius: RADIUS.xs,
          paddingHorizontal: rs.space(6),
          paddingVertical: rs.space(2),
        }}>
          <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.secondary }}>
            {nic.codigo}
          </Text>
        </View>
        <Text style={{ flex: 1, fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
          {nic.nombre}
        </Text>
      </View>
      {nic.actividades.slice(0, 3).map((act, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: rs.space(3) }}>
          <Text style={{ fontSize: rs.font(11), color: colors.secondary, marginRight: rs.space(5) }}>–</Text>
          <Text style={{ flex: 1, fontSize: rs.font(12), color: colors.textSecondary, lineHeight: 17 }}>
            {act}
          </Text>
        </View>
      ))}
      {nic.actividades.length > 3 && (
        <Text style={{ fontSize: rs.font(11), color: colors.textLight, marginTop: rs.space(2) }}>
          +{nic.actividades.length - 3} actividades más
        </Text>
      )}
    </View>
  );
}

interface NocCardProps {
  noc: NocResult;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function NocCard({ noc, colors, rs }: NocCardProps) {
  return (
    <View style={{
      backgroundColor: colors.info + '0D',
      borderRadius: RADIUS.sm,
      padding: rs.space(SPACING.md),
      borderWidth: 1,
      borderColor: colors.info + '25',
      marginBottom: rs.space(SPACING.sm),
      borderLeftWidth: 3,
      borderLeftColor: colors.info,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(SPACING.sm), gap: rs.space(SPACING.sm) }}>
        <View style={{
          backgroundColor: colors.info + '20',
          borderRadius: RADIUS.xs,
          paddingHorizontal: rs.space(6),
          paddingVertical: rs.space(2),
        }}>
          <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.info }}>
            {noc.codigo}
          </Text>
        </View>
        <Text style={{ flex: 1, fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
          {noc.nombre}
        </Text>
      </View>
      {noc.escala && (
        <Text style={{ fontSize: rs.font(11), color: colors.textSecondary, marginBottom: rs.space(4), fontStyle: 'italic' }}>
          Escala: {noc.escala}
        </Text>
      )}
      {noc.indicadores.slice(0, 3).map((ind, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: rs.space(3) }}>
          <Text style={{ fontSize: rs.font(11), color: colors.info, marginRight: rs.space(5) }}>–</Text>
          <Text style={{ flex: 1, fontSize: rs.font(12), color: colors.textSecondary, lineHeight: 17 }}>
            {ind}
          </Text>
        </View>
      ))}
      {noc.indicadores.length > 3 && (
        <Text style={{ fontSize: rs.font(11), color: colors.textLight, marginTop: rs.space(2) }}>
          +{noc.indicadores.length - 3} indicadores más
        </Text>
      )}
    </View>
  );
}

interface NandaCardProps {
  entry: NandaEntry;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function NandaCard({ entry, colors, rs }: NandaCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { nanda, nics, nocs, pathologyNames } = entry;

  return (
    <View style={[neuCard(colors), {
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.md),
      overflow: 'visible',
    }]}>
      {/* Header — always visible */}
      <TouchableOpacity
        onPress={() => setExpanded(prev => !prev)}
        activeOpacity={0.75}
        style={{ padding: rs.space(SPACING.lg) }}
      >
        {/* Code badge + nombre */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: rs.space(SPACING.sm) }}>
          <View style={{
            backgroundColor: colors.primary + '18',
            borderRadius: RADIUS.sm,
            paddingHorizontal: rs.space(SPACING.sm),
            paddingVertical: rs.space(3),
            marginRight: rs.space(SPACING.sm),
            borderWidth: 1,
            borderColor: colors.primary + '35',
            flexShrink: 0,
          }}>
            <Text style={{ fontSize: rs.font(12), fontWeight: '800', color: colors.primary }}>
              {nanda.codigo}
            </Text>
          </View>
          <Text style={{ flex: 1, fontSize: rs.font(15), fontWeight: '700', color: colors.text, lineHeight: 21 }}>
            {nanda.nombre}
          </Text>
        </View>

        {/* Definicion */}
        <Text
          numberOfLines={expanded ? undefined : 2}
          style={{ fontSize: rs.font(13), color: colors.textSecondary, lineHeight: 19, marginBottom: rs.space(SPACING.sm) }}
        >
          {nanda.definicion}
        </Text>

        {/* Related pathologies */}
        {pathologyNames.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: rs.space(4), marginBottom: rs.space(SPACING.sm) }}>
            {pathologyNames.slice(0, 3).map((name, i) => (
              <View key={i} style={{
                backgroundColor: colors.border,
                borderRadius: RADIUS.pill,
                paddingHorizontal: rs.space(SPACING.sm),
                paddingVertical: rs.space(2),
              }}>
                <Text style={{ fontSize: rs.font(11), color: colors.textSecondary }}>
                  {name}
                </Text>
              </View>
            ))}
            {pathologyNames.length > 3 && (
              <View style={{
                backgroundColor: colors.border,
                borderRadius: RADIUS.pill,
                paddingHorizontal: rs.space(SPACING.sm),
                paddingVertical: rs.space(2),
              }}>
                <Text style={{ fontSize: rs.font(11), color: colors.textSecondary }}>
                  +{pathologyNames.length - 3} más
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Expand toggle */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(SPACING.lg) }}>
            {nanda.caracteristicasDefinitorias.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(4) }}>
                <MaterialCommunityIcons name="format-list-bulleted" size={13} color={colors.textLight} />
                <Text style={{ fontSize: rs.font(11), color: colors.textLight }}>
                  {nanda.caracteristicasDefinitorias.length} características
                </Text>
              </View>
            )}
            {nics.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(4) }}>
                <MaterialCommunityIcons name="clipboard-pulse-outline" size={13} color={colors.secondary} />
                <Text style={{ fontSize: rs.font(11), color: colors.secondary, fontWeight: '600' }}>
                  {nics.length} NIC
                </Text>
              </View>
            )}
            {nocs.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(4) }}>
                <MaterialCommunityIcons name="chart-line" size={13} color={colors.info} />
                <Text style={{ fontSize: rs.font(11), color: colors.info, fontWeight: '600' }}>
                  {nocs.length} NOC
                </Text>
              </View>
            )}
          </View>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {/* Expanded content */}
      {expanded && (
        <View style={{
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
          paddingHorizontal: rs.space(SPACING.lg),
          paddingBottom: rs.space(SPACING.lg),
          paddingTop: rs.space(SPACING.md),
        }}>
          {/* Caracteristicas Definitorias */}
          {nanda.caracteristicasDefinitorias.length > 0 && (
            <View style={{ marginBottom: rs.space(SPACING.lg) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(SPACING.sm), gap: rs.space(6) }}>
                <MaterialCommunityIcons name="format-list-bulleted" size={15} color={colors.primary} />
                <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
                  Características Definitorias
                </Text>
              </View>
              <BulletList
                items={nanda.caracteristicasDefinitorias}
                color={colors.primary}
                colors={colors}
                rs={rs}
              />
            </View>
          )}

          {/* Factores Relacionados */}
          {nanda.factoresRelacionados.length > 0 && (
            <View style={{ marginBottom: rs.space(SPACING.lg) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(SPACING.sm), gap: rs.space(6) }}>
                <MaterialCommunityIcons name="link-variant" size={15} color={colors.warning} />
                <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
                  Factores Relacionados
                </Text>
              </View>
              <BulletList
                items={nanda.factoresRelacionados}
                color={colors.warning}
                colors={colors}
                rs={rs}
              />
            </View>
          )}

          {/* NIC Interventions */}
          {nics.length > 0 && (
            <View style={{ marginBottom: rs.space(SPACING.md) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(SPACING.sm), gap: rs.space(6) }}>
                <MaterialCommunityIcons name="clipboard-pulse-outline" size={15} color={colors.secondary} />
                <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
                  Intervenciones NIC
                </Text>
              </View>
              {nics.map((nic, i) => (
                <NicCard key={i} nic={nic} colors={colors} rs={rs} />
              ))}
            </View>
          )}

          {/* NOC Results */}
          {nocs.length > 0 && (
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(SPACING.sm), gap: rs.space(6) }}>
                <MaterialCommunityIcons name="chart-line" size={15} color={colors.info} />
                <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
                  Resultados NOC
                </Text>
              </View>
              {nocs.map((noc, i) => (
                <NocCard key={i} noc={noc} colors={colors} rs={rs} />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────

export function NandaScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { pathologies } = usePathologyData();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const [query, setQuery] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'NANDA-NIC-NOC' });
  }, [navigation]);

  // Aggregate unique NANDA diagnoses from all pathologies
  const nandaEntries = useMemo<NandaEntry[]>(() => {
    const map = new Map<string, NandaEntry>();

    for (const pathology of pathologies) {
      for (const nanda of pathology.npiNanda) {
        if (!map.has(nanda.codigo)) {
          map.set(nanda.codigo, {
            nanda,
            nics: [...pathology.npiNic],
            nocs: [...pathology.npiNoc],
            pathologyNames: [pathology.nombre],
          });
        } else {
          const entry = map.get(nanda.codigo)!;
          // Merge NIC (by codigo)
          for (const nic of pathology.npiNic) {
            if (!entry.nics.some(n => n.codigo === nic.codigo)) {
              entry.nics.push(nic);
            }
          }
          // Merge NOC (by codigo)
          for (const noc of pathology.npiNoc) {
            if (!entry.nocs.some(n => n.codigo === noc.codigo)) {
              entry.nocs.push(noc);
            }
          }
          if (!entry.pathologyNames.includes(pathology.nombre)) {
            entry.pathologyNames.push(pathology.nombre);
          }
        }
      }
    }

    return Array.from(map.values()).sort((a, b) =>
      a.nanda.codigo.localeCompare(b.nanda.codigo),
    );
  }, [pathologies]);

  const filtered = useMemo(() => {
    if (!query.trim()) return nandaEntries;
    const q = query.toLowerCase();
    return nandaEntries.filter(
      entry =>
        entry.nanda.codigo.toLowerCase().includes(q) ||
        entry.nanda.nombre.toLowerCase().includes(q) ||
        entry.nanda.definicion.toLowerCase().includes(q) ||
        entry.nanda.caracteristicasDefinitorias.some(c => c.toLowerCase().includes(q)) ||
        entry.nanda.factoresRelacionados.some(f => f.toLowerCase().includes(q)),
    );
  }, [nandaEntries, query]);

  const renderItem = useCallback(
    ({ item }: { item: NandaEntry }) => (
      <NandaCard entry={item} colors={colors} rs={rs} />
    ),
    [colors, rs],
  );

  const keyExtractor = useCallback((item: NandaEntry) => item.nanda.codigo, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Buscar diagnóstico NANDA..."
        />
        <Text style={styles.resultCount}>
          {filtered.length} diagnóstico{filtered.length !== 1 ? 's' : ''}
        </Text>
      </View>
    ),
    [query, filtered.length, styles],
  );

  return (
    <PremiumGate feature="NANDA-NIC-NOC">
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
              <MaterialCommunityIcons name="clipboard-text-search-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyText}>No se encontraron diagnósticos</Text>
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
