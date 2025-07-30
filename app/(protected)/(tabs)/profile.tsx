import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/useThemeColor';
import {
  CaretRightIcon,
  GearIcon,
  QrCodeIcon,
  SignOutIcon,
  UserSwitchIcon,
  PhoneCallIcon,
  UserIcon,
  CheckCircleIcon,
  PentagramIcon,
  CameraIcon,
} from 'phosphor-react-native';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '../../../store/useUserStore';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useImageUpload } from '@/hooks/uploadImage';

const { width } = Dimensions.get('window');


const Profile = () => {
  const colors = useThemeColors();
  const fadeAnim = useSharedValue(0);
  const {downloadImage,imageUri,pickImage}=useImageUpload()
  const scaleAnim = useSharedValue(0.9);
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  const reportIssueMail = `mailto:Odin360team@gmail.com?subject=${encodeURIComponent(
    'Report an issue'
  )}&body=${encodeURIComponent('')}`;
  const contactUs = `mailto:Odin360team@gmail.com?subject=${encodeURIComponent(
    'Contact us'
  )}&body=${encodeURIComponent('')}`;

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    scaleAnim.value = withSpring(1, {
      damping: 8,
      stiffness: 80,
    });
  }, []);
   useEffect(() => {
    const setUpImage=async()=>{
      await downloadImage()
    }
    setUpImage()
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));
  const {username,email}=useUserStore()

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:colors.background }}>
      <ScrollView style={{flex:1,backgroundColor:colors.background}} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      <Image
        style={styles.logo}
        source={{
          uri: 'https://drive.google.com/uc?export=view&id=1n8rZC_2mUS6Cj8fX0wK9Pk2MSdpQpNp8',
        }}
      />

      {/* Info Container */}
      <Animated.View style={[animatedStyle, styles.animatedContainer]}>
        {/* Banner Image with Camera Icon */}
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          <Image
            source={{ uri:imageUri? imageUri:'https://i.pravatar.cc/300' }}
            style={styles.profileImage}
          />
          <View style={styles.cameraIcon}>
            <CameraIcon size={22} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Name and Email */}
        <View style={{flexDirection:"row",marginTop: 16,alignItems:"center",justifyContent:"space-between"}}> 
                 <View style={{ alignItems: 'center' }}>
          <Text style={[styles.name,{color:colors.textPrimary}]}>{username}</Text>
          <Text style={[styles.email,{color:colors.textPrimary}]}>{email}</Text>
        </View>

        {/* QR Code */}
        <TouchableOpacity style={styles.qrWrapper}>
          <QrCodeIcon size={32} color={colors.iconColor} />
        </TouchableOpacity>
      </View>

        {/* Manage Account */}
        <TouchableOpacity
          onPress={() => router.push("/(protected)/(otherScreens)/settings")}
          style={[styles.menuItem, { marginTop: 24 }]}
        >
          <View style={styles.menuItemContent}>
            <UserIcon size={24} color={colors.iconColor} />
            <Text style={[styles.menuText,{color:colors.textPrimary}]}>Manage your account</Text>
          </View>
          <CaretRightIcon size={20} color={colors.iconColor} />
        </TouchableOpacity>
      </Animated.View>

      {/* Current Team */}
      <View style={styles.teamRow}>
        <CheckCircleIcon color="green" weight="fill" size={24} />
        <Text style={[styles.team,{color:colors.textSecondary}]}>Scriven</Text>
      </View>

      {/* Other Menu Items */}
      {[
        {
          icon: <UserSwitchIcon size={24} color={colors.iconColor} />,
          label: 'Switch Account',
        },
        {
          icon: <GearIcon size={24} color={colors.iconColor} />,
          label: 'Settings & Privacy',
          action:()=>router.push("/(protected)/(otherScreens)/settings")
        },
        {
          icon: <PhoneCallIcon size={24} color={colors.iconColor} />,
          label: 'Help & Feedback',
          action: () => Linking.openURL(contactUs),
        },
        {
          icon: <MaterialIcons name="policy" size={24} color={colors.iconColor} />,
          label: 'Privacy & Terms',
          action: () => Linking.openURL('https://yourapp.com/terms'),
        },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={item.action}
        >
          <View style={styles.menuItemContent}>
            {item.icon}
            <Text style={[styles.menuText,{color:colors.textPrimary}]}>{item.label}</Text>
          </View>
          <CaretRightIcon size={20} color={colors.iconColor} />
        </TouchableOpacity>
      ))}

      {/* Get Premium */}
     {/* Why Go Premium? */}
<View style={{ marginTop: 30, paddingHorizontal: 20 }}>
  <Text style={{ 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 12, 
    color: colors.textPrimary 
  }}>
    🚀 Want more Productivity?{"\n"}
    Go Premium
  </Text>

  
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 12,
        backgroundColor: colors.surface ,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      
      <Text style={{ marginLeft: 12, fontSize: 14, color: colors.textSecondary }}>
        Try our premium package and see what Maya can do
      </Text>
    </View>

</View>

      <TouchableOpacity onPress={()=>router.push("/(protected)/(otherScreens)/premium")} style={[styles.buttonContent, { marginVertical: 20, paddingHorizontal: 20, width: '100%' }]}>
        <LinearGradient
          style={[styles.buttonContent, {
            height: 50,
            justifyContent: 'space-between',
            paddingHorizontal: 20
          }]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          colors={[colors.background, colors.highlightAccent, colors.background, colors.shadow]}
        >
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <PentagramIcon size={24} color={colors.highlightAccent} />
            <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Get Premium</Text>
          </View>
          <View>
            <Text style={{ fontStyle: 'italic', color: colors.textPrimary }}>Try Maya Pro 😎</Text>
            <Text style={{ fontStyle: 'italic', color: colors.textPrimary }}>for free 💯</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Report Issue */}
      <TouchableOpacity
        onPress={() => Linking.openURL(reportIssueMail)}
        style={[styles.reportButton,{borderColor:colors.dangerAccent,backgroundColor:colors.background}]}
      >
        <Text style={[styles.buttonText, { color: colors.dangerAccent }]}>Report an issue</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        onPress={() => {
          setToken(null);
          router.replace('/(auth)/signIn');
        }}
        style={[styles.logoutButton,{borderColor:colors.dangerAccent,backgroundColor:colors.background}]}
      >
        <View style={styles.buttonContent}>
          <SignOutIcon size={24} color={colors.dangerAccent} />
          <Text style={[styles.buttonText, { color: colors.dangerAccent }]}>Logout</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 120,
    alignSelf: 'center',
    marginTop: 12,
  },
  animatedContainer: {
    padding: 20,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 2.5,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#0008',
    padding: 6,
    borderRadius: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  qrWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  teamRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  team: {
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
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
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  reportButton: {
    width: '90%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:100
  },
});

export default Profile;
