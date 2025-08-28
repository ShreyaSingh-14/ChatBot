import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={'black'} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => <IconSymbol size={28} name="paperplane.fill" color={'black'} />,
        }}
      />
       <Tabs.Screen
        name="test"
        options={{
          title: 'test',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={'black'} />,
        }}
      />
       <Tabs.Screen
        name="test2"
        options={{
          title: 'test2',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={'blue'} />,
        }}
      />
       <Tabs.Screen
        name="AR_VR"
        options={{
          title: 'AR_VR',
          tabBarIcon: () => <IconSymbol size={28} name="paperplane.fill" color={'black'} />,
        }}
      />
    </Tabs>
  );
}
