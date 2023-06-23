import React, { useEffect, useState, useContext } from "react";

import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Sale from "./Sale";
import Auction from "./Auction";
import axios from "axios";

 const posts = async () => {
   try {
     const response = await axios.get('http://18.229.90.36:3000/searchsales');
     const salesData = response.data;

     return salesData
   } catch (error) {
     console.log(error);
   }
 }

/*const posteados = [
  {
    id: "1",
    pic: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    name: "Pedro",
    condition: "Near-Mind",
    quantity: 3,
    price: "20",
    card: "Llanowar Elves",
    profile:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
  },
  {
    id: "2",
    pic: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    name: "Juana",
    condition: "Near-Mind",
    profile:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    quantity: 4,
    price: "200",
    card: "Lightning Bolt",
  },
  {
    id: "3",
    pic: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    name: "Luis",
    condition: "Near-Mind",
    profile:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    quantity: 50,
    price: "7",
    card: "Eidolon of Countless Battles",
  },
  {
    id: "4",
    pic: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    name: "Pedro",
    condition: "Near-Mind",
    profile:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    quantity: 3,
    price: "20",
    card: "Llanowar Elves",
  },
  {
    id: "5",
    pic: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    name: "Juana",
    condition: "Near-Mind",
    quantity: 4,
    price: "200",
    card: "Lightning Bolt",
    profile:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: "6",
    pic: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    name: "Luis",
    condition: "Near-Mind",
    quantity: 50,
    price: "7",
    card: "Eidolon of Countless Battles",
    profile:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
  },
];*/

const PostList = () => {
  const [isAuctionsPressed, setIsAuctionsPressed] = useState(false);
  const [posteados, setPosteados] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
      const data = await posts();

      setPosteados(data);
    };

    fetchData();
  }, []);

  console.log(posteados);
  return (
    <>
      <View className="flex-row">
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAuctionsPressed(false);
          }}
        >
          <View
            className={`h-10 flex-1 items-center justify-center ${
              isAuctionsPressed ? "bg-sky-900" : "bg-sky-700"
            }`}
          >
            <Text className="text-slate-100 text-lg font-bold">Sales</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAuctionsPressed(true);
          }}
        >
          <View
            className={`h-10 flex-1 items-center justify-center ${
              isAuctionsPressed ? "bg-sky-700" : "bg-sky-900"
            }`}
          >
            <Text className="text-slate-100 text-lg font-bold">Auctions</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        data={posteados}
        renderItem={({ item }) => {
          if (isAuctionsPressed) {
            return <Auction {...item} />;
          } else {
            return <Sale {...item} />;
          }
        }}
        keyExtractor={(item) => item.id}
        className="bg-sky-700"
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default PostList;
