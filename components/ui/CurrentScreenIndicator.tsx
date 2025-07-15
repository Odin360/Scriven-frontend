import { ColorValue, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

type colorType = ViewStyle

const CurrentScreenIndicator = ({color}:any) => {
  return (
    
      <View style={{backgroundColor:color,height:4,width:32,borderRadius:2}}/>
    
  )
}

export default CurrentScreenIndicator

const styles = StyleSheet.create({})