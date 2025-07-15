// contexts/BottomSheetContext.tsx
import React, { createContext, useRef, useCallback, useContext } from 'react';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {Text} from "react-native";

type BottomSheetContextType = {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  presentBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const presentBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <BottomSheetContext.Provider value={{ bottomSheetRef, presentBottomSheet }}>
      <BottomSheetModalProvider>
      {children}
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
