import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const FontSize = {
  xs: 10,
  sm: 11,
  md: 12,
  base: 13,
  body: 14,
  input: 15,
  btn: 16,
  heading3: 22,
  heading2: 24,
  heading1: 26,
  hero: 28,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Typography = StyleSheet.create({
  heroTitle: {
    fontSize: FontSize.hero,
    fontWeight: FontWeight.extrabold,
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: FontSize.heading1,
    fontWeight: FontWeight.bold,
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  appName: {
    fontSize: FontSize.heading2,
    fontWeight: FontWeight.extrabold,
    color: Colors.text.white,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  cardTitle: {
    fontSize: FontSize.heading3,
    fontWeight: FontWeight.extrabold,
    color: Colors.text.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FontSize.body,
    color: Colors.text.subtle,
    textAlign: 'center',
    lineHeight: 22,
  },
  tagline: {
    fontSize: FontSize.base,
    color: Colors.text.subtle,
    marginBottom: 36,
    textAlign: 'center',
  },
  cardSub: {
    fontSize: FontSize.base,
    color: Colors.text.subtle,
    marginBottom: 24,
    lineHeight: 19,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  inputLabelRaw: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text.muted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionLabel: {
    color: Colors.text.dimmer,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  inputText: {
    flex: 1,
    color: Colors.text.white,
    fontSize: FontSize.input,
    padding: 0,
  },
  errorText: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.red.primary,
    lineHeight: 18,
  },
  btnPrimaryText: {
    color: Colors.text.white,
    fontSize: FontSize.input,
    fontWeight: FontWeight.bold,
  },
  btnHeroText: {
    color: Colors.text.white,
    fontSize: FontSize.btn,
    fontWeight: FontWeight.extrabold,
    letterSpacing: 0.3,
  },
  btnSecondaryText: {
    color: Colors.text.muted,
    fontSize: FontSize.input,
    fontWeight: FontWeight.semibold,
  },
  charCount: {
    fontSize: FontSize.sm,
    color: Colors.text.ghost,
    fontWeight: FontWeight.medium,
  },
  phaseText: {
    color: Colors.text.muted,
    fontSize: FontSize.base,
  },
  warningText: {
    color: Colors.amber.primary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
  },
  permLabel: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  permDesc: {
    fontSize: FontSize.md,
    color: Colors.text.dimmer,
  },
  permBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    color: Colors.text.ghost,
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomNote: {
    color: Colors.text.ghost,
    fontSize: FontSize.md,
    textAlign: 'center',
  },
  lockedNoteText: {
    color: Colors.text.ghost,
    fontSize: FontSize.md,
  },
});
