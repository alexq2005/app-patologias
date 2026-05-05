// ============================================================
// QuizSessionScreen — active quiz, one question at a time
// ============================================================

import React, {
  useMemo,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  BackHandler,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackParamList, QuizSession, QuizResult, BodySystemId } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { useQuiz } from '../hooks/useQuiz';
import type { ThemeColors } from '../utils/colors';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'QuizSession'>;

// ─────────────────────────────────────────────
// Progress bar
// ─────────────────────────────────────────────

interface ProgressBarProps {
  current: number;
  total: number;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function ProgressBar({ current, total, colors, rs }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const widthAnim = useRef(new Animated.Value(pct)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: pct,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [pct, widthAnim]);

  return (
    <View
      style={{
        marginHorizontal: rs.space(SPACING.lg),
        marginBottom: rs.space(SPACING.md),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: rs.space(6),
        }}
      >
        <Text
          style={{ fontSize: rs.font(12), color: colors.textSecondary, fontWeight: '600' }}
        >
          Pregunta {current} de {total}
        </Text>
        <Text
          style={{ fontSize: rs.font(12), color: colors.primary, fontWeight: '700' }}
        >
          {Math.round(pct)}%
        </Text>
      </View>
      <View
        style={{
          height: rs.space(6),
          borderRadius: RADIUS.pill,
          backgroundColor: colors.border,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            borderRadius: RADIUS.pill,
            backgroundColor: colors.primary,
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// Option button
// ─────────────────────────────────────────────

interface OptionButtonProps {
  label: string;
  index: number;
  selectedIndex: number | null;
  correctIndex: number;
  onPress: (index: number) => void;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function OptionButton({
  label,
  index,
  selectedIndex,
  correctIndex,
  onPress,
  colors,
  rs,
}: OptionButtonProps) {
  const isSelected = selectedIndex === index;
  const isCorrect = index === correctIndex;
  const hasAnswered = selectedIndex !== null;

  let borderColor = colors.neuBorderDark;
  let bgColor = colors.neuSurface;
  let textColor = colors.text;
  let iconName: string | null = null;
  let iconColor = colors.textSecondary;

  if (hasAnswered) {
    if (isCorrect) {
      borderColor = colors.quizCorrect;
      bgColor = colors.quizCorrect + '15';
      textColor = colors.quizCorrect;
      iconName = 'check-circle';
      iconColor = colors.quizCorrect;
    } else if (isSelected && !isCorrect) {
      borderColor = colors.quizWrong;
      bgColor = colors.quizWrong + '12';
      textColor = colors.quizWrong;
      iconName = 'close-circle';
      iconColor = colors.quizWrong;
    }
  }

  const letterLabels = ['A', 'B', 'C', 'D'];

  return (
    <TouchableOpacity
      onPress={() => !hasAnswered && onPress(index)}
      activeOpacity={hasAnswered ? 1 : 0.7}
      style={[
        neuCard(colors),
        {
          marginHorizontal: rs.space(SPACING.lg),
          marginBottom: rs.space(SPACING.sm),
          padding: rs.space(SPACING.md),
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: bgColor,
          borderWidth: 1.5,
          borderTopColor: borderColor,
          borderLeftColor: borderColor,
          borderBottomColor: borderColor,
          borderRightColor: borderColor,
        },
      ]}
    >
      {/* Letter badge */}
      <View
        style={{
          width: rs.space(28),
          height: rs.space(28),
          borderRadius: rs.space(14),
          backgroundColor: hasAnswered && isCorrect
            ? colors.quizCorrect + '25'
            : hasAnswered && isSelected
            ? colors.quizWrong + '20'
            : colors.primary + '15',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: rs.space(SPACING.sm),
          flexShrink: 0,
        }}
      >
        <Text
          style={{
            fontSize: rs.font(12),
            fontWeight: '800',
            color: hasAnswered && isCorrect
              ? colors.quizCorrect
              : hasAnswered && isSelected
              ? colors.quizWrong
              : colors.primary,
          }}
        >
          {letterLabels[index]}
        </Text>
      </View>

      <Text
        style={{
          flex: 1,
          fontSize: rs.font(14),
          color: textColor,
          fontWeight: hasAnswered && isCorrect ? '700' : '500',
          lineHeight: 20,
        }}
      >
        {label}
      </Text>

      {iconName && hasAnswered && (isCorrect || isSelected) && (
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={iconColor}
          style={{ marginLeft: rs.space(SPACING.sm) }}
        />
      )}
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Summary screen
// ─────────────────────────────────────────────

interface SummaryProps {
  session: QuizSession;
  category: string;
  onBack: () => void;
  onNavigateToPathology: (pathologyId: string) => void;
  colors: ThemeColors;
  rs: ResponsiveScale;
  insets: { bottom: number };
}

function SummaryScreen({ session, category, onBack, onNavigateToPathology, colors, rs, insets }: SummaryProps) {
  const totalQ = session.questions.length;
  const correct = session.answers.reduce<number>((acc, ans, idx) => {
    return ans === session.questions[idx].correctIndex ? acc + 1 : acc;
  }, 0);
  const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;

  const scoreColor =
    pct >= 80 ? colors.success : pct >= 60 ? colors.warning : colors.error;
  const scoreIcon =
    pct >= 80 ? 'trophy-outline' : pct >= 60 ? 'star-half-full' : 'emoticon-sad-outline';

  // Collect wrong answers for review
  const wrongQuestions = session.questions
    .map((q, idx) => ({ question: q, userAnswer: session.answers[idx], index: idx }))
    .filter(item => item.userAnswer !== item.question.correctIndex);

  const [showReview, setShowReview] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + rs.space(SPACING.xxxl),
        paddingHorizontal: rs.space(SPACING.lg),
        paddingTop: rs.space(SPACING.xxl),
        alignItems: 'center',
      }}
    >
      {/* Score circle */}
      <Animated.View
        style={{
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
          marginBottom: rs.space(SPACING.xxl),
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: rs.space(120),
            height: rs.space(120),
            borderRadius: rs.space(60),
            backgroundColor: scoreColor + '20',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: scoreColor + '50',
            marginBottom: rs.space(SPACING.md),
          }}
        >
          <Text
            style={{
              fontSize: rs.font(36),
              fontWeight: '900',
              color: scoreColor,
            }}
          >
            {pct}%
          </Text>
        </View>
        <MaterialCommunityIcons name={scoreIcon} size={28} color={scoreColor} />
      </Animated.View>

      <Text
        style={{
          fontSize: rs.font(22),
          fontWeight: '800',
          color: colors.text,
          textAlign: 'center',
          marginBottom: rs.space(SPACING.sm),
        }}
      >
        {pct >= 80
          ? '¡Excelente resultado!'
          : pct >= 60
          ? 'Buen trabajo'
          : 'Sigue practicando'}
      </Text>
      <Text
        style={{
          fontSize: rs.font(14),
          color: colors.textSecondary,
          textAlign: 'center',
          marginBottom: rs.space(SPACING.xxl),
        }}
      >
        {correct} respuestas correctas de {totalQ}
      </Text>

      {/* Stats cards */}
      <View style={{ flexDirection: 'row', gap: rs.space(SPACING.sm), marginBottom: rs.space(SPACING.xxl), width: '100%' }}>
        <View
          style={[
            neuCardSubtle(colors),
            { flex: 1, alignItems: 'center', paddingVertical: rs.space(SPACING.md) },
          ]}
        >
          <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.success} />
          <Text style={{ fontSize: rs.font(20), fontWeight: '800', color: colors.text, marginTop: rs.space(4) }}>
            {correct}
          </Text>
          <Text style={{ fontSize: rs.font(11), color: colors.textSecondary }}>Correctas</Text>
        </View>
        <View
          style={[
            neuCardSubtle(colors),
            { flex: 1, alignItems: 'center', paddingVertical: rs.space(SPACING.md) },
          ]}
        >
          <MaterialCommunityIcons name="close-circle-outline" size={20} color={colors.error} />
          <Text style={{ fontSize: rs.font(20), fontWeight: '800', color: colors.text, marginTop: rs.space(4) }}>
            {totalQ - correct}
          </Text>
          <Text style={{ fontSize: rs.font(11), color: colors.textSecondary }}>Incorrectas</Text>
        </View>
        <View
          style={[
            neuCardSubtle(colors),
            { flex: 1, alignItems: 'center', paddingVertical: rs.space(SPACING.md) },
          ]}
        >
          <MaterialCommunityIcons name="help-circle-outline" size={20} color={colors.quiz} />
          <Text style={{ fontSize: rs.font(20), fontWeight: '800', color: colors.text, marginTop: rs.space(4) }}>
            {totalQ}
          </Text>
          <Text style={{ fontSize: rs.font(11), color: colors.textSecondary }}>Total</Text>
        </View>
      </View>

      {/* Category label */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: rs.space(SPACING.sm),
          backgroundColor: colors.primary + '12',
          borderRadius: RADIUS.pill,
          paddingHorizontal: rs.space(SPACING.lg),
          paddingVertical: rs.space(SPACING.sm),
          marginBottom: rs.space(SPACING.lg),
        }}
      >
        <MaterialCommunityIcons name="view-grid-outline" size={16} color={colors.primary} />
        <Text style={{ fontSize: rs.font(13), fontWeight: '600', color: colors.primary }}>
          {category === 'Todos' ? 'Todos los sistemas' : category}
        </Text>
      </View>

      {/* ── Review wrong answers section ── */}
      {wrongQuestions.length > 0 && (
        <View style={{ width: '100%', marginBottom: rs.space(SPACING.lg) }}>
          <TouchableOpacity
            onPress={() => setShowReview(!showReview)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.error + '12',
              borderRadius: RADIUS.lg,
              paddingVertical: rs.space(SPACING.md),
              paddingHorizontal: rs.space(SPACING.lg),
              gap: rs.space(8),
              borderWidth: 1,
              borderColor: colors.error + '25',
            }}
          >
            <MaterialCommunityIcons
              name={showReview ? 'chevron-up' : 'school-outline'}
              size={20}
              color={colors.error}
            />
            <Text style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.error }}>
              {showReview ? 'Ocultar revisión' : `Revisar ${wrongQuestions.length} error${wrongQuestions.length > 1 ? 'es' : ''} — ¡Aprende!`}
            </Text>
          </TouchableOpacity>

          {showReview && wrongQuestions.map((item, _wIdx) => (
            <View
              key={item.question.id}
              style={[
                neuCardSubtle(colors),
                {
                  marginTop: rs.space(SPACING.md),
                  padding: rs.space(SPACING.md),
                  borderLeftWidth: 3,
                  borderLeftColor: colors.error + '60',
                },
              ]}
            >
              {/* Question number + type */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(6), marginBottom: rs.space(6) }}>
                <View style={{
                  backgroundColor: colors.error + '18',
                  borderRadius: 12,
                  width: 24, height: 24,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: rs.font(11), fontWeight: '800', color: colors.error }}>
                    {item.index + 1}
                  </Text>
                </View>
                <Text style={{ fontSize: rs.font(11), fontWeight: '600', color: colors.textSecondary }}>
                  {item.question.type.charAt(0).toUpperCase() + item.question.type.slice(1)} — {item.question.pathologyName}
                </Text>
              </View>

              {/* Question text */}
              <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text, marginBottom: rs.space(8), lineHeight: 19 }}>
                {item.question.questionText}
              </Text>

              {/* What you answered vs correct */}
              <View style={{
                backgroundColor: colors.quizWrong + '10',
                borderRadius: 8,
                padding: rs.space(8),
                marginBottom: rs.space(6),
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: rs.space(6),
              }}>
                <MaterialCommunityIcons name="close-circle" size={15} color={colors.quizWrong} style={{ marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: rs.font(10), fontWeight: '600', color: colors.quizWrong }}>Tu respuesta:</Text>
                  <Text style={{ fontSize: rs.font(12), color: colors.text }}>
                    {item.userAnswer != null ? item.question.options[item.userAnswer] : 'Sin respuesta'}
                  </Text>
                </View>
              </View>

              <View style={{
                backgroundColor: colors.quizCorrect + '10',
                borderRadius: 8,
                padding: rs.space(8),
                marginBottom: rs.space(8),
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: rs.space(6),
              }}>
                <MaterialCommunityIcons name="check-circle" size={15} color={colors.quizCorrect} style={{ marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: rs.font(10), fontWeight: '600', color: colors.quizCorrect }}>Respuesta correcta:</Text>
                  <Text style={{ fontSize: rs.font(12), fontWeight: '700', color: colors.text }}>
                    {item.question.options[item.question.correctIndex]}
                  </Text>
                </View>
              </View>

              {/* Explanation */}
              <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, lineHeight: 18, marginBottom: rs.space(6) }}>
                {item.question.explanation}
              </Text>

              {/* Clinical pearl in review */}
              {item.question.clinicalPearl && (
                <View style={{
                  backgroundColor: colors.primary + '08',
                  borderRadius: 8,
                  padding: rs.space(8),
                  marginBottom: rs.space(6),
                  flexDirection: 'row',
                  gap: rs.space(6),
                }}>
                  <MaterialCommunityIcons name="lightbulb-outline" size={14} color={colors.primary} style={{ marginTop: 1 }} />
                  <Text style={{ flex: 1, fontSize: rs.font(11), color: colors.primary, lineHeight: 16 }}>
                    {item.question.clinicalPearl}
                  </Text>
                </View>
              )}

              {/* Go to pathology */}
              <TouchableOpacity
                onPress={() => onNavigateToPathology(item.question.pathologyId)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: rs.space(4),
                  paddingVertical: rs.space(6),
                }}
              >
                <MaterialCommunityIcons name="book-open-variant" size={14} color={colors.primary} />
                <Text style={{ fontSize: rs.font(12), fontWeight: '600', color: colors.primary }}>
                  Estudiar {item.question.pathologyName}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Motivational message based on score */}
      <View style={[
        neuCardSubtle(colors),
        {
          width: '100%',
          padding: rs.space(SPACING.md),
          marginBottom: rs.space(SPACING.lg),
          borderLeftWidth: 3,
          borderLeftColor: scoreColor,
        },
      ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(6), marginBottom: rs.space(4) }}>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color={scoreColor} />
          <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: scoreColor }}>
            Consejo de estudio
          </Text>
        </View>
        <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, lineHeight: 18 }}>
          {pct >= 80
            ? 'Dominas bien este tema. Intenta aumentar la dificultad eligiendo otro sistema corporal o mezclando todos los sistemas para un desafío mayor.'
            : pct >= 60
            ? 'Vas por buen camino. Revisá las preguntas que fallaste y entrá a las patologías para reforzar los conceptos que te costaron.'
            : 'No te desanimes — cada error es una oportunidad de aprender. Revisá los errores arriba, estudiá las patologías y volvé a intentar. ¡La repetición es la madre del aprendizaje!'}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          borderRadius: RADIUS.lg,
          paddingVertical: rs.space(SPACING.md),
          paddingHorizontal: rs.space(SPACING.xxxl),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          width: '100%',
        }}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="home-outline"
          size={20}
          color="#FFFFFF"
          style={{ marginRight: rs.space(SPACING.sm) }}
        />
        <Text style={{ fontSize: rs.font(16), fontWeight: '700', color: '#FFFFFF' }}>
          Volver al inicio
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────

export function QuizSessionScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { generateQuiz, saveResult, bodySystems } = useQuiz();

  const { category, questionCount } = route.params;

  // Derive category display name
  const categoryLabel = useMemo(() => {
    if (!category) return 'Todos';
    const sys = bodySystems.find(s => s.id === category);
    return sys?.nombre ?? category;
  }, [category, bodySystems]);

  // Generate session once on mount
  const [session, setSession] = useState<QuizSession | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const resultSaved = useRef(false);

  useEffect(() => {
    const generated = generateQuiz({
      category: category as BodySystemId | undefined,
      questionCount,
    });
    setSession(generated);
  }, [category, questionCount, generateQuiz]);

  // Confirm exit during quiz
  const confirmExit = useCallback(() => {
    Alert.alert(
      'Salir del test',
      '¿Estás seguro? Se perderá tu progreso actual.',
      [
        { text: 'Continuar test', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => navigation.goBack() },
      ],
    );
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: showSummary
        ? undefined
        : () => (
            <TouchableOpacity onPress={confirmExit} style={{ padding: 8 }}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
      gestureEnabled: false,
      title: showSummary ? 'Resultado' : `Pregunta ${(session?.currentIndex ?? 0) + 1}`,
    });
  }, [navigation, showSummary, session?.currentIndex, confirmExit, colors.text]);

  // Android hardware back button — confirm exit during quiz
  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!showSummary) {
        confirmExit();
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, [showSummary, confirmExit]);

  // Answer feedback animation
  const feedbackOpacity = useRef(new Animated.Value(0)).current;

  const showFeedback = useCallback(() => {
    feedbackOpacity.setValue(0);
    Animated.timing(feedbackOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [feedbackOpacity]);

  const handleSelectOption = useCallback(
    (index: number) => {
      if (selectedIndex !== null || !session) return;
      setSelectedIndex(index);
      showFeedback();
    },
    [selectedIndex, session, showFeedback],
  );

  const handleNext = useCallback(() => {
    if (!session) return;

    const updatedAnswers = [...session.answers];
    updatedAnswers[session.currentIndex] = selectedIndex;
    const updatedSession: QuizSession = {
      ...session,
      answers: updatedAnswers,
    };

    const isLastQuestion = session.currentIndex >= session.questions.length - 1;

    if (isLastQuestion) {
      // Compute result
      const totalQ = updatedSession.questions.length;
      const correct = updatedSession.answers.reduce<number>((acc, ans, idx) => {
        return ans === updatedSession.questions[idx].correctIndex ? acc + 1 : acc;
      }, 0);
      const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;

      const result: QuizResult = {
        id: `result_${Date.now()}`,
        totalQuestions: totalQ,
        correctAnswers: correct,
        percentage: pct,
        category: categoryLabel,
        completedAt: Date.now(),
      };

      if (!resultSaved.current) {
        resultSaved.current = true;
        saveResult(result);
      }

      setSession({ ...updatedSession, currentIndex: updatedSession.currentIndex });
      setShowSummary(true);
    } else {
      setSession({
        ...updatedSession,
        currentIndex: updatedSession.currentIndex + 1,
      });
      setSelectedIndex(null);
    }
  }, [session, selectedIndex, categoryLabel, saveResult]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // ── Loading / empty state ─────────────────────────────────────

  if (!session) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <MaterialCommunityIcons name="loading" size={40} color={colors.primary} />
        <Text style={{ marginTop: 12, fontSize: rs.font(14), color: colors.textSecondary }}>
          Generando preguntas...
        </Text>
      </View>
    );
  }

  if (session.questions.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', paddingHorizontal: rs.space(SPACING.xxxl) }}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.textLight} />
        <Text style={{ fontSize: rs.font(16), color: colors.textSecondary, textAlign: 'center', marginTop: rs.space(SPACING.md) }}>
          No se pudieron generar preguntas para esta seleccion.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: rs.space(SPACING.xxl),
            backgroundColor: colors.primary,
            borderRadius: RADIUS.lg,
            paddingVertical: rs.space(SPACING.md),
            paddingHorizontal: rs.space(SPACING.xxl),
          }}
          onPress={handleBack}
        >
          <Text style={{ fontSize: rs.font(15), fontWeight: '700', color: '#FFFFFF' }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Summary ───────────────────────────────────────────────────

  if (showSummary) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar barStyle={colors.background === '#0F172A' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
        <SummaryScreen
          session={session}
          category={categoryLabel}
          onBack={handleBack}
          onNavigateToPathology={(pathologyId) => navigation.navigate('PathologyDetail', { pathologyId })}
          colors={colors}
          rs={rs}
          insets={insets}
        />
      </View>
    );
  }

  // ── Active question ───────────────────────────────────────────

  const currentQ = session.questions[session.currentIndex];
  const hasAnswered = selectedIndex !== null;
  const isCorrect = hasAnswered && selectedIndex === currentQ.correctIndex;

  const styles = createStyles(colors, rs);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={colors.background === '#0F172A' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + rs.space(SPACING.xxxl) },
        ]}
      >
        {/* Progress */}
        <View style={{ marginTop: rs.space(SPACING.md) }}>
          <ProgressBar
            current={session.currentIndex + 1}
            total={session.questions.length}
            colors={colors}
            rs={rs}
          />
        </View>

        {/* Question type badge */}
        <View style={styles.typeBadgeRow}>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: colors.quiz + '18', borderColor: colors.quiz + '35' },
            ]}
          >
            <MaterialCommunityIcons name="brain" size={12} color={colors.quiz} />
            <Text style={[styles.typeBadgeText, { color: colors.quiz }]}>
              {currentQ.type.charAt(0).toUpperCase() + currentQ.type.slice(1)}
            </Text>
          </View>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: colors.primary + '12', borderColor: colors.primary + '25' },
            ]}
          >
            <Text style={[styles.typeBadgeText, { color: colors.primary }]}>
              {currentQ.pathologyName}
            </Text>
          </View>
        </View>

        {/* Question card */}
        <View
          style={[
            neuCard(colors),
            styles.questionCard,
          ]}
        >
          <Text style={styles.questionText}>{currentQ.questionText}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((opt, idx) => (
            <OptionButton
              key={`${currentQ.id}_${idx}`}
              label={opt}
              index={idx}
              selectedIndex={selectedIndex}
              correctIndex={currentQ.correctIndex}
              onPress={handleSelectOption}
              colors={colors}
              rs={rs}
            />
          ))}
        </View>

        {/* ── Educational feedback (shows after answering) ── */}
        {hasAnswered && (
          <Animated.View style={{ opacity: feedbackOpacity }}>
            {/* Result header */}
            <View
              style={[
                neuCardSubtle(colors),
                styles.explanationCard,
                {
                  borderLeftWidth: 3,
                  borderLeftColor: isCorrect ? colors.quizCorrect : colors.quizWrong,
                },
              ]}
            >
              <View style={styles.explanationHeader}>
                <MaterialCommunityIcons
                  name={isCorrect ? 'check-circle' : 'close-circle'}
                  size={18}
                  color={isCorrect ? colors.quizCorrect : colors.quizWrong}
                />
                <Text
                  style={[
                    styles.explanationTitle,
                    { color: isCorrect ? colors.quizCorrect : colors.quizWrong },
                  ]}
                >
                  {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
                </Text>
              </View>

              {/* Show correct answer when wrong */}
              {!isCorrect && (
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  backgroundColor: colors.quizCorrect + '12',
                  borderRadius: 10,
                  padding: rs.space(10),
                  marginBottom: rs.space(8),
                  gap: rs.space(6),
                }}>
                  <MaterialCommunityIcons name="check-circle" size={16} color={colors.quizCorrect} style={{ marginTop: 2 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: rs.font(11), fontWeight: '600', color: colors.quizCorrect, marginBottom: 2 }}>
                      Respuesta correcta:
                    </Text>
                    <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
                      {currentQ.options[currentQ.correctIndex]}
                    </Text>
                  </View>
                </View>
              )}

              {/* Main explanation */}
              <Text style={styles.explanationText}>{currentQ.explanation}</Text>
            </View>

            {/* Clinical pearl — brief definition */}
            {currentQ.clinicalPearl && (
              <View style={[
                neuCardSubtle(colors),
                styles.explanationCard,
                { borderLeftWidth: 3, borderLeftColor: colors.primary },
              ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(6), gap: rs.space(6) }}>
                  <MaterialCommunityIcons name="lightbulb-outline" size={16} color={colors.primary} />
                  <Text style={{ fontSize: rs.font(12), fontWeight: '800', color: colors.primary }}>
                    ¿Sabías que...?
                  </Text>
                </View>
                <Text style={{ fontSize: rs.font(13), color: colors.textSecondary, lineHeight: 19 }}>
                  {currentQ.clinicalPearl}
                </Text>
              </View>
            )}

            {/* Key fact — memorable learning point */}
            {currentQ.keyFact && (
              <View style={[
                neuCardSubtle(colors),
                styles.explanationCard,
                { borderLeftWidth: 3, borderLeftColor: colors.warning || '#F59E0B' },
              ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(6), gap: rs.space(6) }}>
                  <MaterialCommunityIcons name="bookmark-outline" size={16} color={colors.warning || '#F59E0B'} />
                  <Text style={{ fontSize: rs.font(12), fontWeight: '800', color: colors.warning || '#F59E0B' }}>
                    Dato clave
                  </Text>
                </View>
                <Text style={{ fontSize: rs.font(13), color: colors.textSecondary, lineHeight: 19 }}>
                  {currentQ.keyFact}
                </Text>
              </View>
            )}

            {/* Link to pathology detail */}
            <TouchableOpacity
              onPress={() => navigation.navigate('PathologyDetail', { pathologyId: currentQ.pathologyId })}
              activeOpacity={0.7}
              style={[
                neuCardSubtle(colors),
                {
                  marginHorizontal: rs.space(SPACING.lg),
                  marginBottom: rs.space(SPACING.md),
                  padding: rs.space(SPACING.sm),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: rs.space(6),
                },
              ]}
            >
              <MaterialCommunityIcons name="book-open-variant" size={16} color={colors.primary} />
              <Text style={{ fontSize: rs.font(13), fontWeight: '600', color: colors.primary }}>
                Ver patología completa: {currentQ.pathologyName}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={colors.primary} />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Next button */}
        {hasAnswered && (
          <Animated.View style={{ opacity: feedbackOpacity }}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {session.currentIndex >= session.questions.length - 1
                  ? 'Ver resultado'
                  : 'Siguiente pregunta'}
              </Text>
              <MaterialCommunityIcons
                name={
                  session.currentIndex >= session.questions.length - 1
                    ? 'flag-checkered'
                    : 'arrow-right'
                }
                size={20}
                color="#FFFFFF"
                style={{ marginLeft: rs.space(SPACING.sm) }}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
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
    scrollContent: {
      paddingTop: rs.space(SPACING.sm),
    },
    typeBadgeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.sm),
      gap: rs.space(SPACING.sm),
    },
    typeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: RADIUS.pill,
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: rs.space(3),
      borderWidth: 1,
      gap: rs.space(4),
    },
    typeBadgeText: {
      fontSize: rs.font(11),
      fontWeight: '600',
    },
    questionCard: {
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.lg),
      padding: rs.space(SPACING.lg),
    },
    questionText: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
      lineHeight: 24,
    },
    optionsContainer: {
      marginBottom: rs.space(SPACING.md),
    },
    explanationCard: {
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.md),
      padding: rs.space(SPACING.md),
    },
    explanationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.space(SPACING.sm),
      gap: rs.space(SPACING.sm),
    },
    explanationTitle: {
      fontSize: rs.font(14),
      fontWeight: '800',
    },
    explanationText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: 19,
    },
    nextButton: {
      backgroundColor: '#6D28D9',
      borderRadius: RADIUS.lg,
      paddingVertical: rs.space(SPACING.md),
      paddingHorizontal: rs.space(SPACING.xxl),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: rs.space(SPACING.lg),
      elevation: 4,
      shadowColor: '#6D28D9',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    nextButtonText: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });
