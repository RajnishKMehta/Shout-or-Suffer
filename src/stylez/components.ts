import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { Spacing, Radius } from './spacing';

export const Components = StyleSheet.create({
  iconCircleRed: {
    padding: Spacing.xl,
    borderRadius: 60,
    backgroundColor: Colors.bg.redTint,
    borderWidth: 1,
    borderColor: Colors.border.redMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleLarge: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.bg.redTint,
    borderWidth: 1.5,
    borderColor: Colors.border.redLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: Spacing.xxl,
    backgroundColor: Colors.bg.redTint,
    borderWidth: 1.5,
    borderColor: Colors.border.redFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    elevation: 8,
  },

  card: {
    width: '100%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border.neutral,
    padding: Spacing.xxl,
    marginBottom: Spacing.xxxl,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.neutral,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 14,
    marginBottom: 60,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.bg.warningBg,
    borderWidth: 1,
    borderColor: Colors.border.amberFaint,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    marginBottom: Spacing.xxxl,
    width: '100%',
  },

  inputGroup: {
    marginBottom: Spacing.xl,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.bg.base,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.neutral,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  inputWrapError: {
    borderColor: Colors.border.redStrong,
    backgroundColor: Colors.bg.errorInput,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
    paddingHorizontal: 2,
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
  },
  btnPrimary: {
    backgroundColor: Colors.red.primary,
  },
  btnGreen: {
    backgroundColor: Colors.green.primary,
    shadowColor: Colors.green.bright,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  btnSecondary: {
    backgroundColor: Colors.bg.surface,
    borderWidth: 1,
    borderColor: Colors.border.neutral,
  },
  btnDisabled: {
    opacity: 0.6,
  },

  permList: {
    width: '100%',
    marginBottom: Spacing.xxxl,
  },
  permRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Radius.lg,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: Spacing.sm,
    borderWidth: 1,
  },
  permRowMissing: {
    backgroundColor: Colors.bg.errorInput,
    borderColor: Colors.border.redFaint,
  },
  permRowGranted: {
    backgroundColor: Colors.bg.grantedRow,
    borderColor: Colors.border.greenFaint,
  },
  permIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permTextWrap: {
    flex: 1,
  },
  permBadge: {
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },

  actions: {
    width: '100%',
    gap: Radius.lg,
    marginBottom: Spacing.xxxl,
  },
  lockedNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
