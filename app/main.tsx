import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, Image, Platform, Text, ToastAndroid, View } from 'react-native';
import { router } from 'expo-router';
import { Storage } from '@lib/storage';
import { speak, stopSpeech } from '@lib/speechManager';
import { startVibration, stopVibration } from '@lib/vibrateManager';
import { startScreamDetection, stopScreamDetection } from '@lib/screamManager';
import { ImageOverlay } from '@cmp/ImageOverlay';
import { Colors, MainStyles } from '@stylez';

type Phase = 'init' | 'countdown' | 'active' | 'complete';
type LampStage = 'normal' | 'breaking' | 'broken55' | 'broken100';

const LAMP_NORMAL     = require('@img/in/ginie_lamp.png');
const LAMP_BREAKING   = require('@img/in/ginie_lamp_breaking.png');
const LAMP_BROKEN_55  = require('@img/in/ginie_lamp_broken_55.png');
const LAMP_BROKEN_100 = require('@img/in/ginie_lamp_broken_100.png');
const IMG_GINIE        = require('@img/in/ginie.png');
const IMG_BLUE_MERMAID = require('@img/in/blue_mermaid.png');
const IMG_RED_MERMAID  = require('@img/in/red_mermaid.png');

const RESET_PHRASES = [
  "You stopped! Scream again to continue!",
  "Don't give up! Keep screaming!",
];

const IDLE_PHRASES = [
  "Come on! Scream to claim your wish!",
  "Don't be shy! Scream as loud as you can!",
  "The genie is waiting! Scream now!",
];

function getLampSource(stage: LampStage) {
  switch (stage) {
    case 'normal':    return LAMP_NORMAL;
    case 'breaking':  return LAMP_BREAKING;
    case 'broken55':  return LAMP_BROKEN_55;
    case 'broken100': return LAMP_BROKEN_100;
  }
}

function getCharacterSource(outcome: 0 | 1 | 2) {
  if (outcome === 1) return IMG_GINIE;
  if (outcome === 2) return IMG_BLUE_MERMAID;
  return IMG_RED_MERMAID;
}

function pickOutcome(): 0 | 1 | 2 {
  const r = Math.random();
  if (r < 0.30) return 0;
  if (r < 0.65) return 1;
  return 2;
}

function randomFrom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function MainScreen() {
  const [phase, setPhase] = useState<Phase>('init');
  const [countdown, setCountdown] = useState(5);
  const [lampStage, setLampStage] = useState<LampStage>('normal');
  const [amplitude, setAmplitude] = useState(0);
  const [showCharacter, setShowCharacter] = useState(false);

  const userNameRef        = useRef('');
  const outcomeRef         = useRef<0 | 1 | 2>(0);
  const milestone25Ref     = useRef(false);
  const milestone55Ref     = useRef(false);
  const hadProgressRef     = useRef(false);
  const hasScreamedRef     = useRef(false);
  const idleTimerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lampOffsetAnim = useRef(new Animated.Value(0)).current;
  const characterAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Scream to escape! 😈', ToastAndroid.SHORT);
      }
      return true;
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    const alreadyReleased = Storage.getBoolean('isginiereleased');
    if (alreadyReleased === true) {
      router.replace('/end');
      return;
    }

    const name = Storage.getString('name');
    if (!name) {
      router.replace('/login');
      return;
    }
    userNameRef.current = name;

    const outcome = pickOutcome();
    outcomeRef.current = outcome;
    Storage.set('ginie', outcome);

    const t = setTimeout(() => setPhase('countdown'), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 'countdown') return;
    setCountdown(5);
    let n = 5;
    speak('Scream to release the genie.');
    const iv = setInterval(() => {
      n -= 1;
      setCountdown(n);
      if (n <= 0) {
        clearInterval(iv);
        setPhase('active');
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [phase]);

  const scheduleIdleReminder = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!hasScreamedRef.current) {
        speak(randomFrom(IDLE_PHRASES));

        idleTimerRef.current = setTimeout(() => {
          if (!hasScreamedRef.current) {
            speak(randomFrom(IDLE_PHRASES));
          }
        }, 8000);
      }
    }, 5000);
  }, []);

  const handleComplete = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    stopScreamDetection();
    stopVibration();
    setLampStage('broken100');
    setPhase('complete');
    Storage.set('isginiereleased', true);

    setTimeout(() => {
      setShowCharacter(true);

      Animated.parallel([
        Animated.timing(lampOffsetAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(characterAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        speak(
          `Congratulations ${userNameRef.current}! You've broken the genie's lamp, and someone has come out. Now, make your wish.`,
          { onDone: () => router.replace('/end') }
        );
      }, 1500);
    }, 600);
  }, [lampOffsetAnim, characterAnim]);

  const handleProgressChange = useCallback((progress: number) => {
    if (progress > 0) hadProgressRef.current = true;

    if (progress === 0) {
      setLampStage('normal');
      startVibration();
      return;
    }

    if (progress >= 25 && !milestone25Ref.current) {
      milestone25Ref.current = true;
      setLampStage('breaking');
      speak(`Very good ${userNameRef.current}, the lamp is breaking.`);
    }

    if (progress >= 55 && !milestone55Ref.current) {
      milestone55Ref.current = true;
      setLampStage('broken55');
      speak(`More than half is broken. You are almost there.`);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (hadProgressRef.current && milestone55Ref.current) {
      speak(randomFrom(RESET_PHRASES));
    }
    milestone25Ref.current = false;
    milestone55Ref.current = false;
    hadProgressRef.current = false;
    hasScreamedRef.current = false;
    scheduleIdleReminder();
  }, [scheduleIdleReminder]);

  useEffect(() => {
    if (phase !== 'active') return;

    hasScreamedRef.current = false;
    hadProgressRef.current = false;
    scheduleIdleReminder();
    startVibration();

    startScreamDetection({
      onAmplitude: setAmplitude,
      onProgressChange: handleProgressChange,
      onScreamStart: () => {
        hasScreamedRef.current = true;
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        stopVibration();
      },
      onScreamStop: startVibration,
      onComplete: handleComplete,
      onReset: handleReset,
    });

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      stopScreamDetection();
      stopVibration();
    };
  }, [phase, handleProgressChange, handleComplete, handleReset, scheduleIdleReminder]);

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      stopScreamDetection();
      stopVibration();
      stopSpeech();
    };
  }, []);

  const lampTranslateY = lampOffsetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90],
  });

  if (phase === 'init') {
    return <View style={MainStyles.screen} />;
  }

  if (phase === 'countdown') {
    return (
      <View style={MainStyles.centeredScreen}>
        <Text style={MainStyles.countdownNumber}>{countdown}</Text>
      </View>
    );
  }

  return (
    <View style={MainStyles.screen}>

      {/* Lamp */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          transform: [{ translateY: lampTranslateY }],
        }}
        pointerEvents="none"
      >
        <ImageOverlay source={getLampSource(lampStage)} fullScreen />
      </Animated.View>

      {/* Character reveal */}
      {showCharacter && (
        <Animated.View
          style={[MainStyles.characterWrap, { opacity: characterAnim }]}
          pointerEvents="none"
        >
          <Image
            source={getCharacterSource(outcomeRef.current)}
            style={MainStyles.characterImage}
            resizeMode="contain"
          />
        </Animated.View>
      )}

      {/* Amplitude meter — top right */}
      {phase === 'active' && (
        <View style={MainStyles.meterWrap} pointerEvents="none">
          <View
            style={[
              MainStyles.meterFill,
              {
                height: `${Math.round(amplitude * 100)}%`,
                backgroundColor:
                  amplitude > 0.75
                    ? Colors.green.bright
                    : amplitude > 0.5
                    ? Colors.amber.primary
                    : Colors.red.primary,
              },
            ]}
          />
        </View>
      )}

      {/* Bottom instruction */}
      {phase === 'active' && (
        <Text style={MainStyles.bottomInstruction} pointerEvents="none">
          {"SCREAM as loud as you can!\nThe louder you scream, the faster the lamp breaks."}
        </Text>
      )}

    </View>
  );
}
