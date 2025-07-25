import { View, Text } from
 'react-native'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColors } from '@/hooks/useThemeColor'

const CallHeader = ({children}:PropsWithChildren) => {
  const colors = useThemeColors()
  return (
    <SafeAreaView>   
    <View style={{alignItems:"center",justifyContent:"center",backgroundColor:"black"}}>
      {children}
    </View>
    </SafeAreaView>
    
  )
}

export default CallHeader