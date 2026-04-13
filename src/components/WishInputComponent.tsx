import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Storage } from '@lib/storage';
import { speak, stopSpeech } from '@lib/speechManager';
import { EndStyles } from '@stylez';

type Step = 'wish' | 'note';

interface Props {
  characterSource: ImageSourcePropType;
  onDone: () => void;
}

const MAX_CHARS = 200;

const WISH_PROMPT = 'Tell me your wish...';
const NOTE_PROMPT = 'Leave a note for the world.';

export function WishInputComponent({ characterSource, onDone }: Props) {
  const [step, setStep] = useState<Step>('wish');
  const [wishText, setWishText] = useState('');
  const [noteText, setNoteText] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak('Your wish has been heard. Now tell me — what do you truly wish for?');
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === 'note') {
      setTimeout(() => {
        speak("Great. Now leave a note — something the universe should remember.");
        inputRef.current?.focus();
      }, 300);
    }
  }, [step]);

  function handleWishContinue() {
    const trimmed = wishText.trim();
    if (!trimmed) return;
    Storage.set('mywish', trimmed);
    stopSpeech();
    Keyboard.dismiss();
    setStep('note');
  }

  function handleNoteContinue() {
    const trimmed = noteText.trim();
    Storage.set('mynote', trimmed);
    Storage.set('iscompleted', '1');
    stopSpeech();
    Keyboard.dismiss();
    onDone();
  }

  function handleSkip() {
    Storage.set('iscompleted', '0');
    stopSpeech();
    Keyboard.dismiss();
    onDone();
  }

  const isWishStep = step === 'wish';
  const currentText = isWishStep ? wishText : noteText;
  const setCurrentText = isWishStep ? setWishText : setNoteText;
  const canContinue = isWishStep
    ? wishText.trim().length > 0
    : true;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={EndStyles.wishInputContainer}>
        <Image
          source={characterSource}
          style={EndStyles.wishCharacterImage}
          resizeMode="contain"
        />

        <Text style={EndStyles.wishPrompt}>
          {isWishStep ? WISH_PROMPT : NOTE_PROMPT}
        </Text>

        <Text style={EndStyles.wishSubPrompt}>
          {isWishStep
            ? 'Type your deepest wish. The universe is listening.'
            : 'Optional — a message to leave behind for the world.'}
        </Text>

        <View style={EndStyles.wishInputWrap}>
          <TextInput
            ref={inputRef}
            style={EndStyles.wishInput}
            value={currentText}
            onChangeText={(t) => setCurrentText(t.slice(0, MAX_CHARS))}
            placeholder={isWishStep ? 'I wish for...' : 'Write a note...'}
            placeholderTextColor="#4b5563"
            multiline
            returnKeyType="done"
            autoFocus={isWishStep}
          />
        </View>

        <Text style={EndStyles.wishCharCount}>
          {currentText.length} / {MAX_CHARS}
        </Text>

        <TouchableOpacity
          style={[
            EndStyles.wishBtnPrimary,
            !canContinue && { opacity: 0.5 },
          ]}
          onPress={isWishStep ? handleWishContinue : handleNoteContinue}
          disabled={!canContinue}
          activeOpacity={0.8}
        >
          <Text style={EndStyles.wishBtnPrimaryText}>
            {isWishStep ? 'Continue' : 'Done'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={EndStyles.wishBtnSkip}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={EndStyles.wishBtnSkipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
