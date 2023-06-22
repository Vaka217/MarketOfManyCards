import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Button,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Sale = ({ name, pic, condition, quantity, price, card }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const handleValueSelect = (value) => {
    setSelectedValue(value);
    setIsExpanded(false);
  };

  const createArrayUpToQuantity = (quantity) => {
    return Array.from({ length: quantity + 1 }, (_, index) => index);
  };

  return (
    <View className="px-3 w-full">
      <View className="bg-slate-100 rounded-lg mt-3 shadow-md shadow-black p-1.5 flex-1 h-24 flex-row">
        <Image
          source={{ uri: pic }}
          className="w-20 h-20 rounded-full"
        />
        <View className="flex-1 ml-1">
          <View className="rounded-lg mb-0.5 bg-sky-900 ml-1 flex-1 items-center justify-center">
            <Text
              className="text-xs font-bold text-slate-100"
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>
          <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 items-center justify-center">
            <Text
              className="text-xs font-bold text-slate-100"
              numberOfLines={1}
            >
              {card}
            </Text>
          </View>
          <View className="flex-row flex ml-1">
            <View className="justify-center flex-col w-3/6 items-center">
              <Text className="text-xs font-bold text-slate-100 rounded-lg bg-sky-900 w-full text-center mb-0.5">
                {condition}
              </Text>
              <TouchableWithoutFeedback onPress={handlePress}>
                <View className="flex-row justify-between border-sky-900 border-2 rounded-lg">
                  <Text className="text-lg font-bold text-sky-900 text-center flex-1">
                    {selectedValue}
                  </Text>
                  <FontAwesome
                    name="sort-down"
                    size={24}
                    color="rgb(12 74 110)"
                    style={styles.icon}
                  />
                  <Text className="text-lg font-bold text-slate-100 text-center flex-1 bg-sky-900 rounded-lg">
                    {quantity}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {isExpanded && (
                <View className="bg-slate-700 rounded-b-lg fixed">
                  <FlatList
                    data={createArrayUpToQuantity(quantity)}
                    renderItem={({ item }) => {
                      return (
                        <TouchableWithoutFeedback
                          onPress={() => handleValueSelect(item)}
                        >
                          <View className="bg-sky-900 w-28 items-center">
                            <Text className="text-slate-100 text-lg font-bold text-center">
                              {item}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    }}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              )}
            </View>
            <View className="px-2 text-center flex-1 justify-end">
              <TouchableHighlight
                className="bg-orange-500 flex-1 items-center justify-center rounded-lg"
                underlayColor="white"
              >
                <Text className="text-2xl font-bold text-slate-100">BUY</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    textAlign: "center",
  },
});

export default Sale;
