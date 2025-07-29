import { View, Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Marquee } from "@animatereactnative/marquee"
import React from 'react'

const images = [
  "https://cdn.dribbble.com/userupload/37446909/file/original-4305a0c8f653dcc006c01f8b2b884d5f.png?format=webp&resize=640x480&vertical=center",
  "https://cdn.dribbble.com/userupload/4652802/file/original-420c003e02f051857c438682952347f7.png?format=webp&resize=400x300&vertical=center",
  "https://cdn.dribbble.com/userupload/34376506/file/original-ae88728de25bec9c32f5a95d48791070.png?format=webp&resize=400x300&vertical=center",
  "https://cdn.dribbble.com/userupload/6979137/file/original-d104d85f3c6cb50f2ba8eb424c330dac.jpg?format=webp&resize=400x300&vertical=center"
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
