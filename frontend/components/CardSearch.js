import React, { useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SymbologyData from "../manaDict";
import { SvgUri } from "react-native-svg";

const CardSearch = ({ name, mana_cost, type, set, text, card_image, card_id }) => {
  const [isPressed, setIsPressed] = useState(false);
  const selectedAim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const symbols = mana_cost.match(/\{[^}]*\}/g);
  const maxSymbols = 4;
  const hasMoreSymbols = symbols.length > maxSymbols;

  console.log(symbols.slice(0, maxSymbols));

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
          navigation.navigate("Card", {
            name,
            mana_cost,
            type,
            set,
            text,
            card_image,
            card_id,
          });
        }, 350);
      }}
    >
      <Animated.View
        className={"w-full px-4"}
        style={[{ transform: [{ scale: selectedAim }] }]}
      >
        <View className="w-full bg-slate-100 rounded-lg px-1.5 flex-row mb-3 shadow-md shadow-black max-h-48">
          <Image
            source={{ uri: card_image }}
            className="w-32 h-48 pl-20"
            style={{ resizeMode: "contain" }}
          />
          <View className="flex-1">
            <View className="flex-row">
              <View className="w-1/2 rounded-lg p-1.5 bg-sky-900 self-start ml-1.5 mt-1.5 justify-center flex-1">
                <Text
                  className="text-sm font-bold text-slate-100 text-center"
                  numberOfLines={1}
                >
                  {name}
                </Text>
              </View>
              <View className="rounded-lg p-1.5 bg-sky-900 self-start ml-1.5 mt-1.5 justify-center">
                <Text className="text-sm font-bold text-slate-100 text-center">
                  {set}
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="rounded-lg p-1.5 bg-sky-900 ml-1.5 mt-1 justify-center flex-1">
                <Text
                  className="text-sm font-bold text-slate-100 text-center"
                  numberOfLines={2}
                >
                  {type}
                </Text>
              </View>
              <View className="rounded-lg p-1.5 bg-sky-900 ml-1 mt-1 justify-center flex-1 flex-row">
                {symbols.slice(0, maxSymbols).map((symbol, index) => (
                  <SvgUri
                    key={index}
                    uri={SymbologyData[symbol] || null}
                    style={{
                      height: "100%",
                      width: `${75 / maxSymbols}%`,
                      marginLeft: index !== 0 ? 3 : 0,
                    }}
                  />
                ))}
                {hasMoreSymbols && (
                  <Text
                    style={{
                      alignSelf: "center",
                      marginLeft: 3,
                      color: "rgb(241 245 249)",
                    }}
                  >
                    ...
                  </Text>
                )}
              </View>
            </View>
            <View className="rounded-lg p-1.5 mb-1.5 bg-sky-900 ml-1.5 mt-1 flex-1 justify-center">
              <Text
                numberOfLines={4}
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
