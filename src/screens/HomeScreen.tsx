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
import { BODY_SYSTEM_COLORS, type ThemeColors } from '../utils/colors';
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
  gradient: [string, string];
  image: ReturnType<typeof require>;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'buscar',     label: 'Buscar',      gradient: ['#3B82F6', '#1D4ED8'], image: require('../assets/images/conditions/brain_ct.jpg') },
  { id: 'test',       label: 'Test',         gradient: ['#8B5CF6', '#6D28D9'], image: require('../assets/images/conditions/surgery.jpg') },
  { id: 'protocolos', label: 'Protocolos',   gradient: ['#EF4444', '#DC2626'], image: require('../assets/images/conditions/iv_drip.jpg') },
  { id: 'nanda',      label: 'NANDA',        gradient: ['#F59E0B', '#D97706'], image: require('../assets/images/conditions/heart_monitor.jpg') },
  { id: 'lab',        label: 'Lab',          gradient: ['#10B981', '#059669'], image: require('../assets/images/conditions/blood_pressure.jpg') },
  { id: 'escalas',    label: 'Escalas',      gradient: ['#EC4899', '#DB2777'], image: require('../assets/images/scales/pain_scale.jpg') },
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

      {/* ── Decorative background ── */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <LinearGradient
          colors={isDark
            ? [colors.gradientStart + '15', colors.background, colors.background]
            : [colors.gradientStart + '08', colors.background, colors.primary + '05']
          }
          locations={[0, 0.35, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
        {/* Decorative blurred circles */}
        <View style={{
          position: 'absolute', top: rs.space(400), right: -60,
          width: 200, height: 200, borderRadius: 100,
          backgroundColor: colors.primary + (isDark ? '08' : '06'),
        }} />
        <View style={{
          position: 'absolute', top: rs.space(650), left: -80,
          width: 250, height: 250, borderRadius: 125,
          backgroundColor: colors.secondary + (isDark ? '06' : '04'),
        }} />
        <View style={{
          position: 'absolute', bottom: rs.space(100), right: -40,
          width: 180, height: 180, borderRadius: 90,
          backgroundColor: colors.accent + (isDark ? '06' : '04'),
        }} />
      </View>

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
                  <Text style={{ fontSize: 18 }}>{isDark ? '☀️' : '🌙'}</Text>
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
                  <Text style={{ fontSize: 18 }}>⚙️</Text>
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
              <Text style={{ fontSize: 16 }}>🔍</Text>
              <Text style={{ fontSize: rs.font(14), color: 'rgba(255,255,255,0.5)', flex: 1 }}>
                Buscar entre {pathologyCount} patologias...
              </Text>
            </TouchableOpacity>

            {/* Stats pills */}
            <View style={{ flexDirection: 'row', marginTop: rs.space(16), gap: rs.space(8) }}>
              {[
                { value: `${pathologyCount}`, label: 'Patologías' },
                { value: `${bodySystems.length}`, label: 'Sistemas' },
                ...(favoriteCount > 0
                  ? [{ value: `${favoriteCount}`, label: 'Favoritos' }]
                  : [{ value: '17', label: 'Escalas' }]),
              ].map((stat, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    paddingVertical: rs.space(10),
                    paddingHorizontal: rs.space(8),
                  }}
                >
                  <Text style={{ fontSize: rs.font(18), fontWeight: '900', color: '#fff' }}>
                    {stat.value}
                  </Text>
                  <Text style={{ fontSize: rs.font(10), color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginTop: 2 }}>
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
                activeOpacity={0.85}
              >
                <ImageBackground
                  source={action.image}
                  style={{
                    width: rs.space(78),
                    height: rs.space(84),
                    borderRadius: 18,
                    overflow: 'hidden',
                    elevation: 4,
                    shadowColor: action.gradient[1],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                  }}
                  imageStyle={{ borderRadius: 18 }}
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={[action.gradient[0] + 'CC', action.gradient[1] + 'EE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingBottom: rs.space(10),
                    }}
                  >
                    <Text style={{ fontSize: rs.font(11), fontWeight: '800', color: '#fff', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}>
                      {action.label}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(12) }}>
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
                      backgroundColor: podColor + '40', borderRadius: 20,
                      paddingHorizontal: rs.space(12), paddingVertical: rs.space(4),
                    }}>
                      <Text style={{ fontSize: rs.font(11), fontWeight: '700', color: '#fff', textTransform: 'capitalize' }}>
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
                    alignSelf: 'flex-start',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 12, paddingHorizontal: rs.space(14),
                    paddingVertical: rs.space(8), marginTop: rs.space(12),
                  }}>
                    <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: '#fff' }}>
                      Ver detalle →
                    </Text>
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
            <Text style={{ fontSize: rs.font(16), fontWeight: '800', color: colors.text, letterSpacing: -0.3 }}>
              Sistemas corporales
            </Text>
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
                      colors={['transparent', sysColor + 'D0']}
                      locations={[0.2, 1]}
                      style={{
                        flex: 1, borderRadius: 18,
                        padding: rs.space(14),
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{
                        backgroundColor: '#fff', borderRadius: 8,
                        paddingHorizontal: 6, paddingVertical: 2,
                        alignSelf: 'flex-end', elevation: 2,
                      }}>
                        <Text style={{ fontSize: rs.font(10), fontWeight: '900', color: sysColor }}>
                          {system.pathologyCount}
                        </Text>
                      </View>
                      <Text style={{
                        fontSize: rs.font(13), fontWeight: '800', color: '#fff',
                        textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
                      }} numberOfLines={2}>
                        {system.nombre}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* ── RECENTLY VIEWED ── */}
        <View style={{ marginTop: rs.space(28), paddingHorizontal: rs.space(20) }}>
          <Text style={{ fontSize: rs.font(16), fontWeight: '800', color: colors.text, letterSpacing: -0.3, marginBottom: rs.space(12) }}>
            {recentPathologyObjects.length > 0 ? 'Vistas recientemente' : 'Comienza a explorar'}
          </Text>

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
                    <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text, marginBottom: rs.space(6) }} numberOfLines={2}>
                      {item.nombre}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(6) }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: sysColor }} />
                      <Text style={{ fontSize: rs.font(10), color: sysColor, fontWeight: '600', textTransform: 'capitalize' }}>
                        {item.bodySystemId.replace(/_/g, ' ')}
                      </Text>
                    </View>
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
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: rs.font(15), fontWeight: '700', color: colors.text, marginBottom: 2 }}>
                  Explora los {bodySystems.length} sistemas
                </Text>
                <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, lineHeight: rs.font(17) }}>
                  Accedé a {pathologyCount} patologías organizadas por sistema corporal
                </Text>
              </View>
              <Text style={{ fontSize: rs.font(18), color: colors.textLight }}>→</Text>
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
                <Text style={{ fontSize: rs.font(24) }}>{trialExpired ? '🔒' : '⏳'}</Text>
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
                <Text style={{ fontSize: rs.font(18), color: 'rgba(255,255,255,0.7)' }}>→</Text>
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
            <Text style={{ fontSize: 10 }}>📡</Text>
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
