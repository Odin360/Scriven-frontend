import { Dimensions, StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColors } from '@/hooks/useThemeColor'
import { LinearGradient } from 'expo-linear-gradient'

const CallHeader = ({children}:PropsWithChildren) => {
  const colors = useThemeColors()
  const {width}=Dimensions.get("window")
  return (
    
   <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={["#1E2A33","#3C2A4D", "#4A2F36"]} style={{alignItems:'center',flexDirection:"row",borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:"#2E2E2E",height:width*0.2,justifyContent:"center"}}>
          {children}
    </LinearGradient>
    
    
  )
}

export default CallHeader