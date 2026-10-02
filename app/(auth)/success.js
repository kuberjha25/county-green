/** Thank you for sign up — county-green-screen-08 */
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCheck, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { images, app } from '../../data';
import { useStore } from '../../src/store';
import { colors, fonts } from '../../src/theme';

export default function Success() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session, profile } = useStore();
  const name = session.onboarding.firstName || profile.name.split(' ')[0];

  return (
    <View style={[s.root, { paddingTop: insets.top + 34, paddingBottom: insets.bottom + 18 }]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0D4731', '#0F4A33', '#0A3B27']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Image source={images.logoLockup} style={s.logo} resizeMode="contain" />

      <View style={s.ringOuter}>
        <View style={s.ringMid}>
          <View style={s.ringInner}>
            <CheckCheck size={30} color={colors.onDark} strokeWidth={2} />
          </View>
        </View>
      </View>

      <Text style={s.title}>Thank You</Text>
      <Text style={s.subtitle}>for Sign Up</Text>
      <View style={s.rule} />

      <Text style={s.created}>Your Account has been Created</Text>
      <Text style={s.welcome}>Welcome to County Green Family, {name}</Text>

      <View style={{ flex: 1 }} />

      <Pressable style={s.cta} onPress={() => router.replace('/(tabs)')}>
        <Text style={s.ctaText}>LET’S GET STARTED</Text>
        <ArrowRight size={16} color={colors.onDark} strokeWidth={2.4} />
      </Pressable>

      <Text style={s.strapline}>{app.strapline.toUpperCase()}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primaryRich, alignItems: 'center', paddingHorizontal: 32 },
  logo: { width: 120, height: 103 },
  ringOuter: {
    width: 148,
    height: 148,
    borderRadius: 74,
    borderWidth: 1,
    borderColor: 'rgba(196,154,69,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 54,
  },
  ringMid: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(196,154,69,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: fonts.serif, fontSize: 40, lineHeight: 50, color: colors.onDark, marginTop: 38 },
  subtitle: { fontFamily: fonts.serifItalic, fontSize: 26, lineHeight: 34, color: colors.gold, marginTop: 6 },
  rule: { width: 48, height: 1.5, backgroundColor: colors.gold, marginTop: 14 },
  created: {
    fontFamily: fonts.sansSemi,
    fontSize: 15.5,
    color: colors.onDark,
    marginTop: 20,
    textAlign: 'center',
  },
  welcome: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.onDarkMuted,
    marginTop: 10,
    textAlign: 'center',
  },
  cta: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gold,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  ctaText: { fontFamily: fonts.sansBold, fontSize: 14, letterSpacing: 2, color: colors.onDark },
  strapline: {
    fontFamily: fonts.sansMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(196,154,69,0.75)',
    marginTop: 26,
  },
});
