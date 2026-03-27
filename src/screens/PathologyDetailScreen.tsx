// ============================================================
// PathologyDetailScreen — full detail view for a single pathology
// THE most important screen: all clinical + nursing information
// ============================================================

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Share,
  Alert,
  Animated,
  Linking,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type {
  RootStackParamList,
  Pathology,
  NandaDiagnosis,
  NicIntervention,
  NocResult,
  PathologyDrug,
  DiagnosticTest,
} from '../types';
import { useTheme } from '../context/ThemeContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNotesContext } from '../context/NotesContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useRecentPathologies } from '../hooks/useRecentPathologies';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { BODY_SYSTEM_COLORS, BODY_SYSTEM_ICONS, type ThemeColors } from '../utils/colors';
import { getConditionImage } from '../utils/conditionImages';
import { neuCard, neuCardSubtle, neuElevated } from '../utils/neumorphism';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { EmergencyBadge } from '../components/EmergencyBadge';

// ── Types ─────────────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'PathologyDetail'>;

// ── Inner helper components ────────────────────────────────────

interface BulletListProps {
  items: string[];
  bulletColor: string;
  textColor: string;
  fontSize: number;
  spacing: (n: number) => number;
  bulletChar?: string;
}

function BulletList({
  items,
  bulletColor,
  textColor,
  fontSize,
  spacing,
  bulletChar = '•',
}: BulletListProps) {
  if (!items || items.length === 0) return null;
  return (
    <View>
      {items.map((item, index) => (
        <View
          key={index}
          style={{ flexDirection: 'row', marginBottom: spacing(4), alignItems: 'flex-start' }}
        >
          <Text
            style={{
              color: bulletColor,
              fontSize: fontSize + 2,
              lineHeight: fontSize * 1.6,
              marginRight: spacing(6),
              marginTop: -1,
            }}
          >
            {bulletChar}
          </Text>
          <Text
            style={{
              color: textColor,
              fontSize,
              lineHeight: fontSize * 1.6,
              flex: 1,
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

interface SubSectionProps {
  label: string;
  icon?: string;
  iconColor: string;
  children: React.ReactNode;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function SubSection({ label, icon, iconColor, children, colors, rs }: SubSectionProps) {
  return (
    <View style={{ marginTop: rs.space(12) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(6) }}>
        {icon ? (
          <MaterialCommunityIcons
            name={icon}
            size={rs.font(14)}
            color={iconColor}
            style={{ marginRight: rs.space(6) }}
          />
        ) : null}
        <Text
          style={{
            fontSize: rs.font(13),
            fontWeight: '700',
            color: iconColor,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Text>
      </View>
      {children}
    </View>
  );
}

interface DrugCardProps {
  drug: PathologyDrug;
  colors: ThemeColors;
  rs: ResponsiveScale;
  systemColor: string;
}

function DrugCard({ drug, colors, rs, systemColor }: DrugCardProps) {
  return (
    <View
      style={[
        {
          marginBottom: rs.space(10),
          padding: rs.space(12),
          borderRadius: 14,
          borderLeftWidth: 3,
          borderLeftColor: systemColor,
          backgroundColor: colors.neuSurface,
          elevation: 1,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(4) }}>
        <MaterialCommunityIcons
          name="pill"
          size={rs.font(14)}
          color={systemColor}
          style={{ marginRight: rs.space(6) }}
        />
        <Text
          style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.text, flex: 1 }}
        >
          {drug.nombre}
        </Text>
      </View>
      <Text
        style={{
          fontSize: rs.font(12),
          color: systemColor,
          fontWeight: '600',
          marginBottom: rs.space(4),
        }}
      >
        {drug.grupo}
      </Text>
      <Text
        style={{
          fontSize: rs.font(12),
          color: colors.textSecondary,
          lineHeight: rs.font(18),
          marginBottom: drug.dosis ? rs.space(4) : 0,
        }}
      >
        {drug.mecanismo}
      </Text>
      {drug.dosis ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: systemColor + '15',
            borderRadius: 8,
            paddingHorizontal: rs.space(8),
            paddingVertical: rs.space(4),
            marginBottom: rs.space(6),
            alignSelf: 'flex-start',
          }}
        >
          <MaterialCommunityIcons
            name="medical-bag"
            size={rs.font(11)}
            color={systemColor}
            style={{ marginRight: rs.space(4) }}
          />
          <Text style={{ fontSize: rs.font(12), color: systemColor, fontWeight: '600' }}>
            {drug.dosis}
          </Text>
        </View>
      ) : null}
      {drug.cuidadosEnfermeria && drug.cuidadosEnfermeria.length > 0 ? (
        <View style={{ marginTop: rs.space(4) }}>
          <Text
            style={{
              fontSize: rs.font(11),
              fontWeight: '700',
              color: colors.nursing,
              textTransform: 'uppercase',
              letterSpacing: 0.4,
              marginBottom: rs.space(4),
            }}
          >
            Cuidados de Enfermeria
          </Text>
          <BulletList
            items={drug.cuidadosEnfermeria}
            bulletColor={colors.nursing}
            textColor={colors.textSecondary}
            fontSize={rs.font(12)}
            spacing={rs.space}
            bulletChar="›"
          />
        </View>
      ) : null}
    </View>
  );
}

interface DiagnosticTestCardProps {
  test: DiagnosticTest;
  colors: ThemeColors;
  rs: ResponsiveScale;
  systemColor: string;
}

function DiagnosticTestCard({ test, colors, rs, systemColor }: DiagnosticTestCardProps) {
  return (
    <View
      style={{
        marginBottom: rs.space(10),
        padding: rs.space(12),
        borderRadius: 14,
        backgroundColor: colors.neuSurface,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(4) }}>
        <MaterialCommunityIcons
          name="test-tube"
          size={rs.font(14)}
          color={systemColor}
          style={{ marginRight: rs.space(6) }}
        />
        <Text
          style={{ fontSize: rs.font(14), fontWeight: '700', color: colors.text, flex: 1 }}
        >
          {test.nombre}
        </Text>
      </View>
      <Text
        style={{
          fontSize: rs.font(12),
          color: colors.textSecondary,
          lineHeight: rs.font(18),
          marginBottom: test.valoresReferencia ? rs.space(6) : 0,
        }}
      >
        {test.descripcion}
      </Text>
      {test.valoresReferencia ? (
        <View
          style={{
            backgroundColor: colors.info + '15',
            borderRadius: 8,
            paddingHorizontal: rs.space(8),
            paddingVertical: rs.space(4),
            marginBottom: test.cuidadosEnfermeria?.length ? rs.space(6) : 0,
          }}
        >
          <Text
            style={{
              fontSize: rs.font(11),
              fontWeight: '700',
              color: colors.info,
              textTransform: 'uppercase',
              letterSpacing: 0.4,
            }}
          >
            Valores de Referencia
          </Text>
          <Text style={{ fontSize: rs.font(12), color: colors.textSecondary, marginTop: 2 }}>
            {test.valoresReferencia}
          </Text>
        </View>
      ) : null}
      {test.cuidadosEnfermeria && test.cuidadosEnfermeria.length > 0 ? (
        <View style={{ marginTop: rs.space(4) }}>
          <Text
            style={{
              fontSize: rs.font(11),
              fontWeight: '700',
              color: colors.nursing,
              textTransform: 'uppercase',
              letterSpacing: 0.4,
              marginBottom: rs.space(4),
            }}
          >
            Cuidados de Enfermeria
          </Text>
          <BulletList
            items={test.cuidadosEnfermeria}
            bulletColor={colors.nursing}
            textColor={colors.textSecondary}
            fontSize={rs.font(12)}
            spacing={rs.space}
            bulletChar="›"
          />
        </View>
      ) : null}
    </View>
  );
}

interface NandaCardProps {
  nanda: NandaDiagnosis;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function NandaCard({ nanda, colors, rs }: NandaCardProps) {
  return (
    <View
      style={{
        marginBottom: rs.space(10),
        padding: rs.space(12),
        borderRadius: 14,
        backgroundColor: colors.neuSurface,
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(4) }}>
        <View
          style={{
            backgroundColor: colors.primary + '20',
            borderRadius: 6,
            paddingHorizontal: rs.space(6),
            paddingVertical: 2,
            marginRight: rs.space(8),
          }}
        >
          <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.primary }}>
            {nanda.codigo}
          </Text>
        </View>
        <Text
          style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text, flex: 1 }}
        >
          {nanda.nombre}
        </Text>
      </View>
      <Text
        style={{
          fontSize: rs.font(12),
          color: colors.textSecondary,
          lineHeight: rs.font(18),
          marginBottom: rs.space(8),
          fontStyle: 'italic',
        }}
      >
        {nanda.definicion}
      </Text>
      {nanda.caracteristicasDefinitorias.length > 0 ? (
        <View style={{ marginBottom: rs.space(6) }}>
          <Text
            style={{
              fontSize: rs.font(11),
              fontWeight: '700',
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.4,
              marginBottom: rs.space(3),
            }}
          >
            Caracteristicas Definitorias
          </Text>
          <BulletList
            items={nanda.caracteristicasDefinitorias}
            bulletColor={colors.primary}
            textColor={colors.textSecondary}
            fontSize={rs.font(12)}
            spacing={rs.space}
            bulletChar="›"
          />
        </View>
      ) : null}
      {nanda.factoresRelacionados.length > 0 ? (
        <View>
          <Text
            style={{
              fontSize: rs.font(11),
              fontWeight: '700',
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.4,
              marginBottom: rs.space(3),
            }}
          >
            Factores Relacionados
          </Text>
          <BulletList
            items={nanda.factoresRelacionados}
            bulletColor={colors.secondary}
            textColor={colors.textSecondary}
            fontSize={rs.font(12)}
            spacing={rs.space}
            bulletChar="›"
          />
        </View>
      ) : null}
    </View>
  );
}

interface NicCardProps {
  nic: NicIntervention;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function NicCard({ nic, colors, rs }: NicCardProps) {
  return (
    <View
      style={{
        marginBottom: rs.space(10),
        padding: rs.space(12),
        borderRadius: 14,
        backgroundColor: colors.neuSurface,
        borderLeftWidth: 3,
        borderLeftColor: colors.secondary,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(6) }}>
        <View
          style={{
            backgroundColor: colors.secondary + '20',
            borderRadius: 6,
            paddingHorizontal: rs.space(6),
            paddingVertical: 2,
            marginRight: rs.space(8),
          }}
        >
          <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.secondary }}>
            {nic.codigo}
          </Text>
        </View>
        <Text
          style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text, flex: 1 }}
        >
          {nic.nombre}
        </Text>
      </View>
      {nic.actividades.length > 0 ? (
        <BulletList
          items={nic.actividades}
          bulletColor={colors.secondary}
          textColor={colors.textSecondary}
          fontSize={rs.font(12)}
          spacing={rs.space}
          bulletChar="›"
        />
      ) : null}
    </View>
  );
}

interface NocCardProps {
  noc: NocResult;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function NocCard({ noc, colors, rs }: NocCardProps) {
  return (
    <View
      style={{
        marginBottom: rs.space(10),
        padding: rs.space(12),
        borderRadius: 14,
        backgroundColor: colors.neuSurface,
        borderLeftWidth: 3,
        borderLeftColor: colors.success,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: rs.space(4) }}>
        <View
          style={{
            backgroundColor: colors.success + '20',
            borderRadius: 6,
            paddingHorizontal: rs.space(6),
            paddingVertical: 2,
            marginRight: rs.space(8),
          }}
        >
          <Text style={{ fontSize: rs.font(10), fontWeight: '800', color: colors.success }}>
            {noc.codigo}
          </Text>
        </View>
        <Text
          style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text, flex: 1 }}
        >
          {noc.nombre}
        </Text>
      </View>
      {noc.escala ? (
        <View
          style={{
            backgroundColor: colors.success + '10',
            borderRadius: 8,
            paddingHorizontal: rs.space(8),
            paddingVertical: rs.space(3),
            marginBottom: rs.space(6),
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ fontSize: rs.font(11), color: colors.success, fontWeight: '600' }}>
            Escala: {noc.escala}
          </Text>
        </View>
      ) : null}
      {noc.indicadores.length > 0 ? (
        <BulletList
          items={noc.indicadores}
          bulletColor={colors.success}
          textColor={colors.textSecondary}
          fontSize={rs.font(12)}
          spacing={rs.space}
          bulletChar="›"
        />
      ) : null}
    </View>
  );
}

// ── Notes modal ───────────────────────────────────────────────

interface NotesModalProps {
  visible: boolean;
  onClose: () => void;
  pathologyId: string;
  pathologyName: string;
  colors: ThemeColors;
  rs: ResponsiveScale;
  getNote: (id: string) => { text: string } | undefined;
  saveNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
}

function NotesModal({
  visible,
  onClose,
  pathologyId,
  pathologyName,
  colors,
  rs,
  getNote,
  saveNote,
  deleteNote,
}: NotesModalProps) {
  const existingNote = getNote(pathologyId);
  const [text, setText] = useState(existingNote?.text ?? '');

  // Sync text when modal opens with existing note
  useEffect(() => {
    if (visible) {
      setText(getNote(pathologyId)?.text ?? '');
    }
  }, [visible, pathologyId, getNote]);

  const handleSave = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      if (existingNote) {
        Alert.alert(
          'Eliminar nota',
          'El texto esta vacio. ¿Deseas eliminar la nota existente?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Eliminar',
              style: 'destructive',
              onPress: () => {
                deleteNote(pathologyId);
                onClose();
              },
            },
          ],
        );
      } else {
        onClose();
      }
      return;
    }
    saveNote(pathologyId, trimmed);
    onClose();
  }, [text, existingNote, pathologyId, saveNote, deleteNote, onClose]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={{
            backgroundColor: colors.surface,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: rs.space(20),
            paddingBottom: rs.space(36),
            elevation: 12,
          }}
        >
          {/* Handle */}
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: colors.border,
              borderRadius: 2,
              alignSelf: 'center',
              marginBottom: rs.space(16),
            }}
          />
          <Text
            style={{
              fontSize: rs.font(16),
              fontWeight: '700',
              color: colors.text,
              marginBottom: rs.space(4),
            }}
          >
            Nota — {pathologyName}
          </Text>
          <Text
            style={{
              fontSize: rs.font(12),
              color: colors.textSecondary,
              marginBottom: rs.space(12),
            }}
          >
            Apuntes personales, recordatorios o aclaraciones
          </Text>
          <View
            style={{
              backgroundColor: colors.noteBackground,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.noteBorder,
              padding: rs.space(12),
              marginBottom: rs.space(16),
            }}
          >
            <TextInput
              value={text}
              onChangeText={setText}
              multiline
              placeholder="Escribe tu nota aqui..."
              placeholderTextColor={colors.textLight}
              style={{
                fontSize: rs.font(14),
                color: colors.text,
                minHeight: 120,
                maxHeight: 220,
                textAlignVertical: 'top',
                lineHeight: rs.font(21),
              }}
              autoFocus
            />
          </View>
          <View style={{ flexDirection: 'row', gap: rs.space(10) }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                padding: rs.space(14),
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: rs.font(14), fontWeight: '600', color: colors.textSecondary }}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={{
                flex: 2,
                padding: rs.space(14),
                borderRadius: 14,
                backgroundColor: colors.primary,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: rs.font(14), fontWeight: '700', color: '#FFFFFF' }}>
                Guardar Nota
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ── Main Screen ────────────────────────────────────────────────

export function PathologyDetailScreen({ navigation, route }: Props) {
  const { pathologyId, pathologyName: routeName } = route.params;

  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { getNote, saveNote, deleteNote } = useNotesContext();
  const { getPathologyById, getPathologyById: _get } = usePathologyData();
  const { addRecent } = useRecentPathologies();

  const [notesModalVisible, setNotesModalVisible] = useState(false);

  // Load pathology data
  const pathology: Pathology | undefined = useMemo(
    () => getPathologyById(pathologyId),
    [getPathologyById, pathologyId],
  );

  // Track recent on mount
  useEffect(() => {
    addRecent(pathologyId);
  }, [addRecent, pathologyId]);

  // Derive system color
  const systemColor = useMemo(
    () =>
      pathology ? BODY_SYSTEM_COLORS[pathology.bodySystemId] : colors.primary,
    [pathology, colors.primary],
  );

  const systemIcon = useMemo(
    () => (pathology ? BODY_SYSTEM_ICONS[pathology.bodySystemId] : 'help-circle'),
    [pathology],
  );

  const displayName = pathology?.nombre ?? routeName ?? 'Patologia';

  // ── Share handler ──────────────────────────────────────────
  const handleShare = useCallback(async () => {
    if (!pathology) return;
    try {
      await Share.share({
        title: pathology.nombre,
        message: `${pathology.nombre}\n\n${pathology.definicion}\n\nPatologia de Enfermeria`,
      });
    } catch (_) {}
  }, [pathology]);

  // ── Navigation header ──────────────────────────────────────
  useLayoutEffect(() => {
    const favorite = isFavorite(pathologyId);
    navigation.setOptions({
      title: displayName,
      headerStyle: { backgroundColor: systemColor },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: '700' as const, fontSize: 16 },
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginRight: 4 }}>
          <TouchableOpacity
            onPress={handleShare}
            style={{ padding: 8 }}
            accessibilityLabel="Compartir patología"
          >
            <MaterialCommunityIcons name="share-variant" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleFavorite(pathologyId)}
            style={{ padding: 8 }}
            accessibilityLabel={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <MaterialCommunityIcons
              name={favorite ? 'heart' : 'heart-outline'}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, displayName, systemColor, pathologyId, isFavorite, toggleFavorite, handleShare]);

  // Styles
  const styles = useMemo(() => createStyles(colors, rs), [colors, rs]);

  // ── Loading / Not found ────────────────────────────────────
  if (!pathology) {
    return (
      <View style={styles.notFoundContainer}>
        <MaterialCommunityIcons name="file-alert-outline" size={rs.font(56)} color={colors.textLight} />
        <Text style={styles.notFoundTitle}>Patologia no encontrada</Text>
        <Text style={styles.notFoundSubtitle}>
          No se encontro informacion para el ID: {pathologyId}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.primary }]}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Computed shortcuts ─────────────────────────────────────
  const hasClassification = Boolean(
    pathology.clasificacion && pathology.clasificacion.tipos.length > 0,
  );
  const hasQuirurgico = Boolean(
    pathology.tratamientoMedico.quirurgico && pathology.tratamientoMedico.quirurgico.length > 0,
  );
  const hasRelated = Boolean(
    pathology.relatedPathologyIds && pathology.relatedPathologyIds.length > 0,
  );
  const hasNote = Boolean(getNote(pathologyId));

  // ── Navigate to related pathology ─────────────────────────
  const navigateToRelated = useCallback(
    (relId: string) => {
      const related = getPathologyById(relId);
      navigation.push('PathologyDetail', { pathologyId: relId, pathologyName: related?.nombre });
    },
    [navigation, getPathologyById],
  );

  // ── Section quick-nav config ─────────────────────────────
  const scrollRef = useRef<ScrollView>(null);
  const sectionQuickNav = useMemo(() => [
    { key: 'fisio', label: 'Fisiopatología', icon: 'dna' },
    { key: 'signos', label: 'Signos', icon: 'stethoscope' },
    { key: 'dx', label: 'Diagnóstico', icon: 'clipboard-pulse-outline' },
    { key: 'tx', label: 'Tratamiento', icon: 'medical-bag' },
    { key: 'enf', label: 'Enfermería', icon: 'heart-pulse' },
    { key: 'nanda', label: 'NANDA', icon: 'format-list-group' },
    { key: 'alarma', label: 'Alarma', icon: 'alarm-light-outline' },
  ], []);

  // ── Render ─────────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={systemColor} />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Hero strip with system image ── */}
        <View style={[styles.heroStrip, { backgroundColor: systemColor }]}>
          <Image
            source={getConditionImage(pathology.id, pathology.bodySystemId)}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <Text style={styles.heroTitle}>{pathology.nombre}</Text>
        </View>

        {/* ── Badge row ── */}
        <View style={styles.badgeRow}>
          <EmergencyBadge level={pathology.emergencyLevel} />
          {/* System pill */}
          <View
            style={[styles.systemPill, { borderColor: systemColor + '40', backgroundColor: systemColor + '12' }]}
          >
            <View style={[styles.systemDot, { backgroundColor: systemColor }]} />
            <MaterialCommunityIcons
              name={systemIcon}
              size={rs.font(12)}
              color={systemColor}
              style={{ marginRight: rs.space(4) }}
            />
            <Text style={[styles.systemPillText, { color: systemColor }]}>
              {pathology.bodySystemId
                .replace(/_/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase())}
            </Text>
          </View>
        </View>

        {/* ── Video button ── */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            const url = pathology.videoUrl
              ? pathology.videoUrl
              : `https://www.youtube.com/results?search_query=enfermeria+${encodeURIComponent(pathology.nombre)}`;
            Linking.openURL(url);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: rs.space(16),
            marginBottom: rs.space(12),
            paddingVertical: rs.space(10),
            paddingHorizontal: rs.space(14),
            backgroundColor: '#FF000015',
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#FF000025',
            gap: rs.space(10),
          }}
        >
          <View style={{
            width: 36, height: 36, borderRadius: 10,
            backgroundColor: '#FF0000',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <MaterialCommunityIcons name="play" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: rs.font(13), fontWeight: '700', color: colors.text }}>
              {pathology.videoUrl ? 'Ver video explicativo' : 'Buscar videos en YouTube'}
            </Text>
            <Text style={{ fontSize: rs.font(11), color: colors.textSecondary, marginTop: 1 }}>
              {pathology.videoUrl ? 'Video seleccionado para esta patología' : `"${pathology.nombre}" enfermería`}
            </Text>
          </View>
          <MaterialCommunityIcons name="open-in-new" size={16} color={colors.textLight} />
        </TouchableOpacity>

        {/* ── Quick Section Nav ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickNavRow}
        >
          {sectionQuickNav.map((sec) => (
            <TouchableOpacity
              key={sec.key}
              style={[styles.quickNavChip, { borderColor: systemColor + '40', backgroundColor: systemColor + '10' }]}
              activeOpacity={0.7}
              onPress={() => {
                // Scroll is a nice-to-have, the chips serve as a visual index
              }}
            >
              <MaterialCommunityIcons name={sec.icon} size={rs.font(12)} color={systemColor} />
              <Text style={[styles.quickNavLabel, { color: systemColor }]}>{sec.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Definition (always visible, no collapsible) ── */}
        <View style={[styles.definitionCard, neuCard(colors)]}>
          <View style={styles.definitionHeader}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={rs.font(16)}
              color={systemColor}
              style={{ marginRight: rs.space(6) }}
            />
            <Text style={[styles.sectionTitle, { color: systemColor }]}>Definicion</Text>
          </View>
          <Text style={styles.definitionText}>{pathology.definicion}</Text>

          {/* Epidemiologia — inline, italic */}
          {pathology.epidemiologia ? (
            <View style={styles.epidemioContainer}>
              <MaterialCommunityIcons
                name="chart-bar"
                size={rs.font(12)}
                color={colors.textSecondary}
                style={{ marginRight: rs.space(4) }}
              />
              <Text style={styles.epidemioText}>{pathology.epidemiologia}</Text>
            </View>
          ) : null}
        </View>

        {/* ── Note indicator (if exists) ── */}
        {hasNote ? (
          <TouchableOpacity
            style={[styles.noteIndicator, { borderColor: colors.noteBorder, backgroundColor: colors.noteBackground }]}
            onPress={() => setNotesModalVisible(true)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="note-text"
              size={rs.font(14)}
              color={colors.warning}
              style={{ marginRight: rs.space(6) }}
            />
            <Text style={[styles.noteIndicatorText, { color: colors.warning }]}>
              Tienes una nota en esta patologia
            </Text>
            <MaterialCommunityIcons name="pencil" size={rs.font(13)} color={colors.warning} />
          </TouchableOpacity>
        ) : null}

        {/* ═══════════════════════════════════════════════════
            1. FACTORES DE RIESGO
        ═══════════════════════════════════════════════════ */}
        {pathology.factoresRiesgo.length > 0 ? (
          <CollapsibleSection
            title="Factores de Riesgo"
            icon="alert-rhombus-outline"
            accentColor={colors.warning}
            initiallyOpen={false}
            badge={String(pathology.factoresRiesgo.length)}
          >
            <BulletList
              items={pathology.factoresRiesgo}
              bulletColor={colors.warning}
              textColor={colors.textSecondary}
              fontSize={rs.font(13)}
              spacing={rs.space}
            />
          </CollapsibleSection>
        ) : null}

        {/* ═══════════════════════════════════════════════════
            2. FISIOPATOLOGIA (open by default — key section)
        ═══════════════════════════════════════════════════ */}
        <CollapsibleSection
          title="Fisiopatología"
          icon="dna"
          accentColor={systemColor}
          initiallyOpen
        >
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>
            {pathology.fisiopatologia}
          </Text>
        </CollapsibleSection>

        {/* ═══════════════════════════════════════════════════
            3. SIGNOS Y SINTOMAS (open by default)
        ═══════════════════════════════════════════════════ */}
        <CollapsibleSection
          title="Signos y Sintomas"
          icon="stethoscope"
          accentColor={colors.error}
          initiallyOpen
          badge={String(
            pathology.signosYSintomas.signos.length + pathology.signosYSintomas.sintomas.length,
          )}
        >
          {pathology.signosYSintomas.signos.length > 0 ? (
            <SubSection
              label="Signos"
              icon="eye-outline"
              iconColor={colors.error}
              colors={colors}
              rs={rs}
            >
              <BulletList
                items={pathology.signosYSintomas.signos}
                bulletColor={colors.error}
                textColor={colors.textSecondary}
                fontSize={rs.font(13)}
                spacing={rs.space}
                bulletChar="◆"
              />
            </SubSection>
          ) : null}
          {pathology.signosYSintomas.sintomas.length > 0 ? (
            <SubSection
              label="Sintomas"
              icon="comment-text-outline"
              iconColor={colors.warning}
              colors={colors}
              rs={rs}
            >
              <BulletList
                items={pathology.signosYSintomas.sintomas}
                bulletColor={colors.warning}
                textColor={colors.textSecondary}
                fontSize={rs.font(13)}
                spacing={rs.space}
                bulletChar="◇"
              />
            </SubSection>
          ) : null}
        </CollapsibleSection>

        {/* ═══════════════════════════════════════════════════
            4. CLASIFICACION (if exists)
        ═══════════════════════════════════════════════════ */}
        {hasClassification ? (
          <CollapsibleSection
            title={`Clasificacion — ${pathology.clasificacion!.nombre}`}
            icon="format-list-bulleted-type"
            accentColor={systemColor}
            initiallyOpen={false}
          >
            {pathology.clasificacion!.tipos.map((tipo, idx) => (
              <View
                key={idx}
                style={[styles.clasificacionItem, { borderLeftColor: systemColor }]}
              >
                <Text style={[styles.clasificacionNombre, { color: systemColor }]}>
                  {tipo.nombre}
                </Text>
                <Text style={styles.clasificacionDesc}>{tipo.descripcion}</Text>
              </View>
            ))}
          </CollapsibleSection>
        ) : null}

        {/* ═══════════════════════════════════════════════════
            5. DIAGNOSTICO
        ═══════════════════════════════════════════════════ */}
        <CollapsibleSection
          title="Diagnostico"
          icon="clipboard-pulse-outline"
          accentColor={colors.info}
          initiallyOpen={false}
        >
          {pathology.diagnostico.anamnesis.length > 0 ? (
            <SubSection
              label="Anamnesis"
              icon="account-voice"
              iconColor={colors.info}
              colors={colors}
              rs={rs}
            >
              <BulletList
                items={pathology.diagnostico.anamnesis}
                bulletColor={colors.info}
                textColor={colors.textSecondary}
                fontSize={rs.font(13)}
                spacing={rs.space}
              />
            </SubSection>
          ) : null}

          {pathology.diagnostico.examenFisico.length > 0 ? (
            <SubSection
              label="Examen Fisico"
              icon="human"
              iconColor={colors.info}
              colors={colors}
              rs={rs}
            >
              <BulletList
                items={pathology.diagnostico.examenFisico}
                bulletColor={colors.info}
                textColor={colors.textSecondary}
                fontSize={rs.font(13)}
                spacing={rs.space}
              />
            </SubSection>
          ) : null}

          {pathology.diagnostico.pruebas.length > 0 ? (
            <SubSection
              label="Pruebas Diagnosticas"
              icon="test-tube"
              iconColor={colors.info}
              colors={colors}
              rs={rs}
            >
              {pathology.diagnostico.pruebas.map((test, idx) => (
                <DiagnosticTestCard
                  key={idx}
                  test={test}
                  colors={colors}
                  rs={rs}
                  systemColor={systemColor}
                />
              ))}
            </SubSection>
          ) : null}
        </CollapsibleSection>

        {/* ═══════════════════════════════════════════════════
            6. TRATAMIENTO MEDICO
        ═══════════════════════════════════════════════════ */}
        <CollapsibleSection
          title="Tratamiento Medico"
          icon="medical-bag"
          accentColor={colors.secondary}
          initiallyOpen={false}
        >
          {pathology.tratamientoMedico.objetivos.length > 0 ? (
            <SubSection
              label="Objetivos Terapeuticos"
              icon="target"
              iconColor={colors.secondary}
              colors={colors}
              rs={rs}
            >
              <BulletList
                items={pathology.tratamientoMedico.objetivos}
                bulletColor={colors.secondary}
                textColor={colors.textSecondary}
                fontSize={rs.font(13)}
                spacing={rs.space}
              />
            </SubSection>
          ) : null}

          {pathology.tratamientoMedico.farmacologico.length > 0 ? (
            <SubSection
              label="Farmacologico"
              icon="pill"
              iconColor={systemColor}
              colors={colors}
              rs={rs}
            >
              {pathology.tratamientoMedico.farmacologico.map((drug, idx) => (
                <DrugCard
                  key={idx}
                  drug={drug}
                  colors={colors}
                  rs={rs}
                  systemColor={systemColor}
                />
              ))}
            </SubSection>
          ) : null}

          {pathology.tratamientoMedico.noFarmacologico.length > 0 ? (
            <SubSection
              label="No Farmacologico"
              icon="heart-plus-outline"
              iconColor={colors.secondary}
              colors={colors}
              rs={rs}
            >
              <BulletList
                items={pathology.tratamientoMedico.noFarmacologico}
                bulletColor={colors.secondary}
                textColor={colors.textSecondary}
                fontSize={rs.font(13)}
                spacing={rs.space}
              />
            </SubSection>
          ) : null}

          {hasQuirurgico ? (
            <SubSection
              label="Quirurgico"
              icon="knife"
              iconColor={colors.error}
              colors={colors}
              rs={rs}
            >
              <BulletList
                items={pathology.tratamientoMedico.quirurgico!}
                bulletColor={colors.error}
                textColor={colors.textSecondary}
                fontSize={rs.font(13)}
                spacing={rs.space}
              />
            </SubSection>
          ) : null}
        </CollapsibleSection>

        {/* ═══════════════════════════════════════════════════
            7. CUIDADOS DE ENFERMERIA — KEY SECTION (open)
        ═══════════════════════════════════════════════════ */}
        <View style={[styles.nursingWrapper, { borderColor: colors.nursing + '50' }]}>
          <CollapsibleSection
            title="Cuidados de Enfermeria"
            icon="heart-pulse"
            accentColor={colors.nursing}
            initiallyOpen
          >
            {pathology.cuidadosEnfermeria.valoracion.length > 0 ? (
              <SubSection
                label="Valoracion"
                icon="stethoscope"
                iconColor={colors.nursing}
                colors={colors}
                rs={rs}
              >
                <BulletList
                  items={pathology.cuidadosEnfermeria.valoracion}
                  bulletColor={colors.nursing}
                  textColor={colors.textSecondary}
                  fontSize={rs.font(13)}
                  spacing={rs.space}
                />
              </SubSection>
            ) : null}

            {pathology.cuidadosEnfermeria.intervenciones.length > 0 ? (
              <SubSection
                label="Intervenciones"
                icon="clipboard-text-outline"
                iconColor={colors.nursing}
                colors={colors}
                rs={rs}
              >
                <BulletList
                  items={pathology.cuidadosEnfermeria.intervenciones}
                  bulletColor={colors.nursing}
                  textColor={colors.textSecondary}
                  fontSize={rs.font(13)}
                  spacing={rs.space}
                />
              </SubSection>
            ) : null}

            {pathology.cuidadosEnfermeria.educacionPaciente.length > 0 ? (
              <SubSection
                label="Educacion al Paciente"
                icon="school-outline"
                iconColor={colors.nursing}
                colors={colors}
                rs={rs}
              >
                <BulletList
                  items={pathology.cuidadosEnfermeria.educacionPaciente}
                  bulletColor={colors.nursing}
                  textColor={colors.textSecondary}
                  fontSize={rs.font(13)}
                  spacing={rs.space}
                />
              </SubSection>
            ) : null}

            {pathology.cuidadosEnfermeria.monitorizacion.length > 0 ? (
              <SubSection
                label="Monitorizacion"
                icon="monitor-eye"
                iconColor={colors.nursing}
                colors={colors}
                rs={rs}
              >
                <BulletList
                  items={pathology.cuidadosEnfermeria.monitorizacion}
                  bulletColor={colors.nursing}
                  textColor={colors.textSecondary}
                  fontSize={rs.font(13)}
                  spacing={rs.space}
                />
              </SubSection>
            ) : null}
          </CollapsibleSection>
        </View>

        {/* ═══════════════════════════════════════════════════
            8. NANDA-NIC-NOC
        ═══════════════════════════════════════════════════ */}
        {(pathology.npiNanda.length > 0 ||
          pathology.npiNic.length > 0 ||
          pathology.npiNoc.length > 0) ? (
          <CollapsibleSection
            title="NANDA · NIC · NOC"
            icon="format-list-group"
            accentColor={colors.primary}
            initiallyOpen={false}
          >
            {pathology.npiNanda.length > 0 ? (
              <SubSection
                label={`NANDA — Diagnosticos (${pathology.npiNanda.length})`}
                icon="clipboard-list-outline"
                iconColor={colors.primary}
                colors={colors}
                rs={rs}
              >
                {pathology.npiNanda.map((n, idx) => (
                  <NandaCard key={idx} nanda={n} colors={colors} rs={rs} />
                ))}
              </SubSection>
            ) : null}

            {pathology.npiNic.length > 0 ? (
              <SubSection
                label={`NIC — Intervenciones (${pathology.npiNic.length})`}
                icon="clipboard-check-outline"
                iconColor={colors.secondary}
                colors={colors}
                rs={rs}
              >
                {pathology.npiNic.map((n, idx) => (
                  <NicCard key={idx} nic={n} colors={colors} rs={rs} />
                ))}
              </SubSection>
            ) : null}

            {pathology.npiNoc.length > 0 ? (
              <SubSection
                label={`NOC — Resultados (${pathology.npiNoc.length})`}
                icon="chart-line"
                iconColor={colors.success}
                colors={colors}
                rs={rs}
              >
                {pathology.npiNoc.map((n, idx) => (
                  <NocCard key={idx} noc={n} colors={colors} rs={rs} />
                ))}
              </SubSection>
            ) : null}
          </CollapsibleSection>
        ) : null}

        {/* ═══════════════════════════════════════════════════
            9. COMPLICACIONES
        ═══════════════════════════════════════════════════ */}
        {pathology.complicaciones.length > 0 ? (
          <CollapsibleSection
            title="Complicaciones"
            icon="alert-circle-outline"
            accentColor={colors.error}
            initiallyOpen={false}
            badge={String(pathology.complicaciones.length)}
          >
            <BulletList
              items={pathology.complicaciones}
              bulletColor={colors.error}
              textColor={colors.textSecondary}
              fontSize={rs.font(13)}
              spacing={rs.space}
              bulletChar="⚠"
            />
          </CollapsibleSection>
        ) : null}

        {/* ═══════════════════════════════════════════════════
            10. CRITERIOS DE ALARMA (red-highlighted)
        ═══════════════════════════════════════════════════ */}
        {pathology.criteriosAlarma.length > 0 ? (
          <View style={[styles.alarmWrapper, { borderColor: colors.error + '40' }]}>
            <CollapsibleSection
              title="Criterios de Alarma"
              icon="alarm-light-outline"
              accentColor={colors.error}
              initiallyOpen={false}
              badge={String(pathology.criteriosAlarma.length)}
            >
              <View style={{ gap: rs.space(8) }}>
                {pathology.criteriosAlarma.map((criterio, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.alarmCard,
                      {
                        borderColor: colors.error + '50',
                        backgroundColor: colors.error + '08',
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="alert"
                      size={rs.font(14)}
                      color={colors.error}
                      style={{ marginRight: rs.space(8), marginTop: 2 }}
                    />
                    <Text style={[styles.alarmText, { color: colors.text }]}>
                      {criterio}
                    </Text>
                  </View>
                ))}
              </View>
            </CollapsibleSection>
          </View>
        ) : null}

        {/* ═══════════════════════════════════════════════════
            11. PATOLOGIAS RELACIONADAS
        ═══════════════════════════════════════════════════ */}
        {hasRelated ? (
          <View style={[styles.relatedSection, neuCardSubtle(colors)]}>
            <View style={styles.relatedHeader}>
              <MaterialCommunityIcons
                name="link-variant"
                size={rs.font(16)}
                color={systemColor}
                style={{ marginRight: rs.space(6) }}
              />
              <Text style={[styles.relatedTitle, { color: systemColor }]}>
                Patologias Relacionadas
              </Text>
            </View>
            <View style={styles.relatedPills}>
              {pathology.relatedPathologyIds!.map(relId => (
                <TouchableOpacity
                  key={relId}
                  style={[
                    styles.relatedPill,
                    {
                      backgroundColor: systemColor + '15',
                      borderColor: systemColor + '40',
                    },
                  ]}
                  onPress={() => navigateToRelated(relId)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="arrow-right-circle-outline"
                    size={rs.font(13)}
                    color={systemColor}
                    style={{ marginRight: rs.space(4) }}
                  />
                  <Text style={[styles.relatedPillText, { color: systemColor }]}>
                    {getPathologyById(relId)?.nombre ?? relId}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}

        {/* Bottom padding */}
        <View style={{ height: rs.space(100) }} />
      </ScrollView>

      {/* ── Floating Add Note button ── */}
      <TouchableOpacity
        style={[
          styles.fab,
          neuElevated(colors),
          {
            backgroundColor: hasNote ? colors.warning : colors.primary,
          },
        ]}
        onPress={() => setNotesModalVisible(true)}
        activeOpacity={0.85}
        accessibilityLabel={hasNote ? 'Editar nota' : 'Agregar nota'}
      >
        <MaterialCommunityIcons
          name={hasNote ? 'note-text' : 'note-plus'}
          size={rs.font(22)}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* ── Notes modal ── */}
      <NotesModal
        visible={notesModalVisible}
        onClose={() => setNotesModalVisible(false)}
        pathologyId={pathologyId}
        pathologyName={displayName}
        colors={colors}
        rs={rs}
        getNote={getNote}
        saveNote={saveNote}
        deleteNote={deleteNote}
      />
    </View>
  );
}

// ── Styles factory ─────────────────────────────────────────────

function createStyles(colors: ThemeColors, rs: ResponsiveScale) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.neuBackground,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: rs.space(16),
    },

    // Not found
    notFoundContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.neuBackground,
      paddingHorizontal: rs.space(40),
      gap: rs.space(12),
    },
    notFoundTitle: {
      fontSize: rs.font(18),
      fontWeight: '700',
      color: colors.text,
    },
    notFoundSubtitle: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      textAlign: 'center',
    },
    backButton: {
      marginTop: rs.space(8),
      padding: rs.space(12),
    },
    backButtonText: {
      fontSize: rs.font(15),
      fontWeight: '600',
    },

    // Quick nav
    quickNavRow: {
      paddingHorizontal: rs.space(14),
      paddingVertical: rs.space(8),
      gap: rs.space(6),
    },
    quickNavChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(4),
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(5),
      borderRadius: 50,
      borderWidth: 1,
    },
    quickNavLabel: {
      fontSize: rs.font(11),
      fontWeight: '600',
    },

    // Hero strip
    heroStrip: {
      paddingHorizontal: rs.space(20),
      paddingVertical: rs.space(20),
      paddingTop: rs.space(24),
      overflow: 'hidden',
      position: 'relative',
    },
    heroImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      opacity: 0.25,
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    heroTitle: {
      fontSize: rs.font(22),
      fontWeight: '800',
      color: '#FFFFFF',
      lineHeight: rs.font(30),
      letterSpacing: -0.3,
    },

    // Badge row
    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rs.space(16),
      paddingVertical: rs.space(12),
      gap: rs.space(8),
      flexWrap: 'wrap',
    },
    systemPill: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 1,
      paddingHorizontal: rs.space(10),
      paddingVertical: rs.space(4),
    },
    systemDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: rs.space(4),
    },
    systemPillText: {
      fontSize: rs.font(11),
      fontWeight: '600',
      letterSpacing: 0.2,
    },

    // Definition card
    definitionCard: {
      marginHorizontal: rs.space(16),
      marginVertical: rs.space(4),
      padding: rs.space(16),
    },
    definitionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.space(10),
    },
    sectionTitle: {
      fontSize: rs.font(15),
      fontWeight: '700',
      letterSpacing: 0.2,
    },
    definitionText: {
      fontSize: rs.font(14),
      color: colors.textSecondary,
      lineHeight: rs.font(22),
    },
    epidemioContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: rs.space(12),
      paddingTop: rs.space(12),
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
    epidemioText: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      fontStyle: 'italic',
      lineHeight: rs.font(20),
      flex: 1,
    },

    // Note indicator
    noteIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: rs.space(16),
      marginVertical: rs.space(4),
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: rs.space(12),
      paddingVertical: rs.space(8),
    },
    noteIndicatorText: {
      flex: 1,
      fontSize: rs.font(13),
      fontWeight: '600',
    },

    // Body text (fisiopatologia, etc)
    bodyText: {
      fontSize: rs.font(13),
      lineHeight: rs.font(21),
    },

    // Clasificacion
    clasificacionItem: {
      marginBottom: rs.space(10),
      paddingLeft: rs.space(12),
      borderLeftWidth: 3,
    },
    clasificacionNombre: {
      fontSize: rs.font(13),
      fontWeight: '700',
      marginBottom: rs.space(3),
    },
    clasificacionDesc: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: rs.font(20),
    },

    // Nursing highlight wrapper
    nursingWrapper: {
      borderWidth: 2,
      borderRadius: 22,
      marginHorizontal: rs.space(12),
      marginVertical: rs.space(4),
      overflow: 'hidden',
    },

    // Alarm criteria wrapper
    alarmWrapper: {
      borderWidth: 1.5,
      borderRadius: 22,
      marginHorizontal: rs.space(12),
      marginVertical: rs.space(4),
      overflow: 'hidden',
    },
    alarmCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 10,
      borderWidth: 1,
      padding: rs.space(10),
    },
    alarmText: {
      fontSize: rs.font(13),
      lineHeight: rs.font(20),
      flex: 1,
    },

    // Related pathologies
    relatedSection: {
      marginHorizontal: rs.space(16),
      marginVertical: rs.space(4),
      padding: rs.space(16),
    },
    relatedHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rs.space(10),
    },
    relatedTitle: {
      fontSize: rs.font(14),
      fontWeight: '700',
    },
    relatedPills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: rs.space(8),
    },
    relatedPill: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 1,
      paddingHorizontal: rs.space(12),
      paddingVertical: rs.space(6),
    },
    relatedPillText: {
      fontSize: rs.font(12),
      fontWeight: '600',
    },

    // FAB (floating action button)
    fab: {
      position: 'absolute',
      bottom: rs.space(28),
      right: rs.space(20),
      width: rs.space(56),
      height: rs.space(56),
      borderRadius: rs.space(28),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
