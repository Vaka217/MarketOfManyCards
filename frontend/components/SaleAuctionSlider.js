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
        <View style={{ flex: 1 }}>
            <Pressable style={styles.sliderBackground} onPress={() => {setIsSale(!isSale)}} className="flex-1 items-center justify-center bg-slate-700">
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
        marginLeft: 25,
        marginRight: 25,
        marginTop: 2,
        marginBottom: 2,
    },
    sliderButtonAuction: {
        flex: 1,
        backgroundColor:'rgb(3 105 161)',
        borderRadius: 180,
        width: '50%',
        marginLeft: '50%',
        alignItems: "center",
        justifyContent: "center",
    },
    sliderButtonSale: {
        flex: 1,
        backgroundColor:'rgb(3 105 161)',
        borderRadius: 180,
        width: '50%',
        marginRight: '50%',
        alignItems: "center",
        justifyContent: "center"
    }
});
