// ============================================================
// MiSuiteScreen — Hub del ecosistema de 3 apps de enfermería
// Detecta cuáles están instaladas y ofrece abrir o descargar
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale } from '../utils/responsive';
import { APPS, chooseLaunchUrls, type AppEntry, type InstallStatus } from '../services/miSuite';

export function MiSuiteScreen() {
  const { colors, isDark } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const [statuses, setStatuses] = useState<Record<string, InstallStatus>>({});

  const checkInstalls = useCallback(async () => {
    const next: Record<string, InstallStatus> = {};
    for (const app of APPS) {
      if (app.isCurrent) {
        next[app.id] = 'installed';
        continue;
      }
      try {
        const can = await Linking.canOpenURL(app.scheme);
        next[app.id] = can ? 'installed' : 'missing';
      } catch {
        next[app.id] = 'missing';
      }
    }
    setStatuses(next);
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkInstalls();
    }, [checkInstalls]),
  );

  useEffect(() => {
    setStatuses(Object.fromEntries(APPS.map(a => [a.id, 'checking'])));
  }, []);

  const handlePress = useCallback(async (app: AppEntry) => {
    const status = statuses[app.id] || 'missing';
    const urls = chooseLaunchUrls(app, status);
    for (const url of urls) {
      try {
        await Linking.openURL(url);
        return;
      } catch {
        // try next fallback
      }
    }
  }, [statuses]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + rs.space(40) }}>
        {/* Hero */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + rs.space(20), paddingBottom: rs.space(30), paddingHorizontal: rs.space(24) }}
        >
          <View
            style={{
              width: rs.space(60),
              height: rs.space(60),
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.22)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: rs.space(12),
            }}
          >
            <MaterialCommunityIcons name="apps" size={rs.font(32)} color="#fff" />
          </View>
          <Text style={{ fontSize: rs.font(26), fontWeight: '800', color: '#fff', letterSpacing: -0.5 }}>
            Mi suite de enfermería
          </Text>
          <Text style={{ fontSize: rs.font(13), color: 'rgba(255,255,255,0.85)', marginTop: 6, lineHeight: rs.font(19) }}>
            Tres apps que se complementan: aprendé, consultá patologías y verificá fármacos sin salir del ecosistema.
          </Text>
        </LinearGradient>

        {/* Lista de apps */}
        <View style={{ paddingHorizontal: rs.space(16), paddingTop: rs.space(20) }}>
          {APPS.map(app => {
            const status = statuses[app.id] || 'checking';
            const isCurrent = app.isCurrent;

            return (
              <TouchableOpacity
                key={app.id}
                activeOpacity={isCurrent ? 1 : 0.85}
                onPress={() => handlePress(app)}
                disabled={isCurrent}
                style={{
                  backgroundColor: isDark ? colors.surface : colors.neuSurface,
                  borderRadius: 18,
                  marginBottom: rs.space(14),
                  borderWidth: 1,
                  borderColor: colors.borderLight,
                  overflow: 'hidden',
                  elevation: 3,
                  shadowColor: app.gradient[1],
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.18,
                  shadowRadius: 8,
                }}
              >
                <LinearGradient
                  colors={app.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    padding: rs.space(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: rs.space(12),
                  }}
                >
                  <View
                    style={{
                      width: rs.space(46),
                      height: rs.space(46),
                      borderRadius: 12,
                      backgroundColor: 'rgba(255,255,255,0.22)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons name={app.icon} size={rs.font(26)} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: 'rgba(255,255,255,0.85)', letterSpacing: 1 }}>
                      {app.tagline.toUpperCase()}
                    </Text>
                    <Text style={{ fontSize: rs.font(16), fontWeight: '800', color: '#fff', marginTop: 2 }} numberOfLines={2}>
                      {app.name}
                    </Text>
                  </View>
                  {isCurrent && (
                    <View
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        paddingHorizontal: rs.space(8),
                        paddingVertical: rs.space(4),
                        borderRadius: 8,
                      }}
                    >
                      <Text style={{ fontSize: rs.font(9), fontWeight: '900', color: app.gradient[1], letterSpacing: 0.5 }}>
                        ESTÁS AQUÍ
                      </Text>
                    </View>
                  )}
                </LinearGradient>

                <View style={{ padding: rs.space(14) }}>
                  <Text style={{ fontSize: rs.font(13), color: colors.textSecondary, lineHeight: rs.font(19), marginBottom: rs.space(12) }}>
                    {app.description}
                  </Text>

                  {!isCurrent && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {status === 'checking' && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <ActivityIndicator size="small" color={colors.textLight} />
                          <Text style={{ fontSize: rs.font(12), color: colors.textLight }}>Detectando...</Text>
                        </View>
                      )}
                      {status === 'installed' && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <MaterialCommunityIcons name="check-circle" size={rs.font(16)} color="#16A34A" />
                          <Text style={{ fontSize: rs.font(12), color: '#16A34A', fontWeight: '700' }}>Instalada</Text>
                        </View>
                      )}
                      {status === 'missing' && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <MaterialCommunityIcons name="download" size={rs.font(16)} color={colors.textLight} />
                          <Text style={{ fontSize: rs.font(12), color: colors.textLight }}>No instalada</Text>
                        </View>
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 6,
                          backgroundColor: app.gradient[1],
                          paddingHorizontal: rs.space(14),
                          paddingVertical: rs.space(8),
                          borderRadius: 999,
                        }}
                      >
                        <Text style={{ fontSize: rs.font(12), color: '#fff', fontWeight: '800' }}>
                          {status === 'installed' ? 'Abrir' : 'Descargar'}
                        </Text>
                        <MaterialCommunityIcons
                          name={status === 'installed' ? 'open-in-new' : 'google-play'}
                          size={rs.font(14)}
                          color="#fff"
                        />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          <View
            style={{
              backgroundColor: isDark ? colors.surface : colors.neuSurface,
              padding: rs.space(14),
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.borderLight,
              marginTop: rs.space(8),
            }}
          >
            <Text style={{ fontSize: rs.font(11), color: colors.textLight, lineHeight: rs.font(17), textAlign: 'center' }}>
              ★ Cada app es independiente. Usalas juntas para tener el ecosistema completo de estudio + referencia clínica.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
