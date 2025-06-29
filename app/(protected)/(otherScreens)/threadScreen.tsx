import {Thread,Channel, MessageInput} from 'stream-chat-expo'
import { useAppContext } from '@/providers/AppContext'
import { ActivityIndicator,View,Text,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons,Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useTheme } from '@react-navigation/native'
export default function ThreadScreen(){
    const {colors}=useTheme()
    const{channel,thread}=useAppContext()
    if(!channel){
        return(
            <ActivityIndicator size={'large'}/>
        )
    }
    return (<SafeAreaView>
        <View style={{alignItems:'center',flexDirection:"row",justifyContent: 'space-between',borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.primary,height:50,padding:10}}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>router.back()} />
            <Text style={{fontWeight:"bold",color:colors.text}}>Thread</Text>
            <Feather name="more-vertical" size={24} color="black" />
        </View>
        <Channel channel={channel} thread={thread} threadList>
<Thread/>
        </Channel>
        </SafeAreaView>
    )
}