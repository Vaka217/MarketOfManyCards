//import { useEffect, useState } from '@react-navigation/native';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Modal,
  Animated,
  Alert,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context as AuthContext } from "../contexts/AuthContext";
import { InfoContext } from "../contexts/InfoContext";

export function PostButton({
  post,
  price,
  description,
  postType,
  resetEverything,
  cardQuality,
  cardQuantity,
}) {
  const { state } = useContext(AuthContext);
  const { salesData, setSalesData } = useContext(InfoContext);
  const [postCheck, setPostCheck] = useState(false);
  const showWarning = (alertTitle, alertMessage) => {
    Alert.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };
  const generatePost = () => {
    if (
      price === "" ||
      description === "" ||
      cardQuantity === "" ||
      cardQuality === "" ||
      post === ""
    ) {
      showWarning(
        "Cannot create post.",
        "Please make sure all the required fields are filled out."
      );
      return;
    }
    if (
      cardQuantity.includes("-") === true ||
      cardQuantity.includes(".") === true ||
      cardQuantity === "0"
    ) {
      showWarning("Cannot create post.", "Invalid quantity.");
      return;
    }
    let numberOfPeriods = price.split(".").length - 1;
    if (
      numberOfPeriods > 1 ||
      price.includes("-") === true ||
      price[0] === "." ||
      price.endsWith(".") === true ||
      price === "0" ||
      price.includes("-")
    ) {
      showWarning("Cannot create post.", "Invalid price.");
      return;
    }
    let saleObject = {
      price: price,
      description: description,
      quantity: parseInt(cardQuantity),
      condition: cardQuality,
      cardData: post,
      userId: state.userId,
    };

    let auctionObject = {
      actual_bid: price,
      description: description,
      quantity: parseInt(cardQuantity),
      condition: cardQuality,
      cardData: post,
      userId: state.userId,
    };
    let routeToPostTo = "";
    postType === true
      ? (routeToPostTo = "http://18.229.90.36:3000/createsales")
      : (routeToPostTo = "http://18.229.90.36:3000/createauction");
    console.log("Post content: ");
    console.log(post);
    console.log("Card Quantity: ");
    console.log(cardQuantity);
    console.log("Description: ");
    console.log(description);
    console.log("Type of Post (Sale/Auction): ");
    console.log("Seller id:");
    console.log(state.userId);
    postType === true ? console.log("Sale") : console.log("Auction");
    postType === true ? console.log("Price: ") : console.log("Base price: ");
    console.log(price);
    console.log("Card quality: ");
    console.log(cardQuality);
    setPostCheck(!postCheck);
    postType === true
      ? createPost(saleObject, routeToPostTo)
      : createPost(auctionObject, routeToPostTo);
    showWarning("Posted!", "Your post has been succesfully created.");
  };
  const createPost = async (
    { price, description, quantity, condition, cardData, userId, actual_bid },
    routeToPostTo
  ) => {
    try {
      const response = await axios.post(routeToPostTo, {
        price,
        description,
        quantity,
        condition,
        cardData,
        userId,
        actual_bid,
      });
      const newPost = response.data;
      console.log("Success: ", newPost);
      setSalesData([...salesData, newPost]);
      return newPost;
    } catch (error) {
      console.log(postType);
      console.error("Error: ", error.response.data);
    }
  };

  useEffect(() => {
    resetEverything();
  }, [postCheck]);
  return (
    <View>
      <Pressable
        onPress={generatePost}
        style={styles.button}
        className="bg-orange-500"
      >
        <Text style={styles.text} className="text-slate-100 font-bold text-lg">
          Post
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgb(249, 115, 22)",
  },
});
