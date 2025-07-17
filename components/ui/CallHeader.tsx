import { View, Text } from
 'react-native'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const CallHeader = ({children}:PropsWithChildren) => {
  return (
    <SafeAreaView>   
    <View style={{alignItems:"center",justifyContent:"center"}}>
      {children}
    </View>
    </SafeAreaView>
    
  )
}

export default CallHeader