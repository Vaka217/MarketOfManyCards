import React, { useContext } from "react";
import { SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from '../contexts/AuthContext';
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const LoginScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const navigation = useNavigation();

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
        headerText="Sign in to your Account!"
        submitButtonText="Sign In"
        onSubmit={signin}
        errorMessage={state.errorMessage}
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
