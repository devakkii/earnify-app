import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

  const otpInputs = useRef([]);
  const phoneNumber = route?.params?.phoneNumber || 'Your Number';

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text !== '' && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
    setResendEnabled(newOtp.every((digit) => digit !== ''));
  };

  const handleResendOtp = () => {
    setTimer(30);
    setOtp(['', '', '', '']);
    setResendEnabled(false);
    Alert.alert('OTP resent!', 'A new OTP has been sent to your number.');
  };

  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmitOtp = () => {
    if (otp.every((digit) => digit !== '')) {
      // Alert.alert('Woohoo You Joined Us!😍', 'Now Unlock Your Earning Potential🤑💰');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Please enter the full OTP.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const openHelpModal = () => {
    setIsHelpModalVisible(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <LinearGradient colors={['#e0f7fa', '#ffffff']} style={styles.gradient}>
            {/* Top Row */}
            <View style={styles.topRow}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#00796b" />
              </TouchableOpacity>

              <Text numberOfLines={1} style={styles.title}>
                Let's Get Started
              </Text>

              <TouchableOpacity style={styles.helpButton} onPress={openHelpModal}>
                <Ionicons name="help-circle" size={24} color="#00796b" />
              </TouchableOpacity>
            </View>

            {/* Centered Content */}
            <View style={styles.centeredContainer}>
              <Text style={styles.subtitle}>We have sent you a</Text>
              <Text style={styles.subtitle}>One Time Password (OTP) on</Text>
              <Text style={styles.phoneNumber}> +91 {phoneNumber}</Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    ref={(ref) => (otpInputs.current[index] = ref)}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: resendEnabled ? '#00796b' : '#b2dfdb' }]}
                onPress={handleSubmitOtp}
                disabled={!resendEnabled}
              >
                <Text style={styles.submitButtonText}>Submit OTP</Text>
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  {timer === 0 ? 'Resend OTP' : `Resend in ${timer}s`}
                </Text>
                {timer === 0 && (
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Ionicons name="reload" size={24} color="#00796b" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Help Modal */}
      <Modal
        visible={isHelpModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeHelpModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Need Help?</Text>
            <Text style={styles.modalBody}>Email us Your Concern at:</Text>
            <TouchableOpacity
        onPress={() => {
          Linking.openURL('mailto:support@earnify.com?subject=Need%20Help');
        }}
      >
        <Text style={styles.emailLink}>support@earnify.com</Text>
      </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalButton} onPress={closeHelpModal}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 60,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    flex: 1,
    textAlign: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  emailLink: {
    fontSize: 16,
    color: '#00796b',
    textDecorationLine: 'underline',
    marginVertical: -15,
    marginBottom:20,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
    marginRight:8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  submitButton: {
    width: '90%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: '#00796b',
    fontWeight:'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:10,
  },
  closeModalButton: {
    backgroundColor: '#00796b',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop:20,
    borderRadius: 5,
  },
  closeModalText: {
    color: 'white',
    fontSize: 16,
  },
});

export default OTPScreen;
