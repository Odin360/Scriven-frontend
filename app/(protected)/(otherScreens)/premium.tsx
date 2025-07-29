import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/useThemeColor';
import { router, useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const benefits = [
  { emoji: '🎙️', title: 'Summarize Meetings', desc: 'Worried about not joining the meeting on time \n or not hearing host well because of network issues?\n Not anymore, get a summary of the meeting when you\'re \n up to 15 minutes late or properly not settled' },
  { emoji: '🧠', title: 'Enhanced Voice-talk', desc: 'Tired of Maya\'s robotic or late replies 😥,\n Pro up and hear Maya laugh and talk just\n not only as your assistant but as your friend' },
  { emoji: '📞', title: 'Smart Call Assistant', desc: 'Maya joins and summarizes your calls with teammates.' },
  { emoji: '📊', title: 'Device control', desc: 'Ever being lazy, calling a friend,\nchanging the brightness of your phone or even checking how long it\'ll take for your device to go off?\nYour assistant has got you covered' },
  { emoji: '⚡', title: 'Early Access Features', desc: 'Be the first to try new tools and shape the future of Maya.' },
];

const proofs = [
    
  {
    emoji: '🗣️',
    quote: "After testing the premium features with their free trial,I think Scriven is the next big thing coming up...Kudus to the Scriven team",
    author: '– Emmanuel Donkor,Student',
  },
  {
    emoji: '🗣️',
    quote: "Since trying the premium, Maya’s responses literally kept me awake all night. It's like magic.Maya Pro is way cool,than the basic one",
    author: '– Ignatius,developer',
  },
  {
    emoji: '🙌',
    quote: "Aww,The voice responses feel so human now. Maya feels like my actual work buddy now,I can't wait for it to be released 💜.",
    author: '-Ibrahim Sakeenah, developer',
  },
  {
    emoji: '🚀',
    quote: "Wow,the late meeting feature really looks cool,I had a simple meeting with my guys and all those who were late still got a summary. Premium is 🔥🔥🔥",
    author: '– Gyan ,developer',
  },
];

export default function PremiumScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={{
          alignItems: 'center',
          paddingTop: 50,
          paddingBottom: 20,
          backgroundColor: colors.surface,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Image
          style={{ height: 30, width: 120 }}
          source={{
            uri: 'https://drive.google.com/uc?export=view&id=1n8rZC_2mUS6Cj8fX0wK9Pk2MSdpQpNp8',
          }}
        />
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.textPrimary }}>
          Go premium 🚀
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            marginTop: 8,
            paddingHorizontal: 30,
            textAlign: 'center',
          }}
        >
          Unlock the full power of Maya 🎊 and experience a smarter, faster workflow.
        </Text>
      </Animated.View>

      {/* Benefit List */}
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        {benefits.map((benefit, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(index * 100).duration(500)}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 22 }}>{benefit.emoji}</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.textPrimary,
                marginTop: 8,
              }}
            >
              {benefit.title}
            </Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>
              {benefit.desc}
            </Text>
          </Animated.View>
        ))}
      </View>

      {/* Proofs Section */}
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(500)}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.textPrimary,
            textAlign: 'center',
          }}
        >
          What Our Users Are Saying 💬
        </Animated.Text>

        {proofs.map((proof, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(index * 150 + 500).duration(500)}
            style={{
              backgroundColor: colors.surface,
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#6C47FF',
            }}
          >
            <Text style={{ fontSize: 22 }}>{proof.emoji}</Text>
            <Text style={{ fontSize: 15, color: colors.textPrimary, marginTop: 4 }}>
              "{proof.quote}"
            </Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 8 }}>
              {proof.author}
            </Text>
          </Animated.View>
        ))}
      </View>

      {/* CTA Button */}
      <Animated.View
        entering={FadeInUp.delay(proofs.length * 150 + 600).duration(600)}
        style={{ marginTop: 30, paddingHorizontal: 20, marginBottom: 40 }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/(protected)/(otherScreens)/mayaPro")
          }}
          style={{
            backgroundColor: '#6C47FF',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Try Maya Pro for free
          </Text>
        </TouchableOpacity>
 <TouchableOpacity
    disabled={true}
          onPress={() => {
            // Handle subscription logic or redirect here
          }}
          style={{
            backgroundColor: '#e5e0f7ff',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginVertical:10
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Upgrade to Premium
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 16, alignItems: 'center' }}
        >
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Not now</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}
