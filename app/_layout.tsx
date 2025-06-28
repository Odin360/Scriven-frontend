import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ChatProvider from '@/providers/ChatProvider';
import { OverlayProvider } from 'stream-chat-expo';
import { AppProvider } from '@/providers/AppContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
const isLoggedIn = true
  return (
    
    <GestureHandlerRootView style={{flex:1}}>
      <OverlayProvider>
        <AppProvider>       
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='signIn' screenOptions={{headerShown:false}}>
        <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen  name="Protected" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="index" />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="landingPage" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="signIn" />
        <Stack.Screen name="onBoarding" options={{headerShown:false}}/>
        <Stack.Screen name="otpVerify" />
        <Stack.Screen name="resetPassword" />
        <Stack.Screen name="forgotPassword" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AppProvider>
    </OverlayProvider>
    </GestureHandlerRootView>
  );
}
