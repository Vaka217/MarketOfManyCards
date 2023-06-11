import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { PostScreen } from "../screens/PostScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Home: "home",
            Settings: "gear",
            Profile: "user",
            Post: "sign-out",
          };

          return (
            <FontAwesome
              name={iconMap[route.name]}
              size={size * 1.1}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#11A88E",
        tabBarInactiveTintColor: "#DEDEDE",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 1,
          borderTopColor: "purple",
          padding: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
    </Tab.Navigator>
  );
}
