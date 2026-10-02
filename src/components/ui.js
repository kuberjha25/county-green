/**
 * Shared UI primitives rebuilt from the County Green Figma components.
 */
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Search,
} from 'lucide-react-native';
import { colors, fonts, radius, shadow, type } from '../theme';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

/* ------------------------------------------------------------------ text */

export const Label = ({ children, gold, style }) => (
  <Text style={[gold ? type.labelGold : type.label, { textTransform: 'uppercase' }, style]}>
    {children}
  </Text>
);

export const SectionLabel = ({ children, style }) => (
  <Text style={[type.labelGold, { textTransform: 'uppercase', marginBottom: 10 }, style]}>
    {children}
  </Text>
);

export const SectionHeading = ({ children, style }) => (
  <Text style={[type.h2, { marginBottom: 12 }, style]}>{children}</Text>
);

/* ---------------------------------------------------------------- header */

export function ScreenHeader({ title, onBack, right, bordered = false, bubble = true }) {
  const router = useRouter();
  const back = onBack || (() => (router.canGoBack() ? router.back() : router.replace('/(tabs)')));
  return (
    <View style={[s.header, bordered && s.headerBordered]}>
      <Pressable onPress={back} hitSlop={10} style={bubble ? s.headerBubble : null}>
        <ArrowLeft size={20} color={bubble ? colors.primary : colors.textStrong} strokeWidth={2} />
      </Pressable>
      <Text style={[type.screenTitle, s.headerTitle]} numberOfLines={1}>
        {title}
      </Text>
      <View style={s.headerRight}>{right ?? <View style={{ width: 36 }} />}</View>
    </View>
  );
}

/**
 * variant: 'default' — white circle (tab screens, photo heroes)
 *          'muted'   — grey circle with gold bell (detail-screen headers)
 *          'glass'   — translucent circle with white bell (dark hero)
 */
export function BellButton({ variant = 'default', light = false }) {
  const router = useRouter();
  const v = light ? 'glass' : variant;
  return (
    <Pressable
      onPress={() => router.push('/notifications')}
      hitSlop={8}
      style={[
        s.bellBtn,
        v === 'muted' && s.bellMuted,
        v === 'glass' && s.bellGlass,
      ]}
    >
      <Bell
        size={18}
        color={v === 'muted' ? colors.gold : v === 'glass' ? colors.onDark : colors.textStrong}
        strokeWidth={1.9}
      />
    </Pressable>
  );
}

export function BrandHeader() {
  return (
    <View style={s.brandHeader}>
      <Image
        source={require('../../assets/images/logo-mark.png')}
        style={{ width: 41, height: 40 }}
        resizeMode="contain"
      />
      <BellButton />
    </View>
  );
}

/* --------------------------------------------------------------- buttons */

export function PrimaryButton({ title, onPress, icon, style, disabled, variant = 'primary' }) {
  const isGold = variant === 'gold';
  const isOutline = variant === 'outline';
  const isGoldOutline = variant === 'goldOutline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        s.btn,
        isGold && { backgroundColor: colors.gold },
        isOutline && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
        isGoldOutline && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.gold },
        disabled && { opacity: 0.45 },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
      <Text
        style={[
          type.button,
          { color: isOutline ? colors.primary : isGoldOutline ? colors.gold : colors.onDark },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export function TextButton({ title, onPress, color = colors.primary, style }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={style}>
      <Text style={{ fontFamily: fonts.sansSemi, fontSize: 14, color }}>{title}</Text>
    </Pressable>
  );
}

/* ----------------------------------------------------------------- cards */

export const Card = ({ children, style, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [s.card, pressed && { opacity: 0.9 }, style]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[s.card, style]}>{children}</View>;
};

export const Divider = ({ style }) => <View style={[s.divider, style]} />;

/* ---------------------------------------------------------- chips/badges */

const TONE = {
  hot: { bg: colors.dangerBg, fg: colors.danger },
  warm: { bg: colors.warnBg, fg: colors.warn },
  cold: { bg: colors.coolBg, fg: colors.coolText },
  success: { bg: colors.successBg, fg: colors.success },
  progress: { bg: colors.successBgAlt, fg: colors.success },
  converted: { bg: colors.infoBg, fg: colors.info },
  pending: { bg: colors.pendingBg, fg: colors.pendingText },
  approved: { bg: colors.approvedBg, fg: colors.approvedText },
  gold: { bg: colors.goldTint, fg: colors.gold },
  neutral: { bg: colors.surfaceAlt, fg: colors.textMuted },
  dark: { bg: colors.primary, fg: colors.onDark },
  attended: { bg: '#E3EAE5', fg: colors.primary },
  new: { bg: colors.successBgAlt, fg: colors.approvedText },
  sage: { bg: '#8FA896', fg: colors.primary },
  sand: { bg: '#F2E3B3', fg: '#8A6A1F' },
};

export function toneFor(value = '') {
  const v = String(value).toLowerCase();
  if (v === 'hot') return 'hot';
  if (v === 'warm') return 'warm';
  if (v === 'cold') return 'cold';
  if (v === 'converted') return 'converted';
  if (v === 'in progress') return 'progress';
  if (v === 'attended') return 'attended';
  if (v === 'pending' || v === 'under review') return 'pending';
  if (v === 'approved' || v === 'active' || v === 'available') return 'approved';
  if (v === 'new') return 'new';
  if (v === 'not matured' || v === 'booked' || v === 'blocked') return 'neutral';
  return 'neutral';
}

export function Badge({ label, tone = 'neutral', icon, pill, style, textStyle }) {
  const t = TONE[tone] || TONE.neutral;
  return (
    <View style={[s.badge, pill && s.badgePill, { backgroundColor: t.bg }, style]}>
      {icon ? <View style={{ marginRight: 5 }}>{icon}</View> : null}
      <Text style={[s.badgeText, { color: t.fg }, textStyle]}>{label}</Text>
    </View>
  );
}

export function StatusBadge({ value, style }) {
  return <Badge label={value} tone={toneFor(value)} style={style} />;
}

/* --------------------------------------------------------------- avatars */

export function Avatar({ initials, size = 48, bg = colors.avatarGold, fg = colors.avatarGoldText, serif, style }) {
  return (
    <View
      style={[
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
    >
      <Text style={{ fontFamily: serif ? fonts.serifSemi : fonts.sansSemi, fontSize: size * (serif ? 0.36 : 0.34), color: fg }}>
        {initials}
      </Text>
    </View>
  );
}

/* --------------------------------------------------------------- filters */

export function FilterChips({ options, value, onChange, style, variant = 'pill' }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[{ gap: 10, paddingRight: 24 }, style]}
    >
      {options.map((opt) => {
        const key = typeof opt === 'string' ? opt : opt.key;
        const label = typeof opt === 'string' ? opt : opt.label;
        const active = key === value;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            style={[
              s.filterChip,
              variant === 'square' && { borderRadius: radius.md },
              active && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
          >
            <Text
              style={[
                s.filterChipText,
                active && { color: colors.onDark, fontFamily: fonts.sansSemi },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export function SegmentedToggle({ options, value, onChange, style }) {
  return (
    <View style={[s.segment, style]}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[s.segmentItem, active && { backgroundColor: colors.gold }]}
          >
            <Text
              style={[
                { fontFamily: active ? fonts.sansSemi : fonts.sansMedium, fontSize: 14 },
                { color: active ? colors.onDark : colors.textMuted },
              ]}
            >
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ---------------------------------------------------------------- inputs */

export function SearchBar({ value, onChangeText, placeholder = 'Search', style, right }) {
  return (
    <View style={[s.search, style]}>
      <Search size={18} color={colors.textFaint} strokeWidth={2} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        style={s.searchInput}
      />
      {right}
    </View>
  );
}

export function Field({ label, children, style }) {
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label ? <Label style={{ marginBottom: 7 }}>{label}</Label> : null}
      {children}
    </View>
  );
}

export function Input({
  label,
  icon,
  rightIcon,
  style,
  containerStyle,
  multiline,
  prefix,
  prefixColor = colors.textMuted,
  ...props
}) {
  const body = (
    <View style={[s.input, multiline && { height: 104, alignItems: 'flex-start', paddingTop: 14 }, style]}>
      {icon ? <View style={{ marginRight: 10 }}>{icon}</View> : null}
      {prefix ? <Text style={[s.inputText, { flex: 0, marginRight: 8, color: prefixColor }]}>{prefix}</Text> : null}
      <TextInput
        placeholderTextColor={colors.textFaint}
        style={[s.inputText, multiline && { height: '100%', textAlignVertical: 'top' }]}
        multiline={multiline}
        {...props}
      />
      {rightIcon ? <View style={{ marginLeft: 10 }}>{rightIcon}</View> : null}
    </View>
  );
  if (!label) return <View style={[{ marginBottom: 12 }, containerStyle]}>{body}</View>;
  return <Field label={label} style={containerStyle}>{body}</Field>;
}

export function Select({
  label,
  value,
  placeholder = 'Select',
  options = [],
  onChange,
  icon,
  containerStyle,
  style,
  placeholderColor = colors.textFaint,
}) {
  const [open, setOpen] = React.useState(false);
  const body = (
    <>
      <Pressable onPress={() => setOpen(true)} style={[s.input, style]}>
        {icon ? <View style={{ marginRight: 10 }}>{icon}</View> : null}
        <Text style={[s.inputText, { color: value ? colors.textStrong : placeholderColor }]} numberOfLines={1}>
          {value || placeholder}
        </Text>
        <ChevronDown size={18} color={colors.textStrong} strokeWidth={2} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={s.modalBackdrop} onPress={() => setOpen(false)}>
          <Pressable style={s.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={s.sheetHandle} />
            <Text style={[type.h3, { marginBottom: 12 }]}>{label || placeholder}</Text>
            <ScrollView style={{ maxHeight: 320 }}>
              {options.map((o) => (
                <Pressable
                  key={o}
                  onPress={() => {
                    onChange?.(o);
                    setOpen(false);
                  }}
                  style={s.sheetRow}
                >
                  <Text style={[type.body, o === value && { fontFamily: fonts.sansSemi, color: colors.primary }]}>
                    {o}
                  </Text>
                  {o === value ? <Check size={18} color={colors.primary} strokeWidth={2.5} /> : null}
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
  if (!label) return <View style={[{ marginBottom: 12 }, containerStyle]}>{body}</View>;
  return <Field label={label} style={containerStyle}>{body}</Field>;
}

/* ------------------------------------------------------------ data pairs */

export function InfoRow({ icon, label, value, valueColor, last, plain, valueStyle }) {
  return (
    <View style={[s.infoRow, (last || plain) && { borderBottomWidth: 0 }, plain && { paddingVertical: 10 }]}>
      {icon ? <View style={s.infoIcon}>{icon}</View> : null}
      <View style={{ flex: 1 }}>
        <Label style={{ fontSize: 10, letterSpacing: 0.5 }}>{label}</Label>
        <Text
          style={[
            type.value,
            { marginTop: 2, fontFamily: fonts.sans, fontSize: 16 },
            valueColor && { color: valueColor, fontFamily: fonts.sansSemi, fontSize: 15 },
            valueStyle,
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

export function KeyValue({ label, value, style }) {
  return (
    <View style={[{ flex: 1 }, style]}>
      <Label gold>{label}</Label>
      <Text style={[type.body, { marginTop: 4, fontSize: 16, color: colors.textStrong }]}>{value}</Text>
    </View>
  );
}

/* --------------------------------------------------------------- overlay */

export function HeroImage({ source, height = 230, children, tint = 0.55, style }) {
  return (
    <View style={[{ height, width: '100%' }, style]}>
      <Image source={source} style={FILL} resizeMode="cover" />
      <LinearGradient
        colors={[`rgba(10,40,26,${tint * 0.45})`, `rgba(8,34,22,${tint})`, `rgba(7,30,20,${Math.min(tint + 0.25, 0.95)})`]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

/* ------------------------------------------------------------ empty/misc */

export function EmptyState({ title, body, icon }) {
  return (
    <View style={s.empty}>
      {icon ? <View style={{ marginBottom: 12 }}>{icon}</View> : null}
      <Text style={[type.h3, { textAlign: 'center' }]}>{title}</Text>
      {body ? <Text style={[type.bodyMuted, { textAlign: 'center', marginTop: 6 }]}>{body}</Text> : null}
    </View>
  );
}

export function ListRow({ title, onPress, right }) {
  return (
    <Pressable onPress={onPress} style={s.listRow}>
      <Text style={[type.body, { flex: 1, color: colors.textStrong }]}>{title}</Text>
      {right ?? <ChevronRight size={18} color={colors.textMuted} strokeWidth={2} />}
    </Pressable>
  );
}

export function ProgressBar({ value, max = 1, color = colors.gold, height = 6 }) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  return (
    <View style={{ height, borderRadius: height, backgroundColor: colors.border, overflow: 'hidden' }}>
      <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: color, borderRadius: height }} />
    </View>
  );
}

export function Sheet({ visible, onClose, children, title }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={s.modalBackdrop} onPress={onClose}>
        <Pressable style={s.dialog} onPress={(e) => e.stopPropagation()}>
          {title ? (
            <View style={s.dialogHead}>
              <Text style={[type.h2, { fontSize: 20 }]}>{title}</Text>
              <Pressable onPress={onClose} hitSlop={8} style={s.dialogClose}>
                <X size={16} color={colors.textStrong} strokeWidth={2.2} />
              </Pressable>
            </View>
          ) : null}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function BottomBar({ children, style }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }, style]}>{children}</View>
  );
}

/* ---------------------------------------------------------------- styles */

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  headerBordered: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  headerBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.iconBubble,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, textAlign: 'center' },
  headerRight: { minWidth: 36, alignItems: 'flex-end' },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellMuted: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.iconBubble, borderWidth: 0 },
  bellGlass: { backgroundColor: 'rgba(255,255,255,0.22)', borderWidth: 0 },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  btn: {
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    ...shadow.card,
  },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: 12 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgePill: { paddingHorizontal: 11, paddingVertical: 4, borderRadius: radius.pill },
  badgeText: { fontFamily: fonts.sansSemi, fontSize: 11, letterSpacing: 0.1 },
  filterChip: {
    paddingHorizontal: 16,
    height: 36,
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipText: { fontFamily: fonts.sansMedium, fontSize: 13.5, color: colors.text },
  segment: {
    flexDirection: 'row',
    backgroundColor: '#E6E9E1',
    borderRadius: 14,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, fontFamily: fonts.sans, fontSize: 14.5, color: colors.textStrong, padding: 0 },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputText: { flex: 1, fontFamily: fonts.sans, fontSize: 14.5, color: colors.textStrong, padding: 0 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 14,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32 },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(12,28,20,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 20,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 22,
  },
  dialogHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  dialogClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});

export { s as uiStyles };
