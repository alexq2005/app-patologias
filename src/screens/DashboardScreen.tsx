// ============================================================
// DashboardScreen — study progress & quiz stats (Premium)
// ============================================================

import React, { useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
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
import { useQuiz } from '../hooks/useQuiz';
import { useRecentPathologies } from '../hooks/useRecentPathologies';
import { usePathologyData } from '../hooks/usePathologyData';
import { PremiumGate } from '../components/PremiumGate';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import type { ThemeColors } from '../utils/colors';
import type { BodySystemId, RootStackParamList } from '../types';

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

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// ─────────────────────────────────────────────
// Score bar color
// ─────────────────────────────────────────────

function scoreColor(pct: number, colors: ThemeColors): string {
  if (pct >= 80) return colors.success;
  if (pct >= 60) return colors.warning;
  return colors.error;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function DashboardScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { results, averageScore, totalSessions } = useQuiz();
  const { recent } = useRecentPathologies();
  const { getPathologyById, getBodySystemById, bodySystems } = usePathologyData();

  const styles = createStyles(colors, rs);
  const { opacity, translateY } = useFadeIn(380, 40);

  // Best score
  const bestScore = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.max(...results.map(r => r.percentage));
  }, [results]);

  // Last 10 quiz results for trend bars
  const recentResults = useMemo(() => results.slice(0, 10).reverse(), [results]);

  // Count views per body system from recent pathologies
  const systemViewCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const id of recent) {
      const p = getPathologyById(id);
      if (p) {
        counts[p.bodySystemId] = (counts[p.bodySystemId] ?? 0) + 1;
      }
    }
    return counts;
  }, [recent, getPathologyById]);

  // Systems sorted by view count (descending), only those with views
  const studiedSystems = useMemo(() => {
    return Object.entries(systemViewCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([systemId, count]) => ({
        system: getBodySystemById(systemId as BodySystemId),
        count,
      }))
      .filter(item => item.system !== undefined);
  }, [systemViewCounts, getBodySystemById]);

  return (
    <PremiumGate feature="Dashboard de progreso">
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
            <Text style={styles.headerTitle}>Mi Progreso</Text>
            <Text style={styles.headerSubtitle}>Estadisticas de estudio y quiz</Text>
          </Animated.View>
        </LinearGradient>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + rs.space(SPACING.xxxl) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Quiz stats card */}
          <View style={[styles.card, neuCard(colors)]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="brain" size={rs.font(18)} color={colors.primary} />
              <Text style={styles.cardTitle}>Estadisticas de Quiz</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalSessions}</Text>
                <Text style={styles.statLabel}>Sesiones</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: scoreColor(averageScore, colors) }]}>
                  {averageScore}%
                </Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: scoreColor(bestScore, colors) }]}>
                  {bestScore}%
                </Text>
                <Text style={styles.statLabel}>Mejor</Text>
              </View>
            </View>
          </View>

          {/* Quiz trend */}
          {recentResults.length > 0 && (
            <View style={[styles.card, neuCard(colors)]}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name="chart-line" size={rs.font(18)} color={colors.primary} />
                <Text style={styles.cardTitle}>Tendencia reciente</Text>
                <Text style={styles.cardSubNote}>(ultimas {recentResults.length} sesiones)</Text>
              </View>
              <View style={styles.barsContainer}>
                {recentResults.map((r, i) => {
                  const barHeight = Math.max(rs.space(8), (r.percentage / 100) * rs.space(60));
                  const barColor = scoreColor(r.percentage, colors);
                  return (
                    <View key={r.id ?? i} style={styles.barWrap}>
                      <Text style={[styles.barLabel, { color: barColor }]}>{r.percentage}%</Text>
                      <View style={styles.barTrack}>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: barHeight,
                              backgroundColor: barColor,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.barIndex}>{i + 1}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {recentResults.length === 0 && (
            <View style={[styles.card, neuCardSubtle(colors), styles.emptyCard]}>
              <MaterialCommunityIcons name="chart-bar-stacked" size={rs.font(40)} color={colors.textLight} />
              <Text style={styles.emptyCardText}>
                Completa al menos un quiz para ver tu tendencia de progreso.
              </Text>
              <TouchableOpacity
                style={styles.startQuizButton}
                onPress={() => navigation.navigate('QuizScreen')}
                activeOpacity={0.8}
              >
                <Text style={styles.startQuizText}>Ir al Quiz</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Systems studied */}
          {studiedSystems.length > 0 && (
            <View style={[styles.card, neuCard(colors)]}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name="human-handsup" size={rs.font(18)} color={colors.primary} />
                <Text style={styles.cardTitle}>Sistemas estudiados</Text>
              </View>
              {studiedSystems.map(({ system, count }) => (
                <View key={system!.id} style={styles.systemRow}>
                  <View style={[styles.systemDot, { backgroundColor: system!.color }]} />
                  <Text style={styles.systemName} numberOfLines={1}>{system!.nombre}</Text>
                  <Text style={styles.systemCount}>
                    {count} {count === 1 ? 'vista' : 'vistas'}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {studiedSystems.length === 0 && (
            <View style={[styles.card, neuCardSubtle(colors), styles.emptyCard]}>
              <MaterialCommunityIcons name="book-open-outline" size={rs.font(40)} color={colors.textLight} />
              <Text style={styles.emptyCardText}>
                Explora patologias para ver aqui cuales sistemas has estudiado.
              </Text>
            </View>
          )}

          {/* Recent activity count */}
          <View style={[styles.card, neuCardSubtle(colors)]}>
            <View style={styles.activityRow}>
              <MaterialCommunityIcons name="history" size={rs.font(20)} color={colors.textSecondary} />
              <View style={styles.activityMeta}>
                <Text style={styles.activityTitle}>Patologias revisadas</Text>
                <Text style={styles.activityValue}>{recent.length} en historial reciente</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding: rs.space(SPACING.lg),
      gap: rs.space(SPACING.md),
    },
    card: {
      padding: rs.space(SPACING.lg),
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
      marginBottom: rs.space(SPACING.lg),
    },
    cardTitle: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      flex: 1,
    },
    cardSubNote: {
      fontSize: rs.font(11),
      color: colors.textLight,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
      gap: rs.space(SPACING.xs),
    },
    statValue: {
      fontSize: rs.font(28),
      fontWeight: '800',
      color: colors.text,
    },
    statLabel: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      fontWeight: '500',
    },
    statDivider: {
      width: 1,
      height: rs.space(40),
      backgroundColor: colors.border,
    },
    barsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: rs.space(SPACING.xs),
      height: rs.space(96),
    },
    barWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: rs.space(2),
    },
    barLabel: {
      fontSize: rs.font(9),
      fontWeight: '700',
    },
    barTrack: {
      width: '70%',
      height: rs.space(60),
      justifyContent: 'flex-end',
      backgroundColor: colors.borderLight,
      borderRadius: RADIUS.xs,
      overflow: 'hidden',
    },
    bar: {
      width: '100%',
      borderRadius: RADIUS.xs,
    },
    barIndex: {
      fontSize: rs.font(9),
      color: colors.textLight,
    },
    systemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: rs.space(SPACING.sm),
      gap: rs.space(SPACING.md),
      borderBottomWidth: 0.5,
      borderBottomColor: colors.borderLight,
    },
    systemDot: {
      width: rs.space(10),
      height: rs.space(10),
      borderRadius: rs.space(5),
    },
    systemName: {
      flex: 1,
      fontSize: rs.font(14),
      color: colors.text,
      fontWeight: '500',
    },
    systemCount: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      fontWeight: '600',
    },
    activityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.md),
    },
    activityMeta: {
      flex: 1,
    },
    activityTitle: {
      fontSize: rs.font(14),
      fontWeight: '600',
      color: colors.text,
    },
    activityValue: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      marginTop: rs.space(2),
    },
    emptyCard: {
      alignItems: 'center',
      gap: rs.space(SPACING.md),
      paddingVertical: rs.space(SPACING.xxxl),
    },
    emptyCardText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: rs.font(19),
      maxWidth: rs.space(260),
    },
    startQuizButton: {
      backgroundColor: colors.primary,
      paddingVertical: rs.space(SPACING.sm),
      paddingHorizontal: rs.space(SPACING.xxl),
      borderRadius: RADIUS.md,
      elevation: 3,
    },
    startQuizText: {
      fontSize: rs.font(14),
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });
