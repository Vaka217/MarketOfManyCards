import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";

const Loading = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animationValue]);

  const translateX1 = animationValue.interpolate({
    inputRange: [0, 0.166666, 0.333333, 0.5, 0.666666, 0.833333, 1],
    outputRange: [0, 95, -20, -20, -10, -10, 0],
  });

  const translateX2 = animationValue.interpolate({
    inputRange: [0, 0.166666, 0.333333, 0.5, 0.666666, 0.833333, 1],
    outputRange: [0, 0, 10, 105, -10, -10, 0],
  });

  const translateX3 = animationValue.interpolate({
    inputRange: [0, 0.166666, 0.333333, 0.5, 0.666666, 0.833333, 1],
    outputRange: [0, 0, 10, 10, 20, 115, 0],
  });

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: -70,
      height: "100%",
    },
    hand: {
      position: "relative",
      height: 100,
    },
    card: {
      fontSize: 22,
      height: 120,
      width: 90,
      borderWidth: 2,
      borderColor: "rgb(12 74 110)",
      borderRadius: 3,
      backgroundColor: "rgb(249 115 22)",
      position: "absolute",
      top: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    card1: {
      zIndex: 3,
      marginLeft: 20,
      transform: [{ translateX: translateX1 }],
    },
    card2: {
      zIndex: 2,
      marginLeft: 10,
      transform: [{ translateX: translateX2 }],
    },
    card3: {
      zIndex: 1,
      transform: [{ translateX: translateX3 }],
    },
    span: {
      backgroundColor: "#8badc8",
      display: "none",
      margin: 0,
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    text: {
      marginBottom: 16,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 700,
      color: "rgb(12 74 110)",
      justifyContent: "center",
      alignItems: "center",
    }
  });

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.text}>Loading...</Text>
      <View style={styles.hand}>
        <Animated.View style={[styles.card, styles.card1]}>
          <View style={styles.span}></View>
        </Animated.View>
        <Animated.View style={[styles.card, styles.card2]}>
          <View style={styles.span}></View>
        </Animated.View>
        <Animated.View style={[styles.card, styles.card3]}>
          <View style={styles.span}></View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Loading;