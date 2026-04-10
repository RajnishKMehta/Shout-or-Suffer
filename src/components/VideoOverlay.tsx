import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { playSuspiciousSfx, pausePlaying, resumePlaying, stopPlaying } from '@lib/audioManager';

type Props = {
  source: string | number;
  loop?: boolean;
  fullScreen?: boolean;
};

export function VideoOverlay({ source, loop = true, fullScreen = false }: Props) {
  const player = useVideoPlayer(source, (p) => {
    p.loop = loop;
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    playSuspiciousSfx(true);

    const sub = player.addListener('playingChange', ({ isPlaying }) => {
      if (isPlaying) {
        resumePlaying();
      } else {
        pausePlaying();
      }
    });

    return () => {
      sub.remove();
      stopPlaying();
    };
  }, [player]);

  return (
    <View
      style={[styles.overlay, fullScreen && styles.fullScreen]}
      pointerEvents="none"
    >
      <VideoView
        player={player}
        style={styles.video}
        nativeControls={false}
        contentFit="cover"
        surfaceType="textureView"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    opacity: 0.8,
    mixBlendMode: 'screen',
  },
  fullScreen: {
    bottom: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
