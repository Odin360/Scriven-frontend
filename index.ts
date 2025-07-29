
import "expo-router/entry";
import messaging from '@react-native-firebase/messaging';
import { StreamChat } from "stream-chat";
import { TokenProvider } from "./Utils/tokenProvider";
import { apiKey } from "./providers/ChatProvider";
import notifee from '@notifee/react-native'
import { useUserStore } from "./store/useUserStore";
import { useAuthStore } from "./store/useAuthStore";
messaging().setBackgroundMessageHandler(async (remoteMessage:any) =>{
  console.log(remoteMessage)
  const userId = useUserStore(state=>state.id)
  const token = useAuthStore(state=>state.token)
  if(!userId || !token) return null
    const client = StreamChat.getInstance(apiKey);
   
    client._setToken(
        {
          id: userId,
        },
       ()=> TokenProvider(userId,token),
      );
      const message = await client.getMessage(remoteMessage.data.id);
      console.log(message)
      const channelId = await notifee.createChannel({
        id: 'chat-messages',
        name: 'Chat Messages',
      });
      const { stream, ...rest } = remoteMessage.data ?? {};
  const data = {
    ...rest,
    ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
  };
  await notifee.displayNotification({
    title: 'New message from ' + message?.message?.user?.name,
    body: message.message.text,
    data,
    android: {
      channelId,
      // add a press action to open the app on press
      pressAction: {
        id: 'default',
      },
    },
  });
})
