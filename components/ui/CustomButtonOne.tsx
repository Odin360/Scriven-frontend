import { useThemeColors } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type Props = {
  label: string;
  width?: number | string |any
  height?: number | string |any;
  onPress?: () => void;
  disabled:boolean
  style?: ViewStyle;
  textStyle?: TextStyle;
};
const CustomButton1: React.FC<Props> = ({
  label,
  width = '80%',
  height = 50,
  onPress,
  disabled,
  style,
  textStyle,
}) => {
  
const colors=useThemeColors()

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
         >
      <LinearGradient  style={[
        styles.button,
        { width, height }
        ,
        style,
      ]}
      start={{x:0,y:0}}
      end={{x:1,y:0}}
 colors={[colors.gradientStart,colors.primaryButton,colors.gradientStart]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    shadowColor:"#000",
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomButton1;
