import { Vibration } from 'react-native';

let vibrating = false;

const DEFAULT_PATTERN = [0, 400, 50];

export function startVibration(pattern: number[] = DEFAULT_PATTERN): void {
  Vibration.cancel();
  vibrating = true;
  Vibration.vibrate(pattern, true);
}

export function stopVibration(): void {
  vibrating = false;
  Vibration.cancel();
}

export function isVibrating(): boolean {
  return vibrating;
}

export function toggleVibration(pattern?: number[]): void {
  if (vibrating) {
    stopVibration();
  } else {
    startVibration(pattern);
  }
}
