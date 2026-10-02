/** Partner type + basic information — county-green-screen-04 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, Briefcase, Sparkles, User } from 'lucide-react-native';
import { partnerTypes, entityTypes, employeeOptions } from '../../data';
import { useStore } from '../../src/store';
import { colors, fonts, radius, type } from '../../src/theme';
import { ScreenHeader, PrimaryButton, Input, Select, Label } from '../../src/components/ui';

const ICONS = { Users, Briefcase, Sparkles, User };

export default function PartnerType() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session, setOnboarding } = useStore();
  const d = session.onboarding;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Partner Type" bubble={false} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Label style={{ marginBottom: 10 }}>Register As</Label>
        <View style={s.grid}>
          {partnerTypes.map((p) => {
            const Icon = ICONS[p.icon] || User;
            const active = d.partnerType === p.id;
            return (
              <Pressable
                key={p.id}
                onPress={() => setOnboarding({ partnerType: p.id })}
                style={[s.typeCard, active && s.typeCardActive]}
              >
                <View style={[s.typeIcon, active && { backgroundColor: colors.primary }]}>
                  <Icon size={18} color={active ? colors.onDark : colors.primary} strokeWidth={2} />
                </View>
                <Text style={[type.value, { flex: 1, fontSize: 14.5, fontFamily: fonts.sansSemi }]}>{p.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Select
          label="Type of Channel Partner"
          placeholder="Select entity type"
          options={entityTypes}
          value={d.entityType}
          onChange={(v) => setOnboarding({ entityType: v })}
          containerStyle={{ marginTop: 20 }}
        />

        <Label style={{ marginTop: 2, marginBottom: 8 }}>Basic Information</Label>

        <View style={s.row}>
          <Input
            label="First Name"
            placeholder="e.g. John"
            value={d.firstName}
            onChangeText={(v) => setOnboarding({ firstName: v })}
            containerStyle={{ flex: 1 }}
          />
          <Input
            label="Last Name"
            placeholder="e.g. Doe"
            value={d.lastName}
            onChangeText={(v) => setOnboarding({ lastName: v })}
            containerStyle={{ flex: 1 }}
          />
        </View>

        <Input
          label="Mobile"
          prefix="+91"
          placeholder="Enter mobile number"
          keyboardType="number-pad"
          value={d.mobile}
          onChangeText={(v) => setOnboarding({ mobile: v.replace(/\D/g, '').slice(0, 10) })}
        />
        <Input
          label="Email"
          placeholder="e.g. john@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={d.email}
          onChangeText={(v) => setOnboarding({ email: v })}
        />
        <Input
          label="Address"
          placeholder="Enter your address"
          value={d.address}
          onChangeText={(v) => setOnboarding({ address: v })}
        />
        <View style={s.row}>
          <Input
            label="City"
            placeholder="e.g. Chandigarh"
            value={d.city}
            onChangeText={(v) => setOnboarding({ city: v })}
            containerStyle={{ flex: 1 }}
          />
          <Input
            label="State"
            placeholder="e.g. Punjab"
            value={d.state}
            onChangeText={(v) => setOnboarding({ state: v })}
            containerStyle={{ flex: 1 }}
          />
        </View>
        <Input
          label="Pincode"
          placeholder="e.g. 140901"
          keyboardType="number-pad"
          value={d.pincode}
          onChangeText={(v) => setOnboarding({ pincode: v.replace(/\D/g, '').slice(0, 6) })}
        />
        <Select
          label="Do you know any employee"
          placeholder="Select option"
          options={employeeOptions}
          value={d.knowsEmployee}
          onChange={(v) => setOnboarding({ knowsEmployee: v })}
        />

        <PrimaryButton
          title="Save & Continue"
          onPress={() => router.push('/(auth)/professional-details')}
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  typeCard: {
    width: '47.5%',
    flexGrow: 1,
    flexBasis: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    height: 64,
  },
  typeCardActive: { borderColor: colors.primary, borderWidth: 1.5, backgroundColor: '#EAF1EC' },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', gap: 12 },
});
