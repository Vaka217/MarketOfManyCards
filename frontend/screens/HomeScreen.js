import React, { useState } from "react";
import { SafeAreaView, Image, View } from "react-native";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import CardList from "../components/CardList";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import marketAPI from "../api/MarketAPI";

const posts = async () => {
  try {
    const response = await axios.get("http://18.229.90.36:3000/searchsales");
    const salesData = response.data;
    return salesData;
  } catch (error) {
    console.log(error);
  }
};

const cards = async () => {
  try {
    const response = await axios.get("http://18.229.90.36:3000/searchcards");
    const cardsData = response.data;
    return cardsData;
  } catch (error) {
    console.log(error);
  }
};

const HomeScreen = () => {
  const [term, setTerm] = useState("");
  const [clicked, setClicked] = useState(false);

  const debouncedSearchValue = useDebounce(term, 1000);

  return (
    <SafeAreaView className="flex-1 bg-sky-900 dark:bg-sky-950">
      <View className="flex-row items-center mx-3 mt-9 mb-3">
        <Image
          source={require("../assets/WhiteLogo.png")}
          className="mr-3 h-11 w-10"
        />
        <SearchBar
          searchTerm={term}
          setSearchTerm={(newTerm) => setTerm(newTerm)}
          clicked={clicked}
          setClicked={setClicked}
        />
      </View>
      {term === "" ? (
        <PostList content={posts} />
      ) : (
        <CardList searchTerm={debouncedSearchValue} content={cards} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
