import { View,Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import User from '@/components/User'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router'
// Dummy data for team members
const dummyTeamMembers = [
    {
        id: '1',
        username: 'John Doe',
        profilePic: 'https://i.pravatar.cc/150?img=1',
        role: 'Team Lead',
        status: 'online'
    },
    {
        id: '2',
        username: 'Jane Smith',
        profilePic: 'https://i.pravatar.cc/150?img=2',
        role: 'Developer',
        status: 'offline'
    },
    {
        id: '3',
        username: 'Mike Johnson',
        profilePic: 'https://i.pravatar.cc/150?img=3',
        role: 'Designer',
        status: 'online'
    },
    {
        id: '4',
        username: 'Sarah Williams',
        profilePic: 'https://i.pravatar.cc/150?img=4',
        role: 'Developer',
        status: 'online'
    },
    {
        id: '5',
        username: 'Alex Brown',
        profilePic: 'https://i.pravatar.cc/150?img=5',
        role: 'Product Manager',
        status: 'offline'
    },
]

export default function TeamMembers() {
    const { colors } = useTheme()

    return (<SafeAreaView style={{flex:1}}>
        <View style={{alignItems:'center',flexDirection:"row",justifyContent: 'space-between',borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.primary,height:50,padding:10}}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>router.back()} />
            <Text style={{fontWeight:"bold",color:colors.text}}>Team Members</Text>
            <Feather name="more-vertical" size={24} color="black" />
        </View>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={dummyTeamMembers}
                renderItem={({ item }) => <User user={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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