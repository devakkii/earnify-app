import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PrimePayoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>No Payout History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
 
  heading: {
    fontSize: 18,
    fontWeight: 'semi-bold',
  },
});

export default PrimePayoutScreen;
