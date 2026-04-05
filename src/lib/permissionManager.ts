import { PermissionsAndroid, Platform, Linking } from 'react-native';

export type PermissionStatus =
  | 'granted'
  | 'denied'
  | 'never_ask_again'
  | 'unavailable'
  | 'pending';

export interface PermissionDef {
  id: string;
  androidPerm?: string;
  label: string;
  description: string;
  icon: string;
  isAutoGranted?: boolean;
}

export const REQUIRED_PERMISSIONS: PermissionDef[] = [
  {
    id: 'microphone',
    androidPerm: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    label: 'Microphone',
    description: 'We need to hear your screams',
    icon: 'Mic',
  },
  {
    id: 'vibrate',
    label: 'Vibrate',
    description: 'Need to shake your life up a bit',
    icon: 'Vibrate',
    isAutoGranted: true,
  },
];

export interface PermissionStatuses {
  [id: string]: PermissionStatus;
}

export async function requestRequiredPermissions(): Promise<PermissionStatuses> {
  const results: PermissionStatuses = {};

  for (const perm of REQUIRED_PERMISSIONS) {
    if (perm.isAutoGranted || !perm.androidPerm) {
      results[perm.id] = 'granted';
      continue;
    }

    if (Platform.OS !== 'android') {
      results[perm.id] = 'granted';
      continue;
    }

    try {
      const raw = await PermissionsAndroid.request(perm.androidPerm as any, {
        title: `"${perm.label}" Permission`,
        message: perm.description,
        buttonPositive: 'Fine, take it',
        buttonNegative: 'Absolutely not',
      });
      results[perm.id] = raw as PermissionStatus;
    } catch {
      results[perm.id] = 'denied';
    }
  }

  return results;
}

export function areRequiredPermissionsGranted(
  statuses: PermissionStatuses,
): boolean {
  return REQUIRED_PERMISSIONS.every((p) => statuses[p.id] === 'granted');
}

export function getMissingRequiredPermissions(
  statuses: PermissionStatuses,
): PermissionDef[] {
  return REQUIRED_PERMISSIONS.filter((p) => statuses[p.id] !== 'granted');
}

export function openAppSettings(): void {
  Linking.openSettings();
}
