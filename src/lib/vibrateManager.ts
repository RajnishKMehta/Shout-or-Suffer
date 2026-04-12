import { Vibration } from 'react-native';

let active = false;
let loopTimer: ReturnType<typeof setTimeout> | null = null;

const VIBRATE_MS = 400;
const PAUSE_MS   = 150;

function loop(): void {
  if (!active) return;
  Vibration.vibrate(VIBRATE_MS);
  loopTimer = setTimeout(loop, VIBRATE_MS + PAUSE_MS);
}

export function startVibration(): void {
  if (active) return;
  active = true;
  loop();
}

export function stopVibration(): void {
  active = false;
  if (loopTimer) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }
  Vibration.cancel();
}

export function isVibrating(): boolean {
  return active;
}

export function toggleVibration(): void {
  if (active) {
    stopVibration();
  } else {
    startVibration();
  }
}
