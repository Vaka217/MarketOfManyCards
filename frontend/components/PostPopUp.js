import { Pressable, Text, View, StyleSheet, Modal, Animated } from "react-native";
import { useState, useEffect, useContext } from "react";

export function PostPopUp({ textToDisplay, showMessage, setShowMessage }) {
  return (
    <View>
        <Modal animationType="none" transparent={true}>
            <Text>
                {textToDisplay}
            </Text>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    color: "#DEDEDE",
  },
  button: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgb(249, 115, 22)",
  },
});
