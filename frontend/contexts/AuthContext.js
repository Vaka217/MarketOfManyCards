import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import marketAPI from "../api/MarketAPI";
import axios from "axios";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {
        ...state,
        errorMessage: "",
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "", userId: null };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const navigation = useNavigation();
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigation.navigate("Main");
  } else {
    navigation.navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ email, password, nickname, contact, navigation }) => {
    try {
      console.log(email, password, nickname, contact);
      const response = await axios.post("http://18.229.90.36:3000/signup", {
        email,
        password,
        nickname,
        contact,
      });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signin",
        payload: { token: response.data.token, userId: response.data.userId },
      });
      navigation.navigate("Signin");
    } catch (err) {
      console.log("Axios Error:", err.message);
      console.log("Response Data:", err.response?.data);
      console.log("Response Status:", err.response?.status);
      console.log("Response Headers:", err.response?.headers);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password, navigation }) => {
    try {
      const response = await axios.post("http://18.229.90.36:3000/signin", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signin",
        payload: { token: response.data.token, userId: response.data.userId },
      });
      console.log(response.data.userId);
      navigation.navigate("Home");
    } catch (err) {
      console.log("Axios Error:", err.message);
      console.log("Response Data:", err.response?.data);
      console.log("Response Status:", err.response?.status);
      console.log("Response Headers:", err.response?.headers);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

const signout =
  (dispatch) =>
  async ({ navigation }) => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigation.navigate("Log");
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, userId: null, errorMessage: "" }
);
