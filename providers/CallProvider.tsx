import { useCalls } from "@stream-io/video-react-native-sdk";
import { router} from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "./AppContext";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
export default function CallProvider({children}:PropsWithChildren){
     const {top} = useSafeAreaInsets()
     const calls = useCalls()
     const call = calls[0]
     const {call:call2} = useAppContext()
     const{setTranscriptUrl,setRecordingUrl}=useUserStore()
    
     useEffect(()=>{
        if(!call){
            return;
         }
        if(call.state.callingState==='ringing') 
    {router.push("/(protected)/(otherScreens)/twoCallScreen")}
        console.log(call.state.callingState)
     //console.warn('There is an active call')    
     },[call])
  
  useEffect(()=>{
   if(!call2){
    return
   }
    
    const getRecording = async()=>{const recordings = await call2.queryRecordings()
      console.log(recordings)
     if (recordings.recordings?.length > 0) {
  setRecordingUrl(recordings.recordings[0].url);
}

    }
  const unsuscribe= call2.on("call.recording_ready",()=>{getRecording()
  })
  return () => {
    unsuscribe()
      };
  
  },[call2])
   useEffect(()=>{
   if(!call2){
    return
   }
    
    const getTranscript = async()=>{const transcripts = await call2.queryTranscriptions()
      console.log(transcripts)
     if (transcripts.transcriptions?.length > 0) {
  setRecordingUrl(transcripts.transcriptions[0].url);
}

    }
  const unsuscribe= call2.on("call.transcription_ready",()=>getTranscript())
  return () => {
    unsuscribe()
      };
  
  },[call2])

    return(<> 
            {children}
        </>
    )
    
}