// ============================================================
// OnboardingScreen — First-time user introduction (3 slides)
// ============================================================

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
  type ViewToken,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale } from '../utils/responsive';
import { SPACING, RADIUS } from '../utils/spacing';
import type { RootStackParamList } from '../types';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  onComplete: () => void;
}

interface SlideData {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgCircleColor: string;
}

// ─────────────────────────────────────────────
// Slide data
// ─────────────────────────────────────────────

const SLIDES: SlideData[] = [
  {
    id: '1',
    title: '151 Patologías',
    description:
      'Toda la información clínica que necesitas, organizada por sistemas corporales',
    icon: 'book-open-page-variant',
    iconColor: '#FFFFFF',
    bgCircleColor: '#6D28D9',
  },
  {
    id: '2',
    title: 'Cuidados de Enfermería',
    description:
      'NANDA, NIC, NOC, medicamentos, diagnósticos y valoraciones de enfermería',
    icon: 'heart-pulse',
    iconColor: '#FFFFFF',
    bgCircleColor: '#DC2626',
  },
  {
    id: '3',
    title: 'Herramientas Clínicas',
    description:
      'Escalas, valores de laboratorio, protocolos de emergencia y test de conocimiento',
    icon: 'medical-bag',
    iconColor: '#FFFFFF',
    bgCircleColor: '#059669',
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function OnboardingScreen({ navigation, onComplete }: Props) {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  const flatListRef = useRef<FlatList<SlideData>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // ─── Handlers ───

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleSkip = useCallback(() => {
    onComplete();
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  }, [navigation, onComplete]);

  const handleStart = useCallback(() => {
    onComplete();
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  }, [navigation, onComplete]);

  const isLastPage = currentIndex === SLIDES.length - 1;

  // ─── Render slide ───

  const renderSlide = useCallback(
    ({ item }: { item: SlideData }) => (
      <View style={[styles.slide, { width: screenWidth }]}>
        {/* Icon circle */}
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: item.bgCircleColor,
              width: rs.space(140),
              height: rs.space(140),
              borderRadius: rs.space(70),
            },
          ]}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={rs.font(80)}
            color={item.iconColor}
          />
        </View>

        {/* Title */}
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: rs.font(22),
              marginTop: SPACING.xxl,
            },
          ]}
        >
          {item.title}
        </Text>

        {/* Description */}
        <Text
          style={[
            styles.description,
            {
              color: colors.textSecondary,
              fontSize: rs.font(14),
              marginTop: SPACING.md,
              paddingHorizontal: SPACING.xxxl,
            },
          ]}
        >
          {item.description}
        </Text>
      </View>
    ),
    [screenWidth, colors, rs],
  );

  // ─── Dot indicators ───

  const renderDots = () =>
    SLIDES.map((_, index) => {
      const inputRange = [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ];

      const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange: [8, 24, 8],
        extrapolate: 'clamp',
      });

      const dotOpacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              width: dotWidth,
              opacity: dotOpacity,
              backgroundColor: colors.primary,
            },
          ]}
        />
      );
    });

  // ─── Layout ───

  return (
    <View style={[styles.container, { backgroundColor: colors.neuBackground }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.neuBackground}
      />

      {/* Skip button (top-right, non-last pages) */}
      {!isLastPage && (
        <TouchableOpacity
          style={[
            styles.skipButton,
            {
              top: insets.top + SPACING.md,
              right: SPACING.lg,
            },
          ]}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.skipText,
              { color: colors.textSecondary, fontSize: rs.font(14) },
            ]}
          >
            Omitir
          </Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      />

      {/* Bottom section: dots + button */}
      <View
        style={[
          styles.bottomSection,
          { paddingBottom: Math.max(insets.bottom, SPACING.xxl) + SPACING.lg },
        ]}
      >
        {/* Dot indicators */}
        <View style={styles.dotsContainer}>{renderDots()}</View>

        {/* CTA button (last page) */}
        {isLastPage && (
          <TouchableOpacity
            onPress={handleStart}
            activeOpacity={0.85}
            style={{ marginTop: SPACING.xxl }}
          >
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.ctaButton,
                {
                  paddingVertical: rs.space(14),
                  paddingHorizontal: rs.space(48),
                  borderRadius: RADIUS.pill,
                },
              ]}
            >
              <Text
                style={[
                  styles.ctaText,
                  { color: colors.gradientText, fontSize: rs.font(16) },
                ]}
              >
                Comenzar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    zIndex: 10,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  skipText: {
    fontWeight: '600',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSection: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  ctaButton: {
    elevation: 4,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaText: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
