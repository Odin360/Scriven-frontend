import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ChannelList } from 'stream-chat-expo';
import { useAppContext } from '@/providers/AppContext';
import { router } from 'expo-router';
import { useSharedValue } from 'react-native-reanimated';
import Header from '@/components/ui/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserStore } from '@/store/useUserStore';
import { useTeamStore } from '@/store/useTeamStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '@/hooks/useThemeColor';

const headerHeight = 160;

const TAB_DATA = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'groups', label: 'Groups' },
  { key: 'mentions', label: 'Mentions' },
];

const TAB_BAR_HEIGHT = 48;
const TAB_UNDERLINE_HEIGHT = 3;

interface AnimatedTabBarProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
  tabLayouts: { set: (idx: number, x: number, width: number) => void };
  underlineX: any;
  underlineWidth: any;
}

const AnimatedTabBar = ({ activeTab, setActiveTab, tabLayouts, underlineX, underlineWidth }: AnimatedTabBarProps) => {
  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    width: underlineWidth.value,
    transform: [{ translateX: underlineX.value }],
  }));
const colors=useThemeColors()
  return (
    <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={[colors.background,colors.gradientEnd,colors.background]} style={styles.tabBarContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {TAB_DATA.map((tab, idx) => {
          const isActive = activeTab === idx;
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { scale: withTiming(isActive ? 1.12 : 1, { duration: 200 }) },
            ],
          }));

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              onPress={() => setActiveTab(idx)}
              onLayout={e => {
                const layout = e.nativeEvent.layout;
                runOnJS(tabLayouts.set)(idx, layout.x, layout.width);
              }}
              style={styles.tabButton}
            >
              <Animated.View style={animatedStyle}>
                <Text style={[styles.tabLabel, isActive ? styles.activeTabLabel : styles.inactiveTabLabel,isActive ? {color:colors.textPrimary} : styles.inactiveTabLabel]}>
                  {tab.label}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
        <Animated.View style={[styles.tabIndicator,{backgroundColor:colors.textPrimary}, animatedIndicatorStyle]} />
      </ScrollView>
    </LinearGradient>
  );
};

const MessagesScreen = () => {
  const userId = useUserStore(state => state.id);
  const teamId = useTeamStore(state => state.id);
  const scrollY = useSharedValue(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { setChannel } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [tabMeta, setTabMeta] = useState(Array(TAB_DATA.length).fill({ x: 0, width: 0 }));
  const underlineX = useSharedValue(0);
  const underlineWidth = useSharedValue(0);

  const setTabLayout = (idx: number, x: number, width: number) => {
    setTabMeta(prev => {
      const next = [...prev];
      next[idx] = { x, width };
      return next;
    });
  };

  useEffect(() => {
    const { x, width } = tabMeta[activeTab] || { x: 0, width: 0 };
    underlineWidth.value = withTiming(width, { duration: 200 });
    underlineX.value = withTiming(x, { duration: 200 });
  }, [activeTab, tabMeta]);

  let channelFilters: any = { members: { '$in': [userId] } };
  if (activeTab === 1) {
    channelFilters = { ...channelFilters, unread_count: { $gt: 0 } };
  } else if (activeTab === 2) {
    channelFilters = { ...channelFilters, type: 'team' };
  } else if (activeTab === 3) {
    channelFilters = { ...channelFilters, own_capabilities: { $in: ['read'] } };
  }

  const options = {
    presence: true,
    state: true,
    watch: true,
  };

  return (
   
      <View style={styles.container}>
        <StatusBar hidden={true}  />
        <Header scrollY={scrollY} headerHeight={headerHeight} />
        <AnimatedTabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabLayouts={{ set: setTabLayout }}
          underlineX={underlineX}
          underlineWidth={underlineWidth}
        />
        <ChannelList
          additionalFlatListProps={{
            showsVerticalScrollIndicator:false,
            onScroll: (event) => {
              scrollY.value = event.nativeEvent.contentOffset.y;
            },
            onScrollBeginDrag: () => setIsScrolling(true),
            onScrollEndDrag: () => setIsScrolling(false),
          }}
          onSelect={(channel) => {
            setChannel(channel);
            if (channel._data.members?.includes("Maya-v2")) {
              router.push("/(protected)/(otherScreens)/mayaChatScreen");
            } else {
              router.push("/(protected)/(otherScreens)/chatScreen");
            }
          }}
          filters={channelFilters}
          sort={{ last_message_at: -1 }}
          options={options}
        />
      </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    height: TAB_BAR_HEIGHT,
    justifyContent: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabButton: {
    marginHorizontal: 12,
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
  activeTabLabel: {
    fontWeight: '700',
   // color: '#222',
  },
  inactiveTabLabel: {
    fontWeight: '500',
    color: '#888',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: TAB_UNDERLINE_HEIGHT,
    //backgroundColor: '#222',
    borderRadius: 2,
  },
});

export default MessagesScreen;
