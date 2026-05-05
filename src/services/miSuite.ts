/**
 * MiSuite — registry of the 3 nursing-ecosystem apps + helpers for the
 * "open or download" UX. Keep pure (no React, no Linking) so it can be
 * unit-tested without component setup.
 */

export type InstallStatus = 'checking' | 'installed' | 'missing';

export interface AppEntry {
  id: 'curso' | 'patologias' | 'farmacologia';
  name: string;
  tagline: string;
  description: string;
  icon: string;
  /** Deep-link scheme used by Linking.canOpenURL to detect installation. */
  scheme: string;
  /** Android package name — used to build Play Store URLs. */
  pkg: string;
  gradient: [string, string];
  /** True for the app currently running this screen. */
  isCurrent: boolean;
}

export const APPS: AppEntry[] = [
  {
    id: 'patologias',
    name: 'Patologías de Enfermería',
    tagline: 'QUÉ tiene el paciente',
    description: '151 patologías por sistema con NANDA-NIC-NOC, escalas, valores de laboratorio y protocolos.',
    icon: 'stethoscope',
    scheme: 'patologias://',
    pkg: 'com.patologiasenfermeria.free',
    gradient: ['#7C3AED', '#5B21B6'],
    isCurrent: true,
  },
  {
    id: 'curso',
    name: 'Curso de Enfermería',
    tagline: 'CÓMO se hace',
    description: '10 módulos: fundamentos, anatomía, técnicas, emergencias y comunicación clínica.',
    icon: 'school',
    scheme: 'curso://',
    pkg: 'com.cursoenfermeria.free',
    gradient: ['#0EA5E9', '#0369A1'],
    isCurrent: false,
  },
  {
    id: 'farmacologia',
    name: 'Guía Farmacológica',
    tagline: 'QUÉ le doy al paciente',
    description: '2.877 fármacos con dosis, vías, mecanismo, interacciones y compatibilidades EV.',
    icon: 'pill',
    scheme: 'farmacologia://',
    pkg: 'com.guiafarmacologica.free',
    gradient: ['#EC4899', '#BE185D'],
    isCurrent: false,
  },
];

export function playStoreAppUrl(pkg: string): string {
  return `market://details?id=${pkg}`;
}

export function playStoreWebUrl(pkg: string): string {
  return `https://play.google.com/store/apps/details?id=${pkg}`;
}

/**
 * Ordered list of URLs to try when the user taps a card. Each falls back
 * to the next on failure.
 *
 * - Current app: empty (button is disabled).
 * - Installed: try the deep-link scheme first; if that fails, send to the
 *   Play Store (some devices reject deep links even after canOpenURL=true).
 * - Missing: skip the scheme and go straight to the Play Store. The market://
 *   intent is preferred (opens the Play Store app); web URL is the final
 *   fallback for devices without it.
 */
export function chooseLaunchUrls(app: AppEntry, status: InstallStatus): string[] {
  if (app.isCurrent) return [];
  if (status === 'installed') {
    return [app.scheme, playStoreAppUrl(app.pkg), playStoreWebUrl(app.pkg)];
  }
  return [playStoreAppUrl(app.pkg), playStoreWebUrl(app.pkg)];
}
