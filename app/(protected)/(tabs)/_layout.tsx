import { Tabs } from 'expo-router';
import React, { useCallback, useMemo, useRef } from 'react';
import { Platform, View,Text, Dimensions } from 'react-native';
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
import CustomTabBar from '@/components/ui/CustomTabBar';
import { BottomSheetModal,BottomSheetModalProvider,BottomSheetView } from "@gorhom/bottom-sheet"
 
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
// 👇 BottomSheetModal ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // 👇 Define snap points
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // 👇 Function to show the modal
  const openModal = () => {
    bottomSheetRef.current?.present();
  };
  const {width} = Dimensions.get("window")



  return (
    
    <BottomSheetModalProvider>
    <Tabs
     tabBar={(props) => <CustomTabBar {...props} />}
  screenOptions={{
    headerShown: false,
    animation: 'shift',
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
            openModal()
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
     <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{flex:1, backgroundColor: colors.card,borderTopLeftRadius:width/2,borderTopRightRadius:width/2,justifyContent:"center",alignItems:"center" }}
      >
        <BottomSheetView>
        <View style={{ alignItems:"center",justifyContent:"center",flex:1}}>
          <Text style={{ color: colors.text }}>Your Modal Content</Text>
        </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
