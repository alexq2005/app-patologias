// ============================================================
// ScalesScreen — clinical scales list (Tab 4) — redesigned
// ============================================================

import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { useTabBar } from '../context/TabBarContext';
import { useResponsiveScale } from '../utils/responsive';
import { usePathologyData } from '../hooks/usePathologyData';
import { SearchBar } from '../components/SearchBar';
import { PremiumGate } from '../components/PremiumGate';
import { neuCard } from '../utils/neumorphism';
import { SCALE_COLORS, SCALE_ICONS, type ThemeColors } from '../utils/colors';
import { getScaleImage } from '../utils/scaleImages';
import type { ClinicalScale, RootStackParamList, TabParamList } from '../types';
import { SPACING, RADIUS } from '../utils/spacing';

const { width: SCREEN_W } = Dimensions.get('window');

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Escalas'>,
  NativeStackNavigationProp<RootStackParamList>
>;

// ─────────────────────────────────────────────
// Featured scales (shown as hero cards at top)
// ─────────────────────────────────────────────

const FEATURED_IDS = ['scale_glasgow', 'scale_news2', 'scale_norton', 'scale_eva'];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function ScalesScreen() {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { scales } = usePathologyData();
  const { handleScroll } = useTabBar();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: 100, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(scales.map(s => s.categoria)));
    return ['Todas', ...cats.sort()];
  }, [scales]);

  const filtered = useMemo(() => {
    let result = scales;
    if (selectedCategory !== 'Todas') {
      result = result.filter(s => s.categoria === selectedCategory);
    }
    if (query.trim().length > 0) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        s =>
          s.nombre.toLowerCase().includes(q) ||
          s.abreviatura.toLowerCase().includes(q) ||
          s.descripcion.toLowerCase().includes(q),
      );
    }
    return result;
  }, [scales, selectedCategory, query]);

  const featuredScales = useMemo(
    () => scales.filter(s => FEATURED_IDS.includes(s.id)),
    [scales],
  );

  const handleScalePress = useCallback(
    (scale: ClinicalScale) => {
      navigation.navigate('ScaleDetail', { scaleId: scale.id });
    },
    [navigation],
  );

  // ─────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────

  const renderItem = useCallback(
    ({ item }: { item: ClinicalScale }) => {
      const accentColor = SCALE_COLORS[item.categoria] ?? colors.primary;
      const iconName = SCALE_ICONS[item.categoria] ?? 'clipboard-pulse-outline';

      return (
        <TouchableOpacity
          onPress={() => handleScalePress(item)}
          activeOpacity={0.85}
          style={{
            marginHorizontal: rs.space(16),
            marginVertical: rs.space(4),
            borderRadius: 16,
            overflow: 'hidden',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
        >
          <ImageBackground
            source={getScaleImage(item.categoria)}
            style={{ width: '100%', minHeight: rs.space(90) }}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient
              colors={[accentColor + '95', accentColor + 'E5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                flex: 1,
                borderRadius: 16,
                padding: rs.space(14),
                flexDirection: 'row',
                alignItems: 'center',
                gap: rs.space(12),
              }}
            >
              {/* Icon */}
              <View style={{
                width: 44, height: 44, borderRadius: 14,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <MaterialCommunityIcons name={iconName} size={24} color="#fff" />
              </View>

              {/* Content */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: rs.font(15), fontWeight: '800', color: '#fff' }} numberOfLines={1}>
                  {item.nombre}
                </Text>
                <Text style={{ fontSize: rs.font(11), color: 'rgba(255,255,255,0.8)', marginTop: 2 }} numberOfLines={1}>
                  {item.descripcion}
                </Text>
                <View style={{
                  flexDirection: 'row', alignItems: 'center', gap: rs.space(8), marginTop: rs.space(6),
                }}>
                  <View style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2,
                  }}>
                    <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: '#fff' }}>
                      {item.abreviatura}
                    </Text>
                  </View>
                  <Text style={{ fontSize: rs.font(10), color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' }}>
                    {item.categoria.replace(/_/g, ' ')}
                  </Text>
                </View>
              </View>

              {/* Arrow */}
              <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.6)" />
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      );
    },
    [handleScalePress, colors, rs],
  );

  const ListHeaderComponent = useMemo(
    () => (
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Featured scales carousel */}
        {query.length === 0 && selectedCategory === 'Todas' && (
          <View style={{ marginBottom: rs.space(8) }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              paddingHorizontal: rs.space(16), marginBottom: rs.space(10),
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: rs.space(6) }}>
                <MaterialCommunityIcons name="star-four-points" size={14} color={colors.primary} />
                <Text style={{ fontSize: rs.font(14), fontWeight: '800', color: colors.text }}>
                  Más utilizadas
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: rs.space(16), gap: rs.space(10) }}
            >
              {featuredScales.map(scale => {
                const accentColor = SCALE_COLORS[scale.categoria] ?? colors.primary;
                return (
                  <TouchableOpacity
                    key={scale.id}
                    onPress={() => handleScalePress(scale)}
                    activeOpacity={0.85}
                    style={{
                      width: SCREEN_W * 0.42,
                      height: rs.space(140),
                      borderRadius: 20,
                      overflow: 'hidden',
                      elevation: 4,
                    }}
                  >
                    <ImageBackground
                      source={getScaleImage(scale.categoria)}
                      style={{ flex: 1 }}
                      imageStyle={{ borderRadius: 20 }}
                    >
                      <LinearGradient
                        colors={['transparent', accentColor + 'D0']}
                        locations={[0.2, 1]}
                        style={{
                          flex: 1, borderRadius: 20,
                          padding: rs.space(12),
                          justifyContent: 'space-between',
                        }}
                      >
                        <View style={{
                          backgroundColor: 'rgba(255,255,255,0.25)',
                          borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3,
                          alignSelf: 'flex-start',
                        }}>
                          <Text style={{ fontSize: rs.font(11), fontWeight: '800', color: '#fff' }}>
                            {scale.abreviatura}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: rs.font(13), fontWeight: '800', color: '#fff' }} numberOfLines={2}>
                            {scale.nombre}
                          </Text>
                          <Text style={{ fontSize: rs.font(10), color: 'rgba(255,255,255,0.8)', marginTop: 2, textTransform: 'capitalize' }}>
                            {scale.categoria.replace(/_/g, ' ')}
                          </Text>
                        </View>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Search */}
        <View style={{ paddingHorizontal: rs.space(0), marginTop: rs.space(8) }}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery('')}
            placeholder="Buscar escala clínica..."
          />
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: rs.space(16), paddingVertical: rs.space(8), gap: rs.space(8) }}
        >
          {categories.map(cat => {
            const isActive = cat === selectedCategory;
            const accentColor = cat === 'Todas' ? colors.primary : (SCALE_COLORS[cat] ?? colors.primary);
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.75}
                style={{
                  paddingHorizontal: rs.space(14),
                  paddingVertical: rs.space(7),
                  borderRadius: 20,
                  backgroundColor: isActive ? accentColor : colors.neuSurface,
                  borderWidth: 1,
                  borderColor: isActive ? accentColor : colors.border,
                }}
              >
                <Text style={{
                  fontSize: rs.font(12), fontWeight: '600',
                  color: isActive ? '#fff' : colors.textSecondary,
                  textTransform: 'capitalize',
                }}>
                  {cat.replace(/_/g, ' ')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Count */}
        <Text style={{
          fontSize: rs.font(12), color: colors.textLight,
          marginHorizontal: rs.space(16), marginBottom: rs.space(4),
        }}>
          {filtered.length} {filtered.length === 1 ? 'escala' : 'escalas'}
        </Text>
      </Animated.View>
    ),
    [fadeAnim, query, categories, selectedCategory, filtered.length, featuredScales, colors, rs, handleScalePress],
  );

  const ListFooterComponent = useMemo(
    () => (
      <View style={{ marginTop: rs.space(20), paddingHorizontal: rs.space(16), gap: rs.space(8) }}>
        <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 }}>
          Acceso rápido
        </Text>
        {[
          { name: 'Valores de Laboratorio', sub: 'Rangos de referencia', icon: 'test-tube', color: '#2563EB', screen: 'LabValues' as const },
          { name: 'Protocolos de Emergencia', sub: 'Actuación por patología', icon: 'ambulance', color: '#DC2626', screen: 'EmergencyProtocols' as const },
        ].map(link => (
          <TouchableOpacity
            key={link.screen}
            onPress={() => navigation.navigate(link.screen)}
            activeOpacity={0.75}
            style={[{
              flexDirection: 'row', alignItems: 'center',
              padding: rs.space(14), borderRadius: 16, gap: rs.space(12),
            }, neuCard(colors)]}
          >
            <View style={{
              width: 40, height: 40, borderRadius: 12,
              backgroundColor: link.color + '15',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MaterialCommunityIcons name={link.icon} size={20} color={link.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.text }}>{link.name}</Text>
              <Text style={{ fontSize: rs.font(11), color: colors.textSecondary }}>{link.sub}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>
        ))}
      </View>
    ),
    [navigation, colors, rs],
  );

  return (
    <PremiumGate feature="Escalas Clinicas">
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        {/* Header */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + rs.space(16), paddingBottom: rs.space(24), paddingHorizontal: rs.space(24) }}
        >
          <Text style={{ fontSize: rs.font(26), fontWeight: '800', color: '#fff', letterSpacing: -0.5 }}>
            Escalas Clinicas
          </Text>
          <Text style={{ fontSize: rs.font(13), color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
            {scales.length} escalas de valoracion de enfermeria
          </Text>
        </LinearGradient>

        {/* List */}
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: rs.space(12), paddingBottom: insets.bottom + rs.space(80) }}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingVertical: rs.space(40) }}>
              <MaterialCommunityIcons name="clipboard-search-outline" size={52} color={colors.textLight} />
              <Text style={{ fontSize: rs.font(16), fontWeight: '700', color: colors.text, marginTop: rs.space(12) }}>
                No se encontraron escalas
              </Text>
              <Text style={{ fontSize: rs.font(13), color: colors.textSecondary, marginTop: rs.space(4) }}>
                Intenta con otra busqueda o categoria
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
    </PremiumGate>
  );
}
