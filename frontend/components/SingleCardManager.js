import { View, Image, Pressable, TextInput, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";

export function SingleCardManager({item, handleContentSizeChange, addCard}) {
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
                  </View>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                  <Pressable onPress={() =>{addCard(item)}}>
                    <Text>
                      Select this card to post
                    </Text>
                  </Pressable>
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