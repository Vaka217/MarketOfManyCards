import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CardScreen from "../screens/CardScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Home: "home",
            Profile: "user",
            Post: "sign-out",
          };

          return (
            <FontAwesome
              name={iconMap[route.name]}
              size={size * 1.5}
              color={color}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(249 115 22)",
        tabBarInactiveTintColor: "rgb(186 230 253)",
        tabBarStyle: {
          backgroundColor: "rgb(12 74 110)",
        },
        headerShown: false,
        tabBarHideOnKeyboard: true
      })}
    >
      <Tab.Screen name="Home">
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={HomeScreen} />
            <Stack.Screen name="Card" component={CardScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
