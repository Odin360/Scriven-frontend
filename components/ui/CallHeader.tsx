import { StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColors } from '@/hooks/useThemeColor'
import { LinearGradient } from 'expo-linear-gradient'

const CallHeader = ({children}:PropsWithChildren) => {
  const colors = useThemeColors()
  return (
    <SafeAreaView>   
   <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={[colors.gradientStart,colors.gradientMiddle,colors.gradientEnd]} style={{alignItems:'center',flexDirection:"row",borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.border,height:50,padding:10,justifyContent:"center"}}>
          {children}
    </LinearGradient>
    </SafeAreaView>
    
  )
}

export default CallHeader