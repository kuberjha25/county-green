/** Visit detail — county-green-screen-24 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Phone, Mail, MapPin, Tag, House, Flag, User } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { colors, fonts, radius, type } from '../../src/theme';
import { ScreenHeader, BellButton, Badge, Avatar, InfoRow, EmptyState } from '../../src/components/ui';

const ICON = { size: 17, color: colors.primary, strokeWidth: 2 };

const Section = ({ children }) => <Text style={s.section}>{children}</Text>;

export default function VisitDetail() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { visits, updateVisit } = useStore();
  const v = visits.find((x) => x.id === id);

  if (!v) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        <ScreenHeader title="Visit Detail" />
        <EmptyState title="Visit not found" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <ScreenHeader title="Visit Detail" right={<BellButton variant="muted" />} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* identity */}
        <View style={s.identity}>
          <Avatar initials={v.initials} size={72} bg={colors.avatarSage} fg={colors.primary} serif />
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{v.name}</Text>
            <View style={s.chipRow}>
              <Badge label={v.status} tone={v.status === 'Attended' ? 'sand' : 'gold'} pill />
              <Badge label={v.visitorType} tone="sage" pill />
            </View>
          </View>
          <Pressable onPress={() => Linking.openURL(`tel:${v.mobile.replace(/\s/g, '')}`)} style={s.callBtn}>
            <Phone size={18} color={colors.onDark} strokeWidth={2} />
          </Pressable>
        </View>

        {/* date/time */}
        <View style={s.dtRow}>
          <View style={s.dtCard}>
            <Text style={s.dtLabel}>VISIT DATE</Text>
            <Text style={s.dtValue}>{v.date}</Text>
          </View>
          <View style={s.dtCard}>
            <Text style={s.dtLabel}>VISIT TIME</Text>
            <Text style={s.dtValue}>{v.time}</Text>
          </View>
        </View>

        <Section>CUSTOMER INFORMATION</Section>
        <View style={s.card}>
          <InfoRow plain icon={<Phone {...ICON} />} label="Mobile" value={v.mobile} />
          <InfoRow plain icon={<Mail {...ICON} />} label="Email" value={v.email} />
          <InfoRow plain icon={<MapPin {...ICON} />} label="Address" value={v.address} />
          <InfoRow plain icon={<Tag {...ICON} />} label="Visitor Type" value={v.visitorType} />
        </View>

        <Section>VISIT INFORMATION</Section>
        <View style={s.card}>
          <InfoRow plain icon={<House {...ICON} />} label="Project" value={v.project} />
          <InfoRow plain icon={<MapPin {...ICON} />} label="Site" value={v.site} />
          <InfoRow plain icon={<Flag {...ICON} />} label="Status" value={v.status} />
          <InfoRow plain icon={<User {...ICON} />} label="Booked By" value={v.bookedBy} />
        </View>

        <Section>VISIT NOTES</Section>
        <View style={[s.card, s.plainCard]}>
          <Text style={[type.body, { fontSize: 15, lineHeight: 23, color: colors.textStrong }]}>{v.notes}</Text>
        </View>

        <Section>VISIT HISTORY</Section>
        <View style={[s.card, s.plainCard]}>
          {v.history.map((h, i) => (
            <View key={i} style={s.histRow}>
              <View style={s.histLine}>
                <View style={[s.histDot, { backgroundColor: h.tone === 'gold' ? colors.gold : '#C9CCC6' }]} />
                {i < v.history.length - 1 ? <View style={s.histStem} /> : null}
              </View>
              <View style={{ flex: 1, paddingBottom: i < v.history.length - 1 ? 16 : 0 }}>
                <Text style={s.histDate}>{h.date}</Text>
                <Text style={s.histTitle}>{h.title}</Text>
                <Text style={s.histDetail}>{h.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        {v.status !== 'Attended' ? (
          <Pressable onPress={() => updateVisit(v.id, { status: 'Attended' })} style={s.markBtn}>
            <Text style={s.markText}>Mark as Attended</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  identity: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 4 },
  name: { fontFamily: fonts.serifMedium, fontSize: 28, lineHeight: 34, color: colors.textStrong },
  chipRow: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  callBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dtRow: { flexDirection: 'row', gap: 16, marginTop: 18 },
  dtCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  dtLabel: { fontFamily: fonts.sansMedium, fontSize: 11.5, letterSpacing: 0.6, color: colors.textMuted },
  dtValue: { fontFamily: fonts.sansBold, fontSize: 19, color: colors.textStrong, marginTop: 6 },
  section: {
    fontFamily: fonts.sansBold,
    fontSize: 11.5,
    letterSpacing: 0.4,
    color: colors.textMuted,
    marginTop: 22,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  plainCard: { borderWidth: 0, paddingVertical: 18 },
  histRow: { flexDirection: 'row', gap: 14 },
  histLine: { width: 10, alignItems: 'center' },
  histDot: { width: 9, height: 9, borderRadius: 5, marginTop: 5 },
  histStem: { flex: 1, width: 1.5, backgroundColor: '#D6D9D2', marginTop: 2 },
  histDate: { fontFamily: fonts.sans, fontSize: 12.5, color: colors.textMuted },
  histTitle: { fontFamily: fonts.sansSemi, fontSize: 15.5, color: colors.textStrong, marginTop: 3 },
  histDetail: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginTop: 2 },
  markBtn: {
    marginTop: 24,
    height: 50,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: { fontFamily: fonts.sansSemi, fontSize: 15, color: colors.primary },
});
