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
import BottomSheet from '@/components/ui/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheetView from '@/components/ui/CustomBottomSheetView';
import CreateTeam from '../(otherScreens)/createTeam';
import JoinTeamScreen from '../(otherScreens)/JoinTeamScreen';
import { CameraView, useCameraPermissions } from 'expo-camera';

const uuid = '123e4567-e89b-12d3-a456-426614174000';
const { width } = Dimensions.get('window');

const Team = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  const bottomSheetRef1 = useRef<BottomSheetModal>(null);
  const bottomSheetRef2 = useRef<BottomSheetModal>(null);

  const HandleCreateBottomSheetPress = () => {
    bottomSheetRef2.current?.close();
    bottomSheetRef1.current?.present();
  };

  const HandleJoinBottomSheetPress = () => {
    bottomSheetRef1.current?.close();
    bottomSheetRef2.current?.present();
  };

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
      <LinearGradient style={{ height: width * 0.3 }} colors={[colors.primary, colors.background]} />
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
          onPress={HandleCreateBottomSheetPress}
          style={[styles.button, { borderColor: colors.primary, backgroundColor: colors.background }]}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="people-outline" size={24} color={colors.primary} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: colors.text }]}>Create Team</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>

        {/* Join Team Button */}
        <TouchableOpacity
          onPress={HandleJoinBottomSheetPress}
          style={[styles.button, { borderColor: colors.primary, backgroundColor: colors.background }]}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="person-add-outline" size={24} color={colors.primary} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: colors.text }]}>Join Team</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>

        {/* Scan QR Code Button */}
        <TouchableOpacity
          onPress={HandleScanQrCode}
          style={[styles.button, { borderColor: colors.primary, backgroundColor: colors.background }]}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="qr-code-outline" size={24} color={colors.primary} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: colors.text }]}>Scan QR Code</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>

        {/* QR Code View */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ borderColor: colors.primary, borderWidth: 1 }}>
            <QrCode uuid={uuid} size={200} />
          </View>
        </View>
      </View>

      {/* Bottom Sheet: Create Team */}
      <BottomSheet ref={bottomSheetRef1}>
        <CustomBottomSheetView>
          <CreateTeam />
        </CustomBottomSheetView>
      </BottomSheet>

      {/* Bottom Sheet: Join Team */}
      <BottomSheet ref={bottomSheetRef2}>
        <CustomBottomSheetView>
          <JoinTeamScreen />
        </CustomBottomSheetView>
      </BottomSheet>

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
