/** Schedule visit — schedule-visit-screen */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Map,
  Building,
  CalendarDays,
  Clock,
  FileText,
  ArrowRight,
} from 'lucide-react-native';
import { useStore } from '../../src/store';
import { states, visitTimeSlots, project as projectSeed } from '../../data';
import { colors, fonts, radius, type } from '../../src/theme';
import { ScreenHeader, BellButton, Input, Select } from '../../src/components/ui';

const TEMPS = ['Hot', 'Warm', 'Cold'];
const ICON = { size: 18, color: colors.primary, strokeWidth: 1.8 };
const DOT = { Hot: colors.gold, Warm: colors.gold, Cold: colors.primary };

function nextDates(count = 10) {
  const out = [];
  for (let i = 1; i <= count; i += 1) {
    const d = new Date(Date.now() + i * 864e5);
    out.push(
      `${String(d.getDate()).padStart(2, '0')} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]} ${d.getFullYear()}`
    );
  }
  return out;
}

export default function ScheduleVisit() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { leadId } = useLocalSearchParams();
  const { addVisit, leads } = useStore();
  const lead = leads.find((l) => l.id === leadId);

  const [form, setForm] = useState({
    name: lead?.name || '',
    mobile: lead?.phone || '',
    email: lead?.email || '',
    address: lead?.address || '',
    city: lead?.city || '',
    state: lead?.state || '',
    project: '',
    temperature: lead?.temperature || 'Hot',
    date: '',
    time: '',
    notes: '',
  });
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const submit = () => {
    if (!form.name.trim()) {
      Alert.alert('Name required', 'Please enter the visitor’s name.');
      return;
    }
    const parsed = form.date ? new Date(form.date) : null;
    const visit = addVisit({
      ...form,
      date: parsed && !Number.isNaN(parsed.getTime()) ? parsed : undefined,
      visitorType: 'Client',
    });
    router.replace(`/visits/${visit.id}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Schedule Lead" right={<BellButton variant="muted" />} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: insets.bottom + 28 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Input
          placeholder="Enter complete name"
          value={form.name}
          onChangeText={(v) => set({ name: v })}
          icon={<User {...ICON} />}
        />
        <Input
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={form.mobile}
          onChangeText={(v) => set({ mobile: v })}
          icon={<Phone {...ICON} />}
        />
        <Input
          placeholder="Enter email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(v) => set({ email: v })}
          icon={<Mail {...ICON} />}
        />
        <Input
          placeholder="Enter complete address"
          value={form.address}
          onChangeText={(v) => set({ address: v })}
          icon={<MapPin {...ICON} />}
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Input
            placeholder="Enter city"
            value={form.city}
            onChangeText={(v) => set({ city: v })}
            icon={<Building2 {...ICON} />}
            containerStyle={{ flex: 1 }}
          />
          <Select
            placeholder="Select state"
            options={states}
            value={form.state}
            onChange={(v) => set({ state: v })}
            icon={<Map {...ICON} />}
            containerStyle={{ flex: 1 }}
          />
        </View>
        <Select
          placeholder="Select project"
          options={[projectSeed.name]}
          value={form.project}
          onChange={(v) => set({ project: v })}
          icon={<Building {...ICON} />}
        />

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          {TEMPS.map((t) => {
            const active = form.temperature === t;
            return (
              <Pressable key={t} onPress={() => set({ temperature: t })} style={[s.temp, active && s.tempActive]}>
                <View style={[s.dot, { backgroundColor: DOT[t] }]} />
                <Text style={[s.tempText, active && { color: colors.onDark, fontFamily: fonts.sansSemi }]}>{t}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Select
            placeholder="Select date"
            options={nextDates()}
            value={form.date}
            onChange={(v) => set({ date: v })}
            icon={<CalendarDays {...ICON} />}
            containerStyle={{ flex: 1 }}
          />
          <Select
            placeholder="Select time"
            options={visitTimeSlots}
            value={form.time}
            onChange={(v) => set({ time: v })}
            icon={<Clock {...ICON} />}
            containerStyle={{ flex: 1 }}
          />
        </View>

        <Input
          placeholder="Enter any special requirements or notes here..."
          value={form.notes}
          onChangeText={(v) => set({ notes: v })}
          multiline
          icon={<FileText {...ICON} />}
        />

        <Pressable onPress={submit} style={s.submit}>
          <Text style={s.submitText}>Create Visit</Text>
          <ArrowRight size={17} color={colors.onDark} strokeWidth={2} />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  temp: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tempActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dot: { width: 5, height: 5, borderRadius: 3 },
  tempText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textStrong },
  submit: {
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  submitText: { fontFamily: fonts.sans, fontSize: 16, color: colors.onDark },
});
