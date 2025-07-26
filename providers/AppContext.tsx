// AppContext.js

import React, { PropsWithChildren, useState } from "react";
import {Channel, Thread} from 'stream-chat'

interface AppContext{
  channel:null | Channel,
  setChannel:(channel:Channel)=>void,
  thread:null | Thread
  setThread:(thread:Thread)=>void
}


export const AppContext= React.createContext<AppContext>({
  channel:null,
  setChannel: (channel:Channel) => {},
  thread: null,
  setThread: (thread:Thread) => {},
});

export const AppProvider = ({children}:PropsWithChildren ) => {
  const [channel, setChannel] = useState< null | Channel>(null);
  const [thread, setThread] = useState<null | Thread>(null);

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);