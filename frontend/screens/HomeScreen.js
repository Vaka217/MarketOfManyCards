import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  Image,
  View,
  BackHandler,
  StatusBar,
} from "react-native";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import CardList from "../components/CardList";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { InfoContext } from "../contexts/InfoContext";

const HomeScreen = () => {
  const [term, setTerm] = useState("");
  const [clicked, setClicked] = useState(false);
  const { setSalesData, setAuctionsData, setCardsData } = useContext(InfoContext);
  const [salesLoading, setSalesLoading] = useState(false);
  const [auctionsLoading, setAuctionsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchValue = useDebounce(term, 1000);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setSalesLoading(true);
        const response = await axios.get(
          "http://18.229.90.36:3000/searchsales"
        );
        const salesData = response.data;
        setSalesData(salesData);
        setSalesLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAuctionsData = async () => {
      try {
        setAuctionsLoading(true);
        const response = await axios.get(
          "http://18.229.90.36:3000/searchauctions"
        );
        const auctionsData = response.data;
        setAuctionsData(auctionsData);
        setAuctionsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCardsData = async () => {
      try {
        const response = await axios.get(
          "http://18.229.90.36:3000/searchcards"
        );
        const cardsData = response.data;
        setCardsData(cardsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSalesData();
    fetchAuctionsData();
    fetchCardsData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    salesLoading === true || auctionsLoading == true ? setIsLoading(true) : setIsLoading(false);
  }, [salesLoading, auctionsLoading]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-sky-900 dark:bg-sky-950">
      <View
        className="flex-row items-center mx-3 mb-3"
        style={{
          marginTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 4 : 4,
        }}
      >
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
        <PostList isLoading={isLoading} />
      ) : (
        <CardList searchTerm={debouncedSearchValue} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
