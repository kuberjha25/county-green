/** Notifications — meraqui-notifications-screen */
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { useStore } from '../src/store';
import { colors, fonts, radius, shadow, type } from '../src/theme';
import { Label } from '../src/components/ui';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const { notifications, markAllNotificationsRead } = useStore();

  const groups = useMemo(() => {
    const order = ['Today', 'Yesterday', 'Earlier'];
    return order
      .map((g) => ({ group: g, items: notifications.filter((n) => n.group === g) }))
      .filter((g) => g.items.length);
  }, [notifications]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Notifications</Text>

        {groups.map((g, gi) => (
          <View key={g.group} style={{ marginTop: gi ? 22 : 10 }}>
            <Label gold style={{ paddingHorizontal: 24, marginBottom: 10, letterSpacing: 1.2 }}>
              {g.group}
            </Label>
            <View style={s.card}>
              {g.items.map((n, i) => (
                <View key={n.id} style={[s.row, i < g.items.length - 1 && s.rowBorder]}>
                  <View style={s.icon}>
                    <Bell size={16} color={colors.primary} strokeWidth={2} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={s.rowHead}>
                      <Text style={s.rowTitle} numberOfLines={1}>
                        {n.title}
                      </Text>
                      <Text style={[s.time, n.time.includes(',') && s.timeLong]}>{n.time}</Text>
                    </View>
                    <Text style={s.body}>{n.body}</Text>
                  </View>
                  {n.unread ? <View style={s.unread} /> : null}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={s.footer}>
          <Text style={[type.small, { flex: 1 }]}>
            Stay updated with the latest offers, news and important updates.
          </Text>
          <Pressable onPress={markAllNotificationsRead} hitSlop={8}>
            <Text style={s.markAll}>Mark all as read</Text>
          </Pressable>
        </View>
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
    paddingHorizontal: 24,
    marginTop: 14,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  row: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  rowTitle: { flex: 1, fontFamily: fonts.sansSemi, fontSize: 16, color: colors.textStrong },
  body: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.textMuted, marginTop: 4 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  rowHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: { fontFamily: fonts.sansSemi, fontSize: 11, letterSpacing: 1.2, color: colors.textMuted },
  timeLong: { fontFamily: fonts.sans, fontSize: 12, letterSpacing: 0 },
  unread: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.gold,
    alignSelf: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    paddingHorizontal: 16,
    marginTop: 22,
  },
  markAll: { fontFamily: fonts.sans, fontSize: 13, color: colors.primary },
});
