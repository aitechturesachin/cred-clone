import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./Mainnavigator";

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
