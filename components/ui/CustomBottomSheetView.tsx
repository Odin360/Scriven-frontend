import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { ThemedView } from '../ThemedView'
import GradientClock from "@/components/ui/GradientClock"

const CustomBottomSheetView = ({children}:PropsWithChildren) => {
    const {width,height}=Dimensions.get("window")
  return (
    <View style={{flex:1,height:height,
      width:width,
      padding:10,backgroundColor:"transparent",alignSelf:"center",overflow:"hidden"}}>
<View style={{flex:1,backgroundColor:"white",borderRadius:25,overflow:"hidden"}}> 
  <GradientClock/>
  <ThemedView style={{position:"absolute",borderRadius:25,height:height-40,width:width-40,top:10,alignSelf:"center"}}>
{children}
  </ThemedView>
  </View>
 </View>)
}

export default CustomBottomSheetView

const styles = StyleSheet.create({})