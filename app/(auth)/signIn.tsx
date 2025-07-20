import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {router, Stack} from "expo-router"
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ButtonStyle, Texts } from "@/constants/Components";
import { SignInSchema } from "@/constants/Schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import  Axios  from "axios";
import { BASEURL } from "@/constants/Api";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import CustomButton1 from "@/components/ui/CustomButtonOne";
import Rive,{Fit, RiveRef} from "rive-react-native"
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "@/hooks/useThemeColor";


const {width}=Dimensions.get("window")
const spaces = width*0.08


const SignIn = () => {
  const setToken = useAuthStore((state)=>state.setToken)
  const token = useAuthStore(state=>state.token)
  const setSignedIn = useAuthStore((state)=>state.setSignedIn)
  const setUserId = useUserStore(state=>state.setUserId)
  const setUserEmail = useUserStore(state=>state.setUserEmail)
  const setUsername = useUserStore(state=>state.setUsername)


   const {control,handleSubmit,formState:{errors}}=useForm({
      resolver:zodResolver(SignInSchema)
  })
  const [hidePassword, setHidePassword] = useState(true);

useEffect(()=>{
  if(errors.email||errors.password){
riveRef.current?.setInputState("State Machine 1","login_fail",true)}
},[errors])
  const onSubmit =async({email,password}:{email:string,password:string})=>{
    const emailToSend = email.toLowerCase();
    try{
    await Axios.post(`${BASEURL}/auth/login`,{email:emailToSend,password:password})
.then(
  async(response)=>{setToken(response.data.token)
  return  await axios.post(`${BASEURL}/users/user`,{email:emailToSend},{headers:{'Authorization':`Bearer ${response.data.token}`}
  }  
)})
.then(
  (response)=>{
    setUserId(response.data.id)
    setUserEmail(response.data.email)

    setUsername(response.data.username)
  }
).then(()=>riveRef.current?.setInputState("State Machine 1","login_success",true))
.then(
  ()=>setSignedIn(true)
)
.then(
  ()=>router.replace("/(protected)/(tabs)")
)}
catch(e){
  riveRef.current?.setInputState("State Machine 1","login_fail",true)
  Alert.alert("Login Error","There was an error,try again")
}
}
const colors = useThemeColors()
const riveRef = useRef<RiveRef>(null)
  return (<>
  <Stack.Screen options={{headerShown:false}}/>
   <LinearGradient colors={[colors.gradientStart,colors.background]} style={{flex:1}}>
 <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="android"?"height":"padding"}>
<ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
   
    <View style={{flex:1,alignItems:"center"}}>
      <View style={{height:width*0.7,width:width}}>
           <Rive
           ref={riveRef}
         resourceName="login_interaction"
      fit={Fit.Fill}
  />
  </View>
            <View
              style={{
  
                padding: 10,
                  backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 18,
                alignItems:"center",
                justifyContent:"center"
              }}
            >
              {/**facebook and google */}
              <View
                style={{
                  alignItems:"center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    margin: 7,
                    alignItems:"center",
                    justifyContent:"center",
                    padding: 11,
                    borderRadius: 10,
                    width: width*0.4,
                  }}
                >
                  <Entypo name="facebook" size={24} color="blue" />
                  <Text style={{ paddingLeft: 10 }}>Facebook</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    margin: 7,
                    padding: 11,
                    borderRadius: 10,
                    alignItems:"center",
                    justifyContent:"center",
                    width: width*0.4,
                  }}
                >
                  <Image
                    style={{ height: 24, width: 24 }}
                    source={{
                      uri: "https://img.icons8.com/color/512/google-logo.png",
                    }}
                  />
                  <Text style={{ paddingLeft: 10, textAlign: "center" }}>
                    Google
                  </Text>
                </View>
              </View>
              {/** facebook and google*/}

              {/**OR */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#C7D0DB" }}
                ></View>

                <Text
                  style={{
                    marginHorizontal: 10,
                    color: "#C7D0DB",
                    fontWeight: "500",
                  }}
                >
                  or
                </Text>

                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#C7D0DB" }}
                ></View>
              </View>
              {/** OR*/}
              

              {/**Email */}
               <Controller
                        name="email"
                        control={control}
                        render={({field:{value,onChange}})=>(
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  height:width*0.12,
                  marginBottom: 15,
                  width:width*0.9
                }}
              >
                <TextInput
                  placeholder="Email"
                  value={value}
                  keyboardType="email-address"
                  style={{flex:1}}
                  onFocus={()=>riveRef.current?.setInputState("State Machine 1","isFocus",true)}
                  onBlur={()=>riveRef.current?.setInputState("State Machine 1","isFocus",false)}
                  onChangeText={onChange}
                  placeholderTextColor="#C7DODB"
                />
              </View>)}/>
              {errors.email&&<Text style={Texts.error}>❗ {errors.email.message}</Text>}
              {/**Email */}

              {/**Password */}
               <Controller
                        name="password"
                        control={control}
                        render={({field:{value,onChange}})=>(
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  height:width*0.12,
                  marginBottom: 15,
                  width:width*0.9,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems:"center",
    
                }}
              >
                <TextInput
                  placeholder="Password"
                  value={value}
                  autoCorrect={false}
                  style={{flex:1,padding:10}}
                  onFocus={()=>riveRef.current?.setInputState("State Machine 1","IsPassword",true)}
                  onBlur={()=>riveRef.current?.setInputState("State Machine 1","IsPassword",false)}
                  onChangeText={onChange}
                  placeholderTextColor="#C7DODB"
                  secureTextEntry={hidePassword}
                />
            
                
                 <TouchableOpacity
  onPress={() => setHidePassword(!hidePassword)}
  style={{ padding: 5 }}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Feather
    name={hidePassword ? "eye-off" : "eye"}
    size={24}
    color="#7C8BAO"
  />
</TouchableOpacity>

              </View>)}/>
              {errors.password&&<Text style={Texts.error}>❗ {errors.password.message}</Text>}
              <TouchableOpacity style={{marginLeft:"auto",marginBottom:10}} onPress={()=>router.push("/(auth)/forgotPassword")}>
              <Text style={[Texts.default,{color:"blue"}]}>
                Forgot Password?
              </Text>
              </TouchableOpacity>
              {/**Password */}

              {/** */}

              
              {/** */}

              {/** */}
              <CustomButton1
              label="Sign In"
              width={250}
              height={55}
              style={{marginBottom:20}}
              textStyle={{fontSize:18}}
                 onPress={handleSubmit(onSubmit)}
             />
                
              {/** */}

              {/** */}
              <View style={{flexDirection:"row"}}>
                <Text style={[{ color: "white", textAlign: "center" },Texts.default]}>
                  Don't have an account?{" "}</Text>
                  <TouchableOpacity onPress={()=>router.push("/(auth)/signUp")}>
                  <Text style={[{ color: "blue" },Texts.default]}>Sign Up</Text>
                  </TouchableOpacity>
              </View>

              {/** */}
            </View>
           </View>
           </ScrollView>
           </KeyboardAvoidingView>
           </LinearGradient>
            </>
    
  );
};

export default SignIn;