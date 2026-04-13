import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  Share,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Storage } from '@lib/storage';
import { fetchAndStoreRandomWish } from '@lib/fetchWish';
import { stopSpeech } from '@lib/speechManager';
import { WishInputComponent } from '@cmp/WishInputComponent';
import { EndStyles } from '@stylez';

const IMG_GINIE        = require('@img/in/ginie.png');
const IMG_BLUE_MERMAID = require('@img/in/blue_mermaid.png');
const IMG_RED_MERMAID  = require('@img/in/red_mermaid.png');

function getCharacterSource(ginie: number): ImageSourcePropType {
  if (ginie === 1) return IMG_GINIE;
  if (ginie === 2) return IMG_BLUE_MERMAID;
  return IMG_RED_MERMAID;
}

function formatTimestamp(ms: number): string {
  if (!ms || isNaN(ms)) return '';
  try {
    return new Date(ms).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function EndScreen() {
  const [ginie, setGinie]           = useState<number | null>(null);
  const [showInput, setShowInput]   = useState(false);
  const [notesReady, setNotesReady] = useState(false);
  const [rnote, setRnote]           = useState('');
  const [rnotefrom, setRnotefrom]   = useState('');
  const [rnoteat, setRnoteat]       = useState('');
  const [mynote, setMynote]         = useState('');

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('No going back now. 🌀', ToastAndroid.SHORT);
      }
      return true;
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    const released = Storage.getBoolean('isginiereleased');
    if (released !== true) {
      router.replace('/main');
      return;
    }

    const storedGinie = Storage.getNumber('ginie');
    if (storedGinie === undefined) {
      router.replace('/main');
      return;
    }

    setGinie(storedGinie);
    fetchAndStoreRandomWish();

    const completed = Storage.getBoolean('iscompleted');
    if (completed !== true) {
      setShowInput(true);
    } else {
      loadNotesAndShow();
    }
  }, []);

  function loadNotesAndShow() {
    setRnote(Storage.getString('rnote') ?? '');
    setRnotefrom(Storage.getString('rnotefrom') ?? '');
    setRnoteat(Storage.getString('rnoteat') ?? '');
    setMynote(Storage.getString('mynote') ?? '');
    setNotesReady(true);
  }

  const handleInputDone = useCallback(() => {
    setShowInput(false);
    loadNotesAndShow();
  }, []);

  async function handleShare() {
    try {
      const wish = Storage.getString('mywish') ?? '';
      const parts: string[] = [];
      if (wish) parts.push(`My wish: "${wish}"`);
      if (mynote) parts.push(`My note: "${mynote}"`);
      parts.push('Released with Scream2Wish — https://rajnishkmehta.github.io/Scream2Wish');
      await Share.share({ message: parts.join('\n\n') });
    } catch {
      // user cancelled or share unavailable
    }
  }

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  if (ginie === null) {
    return <View style={EndStyles.screen} />;
  }

  const characterSource = getCharacterSource(ginie);

  if (showInput) {
    return (
      <WishInputComponent
        characterSource={characterSource}
        onDone={handleInputDone}
      />
    );
  }

  if (!notesReady) {
    return <View style={EndStyles.screen} />;
  }

  const rnoteatMs = Number(rnoteat);
  const rnoteatFormatted = formatTimestamp(rnoteatMs);
  const completed = Storage.getBoolean('iscompleted');
  const userParticipated = completed === true;

  return (
    <ScrollView
      style={EndStyles.screen}
      contentContainerStyle={EndStyles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <Image
        source={characterSource}
        style={EndStyles.characterImage}
        resizeMode="contain"
      />

      {/* Random note from the universe */}
      {rnote ? (
        <View style={EndStyles.noteCard}>
          <Text style={EndStyles.noteSectionLabel}>A note from the universe</Text>
          <Text style={EndStyles.noteText}>{rnote}</Text>
          <View style={EndStyles.noteMetaRow}>
            {rnotefrom ? (
              <Text style={EndStyles.noteMetaText}>{rnotefrom}</Text>
            ) : null}
            {rnotefrom && rnoteatFormatted ? (
              <View style={EndStyles.noteDivider} />
            ) : null}
            {rnoteatFormatted ? (
              <Text style={EndStyles.noteMetaText}>{rnoteatFormatted}</Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {/* User's own note */}
      {userParticipated && mynote ? (
        <View style={EndStyles.noteCardHighlight}>
          <Text style={EndStyles.noteSectionLabel}>Your note</Text>
          <Text style={EndStyles.noteText}>{mynote}</Text>
        </View>
      ) : null}

      {/* Share */}
      {userParticipated ? (
        <TouchableOpacity
          style={EndStyles.shareBtn}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Text style={EndStyles.shareBtnText}>Share my wish</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}
