import React, { useContext } from "react";
import { SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from '../contexts/AuthContext';
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center border bg-sky-900"
      style={{}}
    >
      <Image
        source={require("../assets/WhiteLogo.png")}
        className="h-44 w-40"
      />
      <AuthForm
        headerText="Sign up for MMC"
        submitButtonText="Sign Up"
        onSubmit={signup}
        errorMessage={state.errorMessage}
      />
      <NavLink
        text="Already have an account? Sign in instead!"
        routeName="Signin"
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;
