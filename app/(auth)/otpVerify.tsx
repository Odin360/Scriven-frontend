import { View, Text, Dimensions,Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import OtpBox from '@/components/OtpBox'
import CurrentScreenIndicator from '@/components/ui/CurrentScreenIndicator'
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonStyle, Texts } from '@/constants/Components'; 
import { Colors } from '@/constants/Colors';
import { router, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuthStore } from '@/store/useAuthStore';
import  Axios from 'axios';
import { BASEURL } from '@/constants/Api';
import { usePreviousNavigationName } from '@/hooks/usePreviousRouteName';
import { useUserStore } from '@/store/useUserStore';


const {width}=Dimensions.get("window")
const margin = width *0.15

const OtpVerify = () => {
  const email = useAuthStore(state=>state.email)
  const password =useAuthStore(state=>state.password)
  const setSignedIn = useAuthStore(state=>state.setSignedIn)
  const setToken = useAuthStore(state=>state.setToken)
  const token = useAuthStore(state=>state.token)
  const setUserId = useUserStore(state=>state.setUserId)
  const setUserEmail=useUserStore(state=>state.setUserEmail)
const setPassword = useAuthStore(state=>state.setPassword)
const previousRoute = usePreviousNavigationName()
  const [value1,setValue1]=useState<String>();
  const [value2,setValue2]=useState<String>();
  const [value3,setValue3]=useState<String>();
  const [value4,setValue4]=useState<String>();
  const [value5,setValue5]=useState<String>();
  const [counter,setCounter]=useState<number>(60);

  
  const onSubmit=async()=>{
    if(previousRoute==="signUp"){
    try{
await Axios.post(`${BASEURL}/auth/verifyUser`,{
  email:email,
  verificationCode:`${value1}${value2}${value3}${value4}${value5}`
}).then(
  async()=>await Axios.post(`${BASEURL}/auth/login`,{email:email,password:password})
).then(
  (response)=>setToken(response.data.token)
).then(async()=>await Axios.post(`${BASEURL}/users/user`,{email:email},{headers:{'Authorization':`Bearer ${token}`}})
).then(
  (response)=>{
    setUserId(response.data.id)
    setUserEmail(response.data.email)
  }
).
then(
  ()=>setPassword(null)
).then(()=>setSignedIn(true))
.then(
  ()=>router.replace("/(protected)/(tabs)")
)}
catch(e){
  console.log(e)
}}
else{
  try{
  await Axios.post(`${BASEURL}/auth/verifyUser`,{
    email:email,
    verificationCode:`${value1}${value2}${value3}${value4}${value5}`})
    .then(
      ()=>router.push("/(auth)/resetPassword")
    )}
    catch(e){
      console.log(e)
    }
}


  }

const resendOtp = async()=>{
  try{
await Axios.post(`${BASEURL}/auth/resendOtp`,{email:email})
.then(()=>setCounter(60))}
catch(e){
  console.log(e)
}
}

  useEffect(()=>{
    if(counter>0){
     const IntervalCounter = setInterval(()=>setCounter(counter-1),1000);
     return ()=>clearInterval(IntervalCounter)
    }
  },[counter])
  
  return (<>
  <Stack.Screen options={{headerShown:false}}/>
    <LinearGradient style={{flex:1,padding:width*0.08}} colors={Colors.light.gradientBackground}>
      <Ionicons name="arrow-back" size={24} color="black" onPress={()=>router.back()} style={{marginTop:width*0.08}}/>
      <View style={{justifyContent:"center",flexDirection:"row",gap:10,marginBottom:margin}}>
    <CurrentScreenIndicator color="white"/>
    <CurrentScreenIndicator color={Colors.light.primaryColor}/>
    <CurrentScreenIndicator color="white"/>
      </View>
      <Text  style={[{alignSelf:"center",
        textAlign:"center",
        marginBottom:width*0.08,
        color:Colors.light.secondaryTextColor},
        Texts.default]}>
        Enter the Otp we just sent 
        to your email for verification
        </Text>
        <View style={{width:width*0.85,borderRadius:18,alignItems:"center",height:width*0.8,justifyContent:"center",backgroundColor:"rgba(0,0,0,0.1)"}}>
    <View style={{justifyContent:"center",
      flexDirection:'row',
      gap:10,
      marginBottom:width*0.16}}>
      <OtpBox value={(text:String)=>setValue1(text)}/>
      <OtpBox value={(text:String)=>setValue2(text)}/>
      <OtpBox value={(text:String)=>setValue3(text)}/>
      <OtpBox value={(text:String)=>setValue4(text)}/>
      <OtpBox value={(text:String)=>setValue5(text)}/>
    </View>
    <TouchableOpacity style={ButtonStyle} onPress={onSubmit}>
      <Text style={Texts.buttonText}>Verify Email</Text>
    </TouchableOpacity>
    </View>
 <View style={{flexDirection:'row',gap:5,marginTop:width*0.08}}>   
<Text style={[Texts.default,
  {color:Colors.light.secondaryTextColor}]}>
  Didn't get OTP?
  </Text>
{counter===0&&<TouchableOpacity onPress={resendOtp}>
  <Text style={[Texts.default,
    {color:Colors.light.primaryColor}]}>Resend OTP</Text>
  </TouchableOpacity>}
  {counter>0&&<Text style={[Texts.default,
      {color:Colors.light.primaryTextColor}]}>0:{counter>9?counter:<Text>0{counter}</Text>}</Text>}
  </View>
    </LinearGradient>
    </>
  )
}

export default OtpVerify