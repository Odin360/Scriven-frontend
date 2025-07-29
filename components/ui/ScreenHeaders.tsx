
import { useThemeColors } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const {width} = Dimensions.get("window")
export default function ScreenHeader(){
  const colors = useThemeColors()
    return(
        <>   
              <LinearGradient style={{ height: width * 0.3 }}
              start={{x:0,y:0}}
              end={{x:0,y:1}}
            colors={[colors.gradientStart, colors.gradientMiddle,colors.background]} />
            
   </>
    )
}