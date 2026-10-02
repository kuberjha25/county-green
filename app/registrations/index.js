/** Registrations — county-green-screen-10 */
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, ChevronRight } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { colors, fonts, radius, shadow, type } from '../../src/theme';
import {
  BrandHeader,
  SearchBar,
  SegmentedToggle,
  Avatar,
  Badge,
  EmptyState,
} from '../../src/components/ui';

export default function Registrations() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { registrations } = useStore();
  const [tab, setTab] = useState('Pending');
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return registrations.filter((r) => {
      const byTab = tab === 'Pending' ? r.stage === 'Pending' : r.stage === 'Completed';
      const byQuery = !q || r.name.toLowerCase().includes(q) || r.phone.includes(q);
      return byTab && byQuery;
    });
  }, [registrations, tab, query]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <BrandHeader />

      <View style={s.titleRow}>
        <Text style={[type.display, { flex: 1, fontSize: 32, lineHeight: 40 }]}>Registrations</Text>
        <Pressable onPress={() => router.push('/(auth)/partner-type')} style={s.fab}>
          <Plus size={20} color={colors.onDark} strokeWidth={2.4} />
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 24, gap: 14 }}>
        <SegmentedToggle options={['Pending', 'Completed']} value={tab} onChange={setTab} />
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search by name or phone" />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, paddingTop: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState title={`No ${tab.toLowerCase()} registrations`} />}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/registrations/${item.id}`)} style={s.card}>
            <View style={s.cardTop}>
              <Avatar initials={item.initials} size={46} style={{ marginTop: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.meta}>{item.id}</Text>
                <Text style={s.meta}>{item.phone}</Text>
              </View>
              <Text style={[s.meta, { marginTop: 14 }]}>{item.date}</Text>
            </View>
            <View style={s.cardBottom}>
              <Badge label={item.status} tone={item.status === 'Approved' ? 'approved' : 'pending'} />
              <View style={{ flex: 1 }} />
              <Text style={s.viewLink}>View</Text>
              <ChevronRight size={15} color={colors.textStrong} strokeWidth={2.4} />
            </View>
          </Pressable>
        )}
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
    marginBottom: 14,
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
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 4 },
  name: { fontFamily: fonts.sansSemi, fontSize: 16, lineHeight: 21, color: colors.textStrong },
  meta: { fontFamily: fonts.sans, fontSize: 12.5, lineHeight: 17, color: colors.textMuted },
  viewLink: { fontFamily: fonts.sansSemi, fontSize: 13.5, color: colors.textStrong },
});
