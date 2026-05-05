// ============================================================
// ScaleDetailScreen — interactive clinical scale calculator
// ============================================================

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { usePathologyData } from '../hooks/usePathologyData';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { neuCard, neuCardSubtle, neuInset } from '../utils/neumorphism';
import { SCALE_COLORS, SCALE_ICONS, type ThemeColors } from '../utils/colors';
import type {
  RootStackParamList,
  ClinicalScale,
  ScaleComponent,
  ScaleInterpretation,
} from '../types';
import { SPACING, RADIUS } from '../utils/spacing';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'ScaleDetail'>;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function findInterpretation(
  score: number,
  interpretations: ScaleInterpretation[],
): ScaleInterpretation | null {
  return (
    interpretations.find(
      interp => score >= interp.rango[0] && score <= interp.rango[1],
    ) ?? null
  );
}

function scorePercent(
  score: number,
  rangoTotal: [number, number],
): number {
  const [min, max] = rangoTotal;
  if (max === min) return 0;
  const clamped = Math.min(Math.max(score, min), max);
  return (clamped - min) / (max - min);
}

// ─────────────────────────────────────────────
// ComponentSection — renders one ScaleComponent
// ─────────────────────────────────────────────

interface ComponentSectionProps {
  component: ScaleComponent;
  index: number;
  selectedValue: number | undefined;
  onSelect: (componentIndex: number, value: number) => void;
  accentColor: string;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function ComponentSection({
  component,
  index,
  selectedValue,
  onSelect,
  accentColor,
  colors,
  rs,
}: ComponentSectionProps) {
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  return (
    <View style={styles.componentSection}>
      <View style={[styles.componentHeader, { borderLeftColor: accentColor }]}>
        <Text style={styles.componentIndex}>{index + 1}</Text>
        <Text style={styles.componentName}>{component.nombre}</Text>
      </View>

      <View style={styles.optionsWrap}>
        {component.opciones.map(option => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={`${index}-${option.value}`}
              style={[
                styles.optionRow,
                isSelected && {
                  backgroundColor: accentColor + '18',
                  borderColor: accentColor,
                },
              ]}
              onPress={() => onSelect(index, option.value)}
              activeOpacity={0.7}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              accessibilityLabel={`${option.label}, valor ${option.value}`}
            >
              <View
                style={[
                  styles.radioOuter,
                  isSelected
                    ? { borderColor: accentColor }
                    : { borderColor: colors.border },
                ]}
              >
                {isSelected && (
                  <View
                    style={[
                      styles.radioInner,
                      { backgroundColor: accentColor },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.optionLabel,
                  isSelected && { color: accentColor, fontWeight: '700' },
                ]}
              >
                {option.label}
              </Text>
              <View
                style={[
                  styles.optionValueBadge,
                  {
                    backgroundColor: isSelected
                      ? accentColor
                      : colors.borderLight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionValueText,
                    { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {option.value}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// ScoreDisplay
// ─────────────────────────────────────────────

interface ScoreDisplayProps {
  score: number;
  rangoTotal: [number, number];
  interpretations: ScaleInterpretation[];
  answeredCount: number;
  totalCount: number;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function ScoreDisplay({
  score,
  rangoTotal,
  interpretations,
  answeredCount,
  totalCount,
  colors,
  rs,
}: ScoreDisplayProps) {
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);
  const interpretation = findInterpretation(score, interpretations);
  const percent = scorePercent(score, rangoTotal);
  const accentColor = interpretation?.color ?? colors.primary;
  const isComplete = answeredCount === totalCount && totalCount > 0;

  return (
    <View style={[styles.scoreCard, neuCard(colors)]}>
      {/* Score number */}
      <View style={styles.scoreRow}>
        <View style={styles.scoreNumberWrap}>
          <Text style={[styles.scoreNumber, { color: accentColor }]}>{score}</Text>
          <Text style={styles.scoreRange}>
            /{rangoTotal[1]}
          </Text>
        </View>
        <View style={styles.scoreRight}>
          <Text style={styles.scoreProgressLabel}>
            {answeredCount}/{totalCount} criterios
          </Text>
          {isComplete && (
            <View style={[styles.completeBadge, { backgroundColor: accentColor + '18' }]}>
              <MaterialCommunityIcons
                name="check-circle"
                size={14}
                color={accentColor}
              />
              <Text style={[styles.completeText, { color: accentColor }]}>
                Completo
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarTrack}>
        {interpretations.map(interp => {
          const [min, max] = rangoTotal;
          const total = max - min;
          const segStart = (interp.rango[0] - min) / total;
          const segWidth = (interp.rango[1] - interp.rango[0] + 1) / total;
          return (
            <View
              key={interp.label}
              style={[
                styles.progressBarSegment,
                {
                  left: `${segStart * 100}%` as any,
                  width: `${Math.min(segWidth * 100, 100 - segStart * 100)}%` as any,
                  backgroundColor: interp.color + '55',
                },
              ]}
            />
          );
        })}
        {/* Score marker */}
        <View
          style={[
            styles.progressMarker,
            { left: `${Math.min(percent * 100, 98)}%` as any, backgroundColor: accentColor },
          ]}
        />
      </View>

      {/* Range labels */}
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeLabelText}>{rangoTotal[0]}</Text>
        <Text style={styles.rangeLabelText}>{rangoTotal[1]}</Text>
      </View>

      {/* Interpretation */}
      {interpretation && (
        <View
          style={[
            styles.interpretationBanner,
            { backgroundColor: accentColor + '18', borderColor: accentColor + '40' },
          ]}
        >
          <View
            style={[styles.interpretationColorBar, { backgroundColor: accentColor }]}
          />
          <View style={styles.interpretationContent}>
            <Text style={[styles.interpretationLabel, { color: accentColor }]}>
              {interpretation.label}
            </Text>
            <Text style={styles.interpretationDesc}>{interpretation.descripcion}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────
// ScaleDetailScreen
// ─────────────────────────────────────────────

export function ScaleDetailScreen({ route, navigation }: Props) {
  const { scaleId } = route.params;
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { getScaleById } = usePathologyData();
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  // Selected values: component index → selected option value
  const [selections, setSelections] = useState<Record<number, number>>({});

  const scale: ClinicalScale | undefined = useMemo(
    () => getScaleById(scaleId),
    [getScaleById, scaleId],
  );

  // Set navigation header title
  useEffect(() => {
    if (scale) {
      navigation.setOptions({
        title: scale.abreviatura,
        headerStyle: { backgroundColor: colors.neuSurface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700', fontSize: rs.font(17) },
      });
    }
  }, [scale, navigation, colors, rs]);

  const accentColor = scale
    ? (SCALE_COLORS[scale.categoria] ?? colors.primary)
    : colors.primary;

  const handleSelect = useCallback(
    (componentIndex: number, value: number) => {
      setSelections(prev => ({ ...prev, [componentIndex]: value }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setSelections({});
  }, []);

  const score = useMemo(
    () => Object.values(selections).reduce((sum, v) => sum + v, 0),
    [selections],
  );

  const answeredCount = useMemo(
    () => Object.keys(selections).length,
    [selections],
  );

  if (!scale) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={48}
          color={colors.textLight}
        />
        <Text style={styles.notFoundText}>Escala no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: StatusBar.currentHeight ?? 0 }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + rs.space(SPACING.xxxl) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Description card */}
        <View style={[styles.descCard, neuCardSubtle(colors)]}>
          <View style={styles.descCardHeader}>
            <View
              style={[
                styles.descIconWrap,
                { backgroundColor: accentColor + '18' },
              ]}
            >
              <MaterialCommunityIcons
                name={SCALE_ICONS[scale.categoria] ?? 'clipboard-pulse-outline'}
                size={26}
                color={accentColor}
              />
            </View>
            <View style={styles.descCardTitles}>
              <Text style={styles.descTitle}>{scale.nombre}</Text>
              <View
                style={[
                  styles.categoriaPill,
                  { backgroundColor: accentColor + '15' },
                ]}
              >
                <Text
                  style={[styles.categoriaText, { color: accentColor }]}
                >
                  {scale.categoria.replace(/_/g, ' ')}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.descText}>{scale.descripcion}</Text>
        </View>

        {/* Score display (live) */}
        <ScoreDisplay
          score={score}
          rangoTotal={scale.rangoTotal}
          interpretations={scale.interpretaciones}
          answeredCount={answeredCount}
          totalCount={scale.componentes.length}
          colors={colors}
          rs={rs}
        />

        {/* Components section */}
        {scale.tipo === 'components' && (
          <View style={[styles.sectionCard, neuCard(colors)]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Criterios de Valoracion</Text>
              <TouchableOpacity
                style={[styles.resetBtn, { borderColor: colors.border }]}
                onPress={handleReset}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Resetear selecciones"
              >
                <MaterialCommunityIcons
                  name="refresh"
                  size={15}
                  color={colors.textSecondary}
                />
                <Text style={styles.resetBtnText}>Reiniciar</Text>
              </TouchableOpacity>
            </View>

            {scale.componentes.map((component: ScaleComponent, idx: number) => (
              <ComponentSection
                key={`comp-${idx}`}
                component={component}
                index={idx}
                selectedValue={selections[idx]}
                onSelect={handleSelect}
                accentColor={accentColor}
                colors={colors}
                rs={rs}
              />
            ))}
          </View>
        )}

        {/* Interpretation legend */}
        <View style={[styles.sectionCard, neuCardSubtle(colors)]}>
          <Text style={styles.sectionTitle}>Tabla de Interpretacion</Text>
          {scale.interpretaciones.map(interp => (
            <View
              key={interp.label}
              style={[
                styles.interpRow,
                {
                  borderLeftColor: interp.color,
                  backgroundColor:
                    score >= interp.rango[0] && score <= interp.rango[1]
                      ? interp.color + '12'
                      : 'transparent',
                },
              ]}
            >
              <View style={styles.interpLeft}>
                <View
                  style={[
                    styles.interpColorDot,
                    { backgroundColor: interp.color },
                  ]}
                />
                <Text style={[styles.interpLabel, { color: interp.color }]}>
                  {interp.label}
                </Text>
              </View>
              <Text style={styles.interpRange}>
                {interp.rango[0]}–{interp.rango[1]}
              </Text>
            </View>
          ))}
        </View>

        {/* Contexto Clinico — collapsible */}
        {scale.contextoClinico ? (
          <CollapsibleSection
            title="Contexto Clinico"
            icon="information-outline"
            accentColor={accentColor}
          >
            <Text style={styles.contextText}>{scale.contextoClinico}</Text>
          </CollapsibleSection>
        ) : null}

        {/* Referencia */}
        {scale.referencia ? (
          <View style={[styles.referenciaCard, neuInset(colors)]}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={15}
              color={colors.textLight}
              style={{ marginRight: rs.space(SPACING.sm) }}
            />
            <Text style={styles.referenciaText}>{scale.referencia}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles factory
// ─────────────────────────────────────────────

const createStyles = (colors: ThemeColors, rs: ResponsiveScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundText: {
      fontSize: rs.font(16),
      color: colors.textSecondary,
      marginTop: rs.space(SPACING.md),
    },
    scrollContent: {
      paddingTop: rs.space(SPACING.lg),
      paddingHorizontal: rs.space(SPACING.lg),
      gap: rs.space(SPACING.md),
    },

    // Description card
    descCard: {
      padding: rs.space(SPACING.lg),
    },
    descCardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: rs.space(SPACING.md),
    },
    descIconWrap: {
      width: 48,
      height: 48,
      borderRadius: RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rs.space(SPACING.md),
      flexShrink: 0,
    },
    descCardTitles: {
      flex: 1,
      justifyContent: 'center',
    },
    descTitle: {
      fontSize: rs.font(17),
      fontWeight: '800',
      color: colors.text,
      marginBottom: rs.space(SPACING.xs),
    },
    categoriaPill: {
      alignSelf: 'flex-start',
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: 2,
      borderRadius: RADIUS.pill,
    },
    categoriaText: {
      fontSize: rs.font(11),
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    descText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      lineHeight: rs.font(14) * 1.55,
    },

    // Score card
    scoreCard: {
      padding: rs.space(SPACING.lg),
    },
    scoreRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: rs.space(SPACING.md),
    },
    scoreNumberWrap: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    scoreNumber: {
      fontSize: rs.font(52),
      fontWeight: '800',
      lineHeight: rs.font(52) * 1.1,
    },
    scoreRange: {
      fontSize: rs.font(20),
      fontWeight: '600',
      color: colors.textLight,
      marginLeft: rs.space(2),
    },
    scoreRight: {
      alignItems: 'flex-end',
      gap: rs.space(SPACING.xs),
    },
    scoreProgressLabel: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
    },
    completeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.xs),
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: 3,
      borderRadius: RADIUS.pill,
    },
    completeText: {
      fontSize: rs.font(12),
      fontWeight: '700',
    },
    progressBarTrack: {
      height: 12,
      backgroundColor: colors.borderLight,
      borderRadius: RADIUS.pill,
      overflow: 'hidden',
      position: 'relative',
      marginBottom: rs.space(SPACING.xs),
    },
    progressBarSegment: {
      position: 'absolute',
      top: 0,
      bottom: 0,
    },
    progressMarker: {
      position: 'absolute',
      top: 1,
      bottom: 1,
      width: 4,
      borderRadius: 2,
    },
    rangeLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: rs.space(SPACING.md),
    },
    rangeLabelText: {
      fontSize: rs.font(11),
      color: colors.textLight,
    },
    interpretationBanner: {
      flexDirection: 'row',
      borderRadius: RADIUS.md,
      borderWidth: 1,
      overflow: 'hidden',
    },
    interpretationColorBar: {
      width: 5,
    },
    interpretationContent: {
      flex: 1,
      padding: rs.space(SPACING.md),
    },
    interpretationLabel: {
      fontSize: rs.font(15),
      fontWeight: '800',
      marginBottom: 3,
    },
    interpretationDesc: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: rs.font(13) * 1.5,
    },

    // Section card
    sectionCard: {
      padding: rs.space(SPACING.lg),
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: rs.space(SPACING.md),
    },
    sectionTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      color: colors.text,
    },
    resetBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.xs),
      paddingHorizontal: rs.space(SPACING.sm),
      paddingVertical: rs.space(SPACING.xs),
      borderRadius: RADIUS.sm,
      borderWidth: 1,
    },
    resetBtnText: {
      fontSize: rs.font(12),
      color: colors.textSecondary,
      fontWeight: '600',
    },

    // ComponentSection
    componentSection: {
      marginBottom: rs.space(SPACING.md),
    },
    componentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      borderLeftWidth: 3,
      paddingLeft: rs.space(SPACING.sm),
      marginBottom: rs.space(SPACING.sm),
    },
    componentIndex: {
      fontSize: rs.font(12),
      fontWeight: '800',
      color: colors.textLight,
      width: 20,
    },
    componentName: {
      fontSize: rs.font(14),
      fontWeight: '700',
      color: colors.text,
      flex: 1,
    },
    optionsWrap: {
      gap: rs.space(SPACING.xs),
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: rs.space(SPACING.sm + 2),
      borderRadius: RADIUS.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.neuSurface,
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: rs.space(SPACING.sm),
      flexShrink: 0,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    optionLabel: {
      flex: 1,
      fontSize: rs.font(13),
      color: colors.text,
      lineHeight: rs.font(13) * 1.4,
    },
    optionValueBadge: {
      minWidth: 28,
      height: 28,
      borderRadius: RADIUS.xs,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: rs.space(SPACING.xs),
      marginLeft: rs.space(SPACING.sm),
    },
    optionValueText: {
      fontSize: rs.font(12),
      fontWeight: '800',
    },

    // Interpretation legend
    interpRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderLeftWidth: 3,
      paddingLeft: rs.space(SPACING.sm),
      paddingVertical: rs.space(SPACING.sm),
      marginBottom: rs.space(SPACING.xs),
      borderRadius: 4,
      paddingRight: rs.space(SPACING.sm),
    },
    interpLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    interpColorDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: rs.space(SPACING.sm),
    },
    interpLabel: {
      fontSize: rs.font(13),
      fontWeight: '700',
    },
    interpRange: {
      fontSize: rs.font(13),
      fontWeight: '600',
      color: colors.textSecondary,
    },

    // Context text
    contextText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      lineHeight: rs.font(14) * 1.6,
    },

    // Reference
    referenciaCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: rs.space(SPACING.md),
      marginBottom: rs.space(SPACING.sm),
    },
    referenciaText: {
      flex: 1,
      fontSize: rs.font(12),
      color: colors.textLight,
      lineHeight: rs.font(12) * 1.55,
      fontStyle: 'italic',
    },
  });
