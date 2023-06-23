import React from "react";
import { TouchableOpacity, Linking, Image, View } from "react-native";

const WhatsAppButton = () => {
  const handleWhatsAppPress = () => {
    const phoneNumber = "59895881582"; // Esto debería tener el contacto del seller
    const message = "Que onda pa ando probando el botón que envía mensajes"; // Y esto otro mensaje mejor escrito xd

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("WhatsApp is not installed on this device.");
        }
      })
      .catch((error) => console.log("Error opening WhatsApp:", error));
  };

  return (
    <TouchableOpacity onPress={handleWhatsAppPress}>
      <Image
        source={require("../assets/WhatsappIcon.png")}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default WhatsAppButton;
