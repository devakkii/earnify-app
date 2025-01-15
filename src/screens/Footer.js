import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Footer = ({ activeButton, onPress }) => {
    
  return (
    <View style={styles.footer}>
  {['Home', 'Wallet', 'Refer', 'Prime Offer'].map((buttonName, index) => (
    <TouchableOpacity
      key={index}
      style={styles.footerButton}
      onPress={() => onPress(buttonName)}
    >
      {/* Active Line */}
      <View
        style={[
          styles.activeLine,
          activeButton === buttonName && styles.activeLineVisible,
        ]}
      />
      {buttonName === 'Prime Offer' ? (
        <>
          {/* Earn button icon */}
          <Text style={styles.earnIcon}>🤑</Text> 
          <Text
            style={[
              styles.footerButtonText,
              activeButton === buttonName && styles.activeButtonText,
            ]}
          >
            ₹1000 {/* Display fixed amount */}
          </Text>
        </>
      ) : buttonName === 'Wallet' ? (
        <>
          <Ionicons
            name="wallet"
            size={20}
            color={activeButton === buttonName ? '#00796b' : '#5a5a5a'}
          />
          <Text
            style={[
              styles.footerButtonText,
              activeButton === buttonName && styles.activeButtonText,
            ]}
          >
            ₹10.00 {/* Dynamic wallet balance */}
          </Text>
        </>
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
        />
      )}
      {buttonName !== 'Wallet' && buttonName !== 'Prime Offer' && (
        <Text
          style={[
            styles.footerButtonText,
            activeButton === buttonName && styles.activeButtonText,
          ]}
        >
          {buttonName}
        </Text>
      )}
    </TouchableOpacity>
  ))}
</View>

  );
};

const styles = StyleSheet.create({ 
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

}

);


export default Footer;