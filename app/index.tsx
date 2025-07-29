import { View, Text,Dimensions, Button } from 'react-native'
import {useEventListener} from 'expo'
import React, { useCallback, useRef } from 'react'
import { Redirect, router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {useVideoPlayer, VideoView} from 'expo-video'
import { useAuthStore } from '@/store/useAuthStore'
import  { BottomSheetModal } from '@gorhom/bottom-sheet'
import { ThemedView } from '@/components/ThemedView'
const {width,height} = Dimensions.get("window")
 const video = require("@/assets/videos/DIN.mp4")

 
const SplashScreen = () => {


const signedIn = useAuthStore((state)=>state.signedIn)

 const player = useVideoPlayer(video,player=>{
  player.loop=false
  player.play()
 })
 useEventListener(player,'statusChange',({status})=>{
  console.log("player status changed:",status)
  if(status==="idle"){
    if(signedIn){
      router.replace("/(protected)/(tabs)")
    }
    else{
      router.replace("/(auth)/signIn")
    }
  }
 })
  return (
  <>
  <Redirect href={"/(auth)/signIn"}/>
  <StatusBar hidden={true}/>
  
  <Stack.Screen options={{headerShown:false}}/>
    <View style={{flex:1,backgroundColor:'white'}}>
      <VideoView player={player} contentFit="cover" nativeControls={false} style={{height:height,width:width,position:'absolute'
      }} /> 
    </View>
    </>
  )
}
export default SplashScreen
