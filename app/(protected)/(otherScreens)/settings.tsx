import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useThemeColors } from '@/hooks/useThemeColor'
import {GearIcon,PasswordIcon,UsersIcon,LightbulbIcon,SignOutIcon,MoonIcon,SunIcon, MailboxIcon,ArrowLeftIcon,PersonSimpleCircleIcon,PersonSimpleIcon } from 'phosphor-react-native'
import { LinearGradient } from 'expo-linear-gradient'


const Settings = () => {
  const {width}=Dimensions.get("window")
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)
  const [isDefaultMode, setIsDefaultMode] = useState(true)
const colors = useThemeColors()
  const handleUpdateProfile = () => {
    // Implement profile update logic
    console.log('Updating profile...')
  }

  const handleLeaveTeam = () => {
    // Implement leave team logic
    console.log('Leaving team...')
  }

  const handleThemeChange = (mode: string) => {
    setIsDarkMode(mode === 'dark')
    setIsLightMode(mode === 'light')
    setIsDefaultMode(mode === 'default')
    // Implement theme change logic
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient colors={[colors.gradientStart,colors.gradientMiddle,colors.background]} style={[styles.header, {height:width*0.25}]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeftIcon size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings and Privacy</Text>
      </LinearGradient>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Edit Profile Section */}
        <View style={[styles.section,{backgroundColor:colors.surface}]}>
          <View style={styles.sectionHeader}>
            <PersonSimpleCircleIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginLeft: 8 }]}>Edit Profile</Text>
          </View>
          
          <View style={[styles.inputContainer,{borderColor:colors.border}]}>
            <View style={styles.inputLabelContainer}>
              <PersonSimpleIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={[styles.label, { color: colors.textPrimary, marginLeft: 8 }]}>Username</Text>
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: colors.border, color: colors.textPrimary }]}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={[styles.inputContainer,{borderColor:colors.border}]}>
            <View style={styles.inputLabelContainer}>
              <MailboxIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={[styles.label, { color: colors.textPrimary, marginLeft: 8 }]}>Email</Text>
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: colors.border, color: colors.textPrimary }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.inputContainer,{borderColor:colors.border}]}>
            <View style={styles.inputLabelContainer}>
              <PasswordIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={[styles.label, { color: colors.textPrimary, marginLeft: 8 }]}>Password</Text>
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: colors.border, color: colors.textPrimary }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor:"transparent",borderWidth:1,borderColor:colors.primaryButton}]}
            onPress={handleUpdateProfile}
          >
      
            <Text style={[styles.buttonText,{color:colors.primaryButton}]}>Update Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Themes Section */}
        <View style={[styles.section,{backgroundColor:colors.surface}]}>
          <View style={styles.sectionHeader}>
            <LightbulbIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginLeft: 8 }]}>Themes</Text>
          </View>
          
          <View style={styles.themeOption}>
            <View style={styles.themeLabelContainer}>
              <MoonIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={[styles.themeLabel, { color: colors.textPrimary, marginLeft: 8 }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={() => handleThemeChange('dark')}
              trackColor={{ false: colors.border, true: colors.primaryButton }}
            />
          </View>

          <View style={styles.themeOption}>
            <View style={styles.themeLabelContainer}>
             <SunIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={[styles.themeLabel, { color: colors.textPrimary, marginLeft: 8 }]}>Light Mode</Text>
            </View>
            <Switch
              value={isLightMode}
              onValueChange={() => handleThemeChange('light')}
              trackColor={{ false: colors.border, true: colors.primaryButton }}
            />
          </View>

          <View style={styles.themeOption}>
            <View style={styles.themeLabelContainer}>
              <GearIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
              <Text style={[styles.themeLabel, { color: colors.textPrimary, marginLeft: 8 }]}>Default Mode</Text>
            </View>
            <Switch
              value={isDefaultMode}
              onValueChange={() => handleThemeChange('default')}
              trackColor={{ false: colors.border, true: colors.primaryButton }}
            />
          </View>
        </View>

        {/* Teams Section */}
        <View style={[styles.section,{backgroundColor:colors.surface}]}>
          <View style={styles.sectionHeader}>
           <UsersIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginLeft: 8 }]}>Team</Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.dangerAccent }]}
            onPress={handleLeaveTeam}
          >
            <SignOutIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={styles.buttonText}>Leave Team</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    borderRadius:18,
    padding:16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    flexDirection:"row"
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  themeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeLabel: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
})

export default Settings
