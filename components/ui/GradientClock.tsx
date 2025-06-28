import {View, Dimensions,Text} from 'react-native'
import {Stack} from 'expo-router'
import {Blend, BlendMode, BlurMask, Canvas, Rect,rotate,SweepGradient,vec} from '@shopify/react-native-skia'
import { Easing, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'
export default function GradientClock(){
  useEffect(()=>{
    rotation.value=withRepeat(withTiming(2,{
      duration:5000,
      easing:Easing.linear
    }),-1,false)
  },[])
  const {width,height} = Dimensions.get('window')
  const center = vec(width/2,height/2)
  const rotation = useSharedValue(0);
  const animatedRotation=useDerivedValue(()=>{
    return [{rotate:Math.PI*rotation.value}]
  },[rotation])
  return(
    <>
   <Stack.Screen options={{headerShown:false}}/>
    <View style={{flex:1}}>   
    <Canvas style={{flex:1}}>
   <Rect x={0} y={0} width={width} height={height}>
    
    <SweepGradient
     c={center}
     origin={center}
     colors={["#00FFFF", "#0000FF", "#FFC0CB", "#FFD200","#FFA500","#00FFFF"]}
     start={0}
     end={360}
     transform={animatedRotation}
     />
 {/*<BlurMask blur={50} style="normal"/>*/}
 
   </Rect>
    </Canvas>
     </View>
     </>
  )
}