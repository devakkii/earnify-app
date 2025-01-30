import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({totalBalance}) => {
  return (
    <View style={styles.header}>
        <Image
          source={require('../../assets/homescreenlogo.png')}
          style={styles.logo}
        />
        <View style={styles.walletContainer}>
          <View style={styles.walletProfile}>
            <Ionicons name="wallet" size={23} color="#888" />
            <Text style={styles.balanceText}>₹{totalBalance}</Text>
          </View>
          <Ionicons name="person-circle" size={35} color="#888" paddingTop="25" />
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
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
});



export default Header;