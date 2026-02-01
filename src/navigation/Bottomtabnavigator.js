import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Homescreen from "../screens/Homescreen";
import Cardsscreen from "../screens/Cardsscreen";
import Rewardsscreen from "../screens/Rewardsscreen";
import Morescreen from "../screens/Morescreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
        detachInactiveScreens={false}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const icons = {
              Home: focused ? "home" : "home-outline",
              Cards: focused ? "card" : "card-outline",
              Rewards: focused ? "gift" : "gift-outline",
              More: focused ? "menu" : "menu-outline",
            };
            const iconSize = typeof size === "number" ? size : 24;
            return <Ionicons name={icons[route.name]} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
          tabBarShowLabel: true,
        })}
      >
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Cards" component={Cardsscreen} />
        <Tab.Screen name="Rewards" component={Rewardsscreen} />
        <Tab.Screen name="More" component={Morescreen} />
      </Tab.Navigator>
  );
}
