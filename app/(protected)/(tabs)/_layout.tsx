import { Tabs } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, View,Text, Dimensions, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomTabBar from '@/components/ui/CustomTabBar';
import { BottomSheetModal,BottomSheetModalProvider,BottomSheetView } from "@gorhom/bottom-sheet"
import {IconProps, MicrophoneIcon, ChatCircleIcon,ChartPieSliceIcon,UserIcon,BezierCurveIcon,  PlusIcon} from "phosphor-react-native" 
import tools from '@/Utils/tools';
import ConvAiDOMComponent from '@/components/ConvAI';
import { useSpeechRecognition } from '@/components/SpeechRecognition';
import * as Speech from "expo-speech"
import { useThemeColors } from '@/hooks/useThemeColor';
import axios from 'axios';
import { BASEURL } from '@/constants/Api';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';



export default function TabLayout() {
  
  const colorScheme = useColorScheme();
  const colors  = useThemeColors();
  const [microphoneState,setMicrophoneState]=useState<IconProps>({color:colors.iconColor,weight:"thin"})
  const{handleStart,handleStop,recognizing,transcript,setTranscript}=useSpeechRecognition()

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const token = useAuthStore(state=>state.token)
  const userId = useUserStore(state=>state.id)
  const [speaking,setSpeaking]=useState(false)
  
  const snapPoints = useMemo(() => ['25%'], []);

  
  const openModal = () => {
    bottomSheetRef.current?.present();
  };
  const {width} = Dimensions.get("window")
useEffect(()=>{
  const speak=async()=>{
  if(!recognizing && transcript){
    try{
    setSpeaking(true)
    await axios.get(`${BASEURL}/ai/${userId}/voiceAi?prompt=${encodeURIComponent(transcript)}`,{headers:{"Authorization":`Bearer ${token}`}})
    .then(({data})=>{
       Speech.speak(data)
    setSpeaking(false)   
   setInterval(()=>setTranscript(""),3000)
    }) }
    catch(e){
      Alert.alert("Rating limit","You've hit your rating limit with Maya,wait for a minute and try again")
      setInterval(()=>setTranscript(""),3000)
      setInterval(()=>setSpeaking(false),57000)
    }  
  }}
  speak()
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
            <ChatCircleIcon  
              size={32} 
              color={color}
              weight="duotone"
              duotoneColor={colors.iconSecondary} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Workspace',
          tabBarIcon: ({ color, size, focused }) => (
            <ChartPieSliceIcon 
              size={32} 
              weight="duotone"
              duotoneColor={colors.iconSecondary}
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
              backgroundColor: colors.primaryButton,
              borderRadius: 25,
              padding: 8,
              elevation: 5,
              shadowColor: colors.primaryButton,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
              <PlusIcon  size={32} color="white" weight="duotone" duotoneColor={colors.iconSecondary}/>
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
            <BezierCurveIcon  
              size={32} 
              color={color} 
              weight='duotone'
              duotoneColor={colors.iconSecondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <UserIcon 
              size={32} 
              color={color}
              weight='duotone'
              duotoneColor={colors.iconSecondary} 
            />
          ),
        }}
      />
    </Tabs>
     <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.background,borderTopLeftRadius:width/2,borderTopRightRadius:width/2 }}
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
          <Pressable disabled={speaking} onPressIn={()=>{setMicrophoneState({
            weight:"bold",
            color:"blue"
          })
        handleStart()}
        }
          onPressOut={()=>{setMicrophoneState({
            weight:"thin",
            color:colors.iconColor
          })
          handleStop()}
        }
          > 
          <MicrophoneIcon size={70} weight={microphoneState.weight} color={microphoneState.color}/>
              </Pressable>
         {recognizing?<Text>Transcribing...</Text>:transcript?<Text></Text>:<Text></Text>} 
          <Text style={{color:"black"}}>{transcript}</Text> 
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