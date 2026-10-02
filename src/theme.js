/**
 * County Green — design tokens lifted from the Figma file.
 *
 * FONTS
 * -----
 * `fonts.serif` / `fonts.sans` are the only two places a font name appears in
 * this app. To swap in the real brand font, drop the .ttf files into
 * assets/fonts/, register them in app/_layout.js, and change the strings here.
 */

export const colors = {
  // Brand greens
  primary: '#0B3A22',        // primary buttons, dark surfaces
  primaryDeep: '#0A3D2A',    // dark stat cards, registration header
  primaryRich: '#0D4731',    // thank-you / full-bleed green screens
  primarySoft: '#194937',
  primaryTint: '#E8EEEA',    // icon bubbles on light cards
  iconBubble: '#E8EAE3',     // grey header back/bell bubbles
  primaryTintAlt: '#E6F0E9',

  // Gold
  gold: '#C49A45',
  goldDark: '#A8822F',
  goldTint: '#F6EEDD',
  goldBorder: '#E3CDA0',

  // Neutrals
  bg: '#F7F8F2',             // app background
  surface: '#FFFFFF',
  surfaceAlt: '#F2F3EC',
  border: '#E4E6DC',
  borderStrong: '#D3D7CA',
  divider: '#EDEEE6',

  // Text
  text: '#1C241F',
  textStrong: '#0B2018',
  textMuted: '#6B7570',
  textFaint: '#9AA39D',
  onDark: '#FFFFFF',
  onDarkMuted: 'rgba(255,255,255,0.72)',

  // Status
  success: '#2E7D32',
  successBg: '#E8F5E9',
  successBgAlt: '#E3F1E5',
  warn: '#B45309',
  warnBg: '#FCEFC7',
  danger: '#DC2626',
  dangerBg: '#FEE2E2',
  info: '#0F766E',
  infoBg: '#DDF0EE',
  coolBg: '#E8EDF3',
  coolText: '#4B5A66',

  // Chips / badges
  pendingBg: '#F6EEDD',
  pendingText: '#B98A30',
  approvedBg: '#DDEFE2',
  approvedText: '#1F7A3A',

  // Avatars
  avatarGold: '#F6EFE2',
  avatarGoldText: '#C49A45',
  avatarTeal: '#6CBDB2',
  avatarSage: '#8FA896',

  overlay: 'rgba(10, 26, 18, 0.55)',
  shadow: '#0B2018',
};

export const fonts = {
  // Display serif — Lora, matching the Figma headings.
  serif: 'Lora_400Regular',
  serifMedium: 'Lora_500Medium',
  serifSemi: 'Lora_600SemiBold',
  serifBold: 'Lora_700Bold',
  serifItalic: 'Lora_400Regular_Italic',

  // UI sans — confirmed Inter from the Figma text styles.
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemi: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
};

export const spacing = {
  screenX: 24,
  gap: 12,
  section: 24,
};

export const shadow = {
  card: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  raised: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
};

export const type = {
  // Serif display
  display: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 42, color: colors.textStrong },
  h1: { fontFamily: fonts.serif, fontSize: 30, lineHeight: 38, color: colors.textStrong },
  h2: { fontFamily: fonts.serif, fontSize: 22, lineHeight: 29, color: colors.textStrong },
  h3: { fontFamily: fonts.serifMedium, fontSize: 18, lineHeight: 24, color: colors.textStrong },
  screenTitle: { fontFamily: fonts.serif, fontSize: 18, lineHeight: 24, color: colors.textStrong },

  // Sans
  body: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.text },
  bodyMuted: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textMuted },
  small: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textMuted },
  tiny: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 15, color: colors.textMuted },
  label: {
    fontFamily: fonts.sansSemi,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.9,
    color: colors.textMuted,
  },
  labelGold: {
    fontFamily: fonts.sansSemi,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.9,
    color: colors.gold,
  },
  value: { fontFamily: fonts.sansMedium, fontSize: 15, lineHeight: 21, color: colors.textStrong },
  button: { fontFamily: fonts.sansSemi, fontSize: 15, letterSpacing: 0.2 },
};

export default { colors, fonts, radius, spacing, shadow, type };
