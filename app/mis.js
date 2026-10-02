/** MIS report — mis-report-screen */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { CalendarDays, Download } from 'lucide-react-native';
import { useStore } from '../src/store';
import { colors, fonts, radius, shadow, type } from '../src/theme';
import { FilterChips, Card, ProgressBar } from '../src/components/ui';

const BAR_COLORS = {
  gold: colors.gold,
  primary: colors.primary,
  brown: '#5C4423',
  goldLight: '#D9BE84',
  sage: colors.avatarSage,
};

function Donut({ value, label, color }) {
  const size = 112;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#E3E8E4"
            strokeWidth={stroke}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${(c * value) / 100} ${c}`}
            strokeLinecap="butt"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <Text style={s.donutValue}>{value}%</Text>
      </View>
      <Text style={s.donutLabel}>{label.toUpperCase()}</Text>
    </View>
  );
}

function MeterGroup({ title, rows }) {
  return (
    <>
      <Text style={s.sectionTitle}>{title.toUpperCase()}</Text>
      <Card style={{ marginHorizontal: 24, borderRadius: 20, padding: 20 }}>
        {rows.map((r, i) => (
          <View key={r.label} style={{ marginTop: i ? 18 : 0 }}>
            <View style={s.meterHead}>
              <Text style={[type.body, { flex: 1, fontSize: 14.5 }]}>{r.label}</Text>
              <Text style={[type.value, { fontSize: 14.5 }]}>{r.value}</Text>
            </View>
            <ProgressBar value={r.value} max={r.max} color={BAR_COLORS[r.color] || colors.gold} />
          </View>
        ))}
      </Card>
    </>
  );
}

export default function Mis() {
  const insets = useSafeAreaInsets();
  const { mis } = useStore();
  const [range, setRange] = useState('Daily');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>MIS Report</Text>

        <View style={{ marginTop: 8 }}>
          <FilterChips options={mis.ranges} value={range} onChange={setRange} style={{ paddingLeft: 24 }} />
        </View>

        <View style={s.dateRow}>
          <CalendarDays size={17} color={colors.primary} strokeWidth={1.8} />
          <Text style={[type.body, { flex: 1, fontSize: 15, color: colors.textStrong }]}>{mis.date}</Text>
          <Pressable
            onPress={() => Alert.alert('Download', 'The MIS export will be generated once reporting is connected.')}
            style={s.dlBtn}
          >
            <Download size={14} color={colors.onDark} strokeWidth={2.2} />
            <Text style={s.dlText}>Download Report</Text>
          </Pressable>
        </View>

        {/* KPI tiles */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12, marginTop: 18 }}
        >
          {mis.tiles.map((t) => (
            <View key={t.id} style={s.tile}>
              <Text style={s.tileValue}>{t.value}</Text>
              <Text style={s.tileLabel}>{t.label}</Text>
              <Text style={s.tileDelta}>{t.delta}</Text>
            </View>
          ))}
        </ScrollView>

        {/* conversion donuts */}
        <Text style={s.sectionTitle}>CONVERSION</Text>
        <Card style={{ marginHorizontal: 24, paddingVertical: 22, borderRadius: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            {mis.conversion.map((d) => (
              <Donut
                key={d.id}
                value={d.value}
                label={d.label}
                color={d.color === 'gold' ? colors.gold : colors.avatarSage}
              />
            ))}
          </View>
        </Card>

        <MeterGroup title="Leads Summary" rows={mis.leadsSummary} />
        <MeterGroup title="Visits Summary" rows={mis.visitsSummary} />

        <Text style={s.sectionTitle}>REGISTRATIONS BY CATEGORY</Text>
        <Card style={{ marginHorizontal: 24, borderRadius: 20, padding: 20 }}>
          {mis.registrationsByCategory.map((r, i) => (
            <View key={r.label} style={{ marginTop: i ? 18 : 0 }}>
              <View style={s.meterHead}>
                <Text style={[type.body, { flex: 1, fontSize: 14.5 }]}>{r.label}</Text>
                <Text style={[type.value, { fontSize: 14.5 }]}>{r.value}</Text>
              </View>
              <ProgressBar value={r.value} max={r.max} color={BAR_COLORS[r.color]} />
            </View>
          ))}
          <View style={s.cardFooter}>
            <Text style={type.small}>{mis.footerLeft}</Text>
            <Text style={type.small}>{mis.footerRight}</Text>
          </View>
        </Card>

        <Text style={[type.small, { textAlign: 'center', marginTop: 24, color: colors.textStrong }]}>
          Note: Data is updated as of {mis.asOf}
        </Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  title: {
    fontFamily: fonts.serifMedium,
    fontSize: 30,
    lineHeight: 38,
    color: colors.primary,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  tileLabel: { fontFamily: fonts.sans, fontSize: 13, color: colors.textStrong, marginTop: 6 },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    marginTop: 18,
  },
  dlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: radius.pill,
  },
  dlText: { fontFamily: fonts.sansSemi, fontSize: 12.5, color: colors.onDark },
  tile: {
    width: 136,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    paddingVertical: 16,
  },
  tileValue: { fontFamily: fonts.sans, fontSize: 30, lineHeight: 36, color: colors.primary },
  tileDelta: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, color: colors.gold, marginTop: 8 },
  sectionTitle: {
    fontFamily: fonts.serifSemi,
    fontSize: 14,
    letterSpacing: 1.6,
    color: colors.primary,
    paddingHorizontal: 24,
    marginTop: 28,
    marginBottom: 12,
  },
  donutValue: { fontFamily: fonts.serifBold, fontSize: 20, color: colors.textStrong },
  donutLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.6,
    color: colors.primary,
    marginTop: 10,
    textAlign: 'center',
  },
  meterHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
