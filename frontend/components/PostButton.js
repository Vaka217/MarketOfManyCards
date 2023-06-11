//import { useEffect, useState } from '@react-navigation/native';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

export function PostButton({ post, images, price, description, postType, resetEverything }) {
    const [postCheck, setPostCheck] = useState(false);
    const generatePost = () => {
        console.log('Post content (Cards and number of each): ');
        console.log(post);
        console.log('User photos for the post: ');
        console.log(images);
        console.log('Description: ');
        console.log(description);
        console.log('Type of Post (Sale/Auction): ');
        postType === true ? console.log("Sale") : console.log("Auction");
        postType === true ? console.log('Price: ') : console.log('Base price: ');
        console.log(price);
        setPostCheck(!postCheck);
    };
    useEffect(() => {
        resetEverything();
    }, [postCheck]);
    return (
        <View>
            <Pressable onPress={generatePost} style={styles.button} className="bg-orange-500">
                <Text style= {styles.text} className="text-slate-100 font-mono">
                    Post
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "monospace", 
        color: "#DEDEDE",
    },
    button: {
        width: 80,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
});