/** Bottom tab bar — Home · Leads · Visits · Inventory · Profile */
import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, Platform } from 'react-native';
import { House, Users, MapPin, Layers, User } from 'lucide-react-native';
import { colors, fonts } from '../../src/theme';

// Active tab sits in a dark-green rounded square with a white glyph (Figma tab bar).
const tabIcon = (Icon) =>
  function TabIcon({ focused }) {
    return (
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: focused ? colors.primary : 'transparent',
        }}
      >
        <Icon size={20} color={focused ? colors.onDark : '#9AA39D'} strokeWidth={1.8} />
      </View>
    );
  };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9AA39D',
        tabBarLabel: ({ focused, children }) => (
          <Text
            style={{
              fontFamily: focused ? fonts.sansSemi : fonts.sansMedium,
              fontSize: 10.5,
              marginTop: 3,
              color: focused ? colors.textStrong : '#9AA39D',
            }}
          >
            {children}
          </Text>
        ),
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: tabIcon(House) }} />
      <Tabs.Screen name="leads" options={{ title: 'Leads', tabBarIcon: tabIcon(Users) }} />
      <Tabs.Screen name="visits" options={{ title: 'Visits', tabBarIcon: tabIcon(MapPin) }} />
      <Tabs.Screen name="inventory" options={{ title: 'Inventory', tabBarIcon: tabIcon(Layers) }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: tabIcon(User) }} />
    </Tabs>
  );
}
