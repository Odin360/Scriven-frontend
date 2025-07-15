import { Dimensions } from "react-native"


/*Below are the styles for the common texts,in the app*/
const {width} = Dimensions.get("window")
export const Texts : any = {
  error:{
fontSize:16,
lineHeight:24,
color:"rgb(212, 82, 82)",
fontWeight:'600',
marginVertical:5
  },
     default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
     fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText:{
fontSize: 20,
    fontWeight: 600,
    lineHeight: 32,
    color:"white"
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
}}
//button style should be provided to a pressable
//or touchable Opacity wrapping a text,refer to Texts for button text style

export const ButtonStyle : any = {
  width:width*0.8,
  borderRadius:14,
  alignSelf:"center",
  backgroundColor:"blue",
  height:width*0.13,
  alignItems:'center',
  justifyContent:'center',
   shadowColor:'black',
     shadowOffset:{width:0,height:0}, 
 shadowOpacity:0.5,
 shadowRadius:18,
 elevation:18
}