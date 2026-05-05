import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getCurrentDataVersion, getLastSyncedAt } from '../data/db';

export interface DataInfo {
  /** Version of the pathology dataset currently loaded (1 = bundled, ≥2 = OTA-applied). */
  dataVersion: number;
  /** Unix ms of the last successful manifest check, or null if never synced. */
  lastSyncedAt: number | null;
}

/**
 * Reactive read of the dataset version + last-sync timestamp.
 * Refreshes when the screen using the hook regains focus, so the indicator
 * stays accurate if the user opens Settings, closes it, syncs in the background,
 * and reopens it.
 */
export function useDataInfo(): DataInfo {
  const [info, setInfo] = useState<DataInfo>(() => ({
    dataVersion: getCurrentDataVersion(),
    lastSyncedAt: getLastSyncedAt(),
  }));

  useFocusEffect(
    useCallback(() => {
      setInfo({
        dataVersion: getCurrentDataVersion(),
        lastSyncedAt: getLastSyncedAt(),
      });
    }, [])
  );

  return info;
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
