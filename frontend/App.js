import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./components/BottomNav";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
