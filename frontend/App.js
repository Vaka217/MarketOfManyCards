import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSwitchNavigator } from "react-navigation-switch";
import { useColorScheme } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import { MyTabs } from "./components/BottomNav";

import { Provider as AuthProvider } from "./contexts/AuthContext";

const Switch = createSwitchNavigator();
const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={LoginScreen} />
      <Stack.Screen name="Signup" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Switch.Navigator>
          <Switch.Screen name="Log" component={StackNavigation} />
          <Switch.Screen name="Main" component={MyTabs} />
        </Switch.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
