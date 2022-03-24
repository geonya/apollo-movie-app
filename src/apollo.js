import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	link: createHttpLink({ uri: "//localhost:4000" }),
	cache: new InMemoryCache(),
});

export default client;
