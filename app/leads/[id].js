/** Lead details — lead-detail-screen (153:2296) + update modal (153:2576) */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Modal, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Phone, Mail, User, X, Droplet, ChevronDown, CalendarDays, Check } from 'lucide-react-native';
import { useStore } from '../../src/store';
import { leadStatuses, leadTemperatures } from '../../data';
import { colors, fonts, radius, type } from '../../src/theme';
import { ScreenHeader, BellButton, EmptyState } from '../../src/components/ui';

const Pill = ({ label, dark }) => (
  <View style={[s.pill, dark ? s.pillDark : s.pillLight]}>
    <Text style={[s.pillText, dark && { color: colors.onDark }]}>{label}</Text>
  </View>
);

const KV = ({ label, value, light }) => (
  <View style={{ flex: 1 }}>
    <Text style={s.kvLabel}>{label}</Text>
    <Text style={[s.kvValue, light && { fontFamily: fonts.sans, fontSize: 17 }]}>{value}</Text>
  </View>
);

const ModalLabel = ({ children, style }) => <Text style={[s.modalLabel, style]}>{children}</Text>;

export default function LeadDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { leads, updateLead } = useStore();
  const lead = leads.find((l) => l.id === id);

  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(lead?.temperature || 'Hot');
  const [status, setStatus] = useState(lead?.status || 'In Progress');
  const [statusOpen, setStatusOpen] = useState(false);
  const [followUp, setFollowUp] = useState(lead?.followUp || '');
  const [note, setNote] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  if (!lead) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        <ScreenHeader title="Lead Details" />
        <EmptyState title="Lead not found" body="It may have been removed." />
      </View>
    );
  }

  const save = () => {
    updateLead(lead.id, { temperature: temp, status, followUp, note: note || undefined });
    setNote('');
    setOpen(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      <ScreenHeader title="Lead Details" right={<BellButton variant="muted" />} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {/* identity */}
        <View style={s.card}>
          <Text style={s.name}>{lead.name}</Text>
          <View style={s.chipRow}>
            <Pill label={lead.status} />
            <Pill label={lead.temperature} dark />
            <Pill label={lead.source} dark />
          </View>
          <View style={s.divider} />
          <Pressable style={s.contactRow} onPress={() => Linking.openURL(`tel:${lead.phone.replace(/\s/g, '')}`)}>
            <View style={s.contactIcon}>
              <Phone size={16} color={colors.primary} strokeWidth={2} />
            </View>
            <View>
              <Text style={s.contactLabel}>PHONE</Text>
              <Text style={s.contactValue}>{lead.phone}</Text>
            </View>
          </Pressable>
          <Pressable style={s.contactRow} onPress={() => Linking.openURL(`mailto:${lead.email}`)}>
            <View style={s.contactIcon}>
              <Mail size={16} color={colors.primary} strokeWidth={2} />
            </View>
            <View>
              <Text style={s.contactLabel}>EMAIL</Text>
              <Text style={s.contactValue}>{lead.email}</Text>
            </View>
          </Pressable>
        </View>

        {/* interest */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Interest Details</Text>
          <View style={s.pairRow}>
            <KV label="PROJECT" value={lead.interest.project} light />
            <KV label="CONFIGURATION" value={lead.interest.configuration} />
          </View>
          <View style={s.divider} />
          <View style={s.pairRow}>
            <KV label="BUDGET RANGE" value={lead.interest.budget} />
            <KV label="PREFERRED FLOOR" value={lead.interest.preferredFloor} />
          </View>
          <View style={s.divider} />
          <View style={s.pairRow}>
            <KV label="POSSESSION" value={lead.interest.possession} />
            <KV label="FINANCING" value={lead.interest.financing} />
          </View>
        </View>

        {/* history */}
        <View style={s.card}>
          <Text style={[s.cardTitle, { marginBottom: 18 }]}>History</Text>
          {lead.history.map((h, i) => {
            const last = i === lead.history.length - 1;
            return (
              <View key={i} style={s.histRow}>
                <View style={s.histLeft}>
                  <Text style={s.histDate}>{h.date}</Text>
                  <Text style={s.histTime}>{h.time}</Text>
                </View>
                <View style={s.histLine}>
                  <View style={[s.histDot, h.tone === 'pending' && { backgroundColor: colors.gold }]} />
                  {!last ? <View style={s.histStem} /> : null}
                </View>
                <View style={{ flex: 1, paddingBottom: last ? 0 : 20 }}>
                  <Text style={s.histTitle}>{h.title}</Text>
                  <Text style={s.histDetail}>{h.detail}</Text>
                  <View style={s.histBy}>
                    <User size={11} color={colors.textMuted} strokeWidth={2} />
                    <Text style={s.histByText}>{h.by}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* notes */}
        <View style={s.card}>
          <View style={s.notesHead}>
            <Text style={[s.cardTitle, { flex: 1, marginBottom: 0 }]}>Notes</Text>
            <Pressable onPress={() => setNoteOpen(true)} hitSlop={8}>
              <Text style={s.addNote}>Add Note</Text>
            </Pressable>
          </View>
          <View style={s.noteBox}>
            <Text style={s.noteText}>{lead.notes}</Text>
          </View>
        </View>
      </ScrollView>

      {/* bottom actions */}
      <View style={[s.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          onPress={() => router.push({ pathname: '/visits/new', params: { leadId: lead.id } })}
          style={[s.bottomBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={[s.bottomText, { color: colors.onDark, fontFamily: fonts.sansMedium, fontSize: 16 }]}>
            Schedule Visit
          </Text>
        </Pressable>
        <Pressable onPress={() => setOpen(true)} style={[s.bottomBtn, s.bottomOutline]}>
          <Text style={s.bottomText}>Update Status</Text>
        </Pressable>
      </View>

      {/* update modal — lead-update-popup */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={s.dialog} onPress={(e) => e.stopPropagation()}>
            <View style={s.dialogHead}>
              <Text style={s.dialogTitle}>Update Lead</Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={8} style={s.dialogClose}>
                <X size={15} color={colors.textStrong} strokeWidth={2.2} />
              </Pressable>
            </View>

            <ModalLabel>LEAD TYPE</ModalLabel>
            <View style={s.tempRow}>
              {leadTemperatures.map((t) => {
                const active = t === temp;
                return (
                  <Pressable key={t} onPress={() => setTemp(t)} style={[s.tempChip, active && s.tempChipActive]}>
                    {active ? <Droplet size={12} color={colors.onDark} fill={colors.onDark} strokeWidth={2} /> : null}
                    <Text style={[s.tempText, active && { color: colors.onDark }]}>{t}</Text>
                  </Pressable>
                );
              })}
            </View>

            <ModalLabel style={{ marginTop: 16 }}>LEAD STATUS</ModalLabel>
            <Pressable onPress={() => setStatusOpen((o) => !o)} style={s.field}>
              <View style={s.statusChip}>
                <Text style={s.statusChipText}>{status}</Text>
              </View>
              <View style={{ flex: 1 }} />
              <ChevronDown size={16} color={colors.textStrong} strokeWidth={2} />
            </Pressable>
            {statusOpen ? (
              <View style={s.statusList}>
                {leadStatuses.map((o) => (
                  <Pressable
                    key={o}
                    onPress={() => {
                      setStatus(o);
                      setStatusOpen(false);
                    }}
                    style={s.statusRow}
                  >
                    <Text style={[type.body, { fontSize: 14 }]}>{o}</Text>
                    {o === status ? <Check size={16} color={colors.primary} strokeWidth={2.5} /> : null}
                  </Pressable>
                ))}
              </View>
            ) : null}

            <ModalLabel style={{ marginTop: 16 }}>FOLLOW-UP DATE</ModalLabel>
            <View style={s.field}>
              <TextInput
                value={followUp}
                onChangeText={setFollowUp}
                placeholder="e.g. 15 Sep 2026"
                placeholderTextColor={colors.textFaint}
                style={s.fieldInput}
              />
              <CalendarDays size={17} color={colors.primary} strokeWidth={1.8} />
            </View>

            <ModalLabel style={{ marginTop: 16 }}>NOTES</ModalLabel>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Add notes about this lead..."
              placeholderTextColor={colors.text}
              multiline
              style={[s.field, s.notesInput]}
            />

            <Pressable onPress={save} style={s.saveBtn}>
              <Text style={s.saveText}>Save Update</Text>
            </Pressable>
            <Pressable onPress={() => setOpen(false)} style={{ paddingVertical: 14, alignItems: 'center' }}>
              <Text style={[type.body, { color: colors.textStrong }]}>Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* add note */}
      <Modal visible={noteOpen} transparent animationType="fade" onRequestClose={() => setNoteOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setNoteOpen(false)}>
          <Pressable style={s.dialog} onPress={(e) => e.stopPropagation()}>
            <View style={s.dialogHead}>
              <Text style={s.dialogTitle}>Add Note</Text>
              <Pressable onPress={() => setNoteOpen(false)} hitSlop={8} style={s.dialogClose}>
                <X size={15} color={colors.textStrong} strokeWidth={2.2} />
              </Pressable>
            </View>
            <TextInput
              value={newNote}
              onChangeText={setNewNote}
              placeholder="Type a note…"
              placeholderTextColor={colors.textFaint}
              multiline
              style={[s.field, s.notesInput]}
            />
            <Pressable
              onPress={() => {
                if (newNote.trim()) updateLead(lead.id, { note: newNote.trim() });
                setNewNote('');
                setNoteOpen(false);
              }}
              style={s.saveBtn}
            >
              <Text style={s.saveText}>Save Note</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  name: { fontFamily: fonts.serifSemi, fontSize: 22, lineHeight: 28, color: colors.textStrong },
  chipRow: { flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  pillLight: { backgroundColor: colors.goldTint, borderWidth: 1, borderColor: colors.goldBorder },
  pillDark: { backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.primary },
  pillText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.textStrong },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: { fontFamily: fonts.sansSemi, fontSize: 10, letterSpacing: 0.4, color: colors.textMuted },
  contactValue: { fontFamily: fonts.sans, fontSize: 16, color: colors.textStrong, marginTop: 2 },
  cardTitle: { fontFamily: fonts.serifSemi, fontSize: 20, lineHeight: 26, color: colors.textStrong, marginBottom: 14 },
  pairRow: { flexDirection: 'row', gap: 16 },
  kvLabel: { fontFamily: fonts.sansSemi, fontSize: 10.5, letterSpacing: 0.3, color: colors.gold },
  kvValue: { fontFamily: fonts.sansMedium, fontSize: 16, color: colors.textStrong, marginTop: 5 },
  histRow: { flexDirection: 'row', gap: 12 },
  histLeft: { width: 74, alignItems: 'flex-end' },
  histDate: { fontFamily: fonts.sansSemi, fontSize: 11.5, color: colors.gold },
  histTime: { fontFamily: fonts.sansBold, fontSize: 11, color: colors.textMuted, marginTop: 3 },
  histLine: { width: 10, alignItems: 'center' },
  histDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 5 },
  histStem: { flex: 1, width: 1.5, backgroundColor: colors.primary, marginTop: 1 },
  histTitle: { fontFamily: fonts.sans, fontSize: 16, color: colors.textStrong },
  histDetail: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginTop: 2 },
  histBy: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  histByText: { fontFamily: fonts.sans, fontSize: 11.5, color: colors.textMuted },
  notesHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  addNote: { fontFamily: fonts.sansBold, fontSize: 13.5, color: colors.primary },
  noteBox: { backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 12 },
  noteText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.textMuted },
  bottom: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingTop: 10, backgroundColor: colors.bg },
  bottomBtn: { flex: 1, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  bottomOutline: { borderWidth: 1.5, borderColor: colors.primary, backgroundColor: colors.surface },
  bottomText: { fontFamily: fonts.sansSemi, fontSize: 14.5, color: colors.primary },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(30,36,32,0.55)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dialog: { backgroundColor: colors.surface, borderRadius: 24, padding: 24, paddingBottom: 10 },
  dialogHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  dialogTitle: { fontFamily: fonts.serifBold, fontSize: 20, color: colors.primary },
  dialogClose: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLabel: { fontFamily: fonts.sansBold, fontSize: 11, letterSpacing: 0.4, color: colors.gold, marginBottom: 8 },
  tempRow: { flexDirection: 'row', gap: 8 },
  tempChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tempChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tempText: { fontFamily: fonts.sansMedium, fontSize: 14, color: colors.textStrong },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  fieldInput: { flex: 1, fontFamily: fonts.sans, fontSize: 15, color: colors.textStrong, padding: 0 },
  statusChip: { backgroundColor: '#EAF1EC', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 4 },
  statusChipText: { fontFamily: fonts.sans, fontSize: 14, color: colors.textStrong },
  statusList: {
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
  },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  notesInput: {
    height: 80,
    alignItems: 'flex-start',
    paddingTop: 12,
    textAlignVertical: 'top',
    fontFamily: fonts.sans,
    fontSize: 14.5,
    color: colors.textStrong,
  },
  saveBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  saveText: { fontFamily: fonts.sansMedium, fontSize: 15.5, color: colors.onDark },
});
