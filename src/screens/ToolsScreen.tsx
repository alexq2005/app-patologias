// ============================================================
// ToolsScreen — Feature grid (Tab 5) — redesigned with images
// ============================================================

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
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
  icon: string;
  gradient: [string, string];
  image: any;
  route: keyof RootStackParamList | keyof TabParamList;
  premium: boolean;
}

const TOOLS: ToolItem[] = [
  {
    id: 'quiz', label: 'Test de Patologías', subtitle: 'Evaluá tus conocimientos',
    icon: 'head-question-outline', gradient: ['#7C3AED', '#5B21B6'],
    image: require('../assets/images/conditions/brain_ct.jpg'),
    route: 'QuizScreen', premium: true,
  },
  {
    id: 'scales', label: 'Escalas Clínicas', subtitle: '17 escalas de valoración',
    icon: 'chart-timeline-variant-shimmer', gradient: ['#D97706', '#B45309'],
    image: require('../assets/images/conditions/heart_monitor.jpg'),
    route: 'Escalas', premium: true,
  },
  {
    id: 'lab', label: 'Valores de Laboratorio', subtitle: 'Rangos de referencia',
    icon: 'flask-outline', gradient: ['#059669', '#047857'],
    image: require('../assets/images/conditions/glucose.jpg'),
    route: 'LabValues', premium: true,
  },
  {
    id: 'protocols', label: 'Protocolos', subtitle: 'Emergencias paso a paso',
    icon: 'hospital-box-outline', gradient: ['#DC2626', '#B91C1C'],
    image: require('../assets/images/conditions/iv_drip.jpg'),
    route: 'EmergencyProtocols', premium: true,
  },
  {
    id: 'nanda', label: 'NANDA-NIC-NOC', subtitle: 'Diagnósticos de enfermería',
    icon: 'clipboard-check-outline', gradient: ['#2563EB', '#1D4ED8'],
    image: require('../assets/images/conditions/ecg.jpg'),
    route: 'NandaScreen', premium: true,
  },
  {
    id: 'dashboard', label: 'Mi Progreso', subtitle: 'Estadísticas y actividad',
    icon: 'chart-arc', gradient: ['#8B5CF6', '#7C3AED'],
    image: require('../assets/images/conditions/blood_pressure.jpg'),
    route: 'Dashboard', premium: true,
  },
  {
    id: 'favorites', label: 'Mis Favoritos', subtitle: 'Patologías guardadas',
    icon: 'heart-outline', gradient: ['#EC4899', '#DB2777'],
    image: require('../assets/images/conditions/chest_xray.jpg'),
    route: 'AllFavorites', premium: false,
  },
  {
    id: 'notes', label: 'Mis Notas', subtitle: 'Apuntes personales',
    icon: 'note-text-outline', gradient: ['#F59E0B', '#D97706'],
    image: require('../assets/images/conditions/bandage.jpg'),
    route: 'AllNotes', premium: false,
  },
  {
    id: 'premium', label: 'Premium', subtitle: 'Desbloquea todo el contenido',
    icon: 'crown-outline', gradient: ['#6D28D9', '#4C1D95'],
    image: require('../assets/images/conditions/surgery.jpg'),
    route: 'PremiumScreen', premium: false,
  },
  {
    id: 'settings', label: 'Configuración', subtitle: 'Tema, datos y más',
    icon: 'cog-outline', gradient: ['#6B7280', '#4B5563'],
    image: require('../assets/images/conditions/kidney.jpg'),
    route: 'SettingsScreen', premium: false,
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
            Recursos clinicos y de estudio
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
          {TOOLS.map(tool => (
            <TouchableOpacity
              key={tool.id}
              onPress={() => handlePress(tool)}
              activeOpacity={0.85}
              style={{
                width: cardWidth,
                height: rs.space(120),
                borderRadius: 20,
                overflow: 'hidden',
                elevation: 4,
                shadowColor: tool.gradient[1],
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
              }}
            >
              <ImageBackground
                source={tool.image}
                style={{ flex: 1 }}
                imageStyle={{ borderRadius: 20 }}
              >
                <LinearGradient
                  colors={[tool.gradient[0] + '90', tool.gradient[1] + 'E8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.3, y: 1 }}
                  style={{
                    flex: 1, borderRadius: 20,
                    padding: rs.space(14),
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Top: icon + premium badge */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{
                      width: 38, height: 38, borderRadius: 12,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <MaterialCommunityIcons name={tool.icon} size={20} color="#fff" />
                    </View>
                    {tool.premium && (
                      <View style={{
                        width: 22, height: 22, borderRadius: 11,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <MaterialCommunityIcons name="star" size={12} color="#FFD700" />
                      </View>
                    )}
                  </View>

                  {/* Bottom: label + subtitle */}
                  <View>
                    <Text style={{ fontSize: rs.font(13), fontWeight: '800', color: '#fff' }} numberOfLines={1}>
                      {tool.label}
                    </Text>
                    <Text style={{ fontSize: rs.font(10), color: 'rgba(255,255,255,0.75)', marginTop: 2 }} numberOfLines={1}>
                      {tool.subtitle}
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
