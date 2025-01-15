import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const HeadingBackButtonContainer = ({ activeButton , onPress }) => {
  return ( 
    <View style={styles.headingAndBackButtonContainer}> 
            <View style={styles.backButtonContainer}> 
              <TouchableOpacity
                onPress={() =>  onPress('Home')}
              >
                <Ionicons 
                  name="arrow-back" 
                  size={20} 
                  color="#ffffff" 
                  backgroundColor="transparent" 
                  marginLeft="5" 
                  padding="17"
                  marginBottom
                  // paddingHorizontal='20' 
                  marginTop='-7'
                /> 
              </TouchableOpacity>
            </View>
            <View style={styles.headingContainer}> 
              <Text style={styles.HeadingText}> {activeButton} </Text> 
            </View>
          </View>

  );
};

const styles = StyleSheet.create({
headingAndBackButtonContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        position: 'absolute', 
        top: -2, 
        left: 0, 
        height:'65',
        width:'100%',
        paddingRight:'220',
        // paddingBottom:'-20',
        backgroundColor:'#7bac75',
        },
    
backButtonContainer: { 
        marginRight: 0, // Add marginRight for spacing
        paddingVertical:10,
        },
headingContainer: { 
        // No need for absolute positioning here
      },
HeadingText: { 
        marginLeft: 0, 
        marginTop: -5, 
        // alignContent:'center',
        fontWeight: 'bold', 
        fontSize: 20 , 
        color:'#ffffff', 
        // backgroundColor:'#7bac75', 
        paddingHorizontal: 16, 
        paddingVertical: 19, 
        borderRadius: 0, 
        // paddingRight:235,
        paddingLeft:-10,
        fontFamily:'ui-sans-serif',
        
      }, 
    

}

);

export default HeadingBackButtonContainer;