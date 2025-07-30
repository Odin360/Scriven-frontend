import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { BASEURL } from '@/constants/Api'
import { useAuthStore } from '@/store/useAuthStore'
import { useUserStore } from '@/store/useUserStore'
import { useTeamStore } from '@/store/useTeamStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useChatContext } from 'stream-chat-expo'
import type { ChannelData } from 'stream-chat'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay
} from 'react-native-reanimated'


export default function JoinTeamScreen() {
  const { client } = useChatContext()
  const userId = useUserStore((state) => state.id)
  const token = useAuthStore((state) => state.token)
  const setTeamId = useTeamStore((state) => state.setTeamId)
  const setTeamDrive = useTeamStore((state) => state.setTeamDrive)
  const setTeamName = useTeamStore((state) => state.setTeamName)

  const [search, setSearch] = useState('')
  const [teams, setTeams] = useState<Array<any> | null>(null)
  const [joiningTeamId, setJoiningTeamId] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const result = await axios.get(`${BASEURL}/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTeams(result.data)
      } catch (err) {
        console.error('Failed to fetch teams:', err)
      }
    }
    fetchTeams()
  }, [])
  const headerTranslateY = useSharedValue(-50)
const headerOpacity = useSharedValue(0)

useEffect(() => {
  headerTranslateY.value = withTiming(0, { duration: 600 })
  headerOpacity.value = withDelay(100, withTiming(1, { duration: 600 }))
}, [])
const animatedHeaderStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: headerTranslateY.value }],
  opacity: headerOpacity.value,
}))


  const handleJoin = async (teamId: string) => {
    if (!userId || joiningTeamId) return
    setJoiningTeamId(teamId)

    try {
      const { data } = await axios.put(
        `${BASEURL}/users/${userId}/${teamId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const team = data.teams.find((team: any) => team.id === teamId)
      if (!team) throw new Error('Team not found')

      setTeamId(team.id)
      setTeamDrive(team.drive)
      setTeamName(team.name)

      const channelData: ChannelData | any = { name: team.name }
      const channel = client.channel('messaging', teamId, channelData)
      await channel.watch()
      await channel.addMembers([
        { user_id: userId, channel_role: "channel_member" },
      ])

      Toast.show({
        type: 'success',
        text1: '🎉 Joined Team!',
        text2: 'You’ve successfully joined the team.',
      })
    } catch (error) {
      console.error('Join team error:', error)
      Toast.show({
        type: 'error',
        text1: 'Join failed',
        text2: 'Please try again later.',
      })
    } finally {
      setJoiningTeamId(null)
    }
  }

  const renderTeam = ({ item }: { item: any }) => (
    <View style={styles.teamCard}>
      <Text style={styles.teamName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.joinFAB}
        onPress={() => handleJoin(item.id)}
        disabled={joiningTeamId === item.id}
      >
        {joiningTeamId === item.id ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.joinText}>Join</Text>
        )}
      </TouchableOpacity>
    </View>
  )

  if (!teams) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
  <Text style={styles.headerTitle}>Join a Team</Text>
  <Text style={styles.headerSubtitle}>
    Collaborate, chat, and conquer together 🚀
  </Text>
</Animated.View>

        <View
          style={[
            styles.searchWrapper,
            isFocused && styles.searchInputFocused,
          ]}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Search team"
            placeholderTextColor="#555"
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
        </View>

        <FlatList
          data={
            search
              ? teams.filter((t) =>
                  t.name.toLowerCase().includes(search.toLowerCase())
                )
              : teams
          }
          keyExtractor={(item) => item.id}
          renderItem={renderTeam}
          contentContainerStyle={styles.teamList}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No teams found.</Text>
          }
        />

        <Toast />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: '#e8e4f0',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
    color: '#000',
  },
  searchInputFocused: {
    borderWidth: 1.5,
    borderColor: '#0072FF',
    transform: [{ scale: 1.05 }],
    backgroundColor: '#fafafa',
  },
  searchIcon: {
    marginLeft: 8,
  },
  teamList: {
    paddingBottom: 20,
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    position: 'relative',
  },
  teamName: {
    fontFamily: 'Kotta One',
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  joinFAB: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#0072FF',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 20,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
  paddingTop: 20,
  paddingBottom: 16,
  backgroundColor: '#eef0ff',
  borderRadius: 20,
  marginBottom: 12,
  alignItems: 'center',
},
headerTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#333',
},
headerSubtitle: {
  fontSize: 13,
  color: '#555',
  marginTop: 4,
},

  joinText: {
    color: '#fff',
    fontWeight: '600',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
})
