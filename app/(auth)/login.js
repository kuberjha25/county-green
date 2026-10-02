/** Login / register — county-green-screen-02 */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowRight, Check, ChevronDown, Instagram, Facebook, Youtube } from 'lucide-react-native';
import { images, app } from '../../data';
import { useStore } from '../../src/store';
import { colors, fonts, radius, type } from '../../src/theme';
import { PrimaryButton } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useStore();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const valid = mobile.replace(/\D/g, '').length === 10;

  const onContinue = () => {
    if (!valid) {
      setError('Enter a 10-digit mobile number to continue');
      return;
    }
    signIn(`+91 ${mobile}`);
    router.push('/(auth)/otp');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* hero banner */}
        <View style={s.hero}>
          <Image source={images.heroEntrance} style={FILL} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(10,40,26,0.45)', 'rgba(8,34,22,0.35)', 'rgba(7,30,20,0.75)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={[s.heroInner, { paddingTop: insets.top + 36 }]}>
            <Image source={images.logoLockup} style={s.heroLogo} resizeMode="contain" />
            <View style={{ flex: 1 }} />
            <Text style={s.heroTitle}>{app.strapline}</Text>
            <Text style={s.heroSub}>{app.subStrapline.toUpperCase()}</Text>
          </View>
        </View>

        {/* form */}
        <View style={s.body}>
          <Text style={[type.labelGold, { textTransform: 'uppercase' }]}>Login or Register</Text>
          <Text style={[type.display, { marginTop: 8, fontSize: 36, lineHeight: 44 }]}>Welcome</Text>
          <Text style={[type.bodyMuted, { marginTop: 8, fontSize: 15, lineHeight: 22 }]}>
            Enter your mobile number to login or register as a County Green channel partner.
          </Text>

          <Text style={[type.label, { textTransform: 'uppercase', marginTop: 28, marginBottom: 8 }]}>
            Mobile Number
          </Text>
          <View style={s.row}>
            <Pressable style={s.country}>
              <Text style={[type.value, { fontSize: 16 }]}>+91</Text>
              <ChevronDown size={14} color={colors.textMuted} strokeWidth={2} />
            </Pressable>
            <View style={s.numberField}>
              <TextInput
                value={mobile}
                onChangeText={(t) => setMobile(t.replace(/\D/g, '').slice(0, 10))}
                onFocus={() => setError('')}
                placeholder="Enter mobile number"
                placeholderTextColor={colors.textFaint}
                keyboardType="number-pad"
                style={s.numberInput}
              />
            </View>
          </View>

          <View style={s.hint}>
            <View style={s.hintCircle}>
              <Check size={10} color={colors.onDark} strokeWidth={3} />
            </View>
            <Text style={[type.small, { flex: 1 }]}>
              We’ll send a one-time verification code by SMS.
            </Text>
          </View>

          {error ? <Text style={[type.small, { color: colors.danger, marginTop: 8 }]}>{error}</Text> : null}

          <PrimaryButton title="CONTINUE →" onPress={onContinue} style={{ marginTop: 24 }} />

          <Text style={[type.small, s.legal]}>
            By continuing, you agree to our{' '}
            <Text style={s.legalLink} onPress={() => router.push('/terms')}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={s.legalLink} onPress={() => router.push('/terms')}>
              Privacy Policy
            </Text>
            .
          </Text>

          <View style={s.social}>
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <View key={i} style={s.socialBtn}>
                <Icon size={17} color={colors.textStrong} strokeWidth={1.8} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  hero: { height: 360, width: '100%', overflow: 'hidden' },
  heroInner: { flex: 1, paddingHorizontal: 24, paddingBottom: 24 },
  heroLogo: { width: 122, height: 105, marginLeft: -4 },
  heroTitle: {
    fontFamily: fonts.serifItalic,
    fontSize: 26,
    lineHeight: 36,
    color: colors.onDark,
  },
  heroSub: {
    fontFamily: fonts.sansBold,
    fontSize: 9.5,
    letterSpacing: 0.6,
    color: colors.gold,
    marginTop: 6,
  },
  body: { paddingHorizontal: 24, paddingTop: 24 },
  row: { flexDirection: 'row', gap: 10 },
  country: {
    width: 80,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  numberField: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  numberInput: { fontFamily: fonts.sans, fontSize: 15, color: colors.textStrong, padding: 0 },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  hintCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legal: { textAlign: 'center', marginTop: 18, fontSize: 11.5, lineHeight: 19 },
  legalLink: { fontFamily: fonts.sansSemi, color: colors.text, textDecorationLine: 'underline' },
  social: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 20 },
  socialBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
