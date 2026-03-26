// ============================================================
// ToolsScreen — Feature grid (Tab 5)
// ============================================================

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import type { ThemeColors } from '../utils/colors';
import type { RootStackParamList, TabParamList } from '../types';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Herramientas'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ToolItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  route: keyof RootStackParamList | keyof TabParamList;
  premium: boolean;
}

const TOOLS: ToolItem[] = [
  { id: 'quiz', label: 'Test de Patologias', icon: 'head-question-outline', color: '#7C3AED', route: 'QuizScreen', premium: true },
  { id: 'scales', label: 'Escalas Clinicas', icon: 'chart-timeline-variant-shimmer', color: '#B45309', route: 'Escalas', premium: true },
  { id: 'lab', label: 'Valores Lab', icon: 'flask-outline', color: '#059669', route: 'LabValues', premium: true },
  { id: 'protocols', label: 'Protocolos', icon: 'hospital-box-outline', color: '#DC2626', route: 'EmergencyProtocols', premium: true },
  { id: 'nanda', label: 'NANDA-NIC-NOC', icon: 'clipboard-check-outline', color: '#2563EB', route: 'NandaScreen', premium: true },
  { id: 'dashboard', label: 'Mi Progreso', icon: 'chart-arc', color: '#8B5CF6', route: 'Dashboard', premium: true },
  { id: 'favorites', label: 'Mis Favoritos', icon: 'heart-outline', color: '#EC4899', route: 'AllFavorites', premium: false },
  { id: 'notes', label: 'Mis Notas', icon: 'note-text-outline', color: '#F59E0B', route: 'AllNotes', premium: false },
  { id: 'premium', label: 'Premium', icon: 'star-four-points-outline', color: '#6D28D9', route: 'PremiumScreen', premium: false },
  { id: 'settings', label: 'Configuracion', icon: 'cog-outline', color: '#4B5563', route: 'SettingsScreen', premium: false },
];

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

export function ToolsScreen() {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const { opacity, translateY } = useFadeIn(380, 60);

  const handlePress = useCallback(
    (tool: ToolItem) => {
      navigation.navigate(tool.route as any);
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + rs.space(SPACING.lg) }]}
      >
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Text style={styles.headerTitle}>Herramientas</Text>
          <Text style={styles.headerSubtitle}>Recursos clinicos y de estudio</Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + rs.space(80) }]}
      >
        <View style={styles.grid}>
          {TOOLS.map(tool => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.toolCard, neuCard(colors)]}
              onPress={() => handlePress(tool)}
              activeOpacity={0.75}
            >
              <View style={[styles.toolIconWrap, { backgroundColor: tool.color + '18' }]}>
                <MaterialCommunityIcons name={tool.icon} size={rs.font(26)} color={tool.color} />
              </View>
              <Text style={styles.toolLabel} numberOfLines={2}>{tool.label}</Text>
              {tool.premium && (
                <View style={[styles.premiumBadge, { backgroundColor: colors.primary + '18' }]}>
                  <MaterialCommunityIcons name="star" size={10} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
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
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: rs.space(SPACING.md),
      gap: rs.space(SPACING.md),
    },
    toolCard: {
      width: '30%',
      flexGrow: 1,
      flexBasis: rs.space(100),
      maxWidth: '48%',
      alignItems: 'center',
      paddingVertical: rs.space(SPACING.lg),
      paddingHorizontal: rs.space(SPACING.sm),
      gap: rs.space(SPACING.sm),
      position: 'relative',
    },
    toolIconWrap: {
      width: rs.space(52),
      height: rs.space(52),
      borderRadius: RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    toolLabel: {
      fontSize: rs.font(12),
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
      lineHeight: rs.font(16),
    },
    premiumBadge: {
      position: 'absolute',
      top: rs.space(SPACING.sm),
      right: rs.space(SPACING.sm),
      width: 18,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
