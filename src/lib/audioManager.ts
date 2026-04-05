import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

async function setAudioMode() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: false,
    staysActiveInBackground: false,
  });
}

async function playAudio(
  source: Parameters<typeof Audio.Sound.createAsync>[0],
  loop = false,
): Promise<void> {
  try {
    await stopPlaying();
    await setAudioMode();

    const { sound } = await Audio.Sound.createAsync(source, {
      shouldPlay: true,
      isLooping: loop,
      volume: 1.0,
    });

    currentSound = sound;

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish && !loop) {
        currentSound = null;
      }
    });
  } catch {
    currentSound = null;
  }
}

export async function stopPlaying(): Promise<void> {
  if (currentSound) {
    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    } catch {}
    currentSound = null;
  }
}

export function isSoundPlaying(): boolean {
  return currentSound !== null;
}

export async function playChiSasur(loop = false): Promise<void> {
  await playAudio(require('@audio/chi-sasur.mp3'), loop);
}
