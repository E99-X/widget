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

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
});
const queryClient = new QueryClient();

export default function initTokenSaleWidget(config = {}) {
  const {
    containerId,
    customColors,
    avatarUrl,
    saleId,
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
            slushWallet={{ name: 'TokenSaleWidget' }}
            stashedWallet={{ name: 'TokenSaleWidget' }}
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
            slushWallet={{ name: 'TokenSaleWidget' }}
            stashedWallet={{ name: 'TokenSaleWidget' }}
          >
            <App />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
