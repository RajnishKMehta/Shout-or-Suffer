import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioPlayer } from 'expo-audio';

let currentPlayer: AudioPlayer | null = null;
let isPlaying = false;

export async function setupAudioConfig() {
  await setAudioModeAsync({
    playsInSilentMode: true,
    interruptionMode: 'duckOthers',
    shouldPlayInBackground: false,
  });
}

function stopCurrent() {
  if (currentPlayer) {
    try {
      currentPlayer.pause();
      currentPlayer.remove();
    } catch {}
    currentPlayer = null;
  }
  isPlaying = false;
}

async function playAudio(source: any, loop = false): Promise<void> {
  stopCurrent();

  if (isPlaying) return;
  isPlaying = true;

  try {
    const player = createAudioPlayer(source);
    player.loop = loop;
    player.volume = 1;
    currentPlayer = player;

    if (!loop) {
      const sub = player.addListener('playbackStatusUpdate', (status) => {
        if (status.didJustFinish) {
          sub.remove();
          stopCurrent();
        }
      });
    }

    player.play();
  } catch {
    stopCurrent();
  }
}

export async function stopPlaying(): Promise<void> {
  stopCurrent();
}

export function pausePlaying(): void {
  if (currentPlayer) {
    try {
      currentPlayer.pause();
    } catch {}
  }
}

export function resumePlaying(): void {
  if (currentPlayer) {
    try {
      currentPlayer.play();
    } catch {}
  }
}

export function isSoundPlaying(): boolean {
  return currentPlayer?.playing ?? false;
}

export async function restartCurrentSound(): Promise<void> {
  if (currentPlayer) {
    try {
      currentPlayer.seekTo(0);
      currentPlayer.play();
    } catch {}
  }
}

export async function playChiSasur(loop = false): Promise<void> {
  await playAudio(require('@audio/chi-sasur.m4a'), loop);
}

export async function playGhachar(loop = false): Promise<void> {
  await playAudio(require('@audio/ghachar-ghachar.m4a'), loop);
}

export async function playWelcomeToHell(loop = false): Promise<void> {
  await playAudio(require('@audio/welcome-to-hell.m4a'), loop);
}

export async function playSuspiciousSfx(loop = false): Promise<void> {
  await playAudio(require('@audio/suspicious_sfx.m4a'), loop);
}
