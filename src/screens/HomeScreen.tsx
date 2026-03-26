// ============================================================
// HomeScreen — Dashboard / landing screen (redesigned)
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
  Image,
  ImageBackground,
  Dimensions,
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
import { getSystemImage } from '../utils/systemImages';
import { getConditionImage } from '../utils/conditionImages';
import { EmergencyBadge } from '../components/EmergencyBadge';
import type { RootStackParamList, TabParamList, Pathology, BodySystem, BodySystemId } from '../types';

const { width: SCREEN_W } = Dimensions.get('window');

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
// useFadeIn
// ─────────────────────────────────────────────

function useFadeIn(duration = 500, delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, duration, delay]);

  return { opacity, translateY };
}

// ─────────────────────────────────────────────
// Quick Actions
// ─────────────────────────────────────────────

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  gradient: [string, string];
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'buscar',     label: 'Buscar',      icon: 'magnify',           gradient: ['#3B82F6', '#1D4ED8'] },
  { id: 'test',       label: 'Test',         icon: 'head-question',     gradient: ['#8B5CF6', '#6D28D9'] },
  { id: 'protocolos', label: 'Protocolos',   icon: 'hospital-box',      gradient: ['#EF4444', '#DC2626'] },
  { id: 'nanda',      label: 'NANDA',        icon: 'clipboard-pulse',   gradient: ['#F59E0B', '#D97706'] },
  { id: 'lab',        label: 'Lab',          icon: 'flask',             gradient: ['#10B981', '#059669'] },
  { id: 'escalas',    label: 'Escalas',      icon: 'chart-timeline-variant-shimmer', gradient: ['#EC4899', '#DB2777'] },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function HomeScreen({ navigation }: Props) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { isPremium, isTrialActive, trialDaysLeft, trialExpired, isSubscribed, isCodeActivated } = usePremium();
  const { favoriteCount } = useFavoritesContext();
  const { pathologies, bodySystems, pathologyCount } = usePathologyData();
  const { recent } = useRecentPathologies();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { handleScroll } = useTabBar();

  const anim0 = useFadeIn(500, 50);
  const anim1 = useFadeIn(500, 150);
  const anim2 = useFadeIn(500, 250);
  const anim3 = useFadeIn(500, 350);

  // ── Greeting ──────────────────────────────
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Buenas noches';
    if (hour < 12) return 'Buenos dias';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }, []);

  // ── Pathology of the Day ──────────────────
  const pathologyOfTheDay = useMemo<Pathology | null>(() => {
    const free = pathologies.filter(p => !p.isPremium);
    if (!free.length) return null;
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
    );
    return free[dayOfYear % free.length];
  }, [pathologies]);

  // ── Recent pathologies ────────────────────
  const recentPathologyObjects = useMemo<Pathology[]>(() => {
    const map = new Map<string, Pathology>();
    for (const p of pathologies) map.set(p.id, p);
    return recent
      .map(id => map.get(id))
      .filter((p): p is Pathology => p !== undefined)
      .slice(0, 8);
  }, [recent, pathologies]);

  // ── Featured systems (top 4) ──────────────
  const featuredSystems = useMemo(() => bodySystems.slice(0, 4), [bodySystems]);

  // ── Navigation ────────────────────────────
  const handleQuickAction = useCallback(
    (actionId: string) => {
      switch (actionId) {
        case 'buscar': navigation.navigate('Busqueda'); break;
        case 'test': navigation.navigate('QuizScreen'); break;
        case 'protocolos': navigation.navigate('EmergencyProtocols'); break;
        case 'nanda': navigation.navigate('NandaScreen'); break;
        case 'lab': navigation.navigate('LabValues'); break;
        case 'escalas': navigation.navigate('Escalas'); break;
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

  // ─────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────

  const podColor = pathologyOfTheDay
    ? (BODY_SYSTEM_COLORS[pathologyOfTheDay.bodySystemId] ?? colors.primary)
    : colors.primary;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + rs.space(90) }}
        removeClippedSubviews={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* ── HEADER ── */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top + rs.space(16),
            paddingBottom: rs.space(32),
            paddingHorizontal: rs.space(20),
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          <Animated.View style={{ opacity: anim0.opacity, transform: [{ translateY: anim0.translateY }] }}>
            {/* Top row */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: rs.space(20) }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: rs.font(13), color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
                  {greeting}
                </Text>
                <Text style={{ fontSize: rs.font(26), fontWeight: '900', color: '#fff', letterSpacing: -0.8, marginTop: 2 }}>
                  Patologias
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: rs.space(8) }}>
                <TouchableOpacity
                  onPress={toggleTheme}
                  activeOpacity={0.7}
                  style={{
                    width: 40, height: 40, borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
                    size={20} color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SettingsScreen')}
                  activeOpacity={0.7}
                  style={{
                    width: 40, height: 40, borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons name="cog-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Search bar */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Busqueda')}
              activeOpacity={0.85}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.18)',
                borderRadius: 16,
                paddingHorizontal: rs.space(16),
                paddingVertical: rs.space(13),
                gap: rs.space(10),
              }}
            >
              <MaterialCommunityIcons name="magnify" size={20} color="rgba(255,255,255,0.6)" />
              <Text style={{ fontSize: rs.font(14), color: 'rgba(255,255,255,0.5)', flex: 1 }}>
                Buscar entre {pathologyCount} patologias...
              </Text>
            </TouchableOpacity>

            {/* Stats pills */}
            <View style={{ flexDirection: 'row', marginTop: rs.space(16), gap: rs.space(8) }}>
              {[
                { icon: 'book-open-page-variant', value: `${pathologyCount}`, label: 'Patologías', color: '#fff' },
                { icon: 'human-male-female', value: `${bodySystems.length}`, label: 'Sistemas', color: '#fff' },
                { icon: 'heart', value: `${favoriteCount}`, label: 'Favoritos', color: '#FF6B8A' },
              ].map((stat, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    paddingVertical: rs.space(8),
                    paddingHorizontal: rs.space(10),
                    gap: rs.space(6),
                  }}
                >
                  <MaterialCommunityIcons name={stat.icon} size={14} color={stat.color} />
                  <Text style={{ fontSize: rs.font(12), fontWeight: '800', color: '#fff' }}>
                    {stat.value}
                  </Text>
                  <Text style={{ fontSize: rs.font(10), color: 'rgba(255,255,255,0.6)', fontWeight: '500' }}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </LinearGradient>

        {/* ── QUICK ACTIONS ── */}
        <Animated.View style={{
          opacity: anim1.opacity,
          transform: [{ translateY: anim1.translateY }],
          marginTop: rs.space(-16),
          paddingHorizontal: rs.space(16),
        }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: rs.space(10), paddingHorizontal: rs.space(4) }}
          >
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity
                key={action.id}
                onPress={() => handleQuickAction(action.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={action.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: rs.space(72),
                    height: rs.space(84),
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: rs.space(6),
                    elevation: 4,
                    shadowColor: action.gradient[1],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                  }}
                >
                  <View style={{
                    width: 40, height: 40, borderRadius: 14,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <MaterialCommunityIcons name={action.icon} size={22} color="#fff" />
                  </View>
                  <Text style={{ fontSize: rs.font(10), fontWeight: '700', color: '#fff', textAlign: 'center' }}>
                    {action.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── PATHOLOGY OF THE DAY ── */}
        {pathologyOfTheDay && (
          <Animated.View style={{
            opacity: anim2.opacity,
            transform: [{ translateY: anim2.translateY }],
            marginTop: rs.space(24),
            paddingHorizontal: rs.space(20),
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(12), gap: rs.space(6) }}>
              <MaterialCommunityIcons name="star-four-points" size={16} color={colors.primary} />
              <Text style={{ fontSize: rs.font(16), fontWeight: '800', color: colors.text, letterSpacing: -0.3 }}>
                Patología del día
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handlePathologyPress(pathologyOfTheDay)}
              activeOpacity={0.85}
              style={{ borderRadius: 20, overflow: 'hidden', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 }}
            >
              <ImageBackground
                source={getConditionImage(pathologyOfTheDay.id, pathologyOfTheDay.bodySystemId as BodySystemId)}
                style={{ width: '100%', minHeight: rs.space(190) }}
                imageStyle={{ borderRadius: 20 }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.85)']}
                  locations={[0, 0.4, 1]}
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    padding: rs.space(18),
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* System badge + Emergency */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: rs.space(8) }}>
                    <View style={{
                      flexDirection: 'row', alignItems: 'center', gap: 4,
                      backgroundColor: podColor + '40', borderRadius: 20,
                      paddingHorizontal: rs.space(10), paddingVertical: rs.space(4),
                    }}>
                      <MaterialCommunityIcons
                        name={BODY_SYSTEM_ICONS[pathologyOfTheDay.bodySystemId] ?? 'medical-bag'}
                        size={12} color="#fff"
                      />
                      <Text style={{ fontSize: rs.font(11), fontWeight: '600', color: '#fff', textTransform: 'capitalize' }}>
                        {pathologyOfTheDay.bodySystemId.replace(/_/g, ' ')}
                      </Text>
                    </View>
                    <EmergencyBadge level={pathologyOfTheDay.emergencyLevel} />
                  </View>

                  {/* Title + Description */}
                  <Text style={{ fontSize: rs.font(22), fontWeight: '900', color: '#fff', letterSpacing: -0.5, marginBottom: rs.space(6) }}>
                    {pathologyOfTheDay.nombre}
                  </Text>
                  <Text style={{ fontSize: rs.font(13), color: 'rgba(255,255,255,0.8)', lineHeight: rs.font(19) }} numberOfLines={2}>
                    {pathologyOfTheDay.definicion}
                  </Text>

                  {/* CTA */}
                  <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    alignSelf: 'flex-start',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 12, paddingHorizontal: rs.space(14),
                    paddingVertical: rs.space(8), marginTop: rs.space(12),
                    gap: rs.space(6),
                  }}>
                    <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: '#fff' }}>
                      Ver detalle
                    </Text>
                    <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* ── FEATURED SYSTEMS ── */}
        <Animated.View style={{
          opacity: anim3.opacity,
          transform: [{ translateY: anim3.translateY }],
          marginTop: rs.space(28),
          paddingHorizontal: rs.space(20),
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: rs.space(14) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(6) }}>
              <MaterialCommunityIcons name="human" size={16} color={colors.primary} />
              <Text style={{ fontSize: rs.font(16), fontWeight: '800', color: colors.text, letterSpacing: -0.3 }}>
                Sistemas corporales
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Sistemas')} activeOpacity={0.7}>
              <Text style={{ fontSize: rs.font(13), fontWeight: '600', color: colors.primary }}>
                Ver todos
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: rs.space(10) }}>
            {featuredSystems.map(system => {
              const sysColor = BODY_SYSTEM_COLORS[system.id] ?? colors.primary;
              return (
                <TouchableOpacity
                  key={system.id}
                  onPress={() => handleSystemPress(system)}
                  activeOpacity={0.85}
                  style={{ width: (SCREEN_W - rs.space(50)) / 2, height: rs.space(100), borderRadius: 18, overflow: 'hidden', elevation: 3 }}
                >
                  <ImageBackground
                    source={getSystemImage(system.id as BodySystemId)}
                    style={{ flex: 1 }}
                    imageStyle={{ borderRadius: 18 }}
                  >
                    <LinearGradient
                      colors={[sysColor + '90', sysColor + 'E0']}
                      style={{
                        flex: 1, borderRadius: 18,
                        padding: rs.space(14),
                        justifyContent: 'flex-end',
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(6) }}>
                        <MaterialCommunityIcons
                          name={BODY_SYSTEM_ICONS[system.id] ?? 'medical-bag'}
                          size={18} color="#fff"
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: rs.font(13), fontWeight: '800', color: '#fff' }} numberOfLines={1}>
                            {system.nombre}
                          </Text>
                          <Text style={{ fontSize: rs.font(10), color: 'rgba(255,255,255,0.8)', fontWeight: '500' }}>
                            {system.count} patologias
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* ── RECENTLY VIEWED ── */}
        <View style={{ marginTop: rs.space(28), paddingHorizontal: rs.space(20) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(12), gap: rs.space(6) }}>
            <MaterialCommunityIcons name="history" size={16} color={colors.primary} />
            <Text style={{ fontSize: rs.font(16), fontWeight: '800', color: colors.text, letterSpacing: -0.3 }}>
              {recentPathologyObjects.length > 0 ? 'Vistas recientemente' : 'Comienza a explorar'}
            </Text>
          </View>

          {recentPathologyObjects.length > 0 ? (
            <FlatList
              data={recentPathologyObjects}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: rs.space(10) }}
              renderItem={({ item }) => {
                const sysColor = BODY_SYSTEM_COLORS[item.bodySystemId] ?? colors.primary;
                return (
                  <TouchableOpacity
                    onPress={() => handlePathologyPress(item)}
                    activeOpacity={0.8}
                    style={[{
                      width: rs.space(150),
                      borderRadius: 16,
                      overflow: 'hidden',
                      padding: rs.space(12),
                    }, neuCard(colors)]}
                  >
                    <View style={{
                      width: 32, height: 32, borderRadius: 10,
                      backgroundColor: sysColor + '18',
                      alignItems: 'center', justifyContent: 'center',
                      marginBottom: rs.space(8),
                    }}>
                      <MaterialCommunityIcons
                        name={BODY_SYSTEM_ICONS[item.bodySystemId] ?? 'medical-bag'}
                        size={16} color={sysColor}
                      />
                    </View>
                    <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text, marginBottom: rs.space(4) }} numberOfLines={2}>
                      {item.nombre}
                    </Text>
                    <Text style={{ fontSize: rs.font(10), color: sysColor, fontWeight: '600', textTransform: 'capitalize' }}>
                      {item.bodySystemId.replace(/_/g, ' ')}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Sistemas')}
              activeOpacity={0.85}
              style={[{
                flexDirection: 'row',
                alignItems: 'center',
                padding: rs.space(18),
                borderRadius: 18,
                gap: rs.space(14),
              }, neuCard(colors)]}
            >
              <LinearGradient
                colors={[colors.primary + '20', colors.primary + '08']}
                style={{
                  width: 52, height: 52, borderRadius: 16,
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons name="compass-outline" size={26} color={colors.primary} />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: rs.font(15), fontWeight: '700', color: colors.text, marginBottom: 2 }}>
                  Explora los {bodySystems.length} sistemas
                </Text>
                <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(17) }}>
                  Accede a {pathologyCount} patologias organizadas por sistema corporal
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* ── PREMIUM / TRIAL BANNER ── */}
        {!isSubscribed && !isCodeActivated && (
          <View style={{ marginTop: rs.space(24), paddingHorizontal: rs.space(20) }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PremiumScreen')}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={trialExpired ? ['#DC2626', '#991B1B'] : ['#7C3AED', '#4F46E5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  borderRadius: 18, padding: rs.space(16), gap: rs.space(12),
                }}
              >
                <View style={{
                  width: 44, height: 44, borderRadius: 14,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <MaterialCommunityIcons
                    name={trialExpired ? 'lock-outline' : 'clock-outline'}
                    size={22} color="#fff"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: rs.font(14), fontWeight: '800', color: '#fff' }}>
                    {trialExpired ? 'Período de prueba finalizado' : 'Período de prueba'}
                  </Text>
                  <Text style={{ fontSize: rs.font(12), color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
                    {trialExpired
                      ? 'Suscribite para acceso completo'
                      : `${trialDaysLeft} ${trialDaysLeft === 1 ? 'día' : 'días'} restantes · Toca para ver planes`}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.7)" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* ── FOOTER ── */}
        <View style={{ alignItems: 'center', marginTop: rs.space(32), gap: rs.space(8) }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', gap: rs.space(4),
            backgroundColor: colors.success + '15', borderRadius: 20,
            paddingHorizontal: rs.space(14), paddingVertical: rs.space(5),
          }}>
            <MaterialCommunityIcons name="wifi-off" size={12} color={colors.success} />
            <Text style={{ fontSize: rs.font(11), fontWeight: '600', color: colors.success }}>
              Funciona sin conexion
            </Text>
          </View>
          <Text style={{ fontSize: rs.font(11), color: colors.textLight, fontWeight: '500' }}>
            Patologias de Enfermeria · v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
