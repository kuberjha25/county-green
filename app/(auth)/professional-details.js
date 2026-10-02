/** Professional details + document uploads — county-green-screen-05 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Building2, File, Upload, Check } from 'lucide-react-native';
import { experienceOptions, uploadDocs } from '../../data';
import { useStore } from '../../src/store';
import { colors, radius, type, fonts } from '../../src/theme';
import { ScreenHeader, PrimaryButton, Input, Select, SectionLabel } from '../../src/components/ui';

export default function ProfessionalDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session, setOnboarding } = useStore();
  const d = session.onboarding;

  const toggleUpload = (id) =>
    setOnboarding({ uploads: { ...d.uploads, [id]: !d.uploads[id] } });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Professional Details" bubble={false} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SectionLabel>Additional Information</SectionLabel>

        <Input
          label="Company / Firm Name"
          placeholder="e.g. ABC Partners LLP"
          value={d.company}
          onChangeText={(v) => setOnboarding({ company: v })}
          rightIcon={<Building2 size={18} color={colors.textMuted} strokeWidth={1.8} />}
        />
        <Input
          label="RERA Registration Number"
          placeholder="RERA-PB-XXXX-XXX"
          autoCapitalize="characters"
          value={d.rera}
          onChangeText={(v) => setOnboarding({ rera: v })}
        />
        <Select
          label="Years of Experience"
          placeholder="Select experience"
          options={experienceOptions}
          value={d.experience}
          onChange={(v) => setOnboarding({ experience: v })}
        />

        <SectionLabel style={{ marginTop: 8 }}>Upload Documents</SectionLabel>

        {uploadDocs.map((doc) => {
          const done = !!d.uploads[doc.id];
          return (
            <View key={doc.id} style={s.docCard}>
              <View style={s.docIcon}>
                <File size={18} color="#8C918D" fill="#8C918D" strokeWidth={1.6} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.docTitle}>{doc.title}</Text>
                <Text style={s.docNote}>{doc.note}</Text>
                {doc.optional ? (
                  <View style={s.optional}>
                    <Text style={s.optionalText}>Optional</Text>
                  </View>
                ) : null}
              </View>
              <Pressable onPress={() => toggleUpload(doc.id)} style={[s.uploadBtn, done && s.uploadBtnDone]}>
                {done ? (
                  <Check size={14} color={colors.onDark} strokeWidth={2.5} />
                ) : (
                  <Upload size={14} color={colors.primary} strokeWidth={2.2} />
                )}
                <Text style={[s.uploadText, done && { color: colors.onDark }]}>
                  {done ? 'Added' : 'Upload'}
                </Text>
              </Pressable>
            </View>
          );
        })}

        <PrimaryButton
          title="Submit"
          onPress={() => router.push('/(auth)/experience-social')}
          style={{ marginTop: 18 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F3F4EF',
    marginBottom: 14,
  },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E6E7E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTitle: { fontFamily: fonts.sansSemi, fontSize: 13.5, lineHeight: 18, color: colors.textStrong },
  docNote: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, marginTop: 1 },
  optional: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3E4DE',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  optionalText: { fontFamily: fonts.sansMedium, fontSize: 10, color: colors.textMuted },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  uploadBtnDone: { backgroundColor: colors.primary },
  uploadText: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.primary },
});
