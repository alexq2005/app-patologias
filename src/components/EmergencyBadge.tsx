// ============================================================
// EmergencyBadge — pill badge showing emergency level
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { EMERGENCY_LEVEL_COLORS } from '../utils/colors';
import type { EmergencyLevel } from '../types';

// Hex → rgba helper (handles 6-digit hex only)
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const LEVEL_CONFIG: Record<
  Exclude<EmergencyLevel, 'ninguno'>,
  { label: string; icon: string }
> = {
  critico:  { label: 'Crítico',  icon: 'alert-circle' },
  moderado: { label: 'Moderado', icon: 'alert' },
  leve:     { label: 'Leve',     icon: 'information' },
};

interface EmergencyBadgeProps {
  level: EmergencyLevel;
}

export function EmergencyBadge({ level }: EmergencyBadgeProps) {
  // Nothing rendered for "ninguno"
  if (level === 'ninguno') return null;

  const config = LEVEL_CONFIG[level];
  const color = EMERGENCY_LEVEL_COLORS[level];
  const bgColor = hexToRgba(color, 0.15);
  const borderColor = hexToRgba(color, 0.30);

  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: bgColor, borderColor },
      ]}
    >
      <MaterialCommunityIcons
        name={config.icon}
        size={11}
        color={color}
        style={styles.icon}
      />
      <Text style={[styles.label, { color }]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  icon: {
    marginRight: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
