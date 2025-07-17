import { Tabs } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, View,Text, Dimensions, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
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
import {IconProps, MicrophoneIcon} from "phosphor-react-native" 
import tools from '@/Utils/tools';
import ConvAiDOMComponent from '@/components/ConvAI';
import { useSpeechRecognition } from '@/components/SpeechRecognition';
import * as Speech from "expo-speech"


export default function TabLayout() {
  const [microphoneState,setMicrophoneState]=useState<IconProps>({color:"white",weight:"thin"})
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const{handleStart,handleStop,recognizing,transcript,setTranscript}=useSpeechRecognition()
// 👇 BottomSheetModal ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // 👇 Define snap points
  const snapPoints = useMemo(() => ['25%'], []);

  // 👇 Function to show the modal
  const openModal = () => {
    bottomSheetRef.current?.present();
  };
  const {width} = Dimensions.get("window")
useEffect(()=>{
  if(!recognizing && transcript){
    Speech.speak(transcript)
    if(!Speech.isSpeakingAsync) setTranscript("")    
  }
},[transcript,recognizing])


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
        backgroundStyle={{ backgroundColor: colors.card,borderTopLeftRadius:width/2,borderTopRightRadius:width/2 }}
      >
        <BottomSheetView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <View
        style={styles.domComponentContainer}>
          {/*
         <ConvAiDOMComponent
            dom={{ style: styles.domComponent }}
            platform={Platform.OS}
            get_battery_level={tools.get_battery_level}
            change_brightness={tools.change_brightness}
            flash_screen={tools.flash_screen}
          />*/}
          <Pressable onPressIn={()=>{setMicrophoneState({
            weight:"bold",
            color:"blue"
          })
        handleStart()}
        }
          onPressOut={()=>{setMicrophoneState({
            weight:"thin",
            color:"white"
          })
          handleStop()}
        }
          > 
          <MicrophoneIcon size={70} weight={microphoneState.weight} color={microphoneState.color}/>
              </Pressable>
         {recognizing?<Text>Transcribing...</Text>:<Text>Hold the button to talk with maya</Text>} 
          <Text style={{color:"white"}}>{transcript}</Text> 
        </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles= StyleSheet.create({
    domComponentContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
    domComponent: {
    width: 120,
    height: 120,
  },

})