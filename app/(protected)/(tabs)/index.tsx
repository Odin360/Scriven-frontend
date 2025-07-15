import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovingImages from '@/components/ui/MarqueeComponent'
import { useUserStore } from '@/store/useUserStore'
import Header from '@/components/ui/WorkScreenHeader'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router'


const index = () => {
  const username = useUserStore(state=>state.username)

  return (
    <SafeAreaView style={{backgroundColor:"#FFFFE0",flex:1}}>
      <Header/>
      <MovingImages/>
      <Text style={styles.title}>Tools</Text>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Utilites</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <TouchableOpacity>
<Entypo name="google-drive" size={24} color="#FF8C00" />
<Text>Drive</Text>
</TouchableOpacity>
<TouchableOpacity>
  <Ionicons name="document-text" size={24} color="#FF8C00" />
  <Text>Forms</Text>
  </TouchableOpacity>
  <TouchableOpacity>
<Entypo name="mail" size={24} color="#FF8C00" />
<Text>Mail</Text>
</TouchableOpacity>
<TouchableOpacity>
  <FontAwesome5 name="bitcoin" size={24} color="#FF8C00" />
  <Text>Market</Text>
</TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Meeting</Text>
       <View style={{flexDirection:"row",gap:20}}>
  <TouchableOpacity onPress={()=>router.push("/createCall")}>
                        <Ionicons name="videocam" size={24} color={"#FF8C00"} />
                        <Text>Start</Text>
                    </TouchableOpacity>
        <TouchableOpacity  onPress={()=>router.push("/joinCall")}>
                        <Ionicons name="enter" size={24} color={"#FF8C00"} />
                        <Text>Join</Text>
                    </TouchableOpacity>             
      </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  title:{
  marginLeft:10,
  fontSize:18,
  fontWeight:"bold",
  marginVertical:10
  },
  subtitle:{
  fontSize:16,
  fontWeight:"bold",
  },
   card: {
    backgroundColor:"#FFFF99",
      justifyContent: "center",
      padding: 16,
      width: '90%',
      marginBottom: '5%',
      alignSelf: "center",
      borderRadius: 18,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      gap:5,
      shadowOpacity: 0.25,
      shadowRadius: 18,
      elevation:5,
    }
})
export default index