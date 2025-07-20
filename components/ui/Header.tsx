import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "@/hooks/useThemeColor";

interface headerProps {
    headerHeight: number,
    scrollY: SharedValue<number>
}

export default function Header({ headerHeight, scrollY }: headerProps) {
    const halfHeaderHeight = headerHeight / 2;
    const quarterHeaderHeight = halfHeaderHeight / 2;

    const headerStyle = useAnimatedStyle(() => ({
        height: interpolate(scrollY.value,
            [0, headerHeight],
            [headerHeight, halfHeaderHeight],
            Extrapolation.CLAMP)
    }));

    const meetingSectionStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value,
            [0, headerHeight / 2],
            [1, 0],
            Extrapolation.CLAMP),
        transform: [{
            translateY: interpolate(scrollY.value,
                [0, headerHeight / 2],
                [0, -20],
                Extrapolation.CLAMP)
        }]
    }));
    const subHeaderStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: interpolate(scrollY.value,
                [0,headerHeight],
                [0,-halfHeaderHeight],
                Extrapolation.CLAMP)
        }]
    }));
    const colors = useThemeColors()

    return (
        <Animated.View style={[styles.headerStyle, headerStyle, { backgroundColor: colors.background }]}>
            <LinearGradient colors={[colors.gradientStart,colors.gradientMiddle,colors.background]}>
            <Animated.View style={[styles.meetingSection, meetingSectionStyle]}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Meetings</Text>
                <View style={styles.meetingIcons}>
                    <TouchableOpacity style={styles.meetingIconButton} onPress={()=>router.push("/createCall")}>
                        <Ionicons name="videocam" size={24} color={colors.iconColor} />
                        <Text style={[styles.iconText, { color: colors.textPrimary }]}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.meetingIconButton} onPress={()=>router.push("/joinCall")}>
                        <Ionicons name="enter" size={24} color={colors.iconColor} />
                        <Text style={[styles.iconText, { color: colors.textPrimary }]}>Join</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.meetingIconButton}>
                        <Ionicons name="calendar" size={24} color={colors.iconColor} />
                        <Text style={[styles.iconText, { color: colors.textPrimary }]}>Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.meetingIconButton}>
                        <Ionicons name="flash" size={24} color={colors.iconColor} />
                        <Text style={[styles.iconText, { color: colors.textPrimary }]}>Flash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.meetingIconButton}>
                        <Ionicons name="radio" size={24} color={colors.iconColor} />
                        <Text style={[styles.iconText, { color: colors.textPrimary }]}>Live</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <Animated.View style={[styles.subHeader,subHeaderStyle]}>
                <Text style={[styles.subHeaderText, { color: colors.textPrimary }]}>Conversations</Text>
                <View style={styles.subHeaderIcons}>
                    <TouchableOpacity style={styles.iconButton} onPress={()=>router.push("/(protected)/(otherScreens)/teamMembers")}>
                        <FontAwesome5 name="teamspeak" size={24} color={colors.iconColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            </LinearGradient>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
    },
    meetingSection: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    meetingIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    meetingIconButton: {
        alignItems: 'center',
        gap: 4,
    },
    iconText: {
        fontSize: 12,
        fontWeight: '500',
    },
    subHeader: {
        
        width: "100%",
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    subHeaderText: {
        fontSize: 24,
        fontWeight: '700',
    },
    subHeaderIcons: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        padding: 8,
    }
})