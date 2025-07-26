import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

  if (!teams) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

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

      // Update local store
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
    <View style={styles.teamRow}>
      <Text style={styles.teamName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => handleJoin(item.id)}
        disabled={joiningTeamId === item.id}
      >
        {joiningTeamId === item.id ? (
          <ActivityIndicator size="small" color="#0072FF" />
        ) : (
          <Text style={styles.joinText}>Join</Text>
        )}
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, borderRadius: 25, padding: 10 }}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search team"
            placeholderTextColor="#555"
            value={search}
            onChangeText={setSearch}
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
    fontSize: 12,
    paddingVertical: 10,
    color: '#000',
  },
  searchIcon: {
    marginLeft: 8,
  },
  teamList: {
    paddingBottom: 20,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  teamName: {
    fontFamily: 'Kotta One',
    fontWeight: '500',
  },
  joinButton: {
    borderColor: '#0072FF',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinText: {
    color: '#0072FF',
    fontStyle: 'italic',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
})
