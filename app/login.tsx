import { useRef, useEffect, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import {
  Eye,
  EyeOff,
  LogIn,
  User,
  Lock,
  FingerprintPattern,
  TriangleAlert,
} from 'lucide-react-native';
import { validatePassword } from '@lib/passValidator';
import { Storage } from '@lib/storage';
import { playChiSasur } from '@lib/audioManager';
import { Colors, Layout, Components, Typography } from '@stylez';

const NAME_MAX = 30;

function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 3 && trimmed.length <= NAME_MAX;
}

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [nameErrorVisible, setNameErrorVisible] = useState(false);
  const [passErrorVisible, setPassErrorVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.75)).current;
  const errorShakeAnim = useRef(new Animated.Value(0)).current;
  const passwordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 55,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const passValidation = validatePassword(password);
  const nameValid = isValidName(name);

  const showNameError = nameErrorVisible && !nameValid;
  const showPassError = passErrorVisible && !passValidation.success;

  function shakeError() {
    errorShakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(errorShakeAnim, { toValue: 10, duration: 55, useNativeDriver: true }),
      Animated.timing(errorShakeAnim, { toValue: -10, duration: 55, useNativeDriver: true }),
      Animated.timing(errorShakeAnim, { toValue: 7, duration: 55, useNativeDriver: true }),
      Animated.timing(errorShakeAnim, { toValue: -7, duration: 55, useNativeDriver: true }),
      Animated.timing(errorShakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }

  async function handleLogin() {
    if (!nameValid || !passValidation.success) {
      setNameErrorVisible(true);
      setPassErrorVisible(true);
      shakeError();
      await playChiSasur();
      return;
    }

    Storage.set('name', name.trim());
    router.replace('/home');
  }

  return (
    <KeyboardAvoidingView
      style={Layout.screenBase}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={Layout.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            Layout.centeredInner,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Animated.View
            style={[Components.logoWrap, { transform: [{ scale: logoScaleAnim }] }]}
          >
            <FingerprintPattern size={36} color={Colors.red.primary} strokeWidth={2} />
          </Animated.View>

          <Text style={Typography.appName}>Shout or Suffer</Text>
          <Text style={Typography.tagline}>
            Please enter the correct details; we will leak this on the Dark Web.
          </Text>

          <Animated.View
            style={[
              Components.card,
              { transform: [{ translateX: errorShakeAnim }] },
            ]}
          >
            <Text style={Typography.cardTitle}>Welcum💦</Text>
            <Text style={Typography.cardSub}>
              Enter your real name and the password to waste your time.
            </Text>

            <View style={Components.inputGroup}>
              <Text style={Typography.inputLabel}>Name (no joke enter real name)</Text>
              <View
                style={[
                  Components.inputWrap,
                  showNameError && Components.inputWrapError,
                ]}
              >
                <User
                  size={18}
                  color={showNameError ? Colors.red.primary : Colors.text.subtle}
                  strokeWidth={2}
                />
                <TextInput
                  style={Typography.inputText}
                  value={name}
                  onChangeText={(t) => {
                    if (t.length <= NAME_MAX) setName(t);
                  }}
                  placeholder="e.g. Rajnish Mehta"
                  placeholderTextColor={Colors.text.dimmer}
                  selectionColor={Colors.red.primary}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
                <Text style={Typography.charCount}>
                  {name.length}/{NAME_MAX}
                </Text>
              </View>
              {showNameError && (
                <View style={Components.errorRow}>
                  <TriangleAlert size={13} color={Colors.red.primary} strokeWidth={2} />
                  <Text style={Typography.errorText}>
                    {name.trim().length === 0
                      ? 'Name is required.'
                      : 'Name must be at least 3 characters.'}
                  </Text>
                </View>
              )}
            </View>

            <View style={Components.inputGroup}>
              <Text style={Typography.inputLabelRaw}>enter 'paSSword'</Text>
              <View
                style={[
                  Components.inputWrap,
                  showPassError && Components.inputWrapError,
                ]}
              >
                <Lock
                  size={18}
                  color={showPassError ? Colors.red.primary : Colors.text.subtle}
                  strokeWidth={2}
                />
                <TextInput
                  ref={passwordInputRef}
                  style={Typography.inputText}
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    setPassErrorVisible(false);
                  }}
                  placeholder="paSSword"
                  placeholderTextColor={Colors.text.dimmer}
                  secureTextEntry={!showPass}
                  selectionColor={Colors.red.primary}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  onPress={() => setShowPass((p) => !p)}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {showPass ? (
                    <EyeOff size={18} color={Colors.text.subtle} strokeWidth={2} />
                  ) : (
                    <Eye size={18} color={Colors.text.subtle} strokeWidth={2} />
                  )}
                </TouchableOpacity>
              </View>
              {showPassError && (
                <View style={Components.errorRow}>
                  <TriangleAlert size={13} color={Colors.red.primary} strokeWidth={2} />
                  <Text style={Typography.errorText}>
                    {passErrorVisible ? passValidation.msg : ''}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[
                Components.btn,
                nameValid && passValidation.success
                  ? Components.btnGreen
                  : Components.btnPrimary,
              ]}
              activeOpacity={0.85}
              onPress={handleLogin}
            >
              <LogIn size={18} color={Colors.text.white} strokeWidth={2.5} />
              <Text style={Typography.btnHeroText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={Typography.bottomNote}>
            Shout or Suffer © 1998 — All rights meaningless
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
