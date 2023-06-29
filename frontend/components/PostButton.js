//import { useEffect, useState } from '@react-navigation/native';
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context as AuthContext } from "../contexts/AuthContext";

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
  const [postCheck, setPostCheck] = useState(false);
  const generatePost = () => {
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
    postType === true ? routeToPostTo = "http://18.229.90.36:3000/createsales" : routeToPostTo = "http://18.229.90.36:3000/createauction"
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
    postType === true ? createPost(saleObject, routeToPostTo) : createPost(auctionObject, routeToPostTo);
  };
  const createPost = async ({
    price,
    description,
    quantity,
    condition,
    cardData,
    userId,
  }, routeToPostTo) => {
    try {
      const response = await axios.post(
        routeToPostTo,
        {
          price,
          description,
          quantity,
          condition,
          cardData,
          userId,
        }
      );
      const newPost = response.data;
      console.log("Funciona lol: ", newPost);
      return newPost;
    } catch (error) {
      console.error("Error lol: ", error.response.data);
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
        <Text style={styles.text} className="text-slate-100 font-mono">
          Post
        </Text>
      </Pressable>
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
