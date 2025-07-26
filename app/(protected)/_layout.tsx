import ChatProvider from "@/providers/ChatProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot, Stack } from "expo-router";
import VideoProvider from "../../providers/VideoProvider";
import CallProvider from "@/providers/CallProvider";

export default function ProtectedLayout(){
    return (
        <ChatProvider>
            <VideoProvider>
            <CallProvider>
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(otherScreens)"/>
        </Stack>
        </CallProvider>
        </VideoProvider>
       </ChatProvider> 
        
    )
}