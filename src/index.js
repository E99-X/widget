import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { myTheme } from "./myTheme";
import '@mysten/dapp-kit/dist/index.css';
import './index.css';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

window.initTokenSaleWidget = (config) => {
  const widgetContainer = document.createElement('div');
  const rootElement = document.getElementById(config.containerId) || document.body; // Fallback to body

  rootElement.appendChild(widgetContainer);

  // Rendering the widget (React Component)
  ReactDOM.createRoot(widgetContainer).render(
    <App 
      customColors={config.customColors} 
      avatarUrl={config.avatarUrl}
      saleId={config.saleId}
      tokenType={config.tokenType}
      adminCapId={config.adminCapId}
    />
  );
};

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
});
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect theme={myTheme} className="outlined">
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
