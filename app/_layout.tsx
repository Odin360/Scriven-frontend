import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import {StatusBar} from 'expo-status-bar'
import { AppProvider } from "@/providers/AppContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {useFonts} from 'expo-font'

export default function RootLayout() {
   const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return( 
   
    <GestureHandlerRootView style={{flex:1}}>
      <OverlayProvider>
        <AppProvider> 
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>        
    <Stack screenOptions={{headerShown:false}}/>
     <StatusBar style="auto" />
  </ThemeProvider>
    </AppProvider>
    </OverlayProvider>
    </GestureHandlerRootView>
);
}
