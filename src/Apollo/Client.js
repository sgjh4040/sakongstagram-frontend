// import ApolloCient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {defaults, resolvers} from "./LocalState";
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import 'whatwg-fetch';
;
const httpLink = new createHttpLink({
  uri: process.env.NODE_ENV === "development"
  ? "http://localhost:4000"
  : "https://sakongstagram-backend.herokuapp.com/"
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.NODE_ENV === "development"
  ? "ws://localhost:4000"
  : "wss://sakongstagram-backend.herokuapp.com/",
  options: {
    reconnect: true
  }
});
const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  const cache = new InMemoryCache();
  
  const client= new ApolloClient({
    link: authLink.concat(link),
    cache,
    resolvers
  })
  cache.writeData({
    data: {
      isLoggedIn: !!localStorage.getItem('token')
    },
  });

  export default client;


// export default new ApolloCient({
//     uri:process.env.NODE_ENV === "development"
//     ? "http://localhost:4000"
//     : "https://sakongstagram-backend.herokuapp.com/",
//     clientState:{
//         defaults,
//         resolvers
//     },
//     request: async (operation)=>{
//         const token = await localStorage.getItem("token");
//         operation.setContext({
//             headers:{
//                 authorization: token ? `Bearer ${token}` : ''
//             }
//         })
//     }
// });
