import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Pressable,
  TouchableWithoutFeedback
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MyComponent = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="px-3 w-full">
      <Modal
        animationType="slide"
        transparent={true}
        visible={popUp}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPopUp(!popUp);
        }}
      >
        <View className="flex-1 justify-center items-center mt-5">
          <View className="bg-sky-900 m-2">
            <Text style={styles.modalText}>
              Are you sure you want to put a bid?
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setPopUp(!popUp)}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View className="bg-slate-100 rounded-lg mt-3 shadow-md shadow-black p-1.5">
        <TouchableWithoutFeedback onPress={handlePress}>
          <View className="flex-row">
            <Image
              source={{ uri: item.pic }}
              className="w-14 h-14 rounded-full"
              style={{ resizeMode: "contain" }}
            />
            <View className="flex-1 ml-1 w-3/4">
              <View className="rounded-lg mb-0.5 bg-sky-900 ml-1 flex-1 items-center justify-center">
                <Text
                  className="text-xs font-bold text-slate-100"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </View>
              <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 items-center justify-center">
                <Text
                  className="text-xs font-bold text-slate-100"
                  numberOfLines={1}
                >
                  {item.card}
                </Text>
              </View>
            </View>
            <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 items-center justify-center px-4">
              <Text
                className="text-xs font-bold text-slate-100"
                numberOfLines={1}
              >
                ${item.price}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {isExpanded && (
          <View className="flex-row mt-1.5">
            <Image
              source={{ uri: item.pic }}
              style={{ marginTop: 8, flex: 1 }}
            />
            <View className="flex-1 ml-2">
              <View className="rounded-lg bg-sky-900 mb-0.5 p-1.5 flex-1 h-36">
                <Text className="text-xs text-slate-100">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut.
                </Text>
              </View>
              <View className="px-2 text-center flex-1 justify-end">
                <TouchableHighlight
                  className="bg-orange-500 flex-1 items-center justify-center rounded-lg mt-1"
                  underlayColor="rgb(251 146 60)"
                  onPress={() => {
                    setPopUp(!popUp);
                    console.log("Presionado maestro");
                  }}
                >
                  <Text className="text-2xl font-bold text-slate-100">BID</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const Auction = ({ filter }) => {
  const [data, setData] = useState([
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
    // Add more items as needed
  ]);

  const [filteredData, setFilteredData] = useState(data.filter(post => post.card === filter));

  useEffect(() => {
    filter === undefined ? setFilteredData(data) : setFilteredData(data.filter(post => post.card === filter));
  }, [data]);

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MyComponent item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: "center",
    paddingLeft: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Auction;
