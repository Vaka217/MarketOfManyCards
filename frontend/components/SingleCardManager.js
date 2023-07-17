import {
  View,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { useState, useEffect } from "react";

export function SingleCardManager({ item, handleContentSizeChange, addCard }) {
  return (
    <View
      style={styles.container6}
      key={item.name}
      className="bg-slate-100 rounded-lg shadow-md shadow-black p-1.5"
    >
      <Pressable style={styles.container4} onPress={() => addCard(item)}>
        <Image
          source={{ uri: item.image }}
          style={styles.image2}
          resizeMode="stretch"
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text
            className="text-sky-900 font-semibold text-lg"
            numberOfLines={3}
          >
            {item.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container6: {
    marginTop: 5,
    marginBottom: 5,
  },
  container4: {
    flexDirection: "row",
    paddingLeft: 0,
    alignItems: "center",
    flex: 1,
  },
  image2: {
    width: 50,
    height: 70,
    padding: 1,
  },
});
