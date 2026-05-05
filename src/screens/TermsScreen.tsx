// ============================================================
// TermsScreen — terms and conditions of use
// ============================================================

import React, { useRef, useEffect } from 'react';
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
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { SPACING } from '../utils/spacing';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;

// ─────────────────────────────────────────────
// Content sections
// ─────────────────────────────────────────────

const SECTIONS = [
  {
    title: '1. Aceptación de los términos',
    content:
      'Al descargar, instalar o usar la aplicación Patologías de Enfermería, aceptas estar sujeto ' +
      'a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, ' +
      'no debes usar la aplicación.',
  },
  {
    title: '2. Descargo de responsabilidad médica (IMPORTANTE)',
    content:
      'AVISO LEGAL CRÍTICO: Esta aplicación es exclusivamente una herramienta de REFERENCIA EDUCATIVA ' +
      'para estudiantes y profesionales de enfermería.\n\n' +
      '• La información NO reemplaza el criterio clínico profesional\n' +
      '• NO debe utilizarse como única fuente para tomar decisiones clínicas\n' +
      '• NO reemplaza la evaluación médica ni el diagnóstico profesional\n' +
      '• Las dosis, protocolos y guías pueden variar según la institución\n' +
      '• Siempre consulta fuentes primarias y guías institucionales vigentes\n\n' +
      'El uso de esta aplicación en situaciones de emergencia o como guía clínica única ' +
      'es responsabilidad exclusiva del usuario.',
  },
  {
    title: '3. Uso permitido',
    content:
      'Esta aplicación está diseñada para:\n' +
      '• Estudio académico de enfermería y ciencias de la salud\n' +
      '• Referencia rápida para profesionales de enfermería capacitados\n' +
      '• Preparación para exámenes y evaluaciones clínicas\n' +
      '• Repaso de contenidos de enfermería\n\n' +
      'Queda estrictamente prohibido el uso de esta aplicación para diagnosticar, ' +
      'tratar o prescribir tratamientos a pacientes sin la supervisión de un profesional de la salud certificado.',
  },
  {
    title: '4. Exactitud del contenido',
    content:
      'Nos esforzamos por mantener el contenido actualizado y preciso, basándonos en guías clínicas ' +
      'y literatura médica vigente. Sin embargo, la medicina es una ciencia en constante evolución. ' +
      'No garantizamos que toda la información esté completa, actualizada o libre de errores. ' +
      'El usuario asume la responsabilidad de verificar la información con fuentes actualizadas.',
  },
  {
    title: '5. Propiedad intelectual',
    content:
      'Todo el contenido de esta aplicación, incluyendo textos, datos clínicos, diagramas, ' +
      'íconos y código fuente, está protegido por derechos de autor. ' +
      'No está permitido reproducir, distribuir, modificar o crear obras derivadas ' +
      'sin el consentimiento expreso por escrito del desarrollador.',
  },
  {
    title: '6. Acceso Premium',
    content:
      'La aplicación ofrece funcionalidades adicionales mediante acceso Premium, ya sea ' +
      'a través de período de prueba gratuito, código de activación o suscripción. ' +
      'El acceso Premium es personal e intransferible. ' +
      'No se ofrecen reembolsos salvo que la política de la tienda de aplicaciones lo exija.',
  },
  {
    title: '7. Limitación de responsabilidad',
    content:
      'En la máxima medida permitida por la ley aplicable, el desarrollador no será responsable ' +
      'por daños directos, indirectos, incidentales o consecuentes que resulten del uso o ' +
      'incapacidad de uso de la aplicación, incluyendo decisiones clínicas tomadas en base ' +
      'al contenido de la misma.',
  },
  {
    title: '8. Modificaciones',
    content:
      'Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. ' +
      'Los cambios significativos serán comunicados mediante actualizaciones de la aplicación. ' +
      'El uso continuado de la aplicación después de dichos cambios implica la aceptación de los nuevos términos.',
  },
  {
    title: '9. Ley aplicable',
    content:
      'Estos términos se rigen por las leyes de la República Argentina. ' +
      'Cualquier disputa será resuelta por los tribunales competentes de la Ciudad Autónoma de Buenos Aires.',
  },
  {
    title: '10. Contacto',
    content:
      'Para consultas sobre estos términos, contáctanos en: alexq2005@gmail.com',
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function TermsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();

  const styles = createStyles(colors, rs);
  const { opacity, translateY } = useFadeIn(380, 40);

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
          <Text style={styles.headerTitle}>Terminos y Condiciones</Text>
          <Text style={styles.headerSubtitle}>Ultima actualizacion: Marzo 2026</Text>
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
        {/* Medical disclaimer highlight */}
        <View style={[styles.disclaimerCard, { borderColor: colors.warning + '50', backgroundColor: colors.warning + '10' }]}>
          <View style={styles.disclaimerHeader}>
            <MaterialCommunityIcons name="alert-circle" size={rs.font(22)} color={colors.warning} />
            <Text style={[styles.disclaimerTitle, { color: colors.warning }]}>
              Aviso Medico Importante
            </Text>
          </View>
          <Text style={[styles.disclaimerText, { color: colors.text }]}>
            Esta aplicacion es una herramienta educativa de referencia. NO reemplaza el juicio
            clinico profesional ni el diagnostico medico. Siempre consulta con un profesional
            de la salud calificado para decisiones clinicas.
          </Text>
        </View>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={[styles.sectionTitle, section.title.includes('IMPORTANTE') && { color: colors.warning }]}>
              {section.title}
            </Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
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
    headerTitle: {
      fontSize: rs.font(22),
      fontWeight: '800',
      color: colors.gradientText,
      letterSpacing: -0.3,
      marginBottom: rs.space(4),
    },
    headerSubtitle: {
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
    disclaimerCard: {
      padding: rs.space(SPACING.lg),
      borderRadius: 14,
      borderWidth: 1.5,
      gap: rs.space(SPACING.sm),
    },
    disclaimerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
    },
    disclaimerTitle: {
      fontSize: rs.font(15),
      fontWeight: '800',
    },
    disclaimerText: {
      fontSize: rs.font(14),
      lineHeight: rs.font(21),
    },
    section: {
      gap: rs.space(SPACING.sm),
    },
    sectionTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
    },
    sectionContent: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      lineHeight: rs.font(22),
    },
  });
