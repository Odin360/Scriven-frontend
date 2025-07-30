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
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, Stack } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Rive, { Fit, RiveRef } from "rive-react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import axios from "axios";
import { SignInSchema } from "@/constants/Schema";
import { BASEURL } from "@/constants/Api";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { Texts } from "@/constants/Components";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "@/hooks/useThemeColor";
import CustomButton1 from "@/components/ui/CustomButtonOne";

const { width } = Dimensions.get("window");

const SignIn = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);
  const setSignedIn = useAuthStore((state) => state.setSignedIn);
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const setUsername = useUserStore((state) => state.setUsername);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const [hidePassword, setHidePassword] = useState(true);
  const riveRef = useRef<RiveRef>(null);
  const colors = useThemeColors();

  useEffect(() => {
    if (errors.email || errors.password) {
      riveRef.current?.setInputState("State Machine 1", "login_fail", true);
    }
  }, [errors]);

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    const emailToSend = email.toLowerCase();
    try {
      setLoading(true);
      await Axios.post(`${BASEURL}/auth/login`, { email: emailToSend, password: password })
        .then(async (response) => {
          setToken(response.data.token);
          return await axios.post(`${BASEURL}/users/user`, { email: emailToSend }, {
            headers: { Authorization: `Bearer ${response.data.token}` },
          });
        })
        .then((response) => {
          setUserId(response.data.id);
          setUserEmail(response.data.email);
          setUsername(response.data.username);
        })
        .then(() => riveRef.current?.setInputState("State Machine 1", "login_success", true))
        .then(() => {
          setSignedIn(true);
          setLoading(false);
        })
        .then(() => router.replace("/(protected)/(tabs)"));
    } catch (e) {
      setLoading(false);
      riveRef.current?.setInputState("State Machine 1", "login_fail", true);
      Alert.alert("Login Error", "There was an error, try again");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
         source={{ uri:"https://images.unsplash.com/photo-1637825891028-564f672aa42c?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlJTIwYWJzdHJhY3R8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000"}}
        resizeMode="cover"
        style={{ flex: 1,backgroundColor:"purple" }}
        blurRadius={10}
      >
        

          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "android" ? "height" : "padding"}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ height: width * 0.7, width: width }}>
                  <Rive ref={riveRef} resourceName="login_interaction" fit={Fit.Fill} />
                </View>

                <View style={{
                  padding: 20,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  marginHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 5,
                }}>

                  {/* Email Field */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                     <View style={{
  backgroundColor: "#fff",
  borderRadius: 12,
  paddingHorizontal: 15,
  paddingVertical: 12,
  width: width * 0.9,
  justifyContent: "center",
  marginBottom: 10,
}}>
                        <TextInput
                          placeholder="Email"
                          value={value}
                          keyboardType="email-address"
                          onFocus={() => riveRef.current?.setInputState("State Machine 1", "isFocus", true)}
                          onBlur={() => riveRef.current?.setInputState("State Machine 1", "isFocus", false)}
                          onChangeText={onChange}
                          placeholderTextColor={colors.textSecondary}
                          style={{ fontSize: 16,flex:1 }}
                        />
                      </View>
                    )}
                  />
                  {errors.email && <Text style={Texts.error}>❗ {errors.email.message}</Text>}

                  {/* Password Field */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <View style={{
                       backgroundColor: "#fff",
  borderRadius: 12,
  paddingHorizontal: 15,
  paddingVertical: 12,
  width: width * 0.9,
  justifyContent: "center",
  marginBottom: 10,

                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                        <TextInput
                          placeholder="Password"
                          value={value}
                          secureTextEntry={hidePassword}
                          autoCorrect={false}
                          onFocus={() => riveRef.current?.setInputState("State Machine 1", "IsPassword", true)}
                          onBlur={() => riveRef.current?.setInputState("State Machine 1", "IsPassword", false)}
                          onChangeText={onChange}
                          placeholderTextColor={colors.textSecondary}
                          style={{ fontSize: 16,flex:1,color:"black" }}
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ paddingLeft: 10 }}>
                          <Feather name={hidePassword ? "eye-off" : "eye"} size={22} color="#777" />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                  {errors.password && <Text style={Texts.error}>❗ {errors.password.message}</Text>}

                  {/* Forgot Password */}
                  <TouchableOpacity
                    style={{ marginLeft: "auto", marginBottom: 15 }}
                    onPress={() => router.push("/(auth)/forgotPassword")}
                  >
                    <Text style={[Texts.default, { color: colors.primaryButton }]}>Forgot Password?</Text>
                  </TouchableOpacity>

                  {/* Sign In Button */}
                  <CustomButton1
                    disabled={loading}
                    label={loading ? "Signing In..." : "Sign In"}
                    width={250}
                    height={55}
                    style={{ marginBottom: 20 }}
                    textStyle={{ fontSize: 18 }}
                    onPress={handleSubmit(onSubmit)}
                  />

                  {/* Sign Up Prompt */}
                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={[Texts.default, { color: "white" }]}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/signUp")}>
                      <Text style={[Texts.default, { color: colors.primaryButton }]}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
     
      </ImageBackground>
    </>
  );
};

export default SignIn;
