import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button } from "react-native-elements";

const MyComponent = ({ item }) => {
  return (
    <View className="bg-slate-100 rounded-lg mt-3 shadow-md shadow-black p-1.5 mx-3 justify-center">
      <Text
        className="text-base font-bold text-sky-900 text-center"
        numberOfLines={3}
      >
        {item.buyer} open a chat with you for {item.quantity} {item.condition}{" "}
        {item.card} for ${item.price}.
      </Text>
      <View className="flex-row">
        <Button
          title="Confirm purchase"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgb(249 115 22)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 24 }}
          containerStyle={{
            height: 50,
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => {
            console.log("juas");
          }}
        />
        <Button
          title="Cancel"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgb(220 38 38)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 24 }}
          containerStyle={{
            height: 50,
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => {
            console.log("juas");
          }}
        />
      </View>
    </View>
  );
};

const Confirmation = () => {
  const [data, setData] = useState([
    {
      id: "1",
      buyer: "Pedro",
      condition: "Near-Mind",
      quantity: 3,
      price: "20",
      card: "Llanowar Elves",
    },
    {
      id: "2",
      buyer: "Juana",
      condition: "Near-Mind",
      quantity: 4,
      price: "200",
      card: "Lightning Bolt",
    },
    {
      id: "3",
      buyer: "Luis",
      condition: "Near-Mind",
      quantity: 50,
      price: "7",
      card: "Eidolon of Countless Battles",
    },
    // Add more items as needed
  ]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MyComponent item={item} />}
    />
  );
};

export default Confirmation;
