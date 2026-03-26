import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { neuCardSubtle } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  title: string;
  icon?: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  accentColor?: string;
  badge?: string;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  initiallyOpen = false,
  accentColor,
  badge,
}: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const accent = accentColor || colors.primary;
  const rotateAnim = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const next = !isOpen;
    setIsOpen(next);
    Animated.spring(rotateAnim, {
      toValue: next ? 1 : 0,
      useNativeDriver: true,
      speed: 20,
      bounciness: 2,
    }).start();
  };

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, { borderLeftColor: accent }]}
        onPress={toggle}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <View style={styles.titleRow}>
          {icon ? <MaterialCommunityIcons name={icon} size={18} color={accent} style={{ marginRight: 8 }} /> : null}
          <Text style={styles.title}>{title}</Text>
          {badge ? (
            <View style={[styles.badge, { backgroundColor: accent + '20' }]}>
              <Text style={[styles.badgeText, { color: accent }]}>{badge}</Text>
            </View>
          ) : null}
        </View>
        <Animated.Text style={[styles.chevron, { transform: [{ rotate: chevronRotate }] }]}>▼</Animated.Text>
      </TouchableOpacity>

      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: {
    marginHorizontal: rs.space(16),
    marginVertical: 4,
    ...neuCardSubtle(colors),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: rs.space(14),
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: rs.font(18),
    marginRight: rs.space(8),
  },
  title: {
    fontSize: rs.font(15),
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  badge: {
    paddingHorizontal: rs.space(8),
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: rs.space(8),
  },
  badgeText: {
    fontSize: rs.font(11),
    fontWeight: '700',
  },
  chevron: {
    fontSize: rs.font(12),
    color: colors.textLight,
    marginLeft: rs.space(8),
  },
  content: {
    paddingHorizontal: rs.space(14),
    paddingBottom: rs.space(14),
  },
});
