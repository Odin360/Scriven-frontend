import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ChannelList } from 'stream-chat-expo'
import { useAppContext } from '@/providers/AppContext'
import { router } from 'expo-router'
import { useSharedValue } from 'react-native-reanimated'
import Header from '@/components/ui/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated'

import { useUserStore } from '@/store/useUserStore'
import { useTeamStore } from '@/store/useTeamStore'

const headerHeight=160
const TAB_DATA = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'groups', label: 'Groups' },
  { key: 'mentions', label: 'Mentions' },
]

const TAB_BAR_HEIGHT = 48
const TAB_UNDERLINE_HEIGHT = 3

// Add types for AnimatedTabBar props
interface AnimatedTabBarProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
  tabLayouts: { set: (idx: number, x: number, width: number) => void };
  underlineX: any;
  underlineWidth: any;
}

const AnimatedTabBar = ({ activeTab, setActiveTab, tabLayouts, underlineX, underlineWidth }: AnimatedTabBarProps) => (
  <View style={{ height: TAB_BAR_HEIGHT, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee', justifyContent: 'center' }}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
    >
      {TAB_DATA.map((tab, idx) => {
        const isActive = activeTab === idx
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            { scale: withTiming(isActive ? 1.12 : 1, { duration: 200 }) },
          ],
        }))
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => setActiveTab(idx)}
            onLayout={e => {
              const layout = e.nativeEvent.layout
              runOnJS(tabLayouts.set)(idx, layout.x, layout.width)
            }}
            style={{ marginHorizontal: 12, paddingVertical: 8 }}
          >
            <Animated.View style={animatedStyle}>
              <Text style={{
                fontSize: 16,
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#222' : '#888',
                letterSpacing: 0.2,
              }}>{tab.label}</Text>
            </Animated.View>
          </TouchableOpacity>
        )
      })}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 8,
            height: TAB_UNDERLINE_HEIGHT,
            backgroundColor: '#222',
            borderRadius: 2,
          },
          useAnimatedStyle(() => ({
            width: underlineWidth.value,
            transform: [{ translateX: underlineX.value }],
          })),
        ]}
      />
    </ScrollView>
  </View>
)

const messages = () => {
  const userId = useUserStore(state=>state.id)
  const teamId =useTeamStore(state=>state.id)
  const scrollY= useSharedValue(0)
  const[isScrolling,setIsScrolling]=useState(false)
  const {setChannel}=useAppContext()
  const [activeTab, setActiveTab] = useState(0)
  const [tabMeta, setTabMeta] = useState(Array(TAB_DATA.length).fill({ x: 0, width: 0 }))
  const underlineX = useSharedValue(0)
  const underlineWidth = useSharedValue(0)

  // Helper to update tab layout on layout
  const setTabLayout = (idx: number, x: number, width: number) => {
    setTabMeta(prev => {
      const next = [...prev]
      next[idx] = { x, width }
      return next
    })
  }
  // Animate underline on tab change or layout change
  React.useEffect(() => {
    const { x, width } = tabMeta[activeTab] || { x: 0, width: 0 }
    underlineWidth.value = withTiming(width, { duration: 200 })
    underlineX.value = withTiming(x, { duration: 200 })
  }, [activeTab, tabMeta])

  // Filtering logic
  
  let channelFilters: any = { members: { '$in': [userId] } }
  if (activeTab === 1) {
    
    channelFilters = { ...channelFilters, unread_count: { $gt: 0 } }
  } else if (activeTab === 2) {
    
    channelFilters = { ...channelFilters, type: 'team' } // Adjust 'team' to your group channel type if needed
  } else if (activeTab === 3) {
    
    channelFilters = { ...channelFilters, 'own_capabilities': { $in: ['read'] } } // Placeholder
  }

  const options = {
    presence: true,
    state: true,
    watch: true,
  };
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header scrollY={scrollY} headerHeight={headerHeight}/>
    
             <AnimatedTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabLayouts={{ set: setTabLayout }}
        underlineX={underlineX}
        underlineWidth={underlineWidth}
      />
             <ChannelList 
        additionalFlatListProps={
          {
            onScroll(event) {
                scrollY.value=event.nativeEvent.contentOffset.y
            },
            onScrollBeginDrag:()=>{setIsScrolling(true)},
            onScrollEndDrag:()=>{setIsScrolling(false)}
              
          }
        }
          onSelect={(channel)=>{
            setChannel(channel)
            if(channel._data.members?.includes("Maya-v2")){      
            router.push("/Protected/(OtherScreens)/mayaChatScreen")}
            else{
              router.push("/Protected/(OtherScreens)/chatScreen")
            }
          }}
          filters={channelFilters}
          sort={{last_message_at:-1}}
          options={options}
        /></View>
 </SafeAreaView>
      
     
   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  channelListContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 90 : 70,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  iconButton: {
    padding: 8,
  },
});

export default messages
