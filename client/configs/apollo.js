import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: "https://9pn9pn4q-4000.asse.devtunnels.ms/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
