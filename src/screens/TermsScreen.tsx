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
import { neuCard } from '../utils/neumorphism';
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
    title: '1. Aceptacion de los terminos',
    content:
      'Al descargar, instalar o usar la aplicacion Patologias de Enfermeria, aceptas estar sujeto ' +
      'a estos Terminos y Condiciones. Si no estas de acuerdo con alguna parte de estos terminos, ' +
      'no debes usar la aplicacion.',
  },
  {
    title: '2. Descargo de responsabilidad medica (IMPORTANTE)',
    content:
      'AVISO LEGAL CRITICO: Esta aplicacion es exclusivamente una herramienta de REFERENCIA EDUCATIVA ' +
      'para estudiantes y profesionales de enfermeria.\n\n' +
      '• La informacion NO reemplaza el criterio clinico profesional\n' +
      '• NO debe utilizarse como unica fuente para tomar decisiones clinicas\n' +
      '• NO reemplaza la evaluacion medica ni el diagnostico profesional\n' +
      '• Las dosis, protocolos y guias pueden variar segun la institucion\n' +
      '• Siempre consulta fuentes primarias y guias institucionales vigentes\n\n' +
      'El uso de esta aplicacion en situaciones de emergencia o como guia clinica unica ' +
      'es responsabilidad exclusiva del usuario.',
  },
  {
    title: '3. Uso permitido',
    content:
      'Esta aplicacion esta disenada para:\n' +
      '• Estudio academico de enfermeria y ciencias de la salud\n' +
      '• Referencia rapida para profesionales de enfermeria capacitados\n' +
      '• Preparacion para examenes y evaluaciones clinicas\n' +
      '• Repaso de contenidos de enfermeria\n\n' +
      'Queda estrictamente prohibido el uso de esta aplicacion para diagnosticar, ' +
      'tratar o prescribir tratamientos a pacientes sin la supervision de un profesional de la salud certificado.',
  },
  {
    title: '4. Exactitud del contenido',
    content:
      'Nos esforzamos por mantener el contenido actualizado y preciso, basandonos en guias clinicas ' +
      'y literatura medica vigente. Sin embargo, la medicina es una ciencia en constante evolucion. ' +
      'No garantizamos que toda la informacion este completa, actualizada o libre de errores. ' +
      'El usuario asume la responsabilidad de verificar la informacion con fuentes actualizadas.',
  },
  {
    title: '5. Propiedad intelectual',
    content:
      'Todo el contenido de esta aplicacion, incluyendo textos, datos clinicos, diagramas, ' +
      'iconos y codigo fuente, esta protegido por derechos de autor. ' +
      'No esta permitido reproducir, distribuir, modificar o crear obras derivadas ' +
      'sin el consentimiento expreso por escrito del desarrollador.',
  },
  {
    title: '6. Acceso Premium',
    content:
      'La aplicacion ofrece funcionalidades adicionales mediante acceso Premium, ya sea ' +
      'a traves de periodo de prueba gratuito, codigo de activacion o suscripcion. ' +
      'El acceso Premium es personal e intransferible. ' +
      'No se ofrecen reembolsos salvo que la politica de la tienda de aplicaciones lo exija.',
  },
  {
    title: '7. Limitacion de responsabilidad',
    content:
      'En la maxima medida permitida por la ley aplicable, el desarrollador no sera responsable ' +
      'por danos directos, indirectos, incidentales o consecuentes que resulten del uso o ' +
      'incapacidad de uso de la aplicacion, incluyendo decisiones clinicas tomadas en base ' +
      'al contenido de la misma.',
  },
  {
    title: '8. Modificaciones',
    content:
      'Nos reservamos el derecho de modificar estos Terminos y Condiciones en cualquier momento. ' +
      'Los cambios significativos seran comunicados mediante actualizaciones de la aplicacion. ' +
      'El uso continuado de la aplicacion despues de dichos cambios implica la aceptacion de los nuevos terminos.',
  },
  {
    title: '9. Ley aplicable',
    content:
      'Estos terminos se rigen por las leyes de la Republica Argentina. ' +
      'Cualquier disputa sera resuelta por los tribunales competentes de la Ciudad Autonoma de Buenos Aires.',
  },
  {
    title: '10. Contacto',
    content:
      'Para consultas sobre estos terminos, contactanos en: alexq2005@gmail.com',
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
