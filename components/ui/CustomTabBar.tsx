import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = (width - 32) / TAB_COUNT;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CustomTabBar = ({ state, descriptors, navigation }:any) => {
  const translateX = useSharedValue(0);
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const activeColor = isDark?'#ffffff':'#444444';
  const inactiveColor = isDark ? '#aaaaaa' : '#444444';

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 20,
      stiffness: 300,
    });
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const TabButton = ({ route, index }:any) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;
    const icon = options.tabBarIcon;
    const badge = options.tabBarBadge;

    const isFocused = state.index === index;

    const scale = useSharedValue(1);
    const xPosition = index * TAB_WIDTH;

    const tabStyle = useAnimatedStyle(() => {
      const distance = Math.abs(translateX.value - xPosition);

      const animatedScale = interpolate(
        distance,
        [0, TAB_WIDTH],
        [1.2, 0.8],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );

      const opacity = interpolate(
        distance,
        [0, TAB_WIDTH],
        [1, 0.6],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );

      return {
        transform: [{ scale: scale.value * animatedScale }],
        opacity,
      };
    });

    const onPress = () => {
      Haptics.selectionAsync();

      scale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withTiming(1.1, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );

      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const isCenter = index === Math.floor(TAB_COUNT / 2);

    return (
      <AnimatedTouchable
        key={route.key}
        onPress={onPress}
        style={[styles.tab, isCenter && styles.centerTab, tabStyle]}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapper}>
          {icon?.({ focused: isFocused, color: isFocused ? activeColor : inactiveColor, size: 24 })}
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        {!isCenter && !isFocused && (
  <Text
    style={[
      styles.label,
      {
        color: inactiveColor,
        marginTop: 2,
      },
    ]}
  >
    {label}
  </Text>
)}

      </AnimatedTouchable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <BlurView
        style={styles.absolute}
        intensity={40}
        tint={theme === 'dark' ? 'dark' : 'light'}
      />
      <View style={styles.container}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        {state.routes.map((route:any, index:any) => (
          <TabButton key={route.key} route={route} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 24,
    left: 16,
    right: 16,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
  },
  container: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    width: TAB_WIDTH - 16,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    left: 8,
    transform: [{ translateY: -24 }],
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  centerTab: {
    marginTop: -20,
    backgroundColor: '#007aff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 16,
    paddingHorizontal: 4,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default CustomTabBar