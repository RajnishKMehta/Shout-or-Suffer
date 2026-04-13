import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { Spacing, Radius } from './spacing';
import { FontSize, FontWeight } from './typography';

export const EndStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg.base,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.screen,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
  },

  characterImage: {
    width: 200,
    height: 200,
    marginBottom: Spacing.xxl,
  },

  noteCard: {
    width: '100%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border.neutral,
    padding: Spacing.xxl,
    marginBottom: Spacing.xl,
  },

  noteCardHighlight: {
    width: '100%',
    backgroundColor: Colors.bg.redTint,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border.redLight,
    padding: Spacing.xxl,
    marginBottom: Spacing.xl,
  },

  noteSectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text.dimmer,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },

  noteText: {
    fontSize: FontSize.body,
    color: Colors.text.white,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },

  noteMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 2,
  },

  noteMetaText: {
    fontSize: FontSize.xs,
    color: Colors.text.subtle,
  },

  noteDivider: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: Colors.text.ghost,
  },

  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border.neutral,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    width: '100%',
    marginTop: Spacing.sm,
  },

  shareBtnText: {
    fontSize: FontSize.btn,
    fontWeight: FontWeight.semibold,
    color: Colors.text.muted,
  },

  wishInputContainer: {
    flex: 1,
    backgroundColor: Colors.bg.base,
    paddingHorizontal: Spacing.screen,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wishCharacterImage: {
    width: 160,
    height: 160,
    marginBottom: Spacing.xxl,
  },

  wishPrompt: {
    fontSize: FontSize.heading3,
    fontWeight: FontWeight.bold,
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 30,
  },

  wishSubPrompt: {
    fontSize: FontSize.body,
    color: Colors.text.subtle,
    textAlign: 'center',
    marginBottom: Spacing.xxxl,
    lineHeight: 20,
  },

  wishInputWrap: {
    width: '100%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border.neutral,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.sm,
    minHeight: 90,
  },

  wishInputWrapError: {
    borderColor: Colors.border.redStrong,
    backgroundColor: Colors.bg.errorInput,
  },

  wishErrorText: {
    fontSize: FontSize.xs,
    color: Colors.red.primary,
    fontWeight: FontWeight.semibold,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },

  wishInput: {
    color: Colors.text.white,
    fontSize: FontSize.input,
    lineHeight: 22,
  },

  wishCharCount: {
    fontSize: FontSize.xs,
    color: Colors.text.ghost,
    fontWeight: FontWeight.medium,
    alignSelf: 'flex-end',
    marginBottom: Spacing.xxxl,
  },

  wishBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.red.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    width: '100%',
    marginBottom: Spacing.md,
  },

  wishBtnPrimaryText: {
    color: Colors.text.white,
    fontSize: FontSize.btn,
    fontWeight: FontWeight.bold,
  },

  wishBtnSkip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'transparent',
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    width: '100%',
  },

  wishBtnSkipText: {
    color: Colors.text.subtle,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
  },
});
