import {
  View,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Modal,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";
import SearchBar from "./SearchBar.js";
import { useState, useEffect } from "react";
import { SingleCardManager } from "./SingleCardManager.js";
import useDebounce from "../hooks/useDebounce.js";
import Loading from "./Loading.js";
import { getCardsSearchResults } from "../api/MtgAPI.js";
import { HomeSkeleton } from "../components/HomeSkeleton";

export function CardAddMenu({
  showModal,
  setShowModal,
  handleContentSizeChange,
  currentCard,
  setCurrentCard,
}) {
  const [clicked, setClicked] = useState(false);
  const [term, setTerm] = useState("");
  const debouncedSearchValue = useDebounce(term, 1000);
  const [cards, setCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardDisplayArray, setCardDisplayArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setError(e.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearchValue]);

  const renderItem = ({ item }) => {
    return (
      <SingleCardManager
        item={item}
        handleContentSizeChange={handleContentSizeChange}
        addCard={addCard}
      />
    );
  };

  const addCard = (item) => {
    console.log(item);
    setCurrentCard(JSON.stringify(item));
  };

  const closing = () => {
    setShowModal(false);
  };

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      style={styles.centeredView}
    >
      <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <View style={styles.modalView} className="bg-sky-900">
        <View className="flex-row m-1">
          <SearchBar
            clicked={clicked}
            setClicked={setClicked}
            searchTerm={term}
            setSearchTerm={(newTerm) => setTerm(newTerm)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
        {isLoading === false ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cards}
          contentContainerStyle={styles.container7}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
          <HomeSkeleton chosenColor={"rgb(12, 74, 110)"} cardHeight={110} textWidth={150} textHeight={30}/>
          </ScrollView>
        )}
        </View>
          <Pressable onPress={closing} className="items-center justify-center mt-5" style={{ borderRadius: 20, width: "35%", backgroundColor: 'rgb(249, 115, 22)', aspectRatio: 2}}>
            <Text className="text-slate-100">Close</Text>
          </Pressable>
      </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container7: {
    width: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: "25%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: "75%",
    justifyContent: "center"
  },
});
