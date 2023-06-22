import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Sale from "./Sale";
import Auction from "./Auction";

const posts = [
  {
    id: "1",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Pedro",
    condition: "Near-Mint",
    quantity: 3,
    price: "20",
    card: "Llanowar Elves",
  },
  {
    id: "2",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Juana",
    condition: "Near-Mint",
    quantity: 4,
    price: "200",
    card: "Lightning Bolt",
  },
  {
    id: "3",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Luis",
    condition: "Near-Mint",
    quantity: 50,
    price: "7",
    card: "Eidolon of Countless Battles",
  },
  {
    id: "4",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Pedro",
    condition: "Near-Mint",
    quantity: 3,
    price: "20",
    card: "Llanowar Elves",
  },
  {
    id: "5",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Juana",
    condition: "Near-Mint",
    quantity: 4,
    price: "200",
    card: "Lightning Bolt",
  },
  {
    id: "6",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Luis",
    condition: "Near-Mint",
    quantity: 50,
    price: "7",
    card: "Eidolon of Countless Battles",
  },
  {
    id: "7",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Pedro",
    condition: "Near-Mint",
    quantity: 3,
    price: "20",
    card: "Llanowar Elves",
  },
  {
    id: "8",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Juana",
    condition: "Near-Mint",
    quantity: 4,
    price: "200",
    card: "Lightning Bolt",
  },
  {
    id: "9",
    pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Luis",
    condition: "Near-Mint",
    quantity: 50,
    price: "7",
    card: "Eidolon of Countless Battles",
  },
];

const PostList = ({ filter }) => {
  const [isAuctionsPressed, setIsAuctionsPressed] = useState(false);

  let filteredPosts = posts;

  if (filter) {
    filteredPosts = posts.filter(post => post.card === filter);
  }
  return (
    <>
      <View className="flex-row mx-3">
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAuctionsPressed(false);
          }}
        >
          <View
            className={`h-10 flex-1 items-center justify-center rounded-tl-lg ${
              isAuctionsPressed ? "bg-sky-900" : "bg-sky-700"
            }`}
          >
            <Text className="text-slate-100 text-base font-bold">Sales</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsAuctionsPressed(true);
          }}
        >
          <View
            className={`h-10 flex-1 items-center justify-center rounded-tr-lg ${
              isAuctionsPressed ? "bg-sky-700" : "bg-sky-900"
            }`}
          >
            <Text className="text-slate-100 text-base font-bold">Auctions</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        data={filteredPosts}
        renderItem={({ item }) => {
          if (isAuctionsPressed) {
            return <Auction {...item} filter={filter} />;
          } else {
            return <Sale {...item} />;
          }
        }}
        keyExtractor={(item) => item.id}
        className="mx-3 bg-sky-700"
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default PostList;
