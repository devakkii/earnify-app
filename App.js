import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import OTPScreen from "./src/screens/OTPScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PrimeOfferScreen from "./src/screens/PrimeOfferScreen";
import PrimePayoutScreen from "./src/screens/PrimePayoutScreen";
import PrimePaymentScreen from "./src/screens/PrimePaymentScreen";
import WalletScreen from "./src/screens/WalletScreen";
import ReferEarnScreen from "./src/screens/ReferEarnScreen";
import RewardsHistoryScreen from "./src/screens/RewardsHistoryScreen";
import PayoutHistoryScreen from "./src/screens/PayoutHistoryScreen";
import { enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();
enableScreens();

export default function App() {
  const [headerVisible, setHeaderVisible] = useState(false);

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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Refer"
          component={ReferEarnScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrimeOffers"
          component={PrimeOfferScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrimePayment"
          component={PrimePaymentScreen}
          options={{
            headerShown: true,
            title: "Prime History",
            headerStyle: { backgroundColor: "#7bac75", height: 94.5 },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "semi-bold" },
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="PayoutHistory"
          component={PrimePayoutScreen}
          options={{
            headerShown: true,
            title: "Payout History",
            headerStyle: { backgroundColor: "#7bac75", height: 94.5 },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "semi-bold" },
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="WalletRewardsHistory"
          component={RewardsHistoryScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="WalletPayoutHistory"
          component={PayoutHistoryScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
