import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	link: createHttpLink({ uri: "//localhost:4000" }),
	cache: new InMemoryCache(),
	resolvers: {
		Movie: {
			isLiked: () => false,
		},
		Mutation: {
			toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
				cache.modify({
					id: `Movie:${id}`,
					fields: {
						isLiked: () => !isLiked,
					},
				});
			},
		},
	},
});

export default client;
