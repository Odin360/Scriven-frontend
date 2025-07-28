import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovingImages from '@/components/ui/MarqueeComponent'
import { useUserStore } from '@/store/useUserStore'
import Header from '@/components/ui/WorkScreenHeader'
import { BellIcon, CalendarIcon, FigmaLogoIcon, GithubLogoIcon, GoogleDriveLogoIcon, MagnifyingGlassIcon, NotionLogoIcon, SlackLogoIcon, VideoCameraIcon, VideoConferenceIcon } from 'phosphor-react-native'
import IconContainer from '@/components/ui/IconContainer'
import Rive, { Fit, RiveRef } from 'rive-react-native'
import { useThemeColors } from '@/hooks/useThemeColor'
import { router } from 'expo-router'

const index = () => {
  const riveRocketRef = useRef<RiveRef>(null)
  const colors = useThemeColors()
  const [search, setSearch] = useState("")
  const { width } = Dimensions.get("window")

  return (
    <SafeAreaView style={{ backgroundColor: colors.gradientMiddle, flex: 1 }}>
      
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Image
          style={styles.logo}
          source={{ uri: "https://drive.google.com/uc?export=view&id=1n8rZC_2mUS6Cj8fX0wK9Pk2MSdpQpNp8" }}
        />
        <BellIcon size={24} weight="duotone" duotoneColor={colors.iconSecondary} color={colors.iconColor} />
      </View>

      {/* Main container */}
      <View style={{ flex: 1, backgroundColor: colors.background, borderTopRightRadius: width * 0.3 }}>

        {/* Search bar */}
        <View style={[styles.searchWrapper, { backgroundColor: colors.border, borderColor: colors.iconColor }]}>
          <TextInput
            style={[styles.searchInput, { backgroundColor: colors.border }]}
            placeholder="Search or Ask Maya anything"
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
          <MagnifyingGlassIcon size={20} color={colors.iconColor} style={{ marginLeft: 8 }} />
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

          {/* Rive animation */}
          <View style={{ width: width * 0.6, height: width * 0.6, alignSelf: "center" }}>
            <Rive
              url="https://drive.google.com/uc?export=view&id=1McTr0xI5gH2r8mEVjCKNwyiL-9lC7gLV"
              ref={riveRocketRef}
              fit={Fit.Contain}
            />
          </View>

          <Text style={{ alignSelf: "flex-start", color: colors.textSecondary, marginLeft: 20, marginTop: -10 }}>
            No searches yet
          </Text>

          {/* Icon Group 1 */}
          <View style={styles.iconSet}>
            <IconContainer onPress={() => router.push("/(protected)/(otherScreens)/createCall")}>
              <VideoCameraIcon color={colors.iconColor} weight='fill' />
              <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>Create{"\n"}Meeting</Text>
            </IconContainer>
            <IconContainer onPress={() => router.push("/(protected)/(otherScreens)/joinCall")}>
              <VideoConferenceIcon color={colors.iconColor} weight='fill' />
              <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>Join{"\n"}Meeting</Text>
            </IconContainer>
          </View>

          {/* Icon Group 2 */}
          <View style={styles.iconSet}>
            <IconContainer onPress={() => router.push("/")}>
              <CalendarIcon color={colors.iconColor} weight='fill' />
              <Text style={{ color: colors.textPrimary }}>Calendar</Text>
            </IconContainer>
            <IconContainer onPress={() => router.push("/")}>
              <GithubLogoIcon color={colors.iconColor} weight='fill' />
              <Text style={{ color: colors.textPrimary }}>Github</Text>
            </IconContainer>
            <IconContainer onPress={() => router.push("/")}>
              <SlackLogoIcon color={colors.iconColor} weight='fill' />
              <Text style={{ color: colors.textPrimary }}>Schedule</Text>
            </IconContainer>
          </View>

          {/* Third Icon set – Tools/Apps */}
          <View style={[styles.toolsContainer, { backgroundColor: colors.surface }]}>
            {[
              "5WMku3i3tES6",
              "ya4CrqO7PgnY",
              "30465",
              "F6H2fsqXKBwH",
              "zfHRZ6i1Wg0U"
            ].map((id) => (
              <Image
                key={id}
                style={styles.toolIcon}
                resizeMode='contain'
                source={{ uri: `https://img.icons8.com/?size=100&id=${id}&format=png&color=000000` }}
              />
            ))}
          </View>

          {/* Footer Moving Images */}
          <MovingImages />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 10
  },
  logo: {
    height: 30,
    width: 120,
  },
  searchWrapper: {
    borderWidth: 1,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  iconSet: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  toolsContainer: {
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  toolIcon: {
    height: 60,
    width: 60,
  }
})

export default index
