import ChatProvider from "@/providers/ChatProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot, Stack } from "expo-router";
import VideoProvider from "../../providers/VideoProvider";
import CallProvider from "@/providers/CallProvider";
import NotificationsProvider from "@/providers/NotificationProvider";

export default function ProtectedLayout(){
    return (
        <ChatProvider>
            <VideoProvider>
            <CallProvider>
             <NotificationsProvider>
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(otherScreens)"/>
        </Stack>
        </NotificationsProvider>
        </CallProvider>
        </VideoProvider>
       </ChatProvider> 
        
    )
}