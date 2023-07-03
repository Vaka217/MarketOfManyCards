import React, { useState } from "react";
import { View, Text, Image } from "react-native";

const Bid = ({ post, card, user, bid}) => {
  return (
    <View className="bg-slate-100 rounded-lg mt-3 shadow-md shadow-black p-1.5 mx-3 justify-center">
        <View className="flex-row">
            <View className="h-32 w-24">
              <Image
                source={{ uri: card.image }}
                className="h-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 justify-center items-center px-1">
                <Text
                  className="font-bold text-slate-100 text-base"
                  numberOfLines={5}
                >
                  You have made a ${bid.amount} bid for x{post.quantity} {card.name} in an auction made by {user.nickname}
                </Text>
              </View>
            </View>
        </View>
    </View>
  );
};

export default Bid;