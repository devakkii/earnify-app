import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PrimePaymentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>Complete task to receive Prime Payment.</Text>
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
    fontSize: 14,
    fontWeight: 'semibold',
  },
});

export default PrimePaymentScreen;