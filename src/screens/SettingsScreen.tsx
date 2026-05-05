// ============================================================
// SettingsScreen — App configuration & data management
// ============================================================

import React, { useCallback, useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  Animated,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useRecentPathologies } from '../hooks/useRecentPathologies';
import { useQuiz } from '../hooks/useQuiz';
import { useDataInfo, formatRelativeTime } from '../hooks/useDataInfo';
import { APP_VERSION } from '../config/appInfo';
import { isFeatureEnabled } from '../config/features';
import { syncContent } from '../services/contentSync';
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
  const { isPremium, isCodeActivated, activateWithCode } = usePremium();
  const { favoriteCount, clearFavorites } = useFavoritesContext();
  const { noteCount } = useNotesContext();
  const { pathologies } = usePathologyData();
  const { history, clearHistory: clearSearchHistory } = useSearchHistory();
  const { recent, clearRecent } = useRecentPathologies();
  const { results, totalSessions, clearResults: clearQuizResults } = useQuiz();
  const dataInfo = useDataInfo();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  // ── "Datos clínicos" subtitle: shows dataset version + relative sync time ─
  const dataSubtitle = useMemo(() => {
    const versionLabel = `v${dataInfo.dataVersion}`;
    if (dataInfo.lastSyncedAt === null) {
      return dataInfo.dataVersion === 1
        ? `${versionLabel} · versión inicial`
        : versionLabel;
    }
    const relative = formatRelativeTime(dataInfo.lastSyncedAt);
    const verb = dataInfo.dataVersion === 1 ? 'verificado' : 'actualizado';
    return `${versionLabel} · ${verb} ${relative}`;
  }, [dataInfo]);

  // ── "Buscar actualización" handler — only wired when OTA flag is on ─
  const otaEnabled = isFeatureEnabled('contentOTA');
  const [syncing, setSyncing] = useState(false);

  const handleSyncNow = useCallback(async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      const result = await syncContent({ force: true });
      dataInfo.refresh();
      if (result.status === 'updated') {
        Alert.alert('Datos actualizados', `Versión nueva: v${result.to}`);
      } else if (result.status === 'no-update') {
        Alert.alert('Sin cambios', 'Tu app ya tiene la última versión disponible.');
      } else if (result.status === 'error') {
        Alert.alert('No se pudo actualizar', result.reason);
      }
      // 'disabled' and 'throttled' are unreachable here: button is gated by
      // otaEnabled, and we always pass force: true.
    } finally {
      setSyncing(false);
    }
  }, [syncing, dataInfo]);

  // ── Easter egg: tap version 5 times ───────
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockError, setUnlockError] = useState(false);

  const handleVersionTap = useCallback(() => {
    if (isCodeActivated) return;
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => { tapCountRef.current = 0; }, 2000);
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      setUnlockCode('');
      setUnlockError(false);
      setShowUnlockModal(true);
    }
  }, [isCodeActivated]);

  const handleUnlockSubmit = useCallback(async () => {
    const success = await activateWithCode(unlockCode);
    if (success) {
      setShowUnlockModal(false);
      setUnlockCode('');
      Alert.alert('Premium activado', 'Todas las patologías han sido desbloqueadas.');
    } else {
      setUnlockError(true);
    }
  }, [unlockCode, activateWithCode]);

  const confirmAction = useCallback((title: string, message: string, action: () => void) => {
    Alert.alert(title, message, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: action },
    ]);
  }, []);

  const handleClearSearchHistory = useCallback(() => {
    confirmAction(
      'Limpiar historial de búsqueda',
      `Se eliminarán ${history.length} búsquedas guardadas.`,
      clearSearchHistory,
    );
  }, [confirmAction, clearSearchHistory, history.length]);

  const handleClearRecent = useCallback(() => {
    confirmAction(
      'Limpiar recientes',
      `Se eliminarán ${recent.length} patologías visitadas recientemente.`,
      clearRecent,
    );
  }, [confirmAction, clearRecent, recent.length]);

  const handleClearQuizHistory = useCallback(() => {
    confirmAction(
      'Limpiar historial de quiz',
      `Se eliminarán los resultados de ${totalSessions} sesiones de quiz.`,
      clearQuizResults,
    );
  }, [confirmAction, clearQuizResults, totalSessions]);

  const handleClearFavorites = useCallback(() => {
    confirmAction(
      'Eliminar todos los favoritos',
      `Se eliminarán ${favoriteCount} patologías de favoritos. Esta acción no se puede deshacer.`,
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
      'Se eliminarán favoritos, notas, historial de búsqueda, recientes y resultados de quiz. Esta acción NO se puede deshacer.',
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
          <StatRow icon="magnify" label="Búsquedas guardadas" value={`${history.length}`} colors={colors} rs={rs} />
          <StatRow icon="clock-outline" label="Recientes" value={`${recent.length}`} colors={colors} rs={rs} />
        </View>

        {/* ── Limpiar datos ────────────────────── */}
        <SectionHeader title="Gestionar datos" icon="broom" colors={colors} rs={rs} />
        <SettingRow
          icon="magnify-close"
          label="Limpiar historial de búsqueda"
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
          label="Política de Privacidad"
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
          icon="database-outline"
          label="Datos clínicos"
          subtitle={syncing ? 'Buscando actualizaciones…' : dataSubtitle}
          onPress={otaEnabled ? handleSyncNow : undefined}
          trailing={syncing
            ? <ActivityIndicator size="small" color={colors.primary} />
            : undefined
          }
          colors={colors} rs={rs}
        />
        <SettingRow
          icon="tag-outline"
          label="Version"
          subtitle={isCodeActivated ? `${APP_VERSION} · Premium` : APP_VERSION}
          onPress={handleVersionTap}
          color={isCodeActivated ? '#10B981' : undefined}
          colors={colors} rs={rs}
          trailing={isCodeActivated
            ? <MaterialCommunityIcons name="check-decagram" size={rs.font(20)} color="#10B981" />
            : undefined
          }
        />
      </ScrollView>

      {/* ── Unlock Modal ── */}
      <Modal
        visible={showUnlockModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUnlockModal(false)}
      >
        <View style={{
          flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
          justifyContent: 'center', alignItems: 'center',
          paddingHorizontal: rs.space(32),
        }}>
          <View style={{
            width: '100%',
            backgroundColor: colors.cardBackground,
            borderRadius: 24,
            padding: rs.space(24),
            elevation: 10,
          }}>
            <View style={{ alignItems: 'center', marginBottom: rs.space(20) }}>
              <View style={{
                width: 56, height: 56, borderRadius: 18,
                backgroundColor: colors.primary + '15',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: rs.space(12),
              }}>
                <MaterialCommunityIcons name="lock-open-variant-outline" size={28} color={colors.primary} />
              </View>
              <Text style={{ fontSize: rs.font(18), fontWeight: '800', color: colors.text }}>
                Desbloquear Premium
              </Text>
              <Text style={{ fontSize: rs.font(13), color: colors.textSecondary, textAlign: 'center', marginTop: rs.space(4) }}>
                Ingresa el codigo de activacion
              </Text>
            </View>

            <TextInput
              value={unlockCode}
              onChangeText={(t) => { setUnlockCode(t); setUnlockError(false); }}
              placeholder="Codigo de activacion"
              placeholderTextColor={colors.textLight}
              secureTextEntry
              autoFocus
              style={{
                backgroundColor: colors.background,
                borderRadius: 14,
                paddingHorizontal: rs.space(16),
                paddingVertical: rs.space(14),
                fontSize: rs.font(15),
                color: colors.text,
                borderWidth: 1.5,
                borderColor: unlockError ? colors.error : colors.border,
                marginBottom: unlockError ? rs.space(4) : rs.space(16),
              }}
            />
            {unlockError && (
              <Text style={{ fontSize: rs.font(12), color: colors.error, marginBottom: rs.space(12), marginLeft: rs.space(4) }}>
                Codigo incorrecto. Intenta de nuevo.
              </Text>
            )}

            <TouchableOpacity
              onPress={handleUnlockSubmit}
              activeOpacity={0.85}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 14,
                paddingVertical: rs.space(14),
                alignItems: 'center',
                marginBottom: rs.space(10),
              }}
            >
              <Text style={{ fontSize: rs.font(15), fontWeight: '700', color: '#fff' }}>
                Activar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowUnlockModal(false)}
              activeOpacity={0.7}
              style={{ alignItems: 'center', paddingVertical: rs.space(8) }}
            >
              <Text style={{ fontSize: rs.font(14), color: colors.textSecondary, fontWeight: '600' }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
