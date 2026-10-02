/** Project detail — project-detail-screen */
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  MapPin,
  GlassWater,
  Dumbbell,
  House,
  Leaf,
  Car,
  ShieldCheck,
  ToyBrick,
  CircleX,
  Gamepad2,
  Download,
} from 'lucide-react-native';
import { useStore } from '../../src/store';
import { images } from '../../data';
import { colors, fonts, radius, shadow, type } from '../../src/theme';
import { PrimaryButton, Card, Divider } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

const AMENITY_ICONS = {
  GlassWater,
  Dumbbell,
  Home: House,
  Leaf,
  Car,
  ShieldCheck,
  ToyBrick: Gamepad2,
  CircleX,
};

export default function ProjectDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { project, inventory } = useStore();
  const [config, setConfig] = useState(project.configurations[1].id);

  const available = inventory.filter((u) => u.status === 'Available').length;

  const overviewRows = [
    ['RERA No', project.rera],
    ['Developer', project.developer],
    ['Project Type', project.projectType],
    ['Possession', project.possession],
    ['Total Towers', project.totalTowers],
    ['Total Floors', project.totalFloors],
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* hero */}
        <View style={s.hero}>
          <Image source={images[project.heroImage]} style={FILL} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(10,40,26,0.35)', 'rgba(9,36,24,0.45)', 'rgba(8,32,21,0.7)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={[s.heroInner, { paddingTop: insets.top + 8 }]}>
            <Pressable onPress={() => router.back()} style={s.backBtn} hitSlop={8}>
              <ArrowLeft size={20} color={colors.textStrong} strokeWidth={2} />
            </Pressable>
            <View style={{ flex: 1 }} />
            <Image source={images.logoLockup} style={s.heroLogo} resizeMode="contain" />
            <Text style={s.heroTitle}>{project.tagline}</Text>
          </View>
          <View style={s.heroBand}>
            <MapPin size={13} color={colors.gold} strokeWidth={2} />
            <Text style={s.heroLoc}>{project.location.toUpperCase()}</Text>
            <View style={{ flex: 1 }} />
            <View style={s.heroBadge}>
              <Text style={s.heroBadgeText}>{project.badge.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* stats strip */}
        <Card style={s.statStrip}>
          {[
            ['Total Units', String(project.totalUnits), colors.textStrong],
            ['Available', String(available), colors.gold],
            ['Price Range', project.priceRange, colors.textStrong],
          ].map(([label, value, color], i) => (
            <React.Fragment key={label}>
              {i > 0 ? <View style={s.statDivider} /> : null}
              <View style={s.statCell}>
                <Text style={s.statLabel}>{label}</Text>
                <Text style={[s.statValue, { color }]} numberOfLines={1}>
                  {value}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </Card>

        {/* overview */}
        <Card style={s.block}>
          <Text style={s.blockTitle}>Project Overview</Text>
          <Text style={s.overview}>{project.overview}</Text>
          <View style={{ marginTop: 18 }}>
            {overviewRows.map(([k, v], i) => (
              <View key={k} style={{ marginBottom: i === overviewRows.length - 1 ? 4 : 18 }}>
                <Text style={s.rowLabel}>{k}</Text>
                <Text style={s.rowValue}>{v}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* configurations */}
        <Text style={[s.blockTitle, { paddingHorizontal: 16, marginTop: 28 }]}>Unit Configurations</Text>
        <View style={s.configRow}>
          {project.configurations.map((c) => {
            const active = c.id === config;
            return (
              <Pressable key={c.id} onPress={() => setConfig(c.id)} style={[s.configCard, active && s.configCardActive]}>
                <Text style={s.configName}>{c.name}</Text>
                <Text style={s.configArea}>{c.area}</Text>
                <Text style={s.configPrice}>{c.price}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <Pressable onPress={() => router.push('/(tabs)/inventory')} style={s.viewInv}>
            <Text style={s.viewInvText}>View Inventory</Text>
          </Pressable>
        </View>

        {/* amenities */}
        <Text style={[s.blockTitle, { paddingHorizontal: 16, marginTop: 30 }]}>Amenities</Text>
        <Card style={[s.block, { marginTop: 12, paddingVertical: 8 }]}>
          <View style={s.amenGrid}>
            {project.amenities.map((a) => {
              const Icon = AMENITY_ICONS[a.icon] || Leaf;
              return (
                <View key={a.id} style={s.amenItem}>
                  <View style={s.amenCircle}>
                    <Icon size={18} color={colors.onDark} strokeWidth={1.8} />
                  </View>
                  <Text style={s.amenLabel}>{a.label}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <PrimaryButton
            title="Documents"
            variant="goldOutline"
            onPress={() => router.push('/documents')}
            icon={<Download size={17} color={colors.gold} strokeWidth={2} />}
            style={{ borderRadius: radius.pill, backgroundColor: colors.surface }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { height: 380, overflow: 'hidden' },
  heroInner: { flex: 1, paddingHorizontal: 16, paddingBottom: 14 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogo: { width: 120, height: 103, marginLeft: -4 },
  heroTitle: { fontFamily: fonts.serifItalic, fontSize: 28, lineHeight: 36, color: colors.onDark, marginTop: 6 },
  heroBand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 42,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  heroLoc: { fontFamily: fonts.sansSemi, fontSize: 11, letterSpacing: 1.4, color: colors.onDark },
  heroBadge: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  heroBadgeText: { fontFamily: fonts.sansSemi, fontSize: 9.5, letterSpacing: 1.4, color: colors.gold },
  statStrip: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  statCell: { flex: 1, alignItems: 'center' },
  statLabel: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },
  statDivider: { width: 1, backgroundColor: colors.divider },
  statValue: { fontFamily: fonts.sansSemi, fontSize: 20, marginTop: 4 },
  block: { marginHorizontal: 16, marginTop: 16, padding: 20 },
  blockTitle: { fontFamily: fonts.serifSemi, fontSize: 21, lineHeight: 28, color: colors.primary },
  overview: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.textMuted, marginTop: 6 },
  rowLabel: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },
  rowValue: { fontFamily: fonts.sans, fontSize: 15, color: colors.textStrong, marginTop: 6 },
  configRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 12 },
  configCard: {
    flex: 1,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  configCardActive: { borderColor: colors.gold, borderWidth: 1.5 },
  configName: { fontFamily: fonts.sans, fontSize: 17, color: colors.textStrong },
  configArea: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 6 },
  configPrice: { fontFamily: fonts.sans, fontSize: 12, color: colors.gold, marginTop: 6 },
  viewInv: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInvText: { fontFamily: fonts.sans, fontSize: 16, color: colors.onDark },
  amenGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  amenItem: { width: '25%', alignItems: 'center', marginVertical: 8 },
  amenLabel: { fontFamily: fonts.sans, fontSize: 12.5, color: colors.textStrong, marginTop: 10 },
  amenCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
