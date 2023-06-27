import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PostList from "../components/PostList";
import Sale from "../components/Sale";
import Auction from "../components/Auction";
import Confirmation from "../components/Confirmation";
import FormModal from "../components/FormModal";
import { Modal } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

options = ["Sales", "Auctions", "Bids", "Transactions", "Confirmations"];

// const posts = [
//   {
//     id: "1",
//     pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     name: "Pedro",
//     condition: "Near-Mind",
//     quantity: 3,
//     price: "20",
//     card: "Llanowar Elves",
//   },
//   {
//     id: "2",
//     pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     name: "Juana",
//     condition: "Near-Mind",
//     quantity: 4,
//     price: "200",
//     card: "Lightning Bolt",
//   },
//   {
//     id: "3",
//     pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     name: "Luis",
//     condition: "Near-Mind",
//     quantity: 50,
//     price: "7",
//     card: "Eidolon of Countless Battles",
//   },
//   {
//     id: "4",
//     pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     name: "Pedro",
//     condition: "Near-Mind",
//     quantity: 3,
//     price: "20",
//     card: "Llanowar Elves",
//   },
//   {
//     id: "5",
//     pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     name: "Juana",
//     condition: "Near-Mind",
//     quantity: 4,
//     price: "200",
//     card: "Lightning Bolt",
//   },
// ];

const posts = async () => {
  try {
    const response = await axios.get("http://18.229.90.36:3000/searchsales");
    const salesData = response.data;
    return salesData;
  } catch (error) {
    console.log(error);
  }
};

const ProfileScreen = () => {
  const [isPressed, setIsPressed] = useState("Sales");
  const [viewWidth, setViewWidth] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const { state, signout, clearErrorMessage } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <SafeAreaView className="flex-1 bg-sky-900">
      <Modal visible={isModal} transparent={true} onRequestClose={toggleModal}>
        <FormModal isModal={isModal} toggleModal={toggleModal} />
      </Modal>
      <View className="h-1/3 items-center" style={styles.container}>
        <Text className="text-slate-100 text-base font-bold mt-1">
          XxJuanCarlos1972xX
        </Text>
        <Image
          source={{
            uri: "https://cdn.discordapp.com/attachments/732360655658680452/1118248308213821491/ghj.png",
          }}
          className="w-28 h-28 rounded-full self-center mt-1"
        />
        <Button
          title="Edit"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgb(249 115 22)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          containerStyle={{
            height: 45,
            width: 200,
            justifyContent: "center",
            marginTop: 4,
          }}
          onPress={toggleModal}
        />
        <Button
          title="Logout"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgb(249 115 22)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          containerStyle={{
            height: 45,
            width: 200,
            justifyContent: "center",
          }}
          onPress={() => {
            signout({ navigation });
          }}
        />
      </View>
      <View className="bg-sky-700 flex-1">
        <View className="overflow-hidden flex-1" onLayout={handleLayout}>
          <FlatList
            data={options}
            renderItem={({ item }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setIsPressed(item);
                  }}
                >
                  <View
                    style={{ width: viewWidth / 3 }}
                    className={`h-10 flex-1 items-center justify-center ${
                      isPressed === item ? "bg-sky-700" : "bg-sky-900"
                    }
                                    `}
                  >
                    <Text className="text-slate-100 text-base font-bold">
                      {item}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
            keyExtractor={(item) => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={posts}
            renderItem={({ item }) => {
              if (isPressed === "Auctions") {
                return <Auction {...item} />;
              } else if (isPressed === "Sales") {
                return <Sale {...item} />;
              } else {
                return <Confirmation {...item} />;
              }
            }}
            keyExtractor={(item) => item.id}
            className="bg-sky-700"
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ProfileScreen;
