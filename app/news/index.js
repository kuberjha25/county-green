/** News list — county-green-screen-38 */
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../../src/store';
import { images, newsCategories } from '../../data';
import { colors, fonts, radius, type } from '../../src/theme';
import { BrandHeader, FilterChips, EmptyState } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

export default function News() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { news } = useStore();
  const [cat, setCat] = useState('All');

  const data = cat === 'All' ? news : news.filter((n) => n.category === cat);
  const featured = data.find((n) => n.featured) || data[0];
  const rest = data.filter((n) => n.id !== featured?.id);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <BrandHeader />

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 24, marginTop: 4 }}>
          <Text style={s.title}>Latest from County Green</Text>
          <Text style={[type.bodyMuted, { marginTop: 4, fontSize: 14, lineHeight: 19 }]}>
            Project updates, announcements, events and marketing.
          </Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <FilterChips options={newsCategories} value={cat} onChange={setCat} style={{ paddingLeft: 24 }} />
        </View>

        {!featured ? (
          <EmptyState title="Nothing here yet" body="Try another category." />
        ) : (
          <>
            {/* featured */}
            <Pressable onPress={() => router.push(`/news/${featured.id}`)} style={s.featured}>
              <Image source={images[featured.image]} style={FILL} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(7,28,19,0.55)', 'rgba(8,34,22,0.15)', 'rgba(7,28,19,0.55)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={s.featuredBody}>
                <View style={s.tagLight}>
                  <Text style={s.tagLightText}>{featured.category}</Text>
                </View>
                <Text style={s.featuredTitle}>{featured.title}</Text>
                <Text style={s.featuredMeta}>
                  {featured.date} · {featured.readTime}
                </Text>
              </View>
            </Pressable>

            {/* grid */}
            <View style={s.grid}>
              {rest.map((n) => (
                <Pressable key={n.id} onPress={() => router.push(`/news/${n.id}`)} style={s.tile}>
                  <Image source={images[n.image]} style={FILL} resizeMode="cover" />
                  <LinearGradient
                    colors={['rgba(8,34,22,0.05)', 'rgba(8,34,22,0.25)', 'rgba(7,28,19,0.85)']}
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={s.tileBody}>
                    <View style={s.tagDark}>
                      <Text style={s.tagDarkText}>{n.category}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Text style={s.tileTitle} numberOfLines={3}>
                      {n.title}
                    </Text>
                    <Text style={s.tileDate}>{n.date}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontFamily: fonts.serifBold, fontSize: 24, lineHeight: 31, color: colors.primary },
  featured: {
    height: 240,
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  featuredBody: { flex: 1, padding: 20 },
  tagLight: {
    alignSelf: 'flex-start',
    backgroundColor: colors.goldTint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagLightText: { fontFamily: fonts.sansSemi, fontSize: 11, color: colors.gold },
  featuredTitle: { fontFamily: fonts.serifSemi, fontSize: 21, lineHeight: 27, color: colors.onDark, marginTop: 8 },
  featuredMeta: { fontFamily: fonts.sans, fontSize: 12.5, color: colors.onDarkMuted, marginTop: 6 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  tile: {
    flexBasis: '46%',
    flexGrow: 1,
    height: 190,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tileBody: { flex: 1, padding: 12, paddingBottom: 14 },
  tagDark: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(90,90,90,0.55)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  tagDarkText: { fontFamily: fonts.sansSemi, fontSize: 10.5, color: colors.onDark },
  tileTitle: { fontFamily: fonts.serifBold, fontSize: 15, lineHeight: 20, color: colors.onDark },
  tileDate: { fontFamily: fonts.sans, fontSize: 12, color: colors.onDarkMuted, marginTop: 4 },
});
