import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import useDebounce from "../hooks/useDebounce";
import { useEffect } from "react";

const AuthForm = ({ headerText, submitButtonText, onSubmit, errorMessage }) => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [nicknameStrength, setNicknameStrength] = useState("");
  const debouncedPassword = useDebounce(password, 500);
  const debouncedNickname = useDebounce(nickname, 500);
  const navigation = useNavigation();

  const checkStrength = (value) => {
    const regex = /^.{8,}$/;

    if (regex.test(value)) {
      return "Strong";
    } else {
      return "Weak";
    }
  };

  useEffect(() => {
    const strength = checkStrength(debouncedPassword);
    setPasswordStrength(strength);
  }, [debouncedPassword]);

  useEffect(() => {
    const strength = checkStrength(debouncedNickname);
    setNicknameStrength(strength);
  }, [debouncedNickname]);

  return (
    <>
      <View className="m-4">
        <Text h3 className="text-slate-100">
          {headerText}
        </Text>
      </View>
      {headerText == "Sign up for MMC" && (
        <>
          <Input
            label="Nickname"
            value={nickname}
            onChangeText={setNickname}
            autoCapitalize="none"
            autoCorrect={false}
            labelStyle={styles.label}
            inputStyle={styles.label}
          />
          {nicknameStrength == "Weak" && nickname != "" && (
            <Text className="text-base text-red-600">Minimum 8 characters</Text>
          )}
        </>
      )}
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
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        labelStyle={styles.label}
        inputStyle={styles.label}
      />
      {headerText == "Sign up for MMC" && (
        <>
          {passwordStrength == "Weak" && password != "" && (
            <Text className="text-base text-red-600">Minimum 8 characters</Text>
          )}
          <Input
            label="Phone"
            value={contact}
            onChangeText={setContact}
            autoCapitalize="none"
            autoCorrect={false}
            labelStyle={styles.label}
            inputStyle={styles.label}
          />
        </>
      )}

      {errorMessage ? (
        <Text className="text-base text-red-600">{errorMessage}</Text>
      ) : null}
      <View className="m-4 items-center">
        <Button
          title={submitButtonText}
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgb(249 115 22)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 24 }}
          containerStyle={{
            height: 50,
            width: 200,
            justifyContent: "center",
          }}
          onPress={() => onSubmit({ email, password, navigation })}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "rgb(241 245 249)",
  },
});

export default AuthForm;
