import { View, Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Marquee } from "@animatereactnative/marquee"
import React from 'react'

const images = [
 "https://drive.google.com/uc?export=view&id=1Z6WodeBbylPbFqER-flhDr9T-KSG9RZ-",
  "https://drive.google.com/uc?export=view&id=1ZDrHNnqlBtTk6NutogAVVOL_1fbZRj-n",
 "https://drive.google.com/uc?export=view&id=1ZAqcYddl49qVE-46lX002ezuTJfDKjZV",
]

const { width } = Dimensions.get("window")

export default function MovingImages() {
  return (
    <Marquee spacing={30} speed={0.5} style={{ marginBottom: 100 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image) => (
          <View key={image} style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </Marquee>
  )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: width * 0.5,
    marginHorizontal: 8,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
