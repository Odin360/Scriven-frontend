import { useAppContext } from "@/providers/AppContext"
import { Lobby,StreamCall,useCall } from "@stream-io/video-react-native-sdk"
import { router } from "expo-router"
import { View,StyleSheet,Text } from "react-native"
export default function LobbyScreen(){
    const {call}=useAppContext()
     if (!call) {
        return (
          <View style={styles.container}>
            <Text style={styles.text}>setting call up...</Text>
          </View>
        );
      }  
     
    return(<StreamCall call={call}>
        <Lobby onJoinCallHandler={async()=>{
          await call.startTranscription({ enable_closed_captions: true });
          router.push("/call")}}/>
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