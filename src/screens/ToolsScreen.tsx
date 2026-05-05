// ============================================================
// ToolsScreen — Feature grid (Tab 5) — redesigned with images
// ============================================================

import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useTheme } from '../context/ThemeContext';
import { useTabBar } from '../context/TabBarContext';
import { useResponsiveScale } from '../utils/responsive';
import type { RootStackParamList, TabParamList } from '../types';

const { width: SCREEN_W } = Dimensions.get('window');

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Herramientas'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ToolItem {
  id: string;
  label: string;
  subtitle: string;
  gradient: [string, string];
  image?: any;
  icon: string;
  route: keyof RootStackParamList | keyof TabParamList;
  premium: boolean;
}

const TOOLS: ToolItem[] = [
  // ── Clinical tools (with photos) ──
  {
    id: 'quiz', label: 'Test de Patologías', subtitle: 'Evaluá tus conocimientos',
    gradient: ['#7C3AED', '#5B21B6'], icon: 'head-question-outline',
    image: require('../assets/images/conditions/brain_ct.jpg'),
    route: 'QuizScreen', premium: true,
  },
  {
    id: 'scales', label: 'Escalas Clínicas', subtitle: '17 escalas de valoración',
    gradient: ['#D97706', '#B45309'], icon: 'clipboard-pulse-outline',
    image: require('../assets/images/conditions/heart_monitor.jpg'),
    route: 'Escalas', premium: true,
  },
  {
    id: 'lab', label: 'Valores de Laboratorio', subtitle: 'Rangos de referencia',
    gradient: ['#059669', '#047857'], icon: 'flask-outline',
    image: require('../assets/images/conditions/glucose.jpg'),
    route: 'LabValues', premium: true,
  },
  {
    id: 'protocols', label: 'Protocolos', subtitle: 'Emergencias paso a paso',
    gradient: ['#DC2626', '#B91C1C'], icon: 'alert-octagon-outline',
    image: require('../assets/images/conditions/iv_drip.jpg'),
    route: 'EmergencyProtocols', premium: true,
  },
  {
    id: 'differential', label: 'Diagnóstico Diferencial', subtitle: 'Síntomas → patologías probables',
    gradient: ['#DC2626', '#991B1B'], icon: 'stethoscope',
    image: require('../assets/images/conditions/virus.jpg'),
    route: 'DifferentialScreen', premium: true,
  },
  {
    id: 'nanda', label: 'NANDA-NIC-NOC', subtitle: 'Diagnósticos de enfermería',
    gradient: ['#2563EB', '#1D4ED8'], icon: 'format-list-checks',
    image: require('../assets/images/conditions/ecg.jpg'),
    route: 'NandaScreen', premium: true,
  },
  // ── App utilities (gradient-only with icon) ──
  {
    id: 'dashboard', label: 'Mi Progreso', subtitle: 'Estadísticas y actividad',
    gradient: ['#8B5CF6', '#6D28D9'], icon: 'chart-line-variant',
    route: 'Dashboard', premium: true,
  },
  {
    id: 'favorites', label: 'Mis Favoritos', subtitle: 'Patologías guardadas',
    gradient: ['#EC4899', '#BE185D'], icon: 'heart-outline',
    route: 'AllFavorites', premium: false,
  },
  {
    id: 'notes', label: 'Mis Notas', subtitle: 'Apuntes personales',
    gradient: ['#F59E0B', '#B45309'], icon: 'notebook-edit-outline',
    route: 'AllNotes', premium: false,
  },
  {
    id: 'premium', label: 'Premium', subtitle: 'Desbloquea todo el contenido',
    gradient: ['#6D28D9', '#4C1D95'], icon: 'crown-outline',
    route: 'PremiumScreen', premium: false,
  },
  {
    id: 'settings', label: 'Configuración', subtitle: 'Tema, datos y más',
    gradient: ['#6B7280', '#374151'], icon: 'cog-outline',
    route: 'SettingsScreen', premium: false,
  },
  {
    id: 'misuite', label: 'Mi suite', subtitle: 'Las 3 apps de enfermería',
    gradient: ['#0EA5E9', '#0369A1'], icon: 'apps',
    route: 'MiSuite', premium: false,
  },
];

export function ToolsScreen() {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { handleScroll } = useTabBar();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: 100, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const handlePress = useCallback(
    (tool: ToolItem) => { navigation.navigate(tool.route as any); },
    [navigation],
  );

  const cardWidth = (SCREEN_W - rs.space(48)) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + rs.space(16), paddingBottom: rs.space(24), paddingHorizontal: rs.space(24) }}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={{ fontSize: rs.font(26), fontWeight: '800', color: '#fff', letterSpacing: -0.5 }}>
            Herramientas
          </Text>
          <Text style={{ fontSize: rs.font(13), color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
            Recursos clínicos y de estudio
          </Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: rs.space(16), paddingBottom: insets.bottom + rs.space(80), paddingHorizontal: rs.space(16) }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Animated.View style={{ opacity: fadeAnim, flexDirection: 'row', flexWrap: 'wrap', gap: rs.space(12) }}>
          {TOOLS.map(tool => {
            const cardStyle = {
              width: cardWidth,
              height: rs.space(130),
              borderRadius: 20,
              overflow: 'hidden' as const,
              elevation: 5,
              shadowColor: tool.gradient[1],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
            };

            // Cards with photo: no icon overlay (photo IS the visual)
            // Cards without photo (gradient-only): prominent icon
            const innerContent = (
              <>
                {/* Top row: icon (only gradient cards) + premium badge */}
                <View style={{ flexDirection: 'row', justifyContent: tool.image ? 'flex-end' : 'space-between', alignItems: 'flex-start' }}>
                  {!tool.image && (
                    <View style={{
                      width: 44, height: 44, borderRadius: 14,
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <MaterialCommunityIcons
                        name={tool.icon}
                        size={24}
                        color="#fff"
                      />
                    </View>
                  )}
                  {tool.premium && (
                    <View style={{
                      backgroundColor: 'rgba(255,255,255,0.92)',
                      borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2.5,
                    }}>
                      <Text style={{ fontSize: rs.font(8), fontWeight: '900', color: '#D97706', letterSpacing: 0.5 }}>PRO</Text>
                    </View>
                  )}
                </View>

                {/* Bottom: label + subtitle */}
                <View>
                  <Text style={{
                    fontSize: rs.font(13), fontWeight: '800', color: '#fff',
                    textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
                  }} numberOfLines={2}>
                    {tool.label}
                  </Text>
                  <Text style={{
                    fontSize: rs.font(9.5), color: 'rgba(255,255,255,0.85)', marginTop: 3,
                    fontWeight: '500',
                  }} numberOfLines={1}>
                    {tool.subtitle}
                  </Text>
                </View>
              </>
            );

            return (
              <TouchableOpacity
                key={tool.id}
                onPress={() => handlePress(tool)}
                activeOpacity={0.88}
                style={cardStyle}
              >
                {tool.image ? (
                  /* Clinical tool — photo background */
                  <ImageBackground
                    source={tool.image}
                    style={{ flex: 1 }}
                    imageStyle={{ borderRadius: 20 }}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.1)', tool.gradient[1] + 'E0']}
                      locations={[0, 0.35, 1]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={{
                        flex: 1, borderRadius: 20,
                        padding: rs.space(12),
                        justifyContent: 'space-between',
                      }}
                    >
                      {innerContent}
                    </LinearGradient>
                  </ImageBackground>
                ) : (
                  /* Utility — clean gradient */
                  <LinearGradient
                    colors={tool.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      flex: 1, borderRadius: 20,
                      padding: rs.space(12),
                      justifyContent: 'space-between',
                    }}
                  >
                    {innerContent}
                  </LinearGradient>
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
