import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Context
import { UserContext } from "../context/UserContext";

//Stack
import AuthStackScreen from "./AuthStackScreen";
import MainStackScreens from "./MainStackScreen";
import LoadingScreen from "../screens/LoadingScreen";

export default AppStackScreen = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);

  return (
    <AppStack.Navigator headerMode="none">
      {user.isLoggedIn === null ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <AppStack.Screen name="Main" component={MainStackScreens} />
      ) : (
        <AppStack.Screen name="Auth" component={AuthStackScreen} />
      )}
    </AppStack.Navigator>
  );
};
