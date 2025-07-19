import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import axios from "axios";
import { BASEURL } from "@/constants/Api";
import { useAuthStore } from "@/store/useAuthStore";
import { useTeamStore } from "@/store/useTeamStore";
import { useChatContext } from "stream-chat-expo";
import { useUserStore } from "@/store/useUserStore";
import { ChannelData } from "stream-chat";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const CreateTeam = () => {
  const { colors } = useTheme();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const token = useAuthStore((state) => state.token);
  const storeTeamName = useTeamStore((state) => state.setTeamName);
  const storeTeamId = useTeamStore((state) => state.setTeamId);
  const storeTeamDrive = useTeamStore((state) => state.setTeamDrive);
  const teamId = useTeamStore((state) => state.id);
  const userId = useUserStore((state) => state.id);
  const { client } = useChatContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDescriptionChange = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= 30) {
      setDescription(text);
    } else {
      const trimmedText = words.slice(0, 30).join(" ");
      setDescription(trimmedText);
      Alert.alert("Word Limit Reached", "Description cannot exceed 30 words.");
    }
  };

  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
  const requestBody = {
    name: teamName,
    description: description,
    drive: driveLink,
  };

  const channelData: ChannelData | any = { name: teamName };

  {
  }
  const isValidDriveLink = (link: string) => {
    const regex =
      /^https:\/\/drive\.google\.com\/drive\/folders\/[a-zA-Z0-9_-]+(\/.*)?$/;

    return regex.test(link);
  };

  {
  }
  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      Alert.alert("Error", "Please enter a team name");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Please enter a team description");
      return;
    }
    if (!driveLink.trim()) {
      Alert.alert("Error", "Please enter the Google Drive folder link");
      return;
    }
    if (!isValidDriveLink(driveLink)) {
      Alert.alert("Error", "Please enter a valid Google Drive folder link");
      return;
    }

    {
    }
    try {
      setLoading(true); // Start loading

      const { data } = await axios.post(
        `${BASEURL}/teams/create`,
        {
          name: teamName,
          description: description,
          drive: driveLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      storeTeamName(data.name);
      storeTeamId(data.id);
      storeTeamDrive(data.drive);

      if (!userId) {
        Alert.alert("Error", "User ID is missing. Cannot join team.");
        return;
      }

      if (!client || typeof client.channel !== "function") {
        Alert.alert(
          "Chat Error",
          "Chat client is not initialized. Please restart the app or try again later."
        );
        setLoading(false);
        return;
      }

      const channel = client.channel("messaging", data.id, {
        name: teamName,
      } as any);

      await channel.watch();
      await channel.addMembers([
        { user_id: userId, channel_role: "channel_moderator" },
      ]);

      Alert.alert("Success", "Team created successfully!");
      setTeamName("");
      setDescription("");
      setDriveLink("");
      router.push({
        pathname: "/(protected)/(otherScreens)/teamMembers",
        params: { teamId: data.id },
      });
    } catch (error) {
      console.log("Error creating team:", error);
      Alert.alert("Error", "Failed to create team. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  {
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <LinearGradient
            colors={[colors.primary, colors.background]}
            style={styles.headerGradient}
          />
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="people" size={20} color={colors.primary} />
                <Text style={[styles.label, { color: colors.text }]}>
                  Team Name
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.primary,
                  },
                ]}
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter team name"
                placeholderTextColor={colors.text}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Ionicons
                  name="document-text"
                  size={20}
                  color={colors.primary}
                />
                <Text style={[styles.label, { color: colors.text }]}>
                  Description (max 30 words)
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.primary,
                  },
                ]}
                value={description}
                onChangeText={handleDescriptionChange}
                placeholder="Enter team description"
                placeholderTextColor={colors.text}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View style={styles.wordCountContainer}>
                <Text
                  style={[
                    styles.wordCount,
                    {
                      color:
                        wordCount >= 30 ? colors.notification : colors.text,
                    },
                  ]}
                >
                  {wordCount}/30 words
                </Text>
              </View>
            </View>

            <View
              style={[styles.stepsContainer, { backgroundColor: colors.card }]}
            >
              <View style={styles.stepsHeader}>
                <Ionicons name="folder" size={24} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Steps to Create Shared Drive
                </Text>
              </View>
              <View style={styles.stepsList}>
                {[
                  "Go to Google Drive and create a new folder",
                  'Right-click the folder and select "Share"',
                  'Set access to "Anyone with the link can view"',
                  "Copy the sharing link and paste it below",
                ].map((step, index) => (
                  <View key={index} style={styles.stepWrapper}>
                    <View style={styles.stepContent}>
                      <View style={styles.stepLeft}>
                        <View
                          style={[
                            styles.stepNumberContainer,
                            {
                              backgroundColor: colors.primary + "15",
                              borderColor: colors.primary + "30",
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.stepNumberInner,
                              {
                                backgroundColor: colors.primary + "20",
                                borderColor: colors.primary + "40",
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.stepNumber,
                                {
                                  color: colors.primary,
                                  textShadowColor: colors.primary + "40",
                                  textShadowOffset: { width: 0, height: 1 },
                                  textShadowRadius: 2,
                                },
                              ]}
                            >
                              {index + 1}
                            </Text>
                          </View>
                        </View>
                        {index < 3 && (
                          <View
                            style={[
                              styles.stepConnector,
                              {
                                backgroundColor: colors.primary + "15",
                                borderColor: colors.primary + "30",
                              },
                            ]}
                          />
                        )}
                      </View>
                      <View style={styles.stepTextContainer}>
                        <Text style={[styles.stepText, { color: colors.text }]}>
                          {step}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Ionicons name="link" size={20} color={colors.primary} />
                <Text style={[styles.label, { color: colors.text }]}>
                  Google Drive Folder Link
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.primary,
                  },
                ]}
                value={driveLink}
                onChangeText={setDriveLink}
                placeholder="Paste the sharing link here"
                placeholderTextColor={colors.text}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.createButton,
                {
                  borderColor: colors.primary,
                  opacity: loading ? 0.5 : 1,
                },
              ]}
              onPress={handleCreateTeam}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text
                  style={[styles.createButtonText, { color: colors.primary }]}
                >
                  Create Team
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
  },
  headerGradient: {
    height: 120,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
    color: "white",
  },
  content: {
    padding: 16,
    marginTop: -20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  wordCountContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  wordCount: {
    fontSize: 12,
    fontWeight: "500",
  },
  stepsContainer: {
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  stepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stepsList: {
    gap: 0,
  },
  stepWrapper: {
    marginBottom: 16,
  },
  stepContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepLeft: {
    width: 32,
    marginRight: 16,
    alignItems: "center",
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    transform: [{ rotate: "45deg" }],
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  stepNumberInner: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-45deg" }],
    borderWidth: 0.5,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "700",
  },
  stepConnector: {
    width: 1.5,
    flex: 1,
    marginTop: 2,
    marginBottom: -2,
    borderWidth: 0.5,
  },
  stepTextContainer: {
    flex: 1,
    paddingTop: 6,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 20,
  },
  createButton: {
    height: 56,
    borderRadius: 28,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  gradientButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateTeam;
