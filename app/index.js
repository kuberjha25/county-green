/** Splash screen — county-green-screen-01 */
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { images } from '../data';
import { colors } from '../src/theme';

const FILL = { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' };

// logo-lockup.png is 885x759
const LOGO_RATIO = 759 / 885;

export default function Splash() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  // Design: ~198px wide on a 390px screen, centred on screen
  const logoW = Math.min(width * 0.51, 240);

  useEffect(() => {
    const t = setTimeout(() => router.replace('/(auth)/login'), 2200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <View style={s.root}>
      <StatusBar style="light" />
      <Image source={images.splashBg} style={FILL} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(153,115,26,0.35)', 'rgba(26,64,26,0.55)', 'rgba(5,33,18,0.88)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={s.center} pointerEvents="none">
        <Image
          source={images.logoLockup}
          style={{ width: logoW, height: logoW * LOGO_RATIO }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primaryRich },
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
});
