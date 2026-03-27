// ============================================================
// AllNotesScreen — full list of user notes across pathologies
// ============================================================

import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../context/ThemeContext';
import { useNotesContext } from '../context/NotesContext';
import { usePathologyData } from '../hooks/usePathologyData';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';
import { neuCard } from '../utils/neumorphism';
import { SPACING, RADIUS } from '../utils/spacing';
import type { ThemeColors } from '../utils/colors';
import type { PathologyNote, RootStackParamList } from '../types';

// ─────────────────────────────────────────────
// useFadeIn
// ─────────────────────────────────────────────

function useFadeIn(duration = 400, delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, duration, delay]);

  return { opacity, translateY };
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'AllNotes'>;

// ─────────────────────────────────────────────
// NoteCard sub-component
// ─────────────────────────────────────────────

interface NoteCardProps {
  note: PathologyNote;
  pathologyName: string;
  onPress: () => void;
  onDelete: () => void;
  colors: ThemeColors;
  rs: ResponsiveScale;
}

function NoteCard({ note, pathologyName, onPress, onDelete, colors, rs }: NoteCardProps) {
  const styles = createStyles(colors, rs);

  const formatDate = (ts: number): string => {
    const d = new Date(ts);
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <TouchableOpacity
      style={[styles.noteCard, neuCard(colors)]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.noteTop}>
        <View style={styles.noteIconWrap}>
          <MaterialCommunityIcons name="note-text" size={rs.font(16)} color={colors.primary} />
        </View>
        <View style={styles.noteMeta}>
          <Text style={styles.noteName} numberOfLines={1}>{pathologyName}</Text>
          <Text style={styles.noteDate}>{formatDate(note.updatedAt)}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="trash-can-outline" size={rs.font(17)} color={colors.error} />
        </TouchableOpacity>
      </View>
      <Text style={styles.notePreview} numberOfLines={3}>
        {note.text}
      </Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function AllNotesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rs = useResponsiveScale();
  const insets = useSafeAreaInsets();
  const { notes, deleteNote } = useNotesContext();
  const { getPathologyById } = usePathologyData();

  const styles = createStyles(colors, rs);
  const { opacity, translateY } = useFadeIn(380, 40);

  // Sort notes by most recent first
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes]);

  const handlePress = useCallback((note: PathologyNote) => {
    navigation.navigate('PathologyDetail', { pathologyId: note.pathologyId });
  }, [navigation]);

  const handleDelete = useCallback((note: PathologyNote, pathologyName: string) => {
    Alert.alert(
      'Eliminar nota',
      `¿Eliminar la nota de "${pathologyName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteNote(note.pathologyId),
        },
      ],
    );
  }, [deleteNote]);

  const keyExtractor = useCallback((item: PathologyNote) => item.pathologyId, []);

  const renderItem = useCallback(
    ({ item }: { item: PathologyNote }) => {
      const pathology = getPathologyById(item.pathologyId);
      const pathologyName = pathology?.nombre ?? 'Patologia desconocida';
      return (
        <NoteCard
          note={item}
          pathologyName={pathologyName}
          onPress={() => handlePress(item)}
          onDelete={() => handleDelete(item, pathologyName)}
          colors={colors}
          rs={rs}
        />
      );
    },
    [getPathologyById, handlePress, handleDelete, colors, rs],
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={{
        width: rs.space(80), height: rs.space(80), borderRadius: rs.space(40),
        backgroundColor: colors.primary + '12', alignItems: 'center', justifyContent: 'center',
        marginBottom: rs.space(16),
      }}>
        <MaterialCommunityIcons name="note-edit-outline" size={rs.font(36)} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>Tus apuntes personales</Text>
      <Text style={styles.emptySubtitle}>
        Creá notas desde el detalle de cualquier patología para repasar después.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + rs.space(SPACING.lg) }]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={rs.font(22)} color={colors.gradientText} />
        </TouchableOpacity>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Text style={styles.headerTitle}>Mis Notas</Text>
          <Text style={styles.headerSubtitle}>
            {sortedNotes.length}{' '}
            {sortedNotes.length === 1 ? 'nota guardada' : 'notas guardadas'}
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* List */}
      <FlatList
        data={sortedNotes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + rs.space(SPACING.xl) },
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        removeClippedSubviews={false}
      />
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
    header: {
      paddingBottom: rs.space(SPACING.xxl),
      paddingHorizontal: rs.space(SPACING.xxl),
    },
    backButton: {
      marginBottom: rs.space(SPACING.md),
    },
    headerTitle: {
      fontSize: rs.font(26),
      fontWeight: '800',
      color: colors.gradientText,
      letterSpacing: -0.5,
      marginBottom: rs.space(4),
    },
    headerSubtitle: {
      fontSize: rs.font(14),
      fontWeight: '500',
      color: colors.gradientText,
      opacity: 0.82,
    },
    listContent: {
      paddingTop: rs.space(SPACING.md),
      paddingHorizontal: rs.space(SPACING.lg),
      gap: rs.space(SPACING.sm),
    },
    noteCard: {
      padding: rs.space(SPACING.md),
    },
    noteTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.space(SPACING.sm),
      marginBottom: rs.space(SPACING.sm),
    },
    noteIconWrap: {
      width: rs.space(32),
      height: rs.space(32),
      borderRadius: rs.space(16),
      backgroundColor: colors.primary + '18',
      alignItems: 'center',
      justifyContent: 'center',
    },
    noteMeta: {
      flex: 1,
    },
    noteName: {
      fontSize: rs.font(14),
      fontWeight: '700',
      color: colors.text,
    },
    noteDate: {
      fontSize: rs.font(11),
      color: colors.textLight,
      marginTop: rs.space(1),
    },
    deleteButton: {
      padding: rs.space(SPACING.xs),
    },
    notePreview: {
      fontSize: rs.font(13),
      color: colors.textSecondary,
      lineHeight: rs.font(19),
      backgroundColor: colors.noteBackground,
      borderRadius: RADIUS.xs,
      padding: rs.space(SPACING.sm),
      borderLeftWidth: 3,
      borderLeftColor: colors.noteBorder,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: rs.space(SPACING.xxxl),
      paddingTop: rs.space(80),
      gap: rs.space(SPACING.md),
    },
    emptyTitle: {
      fontSize: rs.font(20),
      fontWeight: '700',
      color: colors.textSecondary,
    },
    emptySubtitle: {
      fontSize: rs.font(14),
      color: colors.textLight,
      textAlign: 'center',
      lineHeight: rs.font(21),
    },
  });
