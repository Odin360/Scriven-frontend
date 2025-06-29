import React, { useEffect, useState } from 'react';
import {router, Stack} from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';
import { Controller } from "react-hook-form";
import { ResetPasswordSchema } from '@/constants/Schema';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ButtonStyle, Texts } from '@/constants/Components';
import { Colors } from '@/constants/Colors';
import GlassView from '@/components/ui/GlassView';
import Feather from '@expo/vector-icons/Feather';
import { useAuthStore } from '@/store/useAuthStore';
import Axios from 'axios'
import { BASEURL } from '@/constants/Api';


const ResetPassword = () => {
   const {control,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(ResetPasswordSchema)
})



  const [hideNewPassword,setHideNewPassword]=useState(true);
    const [hideConfirmPassword,setHideConfirmPassword]=useState(true);
const email = useAuthStore(state=>state.email)
  const {width}=Dimensions.get("window");
  const spaces = width *0.08
const onSubmit =async(data:any)=>{
  try{
 await Axios.post(`${BASEURL}/auth/resetPassword`,{email:email,password:data.newPassword})
 .then(
  ()=>router.replace("/")
 )}
 catch(e){
  console.log(e)
 }
}
 

  return (<>
         <Stack.Screen options={{headerShown:false}}/>  
    <LinearGradient colors={Colors.light.gradientBackground} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
          >
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.rectangles}>
              <View style={styles.rectangle} />
              <View style={styles.rectangle} />
              <View style={[styles.rectangle,styles.activeRectangle]} />
            </View>

            <Text style={[Texts.default,{color:"white",textAlign:"center",marginBottom:spaces}]}>
              Enter your new password in order to reset your password 
            </Text>

            <View style={{width:width*0.85,borderRadius:18,alignItems:"center",height:width*0.8,justifyContent:"center",backgroundColor:"rgba(0,0,0,0.1)",alignSelf:"center"}}>
                    <Controller
                             name="newPassword"
                             control={control}
                             render={({field:{value,onChange}})=>(
                   <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: spaces,
                  alignItems:"center",
                  width:width*0.8
                }}
              >
                <TextInput
                  placeholder="New Password"
                  value={value}
                  autoCorrect={false}
                  style={{flex:1,padding:10}}
                  onChangeText={onChange}
                  placeholderTextColor="#C7DODB"
                  secureTextEntry={hideNewPassword}
                />
            
                
                 <TouchableOpacity
  onPress={() => setHideNewPassword(!hideNewPassword)}
  style={{ padding: 5 }}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Feather
    name={hideNewPassword ? "eye-off" : "eye"}
    size={24}
    color="#7C8BAO"
  />
</TouchableOpacity>

              </View>)}/>
                {errors.newPassword && (
                  <Text style={Texts.error}>❗ {errors.newPassword.message}</Text>
                )}
                 <Controller
                          name="confirmPassword"
                          control={control}
                          render={({field:{value,onChange}})=>(
                    <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: spaces,
                  alignItems:"center",
                  width:width*0.8
                }}
              >
                <TextInput
                  placeholder="Confirm Password"
                  value={value}
                  autoCorrect={false}
                  style={{flex:1,padding:10}}
                  onChangeText={onChange}
                  placeholderTextColor="#C7DODB"
                  secureTextEntry={hideConfirmPassword}
                />
            
                
                 <TouchableOpacity
  onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
  style={{ padding: 5 }}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Feather
    name={hideConfirmPassword ? "eye-off" : "eye"}
    size={24}
    color="#7C8BAO"
  />
</TouchableOpacity>

              </View>)}/>
              {errors.confirmPassword&&<Text style={Texts.error}>❗ {errors.confirmPassword.message}</Text>}
                <TouchableOpacity
                  style={ButtonStyle}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={Texts.buttonText}>
                   Reset Password
                  </Text>
                </TouchableOpacity>
              </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems:"center"
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  backButton: {
    marginTop: 10,
  },
  rectangles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  rectangle: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: "white",
    marginHorizontal: 6,
  },
  activeRectangle: {
    backgroundColor: '#3461FD',
  },
  title: {
    fontFamily: 'poppins',
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 60,
    fontWeight: '400',
  },
  cardWrapper: {
    borderRadius: 30,
    shadowColor: '#0000001A',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    padding: 20,
    borderRadius: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 24,
    color: '#7C8BA0'
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3461FD',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: 'poppins',
    fontSize: 16,
  },
});

export default ResetPassword;

