import { Vibration } from 'react-native';

let active = false;

const PATTERN: number[] = [0, 800, 130];

export function startVibration(): void {
  if (active) return;
  active = true;
  Vibration.vibrate(PATTERN, true);
}

export function stopVibration(): void {
  if (!active) return;
  active = false;
  Vibration.cancel();
}

export function isVibrating(): boolean {
  return active;
}
