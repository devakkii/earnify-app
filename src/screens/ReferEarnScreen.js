import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Clipboard, Alert, Vibration, Share } from 'react-native';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Icon library
import { LinearGradient } from 'expo-linear-gradient';
import Toast, {BaseToast} from 'react-native-toast-message'; // Import Toast
import * as Linking from 'expo-linking'; // For opening WhatsApp





const ReferEarnScreen = ({activeButton}) => {
    const [selectedTab, setSelectedTab] = useState('tab1');
    const [bonusUnlocked, setBonusUnlocked] = useState(false); // Track if the button is clicked




    const generateReferralCode = () => {

      // Generate a Referal Code
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return code;
    };
  
    const [referralCode] = useState(generateReferralCode()); // Generate referral code only once
  
    const handleCopy = () => {
      Clipboard.setString(referralCode); // Copy referral code to clipboard
      // Alert.alert('Copied!', `Referral Code "${referralCode}" has been copied.`);
      Vibration.vibrate(100); // Vibrate the phone for 100ms
      Toast.show({
        type: 'success',
        // text1: 'Copied!',
        text2: `Referral Code "${referralCode}" copied.`,
        position: 'top', // Position of the toast
      visibilityTime: 1000, // Duration the toast is visible (in ms)
    
      });

    };
    const toastConfig = {
      success: (props) => (
        <BaseToast
          {...props}
          style={{ backgroundColor: '#557791', borderLeftColor: '#557791', height:30, width:280 }} // Green background
          text1Style={{
            fontSize: 10,
            fontWeight: 'semi-bold',
            color: '#ffffff', // White text for title
          }}
          text2Style={{
            fontSize: 12,
            color: '#f1f8e9', // Light green text for subtitle
          }}
        />
      ),
    };

    const handleWhatsAppShare = () => {
      const message = `Join Earnify with my referral code ${referralCode} and earn rewards! Download the app here: https://example.com`;
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
      Linking.openURL(whatsappUrl).catch(() => {
        Alert.alert('Error', 'WhatsApp is not installed on your device.');
      });
    };

    const handleNativeShare = async () => {
      try {
        const result = await Share.share({
          message: `Hey! Use my referral code "${referralCode}" to join Earnify and get rewards!`,
        });
  
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with specific activity
            console.log('Shared with activity:', result.activityType);
          } else {
            // Shared successfully
            console.log('Share successful');
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('Share dismissed');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
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
               Invite
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
                Referrals
              </Text>
            </TouchableOpacity>
          </View>
         
          {/* ScrollView Section */}
          { selectedTab === 'tab1' && (
       <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Blue Box */}
        
        <View style={styles.blueBox}>
        <View style={styles.line}>
        <LinearGradient
          colors={['#2c3e50', '#74a8c8']} // Light to dark gradient
          style={styles.iconGradient}
        >
          <MaterialIcons name="person-add" size={20} color="#ffffff" />
        </LinearGradient>             
        <Text style={styles.lineText}>Invite a Friend to Earnify</Text>
            </View>
            <View style={styles.connector} />

            <View style={styles.line}>
            <LinearGradient
          colors={['#2c3e50', '#74a8c8']} // Light to dark gradient
          style={styles.iconGradient}
        >
          <FontAwesome name="download" size={20} color="#ffffff" />
        </LinearGradient>
              
              <Text style={styles.lineText}>Your Friend Downloads the App</Text>
            </View>
            <View style={styles.connector} />

            <View style={styles.line}>
            <LinearGradient
              colors={['#2c3e50', '#74a8c8']}
              style={styles.iconGradient}
            >
              <MaterialIcons name="code" size={20} color="#ffffff" />
              </LinearGradient>
              <Text style={styles.lineText}>
                Your Friend Joins Using Your Referral Code
              </Text>
            </View>
            <View style={styles.connector} />

            <View style={styles.line}>
            <LinearGradient
              colors={['#2c3e50', '#74a8c8']} // Light to dark gradient
              style={styles.iconGradient}
            >
              <MaterialIcons
                name="check-circle"
                size={20}
                color="#ffffff"
              />
              </LinearGradient>
              <Text style={styles.lineText}>
                When Your Friend Completes 3 Tasks:
              </Text>
            </View>
            {/* Subline with bullets */}
            <View style={styles.subline}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.sublineText}>You get ₹25💰</Text>
           
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.sublineText}>They get ₹15💰</Text>
            </View>
          </View>
        
        {/* Placeholder Content */}
        <View style={styles.placeholderContent}>
         <TouchableOpacity style={styles.referContainer} onPress={handleCopy}> 
      {/* Left Section: Referral Code */}
       <View style={styles.leftSection}>
            <Text style={{fontSize:10}}>Your Referral Code</Text>
        <Text style={styles.referralCodeText}>{referralCode}</Text>
      </View> 
      {/* Right Section: Copy Symbol */}
       <View style={styles.rightSection}>
        <MaterialIcons name="content-copy" size={24} color="#557791" />
      </View> 
    </TouchableOpacity>
    <Toast/>
    <Toast config={toastConfig} />

    {/* {!bonusUnlocked ? (
            <TouchableOpacity
              style={[styles.unlockButton, { opacity: 0.6 }]} // Reduced opacity
              onPress={() => setBonusUnlocked(true)}
            >
              <MaterialIcons name="lock" size={20} color="#fff" style={styles.lockIcon} />
              <Text style={styles.unlockButtonText}>Unlock Referral Bonus</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.offerContainer}>
              <Text style={styles.offerHeading}>Limited Time Offer</Text>
              <View style={styles.subHeadingContainer}>
                <Text style={styles.offerSubHeading}>Offer ends in 30 days</Text>
                <MaterialIcons name="timer" size={20} color="#ff5722" />
              </View>
              <Text style={styles.offerDetails}>
                Complete 10 successful referrals in 30 days and earn a ₹150 bonus! 🎉
              </Text>
            </View>
          )} */}


         </View> 
         <View style={styles.shareSection}>
  <Text style={styles.shareText}>Share Your Referral Code</Text>

  <View style={styles.buttonRow}>


  {/* WhatsApp Button */}
  <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppShare}>
    <FontAwesome name="whatsapp" size={20} color="#fff" style={styles.whatsappIcon} />
    <Text style={styles.whatsappButtonText}>WhatsApp</Text>
  </TouchableOpacity>

  {/* Share Button */}
  <TouchableOpacity style={styles.shareButton} onPress={handleNativeShare}>
    <FontAwesome name="share-alt" size={20} color="#666666" style={styles.shareIcon} />
    {/* <Text style={styles.shareButtonText}>Share</Text> */}
  </TouchableOpacity>
</View>
</View>
      
        
      </ScrollView>
    )}

          {selectedTab === 'tab2' && (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.lockLine}>
              <MaterialIcons name="lock" size={16} color="#000" />
              <Text style={styles.lockText}>Your friends haven't used your referral code yet.</Text>
              </View>
              <View style={styles.placeholderContent}>
         <TouchableOpacity style={styles.referContainer} onPress={handleCopy}> 
      {/* Left Section: Referral Code */}
       <View style={styles.leftSection}>
            <Text style={{fontSize:10}}>Your Referral Code</Text>
        <Text style={styles.referralCodeText}>{referralCode}</Text>
      </View> 
      {/* Right Section: Copy Symbol */}
       <View style={styles.rightSection}>
        <MaterialIcons name="content-copy" size={24} color="#557791" />
      </View> 
    </TouchableOpacity>
    <Toast/>
    <Toast config={toastConfig} />

    {/* {!bonusUnlocked ? (
            <TouchableOpacity
              style={[styles.unlockButton, { opacity: 0.6 }]} // Reduced opacity
              onPress={() => setBonusUnlocked(true)}
            >
              <MaterialIcons name="lock" size={20} color="#fff" style={styles.lockIcon} />
              <Text style={styles.unlockButtonText}>Unlock Referral Bonus</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.offerContainer}>
              <Text style={styles.offerHeading}>Limited Time Offer</Text>
              <View style={styles.subHeadingContainer}>
                <Text style={styles.offerSubHeading}>Offer ends in 30 days</Text>
                <MaterialIcons name="timer" size={20} color="#ff5722" />
              </View>
              <Text style={styles.offerDetails}>
                Complete 10 successful referrals in 30 days and earn a ₹150 bonus! 🎉
              </Text>
            </View>
          )} */}


         </View> 
         <View style={styles.shareSection}>
  <Text style={styles.shareText}>Share Your Referral Code</Text>

  <View style={styles.buttonRow}>


  {/* WhatsApp Button */}
  <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppShare}>
    <FontAwesome name="whatsapp" size={20} color="#fff" style={styles.whatsappIcon} />
    <Text style={styles.whatsappButtonText}>WhatsApp</Text>
  </TouchableOpacity>

  {/* Share Button */}
  <TouchableOpacity style={styles.shareButton} onPress={handleNativeShare}>
    <FontAwesome name="share-alt" size={20} color="#666666" style={styles.shareIcon} />
    {/* <Text style={styles.shareButtonText}>Share</Text> */}
  </TouchableOpacity>
</View>
</View>
            </ScrollView>
          )}
    </View>
    
  )
}

const styles = StyleSheet.create ({
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
  scrollContainer: {
    flexGrow: 1, // Ensures the scroll view grows to fill the available space
    paddingHorizontal: 10, // Horizontal padding for content
    paddingVertical: 10, // Vertical padding for content
    paddingBottom: 60, // Space at the bottom for additional elements like share buttons
    marginBottom: 20, // Bottom margin to prevent the content from sticking to the bottom
    
    
  },
  blueBox: {
    backgroundColor: '#557791', // Blue background color
    flexWrap: 'wrap', // Ensure content wraps properly
    padding: 17, // Padding for inner spacing
    borderRadius: 8, // Rounded corners
    minHeight: 325, // Minimum height for box
    maxHeight: 400, // Allow flexibility for content growth
    // width: 308, // Fixed width
    width:'100%',
    marginTop: 15, // Top margin
    marginBottom: 5, // Bottom margin
    overflow: 'hidden', // Prevent text overflow outside the box
  },
  line: {
    flexDirection: 'row', // Icon and text in a row
    alignItems: 'flex-start', // Align items to the top
    // marginBottom: 10, // Spacing between lines
    flexWrap: 'wrap', // Allow text to wrap
    width: '100%', // Ensure the line takes full width of the container
   
  
  },
  lineText: {
    color: '#d1d1d1', // Text color
    fontSize: 15, // Font size
    fontWeight: 'bold', // Bold font
    marginLeft: 10, // Spacing between icon and text
    flex: 1, // Ensure text fills available space
    flexWrap: 'wrap', // Allow text wrapping
    paddingTop:3,
  },
  subline: {
    flexDirection: 'row', // Bullet and text in a row
    alignItems: 'center', // Center align bullet and text
    marginLeft:20, // Indentation for sublines
    marginBottom: 5, // Spacing between sublines
    flexWrap: 'wrap', // Allow text to wrap in sublines
    width: '100%', // Ensure the subline takes full width of the container
  },
  bullet: {
    color: '#000', // Bullet color
    fontSize: 18, // Bullet size
    marginRight: 8, // Spacing between bullet and text
  },
  sublineText: {
    color: '#000', // Subline text color
    fontSize: 14, // Subline text size
    flex: 1, // Ensure text fills available space
    flexWrap: 'wrap', // Allow text wrapping
    marginLeft:-7,
  },
  
  placeholderContent: {
    paddingVertical: 20,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  connector: {
    width: 1, // Thin vertical line
    height: 20, // Adjust height to control space between icons
    backgroundColor: 'gold', // White color for the line
    marginLeft: 14, // Align the line directly below the icon
    marginBottom:4,
    marginTop:4,
    
  },
  iconGradient: {
    padding: 5,
    borderRadius: 100, // Circular gradient background
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
    
  },
  referContainer: {
    flexDirection: 'row', // Divide into two sections
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'flex-start', // Create space between referral code and copy button
    backgroundColor: '#f5f5f5', // Light gray background
    borderColor: '#263540', // Blue border
    borderWidth: 1, // Reduce border thickness
    borderRadius: 8, // Slightly smaller rounded corners
    borderStyle: 'dashed', // Dashed border style
    padding: 8, // Reduce padding for smaller size
    margin: 8, // Keep uniform margin
    marginTop:2,
    shadowColor: '#000', // Shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Subtle elevation
    width: "230px", // Adjust width to fit content
    alignSelf: 'center', // Center the container
    
  },
  
  leftSection: {
    flex: 0, // Allocate more space for the referral code
    justifyContent: 'center',
    paddingHorizontal: 30, // Add some horizontal padding
    marginRight:8,
  },
  referralCodeText: {
    fontSize: 18, // Slightly smaller text
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  rightSection: {
    flex: 0, // Allocate less space for the copy button
    alignItems: 'flex-end', // Align the button to the right
    justifyContent: 'center',
    
  },
  
  copyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  // unlockButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#00796b',
  //   padding: 15,
  //   borderRadius: 8,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 3,
  //   elevation: 5,
  //   marginHorizontal: 20,
  //   marginVertical: 10,
  // },
  // lockIcon: {
  //   marginRight: 10,
  // },
  // unlockButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // offerContainer: {
  //   backgroundColor: '#f9fbe7',
  //   padding: 15,
  //   borderRadius: 8,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 3,
  //   elevation: 5,
  //   marginHorizontal: 0,
  //   marginVertical: 3,

  // },
  // offerHeading: {
  //   fontSize: 18, 
  //   fontWeight: 'bold',
  //   color: '#ff5722',
  //   marginBottom: 5,
  //   textAlign: 'center',
  // },
  // subHeadingContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 10,
  // },
  // offerSubHeading: {
  //   fontSize: 16,
  //   color: '#00796b',
  //   marginRight: 5,
  // },
  // offerDetails: {
  //   fontSize: 14,
  //   color: '#333',
  //   textAlign: 'center',
  // },
  shareSection: {
    alignItems: 'center',
    marginVertical: -5,
    
  },
  shareText: {
    fontSize: 15,
    fontWeight: 'semibold',
    color: '#737373',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Add spacing between buttons
    alignItems: 'center', // Center align buttons vertically
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3cdd77', // WhatsApp green color
    padding: 7,
    paddingHorizontal:30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginRight: 8, // Add spacing between the two buttons
  },
  whatsappIcon: {
    marginRight: 5,
  },
  whatsappButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Blue color for share button
    padding: 8,
    borderRadius: 8,
    borderWidth:0.5,
    borderColor:'#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // elevation: 4,
  },
  shareIcon: {
    marginRight: 5,
  },
  shareButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    
  },
  lockLine: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center icon and text vertically
    marginVertical: 6, // Margin for spacing
    marginTop:20,
  },
  
  lockText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#555', // Text color
    marginLeft: 10, // Space between icon and text
  },
  
  
  
  
  
  
  
})


export default ReferEarnScreen;
