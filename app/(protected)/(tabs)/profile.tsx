import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView2';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/useThemeColor';
import { CaretRightIcon, GearIcon, GreaterThanIcon, HeadCircuitIcon, QrCodeIcon, WalletIcon } from 'phosphor-react-native';

const { width } = Dimensions.get("window");

const Profile = () => {
  const  colors  = useThemeColors();

  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.9);

  const reportIssueMail = `mailto:Odin360team@gmail.com?subject=${encodeURIComponent("Report an issue")}&body=${encodeURIComponent("")}`;
  const contactUs = `mailto:Odin360team@gmail.com?subject=${encodeURIComponent("Contact us")}&body=${encodeURIComponent("")}`;

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    scaleAnim.value = withSpring(1, {
      damping: 8,
      stiffness: 80,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

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
          animatedStyle
        ]}
      >
        <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Williams</Text>
              <View style={styles.badgeContainer}>
                <QrCodeIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              </View>
            </View>
            <Text style={[styles.email, { color: colors.textPrimary }]}>ki****@gmail.com</Text>
            <Text style={[styles.team, { color: colors.textPrimary }]}>ScrivenTek</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: colors.secondaryButton }]} />
              <Text style={[styles.statusText, { color: colors.textPrimary }]}>Active Now</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <WalletIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={styles.menuText}>Wallet</Text>
            </View>
            <CaretRightIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL(contactUs)}>
            <View style={styles.menuItemContent}>
              <HeadCircuitIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={styles.menuText}>Customer Service</Text>
            </View>
            <CaretRightIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(protected)/(otherScreens)/settings")}
          style={[styles.card, { borderColor: colors.border, backgroundColor: colors.background }]}
        >
          <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <GearIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={styles.menuText}>Settings and Privacy</Text>
            </View>
            <CaretRightIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.reportButton, { backgroundColor: colors.dangerAccent }]}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(reportIssueMail)}
        >
          <View style={styles.buttonContent}>
            <AntDesign name="warning" size={24} color="white" />
            <Text style={styles.buttonText}>Report an issue</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.dangerAccent }]}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="logout" size={24} color="white" />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    width: '90%',
    marginBottom: '5%',
    alignSelf: "center",
    borderRadius: 18,
    opacity: 1,
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
});

export default Profile;
