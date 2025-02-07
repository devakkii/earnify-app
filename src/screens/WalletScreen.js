import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

// import AppLoading from "expo-app-loading"; // Helps to prevent UI flickering

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
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import expo-linear-gradient
import Icon from "react-native-vector-icons/FontAwesome";
import { Snackbar } from "react-native-paper";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import PopupNotification from "./PopupNotification";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Montserrat_100Thin } from "@expo-google-fonts/montserrat";

const { width } = Dimensions.get("window"); // Get the width of the device screen

const WalletScreen = ({ setActiveButton, balance, pendingReward }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [offersCompleted, setOffersCompleted] = useState(3); // Hardcoded offers completed value
  const [isWalletUnlocked, setIsWalletUnlocked] = useState(false); // Track if wallet is unlocked
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null); // State for selected amount
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null); // State for selected payment mode
  const [showUpiInput, setShowUpiInput] = useState(false);
  const [upiId, setUpiId] = useState(""); // Stores the entered UPI ID
  const [savedUpiId, setSavedUpiId] = useState(""); // Stores the verified UPI ID
  const [selectedUpi, setSelectedUpi] = useState(null); // Tracks selected UPI ID
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [verifiedUpiIds, setVerifiedUpiIds] = useState([]); // Store multiple UPI IDs
  const [modalHeight, setModalHeight] = useState(new Animated.Value(480)); // initial height of modal
  const isWithdrawable = offersCompleted >= 3; // Check both conditions
  const isDisabled = !selectedUpi || !selectedAmount; // ✅ Disable logic
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const progressAnim = useRef(new Animated.Value(0)).current; // Progress bar animation
  const [showProcessing, setShowProcessing] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const navigation = useNavigation();

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current; // Used for scaling effect

  // Adjust height dynamically
  // const handleLayout = (e) => {
  //   const { height } = e.nativeEvent.layout;
  //   // setModalHeight(new Animated.Value(height)); // Set the modal height dynamically
  // };

  // Start the countdown when withdrawal begins
  useEffect(() => {
    if (isProcessing) {
      setCountdown(5); // Reset countdown when starting
      // setShowProcessing(true); // Ensure the "Processing" UI is shown

      // Animate progress bar over 5 seconds
      Animated.timing(progressAnim, {
        toValue: 100, // Target width percentage
        duration: 5000, // 5 seconds
        useNativeDriver: false, // Required for width animation
      }).start();

      // Start countdown
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev < 1) {
            clearInterval(interval); // Stop countdown at 0
            setIsCompleted(true); // Show success screen

            // setShowProcessing(false); // Switch to final UI state
            setIsProcessing(false);
            return 0;
          }
          return prev - 1; // Decrease countdown
        });
      }, 1000); // Runs every second

      // Cleanup function to clear the interval
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleDone = () => {
    // Reset to initial state when "Done" is clicked
    setIsCompleted(false);
    setIsProcessing(false);
    setCountdown(5);
    progressAnim.setValue(0);
    setWithdrawModalVisible(false);
  };

  // Handle Withdraw Click in Modal
  const handleWithdraw = () => {
    setIsProcessing(true);
    setIsCompleted(false);

    // setShowProcessing(false); // Reset withdrawn status before starting new process

    progressAnim.setValue(0); // Reset progress before starting animation
  };

  const handleTryOfferPress = () => {
    setActiveButton("Home"); // Switch back to Home content
  };
  const handleWithdrawPress = () => {
    console.log("Withdraw pressed");
    setWithdrawModalVisible(true);
    setModalHeight(new Animated.Value(445)); // Reset the modal height to initial value
    // Trigger the opening animation for the modal (e.g., slide down or up)
    Animated.timing(slideAnim, {
      toValue: 0, // Move modal to its normal position (or top)
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closeWithdrawModal = () => {
    setIsProcessing(false);
    setIsCompleted(false);

    setSelectedPaymentMode(null); // Unselect radio button
    setShowUpiInput(false);
    setUpiId("");

    // Directly set the modal as hidden without resizing it
    setWithdrawModalVisible(false);

    // Only animate the slide effect (move the modal down)
    Animated.timing(slideAnim, {
      toValue: Dimensions.get("window").height, // Move back down
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const handlePaymentModeChange = (mode) => {
    setSelectedPaymentMode(mode);
    Animated.timing(modalHeight, {
      toValue: 534, // Expand the modal upward
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleAddUpiId = () => {
    // setShowUpiInput(true); // Show input field when button is clicked
    setShowUpiInput((prev) => !prev);

    // Animate modal height upward again when Add UPI button is clicked
    Animated.timing(modalHeight, {
      toValue: 575, // Further expand the modal
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setUpiId("");
    // Trigger layout animation when the verified UPI section becomes visible
    Animated.timing(modalHeight, {
      toValue: verifiedUpiIds ? 633 : 575, // Adjust modal height when UPI is verified
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [verifiedUpiIds]); // When verifiedUpiId changes, trigger animation

  const handleVerifyUpi = () => {
    setLoading(true); // Start loading

    setTimeout(() => {
      // Simulate verification delay
      if (upiId.includes("@")) {
        setPopupMessage(
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="check-circle"
              size={20}
              color="#4CAF50"
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: "#f2f2f2", fontSize: 14 }}>
              Verification Successful
            </Text>
          </View>
        );
        setPopupType("success");

        setVerifiedUpiIds((prevVerifiedUpis) => {
          if (!prevVerifiedUpis.includes(upiId)) {
            return [...prevVerifiedUpis, upiId]; // Add UPI only after loading
          }
          return prevVerifiedUpis;
        });

        setUpiId(""); // Clear input field after successful verification
        setShowUpiInput(false);
      } else {
        setPopupMessage(
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="exclamationcircleo"
              size={20}
              color="#ff1a1a"
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: "#f2f2f2", fontSize: 14 }}>Invalid UPI</Text>
          </View>
        );
        setPopupType("error");
      }

      setLoading(false); // Stop loading
      setPopupVisible(true);

      setTimeout(() => {
        setPopupVisible(false);
      }, 2000);
    }, 2000); // Simulating a 2s verification delay
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
        MontserratRegular: require("../../assets/Montserrat/Montserrat-Regular.ttf"),
        MontserratBold: require("../../assets/Montserrat/Montserrat-Regular.ttf"),
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
              {/* <TouchableOpacity
                onPress={() => setSnackbarVisible(true)}
                style={styles.infoButton}
              >
                <Icon name="info-circle" size={20} color="#b3b3b3" />
              </TouchableOpacity> */}
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
            style={[styles.modal, { height: modalHeight }]} // Animate the height of the modal
          >
            <View style={styles.headerRow}>
              <Text style={styles.modalHeading}>Withdraw Amount</Text>
              <TouchableOpacity onPress={closeWithdrawModal}>
                <Entypo name="cross" style={styles.closeButton} />
              </TouchableOpacity>
            </View>
            {/* Conditionally Render Light Blue Container & Withdraw Button */}
            {isProcessing ? (
              <>
                <View style={styles.processingContainer}>
                  <Text style={styles.processingText}>
                    Processing transfer in {countdown}s
                  </Text>
                  {/* Progress Bar */}
                  <View
                    style={{
                      width: 270,
                      height: 17,
                      backgroundColor: "#e0e0e0", // Grey background
                      borderRadius: 15,
                      overflow: "hidden",
                      marginTop: 50,
                      marginRight: 10,
                    }}
                  >
                    <Animated.View
                      style={{
                        width: progressAnim.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0%", "100%"], // Fill the bar progressively
                        }),
                        height: "100%",
                        backgroundColor: "#4caf50", // Green progress bar
                      }}
                    />
                  </View>
                </View>
              </>
            ) : isCompleted ? (
              // Final UI after processing
              <>
                <View style={styles.completedContainer}>
                  {/* <Image
                    source={require("../../assets/successIcon.png")}
                    style={styles.icon}
                  /> */}
                  <Text style={styles.completedHeading}>
                    Transfer Successful!
                  </Text>
                  <Text style={styles.completedSubheading}>
                    Your amount has been transferred successfully.
                  </Text>
                  <TouchableOpacity
                    onPress={handleDone}
                    style={styles.doneButton}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {/* Light Blue Background Container */}
                <ScrollView
                  style={{
                    width: "112.5%",
                    marginLeft: -20,
                    paddingHorizontal: 10,
                  }}
                  showsVerticalScrollIndicator={false} // Hide vertical scrollbar
                >
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
                            selectedPaymentMode === "bhimUPI" &&
                              styles.selectedRadio,
                          ]}
                        >
                          {selectedPaymentMode === "bhimUPI" && (
                            <View style={styles.innerCircle} />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* New UPI ID Container (Visible Only When BHIM UPI is Selected) */}
                    {selectedPaymentMode === "bhimUPI" && (
                      <View style={styles.upiContainer}>
                        <Text style={styles.upiHeading}>Select UPI ID</Text>
                        {/* Show Add UPI ID button & input only if less than 3 UPI IDs */}
                        {verifiedUpiIds.length < 3 && (
                          <>
                            {/* Add UPI ID Section */}
                            <TouchableOpacity
                              style={styles.addUpiContainer}
                              onPress={handleAddUpiId}
                            >
                              <FontAwesome
                                name={
                                  showUpiInput
                                    ? "chevron-circle-down"
                                    : "plus-circle"
                                }
                                style={styles.plusIcon}
                              />
                              <Text style={styles.addUpiText}>Add UPI ID</Text>
                            </TouchableOpacity>

                            {/* Show Input Field when button is clicked */}
                            {showUpiInput && (
                              <View style={styles.upiInputContainer}>
                                <TextInput
                                  style={styles.upiInput}
                                  placeholder="Enter UPI ID"
                                  placeholderTextColor="#b3b3b3"
                                  value={upiId}
                                  onChangeText={setUpiId}
                                />

                                {/* Loading indicator displayed while verifying */}
                                {loading && (
                                  <ActivityIndicator
                                    size="small"
                                    color="#007BFF"
                                    style={{ marginTop: 2 }}
                                  />
                                )}
                                <TouchableOpacity onPress={handleVerifyUpi}>
                                  <Text style={styles.verifyButtonText}>
                                    Verify
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}
                          </>
                        )}

                        {/* Show verified UPI ID with selection radio button */}
                        {verifiedUpiIds.length > 0 && (
                          <View style={{ marginVertical: 10 }}>
                            {verifiedUpiIds.map((upi, index) => (
                              <View
                                key={index}
                                style={{
                                  flexDirection: "row", // Align items horizontally
                                  alignItems: "center", // Align items vertically in center
                                  marginBottom: 10, // Space between each UPI entry
                                }}
                              >
                                {/* TouchableOpacity only around the radio button */}
                                <TouchableOpacity
                                  onPress={() => setSelectedUpi(upi)}
                                  activeOpacity={1} // Ensures no opacity effect when clicking
                                  style={{
                                    flexDirection: "row", // Arrange radio and text in a row
                                    alignItems: "center", // Align items vertically in center
                                    // paddingVertical: 10, // Add padding for better touch response
                                  }}
                                >
                                  {/* Radio Button */}
                                  <View
                                    style={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: 10,
                                      borderWidth: 1.5,
                                      borderColor: "#4caf50", // Border color for the radio button
                                      justifyContent: "center", // Center inner circle vertically
                                      alignItems: "center", // Center inner circle horizontally
                                      marginLeft: 10,
                                      marginRight: 10, // Space between the radio button and the text
                                    }}
                                  >
                                    {selectedUpi === upi && (
                                      <View
                                        style={{
                                          width: 12,
                                          height: 12,
                                          borderRadius: 6,
                                          backgroundColor: "#4caf50", // Inner circle color
                                        }}
                                      />
                                    )}
                                  </View>

                                  {/* UPI Text (Also Clickable) */}
                                  <Text style={{ fontSize: 16, color: "#333" }}>
                                    {upi}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    )}

                    {/* Heading for Amount Selection */}
                    <Text style={styles.amountSelectionHeading}>
                      Select Amount to be Transferred
                    </Text>

                    {/* Horizontally Scrollable Section */}
                    <ScrollView
                      horizontal
                      contentContainerStyle={styles.amountContainer}
                    >
                      {[10, 20, 30, 50, 100, 200, 300, 400, 500].map(
                        (amount) => {
                          const isEnabled = amount <= balance;
                          const isSelected = selectedAmount === amount; // Check if this amount is selected

                          return (
                            <TouchableOpacity
                              key={amount}
                              style={[
                                styles.amountBox,
                                !isEnabled && styles.disabledAmountBox, // Disable styling
                                isSelected && styles.selectedAmountBox, // Selected styling
                              ]}
                              onPress={() => {
                                if (isEnabled) {
                                  setSelectedAmount((prev) =>
                                    prev === amount ? null : amount
                                  ); // Toggle selection
                                }
                              }}
                              disabled={!isEnabled}
                            >
                              <Text
                                style={[
                                  styles.amountText,
                                  !isEnabled && styles.disabledAmountText, // Disabled text
                                  isSelected && styles.selectedAmountText, // Selected text
                                ]}
                              >
                                ₹{amount}
                              </Text>
                            </TouchableOpacity>
                          );
                        }
                      )}
                    </ScrollView>
                  </View>
                </ScrollView>
                {/* Popup Notification Just Above Withdraw Button */}
                <View>
                  <PopupNotification
                    message={popupMessage}
                    type={popupType}
                    isVisible={popupVisible}
                    onHide={() => setPopupVisible(false)}
                  />
                </View>

                {/* Fixed Withdraw Button */}
                <View style={styles.whiteContainer}>
                  {isProcessing ? (
                    <Text style={styles.processingText}>
                      Processing transfer in 5s
                    </Text>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.buttonWrapper,
                        isDisabled && styles.disabledButtonWrapper,
                        isPressed && styles.pressedButton,
                      ]}
                      onPressIn={() => setIsPressed(true)}
                      onPressOut={() => setIsPressed(false)}
                      onPress={handleWithdraw} // Updated to trigger processing state
                      disabled={isDisabled}
                      activeOpacity={0.8}
                    >
                      {!isDisabled ? (
                        <LinearGradient
                          colors={["#2ecc71", "#27ae60"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.gradientBackground}
                        >
                          <Text style={styles.buttonText}>Withdraw Amount</Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.disabledButtonText}>
                          Withdraw Amount
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
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
    width: "105%",
    marginLeft: -6.5,
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
    left: -18,
    right: -18,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "flex-end",
  },
  modal: {
    width: "100%",
    height: "55%", // Adjust height as needed
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    marginLeft: 2,
    elevation: 20,
    zIndex: 10, // Ensures it is above the footer
    overflow: "hidden", // Hide overflow content as modal expands
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
    marginBottom: 18,
    marginLeft: -6,
  },

  lightBlueContainer: {
    backgroundColor: "#f0f5ef",
    // borderRadius: 10,
    padding: 15,
    width: "112.5%",
    marginLeft: -20,
    alignItems: "flex-start",
    justifyContent: "center",
    // marginBottom: 10, // Space before the button
  },
  selectPaymentModeHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#595959",
    marginTop: 20, // Space between heading and the small container
    textAlign: "center",
    marginLeft: 8,
  },

  paymentModeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 8,
    width: "40%",
  },
  upiLogo: {
    width: 25,
    height: 25,
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
  upiContainer: {
    // backgroundColor: "#F0F0F0",
    // padding: 15,
    // borderRadius: 10,
    marginTop: 10,
  },
  upiHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 8,
    color: "#595959",
  },
  addUpiContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,

    // backgroundColor: "#E0F7FA",
  },
  plusIcon: {
    fontSize: 22,
    color: "#4caf50",
    marginRight: 10,
  },
  addUpiText: {
    fontSize: 16,
    color: "#4caf50",
    fontWeight: "bold",
  },

  amountSelectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#595959",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 8,
    textAlign: "center",
  },

  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 8,
  },

  amountBox: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#cccccc",
    borderWidth: 1,
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
  disabledAmountBox: {
    backgroundColor: "#f2f2f2", // Light gray background for disabled amounts
    opacity: 0.6, // Make it slightly faded
    borderStyle: "dashed",
  },

  disabledAmountText: {
    color: "#888", // Gray text to indicate it's disabled
  },
  selectedAmountBox: {
    borderColor: "#33ff33", // Blue border for selected amount
    borderWidth: 1,
    backgroundColor: "#e6ffe6", // Light blue background
  },

  selectedAmountText: {
    color: "#00b300", // Blue text color for selected amount
  },

  // modalWithdrawButton: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: -2,
  //   right: -2,
  //   backgroundColor: "#007bff",
  //   padding: 15,
  //   alignItems: "center",
  // },

  // modalWithdrawButtonText: {
  //   color: "#fff",
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },

  // 🔹 Independent Container at Bottom
  // 🔹 Independent Container at Bottom
  whiteContainer: {
    width: width * 1.0, // 90% of screen width (matches modal width)
    alignSelf: "center", // Ensures it's centered
    backgroundColor: "#ffffff",
    borderRadius: 20, // Curved borders
    padding: 10,
    marginRight: "4",
    paddingBottom: "25",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    marginBottom: -20, // Space from bottom
  },
  buttonWrapper: {
    width: "100%", // Ensure full width inside container
    borderRadius: 35,
    overflow: "hidden",
    marginTop: "15",
    marginRight: -2,
    // paddingBottom: "2",
  },
  gradientBackground: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "RobotoSlab-Medium",

    fontWeight: "bold",
    textAlign: "center", // Center text
    width: "100%", // Ensure it doesn't shrink
  },
  disabledButtonText: {
    color: "#aaa", // Slightly lighter gray for visibility
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "RobotoSlab-Medium",

    textAlign: "center", // Ensures text stays centered
    width: "100%", // Prevents text from shifting
  },
  disabledButtonWrapper: {
    backgroundColor: "#d3d3d3",
    alignItems: "center", // Ensure proper alignment
    justifyContent: "center",
    paddingVertical: 12, // Match normal button height
    borderRadius: 35,
  },
  pressedButton: {
    opacity: 0.8, // Adds press effect
  },
  processingContainer: {
    backgroundColor: "#f0f5ef",
    // padding: 128,
    width: "113%",
    height: "100%",
    borderRadius: 10,
    marginLeft: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  processingText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 8,
    // marginTop: 5,
    // alignItems: "center",
    // justifyContent: "center",
  },
  completedContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#f0f5ef",
  },
  completedHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  completedSubheading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  doneButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  doneButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    textAlign: "center",
    color: "#000",
    marginTop: -15,
    fontSize: 25,
  },
  upiInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1, // Border to make it look like a rectangle
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "93%",
    marginLeft: "10",
    backgroundColor: "#ffffff",
    height: 45, // Adjust as needed
  },

  upiInput: {
    flex: 1, // Takes up all available space
    height: "100%",
    fontSize: 14,
  },

  verifyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745", // Blue color for visibility
    paddingHorizontal: 10,
  },

  verifiedUpiText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default WalletScreen;
