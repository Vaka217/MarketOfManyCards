import React, { useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardSearch = ({ name, manaCost, type, set, text, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const selectedAim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Animated.sequence([
          Animated.timing(selectedAim, {
            toValue: 1.05,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(selectedAim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => setIsPressed((prev) => !prev));
        setTimeout(() => {
          navigation.navigate("Card");
        }, 350);
      }}
    >
      <Animated.View
        className={"w-full px-4"}
        style={[{ transform: [{ scale: selectedAim }] }]}
      >
        <View className="w-full bg-slate-100 rounded-lg px-1.5 flex-row mb-3 shadow-md shadow-black">
          <Image
            source={{ uri: image }}
            className="w-32 h-48 pl-20"
            style={{ resizeMode: "contain" }}
          />
          <View className="flex-1">
            <View className="flex-row">
              <View className="w-1/2 rounded-lg p-1.5 mb-0.5 bg-sky-900 self-start ml-1.5 mt-1.5 justify-center flex-1">
                <Text className="text-xs font-bold text-slate-100 text-center">
                  {name}
                </Text>
              </View>
              <View className="rounded-lg p-1.5 mb-0.5 bg-sky-900 self-start ml-1.5 mt-1.5 justify-center">
                <Text className="text-xs font-bold text-slate-100 text-center">
                  {set}
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="rounded-lg p-1.5 mb-0.5 bg-sky-900 ml-1.5 mt-1.5 justify-center flex-1">
                <Text className="text-xs font-bold text-slate-100 text-center">
                  {type}
                </Text>
              </View>
              <View className="rounded-lg p-1.5 mb-0.5 bg-sky-900 ml-1.5 mt-1.5 justify-center flex-1">
                <Text className="text-xs font-bold text-slate-100 text-center">
                  {manaCost}
                </Text>
              </View>
            </View>
            <View className="rounded-lg p-1.5 mb-1.5 bg-sky-900 ml-1.5 mt-1.5 flex-1 justify-center">
              <Text
                numberOfLines={5}
                className="font-bold text-slate-100 text-xs"
              >
                {text}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CardSearch;
