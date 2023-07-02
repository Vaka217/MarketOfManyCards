import {
  StatusBar,
  Text,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
  useWindowDimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { CardAddMenu } from "../components/CardAddMenu.js";
import { PostButton } from "../components/PostButton.js";
import { SaleAuctionSlider } from "../components/SaleAuctionSlider.js";
import { useState, useEffect, useContext } from "react";
import { SearchBar } from "../components/SearchBar.js";
import { PrivateValueStore } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

export default function PostScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSale, setIsSale] = useState(true);
  const [cardQuality, setCardQuality] = useState("");
  const [cardQuantity, setCardQuantity] = useState("");
  const [placeholder, setPlaceholder] = useState(styles.imagePlaceholder);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Mint", value: "mint" },
    { label: "Near Mint", value: "near mint" },
    { label: "Excellent", value: "excellent" },
    { label: "Good", value: "good" },
    { label: "Light Played", value: "light played" },
    { label: "Played", value: "played" },
    { label: "Poor", value: "poor" },
  ]);

  const [currentCard, setCurrentCard] = useState("");

  const handleContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    const offsetX = (contentSize.width - event.target.clientWidth) / 2;
    event.target.setNativeProps({
      contentOffset: { x: offsetX, y: 0 },
    });
  };

  const resetEverything = () => {
    setPrice("");
    setDescription("");
    setIsSale(true);
    setCardQuality("");
    setCurrentCard("");
    setCardQuantity("");
  };

  useEffect(() => {
    currentCard === ""
      ? setPlaceholder(styles.imagePlaceholder)
      : setPlaceholder(styles.imageTrue);
  }, [currentCard]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0269a3",
        }}
      >
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {currentCard === "" ? (
              <Text style={{ color: "rgb(241, 245, 249)" }}>
                Select card to post...
              </Text>
            ) : (
              <Image
                source={{ uri: JSON.parse(currentCard)["image"] }}
                style={{ flex: 1, width: "100%" }}
                resizeMode="contain"
              />
            )}
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0269a3",
            width: "50%",
            aspectRatio: 0.55,
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 15,
              alignItems: "center",
              margin: "1%",
              marginRight: "5%",
              justifyContent: "center",
              backgroundColor: "rgb(12, 74, 110)",
              aspectRatio: 1.5,
            }}
          >
            <Input
              label="Price"
              value={price}
              onChangeText={setPrice}
              autoCapitalize="none"
              autoCorrect={false}
              labelStyle={styles.label}
              inputStyle={styles.input}
              keyboardType={"decimal-pad"}
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 15,
              margin: "1%",
              marginRight: "5%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(12, 74, 110)",
              aspectRatio: 1.5,
            }}
          >
            <Input
              label="Quantity"
              value={cardQuantity}
              onChangeText={setCardQuantity}
              autoCapitalize="none"
              autoCorrect={false}
              labelStyle={styles.label}
              inputStyle={styles.input}
              keyboardType={"decimal-pad"}
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 15,
              margin: "1%",
              marginRight: "5%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(12, 74, 110)",
              aspectRatio: 1.5,
            }}
          >
            <Input
              label="Quality"
              value={cardQuality}
              onChangeText={setCardQuality}
              autoCapitalize="none"
              autoCorrect={false}
              labelStyle={styles.label}
              inputStyle={styles.input}
              keyboardType={"default"}
              containerStyle={{
                alignItems: "center",
                marginTop: "10%",
              }}
            />
          </View>
        </View>
        <CardAddMenu
          showModal={showModal}
          handleContentSizeChange={handleContentSizeChange}
          setShowModal={setShowModal}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#0269a3" }}>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            backgroundColor: "#0269a3",
          }}
        >
          <View
            style={{
              flex: 3,
              borderRadius: 15,
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(12, 74, 110)",
            }}
          >
            <TextInput
              placeholder="Description..."
              style={{
                margin: 5,
                color: "rgb(241, 245, 249)",
                fontStyle: "italic",
              }}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              onContentSizeChange={handleContentSizeChange}
              maxLength={150}
              rows={5}
              inputMode={"url"}
              placeholderTextColor={"rgb(241 245 249)"}
            ></TextInput>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "#0269a3" }}>
          <View style={{ flex: 1 }}>
            <SaleAuctionSlider isSale={isSale} setIsSale={setIsSale} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#0269a3",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PostButton
            price={price}
            description={description}
            resetEverything={resetEverything}
            postType={isSale}
            cardQuality={cardQuality}
            cardQuantity={cardQuantity}
            post={currentCard}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "2%",
    marginRight: "2%",
    width: "50%",
    borderRadius: 12,
    backgroundColor: "rgb(12, 74, 110)",
    aspectRatio: 2.5 / 3.5,
    overflow: "hidden",
  },
  container2: {
    flexDirection: "row",
    flex: 1.5,
    height: "45%",
    marginRight: "2%",
    alignItems: "center",
    justifyContent: "center",
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
  imagePlaceholder: {
    borderColor: "rgb(241, 245, 249)",
    borderStyle: "dashed",
    width: "90%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 0,
  },
  imageTrue: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "rgb(241, 245, 249)",
  },
  input: {
    color: "rgb(241, 245, 249)",
    textAlign: "center",
  },
});
