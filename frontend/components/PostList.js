import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Sale from "./Sale";
import Auction from "./Auction";

// const posteados2 = [
//   {
//     "sale": {
//         "id": 3,
//         "price": "12.99",
//         "description": "Venta de Lightning Bolt",
//         "quantity": 5,
//         "status": "pending",
//         "seller_id": 1,
//         "card_id": 3,
//         "condition": "Mint",
//         "updatedAt": "2023-06-26T14:31:55.962Z",
//         "createdAt": "2023-06-26T14:31:55.962Z"
//     },
//     "user": {
//         "nickname": "Pedro",
//         "profilePic": null
//     },
//     "card": {
//         "name": "Lightning Bolt",
//         "image": "https://cards.scryfall.io/png/front/f/2/f29ba16f-c8fb-42fe-aabf-87089cb214a7.png?1673147852"
//     }
// }
// ];

const PostList = ({ content }) => {
  const [isAuctionsPressed, setIsAuctionsPressed] = useState(false);
  const [posteados, setPosteados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await content();
      console.log(data);

      setPosteados(data);
    };

    fetchData();
  }, []);

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
        keyExtractor={(item) => item.sale.id}
        className="bg-sky-700"
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default PostList;
