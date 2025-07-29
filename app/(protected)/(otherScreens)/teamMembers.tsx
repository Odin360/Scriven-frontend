import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { useTheme } from '@react-navigation/native'
import User from '@/components/User'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'
import { router } from 'expo-router'
import axios from 'axios'
import { BASEURL } from '@/constants/Api'
import { useTeamStore } from '@/store/useTeamStore'
import { useAuthStore } from '@/store/useAuthStore'

export default function TeamMembers() {
  const { colors } = useTheme()
  const teamId = useTeamStore(state => state.id)
  const token = useAuthStore(state => state.token)
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${BASEURL}/teams/users/${teamId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const usersWithPics:any = await Promise.all(
          response.data.map(async (user: any) => {
            try {
              const imageRes = await axios.get(`${BASEURL}/image/download/${user.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                responseType: 'arraybuffer',
              })

              const base64Image = `data:image/jpeg;base64,${Buffer.from(imageRes.data, 'binary').toString('base64')}`

              return {
                ...user,
                profilePic: base64Image,
              }
            } catch (imgErr) {
              console.error(`Error loading image for user ${user.id}:`, imgErr)
              return {
                ...user,
                profilePic: null, // fallback to default in User component
              }
            }
          })
        )

        setTeamMembers(usersWithPics)
      } catch (err: any) {
        console.error('Failed to fetch team members:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [teamId, token])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.primary,
        height: 50,
        padding: 10
      }}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={() => router.back()} />
        <Text style={{ fontWeight: "bold", color: colors.text }}>Team Members</Text>
        <Feather name="more-vertical" size={24} color="black" />
      </View>

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
            Failed to load team members.
          </Text>
        ) : (
          <FlatList
            data={teamMembers}
            renderItem={({ item }) => <User user={item} />}
            keyExtractor={(item:any) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
})
