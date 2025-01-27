import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeadingBackButtonContainer = ({ activeButton, onPress }) => {
  const navigation = useNavigation();

  // Handle back press with conditional navigation logic for the wallet screen
  const handleBackPress = () => {
   onPress('Home')
  };

  return (
    <View style={styles.headingAndBackButtonContainer}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#ffffff"
            style={styles.iconStyle}

          />
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.HeadingText}>{activeButton}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingAndBackButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    left: 0,
    width: '100%',
    height: 65,
    backgroundColor: '#7bac75',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  backButtonContainer: {
    paddingVertical: 10,
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  HeadingText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
    paddingVertical: 19,
    fontFamily: 'ui-sans-serif',
    paddingRight:210,
  },
  iconStyle: {
    marginTop: 3,
  },
});

export default HeadingBackButtonContainer;
