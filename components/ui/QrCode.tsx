import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import QRCode from "react-native-qrcode-svg"
import { useTheme } from '@react-navigation/native'


interface qrCode{
    uuid:string,
    size:number
}

const QrCode = ({uuid,size}:qrCode) => {
  const {colors}=useTheme()
  return (
    <QRCode
    value={uuid}
    size={size}/>
  )
}

export default QrCode