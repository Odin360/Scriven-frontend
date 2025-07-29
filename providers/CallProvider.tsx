import { useCalls } from "@stream-io/video-react-native-sdk";
import { router} from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function CallProvider({children}:PropsWithChildren){
     const {top} = useSafeAreaInsets()
     const calls = useCalls()
     const call = calls[0]
     
    
     useEffect(()=>{
        if(!call){
            return;
         }
        if(call.state.callingState==='ringing') 
    {router.push("/(protected)/(otherScreens)/twoCallScreen")}
        console.log(call.state.callingState)
     //console.warn('There is an active call')    
     },[call])
     

    return(<> 
            {children}
        </>
    )
    
}