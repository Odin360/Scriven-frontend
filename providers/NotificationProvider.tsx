import { PropsWithChildren, useEffect,useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { useChatContext } from "stream-chat-expo";
import { useUserStore } from "@/store/useUserStore";



const requestPermission = async () => {
    
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
export default function NotificationsProvider ({children}:PropsWithChildren){    
  const [isReady, setIsReady] = useState(false);
  const userId = useUserStore(state=>state.id)
  
 const {client} = useChatContext()
  useEffect(() => {
    const registerPushToken = async () => {
        if(!userId) return
      const token = await messaging().getToken();
      const push_provider = 'firebase';
      const push_provider_name = 'Firebase'; // name an alias for your push provider (optional)
     /** client.setLocalDevice({
        id: token,
        push_provider,
        // push_provider_name is meant for optional multiple providers support, see: /chat/docs/react/push_providers_and_multi_bundle
        push_provider_name,
     
      });**/
      client.addDevice(token, push_provider,userId,push_provider_name)
    }

      const init = async () => {
      await requestPermission();
      await registerPushToken();
      setIsReady(true);
    };
    init();

  }, []);
  
  
   
    return(
    <>
    {children}
    </>)
}