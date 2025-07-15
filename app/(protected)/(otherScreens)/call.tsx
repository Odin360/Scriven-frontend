import {View,Text,StyleSheet} from "react-native"
import {router, useLocalSearchParams} from "expo-router"
import {StreamCall,CallContent, useStreamVideoClient,CallingState, Call} from "@stream-io/video-react-native-sdk"
import { useEffect,useState } from "react";
import { CustomCallRecordButton } from "@/components/ui/CallRecordingButton";
export default function CallScreen(){
    const client = useStreamVideoClient()
    const {meetingID} = useLocalSearchParams()
   console.log(meetingID)
    const [call,setCall]=useState<null | Call>(null)
    useEffect(() => {
    const _call = client?.call('default', meetingID);
    _call?.join({ create: true })
      .then(() => setCall(_call));
  }, [client, meetingID]);

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
        <Text style={styles.text}>Joining call...</Text>
      </View>
    );
  }
    return (
    <StreamCall call={call}>
      <View style={{flex:1}}>
      <CustomCallRecordButton/>
   <CallContent onHangupCallHandler={()=>router.back()}/>
   </View>
    </StreamCall>)
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