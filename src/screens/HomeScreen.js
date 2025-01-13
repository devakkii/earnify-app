import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('Home'); // Default active button
  const [isModalVisible, setModalVisible] = useState(false);

// Function to toggle modal visibility
const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

const renderDailyCheckInModal = () => (
  <View>
    <Text style={styles.modalHeading}>Current Streak : 0 Days</Text>
    {/* <Text style={styles.modalSubText}>Complete 7 Days streak to earn a Bonus.</Text> */}
    {/* Add any interactive content for check-in boxes here */}
  </View>
);


  const handleFooterButtonPress = (buttonName) => {
    setActiveButton(buttonName); // Update the active button state
    // Navigate or perform any other actions as needed
    // if (buttonName === 'Home') {
    //   // Do something for Home
    // } else if (buttonName === 'Refer') {
    //   // Do something for Refer
    // } else if (buttonName === 'Contact') {
    //   // Do something for Contact Us
    // }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/homescreenlogo.png')}
          style={styles.logo}
        />
        <View style={styles.walletContainer}>
          <View style={styles.walletProfile}>
            <Ionicons name="wallet" size={23} color="#888" />
            <Text style={styles.balanceText}>₹10.00</Text>
          </View>
          <Ionicons name="person-circle" size={35} color="#888" paddingTop="25" />
        </View>
      </View>

      {/* Main Content Area */}
      { activeButton === 'Home' ? 
      <ScrollView style={styles.mainContent}>
        {/* Section 1: Daily Check-In and Rewards */}
        <View style={styles.section1}>
          {/* Daily Check-In */}
          <TouchableOpacity style={styles.dailyCheckin} onPress={toggleModal}>
            <Image source={require('../../assets/daily-checkin.jpg')} style={styles.sectionLogo} />
            {/* <Text style={styles.sectionText}>Daily Check-In</Text> */}
          </TouchableOpacity>
          {/* Rewards */}
          <TouchableOpacity style={styles.rewards} onPress={() => alert('Watch Video Reward!')}>
            <Image source={require('../../assets/videorewards.jpg')} style={styles.sectionLogo} />
            {/* <Text style={styles.sectionText}>Rewards</Text> */}
          </TouchableOpacity>
        </View>

       


        {/* Section 2: Available Offers */}
        <View style={styles.section2}>
          <Text style={styles.sectionHeading}>Available Offers</Text>
          <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <View style={styles.offerCard}>
              <Text style={styles.offerText}>Offer 1</Text>
            </View>
            <View style={styles.offerCard}>
              <Text style={styles.offerText}>Offer 2</Text>
            </View>
            <View style={styles.offerCard}>
              <Text style={styles.offerText}>Offer 3</Text>
            </View>
            <View style={styles.offerCard}>
              <Text style={styles.offerText}>Offer 4</Text>
            </View>
          </ScrollView>
        </View>

        {/* Section 3: More Earning Ways */}
        <View style={styles.section3}>
          <Text style={styles.comingSoonText}>More earning ways are coming soon!</Text>
        </View>
      </ScrollView>
       :  (
        <View style={styles.emptyContent} /> // Render an empty view for other buttons
      )}

      {/* Footer Section */}
      <View style={styles.footer}>
        {['Home', '₹10.00', 'Refer', '₹1000'].map((buttonName, index) => (
          <TouchableOpacity
            key={index}
            style={styles.footerButton}
            onPress={() => handleFooterButtonPress(buttonName)}
          >
            {/* Active Line */}
            <View
              style={[
                styles.activeLine,
                activeButton === buttonName && styles.activeLineVisible,
              ]}
            />
            {buttonName === '₹1000' ? (
                <Text style={styles.earnIcon}>🤑</Text> // Earn button with icon
              ) : (
            <Ionicons
              name={
                buttonName === 'Home'
                  ? 'home'
                  : buttonName === 'Refer'
                  ? 'people-outline'
                  : 'wallet'
              }
              size={20}
              color={activeButton === buttonName ? '#00796b' : '#5a5a5a'}
            /> )}
            <Text
              style={[styles.footerButtonText, activeButton === buttonName && styles.activeButtonText]}
            >
              {buttonName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    

    {/* Daily Check-In Modal */}

    <Modal
    visible={isModalVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={toggleModal}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContent}>
        

      
        {/* Rounded Cross Button */}

      <TouchableOpacity style={styles.closeIconButton} onPress={toggleModal}>
        <Ionicons name="close" size={24} color="#ffffff" />
      </TouchableOpacity>
           
            {/* Modal Content */}

        {renderDailyCheckInModal()}


        <View style={styles.tophorizontalLine} />
        <Text style={styles.bottommodalText}>Grab ₹3 on Day 7 → </Text>

        <View style={styles.bottomhorizontalLine} />

                {/* 3D Claim Button */}
        <TouchableOpacity style={styles.claimButton} onPress={() => alert('Reward Claimed!')}>
          <Text style={styles.claimButtonText}>Claim</Text>
        </TouchableOpacity>

      </View>
    </View>
  </Modal>
  </View>

      );
    };
   
      
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: -25,
    backgroundColor: '#ffffff',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginBottom: -17,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
    paddingTop: 24,
  },
  balanceText: {
    color: '#7bac75',
    fontSize: 16,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 0,
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  footerButton: {
    alignItems: 'center',
    padding: 0,
  },
  activeLine: {
    height: 3,
    width: 0,
    backgroundColor: '#00796b',
    marginBottom: 4,
  },
  activeLineVisible: {
    width: 30,
  },
  footerButtonText: {
    color: '#5a5a5a',
    fontSize: 12,
    marginTop: 0,
    marginBottom: 20,
  },
  activeButtonText: {
    color: '#00796b',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:50,
  },
  dailyCheckin: {
    marginTop:-15,
    flex: 1,
    marginLeft:18,
    margin: 10, // Equal margin on all sides
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background
    borderRadius: 15, // Rounded corners for a clean look
    borderWidth: 1, // Thin border
    borderColor: 'rgba(0, 150, 136, 0.6)', // Subtle green border
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Equal shadow offset for balance
    shadowOpacity: 0.2, // Light shadow opacity
    shadowRadius: 5, // Blur radius for shadow
    elevation: 6, // Shadow for Android
    padding: 0, // Inner padding
    justifyContent: 'center', // Center content
    width: 100, // Fixed width for uniformity
    height: 120, // Fixed height for uniformity
  },
  rewards: {
    marginTop:-15,
    flex: 1,
    margin: 20,
    marginRight:20, // Equal margin on all sides
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background
    borderRadius: 15, // Rounded corners for a clean look
    borderWidth: 1, // Thin border
    borderColor: 'rgba(255, 140, 0, 0.6)', // Subtle orange border
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Equal shadow offset for balance
    shadowOpacity: 0.2, // Light shadow opacity
    shadowRadius: 5, // Blur radius for shadow
    elevation: 6, // Shadow for Android
    padding: 0, // Inner padding
    justifyContent: 'center', // Center content
    width: 100, // Fixed width for uniformity
    height: 120, // Fixed height for uniformity
  },
  sectionLogo: {
    width: 85, // Image size adjusted to fit within the box
    height: 85,
    borderRadius: 10, // Rounded image corners
    overflow: 'hidden', // Ensure image fits within the box
    marginRight:0,
    
  },
  
  
  
  sectionText: {
    fontSize: 14,
    color: '#555',
  },
  section2: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  offerCard: {
    width: 120,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  offerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  section3: {
    alignItems: 'center',
    marginTop: 20,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#888',
  },
  emptyContent: {
    flex: 1,
    backgroundColor: '#888',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '60%',
    padding: 20,
    backgroundColor: '#7bac90',
    
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    marginTop: -142,
    padding: 10,
    marginLeft:185,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    
  },
  closeButtonText: {
    color: '#4b5a57',
    fontWeight: 'bold',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:-5,
    marginLeft:1,
    fontFamily:'font-mono',
    
  },
  modalSubText: {
    fontSize: 14,
    color: '#555',
  },
  closeIconButton: {
    position: 'absolute', // Position at the top-right corner
    top: -40, // Adjust vertical spacing
    right: -2, // Adjust horizontal spacing
    width: 30,
    height: 30,
    borderRadius: 20, // Makes it fully circular
    backgroundColor: '#5a5a5a', // Your preferred color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Adds shadow for better visual effect
  },
  tophorizontalLine: {
    height: 1, // Thickness of the line
    backgroundColor: '#b3b3b3', // Line color (light gray)
    width: '115%', // Full width of the modal
    marginVertical: 2, // Spacing between lines and other elements
  },
  bottomhorizontalLine: {
    height: 1,
    marginVertical: -37,
    width: '115%',
    backgroundColor:'#b3b3b3'
  },
  bottommodalText:{
    textAlign: 'center',
    marginTop: 359,
    color: '#4c4c4c',
    fontWeight:'bold',
    marginRight:72,
    fontFamily:'font-mono',

  },
  claimButton: {
    marginTop: 47, // Adjust spacing as needed
    marginLeft: 147,
    backgroundColor: '#00796b', // Button color
    paddingVertical: 10, // Vertical padding for the button
    paddingHorizontal: 17, // Horizontal padding
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Offset for the shadow
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 5, // Blur radius
    elevation: 200, // Shadow for Android
    alignSelf: 'center', // Center align the button
  },
  claimButtonText: {
    color: '#fff', // Text color
    fontWeight: 'bold', // Bold text
    fontSize: 10, // Text size
    textAlign: 'center', // Center align text
    textTransform: 'uppercase', // Uppercase text
    padding:'-10',
  },
  
});


export default HomeScreen;