import { useUserStore } from "@/store/useUserStore";
import {TokenProvider} from "@/Utils/tokenProvider";
import { apiKey } from "./ChatProvider";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator,View } from "react-native";
import { useAuthStore } from "@/store/useAuthStore";






export default function VideoProvider({children}:PropsWithChildren){
const[videoClient,setVideoClient]=useState<StreamVideoClient | null>(null) 
const userId = useUserStore(state=>state.id)
const token = useAuthStore(state=>state.token)
const username = useUserStore(state=>state.username)

useEffect(()=>{
   
const user: User|any = { id: userId,name:username };
    const initVideoClient = async()=>{ 
        if (!userId||!username||!token)
            {return}
  try{
    const tokenValue = await TokenProvider(userId,token)
    const client = StreamVideoClient.getOrCreateInstance({ apiKey,user,token:tokenValue});
    
    
    setVideoClient(client)
  }catch(e){console.error(e)}}

    initVideoClient()
    return (()=>{
        if(videoClient){
            videoClient.disconnectUser()
        }
    })

},[userId])

  if (!videoClient){
    return( <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><ActivityIndicator size={"large"}/></View>)
  }

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
}