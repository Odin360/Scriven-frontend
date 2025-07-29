import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Animated, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import axios from 'axios'
import { BASEURL } from '@/constants/Api'
import { useAuthStore } from '@/store/useAuthStore'
import { useTeamStore } from '@/store/useTeamStore'
import { useChatContext } from 'stream-chat-expo'
import { useUserStore } from '@/store/useUserStore'
import {ChannelData} from "stream-chat"
import { useThemeColors } from '@/hooks/useThemeColor'
import { FolderIcon,MicrophoneStageIcon, GoogleDriveLogoIcon, UsersThreeIcon } from 'phosphor-react-native'

const { width } = Dimensions.get('window')

const CreateTeam = () => {
  const  colors  = useThemeColors()
  const [teamName, setTeamName] = useState('')
  const [description, setDescription] = useState('')
  const [driveLink, setDriveLink] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const token = useAuthStore(state=>state.token)
  const storeTeamName=useTeamStore(state=>state.setTeamName)
  const storeTeamId=useTeamStore(state=>state.setTeamId)
  const storeTeamDrive=useTeamStore(state=>state.setTeamDrive)
  const teamId = useTeamStore(state=>state.id)
  const userId = useUserStore(state=>state.id)
  const {client}=useChatContext()

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
      })
    ]).start()
  }, [])

  const handleDescriptionChange = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= 30) {
      setDescription(text);
    } else {
      const trimmedText = words.slice(0, 30).join(' ');
      setDescription(trimmedText);
      Alert.alert('Word Limit Reached', 'Description cannot exceed 30 words.');
    }
  };
  

  const wordCount = description.trim().split(/\s+/).filter(Boolean).length
  const requestBody={
    name:teamName,
    description:description,
    drive:driveLink
  }
  
  const channelData:ChannelData|any = {name:teamName}
  

  const handleCreateTeam = async() => {
    if (!teamName.trim()) {
      Alert.alert('Error', 'Please enter a team name')
      return
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a team description')
      return
    }
    if (!driveLink.trim()) {
      Alert.alert('Error', 'Please enter the Google Drive folder link')
      return
    }
    await axios.post(`${BASEURL}/teams/create`,requestBody,{
      headers:{'Authorization': `Bearer ${token}`,'Content-Type':'application/json'}
    }).then(
      ({data})=>{
    storeTeamName(data.name)
    storeTeamId(data.id)
    storeTeamDrive(data.drive)
      }
    ).then(async()=>{
      if(!userId ){return}
      try{
      const channel = client.channel("messaging",teamId,channelData);
    
      await channel.watch().then(async()=>{
     const result =  await  channel.addMembers([{user_id:userId,channel_role:"channel_moderator"}])
  console.log(result)})
       }
      catch(e){
        console.log(e)
      }
    })
    .then( ()=>{
    Alert.alert('Success', 'Team created successfully!')
    })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS==="android"?'height':'padding'} style={{flex:1}}>
    <ScrollView showsVerticalScrollIndicator={false}  style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle,colors.gradientEnd]}
        start={{x:0,y:0}}
        end ={{x:1,y:1}}
        style={styles.headerGradient}
      />
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <UsersThreeIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Team Name</Text>
          </View>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.border,
              color: colors.textPrimary,
              borderColor: colors.border
            }]}
            value={teamName}
            onChangeText={setTeamName}
            placeholder="Enter team name"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <MicrophoneStageIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Description (max 30 words)</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea, { 
              backgroundColor: colors.border,
              color: colors.textPrimary,
              borderColor: colors.border
            }]}
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Enter team description"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <View style={styles.wordCountContainer}>
            <Text style={[styles.wordCount, { 
              color: wordCount >= 30 ? colors.dangerAccent : colors.secondaryButton 
            }]}>
              {wordCount}/30 words
            </Text>
          </View>
        </View>

        <View style={[styles.stepsContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.stepsHeader}>
        <FolderIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Steps to Create Shared Drive</Text>
          </View>
          <View style={styles.stepsList}>
            {[
              'Go to Google Drive and create a new folder',
              'Right-click the folder and select "Share"',
              'Set access to "Anyone with the link can view"',
              'Copy the sharing link and paste it below'
            ].map((step, index) => (
              <View key={index} style={styles.stepWrapper}>
                <View style={styles.stepContent}>
                  <View style={styles.stepLeft}>
                    <View style={[styles.stepNumberContainer, { 
                      backgroundColor: colors.iconColor + '15',
                      borderColor: colors.iconColor + '30'
                    }]}>
                      <View style={[styles.stepNumberInner, { 
                        backgroundColor: colors.iconColor + '20',
                        borderColor: colors.iconColor + '40'
                      }]}>
                        <Text style={[styles.stepNumber, { 
                          color: colors.iconColor,
                          textShadowColor: colors.shadow + '40',
                          textShadowOffset: { width: 0, height: 1 },
                          textShadowRadius: 2
                        }]}>{index + 1}</Text>
                      </View>
                    </View>
                    {index < 3 && (
                      <View style={[styles.stepConnector, { 
                        backgroundColor: colors.iconColor + '15',
                        borderColor: colors.iconColor + '30'
                      }]} />
                    )}
                  </View>
                  <View style={styles.stepTextContainer}>
                    <Text style={[styles.stepText, { color: colors.textPrimary }]}>{step}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
           <GoogleDriveLogoIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Google Drive Folder Link</Text>
          </View>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.border,
              color: colors.textPrimary,
              borderColor: colors.border
            }]}
            value={driveLink}
            onChangeText={setDriveLink}
            placeholder="Paste the sharing link here"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.createButton,{borderColor:colors.primaryButton}]}
          onPress={handleCreateTeam}
          activeOpacity={0.8}
        >
         
            <Text style={[styles.createButtonText,{color:colors.primaryButton}]}>Create Team</Text>
          
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius:25
  },
  headerGradient: {
    height: 120,
    width: '100%',
    marginBottom:50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    color: 'white',
  },
  content: {
    padding: 16,
    marginTop: -20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  wordCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  stepsContainer: {
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  stepsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepsList: {
    gap: 0,
  },
  stepWrapper: {
    marginBottom: 16,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepLeft: {
    width: 32,
    marginRight: 16,
    alignItems: 'center',
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    transform: [{ rotate: '45deg' }],
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  stepNumberInner: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
    borderWidth: 0.5,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
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
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1
  },
  gradientButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default CreateTeam