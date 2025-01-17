import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PrimeOfferScreen = () => {
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [balance, setBalance] = useState(0); // Amount (example: ₹1,000)

  const isWithdrawable = balance >= 1000; // Condition to check if withdrawal is allowed

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
            {/* Wallet Heading */}
            <Text style={styles.walletHeading}>Prime Balance</Text>
            {/* Wallet Amount */}
            <Text style={styles.walletAmount}>₹{balance}</Text>
            {/* Withdraw Button */}
            <TouchableOpacity
              style={[
                styles.withdrawButton,
                !isWithdrawable && styles.withdrawButtonDisabled,
              ]}
              disabled={!isWithdrawable} // Disable button when amount < ₹1,000
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
            {/* History Buttons */}
            <View style={styles.historyContainer}>
              <TouchableOpacity>
                <Text style={styles.historyButtonText}>Prime History {'>'}</Text>
              </TouchableOpacity>
              <Text>    </Text>
              <TouchableOpacity>
                <Text style={styles.historyButtonText}>Payout History {'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
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
    marginRight:35,
  },
  historyButtonText: {
    fontSize: 13,
    fontWeight: '450',
    color: '#b3b3b3',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
  },
});

export default PrimeOfferScreen;
