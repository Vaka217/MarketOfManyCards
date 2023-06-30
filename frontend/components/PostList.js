import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Post from "./Post";

const PostList = ({ sales, auctions }) => {
  const [isAuctionsPressed, setIsAuctionsPressed] = useState(false);

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
    </>
  );
};

export default PostList;
