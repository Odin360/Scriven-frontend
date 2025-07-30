import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useVideoPlayer,VideoView } from 'expo-video'
import { router, Stack } from 'expo-router'
import {Texts,ButtonStyle} from "@/constants/Components"
import {Colors} from "@/constants/Colors"
import { useThemeColors } from '@/hooks/useThemeColor'

const {width,height}=Dimensions.get("window");
const spaces = width * 0.08

const landingPage = () => {
  const colors=useThemeColors()
  const video = require("@/assets/videos/Landing.mp4")
  const player = useVideoPlayer(video,player=>{
  player.loop=true
  player.play()
 })
  return (
     <>
      <Stack.Screen options={{headerShown:false}}/>
        <View style={{flex:1,backgroundColor:'white'}}>
          <VideoView player={player} contentFit="cover" nativeControls={false} style={{height:height,width:width,position:'absolute'
          }} /> 
          <View style={{alignItems:"center",justifyContent:"center",flex:1,padding:width*0.08}}>
          <Text style={[Texts.title,{marginBottom:spaces,textAlign:"center",color:colors.secondaryButton}]}>Welcome to Scriven</Text>
          <Text style={[Texts.defaultSemiBold,{marginBottom:spaces,textAlign:"center"}]}>Are you looking for a way to manage your team?</Text>
          <Text style={[Texts.defaultSemiBold,{marginBottom:spaces,textAlign:"center"}]}>Get started and we'll provide you with everything you need</Text>
          <TouchableOpacity onPress={()=>router.replace("/(auth)/onBoarding")} style={ButtonStyle}>
            <Text style={Texts.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <View style={[{flexDirection:"row",marginTop:spaces}]}>
          <Text style={[Texts.defaultSemiBold]}>Do you already have an account ? </Text>
          <TouchableOpacity onPress={()=>router.replace("/")}>
          <Text style={[Texts.default,{color:colors.primaryButton}]}>SignIn</Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
        </>
      )
  
}

export default landingPage