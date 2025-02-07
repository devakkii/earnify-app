import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const PopupNotification = ({ message, type, isVisible, onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Show the popup
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300, // Smooth fade-in effect
        useNativeDriver: true,
      }).start();

      // Auto-hide after 2 seconds
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300, // Smooth fade-out effect
          useNativeDriver: true,
        }).start(() => onHide());
      }, 2000);
    }
  }, [isVisible]);

  if (!isVisible) return null; // Don't render if not visible

  return (
    <Animated.View style={[styles.popupContainer, { opacity }]}>
      <Text
        style={[
          styles.popupText,
          type === "success" ? styles.success : styles.error,
        ]}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    bottom: 11, // Stay just above Withdraw button
    alignSelf: "center", // Auto-center horizontally
    backgroundColor: "#808080",
    padding: 12,
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  popupText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  success: {
    color: "#2ecc71", // Green for success
  },
  error: {
    color: "#e74c3c", // Red for error
  },
});

export default PopupNotification;
