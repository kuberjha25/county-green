/** About us — county-green-about-screen */
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Share2 } from 'lucide-react-native';
import { useStore } from '../src/store';
import { images, app } from '../data';
import { colors, fonts, radius } from '../src/theme';
import { ScreenHeader } from '../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };
const OLIVE = '#4A4B2E';

export default function About() {
  const insets = useSafeAreaInsets();
  const { about } = useStore();

  const onShare = () =>
    Share.share({ message: `${app.name} — ${app.strapline}. ${about.philosophy}` }).catch(() => {});

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <ScreenHeader
        title="About Us"
        bordered
        bubble={false}
        right={
          <Pressable onPress={onShare} hitSlop={10}>
            <Share2 size={19} color={colors.textStrong} strokeWidth={2} />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        {/* logo block — swap for the dark logo lockup PNG once supplied */}
        <View style={s.logoBlock}>
          {images.logoLockupDark ? (
            <Image source={images.logoLockupDark} style={{ width: 140, height: 120 }} resizeMode="contain" />
          ) : (
            <>
              <Image source={images.logoMark} style={{ width: 44, height: 43 }} resizeMode="contain" />
              <Text style={s.wordmark}>COUNTY{'\n'}GREEN</Text>
              <Text style={s.wordmarkSub}>{app.tagline.toUpperCase()}</Text>
            </>
          )}
        </View>

        <Text style={s.eyebrow}>{about.eyebrow.toUpperCase()}</Text>
        <Text style={s.title}>{about.title}</Text>
        <Text style={s.subtitle}>{about.subtitle.toUpperCase()}</Text>

        {/* hero */}
        <View style={s.hero}>
          <Image source={images[about.heroImage]} style={FILL} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(8,34,22,0)', 'rgba(8,34,22,0.15)', 'rgba(7,28,19,0.75)']}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={s.heroBody}>
            <Text style={s.heroCaption}>{about.heroCaption}</Text>
          </View>
        </View>

        {/* philosophy */}
        <View style={{ paddingHorizontal: 24, marginTop: 26 }}>
          <Text style={s.philTitle}>{about.philosophyTitle}</Text>
          <Text style={s.philBody}>{about.philosophy}</Text>
        </View>

        {/* stats */}
        <View style={s.statRow}>
          {about.stats.map((st, i) => (
            <View key={st.label} style={s.statCard}>
              <Text style={[s.statValue, { color: i === 0 ? colors.gold : colors.primary }]}>{st.value}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  logoBlock: { alignItems: 'center', marginTop: 26 },
  wordmark: {
    fontFamily: fonts.serif,
    fontSize: 30,
    lineHeight: 30,
    letterSpacing: 0.5,
    color: OLIVE,
    marginTop: 4,
    textAlign: 'center',
  },
  wordmarkSub: {
    fontFamily: fonts.serif,
    fontSize: 9.5,
    letterSpacing: 0.8,
    color: OLIVE,
    marginTop: 4,
  },
  eyebrow: {
    fontFamily: fonts.sansSemi,
    fontSize: 12,
    letterSpacing: 1.6,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 26,
  },
  title: {
    fontFamily: fonts.serifItalic,
    fontSize: 30,
    lineHeight: 40,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontFamily: fonts.sansBold,
    fontSize: 10.5,
    letterSpacing: 1.1,
    color: colors.gold,
    textAlign: 'center',
    marginTop: 8,
  },
  hero: {
    height: 292,
    marginHorizontal: 24,
    marginTop: 22,
    borderRadius: 24,
    overflow: 'hidden',
  },
  heroBody: { flex: 1, justifyContent: 'flex-end', padding: 24 },
  heroCaption: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 31, color: colors.onDark },
  philTitle: { fontFamily: fonts.serif, fontSize: 21, lineHeight: 28, color: colors.textStrong },
  philBody: { fontFamily: fonts.sans, fontSize: 14.5, lineHeight: 22, color: colors.textMuted, marginTop: 10 },
  statRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 24, marginTop: 20 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statValue: { fontFamily: fonts.sansSemi, fontSize: 20 },
  statLabel: { fontFamily: fonts.sans, fontSize: 12.5, color: colors.textMuted, marginTop: 4 },
});
