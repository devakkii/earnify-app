import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeadingBackButtonContainer from './HeadingBackButtonContainer';

const WalletScreen = ({activeButton}) => {
  return (
    <View style={styles.container}>
      {/* <HeadingBackButtonContainer />  */}
      {/* <Text>Wallet Screen</Text>  */}
      {/* ... your WalletScreen content */}

          <Text> This is Mike.</Text>
    {/* <Text> This is a jhjdh page.</Text> */}
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