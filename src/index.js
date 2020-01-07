import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { ApolloProvider } from "react-apollo-hooks";
import Client from './Apollo/Client';
import 'babel-polyfill';
import "core-js/stable";
import "regenerator-runtime/runtime";
import 'react-app-polyfill/ie9';


ReactDOM.render(<ApolloProvider client={Client}><App /></ApolloProvider>, document.getElementById('root'));

