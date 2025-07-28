// AppContext.js

import { Call } from "@stream-io/video-react-native-sdk";
import React, { PropsWithChildren, useState } from "react";
import {Channel, Thread} from 'stream-chat'

interface AppContext{
  call:null | Call,
  channel:null | Channel,
  setChannel:(channel:Channel)=>void,
  thread:null | Thread
  setThread:(thread:Thread)=>void,
  setCall:(call:Call)=>void
}


export const AppContext= React.createContext<AppContext>({
  call:null,
  setCall:(call:Call)=>{},
  channel:null,
  setChannel: (channel:Channel) => {},
  thread: null,
  setThread: (thread:Thread) => {},
});

export const AppProvider = ({children}:PropsWithChildren ) => {
  const [channel, setChannel] = useState< null | Channel>(null);
  const [thread, setThread] = useState<null | Thread>(null);
  const [call,setCall]=useState<null | Call>(null)

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread,call,setCall }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);