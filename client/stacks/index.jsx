import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "../pages/home.jsx";
import ArticlePage from "../pages/articles.jsx";

const Stack = createNativeStackNavigator();

export default MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Homepage} />
      <Stack.Screen name="articlePage" component={ArticlePage} />
    </Stack.Navigator>
  );
};
