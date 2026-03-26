// ============================================================
// ProtocolDetailScreen — step-by-step emergency protocol view
// ============================================================

import React, {
  useMemo,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type {
  RootStackParamList,
  EmergencyProtocol,
  ProtocolStep,
} from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { PROTOCOL_COLORS, PROTOCOL_ICONS, type ThemeColors } from '../utils/colors';
import { neuCard, neuCardSubtle } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'ProtocolDetail'>;

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

interface SectionTitleProps {
  icon: string;
  title: string;
  color: string;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function SectionTitle({ icon, title, color, colors, rs }: SectionTitleProps) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: rs.space(SPACING.lg),
      marginTop: rs.space(SPACING.xl),
      marginBottom: rs.space(SPACING.md),
      gap: rs.space(SPACING.sm),
    }}>
      <MaterialCommunityIcons name={icon} size={20} color={color} />
      <Text style={{ fontSize: rs.font(16), fontWeight: '800', color: colors.text, flex: 1 }}>
        {title}
      </Text>
    </View>
  );
}

interface StepCardProps {
  step: ProtocolStep;
  isLast: boolean;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function StepCard({ step, isLast, colors, rs }: StepCardProps) {
  const isCritical = step.critico === true;

  return (
    <View style={{ flexDirection: 'row', marginHorizontal: rs.space(SPACING.lg) }}>
      {/* Timeline column */}
      <View style={{ alignItems: 'center', width: rs.space(36) }}>
        {/* Step circle */}
        <View style={{
          width: rs.space(32),
          height: rs.space(32),
          borderRadius: rs.space(16),
          backgroundColor: isCritical ? colors.error : colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}>
          <Text style={{ fontSize: rs.font(13), fontWeight: '800', color: '#FFFFFF' }}>
            {step.orden}
          </Text>
        </View>
        {/* Connector line */}
        {!isLast && (
          <View style={{ width: 2, flex: 1, backgroundColor: colors.border, marginTop: rs.space(2) }} />
        )}
      </View>

      {/* Card body */}
      <View style={{
        flex: 1,
        marginLeft: rs.space(SPACING.sm),
        marginBottom: rs.space(SPACING.lg),
      }}>
        <View style={[
          neuCardSubtle(colors),
          {
            padding: rs.space(SPACING.md),
            borderLeftWidth: isCritical ? 3 : 0,
            borderLeftColor: isCritical ? colors.error : 'transparent',
            borderRadius: RADIUS.md,
          },
        ]}>
          {/* Critical flag */}
          {isCritical && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.error + '15',
              borderRadius: RADIUS.xs,
              paddingHorizontal: rs.space(SPACING.sm),
              paddingVertical: rs.space(2),
              alignSelf: 'flex-start',
              marginBottom: rs.space(6),
              gap: rs.space(4),
            }}>
              <MaterialCommunityIcons name="alert-circle" size={12} color={colors.error} />
              <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.error, letterSpacing: 0.5 }}>
                CRÍTICO
              </Text>
            </View>
          )}

          {/* Tiempo badge */}
          {step.tiempo ? (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: rs.space(6),
              gap: rs.space(4),
            }}>
              <MaterialCommunityIcons name="clock-outline" size={13} color={colors.warning} />
              <Text style={{ fontSize: rs.font(12), fontWeight: '600', color: colors.warning }}>
                {step.tiempo}
              </Text>
            </View>
          ) : null}

          {/* Accion */}
          <Text style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.text, lineHeight: 21, marginBottom: step.detalles ? rs.space(6) : 0 }}>
            {step.accion}
          </Text>

          {/* Detalles */}
          {step.detalles ? (
            <Text style={{ fontSize: rs.font(13), color: colors.textSecondary, lineHeight: 19 }}>
              {step.detalles}
            </Text>
          ) : null}

          {/* Farmacos sub-list */}
          {step.farmacos && step.farmacos.length > 0 && (
            <View style={{
              marginTop: rs.space(SPACING.sm),
              backgroundColor: colors.nursing + '0D',
              borderRadius: RADIUS.xs,
              padding: rs.space(SPACING.sm),
              borderWidth: 1,
              borderColor: colors.nursing + '25',
            }}>
              <Text style={{ fontSize: rs.font(11), fontWeight: '700', color: colors.nursing, marginBottom: rs.space(4), textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Fármacos
              </Text>
              {step.farmacos.map((f, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: rs.space(3) }}>
                  <MaterialCommunityIcons name="pill" size={12} color={colors.nursing} style={{ marginRight: rs.space(4), marginTop: 2 }} />
                  <Text style={{ flex: 1, fontSize: rs.font(12), color: colors.text, lineHeight: 18 }}>
                    <Text style={{ fontWeight: '700' }}>{f.nombre}</Text>
                    {' — '}{f.dosis}{' '}
                    <Text style={{ color: colors.textSecondary }}>({f.via})</Text>
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Decision tree */}
          {step.decision ? (
            <View style={{
              marginTop: rs.space(SPACING.sm),
              backgroundColor: colors.info + '0D',
              borderRadius: RADIUS.xs,
              padding: rs.space(SPACING.sm),
              borderWidth: 1,
              borderColor: colors.info + '25',
            }}>
              <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.info, marginBottom: rs.space(SPACING.sm) }}>
                {step.decision.pregunta}
              </Text>
              <View style={{ flexDirection: 'row', gap: rs.space(SPACING.sm) }}>
                <View style={{ flex: 1, backgroundColor: colors.success + '15', borderRadius: RADIUS.xs, padding: rs.space(SPACING.sm), borderLeftWidth: 3, borderLeftColor: colors.success }}>
                  <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.success, marginBottom: rs.space(2) }}>
                    SI
                  </Text>
                  <Text style={{ fontSize: rs.font(12), color: colors.text, lineHeight: 17 }}>
                    {step.decision.si}
                  </Text>
                </View>
                <View style={{ flex: 1, backgroundColor: colors.error + '10', borderRadius: RADIUS.xs, padding: rs.space(SPACING.sm), borderLeftWidth: 3, borderLeftColor: colors.error }}>
                  <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.error, marginBottom: rs.space(2) }}>
                    NO
                  </Text>
                  <Text style={{ fontSize: rs.font(12), color: colors.text, lineHeight: 17 }}>
                    {step.decision.no}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────

export function ProtocolDetailScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { getProtocolById } = usePathologyData();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  const { protocolId } = route.params;
  const protocol = useMemo(() => getProtocolById(protocolId), [getProtocolById, protocolId]);

  useLayoutEffect(() => {
    if (protocol) {
      navigation.setOptions({ title: protocol.nombre });
    }
  }, [navigation, protocol]);

  if (!protocol) {
    return (
      <View style={styles.notFound}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.textLight} />
        <Text style={styles.notFoundText}>Protocolo no encontrado</Text>
      </View>
    );
  }

  const catColor = PROTOCOL_COLORS[protocol.categoria] ?? colors.primary;
  const catIcon = PROTOCOL_ICONS[protocol.categoria] ?? 'hospital-building';

  const sortedSteps = useMemo(
    () => [...protocol.pasos].sort((a, b) => a.orden - b.orden),
    [protocol.pasos],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + rs.space(SPACING.xxxl) }]}
      >
        {/* Description card */}
        <View style={[neuCard(colors), styles.descriptionCard]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(SPACING.sm), gap: rs.space(SPACING.sm) }}>
            <View style={{
              width: rs.space(40),
              height: rs.space(40),
              borderRadius: rs.space(20),
              backgroundColor: catColor + '20',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialCommunityIcons name={catIcon} size={20} color={catColor} />
            </View>
            <View style={{ flex: 1 }}>
              {protocol.abreviatura ? (
                <Text style={{ fontSize: rs.font(12), fontWeight: '600', color: colors.textSecondary }}>
                  {protocol.abreviatura}
                </Text>
              ) : null}
              <View style={{
                alignSelf: 'flex-start',
                backgroundColor: catColor + '18',
                borderRadius: RADIUS.pill,
                paddingHorizontal: rs.space(SPACING.sm),
                paddingVertical: rs.space(2),
                borderWidth: 1,
                borderColor: catColor + '35',
              }}>
                <Text style={{ fontSize: rs.font(11), fontWeight: '600', color: catColor }}>
                  {protocol.categoria.charAt(0).toUpperCase() + protocol.categoria.slice(1)}
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ fontSize: rs.font(14), color: colors.textSecondary, lineHeight: 21 }}>
            {protocol.descripcion}
          </Text>
        </View>

        {/* Banderas Rojas */}
        {protocol.banderasRojas.length > 0 && (
          <>
            <SectionTitle icon="flag" title="Señales de Alarma" color={colors.error} colors={colors} rs={rs} />
            <View style={[neuCard(colors), styles.sectionCard, { borderLeftWidth: 4, borderLeftColor: colors.error }]}>
              {protocol.banderasRojas.map((flag, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: idx < protocol.banderasRojas.length - 1 ? rs.space(SPACING.sm) : 0 }}>
                  <MaterialCommunityIcons name="alert-rhombus" size={14} color={colors.error} style={{ marginRight: rs.space(8), marginTop: 2 }} />
                  <Text style={{ flex: 1, fontSize: rs.font(13), color: colors.text, lineHeight: 19 }}>
                    {flag}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Steps */}
        {sortedSteps.length > 0 && (
          <>
            <SectionTitle icon="list-ordered" title="Pasos del Protocolo" color={colors.primary} colors={colors} rs={rs} />
            {sortedSteps.map((step, idx) => (
              <StepCard
                key={step.orden}
                step={step}
                isLast={idx === sortedSteps.length - 1}
                colors={colors}
                rs={rs}
              />
            ))}
          </>
        )}

        {/* Resumen de Farmacos */}
        {protocol.resumenFarmacos.length > 0 && (
          <>
            <SectionTitle icon="pill" title="Resumen de Fármacos" color={colors.nursing} colors={colors} rs={rs} />
            <View style={[neuCard(colors), styles.sectionCard]}>
              {protocol.resumenFarmacos.map((drug, idx) => (
                <View
                  key={idx}
                  style={[
                    {
                      paddingVertical: rs.space(SPACING.sm),
                      borderBottomWidth: idx < protocol.resumenFarmacos.length - 1 ? 0.5 : 0,
                      borderBottomColor: colors.border,
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: rs.space(2) }}>
                    <Text style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.text }}>
                      {drug.nombre}
                    </Text>
                    <View style={{
                      backgroundColor: colors.nursing + '18',
                      borderRadius: RADIUS.xs,
                      paddingHorizontal: rs.space(6),
                      paddingVertical: rs.space(2),
                    }}>
                      <Text style={{ fontSize: rs.font(11), fontWeight: '600', color: colors.nursing }}>
                        {drug.via}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, marginBottom: rs.space(2) }}>
                    <Text style={{ fontWeight: '600' }}>Dosis: </Text>{drug.dosis}
                  </Text>
                  <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, lineHeight: 17 }}>
                    <Text style={{ fontWeight: '600' }}>Indicación: </Text>{drug.indicacion}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Notas de Enfermeria */}
        {protocol.notasEnfermeria.length > 0 && (
          <>
            <SectionTitle icon="stethoscope" title="Notas de Enfermería" color={colors.nursing} colors={colors} rs={rs} />
            <View style={[neuCard(colors), styles.sectionCard, { borderLeftWidth: 3, borderLeftColor: colors.nursing }]}>
              {protocol.notasEnfermeria.map((nota, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: idx < protocol.notasEnfermeria.length - 1 ? rs.space(SPACING.sm) : 0 }}>
                  <Text style={{ fontSize: rs.font(14), color: colors.nursing, marginRight: rs.space(8), marginTop: 1 }}>
                    •
                  </Text>
                  <Text style={{ flex: 1, fontSize: rs.font(13), color: colors.text, lineHeight: 19 }}>
                    {nota}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingTop: rs.space(SPACING.lg),
    },
    descriptionCard: {
      marginHorizontal: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.sm),
      padding: rs.space(SPACING.lg),
    },
    sectionCard: {
      marginHorizontal: rs.space(SPACING.lg),
      padding: rs.space(SPACING.lg),
      marginBottom: rs.space(SPACING.sm),
    },
    notFound: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: rs.space(SPACING.md),
    },
    notFoundText: {
      fontSize: rs.font(16),
      color: colors.textSecondary,
    },
  });
