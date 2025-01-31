import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header';
import Footer from './Footer';
import HeadingBackButtonContainer from './HeadingBackButtonContainer';
import WalletScreen from './WalletScreen'
import ReferEarnScreen from "./ReferEarnScreen";
import PrimeOfferScreen from './PrimeOfferScreen';

const HomeScreen = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('Home'); // Default active button
  const [isModalVisible, setModalVisible] = useState(false);
  const [clickedBox, setClickedBox] = useState(null); // Track clicked box
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Control alert visibility
  const [isPrimeWithdrawn, setIsPrimeWithdrawn] = useState(false);  // State for managing modal visibility
  const [balance] = useState(30); // Code to set balance in wallet screen wallet 
  const [pendingReward] = useState(10); // Code to set balance in wallet screen pending reward

    // Compute total balance
  const totalBalance = balance + pendingReward;

  
const logos = [
  require('../../assets/day1.jpg'),
  require('../../assets/day2.jpg'),
  require('../../assets/day3.jpg'),
  require('../../assets/day4.jpg'),
  require('../../assets/day5.jpg'),
  require('../../assets/day6.jpg'),
  require('../../assets/day7.jpg'),
];

const handleFooterButtonPress = (buttonName) => {
  setActiveButton(buttonName); 
};

// Function to toggle modal visibility
const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

const renderContent = () => {
  switch (activeButton) {
    case 'Wallet':
      return <WalletScreen setActiveButton={setActiveButton} balance={balance} pendingReward={pendingReward} />;
    case 'Refer':
      return <ReferEarnScreen />;
    case 'Prime Offer':
        return <PrimeOfferScreen navigation={navigation} setIsPrimeWithdrawn={setIsPrimeWithdrawn} 
/>;
    
    default:
      return <Text>No Content Available</Text>;
  }
};


const renderDailyCheckInModal = () => (
  <View>
    <Text style={styles.modalHeading}>Current Streak : 0 Days</Text>
    <View style={styles.streakBoxesContainer}>
      {Array.from({ length: 7 }, (_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.streakBox,
            clickedBox === index && { backgroundColor: '#b3e5fc' }, // Highlight clicked box
          ]}
          onPress={() => {
            if (!isAlertVisible) {
              setClickedBox(index); // Mark the box as clicked
              setIsAlertVisible(true); // Show alert
              setTimeout(() => {
                setIsAlertVisible(false); // Hide alert after 2 seconds
                alert('Cashback credited!'); // Final alert after timeout
              }, 2000);
            }
          }}
        >
          <Image
            source={logos[index]} // Use the logo based on the index
            style={styles.boxLogo}
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);



  

  return (
    <View style={styles.container}>
      {/* Header Section */}
      {activeButton == 'Home' && <Header totalBalance={totalBalance}/>}
     

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
       :   (
        
        
        <View style={styles.nonHomeContent}>
         {!isPrimeWithdrawn && <HeadingBackButtonContainer
            activeButton={activeButton}
            onPress={() => handleFooterButtonPress('Home')}
          />}
          <View style={styles.mainContent}>{renderContent()}</View>
        </View>
      )}

        
      

      <Footer 
        activeButton={activeButton} 
        onPress={handleFooterButtonPress} 
        totalBalance={totalBalance}
      /> 

   

    

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
        <Text style={styles.bottommodalText}>🎁 Grab ₹3.0 on Day 7 </Text>

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
   
      
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'space-between',
    marginTop: 40,
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
    backgroundColor: '#ffffff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '54.25%',
    padding: 20,
    backgroundColor: '#ffffe6',
    
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
    marginLeft:20,
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
    marginVertical: -30, // Spacing between lines and other elements
    marginTop:-315,
  },
  bottomhorizontalLine: {
    height: 1,
    marginVertical: -37,
    width: '115%',
    backgroundColor:'#b3b3b3'
  },
  bottommodalText:{
    textAlign: 'center',
    marginTop: 350,
    color: '#000000',
    fontWeight:'medium',
    marginRight:72,
    fontFamily:'font-mono',

  },
  claimButton: {
    marginTop: 45, // Adjust spacing as needed
    marginLeft: 168,
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
  streakBoxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to the next line
    justifyContent: 'space-around', // Distributes the boxes evenly
    marginVertical: 17,
    marginTop:29,
    paddingHorizontal: 0,
    
    
  },
  streakBox: {
    width: 75, // Box width
    height: 75, // Box height
    backgroundColor: '#fff', // White background
    borderRadius: 10, // Rounded corners
    justifyContent: 'center', // Centers the content vertically
    overflow: 'hidden',
    alignItems: 'center', // Centers the content horizontally
    marginBottom: 15, // Space between rows
    elevation: 10, // Adds shadow for 3D effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // marginTop:5,
    
    borderWidth: 1.5, // Optional border
    borderColor: 'rgba(13, 13, 13, 0.6)', // Subtle green border
  },
  boxLogo: {
    width: '200%', // Logo width
    height: "200%", // Logo height
    resizeMode: 'contain', // Keeps the logo aspect ratio
  },
  boxDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 5,
  },
  
  welcomeText: {
    textAlign:'center',
    marginTop:'100%'
  },
  
  nonHomeContent: {
    flex: 1, 
    backgroundColor: '#ffffff' // Set background color here
  },

});


export default HomeScreen;