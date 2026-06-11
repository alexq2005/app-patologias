// ============================================================
// DifferentialScreen — Interactive differential diagnosis
// Select symptoms → see ranked pathology matches
// ============================================================

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackParamList, EmergencyLevel } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import {
  useDifferentialDiagnosis,
  type DifferentialResult,
} from '../hooks/useDifferentialDiagnosis';
import { normalizeText } from '../utils/search';
import {
  BODY_SYSTEM_COLORS,
  BODY_SYSTEM_ICONS,
  EMERGENCY_LEVEL_COLORS,
} from '../utils/colors';
import type { ThemeColors } from '../utils/colors';
import { neuCard, neuPill } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'DifferentialScreen'>;

// ─────────────────────────────────────────────
// Emergency badge
// ─────────────────────────────────────────────

const EMERGENCY_LABELS: Record<EmergencyLevel, string> = {
  critico: 'Crítico',
  moderado: 'Moderado',
  leve: 'Leve',
  ninguno: 'Sin urgencia',
};

const EMERGENCY_ICONS: Record<EmergencyLevel, string> = {
  critico: 'alert-circle',
  moderado: 'alert',
  leve: 'information',
  ninguno: 'check-circle-outline',
};

function EmergencyBadge({
  level,
  rs,
}: {
  level: EmergencyLevel;
  rs: ResponsiveScale;
}) {
  const color = EMERGENCY_LEVEL_COLORS[level];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color + '18',
        borderRadius: RADIUS.pill,
        paddingHorizontal: rs.space(8),
        paddingVertical: rs.space(3),
        gap: rs.space(3),
      }}
    >
      <MaterialCommunityIcons
        name={EMERGENCY_ICONS[level]}
        size={12}
        color={color}
      />
      <Text style={{ fontSize: rs.font(10), fontWeight: '700', color }}>
        {EMERGENCY_LABELS[level]}
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────
// Result card
// ─────────────────────────────────────────────

interface ResultCardProps {
  result: DifferentialResult;
  onPress: () => void;
  colors: ThemeColors;
  rs: ResponsiveScale;
  rank: number;
}

function ResultCard({ result, onPress, colors, rs, rank }: ResultCardProps) {
  const systemColor = BODY_SYSTEM_COLORS[result.bodySystemId];
  const pct = result.matchPercentage;
  const barColor = pct >= 70 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#6B7280';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        neuCard(colors),
        {
          marginHorizontal: rs.space(SPACING.lg),
          marginBottom: rs.space(SPACING.sm),
          padding: rs.space(SPACING.md),
        },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: rs.space(8),
        }}
      >
        {/* Rank */}
        <View
          style={{
            width: rs.space(28),
            height: rs.space(28),
            borderRadius: rs.space(14),
            backgroundColor:
              rank <= 3 ? systemColor + '20' : colors.border + '40',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: rs.space(SPACING.sm),
          }}
        >
          <Text
            style={{
              fontSize: rs.font(12),
              fontWeight: '800',
              color: rank <= 3 ? systemColor : colors.textSecondary,
            }}
          >
            {rank}
          </Text>
        </View>

        {/* Name + system */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: rs.font(14),
              fontWeight: '700',
              color: colors.text,
            }}
            numberOfLines={1}
          >
            {result.pathologyName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: rs.space(4),
              marginTop: rs.space(2),
            }}
          >
            <MaterialCommunityIcons
              name={BODY_SYSTEM_ICONS[result.bodySystemId]}
              size={12}
              color={systemColor}
            />
            <Text
              style={{
                fontSize: rs.font(11),
                color: systemColor,
                fontWeight: '600',
              }}
            >
              {result.bodySystemId.replace('_', ' ')}
            </Text>
          </View>
        </View>

        <EmergencyBadge level={result.emergencyLevel} rs={rs} />
      </View>

      {/* Match bar */}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(8) }}
      >
        <View
          style={{
            flex: 1,
            height: rs.space(6),
            borderRadius: RADIUS.pill,
            backgroundColor: colors.border,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${pct}%`,
              height: '100%',
              borderRadius: RADIUS.pill,
              backgroundColor: barColor,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: rs.font(13),
            fontWeight: '800',
            color: barColor,
            minWidth: rs.space(36),
            textAlign: 'right',
          }}
        >
          {pct}%
        </Text>
      </View>

      {/* Matched symptoms */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: rs.space(4),
          marginTop: rs.space(8),
        }}
      >
        {result.matchedSymptoms.map((s, i) => (
          <View
            key={i}
            style={{
              backgroundColor: barColor + '15',
              borderRadius: RADIUS.pill,
              paddingHorizontal: rs.space(8),
              paddingVertical: rs.space(2),
            }}
          >
            <Text
              style={{
                fontSize: rs.font(10),
                color: barColor,
                fontWeight: '600',
              }}
              numberOfLines={1}
            >
              {s}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────

export function DifferentialScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const {
    filteredSymptoms,
    selectedSymptomIds,
    toggleSymptom,
    clearSelection,
    results,
    systemFilter,
    setSystemFilter,
    bodySystems,
    selectedCount,
  } = useDifferentialDiagnosis();

  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Fade in
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        delay: 60,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 380,
        delay: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Filter symptoms by search text
  const visibleSymptoms = useMemo(() => {
    if (!searchText.trim()) return filteredSymptoms.slice(0, 80);
    const norm = normalizeText(searchText);
    return filteredSymptoms.filter(s => s.id.includes(norm)).slice(0, 80);
  }, [filteredSymptoms, searchText]);

  const handleAnalyze = useCallback(() => {
    setShowResults(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowResults(false);
  }, []);

  const handleNavigateToPathology = useCallback(
    (pathologyId: string, pathologyName: string) => {
      navigation.navigate('PathologyDetail', { pathologyId, pathologyName });
    },
    [navigation],
  );

  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  // ── Results view ──────────────────────────────────────────

  if (showResults) {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={
            colors.background === '#0F172A' ? 'light-content' : 'dark-content'
          }
          backgroundColor={colors.background}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: rs.space(SPACING.md),
            paddingBottom: insets.bottom + rs.space(SPACING.xxxl),
          }}
        >
          {/* Summary */}
          <View
            style={[
              neuCard(colors),
              {
                marginHorizontal: rs.space(SPACING.lg),
                marginBottom: rs.space(SPACING.lg),
                padding: rs.space(SPACING.md),
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rs.space(SPACING.sm),
              }}
            >
              <MaterialCommunityIcons
                name="magnify-scan"
                size={20}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: rs.font(14),
                  fontWeight: '700',
                  color: colors.text,
                  marginLeft: rs.space(8),
                }}
              >
                {selectedCount} síntomas seleccionados
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: rs.space(4),
              }}
            >
              {Array.from(selectedSymptomIds).map(id => {
                const s = filteredSymptoms.find(x => x.id === id) ?? {
                  label: id,
                };
                return (
                  <View
                    key={id}
                    style={{
                      backgroundColor: colors.primary + '15',
                      borderRadius: RADIUS.pill,
                      paddingHorizontal: rs.space(8),
                      paddingVertical: rs.space(3),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: rs.font(11),
                        color: colors.primary,
                        fontWeight: '600',
                      }}
                    >
                      {s.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Results header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: rs.space(SPACING.lg),
              marginBottom: rs.space(SPACING.sm),
              gap: rs.space(SPACING.sm),
            }}
          >
            <MaterialCommunityIcons
              name="format-list-numbered"
              size={18}
              color={colors.textSecondary}
            />
            <Text
              style={{
                fontSize: rs.font(15),
                fontWeight: '700',
                color: colors.text,
              }}
            >
              {results.length} patologías compatibles
            </Text>
          </View>

          {results.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: rs.space(SPACING.xxxl),
              }}
            >
              <MaterialCommunityIcons
                name="magnify-close"
                size={48}
                color={colors.textLight}
              />
              <Text
                style={{
                  fontSize: rs.font(14),
                  color: colors.textSecondary,
                  textAlign: 'center',
                  marginTop: rs.space(SPACING.md),
                }}
              >
                No se encontraron patologías con esos síntomas
              </Text>
            </View>
          )}

          {results.map((r, idx) => (
            <ResultCard
              key={r.pathologyId}
              result={r}
              rank={idx + 1}
              onPress={() =>
                handleNavigateToPathology(r.pathologyId, r.pathologyName)
              }
              colors={colors}
              rs={rs}
            />
          ))}

          {/* Back button */}
          <TouchableOpacity
            style={[
              styles.analyzeButton,
              {
                marginTop: rs.space(SPACING.md),
                backgroundColor: colors.textSecondary,
              },
            ]}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: rs.space(8) }}
            />
            <Text style={styles.analyzeButtonText}>Modificar síntomas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ── Selection view ────────────────────────────────────────

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <LinearGradient
        colors={['#DC2626', '#991B1B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.header,
          { paddingTop: insets.top + rs.space(SPACING.lg) },
        ]}
      >
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Text style={styles.headerTitle}>Diagnóstico Diferencial</Text>
          <Text style={styles.headerSubtitle}>
            Seleccioná síntomas para identificar patologías
          </Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: rs.space(SPACING.lg),
          paddingBottom: insets.bottom + rs.space(SPACING.xxxl),
        }}
      >
        {/* System filter chips */}
        <View
          style={{
            paddingHorizontal: rs.space(SPACING.lg),
            marginBottom: rs.space(SPACING.md),
          }}
        >
          <Text style={styles.sectionLabel}>Filtrar por sistema</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: rs.space(SPACING.sm) }}>
              <TouchableOpacity
                onPress={() => setSystemFilter(null)}
                style={[
                  neuPill(colors),
                  {
                    paddingHorizontal: rs.space(SPACING.md),
                    paddingVertical: rs.space(SPACING.sm),
                    backgroundColor: !systemFilter
                      ? colors.primary + '20'
                      : colors.neuSurface,
                    borderWidth: !systemFilter ? 1.5 : 0.5,
                    borderColor: !systemFilter
                      ? colors.primary
                      : colors.neuBorderDark,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: rs.font(12),
                    fontWeight: !systemFilter ? '700' : '500',
                    color: !systemFilter
                      ? colors.primary
                      : colors.textSecondary,
                  }}
                >
                  Todos
                </Text>
              </TouchableOpacity>
              {bodySystems.map(sys => {
                const active = systemFilter === sys.id;
                const sysColor = BODY_SYSTEM_COLORS[sys.id];
                return (
                  <TouchableOpacity
                    key={sys.id}
                    onPress={() => setSystemFilter(active ? null : sys.id)}
                    style={[
                      neuPill(colors),
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: rs.space(SPACING.md),
                        paddingVertical: rs.space(SPACING.sm),
                        backgroundColor: active
                          ? sysColor + '20'
                          : colors.neuSurface,
                        borderWidth: active ? 1.5 : 0.5,
                        borderColor: active ? sysColor : colors.neuBorderDark,
                        gap: rs.space(4),
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={BODY_SYSTEM_ICONS[sys.id]}
                      size={14}
                      color={active ? sysColor : colors.textSecondary}
                    />
                    <Text
                      style={{
                        fontSize: rs.font(12),
                        fontWeight: active ? '700' : '500',
                        color: active ? sysColor : colors.textSecondary,
                      }}
                    >
                      {sys.nombre}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Search bar */}
        <View
          style={[
            neuCard(colors),
            {
              marginHorizontal: rs.space(SPACING.lg),
              marginBottom: rs.space(SPACING.md),
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: rs.space(SPACING.md),
              paddingVertical: rs.space(SPACING.sm),
            },
          ]}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: rs.font(14),
              color: colors.text,
              marginLeft: rs.space(8),
              paddingVertical: rs.space(4),
            }}
            placeholder="Buscar síntoma..."
            placeholderTextColor={colors.textLight}
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <MaterialCommunityIcons
                name="close-circle"
                size={18}
                color={colors.textLight}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Selected count + clear */}
        {selectedCount > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: rs.space(SPACING.lg),
              marginBottom: rs.space(SPACING.sm),
            }}
          >
            <Text
              style={{
                fontSize: rs.font(13),
                fontWeight: '700',
                color: colors.primary,
              }}
            >
              {selectedCount} seleccionados
            </Text>
            <TouchableOpacity onPress={clearSelection}>
              <Text
                style={{
                  fontSize: rs.font(13),
                  fontWeight: '600',
                  color: colors.error,
                }}
              >
                Limpiar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Symptom chips */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: rs.space(SPACING.lg),
            gap: rs.space(6),
            marginBottom: rs.space(SPACING.lg),
          }}
        >
          {visibleSymptoms.map(s => {
            const selected = selectedSymptomIds.has(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => toggleSymptom(s.id)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: selected
                    ? colors.primary + '20'
                    : colors.neuSurface,
                  borderWidth: selected ? 1.5 : 0.8,
                  borderColor: selected ? colors.primary : colors.neuBorderDark,
                  borderRadius: RADIUS.pill,
                  paddingHorizontal: rs.space(10),
                  paddingVertical: rs.space(6),
                  gap: rs.space(4),
                }}
              >
                {selected && (
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={14}
                    color={colors.primary}
                  />
                )}
                <Text
                  style={{
                    fontSize: rs.font(12),
                    fontWeight: selected ? '700' : '500',
                    color: selected ? colors.primary : colors.text,
                  }}
                  numberOfLines={1}
                >
                  {s.label}
                </Text>
                <View
                  style={{
                    width: rs.space(8),
                    height: rs.space(8),
                    borderRadius: rs.space(4),
                    backgroundColor: s.isSign
                      ? '#3B82F6' + '40'
                      : '#F59E0B' + '40',
                  }}
                />
              </TouchableOpacity>
            );
          })}

          {visibleSymptoms.length === 0 && (
            <Text
              style={{
                fontSize: rs.font(13),
                color: colors.textSecondary,
                paddingVertical: rs.space(SPACING.lg),
              }}
            >
              No se encontraron síntomas con "{searchText}"
            </Text>
          )}
        </View>

        {/* Legend */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: rs.space(SPACING.lg),
            marginBottom: rs.space(SPACING.lg),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: rs.space(4),
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#3B82F6' + '60',
              }}
            />
            <Text
              style={{ fontSize: rs.font(11), color: colors.textSecondary }}
            >
              Signo
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: rs.space(4),
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#F59E0B' + '60',
              }}
            />
            <Text
              style={{ fontSize: rs.font(11), color: colors.textSecondary }}
            >
              Síntoma
            </Text>
          </View>
        </View>

        {/* Analyze button */}
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            { opacity: selectedCount < 2 ? 0.5 : 1 },
          ]}
          onPress={handleAnalyze}
          activeOpacity={0.8}
          disabled={selectedCount < 2}
        >
          <MaterialCommunityIcons
            name="stethoscope"
            size={20}
            color="#FFFFFF"
            style={{ marginRight: rs.space(8) }}
          />
          <Text style={styles.analyzeButtonText}>
            {selectedCount < 2
              ? 'Seleccioná al menos 2 síntomas'
              : `Analizar ${selectedCount} síntomas`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    header: {
      paddingBottom: rs.space(SPACING.xxl),
      paddingHorizontal: rs.space(SPACING.xxl),
    },
    headerTitle: {
      fontSize: rs.font(26),
      fontWeight: '800',
      color: '#FFFFFF',
      letterSpacing: -0.5,
      marginBottom: rs.space(4),
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      fontWeight: '500',
      color: '#FFFFFF',
      opacity: 0.85,
    },
    sectionLabel: {
      fontSize: rs.font(13),
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: rs.space(SPACING.sm),
    },
    analyzeButton: {
      backgroundColor: '#DC2626',
      borderRadius: RADIUS.lg,
      paddingVertical: rs.space(SPACING.md),
      paddingHorizontal: rs.space(SPACING.xxl),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: rs.space(SPACING.lg),
      elevation: 4,
      shadowColor: '#DC2626',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    analyzeButtonText: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });
