import { PropsWithChildren, useEffect, useState } from "react";
import { ChannelData, OwnUserResponse, StreamChat, UserResponse } from "stream-chat";
import { Chat } from "stream-chat-expo";
import { ActivityIndicator, View } from "react-native";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { BASEURL } from "@/constants/Api";
import TokenProvider from "@/Utils/tokenProvider";




export const apiKey = "kcghu45jpmy8"
    const api_secret = "uwjw9yjzke9nvhxp5ryrcs9epf82n66bf795x54dy66h8e3jy4bj7npgf892twtv"
export default function ChatProvider({ children }: PropsWithChildren) {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  /*const token = useAuthStore(state=>state.token)*/
  const userName = useUserStore(state=>state.username)

  const userId = useUserStore(state=>state.id)
  
if(!userId){return}
  const user:UserResponse | OwnUserResponse|any = { id: userId, name: userName };
 

  useEffect(() => {
    const initChat = async () => {
        try{
      const client = StreamChat.getInstance(apiKey);
   
     
      await client.connectUser(user,client.devToken(userId))
      .then(async()=>{
         const channel = client.channel('messaging', {
          members:[userId,"Maya-v2"]
         });
await channel.watch();
      })
      setChatClient(client);}
      catch(e){
        console.log(e)
      }
    };

    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, []);

  if (!chatClient) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
 


  return <Chat client={chatClient} >{children}</Chat>;
}
