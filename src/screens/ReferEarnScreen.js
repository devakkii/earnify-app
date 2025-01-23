import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Clipboard, Alert, Vibration } from 'react-native';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Icon library
import { LinearGradient } from 'expo-linear-gradient';
import Toast, {BaseToast} from 'react-native-toast-message'; // Import Toast




const ReferEarnScreen = ({activeButton}) => {
    const [selectedTab, setSelectedTab] = useState('tab1');



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
        text2: `Referral Code "${referralCode}" has been copied.`,
        position: 'top', // Position of the toast
      visibilityTime: 1000, // Duration the toast is visible (in ms)
    
      });

    };
    const toastConfig = {
      success: (props) => (
        <BaseToast
          {...props}
          style={{ backgroundColor: '#557791', borderLeftColor: '#4caf50', height:40 }} // Green background
          text1Style={{
            fontSize: 12,
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
        <Text style={styles.referralCodeText}>{referralCode}</Text>
      </View>
      {/* Right Section: Copy Symbol */}
      <View style={styles.rightSection}>
        <MaterialIcons name="content-copy" size={24} color="#007BFF" />
      </View>
    </TouchableOpacity>
    {/* <Toast/> */}
    <Toast config={toastConfig} />


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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  blueBox: {
    backgroundColor: '#557791', // Blue background color
    flexWrap: 'wrap', // Ensure content wraps properly
    padding: 17, // Padding for inner spacing
    borderRadius: 8, // Rounded corners
    minHeight: 325, // Minimum height for box
    maxHeight: 400, // Allow flexibility for content growth
    width: 308, // Fixed width
    marginTop: 15, // Top margin
    marginBottom: 7, // Bottom margin
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 10,
    borderStyle:'dashed',
    padding: 5,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    paddingHorizontal:10,
  },
  leftSection: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal:20,
  },
  referralCodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  rightSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    
  },
  copyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  
  
  
})


export default ReferEarnScreen;
