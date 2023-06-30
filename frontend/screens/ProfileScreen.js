import React, { useState, useContext, useEffect } from "react";
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
import Post from "../components/Post";
import Confirmation from "../components/Confirmation";
import FormModal from "../components/FormModal";
import { Modal } from "react-native";
import { Context as AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import axios from "axios";

options = ["Sales", "Auctions", "Bids", "Transactions"];

const ProfileScreen = () => {
  const [isPressed, setIsPressed] = useState("Sales");
  const [viewWidth, setViewWidth] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const { state, signout } = useContext(AuthContext);
  const [salesData, setSalesData] = useState();
  const [profileData, setProfileData] = useState();
  const [auctionsData, setAuctionsData] = useState();
  const navigation = useNavigation();

  console.log(state);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          `http://18.229.90.36:3000/searchsale/${state.userId}`
        );
        const salesData = response.data;
        console.log(state);
        setSalesData(salesData);
      } catch (error) {
        console.log(state.userId, "aaaaa");
        console.log(error);
      }
    };

    const fetchAuctionsData = async () => {
      try {
        const response = await axios.get(
          `http://18.229.90.36:3000/searchauction/${state.userId}`
        );
        const auctionsData = response.data;
        console.log(state);
        setAuctionsData(auctionsData);
      } catch (error) {
        console.log(state.userId, "aaaaa");
        console.log(error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://18.229.90.36:3000/searchusers/${state.userId}`
        );
        const profileData = response.data;
        console.log("jfasknlsdfknñlasflñsacfasjop");
        setProfileData(profileData);
      } catch (error) {
        console.log(state.userId, "aaaaa");
        console.log(error);
      }
    };

    fetchProfileData();
    fetchSalesData();
    fetchAuctionsData();
  }, []);

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
      <View className="items-center pb-4" style={styles.container}>
        <Text className="text-slate-100 text-base font-bold my-3">
          JuanCarlos
        </Text>
        <Pressable
          onPress={() => {
            signout({ navigation });
          }}
          className="absolute right-1 m-2"
        >
          <FontAwesome name="sign-out" size={36} color="white" />
        </Pressable>
        <Pressable onPress={toggleModal} className="absolute left-1 m-2">
          <FontAwesome name="edit" size={36} color="white" />
        </Pressable>
        <Avatar
          rounded
          source={{
            uri: "https://cdn.discordapp.com/attachments/732360655658680452/1118248308213821491/ghj.png",
          }}
          size="large"
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
            data={isPressed === "Auctions" ? auctionsData : salesData}
            renderItem={({ item }) => {
              if (isPressed === "Auctions") {
                return <Post {...item} type={isPressed} />;
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
