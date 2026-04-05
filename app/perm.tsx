import { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ToastAndroid,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ShieldX,
  TriangleAlert,
  Settings,
  Lock,
  Mic,
  Zap,
  ArrowRight,
  ShieldCheck,
  Vibrate,
} from 'lucide-react-native';
import {
  REQUIRED_PERMISSIONS,
  getMissingRequiredPermissions,
  requestRequiredPermissions,
  areRequiredPermissionsGranted,
  openAppSettings,
  type PermissionStatuses,
} from '@lib/permissionManager';
import { Colors, Layout, Components, Typography } from '@stylez';

const PERM_ICON_MAP: Record<string, React.ElementType> = {
  Mic,
  Zap,
  Vibrate,
};

function PermIcon({ name, size, color }: { name: string; size: number; color: string }) {
  const Icon = PERM_ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} color={color} strokeWidth={1.8} />;
}

export default function NoPermScreen() {
  const params = useLocalSearchParams<{ statuses: string }>();
  const [statuses, setStatuses] = useState<PermissionStatuses>(
    params.statuses ? JSON.parse(params.statuses) : {},
  );
  const [requesting, setRequesting] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backPressCount = useRef(0);

  const missing = getMissingRequiredPermissions(statuses);
  const allGranted = areRequiredPermissionsGranted(statuses);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      backPressCount.current += 1;
      triggerShake();

      if (Platform.OS === 'android') {
        if (backPressCount.current >= 3) {
          ToastAndroid.show('Grant the permissions first 😈', ToastAndroid.SHORT);
          backPressCount.current = 0;
        } else {
          ToastAndroid.show(
            'You cannot escape without granting permissions 🔒',
            ToastAndroid.SHORT,
          );
        }
      }
      return true;
    });

    return () => sub.remove();
  }, []);

  function triggerShake() {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  }

  async function handleGrantPermissions() {
    setRequesting(true);
    const newStatuses = await requestRequiredPermissions();
    setStatuses(newStatuses);
    setRequesting(false);

    if (!areRequiredPermissionsGranted(newStatuses)) {
      triggerShake();
    }
  }

  function handleContinue() {
    router.replace('/login');
  }

  return (
    <Animated.View style={[Layout.screenBase, { opacity: fadeAnim }]}>
      <ScrollView
        contentContainerStyle={Layout.scrollContentTop}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            Layout.centeredInner,
            { marginBottom: 28, transform: [{ translateX: shakeAnim }] },
          ]}
        >
          <View style={Components.iconCircleLarge}>
            <Lock size={52} color={Colors.red.primary} strokeWidth={1.5} />
          </View>
          <Text style={Typography.heroTitle}>You're trapped 🪤</Text>
          <Text style={Typography.subtitle}>
            This app will only open once you{'\n'}grant the required permissions
          </Text>
        </Animated.View>

        {missing.length > 0 && (
          <View style={Components.warningBanner}>
            <TriangleAlert size={16} color={Colors.amber.primary} strokeWidth={2} />
            <Text style={Typography.warningText}>
              {missing.length} required permission{missing.length !== 1 ? 's' : ''} missing
            </Text>
          </View>
        )}

        <View style={Components.permList}>
          <Text style={Typography.sectionLabel}>Required Permissions</Text>
          {REQUIRED_PERMISSIONS.map((perm) => {
            const isMissing = statuses[perm.id] !== 'granted';
            return (
              <View
                key={perm.id}
                style={[
                  Components.permRow,
                  isMissing ? Components.permRowMissing : Components.permRowGranted,
                ]}
              >
                <View style={Components.permIconWrap}>
                  <PermIcon
                    name={perm.icon}
                    size={20}
                    color={isMissing ? Colors.red.primary : Colors.green.bright}
                  />
                </View>
                <View style={Components.permTextWrap}>
                  <Text
                    style={[
                      Typography.permLabel,
                      { color: isMissing ? Colors.red.label : Colors.green.label },
                    ]}
                  >
                    {perm.label}
                  </Text>
                  <Text style={Typography.permDesc}>{perm.description}</Text>
                </View>
                <View
                  style={[
                    Components.permBadge,
                    { backgroundColor: isMissing ? Colors.red.badge : Colors.green.badge },
                  ]}
                >
                  <Text
                    style={[
                      Typography.permBadgeText,
                      { color: isMissing ? Colors.red.primary : Colors.green.bright },
                    ]}
                  >
                    {isMissing ? 'MISSING' : 'GRANTED'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={Components.actions}>
          {allGranted ? (
            <TouchableOpacity
              style={[Components.btn, Components.btnGreen]}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <ShieldCheck size={18} color={Colors.text.white} strokeWidth={2} />
              <Text style={[Typography.btnHeroText, { flex: 1, textAlign: 'center' }]}>
                Continue
              </Text>
              <ArrowRight size={18} color={Colors.text.white} strokeWidth={2.5} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                Components.btn,
                Components.btnPrimary,
                requesting && Components.btnDisabled,
              ]}
              onPress={handleGrantPermissions}
              disabled={requesting}
              activeOpacity={0.8}
            >
              <ShieldX size={18} color={Colors.text.white} strokeWidth={2} />
              <Text style={Typography.btnPrimaryText}>
                {requesting ? 'Requesting...' : 'Grant Required Permissions'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[Components.btn, Components.btnSecondary]}
            onPress={openAppSettings}
            activeOpacity={0.8}
          >
            <Settings size={18} color={Colors.text.muted} strokeWidth={2} />
            <Text style={Typography.btnSecondaryText}>Open Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={Components.lockedNote}>
          <ShieldX size={14} color={Colors.text.ghost} strokeWidth={2} />
          <Text style={Typography.lockedNoteText}>
            Back button is defected. Grant permissions from Settings.
          </Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
