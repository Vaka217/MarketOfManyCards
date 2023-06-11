import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({ searchTerm, clicked, setSearchTerm, setClicked }) => {
  return (
    <>
      <View style={styles.container}>
        <FontAwesome
          name="search"
          size={20}
          style={{
            marginHorizontal: 10,
            alignSelf: "center",
            color: "rgb(12 74 110)",
          }}
        />
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCorrect={false}
          placeholder="Search your wanted card!"
          style={{ flex: 1 }}
          onFocus={() => {
            setClicked(true);
          }}
          onBlur={() => {
            setClicked(false);
          }}
        />
        {clicked && (
          <FontAwesome
            name="close"
            size={20}
            color="black"
            style={{ padding: 10 }}
            onPress={() => {
              setSearchTerm("");
            }}
          />
        )}
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(241 245 249)",
    height: 40,
    borderRadius: 8,
    marginHorizontal: 12,
    flexDirection: "row",
    marginTop: 35,
    marginBottom: 12,
  },
});