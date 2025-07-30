import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from 'stream-chat-expo';
import { useAppContext } from '@/providers/AppContext';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/useUserStore';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeftIcon,
  PhoneCallIcon,
  MessengerLogoIcon
} from 'phosphor-react-native';
import { useThemeColors } from '@/hooks/useThemeColor';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import axios from 'axios';
import { BASEURL } from '@/constants/Api';
import { useAuthStore } from '@/store/useAuthStore';

const ChatScreen = () => {
  const userId = useUserStore((state) => state.id);
  const colors = useThemeColors();
  const { channel, setThread } = useAppContext();
  const client = useStreamVideoClient();
  const token = useAuthStore((state) => state.token);

  const GenerateMeetingID = async () => {
    const { data } = await axios.get(`${BASEURL}/users/generateRandomUUID`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  const JoinCall = async () => {
    try {
      const callID = await GenerateMeetingID();
      console.log('Generated Call ID:', callID);

      if (callID && channel) {
        const members = Object.values(channel.state.members).map((member: any) => ({
          user_id: member.user_id,
        }));

        const call = client?.call('default', callID);
        await call?.getOrCreate({
          ring: true,
          data: { members },
        });
      }
    } catch (e) {
      console.warn('Error in JoinCall:', e);
    }
  };

  if (!userId || !channel) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const { width } = Dimensions.get('window');

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      >
        <Channel  channel={channel} audioRecordingEnabled>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.border,
              height: width * 0.2,
              padding: 10,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeftIcon size={24} color={colors.iconColor} weight="fill" />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>Chat</Text>
            <TouchableOpacity onPress={JoinCall}>
              <PhoneCallIcon size={24} weight="fill" color={colors.iconColor} />
            </TouchableOpacity>
          </LinearGradient>

          <MessageList
            onThreadSelect={(message: any) => {
              if (channel) {
                setThread(message);
                router.push('/(protected)/(otherScreens)/threadScreen');
              }
            }}
          />
          <MessageInput />
        </Channel>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatScreen;
