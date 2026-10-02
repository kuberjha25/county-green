/** My profile — my-profile */
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Building2,
  FileText,
  Clock,
  BadgeCheck,
  Pencil,
  LogOut,
  ChevronRight,
  Newspaper,
  BarChart3,
} from 'lucide-react-native';
import { useStore } from '../../src/store';
import { images, app } from '../../data';
import { colors, fonts, radius, shadow, type } from '../../src/theme';
import { BellButton, Card, InfoRow, Label, PrimaryButton, Avatar } from '../../src/components/ui';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };
const VAL = { fontFamily: fonts.sansSemi, fontSize: 16, color: colors.primary };
const ICON = { size: 17, color: colors.primary, strokeWidth: 2 };

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, signOut } = useStore();

  const onLogout = () => {
    Alert.alert('Log out', 'Sign out of the County Green partner app?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* cover */}
        <View style={s.cover}>
          <Image source={images.aerialTownship} style={FILL} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(10,40,26,0.35)', 'rgba(9,36,24,0.5)', 'rgba(9,36,24,0.6)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={[s.coverTop, { paddingTop: insets.top + 8 }]}>
            <View style={{ flex: 1 }} />
            <BellButton />
          </View>
        </View>

        {/* identity */}
        <View style={s.identity}>
          <Avatar
            initials={profile.initials}
            size={72}
            bg={colors.avatarSage}
            fg={colors.primary}
            serif
            style={s.avatarRing}
          />
          <View style={{ flex: 1 }}>
            <Text style={s.identityName} numberOfLines={1}>
              {profile.name}
            </Text>
            {profile.verified ? (
              <View style={s.verified}>
                <BadgeCheck size={12} color={colors.success} strokeWidth={2.2} />
                <Text style={s.verifiedText}>Verified</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* stats */}
        <View style={s.statRow}>
          {[
            { v: profile.stats.leads, l: 'Leads', to: '/(tabs)/leads' },
            { v: profile.stats.visits, l: 'Visits', to: '/(tabs)/visits' },
            { v: profile.stats.registrations, l: 'Registrations', to: '/registrations' },
          ].map((st) => (
            <Pressable key={st.l} onPress={() => router.push(st.to)} style={s.statCard}>
              <Text style={s.statValue}>{st.v}</Text>
              <Text style={s.statLabel}>{st.l.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>

        {/* personal info */}
        <View style={s.sectionHead}>
          <Text style={[s.sectionLabel, { flex: 1 }]}>PERSONAL INFORMATION</Text>
          <Pressable style={s.editBtn} hitSlop={8}>
            <Pencil size={13} color={colors.gold} strokeWidth={2} />
            <Text style={s.editText}>Edit</Text>
          </Pressable>
        </View>
        <Card style={s.card}>
          <InfoRow valueStyle={VAL} icon={<Phone {...ICON} />} label="Mobile Number" value={profile.mobile} />
          <InfoRow valueStyle={VAL} icon={<Mail {...ICON} />} label="Email Address" value={profile.email} />
          <InfoRow valueStyle={VAL} icon={<MapPin {...ICON} />} label="City" value={profile.city} />
          <InfoRow valueStyle={VAL} icon={<CalendarDays {...ICON} />} label="Member Since" value={profile.memberSince} last />
        </Card>

        {/* company info */}
        <Text style={[s.sectionLabel, { paddingHorizontal: 20, marginTop: 22, marginBottom: 10 }]}>COMPANY INFORMATION</Text>
        <Card style={s.card}>
          <InfoRow valueStyle={VAL} icon={<Building2 {...ICON} />} label="Company / Firm" value={profile.company} />
          <InfoRow valueStyle={VAL} icon={<FileText {...ICON} />} label="RERA Number" value={profile.rera} />
          <InfoRow valueStyle={VAL} icon={<Clock {...ICON} />} label="Experience" value={profile.experience} last />
        </Card>

        {/* links */}
        <Card style={[s.card, { marginTop: 20, padding: 0, paddingVertical: 0 }]}>
          {[
            { label: 'About Us', to: '/about' },
            { label: 'Terms & Conditions', to: '/terms' },
          ].map((row, i, arr) => (
            <Pressable
              key={row.label}
              onPress={() => router.push(row.to)}
              style={[s.linkRow, i < arr.length - 1 && s.linkRowBorder]}
            >
              <Text style={[type.body, { flex: 1, color: colors.textStrong }]}>{row.label}</Text>
              <ChevronRight size={18} color={colors.primary} strokeWidth={2} />
            </Pressable>
          ))}
        </Card>

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <PrimaryButton
            title="Log Out"
            onPress={onLogout}
            style={{ borderRadius: 14 }}
            icon={<LogOut size={18} color={colors.onDark} strokeWidth={2} />}
          />
          <Text style={[type.small, { textAlign: 'center', marginTop: 18, color: '#7E9183' }]}>Version {app.version}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  cover: { height: 200, overflow: 'hidden' },
  coverTop: { flexDirection: 'row', paddingHorizontal: 20 },
  identity: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: -38,
    alignItems: 'flex-start',
  },
  identityName: {
    fontFamily: fonts.serifSemi,
    fontSize: 22,
    lineHeight: 28,
    color: colors.onDark,
    marginTop: 4,
  },
  avatarRing: { borderWidth: 3, borderColor: colors.onDark },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#E6F2E8',
    borderWidth: 1,
    borderColor: '#A7CDB0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginTop: 14,
  },
  verifiedText: { fontFamily: fonts.sansMedium, fontSize: 11, color: colors.primary },
  statRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 20 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E3DB',
    paddingVertical: 18,
    alignItems: 'center',
  },
  statValue: { fontFamily: fonts.serifSemi, fontSize: 26, lineHeight: 32, color: colors.primary },
  statLabel: { fontFamily: fonts.sansSemi, fontSize: 10.5, letterSpacing: 1, color: '#5E7A66', marginTop: 6 },
  sectionLabel: { fontFamily: fonts.sansBold, fontSize: 11.5, letterSpacing: 1, color: colors.primary },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
  },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  editText: { fontFamily: fonts.sansMedium, fontSize: 13, color: colors.gold },
  card: { marginHorizontal: 20, paddingVertical: 2, borderRadius: 18, borderColor: '#D9E3DB' },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 15 },
  linkRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
});
