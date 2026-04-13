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

export function WishInputComponent({ characterSource, onDone }: Props) {
  const [step, setStep] = useState<Step>('wish');
  const [wishText, setWishText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showWishError, setShowWishError] = useState(false);
  const [showNoteError, setShowNoteError] = useState(false);
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
        speak(
          "Great. Now leave a note — a message the universe will remember. This will be shared with random people around the world.",
        );
        inputRef.current?.focus();
      }, 300);
    }
  }, [step]);

  function handleWishContinue() {
    if (!wishText.trim()) {
      setShowWishError(true);
      return;
    }
    Storage.set('mywish', wishText.trim());
    stopSpeech();
    Keyboard.dismiss();
    setStep('note');
  }

  function handleNoteContinue() {
    if (!noteText.trim()) {
      setShowNoteError(true);
      return;
    }
    Storage.set('mynote', noteText.trim());
    Storage.set('iscompleted', true);
    stopSpeech();
    Keyboard.dismiss();
    onDone();
  }

  function handleSkip() {
    Storage.set('iscompleted', false);
    stopSpeech();
    Keyboard.dismiss();
    onDone();
  }

  const isWishStep = step === 'wish';
  const currentText = isWishStep ? wishText : noteText;
  const showError = isWishStep ? showWishError : showNoteError;

  function handleTextChange(t: string) {
    const sliced = t.slice(0, MAX_CHARS);
    if (isWishStep) {
      setWishText(sliced);
      if (showWishError && sliced.trim()) setShowWishError(false);
    } else {
      setNoteText(sliced);
      if (showNoteError && sliced.trim()) setShowNoteError(false);
    }
  }

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
          {isWishStep ? 'What is your wish?' : 'Leave a note for the world.'}
        </Text>

        <Text style={EndStyles.wishSubPrompt}>
          {isWishStep
            ? 'Your wish will be published publicly and shared on the Scream2Wish board for everyone to see.'
            : 'A random stranger will receive this note. Make it count.'}
        </Text>

        <View
          style={[
            EndStyles.wishInputWrap,
            showError && EndStyles.wishInputWrapError,
          ]}
        >
          <TextInput
            ref={inputRef}
            style={EndStyles.wishInput}
            value={currentText}
            onChangeText={handleTextChange}
            placeholder={isWishStep ? 'I wish for...' : 'Write something real...'}
            placeholderTextColor="#4b5563"
            multiline
            returnKeyType="done"
            autoFocus={isWishStep}
          />
        </View>

        {showError && (
          <Text style={EndStyles.wishErrorText}>
            {isWishStep ? 'Your wish cannot be empty.' : 'Please write a note.'}
          </Text>
        )}

        <Text style={EndStyles.wishCharCount}>
          {currentText.length} / {MAX_CHARS}
        </Text>

        <TouchableOpacity
          style={EndStyles.wishBtnPrimary}
          onPress={isWishStep ? handleWishContinue : handleNoteContinue}
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
          <Text style={EndStyles.wishBtnSkipText}>Skip everything</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
