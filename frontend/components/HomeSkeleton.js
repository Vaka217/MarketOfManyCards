import React from 'react';
import { View } from 'react-native';
import { Skeleton } from "./Skeleton"

export function HomeSkeleton({ chosenColor, cardHeight, textWidth, textHeight }) {
  const renderSkeletons = (count) => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <View key={i} style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
            <Skeleton width={cardHeight * 2.5 / 3.5} height={cardHeight} style={{ borderRadius: 10, margin: 5 }}/>
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton width={textWidth} height={textHeight} style={{ borderRadius: 10, margin: 5 }}/>
            <Skeleton width={textWidth} height={textHeight} style={{ borderRadius: 10, margin: 5 }}/>
            <Skeleton width={textWidth} height={textHeight} style={{ borderRadius: 10, margin: 5 }}/>
          </View>
        </View>
      );
    }
    return skeletons;
  };

  return (
    <View style={{ flex: 1, marginTop: 0, backgroundColor: chosenColor }}>
      {renderSkeletons(10)}
    </View>
  );
};
