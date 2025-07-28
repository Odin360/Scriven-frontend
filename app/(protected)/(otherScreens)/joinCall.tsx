import { AppContext, useAppContext } from "@/providers/AppContext"
import { Call, useStreamVideoClient } from "@stream-io/video-react-native-sdk"
import { router } from "expo-router"
import { useState } from "react"
import {Text,View,TextInput, TouchableOpacity} from "react-native"
export default function JoinCall(){
     const client = useStreamVideoClient()
     const {call,setCall}=useAppContext()
    const [meetingID,setMeetingID]=useState("")
    
    const CreateCall=()=>{
     const callOne = client?.call('default', meetingID);
     if(!callOne) return
     setCall(callOne)
    }

    return(
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Text>Please enter Meeting ID to join Meeting</Text>
    <TextInput
    placeholder="ScrivenMeetingID://"
    style={{borderColor:"blue",borderRadius:25,borderWidth:2}}
    onChangeText={setMeetingID}
    />


    <TouchableOpacity onPress={()=>{
        CreateCall()
        router.push("/(protected)/(otherScreens)/lobby")}}>
        <Text>JoinMeeting</Text>
    </TouchableOpacity>
    </View>
    )
}