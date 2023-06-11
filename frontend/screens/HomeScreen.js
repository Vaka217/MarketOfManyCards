import { View, StatusBar, ScrollView } from "react-native";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { CardDisplay } from "../components/Cards";

export function HomeScreen() {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <ScrollView>
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <SearchBar
          clicked={clicked}
          setClicked={setClicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        <CardDisplay filter={searchPhrase} />
      </View>
    </ScrollView>
  );
}
