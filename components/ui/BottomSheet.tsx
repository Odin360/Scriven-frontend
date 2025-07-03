import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React,{PropsWithChildren, useMemo, useRef} from 'react'
import {
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';

interface bottomSheetTypes{
    children:PropsWithChildren | any,
    ref:BottomSheetModal | any,
    style?:ViewStyle
}

const BottomSheet = ({children,ref,style}:bottomSheetTypes) => {
  const {width}=Dimensions.get("window")
    const snapPoints=useMemo(()=>["50%","90%"],[])
  return (
    <BottomSheetModal ref={ref} containerStyle={{backgroundColor:"transparent"}} backgroundStyle={{backgroundColor:"transparent",alignItems:"center",flex:1}}  snapPoints={snapPoints} style={style} index={1} handleStyle={{height:0}} handleIndicatorStyle={{height:0}}>
        
         {children}

    </BottomSheetModal>
  )
}

export default BottomSheet

const styles = StyleSheet.create({})