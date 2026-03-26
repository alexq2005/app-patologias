// ============================================================
// AboutScreen — app info, stats, links
// ============================================================

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
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

type Props = NativeStackScreenProps<RootStackParamList, 'AboutScreen'>;

const APP_VERSION = '1.0.0';
const CONTACT_EMAIL = 'soporte@patologiasenfermeria.app';

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function AboutScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { pathologyCount, bodySystems, scales } = usePathologyData();

  const styles = createStyles(colors, rs);
  const { opacity, translateY } = useFadeIn(380, 40);

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_EMAIL}`).catch(() => {});
  };

  const handlePrivacy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTerms = () => {
    navigation.navigate('Terms');
  };

  const handleRate = () => {
    // Placeholder — replace with actual store URL
    Linking.openURL('market://details?id=com.patologiasenfermeria').catch(() => {});
  };

  const stats = [
    { icon: 'book-open-variant', value: String(pathologyCount), label: 'Patologias' },
    { icon: 'human-handsup', value: String(bodySystems.length), label: 'Sistemas corporales' },
    { icon: 'scale-balance', value: String(scales.length), label: 'Escalas clinicas' },
  ];

  const links = [
    { icon: 'shield-lock-outline', label: 'Politica de privacidad', onPress: handlePrivacy },
    { icon: 'file-document-outline', label: 'Terminos y condiciones', onPress: handleTerms },
    { icon: 'star-outline', label: 'Calificar la app', onPress: handleRate },
    { icon: 'email-outline', label: CONTACT_EMAIL, onPress: handleEmail },
  ];

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
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="medical-bag" size={rs.font(52)} color={colors.gradientText} />
          </View>
          <Text style={styles.appName}>Patologias de Enfermeria</Text>
          <Text style={styles.appVersion}>Version {APP_VERSION}</Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + rs.space(SPACING.xxxl) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <View style={[styles.card, neuCard(colors)]}>
          <Text style={styles.description}>
            Aplicacion de referencia clinica para estudiantes y profesionales de enfermeria.
            Incluye patologias detalladas con fisiopatologia, cuidados de enfermeria, diagnosticos
            NANDA/NIC/NOC, escalas clinicas, valores de laboratorio y protocolos de emergencia.
            Funciona completamente sin conexion a internet.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={[styles.statCard, neuCardSubtle(colors)]}>
              <MaterialCommunityIcons name={s.icon as any} size={rs.font(24)} color={colors.primary} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Links */}
        <View style={[styles.card, neuCard(colors)]}>
          <Text style={styles.sectionTitle}>Informacion</Text>
          {links.map((link, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.linkRow, i < links.length - 1 && styles.linkRowBorder]}
              onPress={link.onPress}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name={link.icon as any} size={rs.font(18)} color={colors.primary} />
              <Text style={styles.linkText}>{link.label}</Text>
              <MaterialCommunityIcons name="chevron-right" size={rs.font(18)} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <MaterialCommunityIcons name="heart" size={rs.font(16)} color={colors.accent} />
          <Text style={styles.footerText}>Hecho con amor para enfermeria</Text>
          <MaterialCommunityIcons name="heart" size={rs.font(16)} color={colors.accent} />
        </View>
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
    logoCircle: {
      width: rs.space(88),
      height: rs.space(88),
      borderRadius: rs.space(44),
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rs.space(SPACING.md),
    },
    appName: {
      fontSize: rs.font(22),
      fontWeight: '800',
      color: colors.gradientText,
      letterSpacing: -0.3,
      textAlign: 'center',
      marginBottom: rs.space(4),
    },
    appVersion: {
      fontSize: rs.font(13),
      fontWeight: '500',
      color: colors.gradientText,
      opacity: 0.8,
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
    description: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      lineHeight: rs.font(22),
    },
    statsRow: {
      flexDirection: 'row',
      gap: rs.space(SPACING.sm),
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: rs.space(SPACING.lg),
      paddingHorizontal: rs.space(SPACING.sm),
      gap: rs.space(SPACING.xs),
    },
    statValue: {
      fontSize: rs.font(22),
      fontWeight: '800',
      color: colors.text,
    },
    statLabel: {
      fontSize: rs.font(11),
      color: colors.textSecondary,
      textAlign: 'center',
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
      marginBottom: rs.space(SPACING.sm),
    },
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.md),
      paddingVertical: rs.space(SPACING.md),
    },
    linkRowBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
    },
    linkText: {
      flex: 1,
      fontSize: rs.font(14),
      color: colors.text,
      fontWeight: '500',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: rs.space(SPACING.sm),
      paddingVertical: rs.space(SPACING.xl),
    },
    footerText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      fontWeight: '500',
      fontStyle: 'italic',
    },
  });
