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

// **Expose TokenSaleWidget globally to the window object here**
if (typeof window !== "undefined") {
  window.TokenSaleWidget = initTokenSaleWidget;
  console.log(
    "TokenSaleWidget has been assigned to window:",
    window.TokenSaleWidget
  );
}

// **Expose initTokenSaleWidget function here**
export default function initTokenSaleWidget(config = {}) {
  const { containerId, customColors, avatarUrl, saleId } = config;

  if (!containerId) {
    console.error("containerId is required");
    return;
  }

  const hostContainer = document.getElementById(containerId);
  if (!hostContainer) {
    console.error(`No element found with id="${containerId}"`);
    return;
  }

  const mountEl = document.createElement("div");
  mountEl.classList.add("eggxWidgetRoot");

  // Append the widget inside the target container
  hostContainer.appendChild(mountEl);

  ReactDOM.createRoot(mountEl).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider
            autoConnect
            theme={myTheme}
            slushWallet={{ name: "TokenSaleWidget" }}
            stashedWallet={{ name: "TokenSaleWidget" }}
          >
            <App
              customColors={customColors || {}}
              avatarUrl={avatarUrl || ""}
              saleId={saleId || ""}
            />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

// Rendering for your regular React app
const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider
            autoConnect
            theme={myTheme}
            className="outlined"
            slushWallet={{ name: "TokenSaleWidget" }}
            stashedWallet={{ name: "TokenSaleWidget" }}
          >
            <div className="eggxWidgetRoot">
              <App />
            </div>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
