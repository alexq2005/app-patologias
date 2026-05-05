// ============================================================
// QuizScreen — quiz configuration + history
// ============================================================

import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { Image } from 'react-native';
import type { RootStackParamList, BodySystemId } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { useQuiz } from '../hooks/useQuiz';
import { PremiumGate } from '../components/PremiumGate';
import type { ThemeColors } from '../utils/colors';
import { BODY_SYSTEM_COLORS, BODY_SYSTEM_ICONS } from '../utils/colors';
import { getSystemImage } from '../utils/systemImages';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'QuizScreen'>;

const QUESTION_COUNTS = [5, 10, 15, 20] as const;

// ─────────────────────────────────────────────
// useFadeIn
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
// Sub-components
// ─────────────────────────────────────────────

interface SystemChipProps {
  systemId: BodySystemId | null;
  nombre: string;
  icon?: string;
  color?: string;
  selected: boolean;
  onPress: () => void;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function SystemChip({
  systemId,
  nombre,
  icon,
  color,
  selected,
  onPress,
  colors,
  rs,
}: SystemChipProps) {
  const chipColor = color ?? colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: rs.space(12),
        paddingLeft: rs.space(4),
        paddingVertical: rs.space(4),
        marginRight: rs.space(6),
        marginBottom: rs.space(6),
        backgroundColor: selected ? chipColor + '15' : colors.neuSurface,
        borderWidth: selected ? 1.5 : 1,
        borderColor: selected ? chipColor : colors.border + '50',
        borderRadius: 22,
      }}
    >
      {/* Thumbnail image or icon */}
      {systemId ? (
        <Image
          source={getSystemImage(systemId)}
          style={{
            width: 30, height: 30, borderRadius: 15,
            marginRight: rs.space(8),
            borderWidth: selected ? 1.5 : 0,
            borderColor: chipColor,
          }}
          resizeMode="cover"
        />
      ) : icon ? (
        <View style={{
          width: 30, height: 30, borderRadius: 15,
          backgroundColor: selected ? chipColor + '20' : colors.primary + '12',
          alignItems: 'center', justifyContent: 'center',
          marginRight: rs.space(8),
        }}>
          <MaterialCommunityIcons
            name={icon}
            size={16}
            color={selected ? chipColor : colors.primary}
          />
        </View>
      ) : null}
      <Text
        style={{
          fontSize: rs.font(12),
          fontWeight: selected ? '700' : '500',
          color: selected ? chipColor : colors.textSecondary,
        }}
        numberOfLines={1}
      >
        {nombre}
      </Text>
    </TouchableOpacity>
  );
}

interface CountPillProps {
  count: number;
  selected: boolean;
  onPress: () => void;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function CountPill({ count, selected, onPress, colors, rs }: CountPillProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: rs.space(48),
        height: rs.space(40),
        borderRadius: 12,
        marginRight: rs.space(8),
        backgroundColor: selected ? colors.primary : colors.neuSurface,
        borderWidth: selected ? 0 : 1,
        borderColor: colors.border + '60',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: selected ? 3 : 0,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selected ? 0.3 : 0,
        shadowRadius: 4,
      }}
    >
      <Text
        style={{
          fontSize: rs.font(15),
          fontWeight: selected ? '800' : '500',
          color: selected ? '#fff' : colors.textSecondary,
        }}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );
}

interface ResultCardProps {
  result: {
    id: string;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    category: string;
    completedAt: number;
  };
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function ResultCard({ result, colors, rs }: ResultCardProps) {
  const date = new Date(result.completedAt);
  const dateStr = date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
  const timeStr = date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const pct = result.percentage;
  const scoreColor =
    pct >= 80 ? colors.success : pct >= 60 ? colors.warning : colors.error;

  return (
    <View
      style={[
        neuCardSubtle(colors),
        {
          marginHorizontal: rs.space(SPACING.lg),
          marginBottom: rs.space(SPACING.sm),
          padding: rs.space(SPACING.md),
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
    >
      {/* Score circle */}
      <View
        style={{
          width: rs.space(52),
          height: rs.space(52),
          borderRadius: rs.space(26),
          backgroundColor: scoreColor + '18',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: scoreColor + '40',
          marginRight: rs.space(SPACING.md),
        }}
      >
        <Text
          style={{
            fontSize: rs.font(16),
            fontWeight: '800',
            color: scoreColor,
          }}
        >
          {pct}%
        </Text>
      </View>

      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: rs.font(14),
            fontWeight: '700',
            color: colors.text,
            marginBottom: rs.space(2),
          }}
        >
          {result.category === 'Todos'
            ? 'Todos los sistemas'
            : result.category}
        </Text>
        <Text
          style={{
            fontSize: rs.font(12),
            color: colors.textSecondary,
            marginBottom: rs.space(2),
          }}
        >
          {result.correctAnswers} / {result.totalQuestions} correctas
        </Text>
        <Text style={{ fontSize: rs.font(11), color: colors.textLight }}>
          {dateStr} · {timeStr}
        </Text>
      </View>

      {/* Check / X icon */}
      <MaterialCommunityIcons
        name={pct >= 60 ? 'check-circle-outline' : 'close-circle-outline'}
        size={22}
        color={scoreColor}
      />
    </View>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────

export function QuizScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { results, averageScore, totalSessions, bodySystems } = useQuiz();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const { opacity, translateY } = useFadeIn(380, 60);

  const [selectedCategory, setSelectedCategory] = React.useState<
    BodySystemId | null
  >(null);
  const [questionCount, setQuestionCount] = React.useState<number>(10);

  const handleStart = useCallback(() => {
    navigation.navigate('QuizSession', {
      category: selectedCategory ?? undefined,
      questionCount,
    });
  }, [navigation, selectedCategory, questionCount]);

  return (
    <PremiumGate feature="Test de Patologias">
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
          style={[
            styles.header,
            { paddingTop: insets.top + rs.space(SPACING.lg) },
          ]}
        >
          <Animated.View style={{ opacity, transform: [{ translateY }] }}>
            <Text style={styles.headerTitle}>Test de Patologias</Text>
            <Text style={styles.headerSubtitle}>
              Pon a prueba tus conocimientos de enfermeria
            </Text>
          </Animated.View>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + rs.space(SPACING.xxxl) },
          ]}
        >
          {/* ── Config card ──────────────────────────── */}
          <View style={[neuCard(colors), styles.configCard]}>
            <Text style={styles.sectionLabel}>Sistema corporal</Text>
            {/* "Todos" on its own row */}
            <SystemChip
              systemId={null}
              nombre="Todos los sistemas"
              icon="view-grid-outline"
              selected={selectedCategory === null}
              onPress={() => setSelectedCategory(null)}
              colors={colors}
              rs={rs}
            />
            <View style={styles.chipsRow}>
              {bodySystems.map(sys => (
                <SystemChip
                  key={sys.id}
                  systemId={sys.id}
                  nombre={sys.nombre}
                  icon={BODY_SYSTEM_ICONS[sys.id]}
                  color={BODY_SYSTEM_COLORS[sys.id]}
                  selected={selectedCategory === sys.id}
                  onPress={() => setSelectedCategory(sys.id)}
                  colors={colors}
                  rs={rs}
                />
              ))}
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>Numero de preguntas</Text>
            <View style={styles.countsRow}>
              {QUESTION_COUNTS.map(n => (
                <CountPill
                  key={n}
                  count={n}
                  selected={questionCount === n}
                  onPress={() => setQuestionCount(n)}
                  colors={colors}
                  rs={rs}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleStart}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.startButton}
              >
                <MaterialCommunityIcons
                  name="rocket-launch-outline"
                  size={20}
                  color="#FFFFFF"
                  style={{ marginRight: rs.space(SPACING.sm) }}
                />
                <Text style={styles.startButtonText}>Iniciar Test</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* ── Stats row ─────────────────────────────── */}
          {totalSessions > 0 && (
            <View style={styles.statsRow}>
              <View style={[neuCardSubtle(colors), styles.statCard]}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.quiz + '15', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialCommunityIcons
                    name="trophy-outline"
                    size={22}
                    color={colors.quiz}
                  />
                </View>
                <Text style={styles.statValue}>{averageScore}%</Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>
              <View style={[neuCardSubtle(colors), styles.statCard]}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.quiz + '15', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialCommunityIcons
                    name="lightning-bolt-outline"
                    size={22}
                    color={colors.quiz}
                  />
                </View>
                <Text style={styles.statValue}>{totalSessions}</Text>
                <Text style={styles.statLabel}>Sesiones</Text>
              </View>
            </View>
          )}

          {/* ── Recent results ────────────────────────── */}
          {results.length > 0 && (
            <>
              <View style={styles.historyHeader}>
                <MaterialCommunityIcons
                  name="history"
                  size={18}
                  color={colors.textSecondary}
                />
                <Text style={styles.historyTitle}>Historial reciente</Text>
              </View>
              {results.slice(0, 10).map(r => (
                <ResultCard key={r.id} result={r} colors={colors} rs={rs} />
              ))}
            </>
          )}

          {results.length === 0 && (
            <View style={styles.emptyState}>
              <View style={{
                width: 72, height: 72, borderRadius: 22,
                backgroundColor: colors.primary + '12', alignItems: 'center', justifyContent: 'center',
                marginBottom: 12,
              }}>
                <MaterialCommunityIcons name="head-lightbulb-outline" size={34} color={colors.primary} />
              </View>
              <Text style={styles.emptyText}>
                Completá tu primer test para ver tu historial
              </Text>
            </View>
          )}
        </ScrollView>
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
    scrollContent: {
      paddingTop: rs.space(SPACING.lg),
    },
    configCard: {
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.md),
      padding: rs.space(SPACING.lg),
    },
    sectionLabel: {
      fontSize: rs.font(13),
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: rs.space(SPACING.sm),
    },
    chipsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: rs.space(SPACING.md),
    },
    countsRow: {
      flexDirection: 'row',
      marginBottom: rs.space(SPACING.xl),
    },
    startButton: {
      borderRadius: RADIUS.lg,
      paddingVertical: rs.space(SPACING.md),
      paddingHorizontal: rs.space(SPACING.xxl),
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      elevation: 6,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
    },
    startButtonText: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: '#FFFFFF',
    },
    statsRow: {
      flexDirection: 'row',
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.md),
      gap: rs.space(SPACING.sm),
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: rs.space(SPACING.md),
      paddingHorizontal: rs.space(SPACING.sm),
      gap: rs.space(4),
    },
    statValue: {
      fontSize: rs.font(20),
      fontWeight: '800',
      color: colors.text,
    },
    statLabel: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      fontWeight: '500',
    },
    historyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.sm),
      marginTop: rs.space(SPACING.sm),
      gap: rs.space(SPACING.sm),
    },
    historyTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: rs.space(SPACING.xxxl),
      paddingHorizontal: rs.space(SPACING.xxxl),
      gap: rs.space(SPACING.md),
    },
    emptyText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 21,
    },
  });
