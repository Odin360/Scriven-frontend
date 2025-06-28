import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Animated, Linking } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import ParallaxScrollView from '@/components/ParallaxScrollView2'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'
import { ExternalLink } from '@/components/ExternalLink'

const profile = () => {
  const { width, height } = Dimensions.get("window")
  const { colors } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const reportIssueMail = `mailto:${"Odin360team@gmail.com"}?subject=${encodeURIComponent("Report an issue")}&body=${encodeURIComponent("")}`;
  const contactUs = `mailto:${"Odin360team@gmail.com"}?subject=${encodeURIComponent("Contact us")}&body=${encodeURIComponent("")}`;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ dark: colors.background, light: colors.background }}
      headerImage={
        <View>
          <Image
            style={{ width: width, height: width }}
            source={require("@/assets/images/welcome.png")} 
          />
        </View>
      }
    >
      <Animated.View 
        style={[
          { paddingBottom: 500, flex: 1 },
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        <ThemedView style={[styles.card, { borderColor: colors.border,backgroundColor:colors.background }]}>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.name}>Williams</ThemedText>
              <View style={styles.badgeContainer}>
                <Ionicons name="qr-code-outline" size={24} color={colors.primary} />
              </View>
            </View>
            <Text style={[styles.email, { color: colors.text }]}>ki****@gmail.com</Text>
            <Text style={[styles.team, { color: colors.text }]}>ScrivenTek</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.statusText, { color: colors.text }]}>Active Now</Text>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={[styles.card, { borderColor: colors.border,backgroundColor:colors.background }]}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Entypo name="wallet" size={24} color={colors.primary} />
              <ThemedText style={styles.menuText}>Wallet</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.menuItem} onPress={()=>Linking.openURL(contactUs)}>
            <View style={styles.menuItemContent}>
              <AntDesign name="customerservice" size={24} color={colors.primary} />
              <ThemedText style={styles.menuText}>Customer Service</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity 
          onPress={() => router.push("/Protected/(OtherScreens)/settings")}
          style={[styles.card, { borderColor: colors.border, backgroundColor: colors.background }]}
        >
          <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="settings" size={24} color={colors.primary} />
              <ThemedText style={styles.menuText}>Settings and Privacy</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.reportButton, { backgroundColor: colors.notification }]}
          activeOpacity={0.8}
          onPress={()=>Linking.openURL(reportIssueMail)}
        >
          <View style={styles.buttonContent}>
            <AntDesign name="warning" size={24} color="white" />
            <Text style={styles.buttonText}>Report an issue</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.notification }]}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="logout" size={24} color="white" />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    width: '90%',
    marginBottom: '5%',
    alignSelf: "center",
    borderRadius: 18,
    opacity: 0.9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    gap: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
  },
  team: {
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reportButton: {
    width: '100%',
    height: 50,
    marginBottom: '5%',
    borderWidth: 2,
    borderColor: 'red',
    alignItems: "center",
    opacity: 0.9,
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#D54A4D',
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

export default profile
