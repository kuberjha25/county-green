/** Leads list — county-green-leads-list */
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Clock } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { colors, fonts, radius, shadow, type } from '../../src/theme';
import {
  BrandHeader,
  SearchBar,
  FilterChips,
  Avatar,
  Badge,
  EmptyState,
} from '../../src/components/ui';

export default function Leads() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { leads } = useStore();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const counts = useMemo(
    () => ({
      All: leads.length,
      'In Progress': leads.filter((l) => l.status === 'In Progress').length,
      Converted: leads.filter((l) => l.status === 'Converted').length,
      New: leads.filter((l) => l.status === 'New').length,
      'Not Matured': leads.filter((l) => l.status === 'Not Matured').length,
    }),
    [leads]
  );

  const options = ['All', 'In Progress', 'Converted', 'New', 'Not Matured'].map((k) => ({
    key: k,
    label: `${k} (${counts[k]})`,
  }));

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      const byFilter = filter === 'All' || l.status === filter;
      const byQuery =
        !q || l.name.toLowerCase().includes(q) || l.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''));
      return byFilter && byQuery;
    });
  }, [leads, query, filter]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <BrandHeader />

      <View style={s.titleRow}>
        <View style={{ flex: 1 }}>
          <Text style={[type.display, { fontSize: 34, lineHeight: 42 }]}>Leads</Text>
          <Text style={[type.bodyMuted, { marginTop: 2, fontSize: 14 }]}>Manage and follow up with your leads.</Text>
        </View>
        <Pressable onPress={() => router.push('/leads/new')} style={[s.fab, { marginTop: 14 }]}>
          <Plus size={20} color={colors.onDark} strokeWidth={2.4} />
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search by name or phone" />
      </View>

      <View style={{ marginTop: 16 }}>
        <FilterChips
          options={options}
          value={filter}
          onChange={setFilter}
          style={{ paddingLeft: 24 }}
        />
      </View>

      <Text style={[type.small, { paddingHorizontal: 24, marginTop: 12, fontSize: 12.5 }]}>
        {data.length} lead{data.length === 1 ? '' : 's'} · Sorted by latest activity
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, paddingTop: 12, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState title="No leads here yet" body="Try a different filter, or add a new lead." />
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/leads/${item.id}`)} style={s.card}>
            <Avatar initials={item.initials} size={46} />
            <View style={{ flex: 1 }}>
              <Text style={s.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={s.sub}>
                {item.project} · {item.configuration}
              </Text>
              <View style={s.followRow}>
                <Clock size={11} color={colors.textMuted} strokeWidth={2.2} />
                <Text style={s.follow}>Follow-up {item.followUp}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 7 }}>
              <Badge label={item.temperature} tone={item.temperature.toLowerCase()} />
              <Badge label={item.status} tone={item.status === 'Converted' ? 'converted' : 'progress'} />
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
    alignItems: 'flex-start',
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
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  followRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  name: { fontFamily: fonts.sansSemi, fontSize: 16, lineHeight: 21, color: colors.textStrong },
  sub: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginTop: 1 },
  follow: { fontFamily: fonts.sans, fontSize: 11.5, color: colors.textMuted },
});
