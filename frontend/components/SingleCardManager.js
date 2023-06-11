import { View, Image, Pressable, TextInput, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";

export function SingleCardManager({item, handleContentSizeChange, sendData, savedNumber}) {
    const [cardNumber, setCardNumber] = useState(savedNumber);
    useEffect(() => {
        sendData(item, cardNumber);
    }, [item, cardNumber]);
    return (
        <View style={styles.container6} key={item.name} className="bg-sky-700">
            <View style={styles.container4}>
                <View style={{ flex: 1, backgroundColor: 'red' }}>
                  <Image source={{ uri: item.image }} style={styles.image2}/>
                </View>
                <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                  <Text className="text-slate-100">{item.name}</Text>
                </View>
                <View style={{flex: 2, alignItems: "center", justifyContent: "center", flexDirection: "row", marginRight: 50}}>
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Pressable onPress={() => {setCardNumber(cardNumber === "0" ? cardNumber : String(Number(cardNumber) - 1))}}>
                      <View style={{ width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderRightWidth: 20, borderTopWidth: 10, borderBottomWidth: 10, borderRightColor: 'red', borderTopColor: 'transparent', borderBottomColor: 'transparent' }}></View>
                    </Pressable>
                  </View>
                  <View style={{ flex: 1.2, alignItems: "center", justifyContent: "center" }}>
                    <TextInput placeholder={"0"} style={{ width: '80%', borderWidth: 1, padding: 10, fontSize: 20 }}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    multiline={true}
                    onContentSizeChange={handleContentSizeChange}
                    keyboardType={"numeric"}
                    maxLength={1}
                    className="text-slate-100"
                    >
                    </TextInput>
                  </View>
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Pressable onPress={() => {setCardNumber(cardNumber === "9" ? cardNumber : String(Number(cardNumber) + 1))}}>
                      <View style={{ width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 20, borderTopWidth: 10, borderBottomWidth: 10, borderLeftColor: 'green', borderTopColor: 'transparent', borderBottomColor: 'transparent' }}></View>
                    </Pressable>
                  </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container6: {
        marginTop: 5,
        marginBottom: 5,
      },
    container4: {
        flexDirection: "row",
        paddingLeft: 0,
        alignItems: "center",
        flex: 1,
      },
      image2: {
        flexDirection: "row",
        width: 50,
        height: 70,
        borderWidth: 1,
        padding: 1,
        flex: 1,
      },
})