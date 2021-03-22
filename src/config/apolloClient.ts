import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

// define the setup for the graphql client
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_API_URL, // coinbase api
    cache: new InMemoryCache(),
});

export default client;