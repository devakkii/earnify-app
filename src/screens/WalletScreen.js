import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, PixelRatio,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import expo-linear-gradient
import Icon from 'react-native-vector-icons/FontAwesome';
import { Snackbar } from 'react-native-paper';
import * as Font from 'expo-font';




const { width } = Dimensions.get('window'); // Get the width of the device screen

const WalletScreen = () => {
  const [balance] = useState(30); // Hardcoded balance value
  const [pendingReward] = useState(15); // Hardcoded pending reward value
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [offersCompleted,setOffersCompleted] = useState(1); // Hardcoded offers completed value
  const isWithdrawable =  offersCompleted >= 3; // Check both conditions
  const [fontsLoaded, setFontsLoaded] = useState(false);


  const handleWithdrawPress = () => {
    console.log("Withdraw pressed");
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'RobotoSlab-Regular': require('../../assets/fonts/RobotoSlab-Regular.ttf'),
        'RobotoSlab-Medium': require('../../assets/fonts/RobotoSlab-Medium.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, return a loading screen
  }

  // Scalable font size using PixelRatio to ensure consistency across devices
  const fontScale = PixelRatio.getFontScale();

  return (
    <View style={styles.container}>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Wallet container with Linear Gradient */}
      <LinearGradient
        colors={['#425c70', '#557791']} // Define your gradient colors here
        start={{ x: 0, y: 0 }} // Define the start point of the gradient
        end={{ x: 1, y: 1 }} // Define the end point of the gradient
        style={styles.walletContainer} // Apply styles to the gradient wallet container
      >
        {/* Wallet Heading */}
        <Text style={[styles.walletHeading, { fontSize: 25 * fontScale }]}>Total Balance</Text>

        {/* Wallet Amount with Rupee Symbol */}
        <Text style={[styles.walletAmount, { fontSize: 30 * fontScale }]}>₹{balance}</Text>

        {/* Withdraw Button */}
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
            Withdraw Amount
          </Text>
        </TouchableOpacity>

        {/* History Links */}
        <View style={styles.historyContainer}>
          <TouchableOpacity onPress={() => console.log('Navigate to PrimePayment')}>
            <Text style={styles.historyButtonText}>Rewards History {'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Navigate to PayoutHistory')}>
            <Text style={styles.historyButtonText}>Transfer History {'>'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Pending Reward Section */}
      <View style={styles.pendingRewardContainer}>
        <View style={styles.rewardHeading}>
        <TouchableOpacity onPress={() => setSnackbarVisible(true)} style={styles.infoButton}>
        <Icon name="info-circle" size={20} color="#b3b3b3" />
        </TouchableOpacity>
          <Text style={styles.pendingRewardText}>Pending Reward: <Text style={{fontWeight:350}}>₹{pendingReward}</Text></Text>
          
        </View>
        <Text style={styles.pendingRewardAmount}></Text>
      </View>    

      {/* Lock Section */}
      <View style={styles.lockSection}>
          <Icon name="lock" size={24} color="#000" style={styles.lockIcon} />
          <View>
            <Text style={styles.lockText}>Wallet will be unlocked when:</Text>
            <View style={[styles.conditionContainer, { backgroundColor: '#ffffff' }]}>
  {/* Row for Icon and Subheading */}
  <View style={styles.row}>
  <Image
      source={require('../../assets/discount.png')} // Replace with the actual path to your image
      style={styles.icon}
    />
    <Text style={styles.conditionHeading}>Complete Any {offersCompleted} Offer</Text>
  </View>
  {/* Text below the heading */}
  <Text style={styles.conditionText}>Try More Offers</Text>
</View>
           
          </View>
        </View>

       


</ScrollView>
      <Snackbar
    visible={snackbarVisible}
    onDismiss={() => setSnackbarVisible(false)}
    duration={6000}
    style={styles.snackbar}

  >
    This Reward Comes from either Signup Bonus or Referral Bonus. It will remain in pending untill the minimum 3 task completion requirement is met. 
  </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    // backgroundColor: '#fff',
    width:'100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 65,
    width:'100%',
  },
  walletContainer: {
    width: '110%',
    maxWidth: width * 0.9,
    padding: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignSelf: 'center',
    elevation:6,
  },
  walletHeading: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#f0f5f5',
    marginBottom: 10,
  },
  walletAmount: {
    fontSize: 40,
    fontWeight: 'semibold',
    color: '#f0f5f5',
    marginBottom: 15,
    fontFamily: 'sans-serif',
  },
  withdrawButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius:5,
    elevation: 5,
  },
  withdrawButtonDisabled: {
    backgroundColor: '#afc1d0',
    elevation:0,
  },
  withdrawButtonText: {
    fontSize: 16,
    color: '#000',
  },
  withdrawButtonTextDisabled: {
    color: 'grey',
  },
  historyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  historyButtonText: {
    fontSize: 13,
    color: '#b3b3b3',
    textDecorationLine: 'underline',
  },
  pendingRewardContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 10,
    height:'7%',
    width:'100%',
    marginLeft:1,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // elevation: 3,
  },
  rewardHeading: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'left',
    width: '100%',
    marginBottom:4,

    
   
  },
  pendingRewardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2196f3',
    marginLeft:6,
    
  },
  infoButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    width: 18,
    height: 22,
    marginTop:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingRewardAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796b',
  },
  lockSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    
    // marginBottom: 10,
    // height:200,
  },
  lockIcon: {
    marginRight: 10,
    marginBottom:70,
    
  },
  lockText: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginRight:5,
    marginBottom:50,
    fontFamily:'RobotoSlab-Medium',
  },
  conditionContainer: {
    width: '115%',
    marginLeft:-35,
    height: 65,
    borderRadius: 10,
    borderWidth:0.5,
    borderColor:'grey',
    justifyContent: 'center',
    // paddingHorizontal: 5,
    // marginVertical: 5,
    marginTop:-40,
    alignSelf: 'stretch', // Ensure it stretches across the screen

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 1, // Space between heading and text
  },
  icon: {
    marginRight: 10, // Space between icon and text
    borderWidth:0.5,
    borderRadius:15,
    marginLeft:7,
    marginTop:32,
    
    
  },
  conditionHeading: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#333',
    paddingTop:32,
    
  },
  conditionText: {
    fontSize: 12,
    color: '#555',
    paddingLeft:'16%',
    paddingBottom:32,
    
  },
  snackbar: {
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 70, // Keep it anchored at the bottom
    left: 0,
    right: 0,
  },
});

export default WalletScreen;
