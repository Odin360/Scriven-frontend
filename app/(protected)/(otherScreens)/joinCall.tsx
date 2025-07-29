import {  useAppContext } from "@/providers/AppContext";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  
} from "react-native";
import Animated, { FadeInDown, FadeInUp, BounceIn } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "@/hooks/useThemeColor";

const { width } = Dimensions.get("window");

export default function JoinCall() {
  const client = useStreamVideoClient();
  const { call, setCall } = useAppContext();
  const [meetingID, setMeetingID] = useState("");
 const colors = useThemeColors()
  const CreateCall = () => {
    const callOne = client?.call("default", meetingID);
    if (!callOne) return;
    setCall(callOne);
  };

  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      {/* Header with gradient */}
      <LinearGradient
        colors={[colors.background,colors.gradientStart, colors.gradientMiddle,colors.gradientEnd,colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={[styles.headerTitle,{color:colors.textPrimary}]}>Join a Meeting</Text>
        <Text style={[styles.headerSubtitle,{color:colors.textSecondary}]}>Enter a valid meeting ID to connect instantly</Text>
      </LinearGradient>

      {/* Web image */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.imageContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/5974/5974645.png" }}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Instructions */}
      <Animated.View entering={FadeInUp.delay(200)} style={{ marginBottom: 20 }}>
        <Text style={[styles.instruction,{color:colors.textPrimary}]}>Meeting ID is case-sensitive and unique.</Text>
        <Text style={[styles.instructionLight,{color:colors.textSecondary}]}>Ask the host to share one with you.</Text>
      </Animated.View>

      {/* Input field */}
      <Animated.View entering={FadeInDown.delay(300)} style={styles.inputWrapper}>
        <TextInput
          placeholder="e.g. Scriven-12345"
          style={[styles.input,{borderColor:colors.primaryButton,backgroundColor:colors.border}]}
          onChangeText={setMeetingID}
          value={meetingID}
          placeholderTextColor={colors.textSecondary}
        />
      </Animated.View>

      {/* Join button */}
      <Animated.View entering={BounceIn.delay(400)}>
        <TouchableOpacity
          onPress={() => {
            CreateCall();
            router.push("/(protected)/(otherScreens)/lobby");
          }}
          style={[styles.joinButton,{backgroundColor:colors.primaryButton}]}
        >
          <Text style={[styles.joinButtonText,{color:colors.textPrimary}]}>Join Meeting</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    width: "100%",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: "flex-start",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 6,
    fontStyle: "italic",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  image: {
    width: width * 0.7,
    height: 150,
  },
  instruction: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  instructionLight: {
 fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 24,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    color: "white",
    borderWidth: 2,
  },
  joinButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    elevation: 5,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
