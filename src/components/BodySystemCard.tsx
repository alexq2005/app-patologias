// ============================================================
// BodySystemCard — card for the 2-column body systems grid
// ============================================================

import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { BODY_SYSTEM_ICONS } from '../utils/colors';
import { getSystemImage } from '../utils/systemImages';
import type { ThemeColors } from '../utils/colors';
import type { BodySystem } from '../types';
import { SPACING, RADIUS } from '../utils/spacing';

interface BodySystemCardProps {
  system: BodySystem;
  onPress: (system: BodySystem) => void;
  pathologyCount: number;
}

export function BodySystemCard({ system, onPress, pathologyCount }: BodySystemCardProps) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();

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
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <ImageBackground
          source={getSystemImage(system.id)}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <LinearGradient
            colors={[system.color + '80', system.color + 'D0']}
            locations={[0, 0.7]}
            style={styles.gradient}
          >
            {/* Badge count */}
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pathologyCount}</Text>
              </View>
            </View>

            {/* Bottom content */}
            <View style={styles.bottomContent}>
              <Icon name={iconName} size={rs.font(20)} color="#fff" />
              <Text style={styles.systemName} numberOfLines={2}>
                {system.nombre}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  imageBackground: {
    width: '100%',
    height: 130,
  },
  image: {
    borderRadius: 18,
  },
  gradient: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  systemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 18,
  },
});
