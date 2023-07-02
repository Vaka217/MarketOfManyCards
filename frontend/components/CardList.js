import React, { useState, useEffect, useContext } from "react";
import { FlatList, Text, View } from "react-native";
import CardSearch from "./CardSearch";
import Loading from "./Loading";
import { InfoContext } from "../contexts/InfoContext";

const CardList = ({ searchTerm }) => {
  const {cardsData: content} = useContext(InfoContext);
  const [searchCards, setSearchCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm === "") {
          setSearchCards([]);
          return;
        }
        setIsLoading(true);
        const filteredCards = content.filter((card) => {
          const cardName = card.name.toLowerCase();
          const cardSearch = searchTerm.toLowerCase();
          return cardName.includes(cardSearch);
        });
        setSearchCards(filteredCards);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setError(e.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  } else {
    return (
      <>
        <FlatList
          data={searchCards}
          renderItem={({ item }) => <CardSearch {...item} />}
          keyExtractor={(item) => item.card_id}
          showsVerticalScrollIndicator={false}
        />
      </>
    );
  }
};

export default CardList;
