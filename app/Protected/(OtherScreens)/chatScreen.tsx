import { View, Text, ActivityIndicator,StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'
import { useAppContext } from '@/providers/AppContext'
import { router } from 'expo-router'
import { Ionicons,Feather } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUserStore } from '@/store/useUserStore'

const chatScreen = () => {
  const userId = useUserStore(state=>state.id)
    const {colors}=useTheme()
    const {channel,setThread}=useAppContext()
    if(!userId)return
    if (!channel){
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
            <ActivityIndicator/>
            </View>
        )
    }

  return (<>
    <SafeAreaView style={{flex:1,paddingBottom:10}}>
     
      <Channel channel={channel} audioRecordingEnabled>
         <View style={{alignItems:'center',flexDirection:"row",justifyContent: 'space-between',borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.primary,height:50,padding:10}}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>router.back()} />
            <Text style={{fontWeight:"bold",color:colors.text}}>ChatScreen</Text>
            <Feather name="more-vertical" size={24} color="black" />
        </View>
        <MessageList onThreadSelect={(message)=>{
if(channel){
    console.log(channel)
    setThread(message)
    router.push("/Protected/threadScreen")
}
        }}/>
        <MessageInput/>
      </Channel>
      </SafeAreaView>
      </>
  )
}

export default chatScreen