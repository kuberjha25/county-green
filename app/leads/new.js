/** New lead — lead-detail-screen (153:2454) */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User,
  Mail,
  Phone,
  Grid3x3,
  MapPin,
  Building2,
  Map,
  Flame,
  Sun,
  Snowflake,
  SquarePen,
} from 'lucide-react-native';
import { useStore } from '../../src/store';
import { states, leadCategories } from '../../data';
import { colors, fonts, radius } from '../../src/theme';
import { ScreenHeader, BellButton, Input, Select } from '../../src/components/ui';

const ICON = { size: 19, color: colors.primary, strokeWidth: 1.8 };
const PLACEHOLDER = colors.text;

const TEMPS = [
  { key: 'Hot', Icon: Flame, color: colors.gold },
  { key: 'Warm', Icon: Sun, color: colors.gold },
  { key: 'Cold', Icon: Snowflake, color: colors.primary },
];

export default function NewLead() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addLead } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    address: '',
    city: '',
    state: '',
    temperature: 'Hot',
    remarks: '',
  });
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const submit = () => {
    if (!form.name.trim()) {
      Alert.alert('Name required', 'Please enter the lead’s full name.');
      return;
    }
    const lead = addLead(form);
    router.replace(`/leads/${lead.id}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="New Lead" right={<BellButton variant="muted" />} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.group}>Details</Text>
        <Input
          placeholder="Full Name"
          placeholderTextColor={PLACEHOLDER}
          value={form.name}
          onChangeText={(v) => set({ name: v })}
          icon={<User {...ICON} />}
        />
        <Input
          placeholder="Email Address"
          placeholderTextColor={PLACEHOLDER}
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(v) => set({ email: v })}
          icon={<Mail {...ICON} />}
        />
        <Input
          placeholder="Mobile Number"
          placeholderTextColor={PLACEHOLDER}
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(v) => set({ phone: v })}
          icon={<Phone {...ICON} />}
        />
        <Select
          placeholder="Category"
          placeholderColor={PLACEHOLDER}
          options={leadCategories}
          value={form.category}
          onChange={(v) => set({ category: v })}
          icon={<Grid3x3 {...ICON} />}
        />

        <Text style={s.group}>Address</Text>
        <Input
          placeholder="Address"
          placeholderTextColor={PLACEHOLDER}
          value={form.address}
          onChangeText={(v) => set({ address: v })}
          icon={<MapPin {...ICON} />}
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Input
            placeholder="City"
            placeholderTextColor={PLACEHOLDER}
            value={form.city}
            onChangeText={(v) => set({ city: v })}
            icon={<Building2 {...ICON} />}
            containerStyle={{ flex: 1 }}
          />
          <Select
            placeholder="State"
            placeholderColor={PLACEHOLDER}
            options={states}
            value={form.state}
            onChange={(v) => set({ state: v })}
            icon={<Map {...ICON} />}
            containerStyle={{ flex: 1 }}
          />
        </View>

        <Text style={s.group}>Lead Type</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {TEMPS.map(({ key, Icon, color }) => {
            const active = form.temperature === key;
            return (
              <Pressable
                key={key}
                onPress={() => set({ temperature: key })}
                style={[s.tempCard, active && s.tempCardActive]}
              >
                <Icon size={15} color={color} strokeWidth={2} />
                <Text style={[s.tempText, { color }]}>{key}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={s.group}>Remarks</Text>
        <View style={s.remarkBox}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <SquarePen {...ICON} />
            <TextInput
              placeholder="Enter remarks (optional)"
              placeholderTextColor={PLACEHOLDER}
              value={form.remarks}
              onChangeText={(v) => set({ remarks: v.slice(0, 500) })}
              multiline
              style={s.remarkInput}
            />
          </View>
          <Text style={s.counter}>{form.remarks.length}/500</Text>
        </View>

        <Pressable onPress={submit} style={s.submit}>
          <Text style={s.submitText}>Submit Lead</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  group: { fontFamily: fonts.sans, fontSize: 13, color: colors.primary, marginBottom: 12, marginTop: 6 },
  tempCard: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tempCardActive: { backgroundColor: '#F3E7CF', borderColor: colors.goldBorder },
  tempText: { fontFamily: fonts.sans, fontSize: 14 },
  remarkBox: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    paddingBottom: 12,
    height: 108,
  },
  remarkInput: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 14.5,
    color: colors.textStrong,
    padding: 0,
    paddingTop: 1,
    height: 60,
    textAlignVertical: 'top',
  },
  counter: { fontFamily: fonts.sans, fontSize: 11.5, color: colors.textMuted, textAlign: 'right' },
  submit: {
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitText: { fontFamily: fonts.sans, fontSize: 16, color: colors.onDark },
});
