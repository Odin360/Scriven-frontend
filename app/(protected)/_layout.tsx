import ChatProvider from "@/providers/ChatProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot, Stack } from "expo-router";

export default function ProtectedLayout(){
    return (
        <ChatProvider>
            <BottomSheetModalProvider>
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(otherScreens)"/>
        </Stack>
        </BottomSheetModalProvider>
       </ChatProvider> 
        
    )
}