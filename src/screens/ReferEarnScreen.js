import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ReferEarnScreen = ({activeButton}) => {
  return (
    <View style={styles.container}>
      {/* <HeadingBackButtonContainer />  */}
          <Text> This is a Testing.</Text>

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

export default ReferEarnScreen;
