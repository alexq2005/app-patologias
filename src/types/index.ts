// ============================================================
// Patologias de Enfermeria — Type Definitions
// ============================================================

// --- Body Systems ---

export type BodySystemId =
  | 'cardiovascular'
  | 'respiratorio'
  | 'neurologico'
  | 'digestivo'
  | 'endocrino'
  | 'renal_urinario'
  | 'musculoesqueletico'
  | 'hematologico'
  | 'inmunologico'
  | 'tegumentario'
  | 'reproductivo'
  | 'traumatologico';

export interface BodySystem {
  id: BodySystemId;
  nombre: string;
  descripcion: string;
  color: string;
  icon: string;
  pathologyCount: number;
}

// --- Pathology (core entity) ---

export type EmergencyLevel = 'ninguno' | 'leve' | 'moderado' | 'critico';

export interface NandaDiagnosis {
  codigo: string;
  nombre: string;
  definicion: string;
  caracteristicasDefinitorias: string[];
  factoresRelacionados: string[];
}

export interface NicIntervention {
  codigo: string;
  nombre: string;
  actividades: string[];
}

export interface NocResult {
  codigo: string;
  nombre: string;
  indicadores: string[];
  escala: string;
}

export interface PathologyDrug {
  nombre: string;
  grupo: string;
  mecanismo: string;
  dosis?: string;
  cuidadosEnfermeria: string[];
}

export interface DiagnosticTest {
  nombre: string;
  descripcion: string;
  valoresReferencia?: string;
  cuidadosEnfermeria?: string[];
}

export interface Pathology {
  id: string;
  nombre: string;
  bodySystemId: BodySystemId;
  definicion: string;
  epidemiologia?: string;
  factoresRiesgo: string[];
  fisiopatologia: string;
  signosYSintomas: {
    signos: string[];
    sintomas: string[];
  };
  clasificacion?: {
    nombre: string;
    tipos: { nombre: string; descripcion: string }[];
  };
  diagnostico: {
    anamnesis: string[];
    examenFisico: string[];
    pruebas: DiagnosticTest[];
  };
  tratamientoMedico: {
    objetivos: string[];
    farmacologico: PathologyDrug[];
    noFarmacologico: string[];
    quirurgico?: string[];
  };
  cuidadosEnfermeria: {
    valoracion: string[];
    intervenciones: string[];
    educacionPaciente: string[];
    monitorizacion: string[];
  };
  npiNanda: NandaDiagnosis[];
  npiNic: NicIntervention[];
  npiNoc: NocResult[];
  complicaciones: string[];
  criteriosAlarma: string[];
  emergencyLevel: EmergencyLevel;
  relatedPathologyIds?: string[];
  isPremium: boolean;
  videoUrl?: string;
}

// --- Clinical Scales ---

export type ScaleType = 'components' | 'selector' | 'checklist';

export interface ScaleOption {
  label: string;
  value: number;
}

export interface ScaleComponent {
  nombre: string;
  opciones: ScaleOption[];
}

export interface ScaleInterpretation {
  rango: [number, number];
  label: string;
  color: string;
  descripcion: string;
}

export interface ClinicalScale {
  id: string;
  nombre: string;
  abreviatura: string;
  descripcion: string;
  tipo: ScaleType;
  categoria: string;
  componentes: ScaleComponent[];
  interpretaciones: ScaleInterpretation[];
  rangoTotal: [number, number];
  contextoClinico: string;
  referencia: string;
}

// --- Lab Values ---

export type LabCategory =
  | 'hematologia' | 'bioquimica' | 'coagulacion'
  | 'hepatico' | 'renal' | 'cardiaco'
  | 'endocrino' | 'orina' | 'gasometria';

export interface LabRange {
  min: number;
  max: number;
  unidad: string;
}

export interface LabValue {
  id: string;
  nombre: string;
  abreviatura: string;
  categoria: LabCategory;
  rangos: {
    adultoHombre?: LabRange;
    adultoMujer?: LabRange;
    adulto?: LabRange;
    pediatrico?: LabRange;
  };
  significadoAlto: string;
  significadoBajo: string;
  patologiasAsociadas: string[];
  implicacionesEnfermeria: string[];
}

// --- Emergency Protocols ---

export type ProtocolCategory =
  | 'cardiaco' | 'respiratorio' | 'neurologico'
  | 'metabolico' | 'sepsis' | 'trauma'
  | 'obstetrico' | 'pediatrico' | 'otro';

export type ProtocolPriority = 'critico' | 'urgente' | 'emergente';

export interface ProtocolStep {
  orden: number;
  tiempo?: string;
  accion: string;
  detalles?: string;
  critico?: boolean;
  farmacos?: { nombre: string; dosis: string; via: string }[];
  decision?: { pregunta: string; si: string; no: string };
}

export interface EmergencyProtocol {
  id: string;
  nombre: string;
  abreviatura?: string;
  descripcion: string;
  categoria: ProtocolCategory;
  prioridad: ProtocolPriority;
  banderasRojas: string[];
  pasos: ProtocolStep[];
  resumenFarmacos: {
    nombre: string;
    dosis: string;
    via: string;
    indicacion: string;
  }[];
  notasEnfermeria: string[];
  patologiaRelacionada?: string;
}

// --- Quiz ---

export type QuizQuestionType =
  | 'fisiopatologia' | 'signosSintomas' | 'diagnostico'
  | 'tratamiento' | 'cuidadosEnfermeria' | 'nanda'
  | 'complicaciones' | 'emergencia';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  questionText: string;
  options: string[];
  correctIndex: number;
  pathologyName: string;
  pathologyId: string;
  explanation: string;
  clinicalPearl?: string;
  keyFact?: string;
}

export interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  startedAt: number;
}

export interface QuizResult {
  id: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  category: string;
  completedAt: number;
}

// --- Notes & Favorites ---

export interface PathologyNote {
  pathologyId: string;
  text: string;
  updatedAt: number;
}

export interface SearchHistoryEntry {
  query: string;
  timestamp: number;
}

export interface SearchResult {
  pathology: Pathology;
  score: number;
  matchedFields: string[];
}

// --- Navigation ---

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  PathologyDetail: { pathologyId: string; pathologyName?: string };
  SystemPathologies: {
    systemId: BodySystemId;
    systemName: string;
    systemColor: string;
  };
  ScaleDetail: { scaleId: string };
  LabValues: undefined;
  EmergencyProtocols: undefined;
  ProtocolDetail: { protocolId: string };
  QuizScreen: undefined;
  QuizSession: { category?: string; questionCount: number };
  NandaScreen: undefined;
  Dashboard: undefined;
  AllNotes: undefined;
  AllFavorites: undefined;
  AboutScreen: undefined;
  PremiumScreen: undefined;
  DifferentialScreen: undefined;
  SettingsScreen: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
  MiSuite: undefined;
};

export type TabParamList = {
  Inicio: undefined;
  Sistemas: undefined;
  Busqueda: undefined;
  Escalas: undefined;
  Herramientas: undefined;
};
