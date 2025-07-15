import {View,StyleSheet,TextInput,Text,Image} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
export default function Header(){
    const [search,setSearch]=useState("")
    return (<>         <View style={{alignItems:'center',flexDirection:"row",justifyContent: 'space-between',padding:10}}>
           <Image style={{height:30,width:120}} source={{uri:"https://drive.google.com/uc?export=view&id=1IzjwbMxqoI066vUOcFg2oCswWgaoLBFK"}}/> 
           <View style={{flexDirection:"row",gap:5,justifyContent:"center"}}>
           <Ionicons name="notifications" size={24} color="#FF8C00" />
           </View>
           
        </View>
        <View style={styles.searchWrapper}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search anything with Maya 🐝👓"
                    placeholderTextColor="black"
                    value={search}
                    onChangeText={setSearch}
                  />
                  <MaterialCommunityIcons name="magnify" size={20} color="#555" style={{marginLeft:8}} />
                </View>
        

        </>

    )
}
const styles=StyleSheet.create({
 searchWrapper: {
    borderWidth:1,
    borderColor:"#FF8C00",
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal:20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
 
})