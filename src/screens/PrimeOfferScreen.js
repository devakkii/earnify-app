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
  ScrollView,
  Linking,
 

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Add this import at the top








const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PrimeOfferScreen = ({ navigation,setIsPrimeWithdrawn }) => {
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [balance, setBalance] = useState(1000); // Example balance
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
          <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false} // Prevents the stretch/bounce effect
          overScrollMode="never" // Android: disables overscroll
        >
        {/* ABOUT */}
        <Text style={styles.heading}>ABOUT :</Text>
        <Text style={styles.text}>
          <Text style={styles.sloganLine}>Earn ₹1000 Instantly—Just Share Earnify!</Text> 
          </Text>
          <Text style={styles.text}>
          <Text>It’s quick, easy, and rewarding! 
          Share a video about Earnify and earn ₹1000 directly to your Prime Wallet. 
          No complicated steps—just share and earn! </Text>
        </Text>
          
         {/* Add space between sections */}
         <View style={styles.sectionSpacing} />

        {/* CONDITION */}
        <Text style={styles.heading}>CONDITION :</Text>
        <Text style={styles.text}>
        <Text style={styles.sloganLine}> 5000 Real Views = ₹1000!</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bullet}>•</Text> Showcase Earnify’s features and Prime 
          Offer in your video.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bullet}>•</Text> Eligible social media are YouTube, Facebook, and Instagram.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bullet}>•</Text> No fake views—only genuine engagement counts.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bullet}>•</Text> Video must be public and accessible.
        </Text>
         {/* Add space between sections */}
        <View style={styles.sectionSpacing} />

        {/* HOW TO PARTICIPATE */}
        <Text style={styles.heading}>HOW TO PARTICIPATE ?</Text>
        <Text style={styles.text}>
        <Text style={styles.sloganLine}> Earn ₹1000 in 5 Easy Steps</Text>
        </Text>
       
        <Text style={styles.text}>
          <Text style={styles.highlightedText}> Step 1:</Text> Create a video about features of Earnify and the Prime Offer.
        </Text>
        <Text style={styles.text}>
        <Text style={styles.highlightedText}> Step 2:</Text> Post the video on your social media 
          also Include Earnify’s link in the caption, comments, and your bio. 
          
        </Text>
        <Text style={styles.text}>
        <Text style={styles.highlightedText}> Step 3:</Text> Ensure your video gets 5000 genuine views—no fake engagement allowed!
        </Text>
        <Text style={styles.text}>
        <Text style={styles.highlightedText}> Step 4:</Text> Once you reach 5000 views, 
          submit your video link, along with your social media handle and registered mobile number to<Text> </Text> 
          <TouchableOpacity
        onPress={() => {
          Linking.openURL('mailto:earnifycare@gmail.com?subject=Request%20For%20Verification');
        }}
      >
        <Text style={styles.emailLink}>earnifycare@gmail.com</Text>
      </TouchableOpacity>.
        </Text>
        <Text style={styles.text}>
        <Text style={styles.highlightedText}> Step 5:</Text> Wait for verification (within 24 to 72 hours).
          After successful verification, your ₹1000 will be credited to your Prime Wallet, available for instant redemption!
        </Text>
        
        {/* Add space between sections */}
        <View style={styles.sectionSpacing} />
          
          {/* BONUS */}
        <Text style={styles.heading}>🎁 Bonus Reward For LIFETIME!</Text>
        <Text style={styles.text}>
          Get ₹25 for every new user who joins Earnify through your video link.
        </Text>
      </ScrollView>
    )}

        {selectedTab === 'tab2' && (
        
            <View style={styles.payoutContainer}>  

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
          
        
      
        {/* Payout Section */}
        <View>
        <ScrollView
        style={styles.payoutScrollView}
        contentContainerStyle={styles.payoutScrollContainer}
        showsVerticalScrollIndicator={false}
        >
        <Text style={{marginBottom:2, fontWeight:'700', fontSize:23, fontFamily:'sans-serif', color:'darkgrey'}}> Know this💡 </Text>
        {/* Payout Pointers */}
        <View style={styles.payoutItem}>
        <Icon name="lock-open" size={26} color="#a6a6a6" />
        <Text style={styles.payoutText}>No wallet unlock needed</Text>
    </View>
    
    <View style={styles.payoutItem}>
      <Icon name="flash-on" size={26} color="#a6a6a6" />
      <Text style={styles.payoutText}>Instant Prime Amount redemption</Text>
    </View>

    <View style={styles.payoutItem}>
      <Icon name="check-circle" size={26} color="#a6a6a6" />
      <Text style={styles.payoutText}>Check UPI ID carefully</Text>
    </View>

    <View style={styles.payoutItem}>
      <Icon name="access-time" size={26} color="#a6a6a6" />
      <Text style={styles.payoutText}>Transfers reflect in 24–72 hours</Text>
    </View>
    </ScrollView>
    </View>
   </View> 
   
              )}

      

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


        <Text style={styles.infoText}>Total Prime Amount: <Text style={{fontWeight:350}}>₹{balance}</Text></Text>
        <Text style={styles.infoText}>
          Processing Fee (5%): <Text style={{fontWeight:350, color:'red'}}>₹{(balance * 0.05).toFixed(2)}</Text>
        </Text>
        <Text style={styles.infoText}>
          Amount to Credited: <Text style={{fontWeight:350, color:'green'}}>₹{(balance - balance * 0.05).toFixed(2)}</Text>
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
      <View style={styles.footerFill} />

          </Animated.View>

        </>
      )}
    </View>
    </View>
  );
};



export const styles = StyleSheet.create({
  container:{
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
    backgroundColor: '#f2f2f2',
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
    fontWeight: '400',
    color: '#000',
    fontFamily:'sans-serif',
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
    padding: 0,
    margin:-10,

  },
  contentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  payoutContainer:{
    marginHorizontal:100,
    
  },
  walletContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 20,
    // paddingBottom
    width:300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 28,
    marginBottom:-15,
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
    marginRight:50,
  },
  historyButtonText: {
    fontSize: 13,
    fontWeight: '450',
    color: '#b3b3b3',
    textDecorationLine: 'underline',
    marginHorizontal: 22,
  },
  payoutScrollView: {
    width: '110%',
    marginTop: 50,
    marginBottom: 15,
    marginLeft:-7,
    
  },
  payoutScrollContainer: {
    paddingBottom: 20,
    
  },
  payoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginLeft:-2,
  },
  payoutText: {
    fontSize: 16,
    fontWeight:'500',
    color: '#555',
    margin: 10,
    
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
    top: -130,
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
    // backgroundColor: '#ffffff', // Default background color (you can change this later)
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
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
    fontWeight:'600',
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
  footerFill: {
    backgroundColor: '#ebfaeb', // Your desired background color
    height: 600, // Or any fixed height to fill space
    width:'105.5%',
    marginLeft:-20,

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
  scrollView: {
    flex: 1, // Makes ScrollView take up the remaining space
    marginTop: 25, // Optional: Adjust spacing from the top
    paddingTop:25,
  },
  scrollContainer: {
    paddingBottom: 150, // Adds space at the bottom to avoid cut-off
    paddingHorizontal: 0,
    paddingLeft:8,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Dark black for heading
    marginBottom: 10,
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    color: '#666', // Grey color for text
    lineHeight: 22,
    marginBottom: 10,
  },
  highlightedText: {
    fontWeight: '500',
    color: '#000', // Dark black for highlighted words
  },
  bullet: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000', // Dark black for bullet
  },
  sectionSpacing: {
    height: 20, // Adjust this value for the desired spacing
  },
  emailLink: {
    fontSize: 15,
    color: '#00796b',
    textDecorationLine: 'underline',
    marginVertical: -15,
    marginBottom:-4,
  },
  sloganLine:{
    fontWeight:'600',
    color:'#999999',
    marginBottom:-10,
  },
      

  
    
  
});

export default PrimeOfferScreen;
