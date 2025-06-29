import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import ChatProvider from '@/providers/ChatProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarButton: HapticTab,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            height: 60,
            paddingBottom: 5,
          },
          android: {
            position: 'absolute',
            backgroundColor: 'transparent',
            height: 60,
            paddingBottom: 5,
          },
          default: {},
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
     
      <Tabs.Screen
        name="talk"
        options={{
          tabBarBadge: "2",
          title: 'Chat',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "chatbubbles" : "chatbubbles-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Workspace',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name={focused ? "workspaces-filled" : "workspaces-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      /> 
      <Tabs.Screen
        name="button"
        options={{
          title: '',
          tabBarLabel: "",
          tabBarIconStyle: { height: 50, width: 50, position: "absolute" },
          tabBarIcon: ({ color, size }) => (
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 25,
              padding: 8,
              elevation: 5,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
              <AntDesign name="plus" size={30} color="white" />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
          }
        }}
      /> 
      <Tabs.Screen
        name="team"
        options={{
          title: 'Team',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "account-group" : "account-group-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "account" : "account-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
    
  );
}
