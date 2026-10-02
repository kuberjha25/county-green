/** Unit detail — county-green-screen-36 */
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  House,
  Building2,
  Layers,
  LayoutPanelLeft,
  Wind,
  Car,
  Map,
  CalendarDays,
} from 'lucide-react-native';
import { useStore } from '../../src/store';
import { images } from '../../data';
import { colors, fonts, radius, type } from '../../src/theme';
import { Card, InfoRow, Label, PrimaryButton, EmptyState, ScreenHeader } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

export default function UnitDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { inventory, project } = useStore();
  const u = inventory.find((x) => x.id === id);

  if (!u) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        <ScreenHeader title="Unit Detail" />
        <EmptyState title="Unit not found" />
      </View>
    );
  }

  const statusBg = u.status === 'Available' ? 'rgba(22,84,52,0.92)' : u.status === 'Booked' ? colors.danger : colors.gold;
  const dotColor = u.status === 'Available' ? '#4ADE80' : colors.onDark;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* hero */}
        <View style={s.hero}>
          <Image source={images.unitInterior} style={FILL} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(20,70,45,0.55)', 'rgba(18,64,42,0.5)', 'rgba(12,48,32,0.85)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={[s.heroInner, { paddingTop: insets.top + 8 }]}>
            <Pressable onPress={() => router.back()} style={s.backBtn} hitSlop={8}>
              <ArrowLeft size={20} color={colors.textStrong} strokeWidth={2} />
            </Pressable>
            <View style={{ flex: 1 }} />
            <View style={[s.statusPill, { backgroundColor: statusBg }]}>
              <View style={[s.statusDot, { backgroundColor: dotColor }]} />
              <Text style={s.statusText}>{u.status.toUpperCase()}</Text>
            </View>
            <Text style={s.heroTitle}>{u.config}</Text>
            <Text style={s.heroSub} numberOfLines={1}>
              {u.block} · {u.floorLabel} · {u.facing} Facing
            </Text>
          </View>
        </View>

        {/* spec cards */}
        <View style={s.specRow}>
          {[
            [String(u.superArea), 'SUPER AREA SQ.FT'],
            [String(u.carpetArea), 'CARPET SQ.FT'],
            [u.facing, 'FACING'],
          ].map(([v, l]) => (
            <View key={l} style={s.specCard}>
              <Text style={s.specValue} numberOfLines={1}>
                {v}
              </Text>
              <Text style={s.specLabel}>{l}</Text>
            </View>
          ))}
        </View>

        <Label gold style={{ paddingHorizontal: 20, marginTop: 40, marginBottom: 12 }}>
          Unit Information
        </Label>
        <Card style={{ marginHorizontal: 20, paddingVertical: 4, borderRadius: 20 }}>
          <InfoRow icon={<House size={17} color={colors.primary} strokeWidth={2} />} label="Project" value={`${project.name}, ${project.location}`} />
          <InfoRow icon={<Building2 size={17} color={colors.primary} strokeWidth={2} />} label="Block / Tower" value={u.block} />
          <InfoRow icon={<Layers size={17} color={colors.primary} strokeWidth={2} />} label="Floor" value={u.floorLabel} />
          <InfoRow icon={<LayoutPanelLeft size={17} color={colors.primary} strokeWidth={2} />} label="Configuration" value={u.config} />
          <InfoRow icon={<Wind size={17} color={colors.primary} strokeWidth={2} />} label="Balconies" value={String(u.balconies)} />
          <InfoRow icon={<Car size={17} color={colors.primary} strokeWidth={2} />} label="Parking Allocation" value={u.parking} last />
        </Card>

        <View style={{ paddingHorizontal: 20, marginTop: 20, gap: 10 }}>
          <PrimaryButton
            title="REQUEST AVAILABILITY"
            variant="outline"
            style={{ backgroundColor: colors.surfaceAlt, borderRadius: 14 }}
            icon={<Map size={17} color={colors.primary} strokeWidth={2} />}
            onPress={() =>
              Alert.alert(
                'Request sent',
                `Availability request raised for unit ${u.id}. The County Green sales desk will confirm shortly.`
              )
            }
          />
          <PrimaryButton
            title="SCHEDULE VISIT"
            style={{ borderRadius: 14 }}
            icon={<CalendarDays size={17} color={colors.onDark} strokeWidth={2} />}
            onPress={() => router.push('/visits/new')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { height: 388, overflow: 'hidden' },
  heroInner: { flex: 1, paddingHorizontal: 20, paddingBottom: 14 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontFamily: fonts.sansBold, fontSize: 10, letterSpacing: 0.5, color: colors.onDark },
  heroTitle: { fontFamily: fonts.serifSemi, fontSize: 30, lineHeight: 38, color: colors.onDark, marginTop: 8 },
  heroSub: { fontFamily: fonts.sans, fontSize: 13, color: colors.onDarkMuted, marginTop: 2, marginBottom: 18 },
  specRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: -30 },
  specCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  specValue: { fontFamily: fonts.serifSemi, fontSize: 20, color: colors.textStrong },
  specLabel: {
    fontFamily: fonts.sansSemi,
    fontSize: 7.5,
    letterSpacing: 0.3,
    color: colors.textMuted,
    marginTop: 5,
  },
});
