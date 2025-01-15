import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeadingBackButtonContainer from './HeadingBackButtonContainer';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <HeadingBackButtonContainer /> 
      {/* <Text>Wallet Screen</Text>  */}
      {/* ... your WalletScreen content */}
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

export default WalletScreen;
;
