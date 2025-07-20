import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Button,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import QrCode from '@/components/ui/QrCode';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useThemeColors } from '@/hooks/useThemeColor';
import { CaretRightIcon, QrCodeIcon, UsersIcon, UsersThreeIcon } from 'phosphor-react-native';
import ScreenHeader from '@/components/ui/ScreenHeaders';

const uuid = '123e4567-e89b-12d3-a456-426614174000';
const { width } = Dimensions.get('window');

const Team = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [visible, setVisible] = useState(false);
  const  colors  = useThemeColors();

  

  const HandleScanQrCode = () => {
    if (!permission) return;

    if (!permission.granted) {
      requestPermission();
    } else {
      setVisible(true);
    }
  };

  return (
    <>
     <ScreenHeader/>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Permission message */}
        {permission && !permission.granted && (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="Grant Permission" />
          </View>
        )}

        {/* Create Team Button */}
        <TouchableOpacity
          onPress={()=>router.push("/createTeam")}
          style={[styles.button, { borderColor: colors.border, backgroundColor: colors.surface }]}
        >
          <View style={styles.buttonContent}>
            <UsersIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Create Team</Text>
          </View>
        <CaretRightIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
        </TouchableOpacity>

        {/* Join Team Button */}
        <TouchableOpacity
          onPress={()=>router.push("/JoinTeamScreen")}
          style={[styles.button, { borderColor: colors.border, backgroundColor: colors.surface }]}
        >
          <View style={styles.buttonContent}>
            <UsersThreeIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Join Team</Text>
          </View>
          <CaretRightIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
        </TouchableOpacity>

        {/* Scan QR Code Button */}
        <TouchableOpacity
          onPress={HandleScanQrCode}
          style={[styles.button, { borderColor: colors.border, backgroundColor: colors.surface }]}
        >
          <View style={styles.buttonContent}>
            <QrCodeIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
            <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Scan QR Code</Text>
          </View>
         <CaretRightIcon  size={24} color={colors.iconColor} weight='duotone' duotoneColor={colors.iconSecondary}/>
        </TouchableOpacity>

        {/* QR Code View */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ borderColor: colors.border, borderWidth: 1 }}>
            <QrCode uuid={uuid} size={200} />
          </View>
        </View>
      </View>

    


      {/* Modal: Camera View for QR Scanning */}
      <Modal visible={visible} transparent onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}
        >
          <CameraView
            onBarcodeScanned={({ data }) => {
              console.log(data);
              setVisible(false);
            }}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            style={{ width: width * 0.7, height: width * 0.7 }}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 12,
  },
});

export default Team;
