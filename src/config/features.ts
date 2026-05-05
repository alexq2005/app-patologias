/**
 * Feature flags for controlled rollout of in-progress features.
 *
 * Each entry is a compile-time flag. To ship a new feature:
 *   1. Add the flag here with `false`
 *   2. Gate the code with `isFeatureEnabled('flagName')`
 *   3. When ready, flip to `true` and rebuild the AAB
 *
 * Why compile-time and not runtime: the app ships offline-first to hospitals,
 * so we can't rely on a remote config service. If/when OTA content lands
 * (Fase 3), a runtime override layer can be added on top of this registry.
 */

type FlagRegistry = {
  /** YouTube video links per pathology — videoUrl field already exists in data. */
  readonly videoLinks: boolean;
  /** Voice search via @react-native-voice/voice. */
  readonly voiceSearch: boolean;
  /** Export user notes to PDF. */
  readonly exportNotesPdf: boolean;
  /** OTA content updates — fetch new pathologies.json without republishing AAB (Fase 3). */
  readonly contentOTA: boolean;
  /** Sync favorites/notes between devices via backend (requires user accounts). */
  readonly syncBetweenDevices: boolean;
  /** Quiz progress persistence across sessions. */
  readonly quizHistory: boolean;
};

export const FEATURES: FlagRegistry = {
  videoLinks: false,
  voiceSearch: false,
  exportNotesPdf: false,
  contentOTA: false,
  syncBetweenDevices: false,
  quizHistory: false,
};

export type FeatureFlag = keyof FlagRegistry;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURES[flag] === true;
}
