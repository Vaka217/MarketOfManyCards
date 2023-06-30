import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MyButton from "./myButton";
import WhatsAppButton from "./WhatsAppButton";
import { Avatar } from "react-native-elements";

const Post = ({ user, card, post, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

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
      <TouchableWithoutFeedback onPress={handleVisible}>
        <View className="bg-slate-100 rounded-lg mt-3 shadow-md shadow-black p-1.5">
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
                  className="text-lg font-bold text-slate-100"
                  numberOfLines={1}
                >
                  {card.name}
                </Text>
              </View>
              <View className="flex-row flex-1">
                <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 justify-center items-center px-1">
                  <Text className="text-lg font-bold text-slate-100">
                    {post.condition}
                  </Text>
                </View>
                <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 justify-center items-center px-1">
                  <Text className="text-lg font-bold text-slate-100">
                    ${type === "Sales" ? post.price : post.actual_bid}
                  </Text>
                </View>
              </View>
              <View className="flex-row ml-1 h-10">
                <View className="justify-center flex-col items-center flex-1">
                  <TouchableWithoutFeedback onPress={handlePress}>
                    <View className="flex-row justify-between border-sky-900 border-2 rounded-lg flex-1 items-center">
                      <Text className="text-xl font-bold text-sky-900 text-center flex-1 h-full p-1">
                        {selectedValue}
                      </Text>
                      <FontAwesome
                        name="sort-down"
                        size={24}
                        color="rgb(12 74 110)"
                        style={styles.icon}
                      />
                      <Text className="text-xl font-bold text-slate-100 text-center flex-1 bg-sky-900 h-10 p-1 rounded-r-lg">
                        {post.quantity}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  {isExpanded && (
                    <View className="rounded-b-lg absolute w-full -bottom-24">
                      <FlatList
                        data={createArrayUpToQuantity(post.quantity)}
                        renderItem={({ item }) => {
                          return (
                            <Pressable onPress={() => handleValueSelect(item)}>
                              <View className="bg-sky-900 items-center">
                                <Text className="text-slate-100 text-xl font-bold text-center">
                                  {item}
                                </Text>
                              </View>
                            </Pressable>
                          );
                        }}
                        keyExtractor={(item) => item}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  )}
                </View>
                <View className="flex-1 ml-1">
                  <MyButton type={type} />
                </View>
              </View>
            </View>
          </View>
          {isVisible && (
            <View className="flex-row mt-1">
              <View className="w-24 items-center mt-1">
                <Avatar
                  rounded
                  source={{
                    uri: "https://cdn.discordapp.com/attachments/732360655658680452/1118248308213821491/ghj.png",
                  }}
                  size="large"
                  containerStyle={{ marginBottom: 16, marginTop: 10 }}
                />
                <WhatsAppButton />
              </View>
              <View className="flex-1 pl-1">
                <View className="rounded-lg bg-sky-900 mb-0.5 flex-1 justify-center items-center">
                  <Text
                    className="text-xl font-bold text-slate-100"
                    numberOfLines={1}
                  >
                    {user.nickname}
                  </Text>
                </View>
                <View className="rounded-lg bg-sky-900 p-1.5 flex-1 h-36">
                  <Text className="text-xs text-slate-100">
                    {post.description}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    textAlign: "center",
    height: "80%",
  },
});

export default Post;
