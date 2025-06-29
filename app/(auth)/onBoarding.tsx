import { FlatList, StyleSheet, Text, View,Image,Dimensions, Animated, TouchableOpacity } from 'react-native'
import React,{useEffect, useRef,useState} from 'react'
import { router } from 'expo-router'
import {LinearGradient} from 'expo-linear-gradient'

const {width} = Dimensions.get("window")
const imageWidth = width * 0.8
const imageHeight = imageWidth * 1.3
const images =[
  require("@/assets/images/welcome.png"),
  require("@/assets/images/meeting.png"),
 require("@/assets/images/translator.png"),
  require("@/assets/images/statistics.png"),
  require("@/assets/images/ai.png")
]

const data = images.map((image,index)=>({
  photo: image,
  key:String(index),
  index:index
}))

const OnBoarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current
const scrollXForWidth = useRef(new Animated.Value(0)).current
  useEffect(() => {
  const listenerId = scrollX.addListener(({ value }) => {
    scrollXForWidth.setValue(value)
  })

  return () => {
    scrollX.removeListener(listenerId)
  }
}, [])
    const swipeCoverWidth = scrollXForWidth.interpolate({
  inputRange: [0, (data.length - 1) * width],
  outputRange: [width * 0.8, 0],
  extrapolate: 'clamp'
});


  return (
 
    <View style={styles.container}>
     
      {data.map(({photo,index,key})=>{
        const inputRange = [(index-1)*width,index*width,(index+1)*width]
        const opacity = scrollX.interpolate({inputRange,outputRange:[0,1,0]})

      return( <Animated.Image
                key={key}
                blurRadius={10}
                style={[StyleSheet.absoluteFill,
                {opacity}]} 
                source={photo}/>)})}

     <TouchableOpacity 
     onPress={()=>router.replace("/signUp")}
      style={styles.skip}><Text
       style={styles.skipText}>Skip</Text>
       </TouchableOpacity>

      <Animated.FlatList
      horizontal
      onScroll={Animated.event([{
        nativeEvent:{contentOffset:
          {x: scrollX}}}],
          {useNativeDriver:true})}

      showsHorizontalScrollIndicator={false}
      pagingEnabled
      data={data}

      renderItem={
         ({item,index})=>{
        const inputRange = [(index-1)*width,index*width,(index+1)*width]
        const translateX = scrollX.interpolate({
          inputRange,outputRange:[-width*0.7,0,width*0.7] 
        })
        return(
          <View style={styles.flatListContainer}>
            <View style={styles.parallaxContainer}>
            <View style={styles.parallaxImageContainer}>
            <Animated.Image 
            style={{width:imageWidth*1.4,
            height:imageHeight,
            resizeMode:'cover',
            transform:[{translateX}]}}
             source={item.photo}/>
           </View>
       
           </View>
          </View>
        )
      }
      }/>
    <View style={{position: 'absolute', bottom: width * 0.1, width: width * 0.8, height: width * 0.1, 
     shadowColor:'black',
     shadowOffset:{width:0,height:0}, 
 shadowOpacity:0.5,
 shadowRadius:20,
 elevation:20}}>
  
  <TouchableOpacity 
    style={{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'blue',
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
    
    }}
    onPress={() => router.replace("/signUp")}
  >
    <Text style={{color: 'white'}}>Welcome</Text>
  </TouchableOpacity>

  
  <Animated.View
    style={{
      position: 'absolute',
      height: '100%',
      width: swipeCoverWidth,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      shadowColor:'black',
    shadowOffset:{width:0,height:0},
     shadowOpacity:0.5,
     backgroundColor:'white',
    shadowRadius:20,
    elevation:20,
    overflow:'hidden'
    }}
  ><LinearGradient style = {{flex:1,width:'100%',height:"100%",  borderRadius: 18,shadowColor:'black',
      alignItems: 'center',
      justifyContent: 'center',overflow:'hidden'}} colors={['pink', 'blue', 'pink']}>
    <Animated.Text style={{color: 'white',
    fontSize: 16,}}>Swipe</Animated.Text>
    </LinearGradient>
  </Animated.View>
</View>

      
    </View>
  
    
    )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  skip:{
paddingTop:width*0.1,
marginLeft:'auto',
marginRight:width*0.1
  },
  skipText:{
fontSize:18,
fontWeight:'semibold',
shadowColor:'black',
shadowOffset:{height:0,width:0},
shadowOpacity:0.5,
shadowRadius:18,
elevation:18
  },
  flatListContainer:{
width:width,
justifyContent:'center',
alignItems:'center'
  },
  parallaxContainer:{
borderRadius:18,
padding:10,
shadowColor:'black',
shadowOffset:{width:0,height:0},
shadowOpacity:0.5,
backgroundColor:'white',
shadowRadius:20,
elevation:20
  },
  parallaxImageContainer:{
width:imageWidth,
height:imageHeight,
overflow:'hidden',
alignItems:'center',
borderRadius:18
  }
})
export default OnBoarding