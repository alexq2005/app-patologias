import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getCurrentDataVersion, getLastSyncedAt } from '../data/db';

export interface DataInfoSnapshot {
  /** Version of the pathology dataset currently loaded (1 = bundled, ≥2 = OTA-applied). */
  dataVersion: number;
  /** Unix ms of the last successful manifest check, or null if never synced. */
  lastSyncedAt: number | null;
}

export interface DataInfo extends DataInfoSnapshot {
  /** Force a re-read from the meta table — call after a manual sync completes. */
  refresh: () => void;
}

/**
 * Reactive read of the dataset version + last-sync timestamp.
 * Auto-refreshes on focus so the indicator stays accurate after background syncs.
 * Call `refresh()` explicitly after a foreground action (e.g. "check for updates"
 * button) when the screen is already focused — useFocusEffect won't re-fire.
 */
export function useDataInfo(): DataInfo {
  const [snapshot, setSnapshot] = useState<DataInfoSnapshot>(() => ({
    dataVersion: getCurrentDataVersion(),
    lastSyncedAt: getLastSyncedAt(),
  }));

  const refresh = useCallback(() => {
    setSnapshot({
      dataVersion: getCurrentDataVersion(),
      lastSyncedAt: getLastSyncedAt(),
    });
  }, []);

  useFocusEffect(refresh);

  return { ...snapshot, refresh };
}

/** Format a unix ms timestamp as a Spanish relative-time string. */
export function formatRelativeTime(timestampMs: number, nowMs: number = Date.now()): string {
  const diffSec = Math.max(0, Math.floor((nowMs - timestampMs) / 1000));
  if (diffSec < 60) return 'hace unos segundos';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `hace ${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'}`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `hace ${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
  const diffYears = Math.floor(diffDays / 365);
  return `hace ${diffYears} ${diffYears === 1 ? 'año' : 'años'}`;
}
