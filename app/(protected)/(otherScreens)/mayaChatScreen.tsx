import { View, Text, ActivityIndicator,StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { AITypingIndicatorView, Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'
import { useAppContext } from '@/providers/AppContext'
import { router } from 'expo-router'
import { Ionicons,Feather } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUserStore } from '@/store/useUserStore'
import axios from 'axios'
import { BASEURL } from '@/constants/Api'
import { useAuthStore } from '@/store/useAuthStore'
import { useTeamStore } from '../../../store/useTeamStore'
import { useThemeColors } from '@/hooks/useThemeColor'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowLeftIcon } from 'phosphor-react-native'


const mayaChatScreen = () => {
  const userId = useUserStore(state=>state.id)
  const teamId = useTeamStore(state=>state.id)
  const token =useAuthStore(state=>state.token)
    const colors = useThemeColors()
    const {channel:mayaChannel}:any=useAppContext()
    
    if(!userId)return
   

    useEffect(()=>{
    const HandleMessage=async(event:any)=>{
       if(!mayaChannel)return
       console.log(event)
        const message =event.message
          console.log('User message received:',message.text)
         
 if(message&&message.text&&message.text.trim()!==""&&message.user.id===userId){
         console.log(mayaChannel.id)
try{if(teamId){
  console.log("team available")
  await axios.get(`${BASEURL}/ai/${mayaChannel.id}/${userId}/${teamId}/askAi?prompt=${encodeURIComponent(message.text)}`,{headers:{"Authorization":`Bearer ${token}`}})
}
else{
   console.log("team not available")
   await axios.get(`${BASEURL}/ai/${mayaChannel.id}/${userId}/askAi?prompt=${encodeURIComponent(message.text)}`,{headers:{"Authorization":`Bearer ${token}`}})
}

}
catch(e){
  console.log(e)
}}}
mayaChannel.on('message.new',HandleMessage)
return()=>{mayaChannel.off('message.new',HandleMessage)}
},[mayaChannel])

    if (!mayaChannel){
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
            <ActivityIndicator/>
            </View>
        )
    }
    const {width}=Dimensions.get("window")
  return (<>
    
       <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="android"?"height":"padding"}>
      <Channel channel={mayaChannel}  isMessageAIGenerated={(message:any)=>!!message.ai_generated}>
         <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={[colors.gradientStart,colors.gradientMiddle,colors.gradientEnd]} style={{alignItems:'center',flexDirection:"row",borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.border,height:width*0.2,padding:10,gap:20}}>
        <TouchableOpacity onPress={()=>router.back()}>
        <ArrowLeftIcon size={24} color={colors.iconColor} weight='fill' />
            </TouchableOpacity>
            <Text style={{fontWeight:"bold",color:colors.textPrimary}}>Maya</Text>
        </LinearGradient>
        <MessageList/>
        <AITypingIndicatorView/>
        <MessageInput/>
      </Channel>
        </KeyboardAvoidingView>
      
      </>
  )
}

export default mayaChatScreen