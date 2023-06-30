import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { getCardsSearchResults } from "../api/MtgAPI";
import CardSearch from "./CardSearch";
import Loading from "./Loading";
import marketAPI from "../api/MarketAPI";

const CardList = ({ searchTerm, content }) => {
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
        console.log(filteredCards);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (searchTerm === "") {
  //         setCards([]);
  //         return;
  //       }
  //       setIsLoading(true);
  //       const response = await getCardsSearchResults(searchTerm);
  //       const cardsAPI = response.map((card) => ({
  //         name: card.name,
  //         type: card.type_line,
  //         image: card.image_uris
  //           ? card.image_uris.png
  //           : "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest?cb=20140813141013",
  //         id: card.id,
  //         manaCost: card.mana_cost,
  //         text: card.oracle_text ? card.oracle_text : "No description",
  //         set: card.set.toUpperCase(),
  //       }));
  //       setCards(cardsAPI);
  //       console.log(cardsAPI);
  //       setIsLoading(false);
  //     } catch (e) {
  //       console.log(e);
  //       setError(e.message);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [searchTerm]);

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
