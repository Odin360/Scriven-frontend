import React, { useEffect } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ButtonStyle, Texts } from '@/constants/Components';
import { Colors } from '@/constants/Colors';
import { EmailSchema} from '@/constants/Schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Axios from 'axios'
import { BASEURL } from '@/constants/Api';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeColors } from '@/hooks/useThemeColor';

const ForgotPasswordScreen = () => {
  const setEmail = useAuthStore(state=>state.setEmail)
 const {control,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(EmailSchema)
})
  const {width}=Dimensions.get("window");
const spaces = width * 0.08
  const onSubmit = async (data: { email: string }) =>{ 
    try{
    await Axios.post(`${BASEURL}/auth/verifyEmail`,{email:data.email})
    .then(()=>setEmail(data.email))
    .then(()=>router.push("/(auth)/otpVerify"))}
    catch(e){
      console.log(e)
    }
  }
const colors=useThemeColors()
  return (<>
         <Stack.Screen options={{headerShown:false}}/>  
    <LinearGradient colors={[colors.gradientMiddle,colors.background]} style={styles.gradient}>
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
              <View style={[styles.rectangle, styles.activeRectangle]} />
              <View style={styles.rectangle} />
              <View style={styles.rectangle} />
            </View>

            <Text style={[Texts.default,{color:"white",alignSelf:"center",marginBottom:spaces}]}>
              Please enter your email for verification
            </Text>

            <View style={{width:width*0.85,borderRadius:18,alignItems:"center",height:width*0.5,justifyContent:"center",backgroundColor:"rgba(0,0,0,0.1)"}}>
               <Controller
          name="email"
          control={control}
          render={({field:{value,onChange}})=>(
                <TextInput
                  style={[styles.input,{width:width*0.8}]}
                  placeholder="Enter your email"
                  value={value}
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={onChange}
                />)}/>
                {errors.email && (
                  <Text style={Texts.error}>❗ {errors.email.message}</Text>
                )}
                <TouchableOpacity
                  style={ButtonStyle}
                  onPress={handleSubmit(onSubmit)}
                
                >
                  <Text style={Texts.buttonText}>
                    Continue
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

export default ForgotPasswordScreen;

