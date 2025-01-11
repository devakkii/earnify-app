import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  Linking,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('Please accept the terms and conditions.');
      return;
    }
    else{
      setErrorMessage('')
    }

    Alert.alert(
      'Confirm Phone Number',
      `You entered: ${phoneNumber}`,
      [
        { text: 'Edit', onPress: () => {} },
        { text: 'Proceed', onPress: () => navigation.navigate('OTP', { phoneNumber }) },
      ]
    );
  };

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^[1-9][0-9]{9}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
    setErrorMessage('');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.fullScreen}>
      {/* StatusBar for Transparent Effect */}
      <StatusBar translucent backgroundColor="#7bac75" barStyle="light-content" />

      {/* Notch Area */}
      <SafeAreaView style={styles.safeArea} />

      {/* Main App Content */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <LinearGradient
              colors={['#e0f7fa', '#ffffff']}
              style={styles.gradient}
            >
              <View style={styles.innerContainer}>
                <Image
                  source={require('../../assets/earnify-logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.welcomeText}>Welcome to Earnify</Text>

                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={24} color="#00796b" style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                  />
                </View>
                {errorMessage !== '' && (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                )}

                <View style={styles.termsContainer}>
                  <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                    <Text style={styles.checkbox}>{termsAccepted ? '☑' : '☐'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    I agree to the{' '}
                    <Text
                      style={styles.link}
                      onPress={() => Linking.openURL('https://generator.lorem-ipsum.info/terms-and-conditions')}
                    >
                      Policy and Terms & Conditions
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    { backgroundColor: phoneNumber.length === 10 ? '#00796b' : '#b2dfdb' },
                  ]}
                  onPress={handleLogin}
                  disabled={phoneNumber.length !== 10}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    backgroundColor: '#a8ee9f', // Your desired notch color
    flex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#00796b',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    fontSize: 30,
    marginRight: 8,
  },
  termsText: {
    fontSize: 16,
  },
  link: {
    color: '#00796b',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});

export default LoginScreen;
