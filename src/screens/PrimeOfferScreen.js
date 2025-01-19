import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  TextInput,

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Add this import at the top






const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PrimeOfferScreen = ({ navigation,setIsPrimeWithdrawn }) => {
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [balance, setBalance] = useState(0); // Example balance
  const [isWithdrawVisible, setWithdrawVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT)); // Start below the screen
  const [upiId, setUpiId] = useState(''); // Track UPI ID
  const [isBackgroundDisabled, setIsBackgroundDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  

  const isWithdrawable = balance >= 1000; // Condition for enabling "Withdraw Prime"

  const handleWithdrawPress = () => {
    setIsBackgroundDisabled(true); // Disable background buttons
    setIsPrimeWithdrawn(true);
    setWithdrawVisible(true);
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT * 0.4, // Adjust height here
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false, // Use false for height animations
    }).start();
  };

  const handleClosePanel = () => {
    // setIsBackgroundDisabled(false); // Enable background buttons again
    setIsPrimeWithdrawn(false);
    setUpiId(''); // Clear UPI ID input
    setErrorMessage('');
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT, // Slide back down
      duration: 600,
      easing: Easing.in(Easing.quad),
      useNativeDriver: false,
    }).start(() => setWithdrawVisible(false));
  };

  const validateUpiId = (upi) => {
    // UPI ID validation (format: xyz@anything)
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
    return regex.test(upi);
  };

  const handleProceedPress = () => {
    const upiTrimmed = upiId.trim();

    if (upiTrimmed === '') {
      setErrorMessage('Please enter a UPI ID.');
    } else if (!validateUpiId(upiTrimmed)) {
      setErrorMessage('Invalid UPI ID (e.g., xyz@upi).');
    } else {
      // Proceed with valid UPI ID
      console.log('Proceeding with:', upiTrimmed);
      setErrorMessage('');
      setUpiId('');
      handleClosePanel();
    }
  };
    

  return (
    <View style={styles.container}>
      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            selectedTab === 'tab1' && styles.activeButton,
            styles.shadowEffect,
          ]}
          onPress={() => setSelectedTab('tab1')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === 'tab1' && styles.activeButtonText,
            ]}
          >
            Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            selectedTab === 'tab2' && styles.activeButton,
            styles.shadowEffect,
          ]}
          onPress={() => setSelectedTab('tab2')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === 'tab2' && styles.activeButtonText,
            ]}
          >
            Payout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {selectedTab === 'tab1' && (
          <Text style={styles.contentText}>This is content for Button 1</Text>
        )}
        {selectedTab === 'tab2' && (
          <View style={styles.walletContainer}>
            <Text style={styles.walletHeading}>Prime Balance</Text>
            <Text style={styles.walletAmount}>₹{balance}</Text>
            <TouchableOpacity
              style={[
                styles.withdrawButton,
                !isWithdrawable && styles.withdrawButtonDisabled,
              ]}
              disabled={!isWithdrawable}
              onPress={handleWithdrawPress}
            >
              <Text
                style={[
                  styles.withdrawButtonText,
                  !isWithdrawable && styles.withdrawButtonTextDisabled,
                ]}
              >
                Withdraw Prime
              </Text>
            </TouchableOpacity>
            <View style={styles.historyContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PrimePayment')}
              >
                <Text style={styles.historyButtonText}>Prime History {'>'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PayoutHistory')}
              >
                <Text style={styles.historyButtonText}>Payout History {'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      

      {/* Sliding Panel */}
      {isWithdrawVisible && (
        <>
          {/* Backdrop */}
          <TouchableOpacity onPress={handleClosePanel} />
          <View style={styles.backdrop} />

          {/* Sliding Panel */}
          <Animated.View
            style={[
              styles.withdrawSlide,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.slideHeader}>
            <Text style={styles.slideTitle}>Withdraw Prime</Text>
            <TouchableOpacity onPress={handleClosePanel}>
            <Icon name="close" size={26} color="#a6a6a6"  marginTop='-10' /> 
            </TouchableOpacity>
            </View>
        <View style={styles.transactionContainer}>
        <Text style={styles.boldText}>Enter UPI ID :</Text>
        <TextInput
          style={styles.inputField}
          placeholder="e.g. xyz@upi"
          autoCapitalize="none"
          value={upiId}
          onChangeText={setUpiId} // Update UPI ID state
          maxLength={30}
        />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}


        <Text style={styles.infoText}>Total Prime Amount: ₹{balance}</Text>
        <Text style={styles.infoText}>
          Processing Fee (5%): ₹{(balance * 0.05).toFixed(2)}
        </Text>
        <Text style={styles.infoText}>
          Amount to Credited: ₹{(balance - balance * 0.05).toFixed(2)}
        </Text>

        {/* Proceed Button */}
        <TouchableOpacity
                style={[styles.proceedButton, { opacity: upiId.trim() === '' ? 0.5 : 1 }]}
                onPress={handleProceedPress}
                disabled={upiId.trim() === ''}
              >
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>

      </View>
          </Animated.View>
        </>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  activeButton: {
    backgroundColor: '#00796b',
    borderColor: '#004d40',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  walletContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 15,
  },
  walletHeading: {
    fontSize: 21,
    fontWeight: 'semi-bold',
    color: '#333',
    marginBottom: 10,
    marginTop: -10,
  },
  walletAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  withdrawButton: {
    marginVertical: 10,
    backgroundColor: '#76a970', // Green color when enabled487073  5d8f56 689f60
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  withdrawButtonDisabled: {
    backgroundColor: '#e1ecdf', // Light gray when disabled
  },
  withdrawButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'semi-bold',
    textAlign: 'center',
    width: '100%',
  },
  withdrawButtonTextDisabled: {
    color: '#aaaaaa', // Disabled text color
  },
  historyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: '100%',
    marginTop: 22,
    marginRight:30,
  },
  historyButtonText: {
    fontSize: 13,
    fontWeight: '450',
    color: '#b3b3b3',
    textDecorationLine: 'underline',
    marginHorizontal: 12,
  },
  withdrawSlide: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.92, // Height covers most of the screen
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 1000, // Ensure it's above the footer
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  backdrop: {
    position: 'absolute',
    top: -100,
    bottom: 0,
    left: -100,
    right: -100,
    backgroundColor: 'rgba(22, 21, 21, 0.76)', // Darker backdrop for better focus
    zIndex: 500, // Above everything else
  },
  slideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop:-7,
    backgroundColor:'#ffffff'
  },
  transactionContainer: {
    padding: 15,
    paddingTop:30,
    borderRadius: 7, // For rounded corners
    backgroundColor: '#ffffff', // Default background color (you can change this later)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight:-20,
    marginLeft:-20,
    height:350,
    marginTop:-20,
    backgroundColor:'#ebfaeb'
    
  },
  boldText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  proceedButton: {
    marginTop: 30,
    backgroundColor: '#00796b', // Green color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  proceedButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -4,
    paddingBottom:12,
  },
  
  
});

export default PrimeOfferScreen;
