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
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import Rive, { Fit, RiveRef } from "rive-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "@/hooks/useThemeColor";
import CustomButton1 from "@/components/ui/CustomButtonOne";

const SignUp = () => {
  const setPassword = useAuthStore((state) => state.setPassword);
  const setEmail = useAuthStore((state) => state.setEmail);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await Axios.post(`${BASEURL}/auth/signUp`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
        .then(() => {
          setEmail(data.email);
          setPassword(data.password);
          setLoading(false);
        })
        .then(() => router.push("/(auth)/otpVerify"));
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const [hidePassword, setHidePassword] = useState(true);
  const colors = useThemeColors();
  const riveRef = useRef<RiveRef>(null);

  useEffect(() => {
    if (errors.email || errors.password || errors.username) {
      riveRef.current?.setInputState("State Machine 1", "login_fail", true);
    }
  }, [errors]);

  const { width } = Dimensions.get("window");
  const spaces = width * 0.08;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
       <ImageBackground
               source={{ uri:"https://images.unsplash.com/photo-1637825891028-564f672aa42c?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlJTIwYWJzdHJhY3R8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000"}}
              resizeMode="cover"
              style={{ flex: 1,backgroundColor:"purple" }}
              blurRadius={10}
            >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "android" ? "height" : "padding"}
        >
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={{ height: width * 0.7, width }}>
              <Rive
                ref={riveRef}
                resourceName="login_interaction"
                fit={Fit.Fill}
              />
            </View>

            <View
              style={{
                marginHorizontal: 20,
                padding: 20,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.07)",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 10,
                elevation: 3,
              }}
            >
                     
              <Controller
                name="username"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <View style={inputBox}>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Username"
                      placeholderTextColor={colors.textSecondary}
                      style={[inputField,{flex:1}]}
                      onFocus={() => riveRef.current?.setInputState("State Machine 1", "isFocus", true)}
                      onBlur={() => riveRef.current?.setInputState("State Machine 1", "isFocus", false)}
                    />
                  </View>
                )}
              />
              {errors.username && <Text style={Texts.error}>❗ {errors.username.message}</Text>}

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <View style={inputBox}>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor={colors.textSecondary}
                      style={[inputField,{color:colors.textPrimary,flex:1}]}
                      onFocus={() => riveRef.current?.setInputState("State Machine 1", "isFocus", true)}
                      onBlur={() => riveRef.current?.setInputState("State Machine 1", "isFocus", false)}
                    />
                  </View>
                )}
              />
              {errors.email && <Text style={Texts.error}>❗ {errors.email.message}</Text>}

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <View style={[inputBox, { flexDirection: "row",flex:1, alignItems: "center" }]}>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                         placeholderTextColor={colors.textSecondary}
                      style={[inputField,{color:colors.textPrimary,flex:1,height:50}]}
                      placeholder="Password"
                      secureTextEntry={hidePassword}
                      onFocus={() => riveRef.current?.setInputState("State Machine 1", "IsPassword", true)}
                      onBlur={() => riveRef.current?.setInputState("State Machine 1", "IsPassword", false)}
                    />
                    <TouchableOpacity
                      onPress={() => setHidePassword(!hidePassword)}
                      style={{ paddingHorizontal: 8 }}
                    >
                      <Feather name={hidePassword ? "eye-off" : "eye"} size={20} color="#7C8BA0" />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && <Text style={Texts.error}>❗ {errors.password.message}</Text>}

              {/* Agreement */}
              <Text style={[Texts.default, { color: "#fff", textAlign: "center", marginTop: spaces }]}>
                By clicking create account, you agree to the{" "}
                <Text style={{ color: "skyblue" }}>Terms of Service</Text> and{" "}
                <Text style={{ color: "skyblue" }}>Privacy Policy</Text>.
              </Text>

              {/* Submit */}
              <CustomButton1
                label={loading ? "Creating Account..." : "Create Account"}
                disabled={loading}
                width={250}
                height={55}
                style={{ marginTop: 30,alignSelf:"center" }}
                textStyle={{ fontSize: 18 }}
                onPress={handleSubmit(onSubmit)}
              />

              {/* Redirect to login */}
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
                <Text style={[Texts.default, { color: "white" }]}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/signIn")}>
                  <Text style={[Texts.default, { color: colors.primaryButton }]}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

const inputBox = {
  backgroundColor: "#fff",
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 12,
  marginBottom: 12,
  minHeight: 50,
};
const inputField = {
  fontSize: 16,
  color:"black",
  flex:1
};

export default SignUp;
