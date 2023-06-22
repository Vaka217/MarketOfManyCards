//import { useEffect, useState } from '@react-navigation/native';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";

export function PostButton({ post, price, description, postType, resetEverything, cardQuality, cardQuantity }) {
  const [postCheck, setPostCheck] = useState(false);
  const generatePost = () => {
    let postObject = {"price": price, "description": description, "quantity": parseInt(cardQuantity), "condition": cardQuality, "cardData": post};
    console.log('Post content: ');
    console.log(post);
    console.log('Card Quantity: ');
    console.log(cardQuantity);
    console.log('Description: ');
    console.log(description);
    console.log('Type of Post (Sale/Auction): ');
    postType === true ? console.log("Sale") : console.log("Auction");
    postType === true ? console.log('Price: ') : console.log('Base price: ');
    console.log(price);
    console.log('Card quality: ');
    console.log(cardQuality);
    setPostCheck(!postCheck);
    axios.post('/createsales/:id/', JSON.stringify(postObject)).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(JSON.stringify(postObject));
  };
  useEffect(() => {
    resetEverything();
  }, [postCheck]);
  return (
    <View>
      <Pressable onPress={generatePost} style={styles.button} className="bg-orange-500">
        <Text style= {styles.text} className="text-slate-100 font-mono">
          Post
        </Text>
      </Pressable>
    </View>
  );
};

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