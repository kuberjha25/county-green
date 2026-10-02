/** Inventory — county-green-inventory */
import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SlidersHorizontal, ChevronRight, Check } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { images } from '../../data';
import { colors, fonts, radius, shadow, type } from '../../src/theme';
import { SearchBar, FilterChips, BellButton, EmptyState, Sheet, PrimaryButton } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

export default function Inventory() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { inventory, project } = useStore();
  const [query, setQuery] = useState('');
  const [block, setBlock] = useState('All');
  const [status, setStatus] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);

  const available = inventory.filter((u) => u.status === 'Available').length;

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inventory.filter((u) => {
      const byBlock = block === 'All' || u.block === block;
      const byStatus = status === 'All' || u.status === status;
      const byQuery = !q || u.config.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
      return byBlock && byStatus && byQuery;
    });
  }, [inventory, query, block, status]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

      {/* hero */}
      <View style={s.hero}>
        <Image source={images.heroEntrance} style={FILL} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(14,52,36,0.55)', 'rgba(12,46,32,0.62)', 'rgba(10,40,28,0.82)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={[s.heroInner, { paddingTop: insets.top + 36 }]}>
          <View style={s.heroTop}>
            <View style={s.heroBadge}>
              <Text style={s.heroBadgeText}>{project.badge.toUpperCase()}</Text>
            </View>
            <BellButton light />
          </View>
          <View style={{ flex: 1 }} />
          <Text style={s.heroTitle}>County Green Inventory</Text>
          <Text style={s.heroSub}>
            3 blocks · {inventory.length} units · {available} available
          </Text>
        </View>
      </View>

      {/* search + filter */}
      <View style={s.searchRow}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search unit or configuration"
          style={{ flex: 1, height: 44, borderRadius: 22 }}
        />
        <Pressable onPress={() => setFilterOpen(true)} style={s.filterBtn}>
          <SlidersHorizontal size={18} color={colors.primary} strokeWidth={2} />
        </Pressable>
      </View>

      <View style={{ marginTop: 14 }}>
        <FilterChips
          options={['All', 'Block A', 'Block B', 'Block C']}
          value={block}
          onChange={setBlock}
          style={{ paddingLeft: 20 }}
        />
      </View>

      <Text style={[type.small, { paddingHorizontal: 20, marginTop: 12, fontSize: 12.5 }]}>
        {data.length} units · Sample inventory for demonstration
      </Text>

      <FlatList
        data={data}
        key="inv-2col"
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 18 }}
        contentContainerStyle={{ padding: 20, paddingTop: 12, gap: 14, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState title="No units match" body="Clear the filters and try again." />}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/inventory/${item.id}`)} style={s.unitCard}>
            <Text style={s.unitConfig} numberOfLines={1}>
              {item.config}
            </Text>
            <Text style={s.unitMeta}>
              {item.block} · {item.floorLabel}
            </Text>
            <View style={s.unitDivider} />
            <View style={s.unitFooter}>
              <Text style={s.unitArea}>{item.superArea} sq.ft</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={s.detailsLink}>Details</Text>
                <ChevronRight size={14} color={colors.primary} strokeWidth={2.4} />
              </View>
            </View>
          </Pressable>
        )}
      />

      <Sheet visible={filterOpen} onClose={() => setFilterOpen(false)} title="Filter units">
        <Text style={[type.label, { textTransform: 'uppercase', marginBottom: 10 }]}>Status</Text>
        {['All', 'Available', 'Booked', 'Blocked'].map((o) => (
          <Pressable key={o} onPress={() => setStatus(o)} style={s.sheetRow}>
            <Text style={[type.body, o === status && { fontFamily: fonts.sansSemi, color: colors.primary }]}>
              {o}
            </Text>
            {o === status ? <Check size={18} color={colors.primary} strokeWidth={2.5} /> : null}
          </Pressable>
        ))}
        <PrimaryButton title="Apply" onPress={() => setFilterOpen(false)} style={{ marginTop: 18 }} />
      </Sheet>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { height: 240, overflow: 'hidden' },
  heroInner: { flex: 1, paddingHorizontal: 24, paddingBottom: 24 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroBadge: {
    backgroundColor: colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  heroBadgeText: { fontFamily: fonts.sansBold, fontSize: 9.5, letterSpacing: 0.4, color: colors.onDark },
  heroTitle: { fontFamily: fonts.serifMedium, fontSize: 28, lineHeight: 36, color: colors.onDark },
  heroSub: { fontFamily: fonts.sans, fontSize: 13, color: colors.onDarkMuted, marginTop: 2 },
  searchRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 22 },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitCard: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  unitConfig: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 30, color: colors.primary },
  unitMeta: { fontFamily: fonts.sans, fontSize: 12.5, color: colors.textMuted, marginTop: 12 },
  unitDivider: { height: 1, backgroundColor: colors.border, marginTop: 10, marginBottom: 12 },
  unitFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  unitArea: { fontFamily: fonts.sans, fontSize: 13.5, color: colors.textStrong },
  detailsLink: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.primary },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
});
