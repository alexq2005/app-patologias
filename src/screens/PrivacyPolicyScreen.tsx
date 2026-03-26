// ============================================================
// PrivacyPolicyScreen — privacy policy text
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

type Props = NativeStackScreenProps<RootStackParamList, 'PrivacyPolicy'>;

// ─────────────────────────────────────────────
// Content sections
// ─────────────────────────────────────────────

const SECTIONS = [
  {
    title: '1. Informacion que recopilamos',
    content:
      'Patologias de Enfermeria es una aplicacion que funciona completamente sin conexion a internet (offline). ' +
      'No recopilamos, transmitimos ni almacenamos ningun dato personal en servidores externos. ' +
      'Toda la informacion que generas (favoritos, notas, historial de quiz, configuracion de tema) ' +
      'se guarda exclusivamente en el almacenamiento local de tu dispositivo.',
  },
  {
    title: '2. Datos almacenados localmente',
    content:
      'La aplicacion almacena de forma local en tu dispositivo:\n' +
      '• Patologias marcadas como favoritas\n' +
      '• Notas personales por patologia\n' +
      '• Historial de sesiones de quiz y resultados\n' +
      '• Preferencia de tema visual (claro/oscuro)\n' +
      '• Estado de activacion del acceso Premium\n' +
      '• Historial de patologias recientemente visitadas\n\n' +
      'Estos datos nunca son enviados a ningun servidor externo.',
  },
  {
    title: '3. Permisos del dispositivo',
    content:
      'La aplicacion no solicita permisos de camara, microfono, ubicacion, contactos ni acceso a archivos. ' +
      'Unicamente utiliza almacenamiento de preferencias del sistema (AsyncStorage) para persistir ' +
      'tu configuracion entre sesiones.',
  },
  {
    title: '4. Servicios de terceros',
    content:
      'La aplicacion no integra servicios de analisis (Analytics), publicidad, rastreo de comportamiento ' +
      'ni redes sociales. No se comparte informacion con terceros de ninguna forma.',
  },
  {
    title: '5. Seguridad de los datos',
    content:
      'Dado que todos los datos se almacenan localmente en tu dispositivo, la seguridad de los mismos ' +
      'depende de las medidas de seguridad de tu dispositivo (codigo PIN, patron, biometria). ' +
      'Te recomendamos mantener tu dispositivo protegido con una contrasena o bloqueo de pantalla.',
  },
  {
    title: '6. Eliminacion de datos',
    content:
      'Puedes eliminar todos los datos generados por la aplicacion en cualquier momento ' +
      'desinstalando la aplicacion de tu dispositivo. Esto borrara permanentemente ' +
      'favoritos, notas, historial de quiz y configuracion almacenados localmente.',
  },
  {
    title: '7. Menores de edad',
    content:
      'Esta aplicacion esta diseñada para estudiantes y profesionales de enfermeria. ' +
      'No esta orientada a menores de 13 años. Si eres menor de esa edad, ' +
      'te solicitamos que uses la aplicacion bajo supervision de un adulto.',
  },
  {
    title: '8. Cambios a esta politica',
    content:
      'Podemos actualizar esta Politica de Privacidad periodicamente. ' +
      'Los cambios significativos seran comunicados mediante actualizaciones de la aplicacion. ' +
      'Te recomendamos revisar esta seccion ocasionalmente.',
  },
  {
    title: '9. Contacto',
    content:
      'Si tienes preguntas sobre esta Politica de Privacidad o sobre el manejo de tus datos, ' +
      'puedes contactarnos en: alexq2005@gmail.com',
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function PrivacyPolicyScreen({ navigation }: Props) {
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
          <Text style={styles.headerTitle}>Politica de Privacidad</Text>
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
        {/* Intro */}
        <View style={[styles.introCard, neuCard(colors)]}>
          <View style={styles.offlineRow}>
            <MaterialCommunityIcons name="wifi-off" size={rs.font(20)} color={colors.success} />
            <Text style={[styles.offlineBadge, { color: colors.success }]}>
              App 100% offline — sin envio de datos
            </Text>
          </View>
          <Text style={styles.introText}>
            Tu privacidad es importante para nosotros. Esta politica explica como Patologias de
            Enfermeria maneja la informacion en tu dispositivo.
          </Text>
        </View>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
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
    introCard: {
      padding: rs.space(SPACING.lg),
      gap: rs.space(SPACING.md),
    },
    offlineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
    },
    offlineBadge: {
      fontSize: rs.font(13),
      fontWeight: '700',
    },
    introText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
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
