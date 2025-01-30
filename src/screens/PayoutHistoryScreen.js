import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const PayoutHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#fff" style={styles.iconStyle} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer History</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text>Transfer history content goes here.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7bac75',
    padding: 15,
    marginTop:35,
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft:15,
  },
  content: {
    padding: 20,
  },
  iconStyle:{
    marginTop: 3,
  },
});

export default PayoutHistoryScreen;
