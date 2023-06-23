import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({ searchTerm, clicked, setSearchTerm, setClicked }) => {
  return (
      <View style={styles.inputContainer} className="flex-1 flex-row items-center bg-slate-100 h-11 rounded-lg">
        <FontAwesome
          name="search"
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCorrect={false}
          placeholder="Search your wanted card!"
          className="flex-1"
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
            style={styles.closeIcon}
            onPress={() => {
              setSearchTerm("");
            }}
          />
        )}
      </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchIcon: {
    marginHorizontal: 10,
    alignSelf: "center",
    color: "rgb(12 74 110)",
  },
  closeIcon: {
    padding: 10,
  },
});
