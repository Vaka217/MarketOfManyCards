import { View, FlatList, Image, Pressable, TextInput, Modal, StyleSheet, Text } from "react-native";
import SearchBar from "./SearchBar.js";
import { useState, useEffect } from "react";
import { SingleCardManager } from "./SingleCardManager.js";
import useDebounce from "../hooks/useDebounce";
import Loading from "./Loading";
import { getCardsSearchResults } from "../api/MtgAPI";

export function CardAddMenu({ showModal, setShowModal, handleContentSizeChange, updateCurrentCards, cardsToPost, setCardsToPost }) {
  const [clicked, setClicked] = useState(false);
  const [term, setTerm] = useState("");
  const debouncedSearchValue = useDebounce(term, 1000);
  const [cardsToPostKeysAsArray, setCardsToPostKeysAsArray] = useState([]);
  const [cards, setCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardDisplayArray, setCardDisplayArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debouncedSearchValue === "") {
          const filteredDict = Object.fromEntries(Object.entries(cardsToPost).filter(([key, value]) => value !== "0"));
          const keysArray = Object.keys(filteredDict);
          const fromJson = keysArray.map(jsonString => JSON.parse(jsonString));
          setCards(fromJson);
          return;
        }
        setIsLoading(true);
        const response = await getCardsSearchResults(debouncedSearchValue);
        const cardsAPI = response.map((card) => ({
          name: card.name,
          type: card.type_line,
          image: card.image_uris
            ? card.image_uris.png
            : "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest?cb=20140813141013",
          id: card.id,
          manaCost: card.mana_cost,
          text: card.oracle_text ? card.oracle_text : "No description",
          set: card.set.toUpperCase(),
        }));
        setCards(cardsAPI);
        // setIsLoading(false);
      } catch (e) {
        console.log(e);
        setError(e.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearchValue]);


  useEffect(() => {
    setCardDisplayArray(Object.entries(cardsToPost).map(([key, value]) => ([JSON.parse(key), value])));
  }, [cardsToPost]);

  const retrieveData = (key, value) => {
    setCardsToPost(prevDictionary => {
      return {
        ...prevDictionary,
        [JSON.stringify(key)]: value,
      };
    });
  };
  const renderItem = ({ item }) => {
    let savedNumber = "0";
    if (cardsToPostKeysAsArray.some(card => card.id === item.id)) {
      savedNumber = cardsToPost[JSON.stringify(item)];
    }
    return (
      <SingleCardManager
        item={item}
        handleContentSizeChange={handleContentSizeChange}
        savedNumber={savedNumber}
        sendData={retrieveData}
      />
    );
  }
  useEffect(() => {
    setCardsToPostKeysAsArray(Object.keys(cardsToPost).map((key) => JSON.parse(key)));
  }, [cardsToPost]);

  const closing = () => {
    updateCurrentCards(cardsToPost);
    setShowModal(false);
  };

  return (
    <Modal visible={showModal} animationType="slide" transparent={true} style={styles.centeredView}>
      <View style={styles.modalView} className="bg-slate-800">
        <SearchBar
          clicked={clicked}
          setClicked={setClicked}
          searchTerm={term}
          setSearchTerm={(newTerm) => setTerm(newTerm)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cards}
          contentContainerStyle={styles.container7}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          />
          <View style={{ borderRadius: 25, padding: 15, marginTop: 5, width: 150, alignItems: "center" }} className="bg-sky-700">
            <Pressable onPress={closing} style={{  }}>
              <Text className="text-slate-100">
                Close
              </Text>
            </Pressable>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container7: {
    paddingBottom: 0,
    width: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: "25%",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: "75%",
  },
});