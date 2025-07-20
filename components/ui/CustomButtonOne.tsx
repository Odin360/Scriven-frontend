import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type Props = {
  label: string;
  width?: number | string |any
  height?: number | string |any;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const CustomButton1: React.FC<Props> = ({
  label,
  width = '80%',
  height = 50,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        { width, height },
        style,
      ]}
    >
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5A67D8', // Indigo shade
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
