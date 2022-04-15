import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import store from "./store";
// import './index.css';
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query fetchCategories {
//         scandiwebCategories: categories {
//           name
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result, typeof result));

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
      {/* <Provider store={store}>
        <App />
      </Provider> */}
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// const root = ReactDOM.createRoot(
//   document.getElementById('root')
// );
// root.render(App);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
