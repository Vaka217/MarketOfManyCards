import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import data from "./TestDB.js";

export function CardDisplay({ filter }) {
  const filteredCards = data.filter((card) =>
    card.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={filteredCards}
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.description}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 140,
    borderWidth: 1,
  },
  text: {
    flex: 1,
    paddingLeft: 5,
  },
});
