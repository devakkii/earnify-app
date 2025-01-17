import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrimeOfferScreen = ({activeButton}) => {
  return (
    <View style={styles.container}>
      
          <Text> This is a Testing.</Text>
          
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrimeOfferScreen;