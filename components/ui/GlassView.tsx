import { StyleSheet, Text, View } from 'react-native'
import React,{PropsWithChildren} from 'react'
import { BlurView } from 'expo-blur'

const GlassView = ({children,style}:PropsWithChildren|any) => {
  return (
    <View style={[styles.glassView,style]}>

      {children}
      
    </View>
  )
}

export default GlassView

const styles = StyleSheet.create({
    glassView:{
        backgroundColor:'rgba(0,0,0,0.1)',
         shadowColor:"black",
     shadowOffset:{width:0,height:0}, 
 shadowOpacity:0.5,
 shadowRadius:20,
 elevation:20,
    }
})