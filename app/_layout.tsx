import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import {StatusBar} from 'expo-status-bar'
import { AppProvider } from "@/providers/AppContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {useFonts} from 'expo-font'
import type{DeepPartial,Theme} from "stream-chat-expo"
import { useThemeColors } from "@/hooks/useThemeColor";
import { Background } from "@react-navigation/elements";





export default function RootLayout() {
   const colors= useThemeColors();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  
const theme:DeepPartial<Theme> = {
 channelListMessenger:{
  flatList:{
    backgroundColor:colors.background,
  },
  flatListContent:{
    backgroundColor:colors.background
  }
 },
 channelPreview:{
  container:{
    backgroundColor:colors.surface
  },
  title:{
    color:colors.textPrimary
  }
 }
}
  return( 
   
    <GestureHandlerRootView style={{flex:1}}>
      <OverlayProvider value ={{style:theme}}>
        <AppProvider>        
    <Stack screenOptions={{headerShown:false}}/>
     <StatusBar style="auto" />
    </AppProvider>
    </OverlayProvider>
    </GestureHandlerRootView>
);
}
