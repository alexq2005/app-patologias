// ============================================================
// SettingsScreen — App configuration & data management
// ============================================================

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../context/ThemeContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useRecentPathologies } from '../hooks/useRecentPathologies';
import { useQuiz } from '../hooks/useQuiz';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import type { ThemeColors } from '../utils/colors';
import type { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ─────────────────────────────────────────────
// Section components
// ─────────────────────────────────────────────

function SectionHeader({ title, icon, colors, rs }: {
  title: string; icon: string; colors: ThemeColors; rs: ResponsiveScale;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(8), marginBottom: rs.space(SPACING.sm), marginTop: rs.space(SPACING.lg) }}>
      <MaterialCommunityIcons name={icon} size={rs.font(18)} color={colors.primary} />
      <Text style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 }}>{title}</Text>
    </View>
  );
}

function SettingRow({ icon, label, subtitle, onPress, color, destructive, trailing, colors, rs }: {
  icon: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  color?: string;
  destructive?: boolean;
  trailing?: React.ReactNode;
  colors: ThemeColors;
  rs: ResponsiveScale;
}) {
  const iconColor = destructive ? colors.error : (color || colors.text);
  const labelColor = destructive ? colors.error : colors.text;

  return (
    <TouchableOpacity
      style={[neuCard(colors), { flexDirection: 'row', alignItems: 'center', paddingVertical: rs.space(14), paddingHorizontal: rs.space(SPACING.md), marginBottom: rs.space(SPACING.xs), gap: rs.space(12) }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={{ width: rs.space(36), height: rs.space(36), borderRadius: RADIUS.sm, backgroundColor: (destructive ? colors.error : (color || colors.primary)) + '14', alignItems: 'center', justifyContent: 'center' }}>
        <MaterialCommunityIcons name={icon} size={rs.font(20)} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: rs.font(15), fontWeight: '600', color: labelColor }}>{label}</Text>
        {subtitle && <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, marginTop: 2 }}>{subtitle}</Text>}
      </View>
      {trailing || (onPress && <MaterialCommunityIcons name="chevron-right" size={rs.font(20)} color={colors.textLight} />)}
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Theme selector chips
// ─────────────────────────────────────────────

type ThemeMode = 'light' | 'dark' | 'system';

function ThemeChips({ current, onChange, colors, rs }: {
  current: ThemeMode; onChange: (m: ThemeMode) => void; colors: ThemeColors; rs: ResponsiveScale;
}) {
  const modes: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'light', label: 'Claro', icon: 'white-balance-sunny' },
    { mode: 'dark', label: 'Oscuro', icon: 'moon-waning-crescent' },
    { mode: 'system', label: 'Sistema', icon: 'cellphone' },
  ];

  return (
    <View style={[neuCard(colors), { flexDirection: 'row', padding: rs.space(4), marginBottom: rs.space(SPACING.xs), gap: rs.space(4) }]}>
      {modes.map(m => {
        const active = current === m.mode;
        return (
          <TouchableOpacity
            key={m.mode}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: rs.space(6),
              paddingVertical: rs.space(10),
              borderRadius: RADIUS.sm,
              backgroundColor: active ? colors.primary + '18' : 'transparent',
            }}
            onPress={() => onChange(m.mode)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name={m.icon} size={rs.font(16)} color={active ? colors.primary : colors.textSecondary} />
            <Text style={{ fontSize: rs.font(13), fontWeight: active ? '700' : '500', color: active ? colors.primary : colors.textSecondary }}>
              {m.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────

export function SettingsScreen() {
  const { colors, themeMode, setThemeMode, isDark } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { favoriteCount, clearFavorites } = useFavoritesContext();
  const { noteCount } = useNotesContext();
  const { pathologies } = usePathologyData();
  const { history, clearHistory: clearSearchHistory } = useSearchHistory();
  const { recent, clearRecent } = useRecentPathologies();
  const { results, totalSessions, clearResults: clearQuizResults } = useQuiz();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const confirmAction = useCallback((title: string, message: string, action: () => void) => {
    Alert.alert(title, message, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: action },
    ]);
  }, []);

  const handleClearSearchHistory = useCallback(() => {
    confirmAction(
      'Limpiar historial de busqueda',
      `Se eliminaran ${history.length} busquedas guardadas.`,
      clearSearchHistory,
    );
  }, [confirmAction, clearSearchHistory, history.length]);

  const handleClearRecent = useCallback(() => {
    confirmAction(
      'Limpiar recientes',
      `Se eliminaran ${recent.length} patologias visitadas recientemente.`,
      clearRecent,
    );
  }, [confirmAction, clearRecent, recent.length]);

  const handleClearQuizHistory = useCallback(() => {
    confirmAction(
      'Limpiar historial de quiz',
      `Se eliminaran los resultados de ${totalSessions} sesiones de quiz.`,
      clearQuizResults,
    );
  }, [confirmAction, clearQuizResults, totalSessions]);

  const handleClearFavorites = useCallback(() => {
    confirmAction(
      'Eliminar todos los favoritos',
      `Se eliminaran ${favoriteCount} patologias de favoritos. Esta accion no se puede deshacer.`,
      clearFavorites,
    );
  }, [confirmAction, clearFavorites, favoriteCount]);

  const handleResetOnboarding = useCallback(() => {
    Alert.alert(
      'Resetear bienvenida',
      'La proxima vez que abras la app veras la pantalla de bienvenida.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetear',
          onPress: () => {
            AsyncStorage.removeItem('@patologias_onboarding_complete');
            Alert.alert('Listo', 'Reinicia la app para ver el onboarding.');
          },
        },
      ],
    );
  }, []);

  const handleClearAll = useCallback(() => {
    Alert.alert(
      'Borrar todos los datos',
      'Se eliminaran favoritos, notas, historial de busqueda, recientes y resultados de quiz. Esta accion NO se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar todo',
          style: 'destructive',
          onPress: () => {
            clearFavorites();
            clearSearchHistory();
            clearRecent();
            clearQuizResults();
            AsyncStorage.removeItem('@patologias_onboarding_complete');
            Alert.alert('Datos eliminados', 'Todos los datos de usuario han sido borrados.');
          },
        },
      ],
    );
  }, [clearFavorites, clearSearchHistory, clearRecent, clearQuizResults]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + rs.space(40) }]}
      >
        {/* ── Apariencia ─────────────────────── */}
        <SectionHeader title="Apariencia" icon="palette-outline" colors={colors} rs={rs} />
        <ThemeChips current={themeMode} onChange={setThemeMode} colors={colors} rs={rs} />

        {/* ── Estadisticas ─────────────────────── */}
        <SectionHeader title="Tus datos" icon="database-outline" colors={colors} rs={rs} />
        <View style={[neuCard(colors), { padding: rs.space(SPACING.md), marginBottom: rs.space(SPACING.xs), gap: rs.space(SPACING.sm) }]}>
          <StatRow icon="book-open-page-variant" label="Patologias" value={`${pathologies.length}`} colors={colors} rs={rs} />
          <StatRow icon="heart" label="Favoritos" value={`${favoriteCount}`} colors={colors} rs={rs} />
          <StatRow icon="note-text" label="Notas" value={`${noteCount}`} colors={colors} rs={rs} />
          <StatRow icon="head-question" label="Quizzes completados" value={`${totalSessions}`} colors={colors} rs={rs} />
          <StatRow icon="magnify" label="Busquedas guardadas" value={`${history.length}`} colors={colors} rs={rs} />
          <StatRow icon="clock-outline" label="Recientes" value={`${recent.length}`} colors={colors} rs={rs} />
        </View>

        {/* ── Limpiar datos ────────────────────── */}
        <SectionHeader title="Gestionar datos" icon="broom" colors={colors} rs={rs} />
        <SettingRow
          icon="magnify-close"
          label="Limpiar historial de busqueda"
          subtitle={`${history.length} busquedas`}
          onPress={history.length > 0 ? handleClearSearchHistory : undefined}
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="clock-remove-outline"
          label="Limpiar recientes"
          subtitle={`${recent.length} patologias`}
          onPress={recent.length > 0 ? handleClearRecent : undefined}
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="head-remove-outline"
          label="Limpiar historial de quiz"
          subtitle={`${totalSessions} sesiones`}
          onPress={totalSessions > 0 ? handleClearQuizHistory : undefined}
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="heart-remove-outline"
          label="Eliminar todos los favoritos"
          subtitle={`${favoriteCount} favoritos`}
          onPress={favoriteCount > 0 ? handleClearFavorites : undefined}
          destructive={favoriteCount > 0}
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="restart"
          label="Resetear bienvenida"
          subtitle="Volver a mostrar el onboarding"
          onPress={handleResetOnboarding}
          colors={colors} rs={rs}
        />

        {/* ── Zona de peligro ────────────────── */}
        <SectionHeader title="Zona de peligro" icon="alert-circle-outline" colors={colors} rs={rs} />
        <SettingRow
          icon="delete-forever-outline"
          label="Borrar todos los datos"
          subtitle="Favoritos, notas, historial, quiz, onboarding"
          onPress={handleClearAll}
          destructive
          colors={colors} rs={rs}
        />

        {/* ── Acerca de ─────────────────────── */}
        <SectionHeader title="Informacion" icon="information-outline" colors={colors} rs={rs} />
        <SettingRow
          icon="information-outline"
          label="Acerca de"
          onPress={() => navigation.navigate('AboutScreen')}
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="shield-lock-outline"
          label="Politica de Privacidad"
          onPress={() => navigation.navigate('PrivacyPolicy')}
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="file-document-outline"
          label="Terminos de Uso"
          onPress={() => navigation.navigate('Terms')}
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="tag-outline"
          label="Version"
          subtitle="1.0.0"
          colors={colors} rs={rs}
        />
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
// Stat row inside the stats card
// ─────────────────────────────────────────────

function StatRow({ icon, label, value, colors, rs }: {
  icon: string; label: string; value: string; colors: ThemeColors; rs: ResponsiveScale;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(10) }}>
      <MaterialCommunityIcons name={icon} size={rs.font(18)} color={colors.primary} />
      <Text style={{ flex: 1, fontSize: rs.font(14), color: colors.textSecondary }}>{label}</Text>
      <Text style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.text }}>{value}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scrollContent: {
      paddingHorizontal: rs.space(SPACING.md),
      paddingTop: rs.space(SPACING.md),
    },
  });
