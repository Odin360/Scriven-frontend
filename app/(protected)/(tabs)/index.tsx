import { View, Text, TouchableOpacity,Dimensions, StyleSheet,Image, TextInput, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovingImages from '@/components/ui/MarqueeComponent'
import { useUserStore } from '@/store/useUserStore'
import Header from '@/components/ui/WorkScreenHeader'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router'
import { useThemeColors } from '@/hooks/useThemeColor'
import { BellIcon, CalendarIcon, FigmaLogoIcon, GithubLogoIcon, GoogleDriveLogoIcon, MagnifyingGlassIcon, NotionLogoIcon, SlackLogoIcon, VideoCameraIcon, VideoConferenceIcon } from 'phosphor-react-native'
import IconContainer from '@/components/ui/IconContainer'
import Rive, { Fit, RiveRef } from 'rive-react-native'

const index = () => {

  const riveRocketRef = useRef<RiveRef>(null) 
  
  const colors = useThemeColors()
  const [search,setSearch]=useState("")
  const {width} = Dimensions.get("window")
  return (
    <SafeAreaView style={{backgroundColor:colors.gradientMiddle,flex:1}}>
             <View style={{alignItems:'center',flexDirection:"row",justifyContent: 'space-between',padding:10}}>
                <Image style={{height:30,width:120}} source={{uri:"https://drive.google.com/uc?export=view&id=1n8rZC_2mUS6Cj8fX0wK9Pk2MSdpQpNp8"}}/> 
                <View style={{flexDirection:"row",gap:5,justifyContent:"center"}}>
                <BellIcon  size={24} weight="duotone" duotoneColor={colors.iconSecondary} color={colors.iconColor} />
                </View>
                
             </View>
        <View style={{flex:1,backgroundColor:colors.background,borderTopRightRadius:width*0.3}}>        
       <View style={[styles.searchWrapper,{backgroundColor:colors.border,borderColor:colors.iconColor}]}>
                        <TextInput
                          style={[styles.searchInput,{backgroundColor:colors.border}]}
                          placeholder="Search or Ask Maya anything"
                          placeholderTextColor={colors.textSecondary}
                          value={search}
                          onChangeText={setSearch}
                        />
                        <MagnifyingGlassIcon  size={20} color={colors.iconColor} style={{marginLeft:8}} />
                      </View>
                 <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>    
              <View style={{width:width*0.5,height:width*0.5,alignSelf:"center"}}>
              <Rive
      url="https://drive.google.com/uc?export=view&id=1McTr0xI5gH2r8mEVjCKNwyiL-9lC7gLV"
      ref={riveRocketRef}
      fit={Fit.Contain}
  />
  </View>
   <Text style={{alignSelf:"flex-start",color:colors.textSecondary,marginLeft:10}}>no searches yet </Text>
     
           <View style={{alignItems:"center",justifyContent:"center"}}>
        {/**first Icon set */}
       <View style={{alignItems:"center",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",gap:10,marginVertical:10}}>
        <IconContainer onPress={()=>router.push("/(protected)/(otherScreens)/createCall")}>
          <VideoCameraIcon color={colors.iconColor} weight='fill' />
        <Text style={{color:colors.textPrimary}}>Create{"\n"}Meeting</Text>
        </IconContainer>
        <IconContainer onPress={()=>router.push("/(protected)/(otherScreens)/joinCall")}>
          <VideoConferenceIcon color={colors.iconColor} weight='fill' />
        <Text style={{color:colors.textPrimary}}>Join{"\n"}Meeting</Text>
        </IconContainer>

       </View>
       {/**second Icon set */}
       <View style={{alignItems:"center",flexWrap:"wrap",flexDirection:"row",justifyContent:"center",gap:10,marginBottom:20}}>
                <IconContainer onPress={()=>router.push("/")}>
          <CalendarIcon color={colors.iconColor} weight='fill' />
        <Text style={{color:colors.textPrimary}}>Calendar</Text>
        </IconContainer>
        <IconContainer onPress={()=>router.push("/")}>
          <GithubLogoIcon color={colors.iconColor} weight='fill' />
       <Text style={{color:colors.textPrimary}}>Github</Text>
        </IconContainer>
        <IconContainer onPress={()=>router.push("/")}>
          <SlackLogoIcon color={colors.iconColor} weight='fill' />
        <Text style={{color:colors.textPrimary}}>Schedule </Text>
        </IconContainer>
       </View>
       {/*Third Icon set*/}
       <View style={{alignItems:"center",borderRadius:width*0.13,flexWrap:"wrap",padding:10,flexDirection:"row",gap:10,backgroundColor:colors.surface,width:width*0.9,marginBottom:10}}>
        <Image style={{height:width*0.13,width:width*0.13}} resizeMode='contain' source={{uri:"https://img.icons8.com/?size=100&id=5WMku3i3tES6&format=png&color=000000"}}/>
        <Image style={{height:width*0.13,width:width*0.13}} resizeMode='contain' source={{uri:"https://img.icons8.com/?size=100&id=ya4CrqO7PgnY&format=png&color=000000"}}/>
        <Image style={{height:width*0.13,width:width*0.13}} resizeMode='contain' source={{uri:"https://img.icons8.com/?size=100&id=30465&format=png&color=000000"}}/>
        <Image style={{height:width*0.13,width:width*0.13}} resizeMode='contain' source={{uri:"https://img.icons8.com/?size=100&id=F6H2fsqXKBwH&format=png&color=000000"}}/>
        <Image style={{height:width*0.13,width:width*0.13}} resizeMode='contain' source={{uri:"https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=000000"}}/>
       </View>

      </View>
      <MovingImages/>
      </ScrollView>
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
    },
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
  }
 
})
export default index