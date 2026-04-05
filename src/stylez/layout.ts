import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { Spacing } from './spacing';

export const Layout = StyleSheet.create({
  screenBase: {
    flex: 1,
    backgroundColor: Colors.bg.base,
  },
  screenCentered: {
    flex: 1,
    backgroundColor: Colors.bg.base,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.huge,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.screen,
    paddingVertical: 60,
  },
  scrollContentTop: {
    flexGrow: 1,
    paddingHorizontal: Spacing.screen,
    paddingTop: 80,
    paddingBottom: Spacing.giant,
    alignItems: 'center',
  },
  centeredInner: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});
