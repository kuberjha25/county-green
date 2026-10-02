/** Verification code — county-green-screen-03 */
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { app } from '../../data';
import { useStore } from '../../src/store';
import { colors, fonts, radius, type } from '../../src/theme';
import { ScreenHeader, PrimaryButton } from '../../src/components/ui';

export default function Otp() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session } = useStore();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const refs = useRef([]);

  const code = digits.join('');

  const setDigit = (i, v) => {
    const ch = v.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    setError('');
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  const onKey = (i, e) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const verify = () => {
    if (code === app.demoOtp) router.push('/(auth)/partner-type');
    else if (code.length < 6) setError('Enter the 6-digit code.');
    else setError(`Incorrect code. Use the demo code ${app.demoOtp}.`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Verify Identity" bubble={false} />
      <View style={s.body}>
        <Text style={[type.labelGold, { textTransform: 'uppercase' }]}>Secure Access</Text>
        <Text style={[type.display, { marginTop: 8, fontSize: 32, lineHeight: 40 }]}>Verification Code</Text>
        <Text style={[type.bodyMuted, { marginTop: 8, fontSize: 15 }]}>
          Please enter the 6-digit secure code sent to {session.mobile || '+91 98765 43210'}.
        </Text>

        <View style={s.boxes}>
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={(r) => (refs.current[i] = r)}
              value={d}
              onChangeText={(v) => setDigit(i, v)}
              onKeyPress={(e) => onKey(i, e)}
              keyboardType="number-pad"
              maxLength={1}
              style={[s.box, d && s.boxFilled, i === 0 && !code && s.boxActive]}
            />
          ))}
        </View>

        <Text style={[type.small, { marginTop: 18, fontSize: 12.5 }]}>
          The code expires in <Text style={s.strong}>5 minutes.</Text> Demo code:{' '}
          <Text style={[s.strong, { color: colors.primary }]}>{app.demoOtp}</Text>
        </Text>
        {error ? <Text style={[type.small, { color: colors.danger, marginTop: 8 }]}>{error}</Text> : null}

        <Pressable onPress={() => router.back()} hitSlop={8} style={{ marginTop: 14 }}>
          <Text style={s.changeLink}>Change mobile number</Text>
        </Pressable>
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 18 }]}>
        <PrimaryButton title="Verify & Proceed" onPress={verify} />
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 22 },
  boxes: { flexDirection: 'row', gap: 10, marginTop: 26, paddingHorizontal: 8 },
  box: {
    flex: 1,
    minWidth: 0,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    textAlign: 'center',
    fontFamily: fonts.sansSemi,
    fontSize: 20,
    color: colors.textStrong,
  },
  boxFilled: { borderColor: colors.primary, borderWidth: 2 },
  boxActive: { borderColor: colors.primary, borderWidth: 2 },
  strong: { fontFamily: fonts.sansSemi, color: colors.textStrong },
  changeLink: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  footer: { paddingHorizontal: 24, paddingTop: 12 },
});
