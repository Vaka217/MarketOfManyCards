import React, { useState } from "react";
import { SafeAreaView, Image, View } from "react-native";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import CardList from "../components/CardList";
import useDebounce from "../hooks/useDebounce";

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
        <PostList />
      ) : (
        <CardList searchTerm={debouncedSearchValue} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
