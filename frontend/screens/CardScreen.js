import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import PostList from "../components/PostList";

const CardScreen = () => {
  const route = useRoute();
  const { name, manaCost, type, set, text, image } = route.params;

  return (
    <View className="flex-1">
      <View className="w-full bg-slate-100 px-1.5 flex-row shadow-md shadow-black">
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
      <View>
        <PostList filter={name} />
      </View>
    </View>
  );
};

export default CardScreen;
