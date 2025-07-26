import ConvAiDOMComponent from "@/components/ConvAI";
import tools from "@/Utils/tools";
import { Platform,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function mayaPro(){
    return(
        <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
          
            <ConvAiDOMComponent
            dom={{ style: styles.domComponent }}
            platform={Platform.OS}
            get_battery_level={tools.get_battery_level}
            change_brightness={tools.change_brightness}
            flash_screen={tools.flash_screen}
          />    

        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    domComponentContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
    domComponent: {
    width: 120,
    height: 120,
  },

})