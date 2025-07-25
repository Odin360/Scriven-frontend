import { View, Text, ActivityIndicator,StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
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


const mayaChatScreen = () => {
  const userId = useUserStore(state=>state.id)
  const teamId = useTeamStore(state=>state.id)
  const token =useAuthStore(state=>state.token)
    const {colors}=useTheme()
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
  return (<>
    <SafeAreaView style={{flex:1,paddingBottom:10}}>
       <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="android"?"height":"padding"}>
      <Channel channel={mayaChannel} audioRecordingEnabled isMessageAIGenerated={(message:any)=>!!message.ai_generated}>
         <View style={{alignItems:'center',flexDirection:"row",justifyContent: 'space-between',borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.primary,height:50,padding:10}}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>router.back()} />
            <Text style={{fontWeight:"bold",color:colors.text}}>Maya</Text>
            <Feather name="more-vertical" size={24} color="black" />
        </View>
        <MessageList/>
        <AITypingIndicatorView/>
        <MessageInput/>
      </Channel>
        </KeyboardAvoidingView>
      </SafeAreaView>
      </>
  )
}

export default mayaChatScreen