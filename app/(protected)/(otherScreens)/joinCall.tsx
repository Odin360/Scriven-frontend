import { router } from "expo-router"
import { useState } from "react"
import {Text,View,TextInput, TouchableOpacity} from "react-native"
export default function JoinCall(){
    const [meetingID,setMeetingID]=useState("")
    return(
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Text>Please enter Meeting ID to join Meeting</Text>
    <TextInput
    placeholder="ScrivenMeetingID://"
    style={{borderColor:"blue",borderRadius:25,borderWidth:2}}
    onChangeText={setMeetingID}
    />
    <TouchableOpacity onPress={()=>router.push({pathname:"/call",params:{meetingID}})}>
        <Text>JoinMeeting</Text>
    </TouchableOpacity>
    </View>
    )
}