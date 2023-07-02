import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
  Linking
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MyButton from "./myButton";
import WhatsAppButton from "./WhatsAppButton";
import { Avatar, Button, Input } from "react-native-elements";
import axios from "axios";
import { InfoContext } from "../contexts/InfoContext";
import {Context as AuthContext} from "../contexts/AuthContext";
import EditPostForm from "./EditPostForm";

const Post = ({ post, card, user, type, isUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [selectedValue, setSelectedValue] = isUser ? useState(post.quantity) : useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { setSalesUserData, setAuctionsUserData, salesUserData, auctionsUserData } = useContext(InfoContext);
  const [bidAmount, setBidAmount] = useState(post.actual_bid);
  const {state} = useContext(AuthContext);
  const [first, setFirst] = useState(true);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const handleValueSelect = (value) => {
    setSelectedValue(value);
    setIsExpanded(false);
  };

  const createArrayUpToQuantity = (quantity) => {
    return Array.from({ length: quantity + 1 }, (_, index) => index);
  };

  useEffect(() => {
    if (isUser && !first) {
      const timer = setTimeout(() => {
        axios.put(`http://18.229.90.36:3000/updatesalequantity/${post.id}`, { quantity: selectedValue, saleId: post.id })
          .then(response => {
            console.log("PUT request successful");
          })
          .catch(error => {
            console.log("PUT request failed", error);
          });
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setFirst(false);
    }
  }, [selectedValue]);



  const handleWhatsappPress = (message) => {

    const url = `https://api.whatsapp.com/send?phone=${user.contact}&text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("WhatsApp is not installed on this device.");
        }
      })
      .catch((error) => console.log("Error opening WhatsApp:", error));
  };

  const handleBid = async () => {
    try {
      const response = await axios.post("http://18.229.90.36:3000/makebid", { auctionId: post.id, userId: state.userId, bidAmount: bidAmount });
      console.log("Bid creada con éxito");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View className="px-3 w-full">
      <TouchableWithoutFeedback onPress={handleVisible}>
        <View className="bg-slate-100 rounded-lg mt-3 shadow-md shadow-black p-1.5">
          <View className="flex-row">
            <View className="h-32 w-24">
              <Image
                source={{ uri: card.image }}
                className="h-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 justify-center items-center px-1">
                <Text
                  className="text-lg font-bold text-slate-100"
                  numberOfLines={1}
                >
                  {card.name}
                </Text>
              </View>
              <View className="flex-row flex-1">
                <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 justify-center items-center px-1">
                  <Text className="text-lg font-bold text-slate-100">
                    {post.condition}
                  </Text>
                </View>
                <View className="rounded-lg bg-sky-900 ml-1 mb-0.5 flex-1 justify-center items-center px-1">
                  <Text className="text-lg font-bold text-slate-100">
                    ${type === "Sales" ? post.price : post.actual_bid}
                  </Text>
                </View>
              </View>
              <View className="flex-row ml-1 h-10">
                {!isUser ? (
                <>
                { type == "Sales" ? (
                  <View className="justify-center flex-col items-center flex-1">
                    <TouchableWithoutFeedback onPress={handlePress}>
                      <View className="flex-row justify-between border-sky-900 border-2 rounded-lg flex-1 items-center">
                        <Text className="text-xl font-bold text-sky-900 text-center flex-1 h-full p-1">
                          {selectedValue}
                        </Text>
                        <FontAwesome
                          name="sort-down"
                          size={24}
                          color="rgb(12 74 110)"
                          style={styles.icon}
                        />
                        <Text className="text-xl font-bold text-slate-100 text-center flex-1 bg-sky-900 h-10 p-1 rounded-r-lg">
                          {post.quantity}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                      <Modal transparent={true} visible={isExpanded} className="flex-1" >
                        <View className="rounded-b-lg flex-1 justify-center" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                          <View className="bg-sky-900 p-2 m-8 rounded-lg items-center flex-row max-h-96">
                            <FlatList
                              data={createArrayUpToQuantity(post.quantity)}
                              renderItem={({ item }) => {
                                return (
                                  <Pressable onPress={() => handleValueSelect(item)}>
                                    <View className="border-b border-slate-100 h-12 items-center justify-center">
                                      <Text className="text-slate-100 font-bold text-2xl">
                                        {item}
                                      </Text>
                                    </View>
                                  </Pressable>
                                );
                              }}
                              keyExtractor={(item) => item}
                              showsVerticalScrollIndicator={false}
                            />
                          </View>
                        </View>
                      </Modal>
                  </View>
                ) : (
                  <Text className="text-xl font-bold text-slate-100 text-center flex-1 bg-sky-900 h-10 p-1 rounded-lg">
                    {post.quantity} {post.quantity > 1 ? "Cards" : "Card"}
                  </Text>
                )
                }
                  <View className="flex-1 ml-1">
                    <MyButton type={type} setIsBuying={setIsBuying} isBuying={isBuying} />
                  </View>
                  <Modal transparent={true} visible={isBuying} className="flex-1" >
                        <View className="rounded-b-lg flex-1 justify-center" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                          <View className="bg-sky-900 p-2 m-8 rounded-lg items-center max-h-96">
                            <Text className="text-xl font-bold text-slate-100 text-center my-3">Are you sure you want to {type == "Auctions" ? "put a bid? You cannot undo this" : "buy? It will open a chat with the seller"}</Text>
                            {type == "Auctions" && (
                              <Input label="Bid Amount:" value={bidAmount} onChangeText={setBidAmount} labelStyle={styles.label} inputStyle={styles.label} keyboardType="numeric" />
                            )}
                            <Button
                              title="Confirm"
                              loading={false}
                              loadingProps={{ size: "small", color: "white" }}
                              buttonStyle={{
                                backgroundColor: "green",
                                borderRadius: 5,
                              }}
                              titleStyle={{ fontWeight: "bold", fontSize: 24 }}
                              containerStyle={{
                                height: 50,
                                width: 200,
                                justifyContent: "center",
                                marginBottom: 12
                              }}
                              onPress={() => {
                                if (type == "Sales") {
                                  handleWhatsappPress(`Hi ${user.nickname}, I contact you for buying ${post.quantity} of your ${card.name} sale.`);
                                } else {
                                  handleBid();
                                }
                                setIsBuying(!isBuying);
                              }}
                            />
                            <Button
                              title="Cancel"
                              loading={false}
                              loadingProps={{ size: "small", color: "white" }}
                              buttonStyle={{
                                backgroundColor: "red",
                                borderRadius: 5,
                              }}
                              titleStyle={{ fontWeight: "bold", fontSize: 24 }}
                              containerStyle={{
                                height: 50,
                                width: 200,
                                justifyContent: "center",
                                marginBottom: 12
                              }}
                              onPress={() => {
                                setIsBuying(!isBuying);
                              }}
                            />
                          </View>
                        </View>
                      </Modal>
                </>
                  ) : (
                    <View className="justify-center flex-row items-center flex-1">
                      {type == "Sales" && (
                        <View className="flex-row justify-between border-2 border-sky-900 rounded-lg items-center flex-1 bg-sky-900 h-full mr-1">
                          <Pressable onPress={() => setSelectedValue(selectedValue + 1)} style={{flex: 1}}>
                            <FontAwesome name="plus" size={24} color="rgb(241 245 249)" style={{flex: 1, textAlign: "center", verticalAlign:"middle"}} />
                          </Pressable>
                          <Text className="text-xl font-bold text-sky-900 text-center flex-1 bg-slate-100 h-full p-1">
                            {selectedValue}
                          </Text>
                          <Pressable onPress={() => setSelectedValue(selectedValue === 0 ? 0 : selectedValue - 1)} style={{flex: 1}}>
                            <FontAwesome name="minus" size={24} color="rgb(241 245 249)" style={{flex: 1, textAlign: "center", verticalAlign:"middle"}} />
                          </Pressable>
                        </View>
                      )}
                      <View className="flex-1 flex-row h-full">
                        {type != "Sales" && (
                          <View className="flex-row flex-1 mr-1">
                          <Text className="text-xl font-bold text-slate-100 text-center flex-1 bg-sky-900 h-10 p-1 rounded-lg mr-1">
                            {post.quantity}
                          </Text>
                        <Pressable style={{flex: 1}} onPress={() => {setIsEditModalVisible(!isEditModalVisible)}}>
                          <FontAwesome name="money" size={24} color="rgb(241 245 249)" style={{flex: 1, backgroundColor: "rgb(21 128 61)", height: "100%", textAlign: "center", verticalAlign: "middle", borderRadius: 8}} />
                        </Pressable>
                        </View>
                        )}
                        <View className="flex-1 flex-row">
                        <Pressable style={{flex: 1}} onPress={() => {setIsEditModalVisible(!isEditModalVisible)}}>
                          <FontAwesome name="pencil" size={24} color="rgb(241 245 249)" style={{flex: 1, backgroundColor: "rgb(234 179 8)", height: "100%", textAlign: "center", verticalAlign: "middle", borderRadius: 8}} />
                        </Pressable>
                        <Modal transparent={true} visible={isEditModalVisible} className="flex-1" >
                          <EditPostForm isModal={isEditModalVisible} toggleModal={setIsEditModalVisible} postData={post} />
                        </Modal>
                      <Pressable style={{flex: 1}} onPress={() => {setIsDeleteModalVisible(!isDeleteModalVisible)}}>
                        <FontAwesome name="trash" size={24} color="rgb(241 245 249)" style={{flex: 1, backgroundColor: "rgb(153 27 27)", height: "100%", textAlign: "center", verticalAlign: "middle", borderRadius: 8, marginLeft: 4}} />
                      </Pressable>
                      </View>
                        <Modal transparent={true} visible={isDeleteModalVisible} className="flex-1" >
                        <View className="rounded-b-lg flex-1 justify-center" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                          <View className="bg-sky-900 p-2 m-8 rounded-lg items-center max-h-96">
                            <Text className="text-xl font-bold text-slate-100 text-center my-3">Are you sure you want to delete this post?</Text>
                            <Button
                              title="Confirm"
                              loading={false}
                              loadingProps={{ size: "small", color: "white" }}
                              buttonStyle={{
                                backgroundColor: "green",
                                borderRadius: 5,
                              }}
                              titleStyle={{ fontWeight: "bold", fontSize: 24 }}
                              containerStyle={{
                                height: 50,
                                width: 200,
                                justifyContent: "center",
                                marginBottom: 12
                              }}
                              onPress={() => {
                                if (type == "Sales") {
                                  const deleteSale = async () => {
                                    try {
                                      const response = await axios.delete(
                                        `http://18.229.90.36:3000/deletesale/${post.id}`
                                      );
                                      console.log("Sale deleted successfully");
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  };

                                  deleteSale();
                                  const newData = salesUserData.filter(item => item.post.id !== post.id);
                                  setSalesUserData(newData);
                                } else {
                                  const deleteAuction = async () => {
                                    try {
                                      const response = await axios.delete(
                                        `http://18.229.90.36:3000/deleteauction/${post.id}`
                                      );
                                      console.log("Auction deleted successfully");
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  };

                                  deleteAuction();
                                  const newData = auctionsUserData.filter(item => item.post.id !== post.id);
                                  setAuctionsUserData(newData);
                              }}}
                            />
                            <Button
                              title="Cancel"
                              loading={false}
                              loadingProps={{ size: "small", color: "white" }}
                              buttonStyle={{
                                backgroundColor: "red",
                                borderRadius: 5,
                              }}
                              titleStyle={{ fontWeight: "bold", fontSize: 24 }}
                              containerStyle={{
                                height: 50,
                                width: 200,
                                justifyContent: "center",
                                marginBottom: 12
                              }}
                              onPress={() => {
                                setIsDeleteModalVisible(!isDeleteModalVisible);
                              }}
                            />
                          </View>
                        </View>
                      </Modal>
                      </View>
                  </View>
                  )
                }
              </View>
            </View>
          </View>
          {isVisible && !isUser && (
            <View className="flex-row mt-1">
              <View className="w-24 items-center mt-1">
                <Avatar
                  rounded
                  source={{
                    uri: "https://cdn.discordapp.com/attachments/732360655658680452/1118248308213821491/ghj.png",
                  }}
                  size="large"
                  containerStyle={{ marginBottom: 16, marginTop: 10 }}
                />
                <WhatsAppButton onSubmit={handleWhatsappPress} message={`Hi ${user.nickname}, I contact you for your ${card.name} post`} />
              </View>
              <View className="flex-1 pl-1">
                <View className="rounded-lg bg-sky-900 mb-0.5 flex-1 justify-center items-center">
                  <Text
                    className="text-xl font-bold text-slate-100"
                    numberOfLines={1}
                  >
                    {user.nickname}
                  </Text>
                </View>
                <View className="rounded-lg bg-sky-900 p-1.5 flex-1 h-36">
                  <Text className="text-xs text-slate-100">
                    {post.description}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    textAlign: "center",
    height: "80%",
  },
  label: {
    color: "rgb(241 245 249)",
  }
});

export default Post;
