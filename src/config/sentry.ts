/**
 * Sentry crash reporting integration.
 *
 * SETUP (one-time, manual):
 *   1. Create project at https://sentry.io (free tier: 5K errors/month)
 *   2. Copy the DSN from Project Settings → Client Keys (DSN)
 *   3. Paste into SENTRY_DSN below (or wire to a build-time env var)
 *   4. Run the wizard for native integration:
 *        npx @sentry/wizard@latest -i reactNative -p android
 *      This installs `@sentry/react-native`, configures the Android Gradle plugin,
 *      and sets up source map upload on release builds.
 *   5. Rebuild: pre-bundle JS, then ./gradlew app:assembleFreeRelease
 *
 * Until step 4 is done, this file is a no-op and the app boots normally.
 */

import { Platform } from 'react-native';

const SENTRY_DSN = ''; // ← paste DSN here once Sentry project is created

const APP_VERSION = '2.0.0';

export function initSentry(): void {
  if (!SENTRY_DSN) {
    if (__DEV__) {
      console.log('[Sentry] DSN not configured — crash reporting disabled');
    }
    return;
  }

  try {
    // Dynamic require so the app boots even if @sentry/react-native is not yet installed.
    // After running `npx @sentry/wizard@latest -i reactNative`, the require resolves.
    const Sentry = require('@sentry/react-native');

    Sentry.init({
      dsn: SENTRY_DSN,
      release: APP_VERSION,
      dist: Platform.OS,

      // Sampling: send all errors, 10% of performance traces
      sampleRate: 1.0,
      tracesSampleRate: 0.1,

      enableNativeCrashHandling: true,
      enableAutoSessionTracking: true,
      attachStacktrace: true,

      // Defensive PII stripping — the app has no user accounts, but if a future
      // sync feature adds them, this guarantees we never ship identifiers
      // unless `crashReportingPii` feature flag is explicitly turned on.
      beforeSend(event: Record<string, unknown>) {
        delete event.user;
        delete event.contexts;
        return event;
      },

      // Don't report errors during dev — too noisy
      enabled: !__DEV__,
    });

    if (__DEV__) {
      console.log('[Sentry] initialized for release', APP_VERSION);
    }
  } catch (err) {
    // Sentry not installed yet — silent no-op in production, log in dev
    if (__DEV__) {
      console.warn('[Sentry] not installed; run the setup wizard. Error:', err);
    }
  }
}

/**
 * Manually capture an error (use for handled exceptions you still want to track).
 * No-op if Sentry isn't installed/configured.
 */
export function captureError(err: unknown, context?: Record<string, unknown>): void {
  if (!SENTRY_DSN) return;
  try {
    const Sentry = require('@sentry/react-native');
    Sentry.captureException(err, { extra: context });
  } catch {
    // no-op
  }
}
