import React, { useEffect, useState } from "react";
import { ConnectButton, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { SALE_ID, TOKEN_TYP, ADMIN_CAP, PACKAGE_ID } from "./constants/sale";
import Stat from "./components/Stat";
import AdminWidget from "./components/AdminWidget";
import BuyWidget from "./components/BuyWidget";
import Countdown from "./components/Countdown";
import Button from "./components/Button";
import { useSaleSummary } from "./hooks/useSaleSummary";
import { useSaleStage } from './hooks/useSaleStage';

const App = ({ customColors = {} }) => {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { summary: saleSummary, isLoading: loadingSummary, isError: isSummaryError, error: summaryError } = useSaleSummary(SALE_ID);
  const { stageView, isLoading: loadingStage, isError: isStageError, error: stageError } = useSaleStage(SALE_ID);

  const [isAdmin, setIsAdmin] = useState(false);

   // Read URL query parameters
   const urlParams = new URLSearchParams(window.location.search);
   const saleId = urlParams.get("saleId");
   const adminCapId = urlParams.get("adminCapId");
   const tokenType = urlParams.get("tokenType");
   
   const primaryColor = urlParams.get("--primary-color") || '#a19d9d';
   const bgrColor = urlParams.get("--bgr-color") || '#151516';
   const accentColor = urlParams.get("--accent-color") || '#f8df00';
   const avatarUrl = urlParams.get("avatarUrl");

   // In the iframe widget component
useEffect(() => {
  const handleMessage = (event) => {
    // Make sure the message is coming from the expected origin
    if (event.origin !== "http://localhost:3000") return; // Update with actual parent domain
    
    if (event.data.type === "walletStatus") {
      // Handle the wallet status here
      console.log("Received wallet status from parent:", event.data.account);
      // You can trigger wallet connection logic or update the iframe UI here
    }
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, []);


  useEffect(() => {
    if (account && saleSummary?.admin) {
      const adminAddr = saleSummary.admin;
      console.log(adminAddr);
      setIsAdmin(account.address === adminAddr);
    }
  }, [account, saleSummary]);

  const handleDisconnect = () => {
    disconnect();
  };

  // Apply dynamic color styles to the root
  useEffect(() => {
    const colors = {
      primaryColor: customColors.primaryColor || '#a19d9d',
      bgrColor: customColors.bgrColor || '#151516',
      accentColor: customColors.accentColor || '#f8df00',
    };

    // Dynamically change CSS variables based on passed custom colors
    const primaryRgb = hexToRgb(colors.primaryColor);
    if (primaryRgb) {
      // Set primary color RGB values for dynamic light/dark text
      document.documentElement.style.setProperty('--primary-color-r', primaryRgb.r);
      document.documentElement.style.setProperty('--primary-color-g', primaryRgb.g);
      document.documentElement.style.setProperty('--primary-color-b', primaryRgb.b);
    }

    document.documentElement.style.setProperty('--bgr-color', colors.bgrColor);
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
  }, [customColors]);

  // Function to convert hex to rgb
  const hexToRgb = (hex) => {
    const result = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex);
    if (!result) return null;
    let r = parseInt(result[1].substring(0, 2), 16);
    let g = parseInt(result[1].substring(2, 4), 16);
    let b = parseInt(result[1].substring(4, 6), 16);
    return { r, g, b };
  };

  return (
    <div className="container">
      <Countdown
        summary={saleSummary}
        stageView={stageView}
        customColors={{ primaryColor, bgrColor, accentColor }}
      />

      <div className="w-100">
        {isAdmin ? (
          <AdminWidget
            saleId={SALE_ID}
            packageId={PACKAGE_ID}
            adminCapId={ADMIN_CAP}
            tokenType={TOKEN_TYP}
            summary={saleSummary}
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
          />
        ) : (
          <BuyWidget
            saleId={SALE_ID}
            package_id={PACKAGE_ID}
            tokenType={TOKEN_TYP}
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
            account={account}
            avatarUrl={avatarUrl}
          />
        )}

        {account ? (
          <Button
            label="Disconnect"
            onClick={handleDisconnect}
            style="button secondary"
          />
        ) : (
          <ConnectButton className="button secondary" />
        )}
      </div>

      <Stat
        summary={saleSummary}
        stageView={stageView}
        isSummaryLoading={loadingSummary}
        isStageLoading={loadingStage}
        isSummaryError={isSummaryError}
        isStageError={isStageError}
        summaryError={summaryError}
        stageError={stageError}
        customColors={{ primaryColor, bgrColor, accentColor }}
      />
      <div className="footer w-100 text-center">
      <p>© 2025 EggX. All rights reserved.</p>
      </div>
    </div>
  );
};

export default App;
