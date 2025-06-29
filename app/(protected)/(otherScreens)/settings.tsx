import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'

const Settings = () => {
  const {width}=Dimensions.get("window")
  const { colors } = useTheme()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)
  const [isDefaultMode, setIsDefaultMode] = useState(true)

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
      <View style={[styles.header, { backgroundColor: colors.card,height:width*0.25}]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings and Privacy</Text>
      </View>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Edit Profile Section */}
        <View style={[styles.section,{backgroundColor:colors.background}]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>Edit Profile</Text>
          </View>
          
          <View style={[styles.inputContainer,{borderColor:colors.primary}]}>
            <View style={styles.inputLabelContainer}>
              <Ionicons name="person-outline" size={20} color={colors.text} />
              <Text style={[styles.label, { color: colors.text, marginLeft: 8 }]}>Username</Text>
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor={colors.text}
            />
          </View>

          <View style={[styles.inputContainer,{borderColor:colors.primary}]}>
            <View style={styles.inputLabelContainer}>
              <Ionicons name="mail-outline" size={20} color={colors.text} />
              <Text style={[styles.label, { color: colors.text, marginLeft: 8 }]}>Email</Text>
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor={colors.text}
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.inputContainer,{borderColor:colors.primary}]}>
            <View style={styles.inputLabelContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.text} />
              <Text style={[styles.label, { color: colors.text, marginLeft: 8 }]}>Password</Text>
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              placeholderTextColor={colors.text}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor:"transparent",borderWidth:1,borderColor:colors.primary}]}
            onPress={handleUpdateProfile}
          >
      
            <Text style={[styles.buttonText,{color:colors.primary}]}>Update Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Themes Section */}
        <View style={[styles.section,{backgroundColor:colors.background}]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette-outline" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>Themes</Text>
          </View>
          
          <View style={styles.themeOption}>
            <View style={styles.themeLabelContainer}>
              <Ionicons name="moon-outline" size={20} color={colors.text} />
              <Text style={[styles.themeLabel, { color: colors.text, marginLeft: 8 }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={() => handleThemeChange('dark')}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.themeOption}>
            <View style={styles.themeLabelContainer}>
              <Ionicons name="sunny-outline" size={20} color={colors.text} />
              <Text style={[styles.themeLabel, { color: colors.text, marginLeft: 8 }]}>Light Mode</Text>
            </View>
            <Switch
              value={isLightMode}
              onValueChange={() => handleThemeChange('light')}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.themeOption}>
            <View style={styles.themeLabelContainer}>
              <Ionicons name="settings-outline" size={20} color={colors.text} />
              <Text style={[styles.themeLabel, { color: colors.text, marginLeft: 8 }]}>Default Mode</Text>
            </View>
            <Switch
              value={isDefaultMode}
              onValueChange={() => handleThemeChange('default')}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        {/* Teams Section */}
        <View style={[styles.section,{backgroundColor:colors.background}]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people-outline" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>Team</Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={handleLeaveTeam}
          >
            <Ionicons name="exit-outline" size={20} color="white" style={styles.buttonIcon} />
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
