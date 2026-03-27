// ============================================================
// OnboardingScreen — First-time user introduction (3 slides)
// Full-screen clinical photos with gradient overlays
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
  ImageBackground,
  type ImageSourcePropType,
  type ViewToken,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
  subtitle: string;
  description: string;
  image: ImageSourcePropType;
  gradient: [string, string, string];
  stat: string;
  statLabel: string;
}

// ─────────────────────────────────────────────
// Slide data — clinical photos with meaning
// ─────────────────────────────────────────────

const SLIDES: SlideData[] = [
  {
    id: '1',
    title: 'Tu referencia clínica\nen el bolsillo',
    subtitle: 'PATOLOGÍAS DE ENFERMERÍA',
    description:
      'Fisiopatología, signos, diagnósticos y cuidados de enfermería para cada patología',
    image: require('../assets/images/conditions/iv_drip.jpg'),
    gradient: ['rgba(109,40,217,0.85)', 'rgba(109,40,217,0.6)', 'transparent'],
    stat: '151',
    statLabel: 'Patologías clínicas',
  },
  {
    id: '2',
    title: 'NANDA, NIC, NOC\nintegrados',
    subtitle: 'CUIDADOS DE ENFERMERÍA',
    description:
      '455 diagnósticos enfermeros con características definitorias y factores relacionados',
    image: require('../assets/images/conditions/heart_monitor.jpg'),
    gradient: ['rgba(220,38,38,0.85)', 'rgba(220,38,38,0.6)', 'transparent'],
    stat: '455',
    statLabel: 'Diagnósticos NANDA',
  },
  {
    id: '3',
    title: 'Escalas, laboratorio\ny protocolos',
    subtitle: 'HERRAMIENTAS CLÍNICAS',
    description:
      'Glasgow, Norton, valores de referencia, protocolos de emergencia y diagnóstico diferencial',
    image: require('../assets/images/conditions/blood_pressure.jpg'),
    gradient: ['rgba(5,150,105,0.85)', 'rgba(5,150,105,0.6)', 'transparent'],
    stat: '17',
    statLabel: 'Escalas de valoración',
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function OnboardingScreen({ navigation, onComplete }: Props) {
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const flatListRef = useRef<FlatList<SlideData>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = useCallback(() => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      handleSkip();
    }
  }, [currentIndex, handleSkip]);

  const isLastPage = currentIndex === SLIDES.length - 1;

  // ─── Render slide ───

  const renderSlide = useCallback(
    ({ item }: { item: SlideData }) => (
      <View style={{ width: screenWidth, height: screenHeight }}>
        <ImageBackground
          source={item.image}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        >
          {/* Gradient overlay from top */}
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.55 }}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Dark bottom for text legibility */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.92)']}
            start={{ x: 0.5, y: 0.4 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Content */}
          <View style={[styles.slideContent, { paddingTop: insets.top + rs.space(60) }]}>
            {/* Subtitle badge */}
            <View style={styles.subtitleBadge}>
              <Text style={[styles.subtitleText, { fontSize: rs.font(11) }]}>
                {item.subtitle}
              </Text>
            </View>

            {/* Big stat */}
            <Text style={[styles.statNumber, { fontSize: rs.font(72) }]}>
              {item.stat}
            </Text>
            <Text style={[styles.statLabel, { fontSize: rs.font(14) }]}>
              {item.statLabel}
            </Text>
          </View>

          {/* Bottom text */}
          <View style={[styles.bottomText, { paddingBottom: insets.bottom + rs.space(140) }]}>
            <Text style={[styles.title, { fontSize: rs.font(26) }]}>
              {item.title}
            </Text>
            <Text style={[styles.description, { fontSize: rs.font(14), marginTop: rs.space(12) }]}>
              {item.description}
            </Text>
          </View>
        </ImageBackground>
      </View>
    ),
    [screenWidth, screenHeight, rs, insets],
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
        outputRange: [8, 28, 8],
        extrapolate: 'clamp',
      });

      const dotOpacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.4, 1, 0.4],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            { width: dotWidth, opacity: dotOpacity },
          ]}
        />
      );
    });

  // ─── Layout ───

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

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

      {/* Floating bottom controls */}
      <View style={[styles.controls, { paddingBottom: Math.max(insets.bottom, SPACING.lg) + SPACING.md }]}>
        {/* Skip (non-last pages) */}
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.7}
          style={styles.skipButton}
        >
          <Text style={[styles.skipText, { fontSize: rs.font(14) }]}>
            {isLastPage ? '' : 'Omitir'}
          </Text>
        </TouchableOpacity>

        {/* Dots */}
        <View style={styles.dotsContainer}>{renderDots()}</View>

        {/* Next / Start button */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          style={styles.nextButton}
        >
          <Text style={[styles.nextText, { fontSize: rs.font(14) }]}>
            {isLastPage ? 'Comenzar' : 'Siguiente'}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#000',
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  subtitleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  statNumber: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: -2,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 4,
  },
  bottomText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.xxl,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '800',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  description: {
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    lineHeight: 22,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
  },
  skipButton: {
    width: 80,
  },
  skipText: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    width: 80,
    alignItems: 'flex-end',
  },
  nextText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
