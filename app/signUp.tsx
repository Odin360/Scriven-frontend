import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import {router, Stack} from "expo-router"
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ButtonStyle, Texts } from "@/constants/Components";
import {SignUpSchema } from '@/constants/Schema'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Axios from "axios";
import { BASEURL } from "@/constants/Api";
import { useAuthStore } from "@/store/useAuthStore";

const {width}=Dimensions.get("window")
const spaces = width*0.08
const setEmail = useAuthStore((state)=>state.setEmail)
const setPassword =useAuthStore((state)=>state.setPassword)
const SignUp = () => {
const onSubmit =async (data:any)=>{
  try{
  await Axios.post(`${BASEURL}/auth/signUp`,{
  username:data.username,email:data.email,password:data.password
 }).then(()=>{
  setEmail(data.email)
  setPassword(data.password)
 }
 ).then(()=>router.push("/otpVerify"))}
 catch(e){
console.log(e)
 }
 
}

 const {control,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(SignUpSchema)
})
 
  const [hidePassword, setHidePassword] = useState(true);
  

  return (<>
  <Stack.Screen options={{headerShown:false}}/>
  
    <ParallaxScrollView 
       headerBackgroundColor={{dark:"white",light:"white"}}
       headerImage={<Image source={require("@/assets/images/image.jpg")} style={{height:width,width:width}}/>}>
               <View
                 style={{
                   marginTop: spaces,
                   padding: 10,
                   margin: 10,
                   backgroundColor: "rgba(0,0,0,0.1)",
                   borderRadius: 18,
                   alignItems:"center",
                   justifyContent:"center"
                 }}
               >
       
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
              
          <Controller
          name="username"
          control={control}
          render={({field:{value,onChange}})=>(
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  marginBottom: 15,
                  width:"100%"
                }}
              >
                <TextInput
                  placeholder="Username"
                  style={{flex:1}}
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="#C7DODB"
                />
              </View>

          )}
          />
          {errors.username&&<Text style={Texts.error}>❗ {errors.username.message}</Text>}
          

            
               <Controller
          name="email"
          control={control}
          render={({field:{value,onChange}})=>(
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  marginBottom: 15,
                  width:"100%"
                }}
              >
                <TextInput
                  placeholder="Email"
                  value={value}
                  keyboardType="email-address"
                  style={{flex:1}}
                  onChangeText={onChange}
                  placeholderTextColor="#C7DODB"
                />
              </View>)}/>
              {errors.email&&<Text style={Texts.error}>❗ {errors.email.message}</Text>}
              

              
               <Controller
          name="password"
          control={control}
          render={({field:{value,onChange}})=>(
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  alignItems:"center",
                  width:"100%"
                }}
              >
                <TextInput
                  placeholder="Password"
                  value={value}
                  autoCorrect={false}
                  style={{flex:1,padding:10}}
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
              

              

              
                
                  <Text style={[Texts.default,{color:"white",textAlign:"center",marginVertical:spaces}]}>
                    By clicking create account you agree to The{" "}
                    <Text style={{ color: "blue" }}>Terms of Service</Text> and{" "}
                    <Text style={{ color: "blue" }}>Privacy Policy</Text>
                  </Text>
              
              

        
              <TouchableOpacity
              onPress={handleSubmit(onSubmit,(formErrors)=>{
                console.log(formErrors)
              })}
                style={[ButtonStyle,{marginBottom:spaces}]}
              >
                <Text style={Texts.buttonText}>
                  Create Account
                </Text>
              </TouchableOpacity>
              

              
              <View style={{flexDirection:"row"}}>
                <Text style={[{ color: "white", textAlign: "center" },Texts.default]}>
                  Do you already have an account?{" "}</Text>
                  <TouchableOpacity onPress={()=>router.push("/signIn")}>
                  <Text style={[{ color: "blue" },Texts.default]}>Sign in</Text>
                  </TouchableOpacity>
              </View>

              
            </View>
          </ParallaxScrollView>
            </>
    
  );
};

export default SignUp;