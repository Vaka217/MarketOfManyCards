import { StatusBar ,Text, View, Pressable, StyleSheet, FlatList, Image, Modal, TextInput, useWindowDimensions, Keyboard, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { CardAddMenu } from "../components/CardAddMenu.js";
import { PostButton } from "../components/PostButton.js";
import { SaleAuctionSlider } from "../components/SaleAuctionSlider.js";
import { useState, useEffect, useContext } from "react";
import { SearchBar } from "../components/SearchBar";
import { PrivateValueStore } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export function PostScreen() {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSale, setIsSale] = useState(true);
  const [cardQuality, setCardQuality] = useState("");
  const [cardQuantity, setCardQuantity] = useState("");

  const [currentCard, setCurrentCard] = useState("");


  const handleContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    const offsetX = (contentSize.width - event.target.clientWidth) / 2;
    event.target.setNativeProps({
      contentOffset: { x: offsetX, y: 0 },
    });
  };

  const resetEverything = () => {
    setPrice('');
    setDescription('');
    setIsSale(true);
    setCardQuality('');
    setCurrentCard("");
    setCardQuantity("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(186, 230, 253)" }}>
          <View style={styles.container}>
            <Pressable onPress={() => {setShowModal(true)}}>
              {currentCard === "" ? (
              <Text>
                Select card to post...
              </Text>
              ) : (
                <Image source={{ uri: JSON.parse(currentCard)["image"] }} style={{ flex: 1, height: 1, width: 180 }}/>
              )}
            </Pressable>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(186, 230, 253)", height: '84%' }}>
            <View style={{ flex: 1, borderRadius: 15, alignItems: "center", margin: '1%', marginRight: '5%', justifyContent: "center", backgroundColor: "rgb(51, 65, 85)", width: '100%' }}>
              <TextInput
                placeholder="Quality..."
                value={cardQuality}
                onChangeText={setCardQuality}
                multiline={false}
                keyboardType={"default"}
                onContentSizeChange={handleContentSizeChange}
                maxLength={30}
                style={{ color: "rgb(241, 245, 249)" }}
                placeholderTextColor={"#5D5D5D"}>
              </TextInput>
            </View>
            <View style={{ flex: 1, borderRadius: 15, margin: '1%', marginRight: '5%', alignItems: "center", justifyContent: "center", backgroundColor: "rgb(51, 65, 85)", width: '100%' }}>
              <TextInput
                placeholder="Quantity..."
                value={cardQuantity}
                onChangeText={setCardQuantity}
                multiline={false}
                keyboardType={"numeric"}
                onContentSizeChange={handleContentSizeChange}
                maxLength={30}
                style={{ color: "rgb(241, 245, 249)" }}
                placeholderTextColor={"#5D5D5D"}>
              </TextInput>
            </View>
            <View style={{ flex: 1, borderRadius: 15, margin: '1%', marginRight: '5%', alignItems: "center", justifyContent: "center", backgroundColor: "rgb(51, 65, 85)", width: '100%' }}>
              <TextInput placeholder="Price..."
                value={price}
                onChangeText={setPrice}
                multiline={false}
                keyboardType={'numeric'}
                onContentSizeChange={handleContentSizeChange}
                maxLength={7}
                style={{ color: "rgb(241, 245, 249)" }}
                placeholderTextColor={"#5D5D5D"}
              >
              </TextInput>
            </View>
          </View>
          <CardAddMenu showModal={showModal} handleContentSizeChange={handleContentSizeChange} setShowModal={setShowModal} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
      </View>
      <View style={{ flex: 1, backgroundColor: "rgb(186, 230, 253)" }}>
        <View style= {{ flex: 2, flexDirection: "row", backgroundColor: "rgb(186, 230, 253)" }}>
          <View style={{ flex: 3, borderRadius: 15, margin: 10, alignItems: "center", justifyContent: "center", backgroundColor: "rgb(51, 65, 85)" }}>
            <TextInput placeholder="Description..." style={{ margin: 5, color: "rgb(241, 245, 249)" }}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              onContentSizeChange={handleContentSizeChange}
              maxLength={150}
              rows={5}
              inputMode={"url"}
              placeholderTextColor={"#5D5D5D"}
            >
            </TextInput>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "rgb(186, 230, 253)" }}>
          <SaleAuctionSlider isSale={isSale} setIsSale={setIsSale}/>
        </View>
        <View style={{ flex: 1, backgroundColor: "rgb(186, 230, 253)", justifyContent: "center", alignItems: "center" }}>
          <PostButton price={price} description={description} resetEverything={resetEverything} postType={isSale} cardQuality={cardQuality} cardQuantity={cardQuantity} post={currentCard}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: '2%',
    marginRight: '2%',
    height: '84%',
    borderRadius: 20,
    backgroundColor: "rgb(51, 65, 85)",
    width: '60%',
  },
  container2: {
    flexDirection: 'row',
    flex: 1.5,
    height: '45%',
    marginRight: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 180,
  },
  image: {
    width: 80,
    height: 112,
    borderWidth: 1,
    padding: 1,
  },
  container3: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  container5: {
    alignItems: "center",
    justifyContent: "center",
  },
})