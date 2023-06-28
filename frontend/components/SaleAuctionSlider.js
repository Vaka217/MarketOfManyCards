import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

export function SaleAuctionSlider( {isSale, setIsSale} ) {
    const [postType, setPostType] = useState('Sale');
    const [styleType, setStyleType] = useState(styles.sliderButtonSale);

    useEffect(() => {
        isSale === false ? setPostType('Auction') : setPostType('Sale');
        isSale === false ? setStyleType(styles.sliderButtonAuction) : setStyleType(styles.sliderButtonSale);
    }, [isSale]);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Pressable style={styles.sliderBackground} onPress={() => {setIsSale(!isSale)}}>
                <View style={styleType}>
                    <Text className="text-slate-100">
                        {postType}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    sliderBackground: {
        borderRadius: 180,
        width: '80%',
        backgroundColor: "rgb(12, 74, 110)",
        aspectRatio: 6/1
    },
    sliderButtonAuction: {
        flex: 1,
        backgroundColor:'rgb(249, 115, 22)',
        borderRadius: 180,
        width: '50%',
        marginLeft: '50%',
        alignItems: "center",
        justifyContent: "center",
    },
    sliderButtonSale: {
        flex: 1,
        backgroundColor:'rgb(249, 115, 22)',
        borderRadius: 180,
        width: '50%',
        marginRight: '50%',
        alignItems: "center",
        justifyContent: "center"
    }
});
