// ============================================================
// useQuiz — quiz generation, state & persistence
// ============================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathologyData } from './usePathologyData';
import type {
  Pathology,
  QuizQuestion,
  QuizSession,
  QuizResult,
  QuizQuestionType,
  BodySystemId,
} from '../types';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const STORAGE_KEY = '@patologias_quiz_results';

const ALL_TYPES: QuizQuestionType[] = [
  'fisiopatologia',
  'signosSintomas',
  'diagnostico',
  'tratamiento',
  'cuidadosEnfermeria',
  'nanda',
  'complicaciones',
  'emergencia',
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * For a given question type, extract a list of candidate answer strings
 * from a pathology so we can build the correct answer and distractors.
 */
function extractCandidates(
  p: Pathology,
  type: QuizQuestionType,
): string[] {
  switch (type) {
    case 'fisiopatologia':
      return p.fisiopatologia
        ? [p.fisiopatologia.slice(0, 160)]
        : [];
    case 'signosSintomas': {
      const all = [
        ...p.signosYSintomas.signos,
        ...p.signosYSintomas.sintomas,
      ];
      return all.length > 0 ? all : [];
    }
    case 'cuidadosEnfermeria': {
      const all = [
        ...p.cuidadosEnfermeria.intervenciones,
        ...p.cuidadosEnfermeria.valoracion,
      ];
      return all.length > 0 ? all : [];
    }
    case 'nanda':
      return p.npiNanda.length > 0
        ? p.npiNanda.map(n => n.nombre)
        : [];
    case 'complicaciones':
      return p.complicaciones.length > 0 ? p.complicaciones : [];
    case 'tratamiento':
      return p.tratamientoMedico.objetivos.length > 0
        ? p.tratamientoMedico.objetivos
        : [];
    case 'diagnostico':
      return p.diagnostico.pruebas.length > 0
        ? p.diagnostico.pruebas.map(t => t.nombre)
        : [];
    case 'emergencia':
      return p.criteriosAlarma.length > 0 ? p.criteriosAlarma : [];
    default:
      return [];
  }
}

/** Build the question text given a type and pathology name */
function buildQuestionText(type: QuizQuestionType, pathologyName: string): string {
  switch (type) {
    case 'fisiopatologia':
      return `¿Cual es el mecanismo fisiopatologico de ${pathologyName}?`;
    case 'signosSintomas':
      return `¿Cual es un signo o sintoma de ${pathologyName}?`;
    case 'cuidadosEnfermeria':
      return `¿Cual es un cuidado de enfermeria prioritario en ${pathologyName}?`;
    case 'nanda':
      return `¿Cual diagnostico NANDA corresponde a ${pathologyName}?`;
    case 'complicaciones':
      return `¿Cual es una complicacion de ${pathologyName}?`;
    case 'tratamiento':
      return `¿Cual es un objetivo del tratamiento de ${pathologyName}?`;
    case 'diagnostico':
      return `¿Que prueba diagnostica es clave para ${pathologyName}?`;
    case 'emergencia':
      return `¿Cual es un criterio de alarma de ${pathologyName}?`;
    default:
      return `Pregunta sobre ${pathologyName}`;
  }
}

/** Build an explanation string for the correct answer */
function buildExplanation(
  type: QuizQuestionType,
  pathologyName: string,
  correctAnswer: string,
): string {
  switch (type) {
    case 'fisiopatologia':
      return `La fisiopatologia de ${pathologyName}: ${correctAnswer}`;
    case 'signosSintomas':
      return `"${correctAnswer}" es un signo/sintoma caracteristico de ${pathologyName}.`;
    case 'cuidadosEnfermeria':
      return `Cuidado prioritario en ${pathologyName}: ${correctAnswer}`;
    case 'nanda':
      return `El diagnostico NANDA "${correctAnswer}" es aplicable en ${pathologyName}.`;
    case 'complicaciones':
      return `"${correctAnswer}" es una complicacion reconocida de ${pathologyName}.`;
    case 'tratamiento':
      return `Objetivo terapeutico en ${pathologyName}: ${correctAnswer}`;
    case 'diagnostico':
      return `La prueba "${correctAnswer}" es clave en el diagnostico de ${pathologyName}.`;
    case 'emergencia':
      return `Criterio de alarma en ${pathologyName}: ${correctAnswer}`;
    default:
      return correctAnswer;
  }
}

// ─────────────────────────────────────────────
// generateQuestion
// ─────────────────────────────────────────────

function generateQuestion(
  target: Pathology,
  allPathologies: Pathology[],
  type: QuizQuestionType,
  index: number,
): QuizQuestion | null {
  const correctCandidates = extractCandidates(target, type);
  if (correctCandidates.length === 0) return null;

  const correctAnswer = pickRandom(correctCandidates);

  // Gather wrong answers from OTHER pathologies
  const others = allPathologies.filter(p => p.id !== target.id);
  const wrongPool: string[] = [];

  for (const other of others) {
    const candidates = extractCandidates(other, type);
    for (const c of candidates) {
      if (c !== correctAnswer) wrongPool.push(c);
    }
    if (wrongPool.length >= 12) break;
  }

  if (wrongPool.length < 3) return null;

  const wrongAnswers = pickRandomN(wrongPool, 3);

  // Build shuffled options and find correctIndex
  const rawOptions = [correctAnswer, ...wrongAnswers];
  const shuffled = shuffleArray(rawOptions);
  const correctIndex = shuffled.indexOf(correctAnswer);

  return {
    id: `q_${index}_${target.id}_${type}`,
    type,
    questionText: buildQuestionText(type, target.nombre),
    options: shuffled,
    correctIndex,
    pathologyName: target.nombre,
    explanation: buildExplanation(type, target.nombre, correctAnswer),
  };
}

// ─────────────────────────────────────────────
// generateQuiz options
// ─────────────────────────────────────────────

interface GenerateQuizOptions {
  category?: BodySystemId;
  questionCount: number;
  types?: QuizQuestionType[];
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useQuiz() {
  const { pathologies, bodySystems } = usePathologyData();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load persisted results on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => {
        if (raw) {
          try {
            const parsed: QuizResult[] = JSON.parse(raw);
            setResults(parsed);
          } catch {
            setResults([]);
          }
        }
      })
      .finally(() => setLoaded(true));
  }, []);

  // ── generateQuiz ──────────────────────────────────────────────

  const generateQuiz = useCallback(
    (options: GenerateQuizOptions): QuizSession => {
      const { category, questionCount, types } = options;
      const allowedTypes = types && types.length > 0 ? types : ALL_TYPES;

      // Filter pathologies by category if specified
      const pool = category
        ? pathologies.filter(p => p.bodySystemId === category)
        : pathologies;

      if (pool.length === 0) {
        return {
          questions: [],
          currentIndex: 0,
          answers: [],
          startedAt: Date.now(),
        };
      }

      const questions: QuizQuestion[] = [];
      let attempts = 0;
      const maxAttempts = questionCount * 10;

      while (questions.length < questionCount && attempts < maxAttempts) {
        attempts++;
        const target = pickRandom(pool);
        const type = pickRandom(allowedTypes);
        const q = generateQuestion(target, pathologies, type, questions.length);
        if (q) {
          // Avoid exact duplicate questions
          const isDuplicate = questions.some(
            existing =>
              existing.pathologyName === q.pathologyName &&
              existing.type === q.type,
          );
          if (!isDuplicate) {
            questions.push(q);
          }
        }
      }

      return {
        questions,
        currentIndex: 0,
        answers: new Array(questions.length).fill(null),
        startedAt: Date.now(),
      };
    },
    [pathologies],
  );

  // ── saveResult ────────────────────────────────────────────────

  const saveResult = useCallback(
    async (result: QuizResult) => {
      const updated = [result, ...results].slice(0, 50); // keep last 50
      setResults(updated);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // silently ignore storage errors
      }
    },
    [results],
  );

  // ── derived stats ─────────────────────────────────────────────

  const averageScore = useMemo(() => {
    if (results.length === 0) return 0;
    const sum = results.reduce((acc, r) => acc + r.percentage, 0);
    return Math.round(sum / results.length);
  }, [results]);

  const totalSessions = results.length;

  const clearResults = useCallback(() => {
    setResults([]);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  // ── bodySystems for category picker ──────────────────────────

  return {
    generateQuiz,
    saveResult,
    results,
    averageScore,
    totalSessions,
    clearResults,
    loaded,
    bodySystems,
  };
}
