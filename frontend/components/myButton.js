import React, { useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";

const MyButton = ({ type, setIsBuying, isBuying }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setIsBuying(!isBuying);
  };

  const buttonScale = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[buttonScale]}
        className="justify-center items-center bg-orange-500 rounded-lg py-1 h-full"
      >
        <Text className="text-lg font-bold text-slate-100">
          {type == "Sales" ? "BUY" : "BID"}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default MyButton;
