import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Fontisto from '@expo/vector-icons/Fontisto';
import { useChatContext } from 'stream-chat-expo'
import { useUserStore } from '@/store/useUserStore'
import { useAppContext } from '@/providers/AppContext'


interface UserProps {
    user: {
        id: string
        username: string
        profilePic: string
        role: string
        status: string
    }
}

export default function User({ user }: UserProps) {
    const {setChannel}=useAppContext()
    const { colors } = useTheme()
    const {client} = useChatContext()
    const userId = useUserStore(state=>state.id)

    const handleMessagePress = async() => {
        if(!userId){return}
        const channel = client.channel("messaging",{members:[userId,user.id]})
        await channel.watch()
        setChannel(channel)
        router.push(`/Protected/chatScreen`)
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
    }

    return (
        <View style={[styles.memberCard, { backgroundColor: colors.card }]}>
            <View style={styles.profileSection}>
                <View style={styles.imageContainer}>
                    <LinearGradient
                        colors={[colors.primary + '20', colors.primary + '40']}
                        style={styles.profileImageGradient}
                    >
                        {user.profilePic ? (
                            <Image
                                source={{ uri: user.profilePic }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Text style={[styles.initials, { color: colors.primary }]}>
                                {getInitials(user.username)}
                            </Text>
                        )}
                    </LinearGradient>
                    <View style={[
                        styles.statusIndicator,
                        { 
                            backgroundColor: user.status === 'online' ? '#4CAF50' : '#9E9E9E',
                            borderColor: colors.background
                        }
                    ]} />
                </View>
                <View style={styles.userInfo}>
                    <Text style={[styles.username, { color: colors.text }]}>{user.username}</Text>
                    <Text style={[styles.role, { color: colors.text + '80' }]}>{user.role}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.messageButton}
                onPress={handleMessagePress}
                activeOpacity={0.7}
            >
                <Fontisto name="hipchat" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 12,
    },
    profileImageGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    initials: {
        fontSize: 20,
        fontWeight: '600',
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
    },
    messageButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
}) 