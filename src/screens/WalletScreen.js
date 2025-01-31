import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PixelRatio,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import expo-linear-gradient
import Icon from "react-native-vector-icons/FontAwesome";
import { Snackbar } from "react-native-paper";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window"); // Get the width of the device screen

const WalletScreen = ({ setActiveButton, balance, pendingReward }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [offersCompleted, setOffersCompleted] = useState(3); // Hardcoded offers completed value

  const [isWalletUnlocked, setIsWalletUnlocked] = useState(false); // Track if wallet is unlocked
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current; // Starts from bottom
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null); // State for selected payment mode

  const isWithdrawable = offersCompleted >= 3; // Check both conditions

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const navigation = useNavigation();

  const handleTryOfferPress = () => {
    setActiveButton("Home"); // Switch back to Home content
  };
  const handleWithdrawPress = () => {
    console.log("Withdraw pressed");
    setWithdrawModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Move to the visible position
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeWithdrawModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get("window").height, // Move back down
      duration: 300,
      useNativeDriver: true,
    }).start(() => setWithdrawModalVisible(false));
  };

  // Effect to simulate unlocking the wallet when offersCompleted reaches a certain value
  useEffect(() => {
    if (offersCompleted >= 3) {
      setIsWalletUnlocked(true);
    }
  }, [offersCompleted]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "RobotoSlab-Regular": require("../../assets/fonts/RobotoSlab-Regular.ttf"),
        "RobotoSlab-Medium": require("../../assets/fonts/RobotoSlab-Medium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, return a loading screen
  }

  // Scalable font size using PixelRatio to ensure consistency across devices
  const fontScale = PixelRatio.getFontScale();

  const handlePaymentModeChange = (mode) => {
    setSelectedPaymentMode(mode);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Wallet container with Linear Gradient */}
        <LinearGradient
          colors={["#425c70", "#557791"]} // Define your gradient colors here
          start={{ x: 0, y: 0 }} // Define the start point of the gradient
          end={{ x: 1, y: 1 }} // Define the end point of the gradient
          style={styles.walletContainer} // Apply styles to the gradient wallet container
        >
          {/* Wallet Heading */}
          <Text style={[styles.walletHeading, { fontSize: 25 * fontScale }]}>
            Total Balance
          </Text>

          {/* Wallet Amount with Rupee Symbol */}
          <Text style={[styles.walletAmount, { fontSize: 30 * fontScale }]}>
            ₹{balance}
          </Text>

          {/* Withdraw Button */}
          <TouchableOpacity
            style={[
              styles.withdrawButton,
              !isWithdrawable && styles.withdrawButtonDisabled,
            ]}
            disabled={!isWithdrawable}
            onPress={handleWithdrawPress}
          >
            <Text
              style={[
                styles.withdrawButtonText,
                !isWithdrawable && styles.withdrawButtonTextDisabled,
              ]}
            >
              Withdraw Amount
            </Text>
          </TouchableOpacity>

          {/* History Links */}
          <View style={styles.historyContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("WalletRewardsHistory")}
            >
              <Text style={styles.historyButtonText}>
                Rewards History {">"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("WalletPayoutHistory")}
            >
              <Text style={styles.historyButtonText}>
                Transfer History {">"}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Pending Reward Section */}
        {pendingReward > 0 && (
          <View style={styles.pendingRewardContainer}>
            <View style={styles.rewardHeading}>
              <TouchableOpacity
                onPress={() => setSnackbarVisible(true)}
                style={styles.infoButton}
              >
                <Icon name="info-circle" size={20} color="#b3b3b3" />
              </TouchableOpacity>
              <Text style={styles.pendingRewardText}>
                Referral Pending Reward:{" "}
                <Text style={{ fontWeight: 350 }}>₹{pendingReward}</Text>
              </Text>
            </View>
            <Text style={styles.pendingRewardAmount}></Text>
          </View>
        )}

        {/* Lock Section */}
        <View style={styles.lockSection}>
          {isWalletUnlocked ? (
            <Feather
              name="unlock"
              size={20}
              color="#000"
              style={styles.lockIcon}
            />
          ) : (
            <Feather
              name="lock"
              size={24}
              color="#000"
              style={styles.lockIcon}
            />
          )}
          <View>
            <Text style={styles.lockText}>
              {isWalletUnlocked
                ? "Wallet is unlocked"
                : "Wallet will be unlocked when:"}
            </Text>
            <View
              style={[
                isWalletUnlocked
                  ? styles.unlockedConditionContainer
                  : styles.lockedConditionContainer,
                { backgroundColor: "#ffffff" },
              ]}
            >
              {/* Row for Icon, Text, and Button */}
              <View style={styles.row}>
                {/* Offer Icon */}
                <Image
                  source={require("../../assets/discount.png")}
                  style={styles.icon}
                />
                {/* Text Container for Heading and Subheading */}
                <View style={styles.textContainer}>
                  <Text style={styles.conditionHeading}>
                    {isWalletUnlocked
                      ? "Offer Completed" // Text after wallet is unlocked
                      : `Complete Any ${offersCompleted} Offer`}
                  </Text>
                  <Text style={styles.conditionText}>Try More Offers</Text>
                </View>

                {/* Conditionally Render Button or Tick Icon */}
                {isWalletUnlocked ? (
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline"
                    size={30}
                    color="green"
                    style={styles.tickIcon}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={handleTryOfferPress} // Ensure 'Home' is correctly set up in your navigation stack
                    style={styles.tryOfferButton}
                  >
                    <Text style={styles.tryOfferButtonText}>Try Offer</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={6000}
        style={styles.snackbar}
      >
        When Your friend completes any 3 tasks then you will receive this in
        your Wallet.
      </Snackbar>

      {/* Animated Withdraw Modal */}
      {isWithdrawModalVisible && (
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.headerRow}>
              <Text style={styles.modalHeading}>Withdraw Amount</Text>
              <TouchableOpacity onPress={closeWithdrawModal}>
                <Entypo name="cross" style={styles.closeButton} />
              </TouchableOpacity>
            </View>

            {/* Light Blue Background Container */}
            <View style={styles.lightBlueContainer}>
              <Text style={styles.selectPaymentModeHeading}>
                Select Payment Mode
              </Text>

              <View style={styles.paymentModeContainer}>
                <Image
                  source={require("../../assets/bhimupi.png")}
                  style={styles.upiLogo}
                />
                {/* Radio Button for Payment Mode Selection */}
                <TouchableOpacity
                  onPress={() => handlePaymentModeChange("bhimUPI")}
                >
                  <View
                    style={[
                      styles.radioButton,
                      selectedPaymentMode === "bhimUPI" && styles.selectedRadio,
                    ]}
                  >
                    {selectedPaymentMode === "bhimUPI" && (
                      <View style={styles.innerCircle} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* <Text style={styles.placeholderText}>Your content here...</Text> */}
              {/* Heading for Amount Selection */}
              <Text style={styles.amountSelectionHeading}>
                Select Amount to be Transferred
              </Text>

              {/* Horizontally Scrollable Section */}
              <ScrollView
                horizontal
                contentContainerStyle={styles.amountContainer}
              >
                {[10, 20, 30, 50, 100, 200, 300, 400, 500].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.amountBox}
                    onPress={() => console.log(`Amount Selected: ₹${amount}`)} // Handle the amount selection
                  >
                    <Text style={styles.amountText}>₹{amount}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Withdraw Button */}
            <TouchableOpacity
              style={styles.modalWithdrawButton}
              onPress={() => console.log("Withdraw initiated")}
            >
              <Text style={styles.modalWithdrawButtonText}>
                Withdraw Amount
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 65,
    width: "100%",
  },
  walletContainer: {
    width: "110%",
    maxWidth: width * 0.9,
    padding: 12,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignSelf: "center",
    elevation: 6,
  },
  walletHeading: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "#f0f5f5",
    marginBottom: 10,
  },
  walletAmount: {
    fontSize: 40,
    fontWeight: "semibold",
    color: "#f0f5f5",
    marginBottom: 15,
    fontFamily: "sans-serif",
  },
  withdrawButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 11,
    elevation: 5,
  },
  withdrawButtonDisabled: {
    backgroundColor: "#afc1d0",
    elevation: 0,
    borderRadius: 11,
  },
  withdrawButtonText: {
    fontSize: 16,
    color: "#000",
  },
  withdrawButtonTextDisabled: {
    color: "grey",
  },
  historyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  historyButtonText: {
    fontSize: 13,
    color: "#b3b3b3",
    textDecorationLine: "underline",
  },
  pendingRewardContainer: {
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    padding: 10,
    height: "7%",
    width: "100%",
    marginLeft: 1,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // elevation: 3,
  },
  rewardHeading: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "left",
    width: "100%",
    marginBottom: 4,
  },
  pendingRewardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2196f3",
    marginLeft: 6,
  },
  infoButton: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    width: 18,
    height: 22,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  pendingRewardAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00796b",
  },
  lockSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,

    // marginBottom: 10,
    // height:200,
  },
  lockIcon: {
    marginRight: 6,
    marginBottom: 90,
    marginLeft: -9,
  },
  lockText: {
    fontSize: 16,
    fontWeight: "semibold",
    marginRight: 5,
    marginBottom: 60,
    fontFamily: "RobotoSlab-Medium",
  },
  conditionContainer: {
    width: "115%",
    height: 70,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    justifyContent: "center",
    marginTop: -40,
    // paddingHorizontal: 6,
    marginLeft: -35,
    backgroundColor: "#ffffff",
    // height: 120, // Set a fixed height to ensure no shrinking
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures proper spacing between items
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 2,
  },
  textContainer: {
    flex: 1, // Allows text to take available space
    flexDirection: "column", // Aligns heading and subheading vertically
    justifyContent: "center", // Centers vertically
  },
  conditionHeading: {
    fontSize: 12.5,
    fontWeight: "bold",
    color: "#333",
    marginLeft: -10,
  },
  conditionText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    marginLeft: -10,
  },
  tryOfferButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
    justifyContent: "center",
  },
  tryOfferButtonText: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 12,
  },
  tickIcon: {
    marginRight: 20,
  },

  snackbar: {
    backgroundColor: "#333",
    position: "absolute",
    bottom: 70, // Keep it anchored at the bottom
    left: 0,
    right: 0,
  },
  unlockedConditionContainer: {
    width: "180%",
    height: 70,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    justifyContent: "center",
    marginTop: -40,
    // paddingHorizontal: 6,
    marginLeft: -26,
    backgroundColor: "#ffffff",
    // height: 120, // Set a fixed height to ensure no shrinkin
  },
  lockedConditionContainer: {
    width: "115%",
    height: 70,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    justifyContent: "center",
    marginTop: -40,
    // paddingHorizontal: 6,
    marginLeft: -35,
    backgroundColor: "#ffffff",
    // height: 120, // Set a fixed height to ensure no shrinking
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: -16,
    right: -16,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "flex-end",
  },
  modal: {
    width: "99%",
    height: "55%", // Adjust height as needed
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    marginLeft: 2,
    elevation: 20,
    zIndex: 10, // Ensures it is above the footer
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // marginBottom: 10, // You can adjust the margin as needed
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  lightBlueContainer: {
    backgroundColor: "#e3f2fd",
    // borderRadius: 10,
    padding: 15,
    width: "112.5%",
    marginLeft: -20,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20, // Space before the button
  },
  selectPaymentModeHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    // marginBottom: 10, // Space between heading and the small container
    textAlign: "center",
  },

  paymentModeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    // padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginTop: 10,
    width: "40%",
  },
  upiLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRadio: {
    borderColor: "#4CAF50",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
  },
  amountSelectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  amountSelectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  amountBox: {
    backgroundColor: "#f0f5f5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 70, // Set a minimum width for each amount container
  },

  amountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  placeholderText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },

  modalWithdrawButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  modalWithdrawButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  closeButton: {
    textAlign: "center",
    color: "#000",
    marginTop: -10,
    fontSize: 25,
  },
});

export default WalletScreen;
