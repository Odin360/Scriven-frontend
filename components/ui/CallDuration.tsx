import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCallStateHooks } from "@stream-io/video-react-bindings";
import { ClockIcon, VideoConferenceIcon } from "phosphor-react-native";

const formatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const format = date.toISOString();
  const hours = format.substring(11, 13);
  const minutes = format.substring(14, 16);
  const seconds_str = format.substring(17, 19);
  return `${hours !== "00" ? hours + ":" : ""}${minutes}:${seconds_str}`;
};

export default function CallDurationBadge ()  {
  const [elapsed, setElapsed] = useState<string>("00:00");
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();
  const startedAt = session?.started_at;
  const startedAtDate = useMemo(() => {
    if (!startedAt) {
      return Date.now();
    }
    const date = new Date(startedAt).getTime();
    return isNaN(date) ? Date.now() : date;
  }, [startedAt]);

  useEffect(() => {
    const initialElapsedSeconds = Math.max(
      0,
      (Date.now() - startedAtDate) / 1000,
    );

    setElapsed(formatTime(initialElapsedSeconds));

    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startedAtDate) / 1000;
      setElapsed(formatTime(elapsedSeconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAtDate]);

  return (
    <View style={{flexDirection:"row",gap:5,alignItems:"center",justifyContent:"center"}}>
      <VideoConferenceIcon
      weight="duotone"
      duotoneColor="blue"
        color={"white"}
        size={32}
      />
      <Text style={{color:"white"}}>{elapsed}</Text>
    </View>
  );
};