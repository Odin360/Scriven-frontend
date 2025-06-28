import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';

const {width} = Dimensions.get("window");
const boxWidth = width*0.13;
const boxHeight = boxWidth *1.2
const OtpBox = ({value}:any) => {
    
  return (
    
        <View style={{alignItems:'center',
        justifyContent:'center',
  borderColor:Colors.light.primaryColor,
      width:boxWidth,
      height:boxHeight,
      backgroundColor:"white",
      borderWidth:1,
      borderRadius:10}}>
      <TextInput
      keyboardType="numeric"
      onChangeText={(text)=>value(text)}
      maxLength={1}
      style={{fontSize:20,color:Colors.light.primaryColor,flex:1,width:"100%",padding:boxWidth/3}}
      />
      </View>
  
  )
}

export default OtpBox

const styles = StyleSheet.create({})