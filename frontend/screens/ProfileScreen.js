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
  ActivityIndicator
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Post from "../components/Post";
import FormModal from "../components/FormModal";
import { Modal } from "react-native";
import { Context as AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import axios from "axios";
import { InfoContext } from "../contexts/InfoContext";
import Bid from "../components/Bid";
import { HomeSkeleton } from "../components/HomeSkeleton";

options = ["Sales", "Auctions", "Bids"];

const ProfileScreen = () => {
  const [isPressed, setIsPressed] = useState("Sales");
  const [viewWidth, setViewWidth] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const { state, signout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState();
  const {salesUserData, auctionsUserData, setSalesUserData, setAuctionsUserData} = useContext(InfoContext);
  const [bidsData, setBidsData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          `http://18.229.90.36:3000/searchsale/${state.userId}`
        );
        const salesData = response.data;
        setSalesUserData(salesData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAuctionsData = async () => {
      try {
        const response = await axios.get(
          `http://18.229.90.36:3000/searchauction/${state.userId}`
        );
        const auctionsData = response.data;
        setAuctionsUserData(auctionsData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://18.229.90.36:3000/searchusers/${state.userId}`
        );
        const profileData = response.data;
        setProfileData(profileData);
        console.log(profileData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBidsData = async () => {
      try {
        const response = await axios.get(
          `http://18.229.90.36:3000/getuserbids/${state.userId}`
        );
        const bidsData = response.data;
        setBidsData(bidsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
    fetchSalesData();
    fetchAuctionsData();
    fetchBidsData();
  }, []);

  if (!profileData) {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgb(12, 74, 110)" }}>
      <ActivityIndicator size={"large"} color={"rgb(241, 245, 249)"}/>
    </View>
    )
  }

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
        <FormModal isModal={isModal} toggleModal={toggleModal} profileData={profileData} />
      </Modal>
      <View className="items-center pb-4" style={styles.container}>
        <Text className="text-slate-100 text-base font-bold my-3">
          {profileData.nickname}
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
            uri: profileData.profilePic,
          }}
          size="large"
        />
      </View>
      <View className="bg-sky-700 flex-1">
        <View className="overflow-hidden" onLayout={handleLayout}>
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
        </View>
        {isPressed != "Bids" ? (
          !salesUserData || !auctionsUserData ? ( <HomeSkeleton chosenColor={"rgb(3, 105, 161)"} cardHeight={110} textHeight={30} textWidth={225}/> ) : (
          <FlatList
            data={isPressed === "Auctions" ? auctionsUserData : salesUserData}
            renderItem={({ item }) => (
              <Post {...item} type={isPressed} isUser />
            )}
            keyExtractor={(item) => item.post.id}
            showsVerticalScrollIndicator={false}
          />
        )) : (
          !bidsData ? ( <HomeSkeleton chosenColor={"rgb(3, 105, 161)"} cardHeight={110} textHeight={30} textWidth={225}/> ) : (
          <FlatList data={bidsData} renderItem={({ item }) => (
              <Bid {...item} />
            )}
            keyExtractor={(item) => item.post.id}
            showsVerticalScrollIndicator={false}
          />
        ))}
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
