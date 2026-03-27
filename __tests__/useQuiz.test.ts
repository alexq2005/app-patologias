import {
  extractCandidates,
  buildQuestionText,
  buildExplanation,
  generateQuestion,
} from '../src/hooks/useQuiz';
import type { Pathology, QuizQuestionType } from '../src/types';

// ── Mock data ────────────────────────────────────────────

const mockHTA = {
  id: 'pat_hta',
  nombre: 'Hipertensión Arterial',
  bodySystemId: 'cardiovascular',
  definicion: 'Elevación sostenida de la presión arterial',
  fisiopatologia: 'Aumento de la resistencia vascular periférica por disfunción endotelial',
  signosYSintomas: {
    signos: ['PA > 140/90 mmHg', 'Cefalea occipital'],
    sintomas: ['Mareos', 'Visión borrosa'],
  },
  cuidadosEnfermeria: {
    intervenciones: ['Control de PA cada 4 horas', 'Dieta hiposódica'],
    valoracion: ['Evaluar adherencia al tratamiento'],
  },
  npiNanda: [{ codigo: '00146', nombre: 'Ansiedad', definicion: '', caracteristicasDefinitorias: [], factoresRelacionados: [] }],
  complicaciones: ['ACV', 'Infarto agudo de miocardio', 'Insuficiencia renal'],
  tratamientoMedico: { objetivos: ['Reducir PA a < 130/80 mmHg'], farmacos: [], medidas: [] },
  diagnostico: { pruebas: [{ nombre: 'MAPA', descripcion: '' }], diferenciales: [] },
  criteriosAlarma: ['PA > 180/120 mmHg', 'Cefalea intensa súbita'],
} as unknown as Pathology;

const mockDiabetes = {
  id: 'pat_diabetes',
  nombre: 'Diabetes Mellitus Tipo 2',
  bodySystemId: 'endocrino',
  definicion: 'Trastorno metabólico',
  fisiopatologia: 'Resistencia periférica a la insulina',
  signosYSintomas: {
    signos: ['Glucemia > 126 mg/dL'],
    sintomas: ['Poliuria', 'Polidipsia', 'Polifagia'],
  },
  cuidadosEnfermeria: {
    intervenciones: ['Control de glucemia capilar', 'Educación sobre insulina'],
    valoracion: ['Evaluar pies diabéticos'],
  },
  npiNanda: [{ codigo: '00179', nombre: 'Riesgo de glucemia inestable', definicion: '', caracteristicasDefinitorias: [], factoresRelacionados: [] }],
  complicaciones: ['Neuropatía', 'Retinopatía', 'Nefropatía diabética'],
  tratamientoMedico: { objetivos: ['Mantener HbA1c < 7%'], farmacos: [], medidas: [] },
  diagnostico: { pruebas: [{ nombre: 'HbA1c', descripcion: '' }], diferenciales: [] },
  criteriosAlarma: ['Glucemia > 400 mg/dL', 'Cetoacidosis'],
} as unknown as Pathology;

const allPathologies = [mockHTA, mockDiabetes];

// ══════════════════════════════════════════════════════════
//  extractCandidates
// ══════════════════════════════════════════════════════════

describe('extractCandidates', () => {
  it('extrae signos y síntomas combinados', () => {
    const result = extractCandidates(mockHTA, 'signosSintomas');
    expect(result).toContain('PA > 140/90 mmHg');
    expect(result).toContain('Mareos');
    expect(result.length).toBe(4);
  });

  it('extrae complicaciones', () => {
    const result = extractCandidates(mockHTA, 'complicaciones');
    expect(result).toEqual(['ACV', 'Infarto agudo de miocardio', 'Insuficiencia renal']);
  });

  it('extrae diagnósticos NANDA por nombre', () => {
    const result = extractCandidates(mockHTA, 'nanda');
    expect(result).toEqual(['Ansiedad']);
  });

  it('extrae criterios de alarma', () => {
    const result = extractCandidates(mockHTA, 'emergencia');
    expect(result).toContain('PA > 180/120 mmHg');
  });

  it('retorna array vacío si no hay datos', () => {
    const empty = { ...mockHTA, complicaciones: [] } as unknown as Pathology;
    expect(extractCandidates(empty, 'complicaciones')).toEqual([]);
  });
});

// ══════════════════════════════════════════════════════════
//  buildQuestionText
// ══════════════════════════════════════════════════════════

describe('buildQuestionText', () => {
  it('genera pregunta de signos/síntomas', () => {
    expect(buildQuestionText('signosSintomas', 'HTA')).toBe(
      '¿Cuál es un signo o síntoma de HTA?',
    );
  });

  it('genera pregunta para los 8 tipos sin error', () => {
    const tipos: QuizQuestionType[] = [
      'fisiopatologia', 'signosSintomas', 'diagnostico', 'tratamiento',
      'cuidadosEnfermeria', 'nanda', 'complicaciones', 'emergencia',
    ];
    for (const tipo of tipos) {
      const text = buildQuestionText(tipo, 'Test');
      expect(text).toContain('Test');
    }
  });
});

// ══════════════════════════════════════════════════════════
//  buildExplanation
// ══════════════════════════════════════════════════════════

describe('buildExplanation', () => {
  it('incluye la respuesta correcta y el nombre', () => {
    const exp = buildExplanation('complicaciones', 'HTA', 'ACV');
    expect(exp).toContain('ACV');
    expect(exp).toContain('HTA');
  });
});

// ══════════════════════════════════════════════════════════
//  generateQuestion
// ══════════════════════════════════════════════════════════

describe('generateQuestion', () => {
  it('genera pregunta con 4 opciones', () => {
    const q = generateQuestion(mockHTA, allPathologies, 'complicaciones', 0);
    expect(q).not.toBeNull();
    expect(q!.options).toHaveLength(4);
  });

  it('correctIndex apunta a una respuesta válida del target', () => {
    const q = generateQuestion(mockHTA, allPathologies, 'signosSintomas', 0);
    expect(q).not.toBeNull();
    const correct = q!.options[q!.correctIndex];
    const candidates = extractCandidates(mockHTA, 'signosSintomas');
    expect(candidates).toContain(correct);
  });

  it('retorna null sin datos suficientes', () => {
    const empty = { ...mockHTA, complicaciones: [] } as unknown as Pathology;
    expect(generateQuestion(empty, allPathologies, 'complicaciones', 0)).toBeNull();
  });

  it('el ID tiene formato correcto', () => {
    const q = generateQuestion(mockHTA, allPathologies, 'complicaciones', 3);
    expect(q).not.toBeNull();
    expect(q!.id).toBe('q_3_pat_hta_complicaciones');
  });
});
