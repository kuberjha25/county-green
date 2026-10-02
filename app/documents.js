/** Documents — county-green-screen-37 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText, ArrowDown } from 'lucide-react-native';
import { useStore } from '../src/store';
import { documentCategories } from '../data';
import { colors, fonts, radius, shadow, type } from '../src/theme';
import { FilterChips, Badge, EmptyState } from '../src/components/ui';

const TAG_TONE = {
  Marketing: 'gold',
  Technical: 'gold',
  Pricing: 'gold',
  Planning: 'approved',
  Finance: 'sand',
  Legal: 'approved',
};

export default function Documents() {
  const insets = useSafeAreaInsets();
  const { documents } = useStore();
  const [cat, setCat] = useState('All');

  const data = cat === 'All' ? documents : documents.filter((d) => d.category === cat);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
        <Text style={s.title}>Documents</Text>
        <Text style={[type.bodyMuted, { marginTop: 2, fontSize: 14 }]}>
          Download project guidelines and partner kits.
        </Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <FilterChips options={documentCategories} value={cat} onChange={setCat} style={{ paddingLeft: 24 }} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(d) => d.id}
        contentContainerStyle={{ padding: 24, paddingTop: 20, gap: 14, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState title="No documents in this category" />}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.icon}>
              <FileText size={18} color={colors.primary} strokeWidth={2} />
              <Text style={s.iconText}>{item.type}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.docTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={s.docMeta}>
                {item.size} · Updated {item.updated}
              </Text>
              <Badge
                label={item.tag}
                tone={TAG_TONE[item.tag] || 'neutral'}
                style={{ marginTop: 5, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}
                textStyle={{ fontSize: 10.5 }}
              />
            </View>
            <Pressable
              onPress={() =>
                Alert.alert('Download', `“${item.title}” would download here once the file store is connected.`)
              }
              style={s.dlBtn}
            >
              <ArrowDown size={18} color={colors.onDark} strokeWidth={2.2} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontFamily: fonts.serif, fontSize: 32, lineHeight: 40, color: colors.primary },
  docTitle: { fontFamily: fonts.sansBold, fontSize: 15, lineHeight: 20, color: colors.textStrong },
  docMeta: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E8EEEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontFamily: fonts.sansBold, fontSize: 7.5, color: colors.primary, marginTop: 1 },
  dlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
