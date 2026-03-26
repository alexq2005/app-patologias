// ============================================================
// BodySystemCard — card for the 2-column body systems grid
// ============================================================

import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard } from '../utils/neumorphism';
import { BODY_SYSTEM_ICONS } from '../utils/colors';
import { getSystemImage } from '../utils/systemImages';
import type { ThemeColors } from '../utils/colors';
import type { BodySystem } from '../types';
import { SPACING, RADIUS } from '../utils/spacing';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface BodySystemCardProps {
  system: BodySystem;
  onPress: (system: BodySystem) => void;
  pathologyCount: number;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function BodySystemCard({ system, onPress, pathologyCount }: BodySystemCardProps) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = createStyles(colors, rs);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    onPress(system);
  }, [onPress, system]);

  const iconName = BODY_SYSTEM_ICONS[system.id] ?? 'hospital-box-outline';

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={`${system.nombre}, ${pathologyCount} patologías`}
    >
      <Animated.View
        style={[
          styles.card,
          neuCard(colors),
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Background image */}
        <Image
          source={getSystemImage(system.id)}
          style={styles.bgImage}
          resizeMode="cover"
        />
        {/* Gradient overlay for readability */}
        <View style={[styles.imageOverlay, { backgroundColor: colors.cardBackground }]} />

        {/* Top accent bar */}
        <View style={[styles.accentBar, { backgroundColor: system.color }]} />

        {/* Icon circle */}
        <View style={[styles.iconCircle, { backgroundColor: system.color + '20' }]}>
          <Icon name={iconName} size={rs.font(24)} color={system.color} />
        </View>

        {/* System name */}
        <Text style={styles.systemName} numberOfLines={2}>
          {system.nombre}
        </Text>

        {/* Pathology count badge */}
        <View style={[styles.badge, { backgroundColor: system.color + '12', borderColor: system.color + '30' }]}>
          <Text style={[styles.badgeCount, { color: system.color }]}>
            {pathologyCount}
          </Text>
          <Text style={[styles.badgeText, { color: system.color }]}>
            patologias
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// ─────────────────────────────────────────────
// Styles factory
// ─────────────────────────────────────────────

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    card: {
      flex: 1,
      margin: rs.space(SPACING.sm),
      paddingTop: rs.space(SPACING.lg + 4),
      paddingBottom: rs.space(SPACING.lg),
      paddingHorizontal: rs.space(SPACING.md),
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: rs.space(155),
      overflow: 'hidden',
    },
    bgImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      opacity: 0.15,
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.55,
    },
    accentBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      borderTopLeftRadius: RADIUS.lg,
      borderTopRightRadius: RADIUS.lg,
    },
    iconCircle: {
      width: rs.space(48),
      height: rs.space(48),
      borderRadius: rs.space(24),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: rs.space(SPACING.sm),
    },
    systemName: {
      fontSize: rs.font(12),
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
      marginBottom: rs.space(SPACING.sm),
      lineHeight: rs.font(16),
      paddingHorizontal: rs.space(2),
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: rs.space(3),
      borderRadius: RADIUS.pill,
      borderWidth: 1,
      gap: rs.space(3),
    },
    badgeCount: {
      fontSize: rs.font(12),
      fontWeight: '800',
    },
    badgeText: {
      fontSize: rs.font(10),
      fontWeight: '500',
    },
  });
