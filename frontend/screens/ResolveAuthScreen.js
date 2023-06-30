import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    tryLocalSignin({ navigation });
  }, []);

  return null;
};

export default ResolveAuthScreen;
