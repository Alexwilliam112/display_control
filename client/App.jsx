import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./stacks/index.jsx";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </ApolloProvider>
  );
}
