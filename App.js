import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import HomeScreen from './src/screens/HomeScreen';
import PrimeOfferScreen from './src/screens/PrimeOfferScreen';
import PrimePayoutScreen from './src/screens/PrimePayoutScreen';
import PrimePaymentScreen from './src/screens/PrimePaymentScreen';


const Stack = createStackNavigator();

export default function App() {
  const [headerVisible, setHeaderVisible] = useState(false); // Initially hide header for login & OTP screens

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: headerVisible }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ headerShown: headerVisible }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Always show header on home screen
        />
        <Stack.Screen name="PrimeOffers" component={PrimeOfferScreen} options={{ headerShown: false }} />

        <Stack.Screen
          name="PrimePayment"
          component={PrimePaymentScreen}
          options={{
            headerShown: true,
            title: 'Prime History', // Set the header title
            headerStyle: {
              backgroundColor: '#7bac75', // Change the header background color
            },
            headerTintColor: '#ffffff', // Change the text/icon color in the header
            headerTitleStyle: {
              fontWeight: 'semi-bold', // Customize title font style
            },
          }}
        />

        <Stack.Screen
          name="PayoutHistory"
          component={PrimePayoutScreen}
          options={{
            headerShown: true,
            title: 'Payout History', // Set the header title
            headerStyle: {
              backgroundColor: '#7bac75', // Change the header background color
            },
            headerTintColor: '#ffffff', // Change the text/icon color in the header
            headerTitleStyle: {
              fontWeight: 'semi-bold', // Customize title font style
            },
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}


 

  
