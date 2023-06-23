import React, {useState} from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Input, Button } from 'react-native-elements';

const FormModal = ({ isModal, toggleModal }) => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <View className="justify-center flex-1" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>           
            <View className="bg-sky-900 p-2 m-8 rounded-lg items-center">
                <TouchableWithoutFeedback onPress={() => toggleModal(!isModal)}>
                    <FontAwesome name="close" size={24} color="white" style={{ alignSelf: "flex-end" }} />
                </TouchableWithoutFeedback>
                <Input
                    label="Nickname"
                    value={nickname}
                    onChangeText={setNickname}
                    autoCapitalize="none"
                    autoCorrect={false}
                    labelStyle={styles.label}
                    inputStyle={styles.label}
                />
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    labelStyle={styles.label}
                    inputStyle={styles.label}
                />
                    <Input
                        label="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        autoCapitalize="none"
                        autoCorrect={false}
                        labelStyle={styles.label}
                        inputStyle={styles.label}
                    />
                <Input
                    secureTextEntry
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    labelStyle={styles.label}
                    inputStyle={styles.label}
                />
                <Input
                    secureTextEntry
                    label="Password Confirmation"
                    value={confirmation}
                    onChangeText={setConfirmation}
                    autoCapitalize="none"
                    autoCorrect={false}
                    labelStyle={styles.label}
                    inputStyle={styles.label}
                />
                <Button
                    title="Confirm"
                    buttonStyle={{
                        backgroundColor: "rgb(249 115 22)",
                        borderRadius: 5,
                    }}
                    titleStyle={{ fontWeight: "bold", fontSize: 16 }}
                    containerStyle={{
                        height: 45,
                        width: 200,
                    }}
                    onPress={toggleModal}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  label: {
    color: "rgb(241 245 249)",
  },
});

export default FormModal;