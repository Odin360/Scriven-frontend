import React, { useCallback, useEffect, useState } from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-native-sdk";

import { ActivityIndicator, Button } from "react-native";

export const CustomCallRecordButton = () => {
  const call = useCall();
  const { useIsCallRecordingInProgress } = useCallStateHooks();
  const isCallRecordingInProgress = useIsCallRecordingInProgress();
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);

  useEffect(() => {
    if (!call) {
      return;
    }
    // we wait until call.recording_started/stopped event
    // to remove the loading indicator
    const eventHandlers = [
      call.on("call.recording_started", () => setIsAwaitingResponse(false)),
      call.on("call.recording_stopped", () => setIsAwaitingResponse(false)),
    ];
    return () => {
      eventHandlers.forEach((unsubscribe) => unsubscribe());
    };
  }, [call]);

  const toggleRecording = useCallback(async () => {
    try {
      setIsAwaitingResponse(true);
      if (isCallRecordingInProgress) {
        await call?.stopRecording();
      } else {
        await call?.startRecording();
      }
    } catch (e) {
      console.error("Failed start recording", e);
    }
  }, [call, isCallRecordingInProgress]);

  return isAwaitingResponse ? (
    <ActivityIndicator />
  ) : (
    <Button
      onPress={toggleRecording}
      title={`${isCallRecordingInProgress ? "Stop" : "Start"} Recording`}
    />
  );
};