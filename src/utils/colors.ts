// ============================================================
// Color system — Patologias de Enfermeria
// Cada sistema corporal tiene su propio color
// ============================================================

import type { BodySystemId, EmergencyLevel } from '../types';

export const BODY_SYSTEM_COLORS: Record<BodySystemId, string> = {
  cardiovascular:     '#E55050', // Rojo coral suave
  respiratorio:       '#54A0FF', // Azul cielo
  neurologico:        '#6C5CE7', // Violeta suave
  digestivo:          '#F78B3D', // Naranja calido
  endocrino:          '#E0A030', // Ambar dorado
  renal_urinario:     '#FDAD5A', // Amarillo ambar
  musculoesqueletico: '#00B894', // Teal menta
  hematologico:       '#C44569', // Rosa vino suave
  inmunologico:       '#2ECC71', // Verde esmeralda
  tegumentario:       '#E8A87C', // Durazno calido
  reproductivo:       '#FD79A8', // Rosa suave
  traumatologico:     '#FF6348', // Rojo tomate calido
};

export const BODY_SYSTEM_ICONS: Record<BodySystemId, string> = {
  cardiovascular:     'heart-pulse',
  respiratorio:       'lungs',
  neurologico:        'brain',
  digestivo:          'stomach',
  endocrino:          'scale-balance',
  renal_urinario:     'kidney',
  musculoesqueletico: 'bone',
  hematologico:       'water',
  inmunologico:       'shield-plus-outline',
  tegumentario:       'hand-back-right-outline',
  reproductivo:       'human-pregnant',
  traumatologico:     'ambulance',
};

export const EMERGENCY_LEVEL_COLORS: Record<EmergencyLevel, string> = {
  ninguno:  '#6B7280',  // Gris
  leve:     '#F59E0B',  // Amarillo
  moderado: '#EA580C',  // Naranja
  critico:  '#DC2626',  // Rojo
};

export type ThemeColors = typeof LIGHT_COLORS;

export const LIGHT_COLORS = {
  primary: '#6C5CE7',         // Violeta suave — menos saturado, mas amigable
  primaryLight: '#A29BFE',
  primaryDark: '#5A4BD1',
  secondary: '#00B894',       // Verde menta — calido y profesional
  accent: '#FD79A8',          // Rosa suave
  background: '#F8F9FC',      // Gris calido con toque violeta
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#2D3047',            // Azul oscuro calido (no negro puro)
  textSecondary: '#636E83',   // Gris calido medio
  textLight: '#9BA4B5',       // Gris calido claro
  border: '#E8ECF2',          // Borde calido
  borderLight: '#F2F4F8',
  error: '#E55050',           // Rojo mas suave
  warning: '#FDAD5A',         // Amarillo ambar calido
  success: '#2ECC71',         // Verde esmeralda vibrante
  info: '#54A0FF',            // Azul cielo amigable
  emergency: '#E55050',
  nursing: '#6C5CE7',         // Mismo que primary para coherencia
  cardBackground: '#FFFFFF',
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.4)',
  tabBarActive: '#6C5CE7',
  tabBarInactive: '#9BA4B5',
  searchHighlight: '#FFF3CD',
  quiz: '#A29BFE',
  quizCorrect: '#2ECC71',
  quizWrong: '#E55050',
  noteBackground: '#FFF8E7',
  noteBorder: '#FFE0A3',
  // Neumorphic tokens
  neuBackground: '#F2F4F8',
  neuSurface: '#FFFFFF',
  neuSurfacePressed: '#ECEEF3',
  neuBorderLight: 'rgba(255,255,255,0.9)',
  neuBorderDark: 'rgba(0,0,0,0.05)',
  neuInsetBg: '#ECEEF3',
  neuInsetBorderTop: 'rgba(0,0,0,0.06)',
  neuInsetBorderBottom: 'rgba(255,255,255,0.8)',
  gradientStart: '#6C5CE7',
  gradientEnd: '#A29BFE',
  gradientText: '#FFFFFF',
};

export const DARK_COLORS: ThemeColors = {
  primary: '#A29BFE',         // Violeta claro — legible sobre oscuro
  primaryLight: '#C8C3FF',
  primaryDark: '#6C5CE7',
  secondary: '#55EFC4',       // Verde menta brillante
  accent: '#FD79A8',
  background: '#161B2E',      // Azul noche calido (no negro muerto)
  surface: '#1E2640',         // Superficie elevada calida
  surfaceElevated: '#2A3250', // Aun mas elevada
  text: '#F0F1F5',            // Blanco calido (no blanco puro)
  textSecondary: '#9BA4B8',   // Gris medio legible
  textLight: '#636E83',       // Gris sutil
  border: '#2A3250',          // Borde coherente con superficie
  borderLight: '#1E2640',
  error: '#FF6B6B',           // Rojo coral — suave para dark mode
  warning: '#FECA57',         // Amarillo calido
  success: '#55EFC4',         // Verde menta
  info: '#74B9FF',            // Azul cielo suave
  emergency: '#FF6B6B',
  nursing: '#A29BFE',
  cardBackground: '#1E2640',
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.6)',
  tabBarActive: '#A29BFE',
  tabBarInactive: '#4A5568',
  searchHighlight: '#5A4017',
  quiz: '#A29BFE',
  quizCorrect: '#55EFC4',
  quizWrong: '#FF6B6B',
  noteBackground: '#1E2640',
  noteBorder: '#5A4017',
  // Neumorphic tokens
  neuBackground: '#161B2E',
  neuSurface: '#1E2640',
  neuSurfacePressed: '#171D30',
  neuBorderLight: 'rgba(255,255,255,0.07)',
  neuBorderDark: 'rgba(0,0,0,0.2)',
  neuInsetBg: '#171D30',
  neuInsetBorderTop: 'rgba(0,0,0,0.25)',
  neuInsetBorderBottom: 'rgba(255,255,255,0.05)',
  gradientStart: '#6C5CE7',
  gradientEnd: '#A29BFE',
  gradientText: '#FFFFFF',
};

export const COLORS = LIGHT_COLORS;

export const SCALE_COLORS: Record<string, string> = {
  neurologia: '#7C3AED',
  neonatologia: '#EC4899',
  riesgo_ulceras: '#EA580C',
  sepsis: '#DC2626',
  via_aerea: '#0891B2',
  sedacion: '#6366F1',
  dolor: '#F59E0B',
  trombosis: '#991B1B',
  postanestesia: '#059669',
  asa: '#2563EB',
  caidas: '#B45309',
  funcional: '#0D9488',
  dolor_pediatrico: '#EC4899',
  nutricion: '#16A34A',
};

export const SCALE_ICONS: Record<string, string> = {
  neurologia: 'brain',
  neonatologia: 'baby-face-outline',
  riesgo_ulceras: 'bandage',
  sepsis: 'virus-outline',
  via_aerea: 'lungs',
  sedacion: 'sleep',
  dolor: 'chart-bar',
  trombosis: 'water-outline',
  postanestesia: 'hospital-building',
  asa: 'medical-bag',
  caidas: 'slip-hazard',
  funcional: 'human-walker',
  dolor_pediatrico: 'baby-face-outline',
  nutricion: 'food-apple-outline',
};

export const LAB_COLORS: Record<string, string> = {
  hematologia: '#DC2626',
  bioquimica: '#2563EB',
  coagulacion: '#991B1B',
  hepatico: '#B45309',
  renal: '#F59E0B',
  cardiaco: '#E11D48',
  endocrino: '#7C3AED',
  orina: '#0D9488',
  gasometria: '#059669',
};

export const PROTOCOL_COLORS: Record<string, string> = {
  cardiaco: '#DC2626',
  respiratorio: '#2563EB',
  neurologico: '#7C3AED',
  metabolico: '#F59E0B',
  sepsis: '#059669',
  trauma: '#EA580C',
  otro: '#6B7280',
  obstetrico: '#DB2777',
  pediatrico: '#EC4899',
};

export const PROTOCOL_ICONS: Record<string, string> = {
  cardiaco: 'heart-pulse',
  respiratorio: 'lungs',
  neurologico: 'brain',
  metabolico: 'flask-outline',
  sepsis: 'virus-outline',
  trauma: 'water-outline',
  otro: 'hospital-building',
  obstetrico: 'human-pregnant',
  pediatrico: 'baby-face-outline',
};
