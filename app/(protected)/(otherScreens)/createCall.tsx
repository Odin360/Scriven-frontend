import {View,Text,TouchableOpacity} from "react-native"
import axios from "axios"
import { BASEURL } from "@/constants/Api"
import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"
import * as Clipboard from "expo-clipboard"
export default function CreateCall(){
    const [meetingID,setMeetingID]=useState("")
    const token = useAuthStore(state=>state.token)
    const GenerateMeetingID=async()=>{
  const {data}=await axios.get(`${BASEURL}/users/generateRandomUUID`,{headers:{"Authorization":`Bearer ${token}`}})
    setMeetingID(data)
    }
    const CopyMeetingCode=async()=>{
     await Clipboard.setStringAsync(meetingID)
    }
    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontWeight:"bold",fontSize:20}}>
                Create a new meeting ID
            </Text>
             <Text style ={{color:"grey"}}>
                Old meeting IDs can be used
            </Text>
            <TouchableOpacity onPress={GenerateMeetingID}>
                <Text>Generate Meeting ID</Text>
            </TouchableOpacity>
            {meetingID&&<View style={{flexDirection:"row",gap:5}}>
                <Text>{meetingID}</Text>
                <TouchableOpacity onPress={CopyMeetingCode}>
                    <Text>Copy</Text></TouchableOpacity></View>}
        </View>
    )
}