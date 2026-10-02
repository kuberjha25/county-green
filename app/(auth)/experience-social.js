/** Experience & social — county-green-screen-06 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Facebook, Instagram, Youtube } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { colors, fonts, radius, type } from '../../src/theme';
import { ScreenHeader, PrimaryButton, Input, Label } from '../../src/components/ui';

export default function ExperienceSocial() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session, setOnboarding, addRegistration } = useStore();
  const d = session.onboarding;

  const submit = () => {
    addRegistration(d);
    router.push('/(auth)/success');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Experience & Social" bubble={false} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Label>Specialisation</Label>
        <Text style={[type.body, { marginTop: 10, fontSize: 15, color: colors.textStrong }]}>
          Do you have local experience in Chandigarh?
        </Text>

        <View style={s.row}>
          {['Yes', 'No'].map((opt) => {
            const active = d.localExperience === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => setOnboarding({ localExperience: opt })}
                style={[s.choice, active && s.choiceActive]}
              >
                <View style={[s.dot, active && { backgroundColor: colors.gold }]} />
                <Text style={[type.value, { fontSize: 15, fontFamily: fonts.sansSemi }]}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>

        <Label style={{ marginTop: 26, marginBottom: 14 }}>Social Media Profiles</Label>

        <Input
          label="Facebook"
          placeholder="Facebook Profile Link"
          autoCapitalize="none"
          value={d.facebook}
          onChangeText={(v) => setOnboarding({ facebook: v })}
          rightIcon={<Facebook size={18} color={colors.textMuted} strokeWidth={1.8} />}
        />
        <Input
          label="Instagram"
          placeholder="Instagram Profile Link"
          autoCapitalize="none"
          value={d.instagram}
          onChangeText={(v) => setOnboarding({ instagram: v })}
          rightIcon={<Instagram size={18} color={colors.textMuted} strokeWidth={1.8} />}
        />
        <Input
          label="YouTube"
          placeholder="YouTube Channel Link"
          autoCapitalize="none"
          value={d.youtube}
          onChangeText={(v) => setOnboarding({ youtube: v })}
          rightIcon={<Youtube size={18} color={colors.textMuted} strokeWidth={1.8} />}
        />

        <View style={{ flex: 1 }} />
        <PrimaryButton
          title="Submit"
          onPress={submit}
          style={{ marginTop: 24, marginBottom: insets.bottom + 8 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, marginTop: 12 },
  choice: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  choiceActive: { borderColor: colors.gold, borderWidth: 1.2, backgroundColor: '#F8EFDF' },
  dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.border },
});
