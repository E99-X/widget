// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { myTheme } from "./myTheme";
import "@mysten/dapp-kit/dist/index.css";
import "./index.css";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prepare shared clients/networks
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
});
const queryClient = new QueryClient();

// 1) The embeddable widget initializer
export default function initTokenSaleWidget(config = {}) {
  const {
    containerId,
    saleId,
    customColors,
    avatarUrl,
    tokenType,
    adminCapId,
  } = config;

  if (!containerId) {
    console.error("Container ID is required");
    return;
  }

  const mountEl = document.createElement("div");
  ;(document.getElementById(containerId) || document.body).appendChild(
    mountEl
  );

  ReactDOM.createRoot(mountEl).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          networks={networkConfig}
          defaultNetwork="testnet"
        >
          <WalletProvider
            autoConnect
            theme={myTheme}
            className="outlined"
          >
            <App
              customColors={customColors || {}}
              avatarUrl={avatarUrl || ""}
              saleId={saleId || ""}
              tokenType={tokenType || "default"}
              adminCapId={adminCapId || ""}
            />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

// 2) Standalone (CRA) mount only if there's a <div id="root">
const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          networks={networkConfig}
          defaultNetwork="testnet"
        >
          <WalletProvider
            autoConnect
            theme={myTheme}
            className="outlined"
          >
            <App />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
