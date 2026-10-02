/** Registration details — county-green-screen-11 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Landmark,
  Hash,
  Gift,
  Heart,
  FileText,
  Clock,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react-native';
import { useStore } from '../../src/store';
import { colors, fonts, radius, type } from '../../src/theme';
import {
  ScreenHeader,
  BellButton,
  Card,
  Badge,
  Avatar,
  InfoRow,
  SectionLabel,
  EmptyState,
} from '../../src/components/ui';

export default function RegistrationDetail() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { registrations } = useStore();
  const r = registrations.find((x) => x.id === id);

  if (!r) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        <ScreenHeader title="Registration Details" />
        <EmptyState title="Registration not found" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <ScreenHeader title="Registration Details" right={<BellButton variant="muted" />} />

      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 12, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* dark header card */}
        <View style={[s.hero, { marginHorizontal: -4 }]}>
          <View style={s.heroTop}>
            <View style={s.avatarRing}>
              <Avatar initials={r.initials} size={60} bg="#D4B382" fg={colors.primary} serif />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.heroName}>{r.name}</Text>
              <Text style={s.heroMeta}>
                {r.category} · {r.firm}
              </Text>
              <View style={s.heroChips}>
                <View style={s.heroChip}>
                  <Text style={s.heroChipText}>{r.status}</Text>
                </View>
                <View style={s.heroChip}>
                  <Text style={s.heroChipText}>{r.project}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={s.heroDivider} />
          <View style={s.heroFooter}>
            <View>
              <Text style={s.heroLabel}>REGISTRATION NO.</Text>
              <Text style={s.heroValue}>{r.id}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.heroLabel}>REGISTERED ON</Text>
              <Text style={s.heroValue}>{r.registeredOn}</Text>
            </View>
          </View>
        </View>

        <SectionLabel style={{ marginTop: 30, marginBottom: 14 }}>Contact & Address</SectionLabel>
        <Card style={{ paddingVertical: 2 }}>
          <InfoRow icon={<Phone size={17} color={colors.primary} strokeWidth={2} />} label="Phone" value={r.phone} />
          <InfoRow icon={<Mail size={17} color={colors.primary} strokeWidth={2} />} label="Email" value={r.email} />
          <InfoRow icon={<MapPin size={17} color={colors.primary} strokeWidth={2} />} label="Address" value={r.address} />
          <InfoRow icon={<Building2 size={17} color={colors.primary} strokeWidth={2} />} label="City" value={r.city} />
          <InfoRow icon={<Landmark size={17} color={colors.primary} strokeWidth={2} />} label="State" value={r.state} />
          <InfoRow icon={<Hash size={17} color={colors.primary} strokeWidth={2} />} label="Pincode" value={r.pincode} />
          <InfoRow icon={<Gift size={17} color={colors.primary} strokeWidth={2} />} label="Date of Birth" value={r.dob} />
          <InfoRow icon={<Heart size={17} color={colors.primary} strokeWidth={2} />} label="Anniversary" value={r.anniversary} last />
        </Card>

        <SectionLabel style={{ marginTop: 24, marginBottom: 14 }}>Professional Details</SectionLabel>
        <Card style={{ paddingVertical: 2 }}>
          <InfoRow icon={<Building2 size={17} color={colors.primary} strokeWidth={2} />} label="Company" value={r.company} />
          <InfoRow icon={<FileText size={17} color={colors.primary} strokeWidth={2} />} label="RERA Number" value={r.rera} />
          <InfoRow icon={<Clock size={17} color={colors.primary} strokeWidth={2} />} label="Experience" value={r.experience} />
          <InfoRow icon={<CalendarDays size={17} color={colors.primary} strokeWidth={2} />} label="Registration Date" value={r.registrationDate} />
          <InfoRow
            icon={<ShieldCheck size={17} color={colors.primary} strokeWidth={2} />}
            label="Status"
            value={r.accountStatus}
            valueColor={r.accountStatus === 'Active' ? colors.success : colors.warn}
            last
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: colors.primaryDeep, borderRadius: radius.xl, padding: 20, paddingTop: 26 },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroName: { fontFamily: fonts.serifSemi, fontSize: 22, lineHeight: 28, color: colors.onDark },
  heroMeta: { fontFamily: fonts.sans, fontSize: 13, color: colors.onDarkMuted, marginTop: 2 },
  heroChips: { flexDirection: 'row', gap: 8, marginTop: 10 },
  heroChip: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  heroChipText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.onDark },
  heroDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 20, marginBottom: 16 },
  heroFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  heroLabel: { fontFamily: fonts.sansSemi, fontSize: 10, letterSpacing: 0.5, color: 'rgba(255,255,255,0.6)' },
  heroValue: { fontFamily: fonts.sansBold, fontSize: 15.5, color: colors.onDark, marginTop: 3 },
});
