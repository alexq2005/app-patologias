// ============================================================
// PathologyCard — list item card for a single pathology
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale } from '../utils/responsive';
import { neuCard } from '../utils/neumorphism';
import { BODY_SYSTEM_COLORS } from '../utils/colors';
import { getConditionImage } from '../utils/conditionImages';
import type { ThemeColors } from '../utils/colors';
import type { ResponsiveScale } from '../utils/responsive';
import type { Pathology } from '../types';
import { EmergencyBadge } from './EmergencyBadge';

// ── Props ────────────────────────────────────────────────────

interface PathologyCardProps {
  pathology: Pathology;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isPremiumLocked?: boolean;
  /** Human-readable name of the body system (e.g. "Cardiovascular") */
  bodySystemName?: string;
}

// ── Component ────────────────────────────────────────────────

export function PathologyCard({
  pathology,
  onPress,
  isFavorite,
  onToggleFavorite,
  isPremiumLocked = false,
  bodySystemName,
}: PathologyCardProps) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();

  // Press scale animation
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [scale]);

  const systemColor = BODY_SYSTEM_COLORS[pathology.bodySystemId];

  // Collect up to 3 signs/symptoms for the tag row
  const allTags = [
    ...pathology.signosYSintomas.signos,
    ...pathology.signosYSintomas.sintomas,
  ].slice(0, 3);

  const styles = createStyles(colors, rs);

  return (
    <TouchableWithoutFeedback
      onPress={isPremiumLocked ? undefined : onPress}
      onPressIn={isPremiumLocked ? undefined : handlePressIn}
      onPressOut={isPremiumLocked ? undefined : handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={pathology.nombre}
      accessibilityState={{ disabled: isPremiumLocked }}
    >
      <Animated.View
        style={[
          styles.card,
          neuCard(colors),
          { transform: [{ scale }] },
          isPremiumLocked && styles.lockedCard,
        ]}
      >
        {/* Left thumbnail image */}
        <View style={styles.thumbnailWrap}>
          <Image
            source={getConditionImage(pathology.id, pathology.bodySystemId)}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View
            style={[
              styles.thumbnailOverlay,
              { backgroundColor: systemColor + '40' },
            ]}
          />
        </View>

        {/* Card body */}
        <View style={styles.body}>
          {/* Top row: name + favorite */}
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
              {pathology.nombre}
            </Text>
            <TouchableWithoutFeedback
              onPress={e => {
                // Prevent triggering the card press
                e.stopPropagation?.();
                onToggleFavorite();
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={
                isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
              }
            >
              <View style={styles.heartWrapper}>
                <MaterialCommunityIcons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={rs.font(18)}
                  color={isFavorite ? colors.accent : colors.textLight}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Body system name */}
          {bodySystemName ? (
            <Text style={styles.systemName} numberOfLines={1}>
              {bodySystemName}
            </Text>
          ) : null}

          {/* Middle row: emergency badge (right-aligned) */}
          <View style={styles.badgeRow}>
            <EmergencyBadge level={pathology.emergencyLevel} />
          </View>

          {/* Signs/symptoms tags */}
          {allTags.length > 0 && (
            <View style={styles.tagsRow}>
              {allTags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText} numberOfLines={1}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Premium lock overlay */}
        {isPremiumLocked && (
          <View style={styles.lockOverlay}>
            <View style={styles.lockIconWrapper}>
              <MaterialCommunityIcons
                name="lock"
                size={rs.font(22)}
                color={colors.textSecondary}
              />
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// ── Styles factory ───────────────────────────────────────────

function createStyles(colors: ThemeColors, rs: ResponsiveScale) {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      marginHorizontal: rs.space(16),
      marginVertical: rs.space(5),
      minHeight: rs.space(80),
      overflow: 'hidden',
    },
    lockedCard: {
      opacity: 0.55,
    },
    thumbnailWrap: {
      width: rs.space(56),
      alignSelf: 'stretch',
      overflow: 'hidden',
      borderTopLeftRadius: 18,
      borderBottomLeftRadius: 18,
    },
    thumbnail: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
    thumbnailOverlay: {
      ...StyleSheet.absoluteFillObject,
    },
    body: {
      flex: 1,
      paddingHorizontal: rs.space(12),
      paddingVertical: rs.space(10),
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    name: {
      flex: 1,
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
      lineHeight: rs.font(21),
      marginRight: rs.space(6),
    },
    heartWrapper: {
      paddingTop: 2,
    },
    systemName: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      marginTop: rs.space(2),
      fontWeight: '400',
    },
    badgeRow: {
      flexDirection: 'row',
      marginTop: rs.space(6),
      minHeight: rs.space(20),
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: rs.space(6),
      gap: rs.space(4),
    },
    tag: {
      backgroundColor: colors.borderLight,
      borderRadius: 50,
      paddingHorizontal: rs.space(8),
      paddingVertical: rs.space(2),
      maxWidth: rs.space(120),
    },
    tagText: {
      fontSize: rs.font(10),
      color: colors.textSecondary,
      fontWeight: '500',
    },
    lockOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 18,
    },
    lockIconWrapper: {
      width: rs.space(36),
      height: rs.space(36),
      borderRadius: rs.space(18),
      backgroundColor: colors.neuInsetBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
