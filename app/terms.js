/** Terms & conditions — county-green-screen-42 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Share2 } from 'lucide-react-native';
import { useStore } from '../src/store';
import { app } from '../data';
import { colors, fonts, type } from '../src/theme';
import { ScreenHeader } from '../src/components/ui';

export default function Terms() {
  const insets = useSafeAreaInsets();
  const { terms } = useStore();

  const onShare = () =>
    Share.share({ message: `${app.name} — Terms & Conditions (last updated ${terms.lastUpdated})` }).catch(
      () => {}
    );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <ScreenHeader
        title="Terms & Conditions"
        bordered
        bubble={false}
        right={
          <Pressable onPress={onShare} hitSlop={10}>
            <Share2 size={19} color={colors.textStrong} strokeWidth={2} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 22, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[type.bodyMuted, { fontSize: 14, lineHeight: 21 }]}>{terms.intro}</Text>

        <Text style={s.updated}>LAST UPDATED · {terms.lastUpdated.toUpperCase()}</Text>

        {terms.sections.map((sec) => (
          <View key={sec.title} style={{ marginTop: 22 }}>
            <Text style={s.secTitle}>{sec.title}</Text>
            <Text style={[type.bodyMuted, { marginTop: 8, fontSize: 14, lineHeight: 21 }]}>{sec.body}</Text>
          </View>
        ))}

        <Text style={[type.small, { marginTop: 26, lineHeight: 18, fontSize: 12.5 }]}>{terms.footer}</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  secTitle: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 31, color: colors.textStrong },
  updated: {
    fontFamily: fonts.sansSemi,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.gold,
    marginTop: 22,
  },
});
