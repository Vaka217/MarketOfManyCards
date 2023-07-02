import React, { useState, useContext } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import { InfoContext } from "../contexts/InfoContext";

const EditPostForm = ({ isModal, toggleModal, postData }) => {
  const [price, setPrice] = useState(postData.price ? postData.price : postData.actual_bid);
  const [quantity, setQuantity] = useState(String(postData.quantity));
  const [description, setDescription] = useState(postData.description);
  const [condition, setCondition] = useState(postData.condition);
  const { setSalesUserData, setAuctionsUserData, salesUserData, auctionsUserData } = useContext(InfoContext);

  const handleUpdate = async () => {
    try {
        if (postData.quantity) { 
            const response = await axios.put("http://18.229.90.36:3000/updatesale", {
              price: price,
              quantity: quantity,
              description: description,
              condition: condition,
              saleId: postData.id,
            });
        } else {
            auctionId, actual_bid, description, quantity, cardData, condition, userId
            const response = await axios.put("http://18.229.90.36:3000/updateauction", {
              actual_bid: price,
              quantity: quantity,
              description: description,
              condition: condition,
              auctionId: postData.id,
            });
        }
      console.log("Post updated successfully");
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="justify-center flex-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <View className="bg-sky-900 p-2 m-8 rounded-lg items-center">
        <TouchableWithoutFeedback onPress={() => toggleModal(!isModal)}>
          <FontAwesome name="close" size={24} color="white" style={{ alignSelf: "flex-end" }} />
        </TouchableWithoutFeedback>
        <Input
          label={postData.price ? "Price" : "Base Bid"}
          value={price}
          onChangeText={setPrice}
          autoCapitalize="none"
          autoCorrect={false}
          labelStyle={styles.label}
          inputStyle={styles.label}
          keyboardType="numeric"
        />
        <Input
          label="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          autoCapitalize="none"
          autoCorrect={false}
          labelStyle={styles.label}
          inputStyle={styles.label}
          keyboardType="numeric"
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
          autoCorrect={false}
          labelStyle={styles.label}
          inputStyle={styles.label}
        />
        <Input
          label="Condition"
          value={condition}
          onChangeText={setCondition}
          autoCapitalize="none"
          autoCorrect={false}
          labelStyle={styles.label}
          inputStyle={styles.label}
        />
        <Button
          title="Confirm"
          buttonStyle={{
            backgroundColor: "rgb(249 115 22)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          containerStyle={{
            height: 45,
            width: 200,
          }}
          onPress={handleUpdate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "rgb(241 245 249)",
  },
});

export default EditPostForm;
