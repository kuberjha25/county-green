/** Home dashboard — county-green-screen-34 */
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowRight,
  Users,
  CalendarDays,
  Layers,
  FileText,
  Building2,
  BarChart3,
  UsersRound,
  ChevronRight,
} from 'lucide-react-native';
import { useStore } from '../../src/store';
import { images } from '../../data';
import { colors, fonts, radius, shadow, type } from '../../src/theme';
import { BrandHeader, Avatar } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

const W = Dimensions.get('window').width;
const BANNER_W = W - 40;

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { leads, visits, registrations, inventory, documents, project, profile, homeBanners } = useStore();
  const [page, setPage] = useState(0);
  const scroller = useRef(null);

  const inProgress = leads.filter((l) => l.status === 'In Progress').length;
  const upcoming = visits.filter((v) => v.status !== 'Attended').length;
  const available = inventory.filter((u) => u.status === 'Available').length;

  const darkTiles = [
    {
      key: 'leads',
      icon: Users,
      value: String(leads.length),
      title: 'Leads',
      sub: `${inProgress} in progress`,
      to: '/(tabs)/leads',
    },
    {
      key: 'visits',
      icon: CalendarDays,
      value: String(visits.length),
      title: 'Project Visit',
      sub: `${upcoming} upcoming`,
      to: '/(tabs)/visits',
    },
  ];

  const lightTiles = [
    {
      key: 'inventory',
      icon: Layers,
      value: String(available),
      title: 'Inventory',
      sub: `of ${inventory.length} units available`,
      tint: colors.avatarTeal,
      round: true,
      to: '/(tabs)/inventory',
    },
    {
      key: 'documents',
      icon: FileText,
      value: String(documents.length),
      title: 'Documents',
      sub: 'Brochures, plans & legal',
      tint: colors.avatarTeal,
      round: true,
      to: '/documents',
    },
    {
      key: 'projects',
      icon: Building2,
      value: '1',
      title: 'Projects',
      sub: project.location,
      tint: '#ECEDE8',
      to: `/project/${project.id}`,
    },
    {
      key: 'mis',
      icon: BarChart3,
      value: 'View',
      title: 'MIS',
      sub: 'Performance rep...',
      serifValue: true,
      tint: '#ECEDE8',
      to: '/mis',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <BrandHeader />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner carousel */}
        <ScrollView
          ref={scroller}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={BANNER_W + 12}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          onMomentumScrollEnd={(e) =>
            setPage(Math.round(e.nativeEvent.contentOffset.x / (BANNER_W + 12)))
          }
        >
          {homeBanners.map((b) => (
            <Pressable
              key={b.id}
              onPress={() => router.push('/news')}
              style={[s.banner, { width: BANNER_W }]}
            >
              <Image source={images[b.image]} style={FILL} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(8,34,22,0.05)', 'rgba(8,34,22,0.25)', 'rgba(7,28,19,0.78)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={s.bannerBody}>
                <View style={{ flex: 1 }} />
                <View style={s.bannerBadge}>
                  <Text style={s.bannerBadgeText}>{b.badge.toUpperCase()}</Text>
                </View>
                <Text style={s.bannerTitle}>{b.title}</Text>
                <Text style={s.bannerSub}>{b.subtitle}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={s.dots}>
          {homeBanners.map((b, i) => (
            <View key={b.id} style={[s.dot, i === page && { backgroundColor: colors.gold }]} />
          ))}
        </View>

        {/* Partner strip */}
        <View style={s.partnerRow}>
          <Avatar initials={profile.initials} size={40} bg={colors.avatarTeal} fg={colors.onDark} />
          <View style={{ flex: 1 }}>
            <Text style={s.partnerRole}>{profile.role.toUpperCase()}</Text>
            <Text style={s.partnerName}>{profile.name}</Text>
          </View>
          <Text style={[type.small, { fontSize: 12.5 }]}>{profile.dashboardDate}</Text>
        </View>

        {/* Dark stat tiles */}
        <View style={s.tileRow}>
          {darkTiles.map((t) => (
            <Pressable key={t.key} onPress={() => router.push(t.to)} style={s.darkTile}>
              <View style={s.tileHead}>
                <View style={s.darkTileIcon}>
                  <t.icon size={16} color={colors.onDark} strokeWidth={2} />
                </View>
                <ArrowRight size={16} color="rgba(255,255,255,0.55)" strokeWidth={2} />
              </View>
              <Text style={s.darkValue}>{t.value}</Text>
              <Text style={s.darkTitle}>{t.title}</Text>
              <Text style={s.darkSub}>{t.sub}</Text>
            </Pressable>
          ))}
        </View>

        {/* Light stat tiles */}
        <View style={[s.tileRow, { flexWrap: 'wrap' }]}>
          {lightTiles.map((t) => (
            <Pressable key={t.key} onPress={() => router.push(t.to)} style={s.lightTile}>
              <View style={s.tileHead}>
                <View
                  style={[
                    s.lightTileIcon,
                    { backgroundColor: t.tint },
                    !t.round && { borderRadius: 10, width: 40, height: 40 },
                  ]}
                >
                  <t.icon size={t.round ? 16 : 19} color={t.round ? colors.onDark : colors.primary} strokeWidth={2} />
                </View>
                <ArrowRight size={16} color={t.round ? colors.textFaint : colors.textMuted} strokeWidth={2} />
              </View>
              <Text style={s.lightValue}>{t.value}</Text>
              <Text style={s.lightTitle}>{t.title}</Text>
              <Text style={s.lightSub} numberOfLines={1}>
                {t.sub}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Registrations row */}
        <Pressable onPress={() => router.push('/registrations')} style={s.regCard}>
          <View style={s.regIcon}>
            <UsersRound size={18} color={colors.textMuted} strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[type.value, { fontSize: 15, fontFamily: fonts.sansSemi }]}>Registrations</Text>
            <Text style={[type.small, { marginTop: 2, fontSize: 12.5, lineHeight: 17 }]}>
              {registrations.length} registered channel partners, brokers & influencers
            </Text>
          </View>
          <ChevronRight size={18} color={colors.textMuted} strokeWidth={2} />
        </Pressable>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  banner: { height: 200, borderRadius: radius.xl, overflow: 'hidden' },
  bannerBody: { flex: 1, padding: 16, paddingBottom: 18 },
  bannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bannerBadgeText: { fontFamily: fonts.sansBold, fontSize: 9.5, letterSpacing: 0.6, color: colors.onDark },
  bannerTitle: { fontFamily: fonts.serifBold, fontSize: 21, lineHeight: 28, color: colors.onDark, marginTop: 6 },
  bannerSub: { fontFamily: fonts.sans, fontSize: 12.5, color: colors.onDarkMuted, marginTop: 2 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.borderStrong },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 14,
  },
  partnerRole: { fontFamily: fonts.sansSemi, fontSize: 10, letterSpacing: 0.5, color: colors.gold },
  partnerName: { fontFamily: fonts.serifBold, fontSize: 17, lineHeight: 22, color: colors.textStrong, marginTop: 1 },
  tileRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 10 },
  tileHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  darkTile: {
    flex: 1,
    backgroundColor: colors.primaryDeep,
    borderRadius: radius.lg,
    padding: 16,
    minHeight: 160,
  },
  darkTileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkValue: { fontFamily: fonts.serifMedium, fontSize: 38, lineHeight: 46, color: colors.onDark, marginTop: 16 },
  darkTitle: { fontFamily: fonts.sansSemi, fontSize: 13.5, color: colors.onDark, marginTop: 8 },
  darkSub: { fontFamily: fonts.sans, fontSize: 11.5, color: colors.onDarkMuted, marginTop: 2 },
  lightTile: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    minHeight: 160,
  },
  lightTileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightValue: { fontFamily: fonts.serifMedium, fontSize: 38, lineHeight: 46, color: colors.textStrong, marginTop: 12 },
  lightTitle: { fontFamily: fonts.sansSemi, fontSize: 13.5, color: colors.textStrong, marginTop: 8 },
  lightSub: { fontFamily: fonts.sans, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  regCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 2,
    padding: 14,
    paddingVertical: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  regIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ECEDE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 24, marginTop: 14 },
  quickBtn: {
    flex: 1,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: { fontFamily: fonts.sansSemi, fontSize: 13.5, color: colors.primary },
});
