/** News detail — county-green-screen-39 */
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { images, app } from '../../data';
import { colors, fonts, radius, type } from '../../src/theme';
import { BellButton, EmptyState, ScreenHeader, Divider } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { news } = useStore();
  const n = news.find((x) => x.id === id);

  if (!n) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        <ScreenHeader title="Article" />
        <EmptyState title="Article not found" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
        <View style={s.hero}>
          <Image source={images[n.detailImage || n.image]} style={FILL} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(8,34,22,0.2)', 'rgba(8,34,22,0.0)', 'rgba(8,34,22,0.2)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={[s.heroInner, { paddingTop: insets.top + 8 }]}>
            <View style={s.heroTop}>
              <Pressable onPress={() => router.back()} style={s.backBtn} hitSlop={8}>
                <ArrowLeft size={20} color={colors.textStrong} strokeWidth={2} />
              </Pressable>
              <BellButton />
            </View>
            <View style={{ flex: 1 }} />
            <View style={s.tag}>
              <Text style={s.tagText}>{n.category.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={s.title}>{n.title}</Text>
          <Text style={[type.small, { marginTop: 10, fontSize: 13 }]}>
            {n.date}  •  {n.readTime}  •  {n.author}
          </Text>
          <Divider style={{ marginTop: 14, marginBottom: 20, backgroundColor: colors.border }} />

          {n.body.map((p, i) => (
            <Text key={i} style={s.para}>
              {p}
            </Text>
          ))}

          <View style={s.quote}>
            <Text style={s.quoteText}>{app.strapline}</Text>
            <Text style={s.quoteMeta}>
              {app.name.toUpperCase()} · {app.tagline.toUpperCase()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { height: 380, overflow: 'hidden' },
  heroInner: { flex: 1, paddingHorizontal: 16, paddingBottom: 22, paddingLeft: 20 },
  title: { fontFamily: fonts.serif, fontSize: 28, lineHeight: 37, color: colors.primary },
  para: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 25, color: colors.text, marginBottom: 16 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  tagText: { fontFamily: fonts.sansBold, fontSize: 10.5, letterSpacing: 0.4, color: colors.onDark },
  quote: { borderLeftWidth: 3, borderLeftColor: colors.gold, paddingLeft: 16, marginTop: 20 },
  quoteText: { fontFamily: fonts.serifItalic, fontSize: 18, color: colors.primary },
  quoteMeta: {
    fontFamily: fonts.sansSemi,
    fontSize: 10,
    letterSpacing: 0.7,
    color: colors.textMuted,
    marginTop: 6,
  },
});
