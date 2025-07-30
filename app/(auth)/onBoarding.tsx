import { FlatList, StyleSheet, Text, View, Image, Dimensions, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get("window")
const imageWidth = width * 0.8
const imageHeight = imageWidth * 1.3

const images = [
  {
    photo: { uri: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fwelcome-decor-with-purple-flowers-h6z02z9lrmrl5y7t.jpg&sp=1753849777T7c6df1d24db929d5e90dd793c2733e23cafb4bbc49d98ab9c9b9e82db3e53a1c" },
    description: "Welcome to Scriven, your smart workspace!"
  },
  {
    photo: { uri: "https://drive.google.com/uc?export=view&id=1Z6WodeBbylPbFqER-flhDr9T-KSG9RZ-" },
    description: "Get access to a voice Assitant that can increase your productivity."
  },
  {
    photo: { uri: "https://drive.google.com/uc?export=view&id=1ZDrHNnqlBtTk6NutogAVVOL_1fbZRj-n" },
    description: "Get more with Maya Voice."
  },
  {
    photo: { uri: "https://drive.google.com/uc?export=view&id=1ZAqcYddl49qVE-46lX002ezuTJfDKjZV" },
    description: "Enjoy all the meetings you want through our highly performant services."
  },
  {
    photo: { uri: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2F1400%2F081098176216013.64c10a8cce558.png&sp=1753849700T45b9bf2c4bc9f7f68a874b6ec10659b3a292adfa27673ce6d1802882de68e1c8" },
    description: "Chat with team members all day"
  }
]

const data = images.map((item, index) => ({
  ...item,
  key: String(index),
  index
}))

const OnBoarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollXForWidth = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      scrollXForWidth.setValue(value)
    })

    // Prefetch images
    images.forEach(img => {
      Image.prefetch(img.photo.uri)
    })

    return () => {
      scrollX.removeListener(listenerId)
    }
  }, [])

  const swipeCoverWidth = scrollXForWidth.interpolate({
    inputRange: [0, (data.length - 1) * width],
    outputRange: [width * 0.8, 0],
    extrapolate: 'clamp'
  })

  return (
    <View style={styles.container}>
      {data.map(({ photo, index, key }) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
        const opacity = scrollX.interpolate({ inputRange, outputRange: [0, 1, 0] })

        return (
          <Animated.Image
            key={key}
            blurRadius={10}
            style={[StyleSheet.absoluteFill, { opacity }]}
            source={photo}
          />
        )
      })}

      <TouchableOpacity onPress={() => router.replace("/signUp")} style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.FlatList
        horizontal
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
          const translateX = scrollX.interpolate({
            inputRange, outputRange: [-width * 0.7, 0, width * 0.7]
          })

          return (
            <View style={styles.flatListContainer}>
              <View style={styles.parallaxContainer}>
                <View style={styles.parallaxImageContainer}>
                  <Animated.Image
                    style={{
                      width: imageWidth * 1.4,
                      height: imageHeight,
                      resizeMode: 'cover',
                      transform: [{ translateX }]
                    }}
                    source={item.photo}
                  />
                </View>
              </View>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          )
        }}
      />

      <View style={styles.swipeButtonWrapper}>
        <TouchableOpacity
          style={styles.swipeButton}
          onPress={() => router.replace("/signUp")}
        >
          <Text style={{ color: 'white' }}>Welcome</Text>
        </TouchableOpacity>

        <Animated.View
          style={[styles.swipeCover, { width: swipeCoverWidth }]}
        >
          <LinearGradient
            style={styles.swipeCoverGradient}
            colors={['pink', 'blue', 'pink']}
          >
            <Animated.Text style={{ color: 'white', fontSize: 16 }}>Swipe</Animated.Text>
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skip: {
    paddingTop: width * 0.1,
    marginLeft: 'auto',
    marginRight: width * 0.1
  },
  skipText: {
    fontSize: 18,
    fontWeight: '600',
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 18
  },
  flatListContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  parallaxContainer: {
    borderRadius: 18,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    shadowRadius: 20,
    elevation: 20
  },
  parallaxImageContainer: {
    width: imageWidth,
    height: imageHeight,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 18
  },
  descriptionText: {
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 40,
    fontSize: 16,
    color: 'white',
    fontWeight: '500'
  },
  swipeButtonWrapper: {
    position: 'absolute',
    bottom: width * 0.1,
    width: width * 0.8,
    height: width * 0.1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20
  },
  swipeButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'blue',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  swipeCover: {
    position: 'absolute',
    height: '100%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden'
  },
  swipeCoverGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
})
