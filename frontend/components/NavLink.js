import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavLink = ({ text, routeName }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <View className="m-4">
        <Text className="text-slate-100 underline">{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NavLink;
