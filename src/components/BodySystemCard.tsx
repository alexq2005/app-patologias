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
import { getSystemImage } from '../utils/systemImages';
import type { BodySystem } from '../types';

interface BodySystemCardProps {
  system: BodySystem;
  onPress: (system: BodySystem) => void;
  pathologyCount: number;
}

export function BodySystemCard({ system, onPress, pathologyCount }: BodySystemCardProps) {
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
            <View>
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
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    elevation: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#333',
  },
  systemName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 18,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
