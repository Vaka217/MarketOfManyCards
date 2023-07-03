import React, { useState, useContext } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import Post from "./Post";
import { InfoContext } from "../contexts/InfoContext";
import { HomeSkeleton } from "./HomeSkeleton";

const PostList = ({ isLoading, card }) => {
  const [isAuctionsPressed, setIsAuctionsPressed] = useState(false);
  const { salesData, auctionsData, salesCardData, auctionsCardData } = useContext(InfoContext);
  const sales = card ? salesCardData : salesData;
  const auctions = card ? auctionsCardData : auctionsData;

  return (
    <>
      <View className="flex-row">
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAuctionsPressed(false);
          }}
        >
          <View
            className={`h-10 flex-1 items-center justify-center ${
              isAuctionsPressed ? "bg-sky-900" : "bg-sky-700"
            }`}
          >
            <Text className="text-slate-100 text-lg font-bold">Sales</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAuctionsPressed(true);
          }}
        >
          <View
            className={`h-10 flex-1 items-center justify-center ${
              isAuctionsPressed ? "bg-sky-700" : "bg-sky-900"
            }`}
          >
            <Text className="text-slate-100 text-lg font-bold">Auctions</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      { isLoading === false ? (
        <FlatList
          data={isAuctionsPressed ? auctions : sales}
          renderItem={({ item }) => {
            if (isAuctionsPressed) {
              return <Post {...item} type="Auctions" />;
            } else {
              return <Post {...item} type="Sales" />;
            }
          }}
          keyExtractor={(item) => item.post.id}
          className="bg-sky-700"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeSkeleton chosenColor={"rgb(3, 105, 161)"} cardHeight={110} textHeight={30} textWidth={225}/>
        </ScrollView>
      )}
    </>
  );
};

export default PostList;
