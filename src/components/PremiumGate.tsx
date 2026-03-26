import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePremium } from '../context/PremiumContext';
import type { ThemeColors } from '../utils/colors';
import { neuCard } from '../utils/neumorphism';

interface Props {
  feature: string;
  children: React.ReactNode;
}

export function PremiumGate({ feature, children }: Props) {
  const { isPremium, trialDaysLeft } = usePremium();
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (isPremium) return <>{children}</>;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.lockCircle}>
          <MaterialCommunityIcons name="lock-outline" size={48} color={colors.textSecondary} />
        </View>
        <Text style={styles.title}>Contenido Premium</Text>
        <Text style={styles.feature}>{feature}</Text>
        <Text style={styles.description}>
          Esta funcionalidad requiere una suscripcion Premium para acceder.
        </Text>
        {trialDaysLeft === 0 && (
          <View style={styles.expiredBadge}>
            <Text style={styles.expiredText}>Tu prueba gratuita de 14 dias ha finalizado</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => navigation.navigate('PremiumScreen')}
          activeOpacity={0.7}
        >
          <Text style={styles.upgradeButtonText}>Desbloquear Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neuBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    ...neuCard(colors),
    padding: 32,
  },
  lockCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 8 },
  feature: { fontSize: 16, fontWeight: '600', color: colors.primary, marginBottom: 12 },
  description: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 21, marginBottom: 20 },
  expiredBadge: {
    backgroundColor: colors.warning + '15',
    borderWidth: 1,
    borderColor: colors.warning + '30',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  expiredText: { fontSize: 13, color: colors.warning, fontWeight: '600', textAlign: 'center' },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 12,
  },
  upgradeButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  backButton: { paddingVertical: 12, paddingHorizontal: 24 },
  backButtonText: { fontSize: 14, color: colors.textSecondary, fontWeight: '600' },
});
