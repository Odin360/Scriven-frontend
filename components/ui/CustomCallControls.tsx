import { CallControls,ScreenShareToggleButton,ReactionsButton, StreamReactionType } from "@stream-io/video-react-native-sdk";
import { View } from "react-native";
import { CustomCallRecordButton } from "./CallRecordingButton";
import { router } from "expo-router";

export default function CustomCallControls(){
    const reactions: StreamReactionType[] = [
  {
    type: "reaction",
    emoji_code: ":rolling_on_the_floor_laughing:",
    custom: {},
    icon: "🤣",
  },
  {
    type: "reaction",
    emoji_code: ":like:",
    custom: {},
    icon: "👍",
  },
  {
    type: "reaction",
    emoji_code: ":rocket:",
    custom: {},
    icon: "🚀",
  },
  {
    type: "reaction",
    emoji_code: ":dislike:",
    custom: {},
    icon: "👎",
  },
  {
    type: "reaction",
    emoji_code: ":fireworks:",
    custom: {},
    icon: "🎉",
  },
  {
    type: "reaction",
    emoji_code: ":raised-hands:",
    custom: {},
    icon: "🙌",
  },
  {
    type: "raised-hand",
    emoji_code: ":raised-hand:",
    custom: {},
    icon: "✋",
  },
];

return (
<View style={{flexDirection:"row",padding:10,alignItems:"center",gap:10,justifyContent:"center"}}>
 <CustomCallRecordButton/> 
 <ReactionsButton supportedReactions={reactions}/>  
<CallControls onHangupCallHandler={()=>router.back()} style={{gap:10}}/>
<ScreenShareToggleButton/>
</View>
)
}