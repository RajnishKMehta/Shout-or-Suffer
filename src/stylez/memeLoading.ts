import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const MemeLoadingStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '88%',
    alignItems: 'center',
    gap: 20,
  },
  skull: {
    fontSize: 64,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.red.primary,
    letterSpacing: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ff4444',
    letterSpacing: 2,
    textAlign: 'center',
  },
  terminalBox: {
    width: '100%',
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    gap: 10,
  },
  terminalHeader: {
    fontSize: 11,
    color: '#555',
    fontFamily: 'monospace',
  },
  terminalMsg: {
    fontSize: 15,
    color: '#00ff41',
    fontFamily: 'monospace',
    fontWeight: '600',
    minHeight: 24,
  },
  progressContainer: {
    width: '100%',
    gap: 8,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.red.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
    fontFamily: 'monospace',
  },
  warningText: {
    fontSize: 13,
    color: '#ff4444',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
