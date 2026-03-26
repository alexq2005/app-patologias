// ============================================================
// HomeScreen — Dashboard / landing screen
// ============================================================

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CompositeNavigationProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useRecentPathologies } from '../hooks/useRecentPathologies';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { BODY_SYSTEM_COLORS, BODY_SYSTEM_ICONS, type ThemeColors } from '../utils/colors';
import { SPACING, RADIUS } from '../utils/spacing';
import { useTabBar } from '../context/TabBarContext';
import { EmergencyBadge } from '../components/EmergencyBadge';
import type { RootStackParamList, TabParamList, Pathology, BodySystem } from '../types';

// ─────────────────────────────────────────────
// Navigation type
// ─────────────────────────────────────────────

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Inicio'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: NavigationProp;
}

// ─────────────────────────────────────────────
// useFadeIn — simple opacity + slide entrance
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
// Quick Actions config
// ─────────────────────────────────────────────

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'buscar',     label: 'Buscar',      icon: 'magnify',           color: '#2563EB' },
  { id: 'test',       label: 'Test',         icon: 'head-question',     color: '#7C3AED' },
  { id: 'protocolos', label: 'Protocolos',   icon: 'hospital-box',      color: '#DC2626' },
  { id: 'nanda',      label: 'NANDA',        icon: 'clipboard-pulse',   color: '#B45309' },
  { id: 'lab',        label: 'Lab',          icon: 'flask',             color: '#059669' },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function HomeScreen({ navigation }: Props) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { isPremium, isTrialActive, trialDaysLeft } = usePremium();
  const { favoriteCount } = useFavoritesContext();
  const { pathologies, bodySystems, pathologyCount } = usePathologyData();
  const { recent } = useRecentPathologies();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { handleScroll } = useTabBar();
  const styles = createStyles(colors, rs);

  const { opacity: headerOpacity, translateY: headerTranslateY } = useFadeIn(380, 40);
  const { opacity: contentOpacity, translateY: contentTranslateY } = useFadeIn(380, 140);

  // ── Time-based greeting ─────────────────────
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Buenas noches';
    if (hour < 12) return 'Buenos dias';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }, []);

  // ── Pathology of the Day ──────────────────────
  const pathologyOfTheDay = useMemo<Pathology | null>(() => {
    const free = pathologies.filter(p => !p.isPremium);
    if (!free.length) return null;
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
    );
    return free[dayOfYear % free.length];
  }, [pathologies]);

  // ── Recent pathologies resolved to objects ────
  const recentPathologyObjects = useMemo<Pathology[]>(() => {
    const map = new Map<string, Pathology>();
    for (const p of pathologies) map.set(p.id, p);
    return recent
      .map(id => map.get(id))
      .filter((p): p is Pathology => p !== undefined)
      .slice(0, 8);
  }, [recent, pathologies]);

  // ── Navigation handlers ───────────────────────
  const handleQuickAction = useCallback(
    (actionId: string) => {
      switch (actionId) {
        case 'buscar':
          navigation.navigate('Busqueda');
          break;
        case 'test':
          navigation.navigate('QuizScreen');
          break;
        case 'protocolos':
          navigation.navigate('EmergencyProtocols');
          break;
        case 'nanda':
          navigation.navigate('NandaScreen');
          break;
        case 'lab':
          navigation.navigate('LabValues');
          break;
      }
    },
    [navigation],
  );

  const handlePathologyPress = useCallback(
    (pathology: Pathology) => {
      navigation.navigate('PathologyDetail', {
        pathologyId: pathology.id,
        pathologyName: pathology.nombre,
      });
    },
    [navigation],
  );

  const handleSystemPress = useCallback(
    (system: BodySystem) => {
      navigation.navigate('SystemPathologies', {
        systemId: system.id,
        systemName: system.nombre,
        systemColor: system.color,
      });
    },
    [navigation],
  );

  // ── Render helpers ────────────────────────────
  const renderQuickAction = useCallback(
    (action: QuickAction) => (
      <TouchableOpacity
        key={action.id}
        style={[styles.quickActionCard, neuCardSubtle(colors)]}
        onPress={() => handleQuickAction(action.id)}
        activeOpacity={0.75}
      >
        <View style={[styles.quickActionIconWrap, { backgroundColor: action.color + '25' }]}>
          <MaterialCommunityIcons
            name={action.icon}
            size={rs.font(22)}
            color={action.color}
          />
        </View>
        <Text style={styles.quickActionLabel} numberOfLines={1}>
          {action.label}
        </Text>
      </TouchableOpacity>
    ),
    [colors, rs, styles, handleQuickAction],
  );

  const renderRecentItem = useCallback(
    ({ item }: { item: Pathology }) => {
      const systemColor = BODY_SYSTEM_COLORS[item.bodySystemId] ?? colors.primary;
      return (
        <TouchableOpacity
          style={[styles.recentCard, neuCardSubtle(colors)]}
          onPress={() => handlePathologyPress(item)}
          activeOpacity={0.75}
        >
          <View style={[styles.recentAccent, { backgroundColor: systemColor }]} />
          <View style={styles.recentBody}>
            <Text style={styles.recentName} numberOfLines={2}>
              {item.nombre}
            </Text>
            <View style={[styles.recentSystemBadge, { backgroundColor: systemColor + '20' }]}>
              <MaterialCommunityIcons
                name={BODY_SYSTEM_ICONS[item.bodySystemId] ?? 'medical-bag'}
                size={rs.font(10)}
                color={systemColor}
              />
              <Text style={[styles.recentSystemLabel, { color: systemColor }]} numberOfLines={1}>
                {item.bodySystemId.replace('_', ' ')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [colors, rs, styles, handlePathologyPress],
  );

  const renderSystemCircle = useCallback(
    (system: BodySystem) => {
      const systemColor = BODY_SYSTEM_COLORS[system.id] ?? colors.primary;
      const icon = BODY_SYSTEM_ICONS[system.id] ?? 'medical-bag';
      return (
        <TouchableOpacity
          key={system.id}
          style={styles.systemCircleWrap}
          onPress={() => handleSystemPress(system)}
          activeOpacity={0.75}
        >
          <View style={[styles.systemCircle, { backgroundColor: systemColor + '18', borderColor: systemColor + '40' }]}>
            <MaterialCommunityIcons
              name={icon}
              size={rs.font(22)}
              color={systemColor}
            />
          </View>
          <Text style={styles.systemCircleLabel} numberOfLines={2}>
            {system.nombre}
          </Text>
        </TouchableOpacity>
      );
    },
    [colors, rs, styles, handleSystemPress],
  );

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + rs.space(80) },
        ]}
        removeClippedSubviews={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* ── Gradient Header ── */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + rs.space(SPACING.lg) }]}
        >
          <Animated.View
            style={[
              styles.headerInner,
              { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] },
            ]}
          >
            <View style={styles.headerRow}>
              <View style={styles.headerTextBlock}>
                <Text style={styles.headerGreeting}>{greeting}</Text>
                <Text style={styles.headerTitle}>Patologias de{'\n'}Enfermeria</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.headerIconBtn}
                  onPress={toggleTheme}
                  activeOpacity={0.75}
                >
                  <MaterialCommunityIcons
                    name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
                    size={rs.font(20)}
                    color={colors.gradientText}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.headerIconBtn}
                  onPress={() => navigation.navigate('AboutScreen')}
                  activeOpacity={0.75}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={rs.font(20)}
                    color={colors.gradientText}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* ── Main content ── */}
        <Animated.View
          style={{ opacity: contentOpacity, transform: [{ translateY: contentTranslateY }] }}
        >

          {/* ── Quick Actions ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acceso rapido</Text>
            <View style={styles.quickActionsGrid}>
              {QUICK_ACTIONS.map(renderQuickAction)}
            </View>
          </View>

          {/* ── Trial / Premium Banner ── */}
          {!isPremium && (
            <TouchableOpacity
              style={[styles.trialBanner, { backgroundColor: isTrialActive ? colors.primary + '14' : colors.error + '12' }]}
              onPress={() => navigation.navigate('PremiumScreen')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={isTrialActive ? 'clock-outline' : 'lock-outline'}
                size={rs.font(22)}
                color={isTrialActive ? colors.primary : colors.error}
                style={styles.trialIcon}
              />
              <View style={styles.trialText}>
                {isTrialActive ? (
                  <>
                    <Text style={[styles.trialTitle, { color: colors.primary }]}>
                      Prueba gratuita activa
                    </Text>
                    <Text style={[styles.trialSub, { color: colors.textSecondary }]}>
                      {trialDaysLeft} {trialDaysLeft === 1 ? 'dia restante' : 'dias restantes'} · Toca para desbloquear todo
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={[styles.trialTitle, { color: colors.error }]}>
                      Trial expirado
                    </Text>
                    <Text style={[styles.trialSub, { color: colors.textSecondary }]}>
                      Desbloquea el acceso completo a todas las patologias
                    </Text>
                  </>
                )}
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={rs.font(20)}
                color={isTrialActive ? colors.primary : colors.error}
              />
            </TouchableOpacity>
          )}

          {/* ── Pathology of the Day ── */}
          {pathologyOfTheDay && (
            <View style={[styles.section, styles.podSection]}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                  name="calendar-star"
                  size={rs.font(16)}
                  color={colors.primary}
                />
                <Text style={[styles.sectionTitle, styles.sectionTitleInline]}>
                  Patologia del dia
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.podCard, neuCard(colors)]}
                onPress={() => handlePathologyPress(pathologyOfTheDay)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.podAccentBar,
                    { backgroundColor: BODY_SYSTEM_COLORS[pathologyOfTheDay.bodySystemId] ?? colors.primary },
                  ]}
                />
                <View style={styles.podContent}>
                  <View style={styles.podBadgeRow}>
                    <View
                      style={[
                        styles.podSystemBadge,
                        { backgroundColor: (BODY_SYSTEM_COLORS[pathologyOfTheDay.bodySystemId] ?? colors.primary) + '18' },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={BODY_SYSTEM_ICONS[pathologyOfTheDay.bodySystemId] ?? 'medical-bag'}
                        size={rs.font(11)}
                        color={BODY_SYSTEM_COLORS[pathologyOfTheDay.bodySystemId] ?? colors.primary}
                      />
                      <Text
                        style={[
                          styles.podSystemText,
                          { color: BODY_SYSTEM_COLORS[pathologyOfTheDay.bodySystemId] ?? colors.primary },
                        ]}
                      >
                        {pathologyOfTheDay.bodySystemId.replace('_', ' ')}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.podName}>{pathologyOfTheDay.nombre}</Text>
                  <Text style={styles.podDefinition} numberOfLines={3}>
                    {pathologyOfTheDay.definicion}
                  </Text>
                  <View style={styles.podFooter}>
                    <View style={[styles.podCtaButton, { backgroundColor: colors.primary + '12' }]}>
                      <Text style={[styles.podCta, { color: colors.primary }]}>
                        Ver detalle
                      </Text>
                      <MaterialCommunityIcons
                        name="arrow-right"
                        size={rs.font(14)}
                        color={colors.primary}
                      />
                    </View>
                    <EmergencyBadge level={pathologyOfTheDay.emergencyLevel} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* ── Recently Viewed ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vistas recientemente</Text>
            {recentPathologyObjects.length > 0 ? (
              <FlatList
                data={recentPathologyObjects}
                renderItem={renderRecentItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                removeClippedSubviews={false}
                scrollEnabled
              />
            ) : (
              <View style={[styles.emptyRecent, neuCardSubtle(colors)]}>
                <View style={styles.emptyRecentIconWrap}>
                  <MaterialCommunityIcons
                    name="book-search-outline"
                    size={rs.font(32)}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.emptyRecentTitle}>
                  Comienza a explorar
                </Text>
                <Text style={styles.emptyRecentText}>
                  Las patologias que visites apareceran aqui para acceso rapido
                </Text>
              </View>
            )}
          </View>

          {/* ── Browse by System ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explorar por sistema</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.systemsRow}
            >
              {bodySystems.map(renderSystemCircle)}
            </ScrollView>
          </View>

          {/* ── Stats Row ── */}
          <View style={[styles.statsRow, neuCard(colors)]}>
            <View style={styles.statItem}>
              <View style={[styles.statIconWrap, { backgroundColor: colors.primary + '15' }]}>
                <MaterialCommunityIcons name="book-open-page-variant" size={rs.font(18)} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{pathologyCount}</Text>
              <Text style={styles.statLabel}>Patologias</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statIconWrap, { backgroundColor: colors.error + '15' }]}>
                <MaterialCommunityIcons name="heart" size={rs.font(18)} color={colors.error} />
              </View>
              <Text style={[styles.statValue, { color: colors.error }]}>{favoriteCount}</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statIconWrap, { backgroundColor: colors.secondary + '15' }]}>
                <MaterialCommunityIcons name="human-male-female" size={rs.font(18)} color={colors.secondary} />
              </View>
              <Text style={[styles.statValue, { color: colors.secondary }]}>{bodySystems.length}</Text>
              <Text style={styles.statLabel}>Sistemas</Text>
            </View>
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <View style={styles.footerDivider} />
            <View style={styles.footerOfflineBadge}>
              <MaterialCommunityIcons
                name="check-circle"
                size={rs.font(12)}
                color={colors.success}
              />
              <Text style={[styles.footerOfflineText, { color: colors.success }]}>
                Funciona sin conexion
              </Text>
            </View>
            <Text style={styles.footerApp}>Patologias de Enfermeria · v1.0.0</Text>
          </View>

        </Animated.View>
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
    scrollContent: {
      flexGrow: 1,
    },

    // ── Header ──
    header: {
      paddingBottom: rs.space(SPACING.xxl + 4),
      paddingHorizontal: rs.space(SPACING.xxl),
    },
    headerInner: {
      // animated wrapper
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    headerTextBlock: {
      flex: 1,
      marginRight: rs.space(SPACING.md),
    },
    headerGreeting: {
      fontSize: rs.font(14),
      fontWeight: '500',
      color: colors.gradientText,
      opacity: 0.75,
      marginBottom: rs.space(4),
    },
    headerTitle: {
      fontSize: rs.font(24),
      fontWeight: '800',
      color: colors.gradientText,
      letterSpacing: -0.5,
      lineHeight: rs.font(30),
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
    },
    headerIconBtn: {
      width: rs.space(36),
      height: rs.space(36),
      borderRadius: RADIUS.pill,
      backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // ── Sections ──
    section: {
      marginTop: rs.space(SPACING.xxl),
      paddingHorizontal: rs.space(SPACING.lg),
    },
    podSection: {
      marginTop: rs.space(SPACING.xl),
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.space(SPACING.md),
      gap: rs.space(SPACING.xs),
    },
    sectionTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
      marginBottom: rs.space(SPACING.md),
      letterSpacing: -0.2,
    },
    sectionTitleInline: {
      marginBottom: 0,
    },

    // ── Quick Actions ──
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    quickActionCard: {
      width: '18.5%',
      paddingVertical: rs.space(SPACING.md),
      alignItems: 'center',
      gap: rs.space(SPACING.xs),
    },
    quickActionIconWrap: {
      width: rs.space(48),
      height: rs.space(48),
      borderRadius: RADIUS.lg,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.08)',
    },
    quickActionLabel: {
      fontSize: rs.font(10),
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },

    // ── Trial Banner ──
    trialBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: rs.space(SPACING.lg),
      marginTop: rs.space(SPACING.xl),
      borderRadius: RADIUS.lg,
      paddingVertical: rs.space(SPACING.md),
      paddingHorizontal: rs.space(SPACING.lg),
      borderWidth: 0.5,
      borderColor: colors.border,
    },
    trialIcon: {
      marginRight: rs.space(SPACING.md),
    },
    trialText: {
      flex: 1,
    },
    trialTitle: {
      fontSize: rs.font(13),
      fontWeight: '700',
      marginBottom: rs.space(2),
    },
    trialSub: {
      fontSize: rs.font(12),
    },

    // ── Pathology of the Day ──
    podCard: {
      flexDirection: 'row',
      overflow: 'hidden',
    },
    podAccentBar: {
      width: 4,
      borderTopLeftRadius: RADIUS.lg,
      borderBottomLeftRadius: RADIUS.lg,
    },
    podContent: {
      flex: 1,
      padding: rs.space(SPACING.lg),
    },
    podBadgeRow: {
      flexDirection: 'row',
      marginBottom: rs.space(SPACING.sm),
    },
    podSystemBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(4),
      borderRadius: RADIUS.pill,
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: rs.space(3),
    },
    podSystemText: {
      fontSize: rs.font(10),
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    podName: {
      fontSize: rs.font(17),
      fontWeight: '800',
      color: colors.text,
      marginBottom: rs.space(SPACING.sm),
      letterSpacing: -0.3,
    },
    podDefinition: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: rs.font(19),
      marginBottom: rs.space(SPACING.md),
    },
    podFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    podCtaButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(4),
      paddingHorizontal: rs.space(SPACING.md),
      paddingVertical: rs.space(SPACING.xs + 2),
      borderRadius: RADIUS.pill,
    },
    podCta: {
      fontSize: rs.font(13),
      fontWeight: '700',
    },

    // ── Recently Viewed ──
    horizontalList: {
      paddingRight: rs.space(SPACING.lg),
      gap: rs.space(SPACING.sm),
    },
    recentCard: {
      width: rs.space(140),
      flexDirection: 'row',
      overflow: 'hidden',
    },
    recentAccent: {
      width: 3,
      borderTopLeftRadius: RADIUS.md + 2,
      borderBottomLeftRadius: RADIUS.md + 2,
    },
    recentBody: {
      flex: 1,
      padding: rs.space(SPACING.sm),
      justifyContent: 'space-between',
      gap: rs.space(SPACING.xs),
    },
    recentName: {
      fontSize: rs.font(12),
      fontWeight: '700',
      color: colors.text,
      lineHeight: rs.font(16),
    },
    recentSystemBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(3),
      borderRadius: RADIUS.pill,
      paddingHorizontal: rs.space(SPACING.xs),
      paddingVertical: rs.space(2),
      alignSelf: 'flex-start',
    },
    recentSystemLabel: {
      fontSize: rs.font(9),
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    emptyRecent: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: rs.space(SPACING.xxxl),
      paddingHorizontal: rs.space(SPACING.xxl),
      gap: rs.space(SPACING.xs),
    },
    emptyRecentIconWrap: {
      width: rs.space(56),
      height: rs.space(56),
      borderRadius: RADIUS.pill,
      backgroundColor: colors.primary + '10',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rs.space(SPACING.sm),
    },
    emptyRecentTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
    },
    emptyRecentText: {
      fontSize: rs.font(12),
      color: colors.textLight,
      textAlign: 'center',
      lineHeight: rs.font(17),
    },

    // ── Systems Row ──
    systemsRow: {
      paddingRight: rs.space(SPACING.lg),
      gap: rs.space(SPACING.sm),
    },
    systemCircleWrap: {
      alignItems: 'center',
      width: rs.space(68),
      gap: rs.space(SPACING.xs),
    },
    systemCircle: {
      width: rs.space(52),
      height: rs.space(52),
      borderRadius: RADIUS.pill,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    systemCircleLabel: {
      fontSize: rs.font(10),
      fontWeight: '600',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: rs.font(13),
      textTransform: 'capitalize',
    },

    // ── Stats Row ──
    statsRow: {
      flexDirection: 'row',
      marginHorizontal: rs.space(SPACING.lg),
      marginTop: rs.space(SPACING.xxl),
      paddingVertical: rs.space(SPACING.lg),
      alignItems: 'center',
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      gap: rs.space(4),
    },
    statIconWrap: {
      width: rs.space(36),
      height: rs.space(36),
      borderRadius: RADIUS.pill,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rs.space(2),
    },
    statValue: {
      fontSize: rs.font(24),
      fontWeight: '800',
      color: colors.primary,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: rs.font(11),
      fontWeight: '500',
      color: colors.textSecondary,
      marginTop: rs.space(2),
    },
    statDivider: {
      width: 1,
      height: rs.space(32),
      backgroundColor: colors.border,
    },

    // ── Footer ──
    footer: {
      alignItems: 'center',
      paddingTop: rs.space(SPACING.xxl),
      paddingHorizontal: rs.space(SPACING.xxl),
      gap: rs.space(SPACING.sm),
    },
    footerDivider: {
      width: rs.space(40),
      height: 2,
      borderRadius: 1,
      backgroundColor: colors.border,
      marginBottom: rs.space(SPACING.sm),
    },
    footerOfflineBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(4),
      backgroundColor: colors.success + '15',
      borderRadius: RADIUS.pill,
      paddingHorizontal: rs.space(SPACING.md),
      paddingVertical: rs.space(4),
    },
    footerOfflineText: {
      fontSize: rs.font(11),
      fontWeight: '600',
    },
    footerApp: {
      fontSize: rs.font(11),
      fontWeight: '500',
      color: colors.textLight,
    },
  });
