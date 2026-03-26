// ============================================================
// PremiumScreen — subscription & activation screen
// ============================================================

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard, neuCardSubtle, neuInset } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import type { ThemeColors } from '../utils/colors';
import type { RootStackParamList } from '../types';

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

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumScreen'>;

const PREMIUM_FEATURES = [
  { icon: 'book-open-variant', text: 'Todas las patologias sin restriccion' },
  { icon: 'heart-multiple', text: 'Favoritos ilimitados' },
  { icon: 'note-multiple', text: 'Notas ilimitadas' },
  { icon: 'brain', text: 'Quiz interactivo completo' },
  { icon: 'scale-balance', text: 'Escalas clinicas completas' },
  { icon: 'flask-outline', text: 'Valores de laboratorio' },
  { icon: 'hospital-building', text: 'Protocolos de emergencia' },
  { icon: 'stethoscope', text: 'Diagnósticos NANDA/NIC/NOC' },
  { icon: 'chart-line', text: 'Dashboard de progreso' },
];

const FREE_FEATURES = [
  { icon: 'book-outline', text: '3 patologias por sistema (33 total)' },
  { icon: 'heart-outline', text: 'Hasta 5 favoritos' },
  { icon: 'note-outline', text: 'Hasta 5 notas' },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function PremiumScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const {
    isPremium, isCodeActivated, isTrialActive, trialDaysLeft, trialExpired,
    isSubscribed, purchasing,
    activateWithCode, restoreSubscription, purchaseSubscription,
  } = usePremium();

  const styles = createStyles(colors, rs);
  const { opacity, translateY } = useFadeIn(380, 40);

  const [code, setCode] = useState('');
  const [activating, setActivating] = useState(false);
  const [activationResult, setActivationResult] = useState<'success' | 'error' | null>(null);

  const handleActivate = useCallback(async () => {
    if (!code.trim()) return;
    setActivating(true);
    setActivationResult(null);
    const ok = await activateWithCode(code.trim());
    setActivationResult(ok ? 'success' : 'error');
    setActivating(false);
    if (ok) setCode('');
  }, [code, activateWithCode]);

  const [restoring, setRestoring] = useState(false);
  const handleRestore = useCallback(async () => {
    setRestoring(true);
    const restored = await restoreSubscription();
    setRestoring(false);
    if (!restored) {
      setActivationResult(null);
    }
  }, [restoreSubscription]);

  // ── Trial / status banner ─────────────────────────────────────

  const renderStatusBanner = () => {
    if (isCodeActivated) {
      return (
        <View style={[styles.statusBanner, { backgroundColor: colors.success + '18', borderColor: colors.success + '40' }]}>
          <MaterialCommunityIcons name="check-decagram" size={rs.font(18)} color={colors.success} />
          <Text style={[styles.statusText, { color: colors.success }]}>
            Activado con codigo de acceso
          </Text>
        </View>
      );
    }
    if (isSubscribed) {
      return (
        <View style={[styles.statusBanner, { backgroundColor: colors.success + '18', borderColor: colors.success + '40' }]}>
          <MaterialCommunityIcons name="crown" size={rs.font(18)} color={colors.success} />
          <Text style={[styles.statusText, { color: colors.success }]}>
            Suscripcion activa
          </Text>
        </View>
      );
    }
    if (isTrialActive) {
      return (
        <View style={[styles.statusBanner, { backgroundColor: colors.primary + '18', borderColor: colors.primary + '40' }]}>
          <MaterialCommunityIcons name="clock-outline" size={rs.font(18)} color={colors.primary} />
          <Text style={[styles.statusText, { color: colors.primary }]}>
            Prueba gratuita: {trialDaysLeft} {trialDaysLeft === 1 ? 'dia' : 'dias'} restantes
          </Text>
        </View>
      );
    }
    return (
      <View style={[styles.statusBanner, { backgroundColor: colors.warning + '18', borderColor: colors.warning + '40' }]}>
        <MaterialCommunityIcons name="clock-alert-outline" size={rs.font(18)} color={colors.warning} />
        <Text style={[styles.statusText, { color: colors.warning }]}>
          Prueba gratuita expirada
        </Text>
      </View>
    );
  };

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
        <Animated.View style={[styles.headerContent, { opacity, transform: [{ translateY }] }]}>
          <View style={styles.starIcon}>
            <MaterialCommunityIcons name="star-circle" size={rs.font(52)} color={colors.gradientText} />
          </View>
          <Text style={styles.headerTitle}>Premium</Text>
          <Text style={styles.headerSubtitle}>Acceso completo a todos los contenidos</Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + rs.space(SPACING.xxxl) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status banner */}
        {renderStatusBanner()}

        {/* Premium features */}
        <View style={[styles.card, neuCard(colors)]}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="star" size={rs.font(18)} color={colors.primary} />
            <Text style={styles.cardTitle}>Con Premium</Text>
          </View>
          {PREMIUM_FEATURES.map((item, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={[styles.featureIconWrap, { backgroundColor: colors.success + '18' }]}>
                <MaterialCommunityIcons name="check" size={rs.font(13)} color={colors.success} />
              </View>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={rs.font(16)}
                color={colors.primary}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Free features */}
        <View style={[styles.card, neuCardSubtle(colors)]}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="lock-open-outline" size={rs.font(18)} color={colors.textSecondary} />
            <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>Version gratuita</Text>
          </View>
          {FREE_FEATURES.map((item, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={[styles.featureIconWrap, { backgroundColor: colors.warning + '18' }]}>
                <MaterialCommunityIcons name="minus" size={rs.font(13)} color={colors.warning} />
              </View>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={rs.font(16)}
                color={colors.textSecondary}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Subscribe button */}
        {!isCodeActivated && !isSubscribed && (
          <View style={{ gap: rs.space(SPACING.sm) }}>
            <TouchableOpacity
              onPress={purchaseSubscription}
              disabled={purchasing}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: RADIUS.lg,
                  paddingVertical: rs.space(18),
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 4,
                }}
              >
                {purchasing ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(8) }}>
                      <MaterialCommunityIcons name="crown" size={rs.font(22)} color="#FFD700" />
                      <Text style={{ fontSize: rs.font(18), fontWeight: '800', color: '#fff' }}>
                        Suscribirse a Premium
                      </Text>
                    </View>
                    <Text style={{ fontSize: rs.font(13), color: 'rgba(255,255,255,0.8)', marginTop: rs.space(4) }}>
                      Suscripcion mensual via Google Play
                      {isTrialActive ? ` · ${trialDaysLeft} dias de prueba restantes` : ''}
                    </Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {trialExpired && (
              <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                gap: rs.space(6), paddingVertical: rs.space(8),
              }}>
                <MaterialCommunityIcons name="alert-circle" size={rs.font(14)} color={colors.error} />
                <Text style={{ fontSize: rs.font(12), color: colors.error, fontWeight: '600' }}>
                  Tu periodo de prueba de 15 dias ha finalizado. Suscribite para continuar.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Activation code */}
        {!isCodeActivated && !isSubscribed && (
          <View style={[styles.card, neuCard(colors)]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="key-variant" size={rs.font(18)} color={colors.primary} />
              <Text style={styles.cardTitle}>Codigo de activacion</Text>
            </View>
            <Text style={styles.activationDescription}>
              Si recibiste un codigo de acceso, ingresalo aqui para activar Premium de forma permanente.
            </Text>
            <View style={[styles.inputRow]}>
              <TextInput
                style={[styles.codeInput, neuInset(colors), { color: colors.text }]}
                value={code}
                onChangeText={setCode}
                placeholder="Ej: ENFER-2024-XXXX"
                placeholderTextColor={colors.textLight}
                autoCapitalize="characters"
                autoCorrect={false}
                editable={!activating}
              />
              <TouchableOpacity
                style={[styles.activateBtn, activating && styles.activateBtnDisabled]}
                onPress={handleActivate}
                disabled={activating || !code.trim()}
                activeOpacity={0.8}
              >
                {activating
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Text style={styles.activateBtnText}>Activar</Text>
                }
              </TouchableOpacity>
            </View>

            {activationResult === 'success' && (
              <View style={[styles.feedbackBanner, { backgroundColor: colors.success + '18', borderColor: colors.success + '40' }]}>
                <MaterialCommunityIcons name="check-circle" size={rs.font(16)} color={colors.success} />
                <Text style={[styles.feedbackText, { color: colors.success }]}>
                  Codigo valido. Premium activado correctamente.
                </Text>
              </View>
            )}
            {activationResult === 'error' && (
              <View style={[styles.feedbackBanner, { backgroundColor: colors.error + '18', borderColor: colors.error + '40' }]}>
                <MaterialCommunityIcons name="close-circle" size={rs.font(16)} color={colors.error} />
                <Text style={[styles.feedbackText, { color: colors.error }]}>
                  Codigo invalido o ya utilizado.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Restore purchase */}
        <TouchableOpacity
          style={[styles.restoreButton, neuCardSubtle(colors)]}
          onPress={handleRestore}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="restore" size={rs.font(17)} color={colors.textSecondary} />
          <Text style={styles.restoreText}>Restaurar compra</Text>
        </TouchableOpacity>
      </ScrollView>
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
    headerContent: {
      alignItems: 'center',
    },
    starIcon: {
      marginBottom: rs.space(SPACING.sm),
    },
    headerTitle: {
      fontSize: rs.font(28),
      fontWeight: '800',
      color: colors.gradientText,
      letterSpacing: -0.5,
      marginBottom: rs.space(4),
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      fontWeight: '500',
      color: colors.gradientText,
      opacity: 0.85,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding: rs.space(SPACING.lg),
      gap: rs.space(SPACING.md),
    },
    statusBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
      paddingVertical: rs.space(SPACING.md),
      paddingHorizontal: rs.space(SPACING.lg),
      borderRadius: RADIUS.md,
      borderWidth: 1,
    },
    statusText: {
      fontSize: rs.font(14),
      fontWeight: '600',
    },
    card: {
      padding: rs.space(SPACING.lg),
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
      marginBottom: rs.space(SPACING.md),
    },
    cardTitle: {
      fontSize: rs.font(16),
      fontWeight: '700',
      color: colors.text,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
      paddingVertical: rs.space(SPACING.xs),
    },
    featureIconWrap: {
      width: rs.space(20),
      height: rs.space(20),
      borderRadius: rs.space(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    featureIcon: {
      width: rs.space(20),
    },
    featureText: {
      flex: 1,
      fontSize: rs.font(14),
      color: colors.text,
      lineHeight: rs.font(20),
    },
    activationDescription: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: rs.font(19),
      marginBottom: rs.space(SPACING.md),
    },
    inputRow: {
      flexDirection: 'row',
      gap: rs.space(SPACING.sm),
      alignItems: 'center',
    },
    codeInput: {
      flex: 1,
      paddingHorizontal: rs.space(SPACING.md),
      paddingVertical: rs.space(SPACING.sm),
      fontSize: rs.font(14),
      fontWeight: '600',
      letterSpacing: 1,
    },
    activateBtn: {
      backgroundColor: colors.primary,
      paddingHorizontal: rs.space(SPACING.lg),
      paddingVertical: rs.space(SPACING.sm),
      borderRadius: RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: rs.space(80),
      elevation: 3,
    },
    activateBtnDisabled: {
      opacity: 0.55,
    },
    activateBtnText: {
      fontSize: rs.font(14),
      fontWeight: '700',
      color: '#FFFFFF',
    },
    feedbackBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
      marginTop: rs.space(SPACING.md),
      paddingVertical: rs.space(SPACING.sm),
      paddingHorizontal: rs.space(SPACING.md),
      borderRadius: RADIUS.sm,
      borderWidth: 1,
    },
    feedbackText: {
      flex: 1,
      fontSize: rs.font(13),
      fontWeight: '500',
    },
    restoreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: rs.space(SPACING.sm),
      padding: rs.space(SPACING.lg),
    },
    restoreText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });
