import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ChannelData, OwnUserResponse, StreamChat, UserResponse } from "stream-chat";
import { Chat } from "stream-chat-expo";
import { ActivityIndicator, View } from "react-native";
import { useUserStore } from "@/store/useUserStore";


export const apiKey = "kcghu45jpmy8";


export default function ChatProvider({ children }: PropsWithChildren) {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const userName = useUserStore(state => state.username);
  const userId = useUserStore(state => state.id);
  
const isMounted = useRef(true)
  useEffect(() => {
    isMounted.current = true

    const initChat = async () => {
      if (!userId || !userName) return;

      try {
        const client = StreamChat.getInstance(apiKey);

        await client.connectUser(
          { id: userId, name: userName },
          client.devToken(userId)
        );

        if (!isMounted.current) return;

        const channel = client.channel("messaging", {
          members: [userId, "Maya-v2"],
        });

        await channel.watch();

        if (isMounted.current) {
          setChatClient(client);
        }
      } catch (e) {
        console.error("Retrying chat connection in 2s:", e);
        setTimeout(() => {
          if (isMounted.current) initChat();
        }, 2000);
      }
    };

    initChat();

    return () => {
      isMounted.current=false;
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [userId, userName]);

  if (!chatClient) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Chat client={chatClient} isMessageAIGenerated={(message:any)=>!!message.ai_generated}>{children}</Chat>;
}
