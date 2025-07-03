import ChatProvider from "@/providers/ChatProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot, Stack } from "expo-router";
import VideoProvider from "../../providers/VideoProvider";

export default function ProtectedLayout(){
    return (
        <ChatProvider>
            <VideoProvider>
            <BottomSheetModalProvider>
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(otherScreens)"/>
        </Stack>
        </BottomSheetModalProvider>
        </VideoProvider>
       </ChatProvider> 
        
    )
}