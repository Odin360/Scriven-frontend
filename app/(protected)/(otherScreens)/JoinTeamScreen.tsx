import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState,useEffect } from 'react';
import { ActivityIndicator,  FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Toast from 'react-native-toast-message';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { BASEURL } from '@/constants/Api';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';
import { useTeamStore } from '@/store/useTeamStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChannelContext, useChatContext } from 'stream-chat-expo';
import { ChannelData } from 'stream-chat';


export default function JoinTeamScreen() {
  const userId=useUserStore(state=>state.id)
  const [search, setSearch] = useState('');
  const [teams,setTeams]=useState<Array<any>|null>(null);
  const [joiningTeamId, setJoiningTeamId] = useState<string | null>(null);
  const [success,setSuccess]=useState(false)
  const [channelData,setChannelData]=useState(null)
const token = useAuthStore(state=>state.token)
const setTeamId = useTeamStore(state=>state.setTeamId)
const setTeamDrive = useTeamStore(state=>state.setTeamDrive)
const setTeamName = useTeamStore(state=>state.setTeamName)


useEffect(()=>{
 const GetTeams = async()=>{const result = await axios.get(`${BASEURL}/teams`,{headers:{"Authorization":`Bearer ${token}`}})
setTeams(result.data)}
GetTeams()},[])

if(!teams){
  return <View style={{flex:1}}>
<ActivityIndicator/>
  </View>
}
 

  const handleJoin = async (teamId: string) => {
    const {client}=useChatContext();
    

    try{
    if (joiningTeamId) return; // 
    if(!userId)return;

    setJoiningTeamId(teamId);
    console.log(userId)
    console.log(teamId)
    await axios.put(`${BASEURL}/users/${userId}/${teamId}`,{},{headers:{"Authorization":`Bearer ${token}`}})
    .then(({data})=>{
      const team = data.teams.find((team:any)=>team.id===teamId)
      setTeamId(team.id)
      setTeamDrive(team.drive)
      setTeamName(team.name)
       const channelData:ChannelData|any = {name:team.name} 
       setChannelData(channelData)   
    }
    ).then(async()=>{
      if(!userId || !channelData ){return}
     
      try{
      const channel = client.channel("messaging",teamId,channelData);
    
      await channel.watch().then(async()=>{
     const result =  await  channel.addMembers([{user_id:userId,channel_role:"channel_moderator"}])
     setSuccess(true)
  console.log(result)})
       }
      catch(e){
        console.log(e)
      }
    })
    
    setJoiningTeamId(null);

    if (success) {
      Toast.show({
        type: 'success',
        text1: '🎉 Joined Team!',
        text2: 'You’ve successfully joined the team.',
      });

    } else {
      Toast.show({
        type: 'error',
        text1: 'Join failed',
        text2: 'Please try again later.',
      });
    }}
    catch(e){
      console.log(e)
    }
  };

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
  );

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1,borderRadius:25,padding:10}}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search team"
            placeholderTextColor="#555"
            value={search}
            onChangeText={setSearch}
          />
          <MaterialCommunityIcons name="magnify" size={20} color="#555" style={styles.searchIcon} />
        </View>

        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={renderTeam}
          contentContainerStyle={styles.teamList}
          ListEmptyComponent={<Text style={styles.noResultsText}>No teams found.</Text>}
        />

        <Toast />
        </View>
        </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 12,
  },
  container: {
    backgroundColor: '#fefefe',
    borderRadius: 0,
    padding: 16,
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
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
});
