// AppContext.js

import React, { PropsWithChildren, useState } from "react";
import {Channel} from 'stream-chat'



export const AppContext= React.createContext({
  channel: null,
  setChannel: (channel:Channel | any) => {},
  thread: null,
  setThread: (thread:any) => {},
});

export const AppProvider = ({children}:PropsWithChildren ) => {
  const [channel, setChannel] = useState<any>();
  const [thread, setThread] = useState<any>();

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);