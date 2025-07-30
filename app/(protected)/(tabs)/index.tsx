import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovingImages from '@/components/ui/MarqueeComponent'
import { BellIcon, CalendarIcon, FigmaLogoIcon, GithubLogoIcon, GoogleDriveLogoIcon, MagnifyingGlassIcon, NotionLogoIcon, SlackLogoIcon, VideoCameraIcon, VideoConferenceIcon, XCircleIcon } from 'phosphor-react-native'
import IconContainer from '@/components/ui/IconContainer'
import Rive, { Fit, RiveRef } from 'rive-react-native'
import { useThemeColors } from '@/hooks/useThemeColor'
import { Href, router } from 'expo-router'
import { ExternalLink } from '@/components/ExternalLink'
import { useTeamStore } from '@/store/useTeamStore'
import axios from 'axios'
import { BASEURL } from '@/constants/Api'
import { useUserStore } from '@/store/useUserStore'
import { useAuthStore } from '@/store/useAuthStore'

const index = () => {
  const riveRocketRef = useRef<RiveRef>(null)
  const colors = useThemeColors()
  const [search, setSearch] = useState("")
  const { width } = Dimensions.get("window")
  const teamDrive = useTeamStore(state => state.drive)
  const token = useAuthStore(state => state.token)
  const [searchResult, setSearchResult] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false);
const [currentSource, setCurrentSource] = useState("Searching Wikipedia...");

useEffect(() => {
  let timer:number;
  if (loading) {
    let index = 0;
    const sources = [
      "thinking hard",
      "Searching Google...",
      "Checking News archives...",
      "Looking up academic papers...",
      "Digging through blog posts...",
      "Scanning social media..."
    ];
    timer = setInterval(() => {
      setCurrentSource(sources[index]);
      index = (index + 1) % sources.length;
    }, 1200);
  } else {
    setCurrentSource("Searching Wikipedia...");
  }
  return () => clearInterval(timer);
}, [loading]);


  const AiSearch = async () => {
    const result = await axios.get(`${BASEURL}/ai/searchAi?prompt=${search}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    return result.data
  }

 const handleSearch = async () => {
  if (!search.trim()) return;

  setLoading(true);
  try {
    const data = await AiSearch();
    setSearchResult(data);
    setHasSearched(true);
  } catch (error) {
    console.error("Search failed", error);
  } finally {
    setLoading(false);
  }
};
const handleClearSearch = () => {
  setSearch("");
  setSearchResult(null);
  setHasSearched(false);
};


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
          <TouchableOpacity onPress={handleSearch}>
            <MagnifyingGlassIcon size={20} color={colors.iconColor} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {hasSearched && (
  <TouchableOpacity 
    onPress={handleClearSearch} 
    style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      alignSelf: 'flex-end',
      marginRight: 20, 
      marginBottom: 10 
    }}
  >
    <XCircleIcon size={20} color={colors.primaryButton} weight='duotone' />
    <Text style={{ 
      color: colors.primaryButton, 
      fontWeight: 'bold', 
      marginLeft: 6 
    }}>
      Clear Search
    </Text>
  </TouchableOpacity>
)}

          {/* AI Result or Rive animation */}
         {loading ? (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#6200EE" />
    <Text style={styles.loadingText}>{currentSource}</Text>
  </View>
) : hasSearched ? (
  <View style={styles.resultBoxContainer}>
    <Text style={styles.resultTitle}>✨🌠 Search Result</Text>
    <ScrollView style={styles.resultScroll} nestedScrollEnabled={true}>
      <Text style={styles.resultText}>
        {searchResult}
      </Text>
    </ScrollView>
  </View>
) : (
  <>
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
  </>
)}

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
            <IconContainer onPress={() => router.push("/summary")}>
              <SlackLogoIcon color={colors.iconColor} weight='fill' />
              <Text style={{ color: colors.textPrimary }}>Summary</Text>
            </IconContainer>
          </View>

  
          {/* Tools/Apps */}
          <View style={[styles.toolsContainer, { backgroundColor: colors.surface }]}>
            {[
              { id: "5WMku3i3tES6", href: "https://www.trello.com" },
              { id: "ya4CrqO7PgnY", href: teamDrive ? teamDrive : "https://drive.google.com" },
              { id: "30465", href: "https://docs.google.com/document" },
              { id: "F6H2fsqXKBwH", href: "https://www.notion.so" },
              { id: "zfHRZ6i1Wg0U", href: "https://www.figma.com" }
            ].map((item) => (
              <ExternalLink key={item.id} href={item.href}>
                <Image
                  style={styles.toolIcon}
                  resizeMode='contain'
                  source={{ uri: `https://img.icons8.com/?size=100&id=${item.id}&format=png&color=000000` }}
                />
              </ExternalLink>
            ))}
          </View>

          {/* Footer Moving Images */}
          <MovingImages />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
export default index

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
  loaderContainer: {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
},
loadingText: {
  marginTop: 10,
  fontSize: 16,
  color: "#888",
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
  },
  resultBoxContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#222222",
    marginBottom: 10,
  },
  resultScroll: {
    maxHeight: 300,
  },
  resultText: {
    color: "#555555",
    lineHeight: 22,
  }
})
