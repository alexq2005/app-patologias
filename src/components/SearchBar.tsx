import React, { useRef, useCallback, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { neuInset } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Buscar patologia...',
  autoFocus = false,
}: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const inputRef = useRef<TextInput>(null);

  const handleClear = useCallback(() => {
    onClear();
    inputRef.current?.focus();
  }, [onClear]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={20} color={colors.textLight} style={{ marginRight: 8 }} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityRole="search"
        accessibilityLabel="Buscar patologia"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton} accessibilityRole="button" accessibilityLabel="Limpiar busqueda">
          <MaterialCommunityIcons name="close-circle" size={18} color={colors.textLight} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    ...neuInset(colors),
    marginHorizontal: rs.space(16),
    marginVertical: rs.space(8),
    paddingHorizontal: rs.space(14),
  },
  input: {
    flex: 1,
    fontSize: rs.font(15),
    color: colors.text,
    paddingVertical: rs.space(12),
  },
  clearButton: {
    padding: rs.space(6),
  },
});
