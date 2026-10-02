/** Project visits — county-green-screen-23 */
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Clock } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { colors, fonts, radius, shadow, type } from '../../src/theme';
import { BrandHeader, FilterChips, Badge, EmptyState } from '../../src/components/ui';

const DATE_TONE = {
  Attended: { bg: '#E3EAE5', fg: colors.primary },
  'In Progress': { bg: colors.goldTint, fg: colors.gold },
  New: { bg: '#E3EAE5', fg: colors.primary },
};

export default function Visits() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { visits } = useStore();
  const [filter, setFilter] = useState('All');

  const counts = useMemo(
    () => ({
      All: visits.length,
      Attended: visits.filter((v) => v.status === 'Attended').length,
      'In Progress': visits.filter((v) => v.status === 'In Progress').length,
      New: visits.filter((v) => v.status === 'New').length,
    }),
    [visits]
  );

  const options = ['All', 'Attended', 'In Progress'].map((k) => ({
    key: k,
    label: `${k} (${counts[k]})`,
  }));

  const data = filter === 'All' ? visits : visits.filter((v) => v.status === filter);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <BrandHeader />

      <View style={s.titleRow}>
        <Text style={[type.display, { flex: 1, fontSize: 32, lineHeight: 40 }]}>Project Visits</Text>
        <Pressable onPress={() => router.push('/visits/new')} style={s.fab}>
          <Plus size={20} color={colors.onDark} strokeWidth={2.4} />
        </Pressable>
      </View>

      <View>
        <FilterChips options={options} value={filter} onChange={setFilter} style={{ paddingLeft: 16 }} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 20, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState title="No visits in this view" body="Schedule one from the + button." />}
        renderItem={({ item }) => {
          const tone = DATE_TONE[item.status] || DATE_TONE.New;
          return (
            <Pressable onPress={() => router.push(`/visits/${item.id}`)} style={s.card}>
              <View style={[s.dateBox, { backgroundColor: tone.bg }]}>
                <Text style={[s.dateDay, { color: tone.fg }]}>{item.day}</Text>
                <Text style={[s.dateMonth, { color: tone.fg }]}>{item.month}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={s.sub}>
                  {item.project} · {item.visitorType}
                </Text>
                <View style={s.timeRow}>
                  <Clock size={12} color={colors.textMuted} strokeWidth={2.2} />
                  <Text style={s.time}>{item.time}</Text>
                </View>
              </View>
              <Badge
                label={item.status}
                tone={item.status === 'Attended' ? 'attended' : item.status === 'New' ? 'new' : 'gold'}
                textStyle={{ fontFamily: fonts.sansBold }}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  fab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  dateBox: {
    width: 56,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: { fontFamily: fonts.serifMedium, fontSize: 21, lineHeight: 26 },
  dateMonth: { fontFamily: fonts.sansBold, fontSize: 10, letterSpacing: 0.5, marginTop: 1 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  name: { fontFamily: fonts.sansSemi, fontSize: 16, lineHeight: 21, color: colors.textStrong },
  sub: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginTop: 1 },
  time: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
});
