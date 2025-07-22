import { StyleSheet, TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import { useThemeColors } from '@/hooks/useThemeColor'
const {width} = Dimensions.get("window")

const IconContainer = ({children,onPress}:{children:React.ReactNode,onPress:any}) => {
    const colors =useThemeColors() 
    return (
    <TouchableOpacity style={[styles.container,{borderColor:colors.iconColor,backgroundColor:colors.surface}]} onPress={onPress}>
      {children}
    </TouchableOpacity>
    
  )
}

export default IconContainer

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        borderRadius:15,
        justifyContent:"center",
        height:width*0.2,
        width:width*0.2,
        borderWidth:1
    }
})