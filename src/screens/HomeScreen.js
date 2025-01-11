import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('Home'); // Default active button

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
          <TouchableOpacity style={styles.dailyCheckin} onPress={() => alert('Daily Check-In!')}>
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
        {['Home', 'Refer', 'Wallet', '₹500'].map((buttonName, index) => (
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
            {buttonName === '₹500' ? (
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
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  rewards: {
    flex: 1,
    alignItems: 'center',
  },
  sectionLogo: {
    width: 110,
    height: 110,
    marginBottom: 10,
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
});

export default HomeScreen;
