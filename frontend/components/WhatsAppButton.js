import React from "react";
import { TouchableOpacity, Linking, Image } from "react-native";

const WhatsAppButton = ({ onSubmit, message }) => {

  return (
    <TouchableOpacity onPress={() => {
        onSubmit(message);
      }
    }>
      <Image
        source={require("../assets/WhatsappIcon.png")}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default WhatsAppButton;
