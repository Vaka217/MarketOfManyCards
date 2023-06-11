import { StatusBar ,Text, View, Pressable, StyleSheet, FlatList, Image, Modal, TextInput, useWindowDimensions, Keyboard, KeyboardAvoidingView } from "react-native";
import { CardAddMenu } from "../components/CardAddMenu.js";
import { PostButton } from "../components/PostButton.js";
import { SaleAuctionSlider } from "../components/SaleAuctionSlider.js";
import { useState, useEffect, useContext } from "react";
import { SearchBar } from "../components/SearchBar";
import { PrivateValueStore } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export function PostScreen() {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState();
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSale, setIsSale] = useState(true);
  const handleContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    const offsetX = (contentSize.width - event.target.clientWidth) / 2;
    event.target.setNativeProps({
      contentOffset: { x: offsetX, y: 0 },
    });
  };
  const [cardDisplayArray, setCardDisplayArray] = useState([])
  const [cardsToPost, setCardsToPost] = useState({});

  const updateCurrentCards = (cards) => {
    const updatedCards = Object.fromEntries(
      Object.entries(cards).filter(([key, value]) => value !== "0")
    );
    setCardsToPost(updatedCards);
  };

  useEffect(() => {
    setCardDisplayArray(Object.entries(cardsToPost).map(([key, value]) => ([JSON.parse(key), value])));
  }, [cardsToPost]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [1440, 2560],
      quality: 1
    })
    setImages(result.assets);
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const resetEverything = () => {
    setPrice('');
    setDescription('');
    setImages();
    setCardsToPost({});
    setIsSale(true);
  };
  return (
    <View className="flex-1">
      <View className="bg-sky-200 flex-1 flex-row justify-center items-center">
        <View style={styles.container} className="bg-slate-700">
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.container3}>
                  <Image source={{ uri: item.uri }} style={{ width: 72, height: 128}}/>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.uri}
          contentContainerStyle={{ marginVertical: 0, paddingBottom: 10}}
          />
        </View>
        <View style={styles.container2}>
          <Pressable onPress={pickImages}>
            <View style={{ width: 80, height: 80, borderRadius: 90, justifyContent: "center", alignItems: "center" }} className="bg-sky-700">
              <View style={{ backgroundColor: "#DEDEDE", width: 50, height: 10, borderRadius: 90, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "#DEDEDE", width: 10, height: 50, borderRadius: 90 }}>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    <View className="flex-row flex-1 justify-center items-center bg-sky-200">
      <View style={styles.container} className="bg-slate-700">
        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={cardDisplayArray}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.container3}>
                <Image source={{ uri: item[0].image }} style={styles.image}/>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center"}}>
                <Text className="text-slate-100">
                  x{ item[1] }
                </Text>
              </View>
            </View>
          );
        }}/>
      </View>
      <View style={styles.container2}>
        <Pressable onPress={() => {setShowModal(true)}}>
          <View style={{ width: 80, height: 80, borderRadius: 90, justifyContent: "center", alignItems: "center" }} className="bg-sky-700">
            <View style={{ backgroundColor: "#DEDEDE", width: 50, height: 10, borderRadius: 90, justifyContent: "center", alignItems: "center" }}>
              <View style={{ backgroundColor: "#DEDEDE", width: 10, height: 50, borderRadius: 90 }}>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
        <CardAddMenu showModal={showModal} handleContentSizeChange={handleContentSizeChange} setShowModal={setShowModal} updateCurrentCards={updateCurrentCards} cardsToPost={cardsToPost} setCardsToPost={setCardsToPost}/>
      </View>
      <View className="flex-1 bg-sky-200">
        <View style= {{ flex: 2 }} className="bg-sky-200 flex-row">
          <View style={{ flex: 1, borderRadius: 15, margin: 10, alignItems: "center", justifyContent: "center"}} className="bg-slate-700">
            <TextInput placeholder="Price"
              value={price}
              onChangeText={setPrice}
              multiline={false}
              onContentSizeChange={handleContentSizeChange}
              keyboardType={'numeric'}
              maxLength={7}
              className="m-1 text-slate-100"
            >
            </TextInput>
          </View>
          <View style={{ flex: 3, borderRadius: 15, margin: 10, alignItems: "center", justifyContent: "center" }} className="bg-slate-700">
            <TextInput placeholder="Description" style={{ margin: 5 }}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              onContentSizeChange={handleContentSizeChange}
              maxLength={150}
              rows={5}
            >
            </TextInput>
          </View>
          <View style={{ borderRadius: 180, flex: 1, justifyContent: "center", height: '65%', margin: 5, marginRight: 10, alignSelf: "center"}} className="bg-sky-700">
              <Pressable onPress={dismissKeyboard} style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <Text style={{ fontSize: 10, alignSelf: "center", justifyContent: "center", textAlign: "center"}} className="text-slate-100"> Save Description</Text>
              </Pressable>
            </View>
        </View>
        <View className="flex-1 bg-sky-200">
          <SaleAuctionSlider isSale={isSale} setIsSale={setIsSale}/>
        </View>
        <View className="flex-1 bg-sky-200 justify-center items-center">
          <PostButton price={price} description={description} images={images} resetEverything={resetEverything} post={cardsToPost} postType={isSale}/>
        </View>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: '2%',
    marginRight: '2%',
    height: '80%',
    borderRadius: 20,
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