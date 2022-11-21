import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from '@apollo/client'
import { Routes } from "./routes";

import { client } from './lib/apollo'
import "./assets/base/base.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>
);
