import {View,Text,StyleSheet} from "react-native"
import {router, useLocalSearchParams} from "expo-router"
import {StreamCall,CallContent, useStreamVideoClient,CallingState, Call,useCall} from "@stream-io/video-react-native-sdk"
import { useEffect,useRef,useState } from "react";
import CustomCallControls from "@/components/ui/CustomCallControls";
import CallHeader from "@/components/ui/CallHeader";
import CallDurationBadge from "@/components/ui/CallDuration";
import CallSummary from "@/components/ui/CallSummary";
import { fa } from "zod/v4/locales";
import { useAppContext } from "@/providers/AppContext";
export default function CallScreen(){
    const client = useStreamVideoClient()
    const joinCallPressed=useRef(false)
    const {meetingID}:any = useLocalSearchParams()
   console.log(meetingID)
   const {call}=useAppContext()
    //const [call,setCall]=useState<null | Call>(null)
  // useEffect(() => {
 // if (!client || !meetingID || call) return;
  //const _call = client.call('default', meetingID);
 //_call.join({ create: true }).then(() => {
  //}).catch((err) => {
   // console.error("Error joining call:", err);
  ///})

  // setCall(_call);
//}, [client, meetingID, call]);


  useEffect(() => {
    return () => {
      // cleanup the call on unmount if the call was not left already
      if (call?.state.callingState !== CallingState.LEFT) {
        call?.leave();
      }
    };
  }, [call]);
  
  if (!call) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>setting call up...</Text>
      </View>
    );
  }  
    return (
    <StreamCall call={call}>          
            <CallHeader>
      <CallDurationBadge/>
      <CallSummary/>
      </CallHeader>
   <CallContent CallControls={CustomCallControls} onHangupCallHandler={()=>router.back()}/>
    </StreamCall>

   )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontWeight:"bold"
    }
})