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
    <View style={styles.container6} key={item.name} className="bg-slate-100 rounded-lg shadow-md shadow-black p-1.5">
      <Pressable style={styles.container4} onPress={() => addCard(item)}>
        <View style={styles.container4}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: item.image }} style={styles.image2} />
          </View>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <Text className="text-slate-100 bg-sky-900 rounded-lg p-1 mx-1 self-start" numberOfLines={3}>{item.name}</Text>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginRight: 50,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
          </View>
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
    flexDirection: "row",
    width: 50,
    height: 70,
    borderWidth: 1,
    padding: 1,
    flex: 1,
  },
});
