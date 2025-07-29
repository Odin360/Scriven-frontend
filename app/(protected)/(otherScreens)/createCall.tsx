import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import axios from "axios";
import { BASEURL } from "@/constants/Api";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import Animated, { FadeInUp, BounceIn, FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "@/hooks/useThemeColor";

const { width } = Dimensions.get("window");

export default function CreateCall() {
  const [meetingID, setMeetingID] = useState("");
  const token = useAuthStore((state) => state.token);

  const GenerateMeetingID = async () => {
    const { data } = await axios.get(`${BASEURL}/users/generateRandomUUID`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMeetingID(data);
  };

  const CopyMeetingCode = async () => {
    await Clipboard.setStringAsync(meetingID);
  };

  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[
          colors.background,
          colors.gradientStart,
          colors.gradientMiddle,
          colors.gradientEnd,
          colors.background,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Host a Secure Meeting</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Generate and share your private meeting link instantly
        </Text>
      </LinearGradient>

      {/* Human Illustration */}
      <Animated.View entering={FadeInUp.duration(800)} style={styles.imageContainer}>
        <Image
   source={{
            uri: "https://cdn-icons-png.flaticon.com/512/5974/5974636.png",
          }}
  style={styles.image}
  resizeMode="contain"
/>

      </Animated.View>

      {/* Instructions */}
      <Animated.View entering={FadeInDown.delay(200)} style={{ marginBottom: 16 }}>
        <Text style={[styles.instructionText, { color: colors.textPrimary }]}>
          Tap below to create a new meeting room.
        </Text>
        <Text style={[styles.instructionTextLight, { color: colors.textSecondary }]}>
          You can share the code with anyone to join your video call.
        </Text>
      </Animated.View>

      {/* Generate Meeting ID */}
      <Animated.View entering={BounceIn.delay(400)} style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primaryButton }]}
          onPress={GenerateMeetingID}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Generate Meeting ID</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Meeting ID Display + Copy */}
      {meetingID && (
        <Animated.View entering={FadeInUp.delay(600)} style={[styles.meetingContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.meetingText, { color: colors.textPrimary }]}>{meetingID}</Text>
          <TouchableOpacity style={[styles.copyButton, { backgroundColor: colors.primaryButton }]} onPress={CopyMeetingCode}>
            <Text style={[styles.copyButtonText, { color: colors.textPrimary }]}>Copy</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
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
    height: 160,
  },
  instructionText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  instructionTextLight: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  meetingContainer: {
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: width * 0.85,
  },
  meetingText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  copyButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  copyButtonText: {
    fontWeight: "bold",
  },
});
