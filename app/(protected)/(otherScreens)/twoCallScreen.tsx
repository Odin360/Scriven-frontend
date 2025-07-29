import {
    RingingCallContent,
    StreamCall,
    useCalls,
  } from "@stream-io/video-react-native-sdk";
import { router, useLocalSearchParams } from "expo-router";

  
  export default function OneOnOne() {
    const calls = useCalls().filter((c)=>c.ringing)
    const call = calls[0]
    console.log(call)
  
    if (!call) 
      {if(router.canGoBack()){
       return router.back()
      }
    else{
     return router.push('/');
    }}   
    return (
        <StreamCall call={call}><RingingCallContent onBackPress={()=>router.back()}/></StreamCall>

    );
  }