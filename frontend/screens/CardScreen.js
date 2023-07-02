import React, {useContext, useEffect, useState} from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import PostList from "../components/PostList";
import SymbologyData from "../manaDict";
import { SvgUri } from "react-native-svg";
import { Modal } from "react-native";
import axios from "axios";
import { InfoContext } from "../contexts/InfoContext";

const CardScreen = () => {
  const route = useRoute();
  const { name, mana_cost, type, set, text, card_image, card_id } = route.params;
  const symbols = mana_cost.match(/\{[^}]*\}/g);
  const maxSymbols = 4;
  const hasMoreSymbols = symbols.length > maxSymbols;
  const [expanded, setExpanded] = useState(false);
  const [salesLoading, setSalesLoading] = useState(false);
  const [auctionsLoading, setAuctionsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {setSalesCardData, setAuctionsCardData} = useContext(InfoContext);

  useEffect(() => {
    const cardSales = async () => {
      try {
        setSalesLoading(true);
        const response = await axios.get(
          `http://18.229.90.36:3000/searchsalebycard/${card_id}` 
        );
        console.log(response.data);
        setSalesCardData(response.data);
        setSalesLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const cardAuctions = async () => {
      try {
        setAuctionsLoading(true);
        const response = await axios.get(
          `http://18.229.90.36:3000/searchauctionbycard/${card_id}` 
        );
        console.log(response.data);
        setAuctionsCardData(response.data);
        setAuctionsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    cardSales();
    cardAuctions();
  }, [])

  const expandImage = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    salesLoading === true || auctionsLoading === true ? setIsLoading(true) : setIsLoading(false);
  }, [salesLoading, auctionsLoading]);

  return (
    <SafeAreaView className="flex-1 bg-sky-900">
      <Modal visible={expanded} transparent={true}>
        <Pressable
          onPress={expandImage}
          className="justify-center flex-1"
          style={{ marginBottom: 49, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <Image
            source={{ uri: card_image }}
            className="self-center w-5/6 h-full"
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
      <View
        className="w-full px-1.5 flex-row max-h-48"
        style={styles.container}
      >
        <Pressable onPress={expandImage}>
          <Image
            source={{ uri: card_image }}
            className="w-32 h-48 pl-20"
            style={{ resizeMode: "contain" }}
          />
        </Pressable>
        <View className="flex-1">
          <View className="flex-row">
            <View className="w-1/2 rounded-lg p-1.5 bg-sky-700 self-start ml-1.5 mt-1.5 justify-center flex-1">
              <Text
                className="text-sm font-bold text-slate-100 text-center"
                numberOfLines={1}
              >
                {name}
              </Text>
            </View>
            <View className="rounded-lg p-1.5 bg-sky-700 self-start ml-1.5 mt-1.5 justify-center">
              <Text className="text-sm font-bold text-slate-100 text-center">
                {set}
              </Text>
            </View>
          </View>
          <View className="flex-row">
            <View className="rounded-lg p-1.5 bg-sky-700 ml-1.5 mt-1 justify-center flex-1">
              <Text
                className="text-sm font-bold text-slate-100 text-center"
                numberOfLines={2}
              >
                {type}
              </Text>
            </View>
            <View className="rounded-lg p-1.5 bg-sky-700 ml-1 mt-1 justify-center flex-1 flex-row">
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
          <View className="rounded-lg p-1.5 mb-1.5 bg-sky-700 ml-1.5 mt-1 flex-1 justify-center">
            <Text
              numberOfLines={4}
              className="font-bold text-slate-100 text-xs"
            >
              {text}
            </Text>
          </View>
        </View>
      </View>
      <PostList isLoading={isLoading} card />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default CardScreen;
