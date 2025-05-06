import React, { useEffect, useState } from "react";
import { ConnectButton, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "./constants/sale";  // Only import PACKAGE_ID as a constant
import Stat from "./components/Stat";
import AdminWidget from "./components/AdminWidget";
import BuyWidget from "./components/BuyWidget";
import Countdown from "./components/Countdown";
import Button from "./components/Button";
import { useSaleSummary } from "./hooks/useSaleSummary";
import { useSaleStage } from './hooks/useSaleStage';

const App = ({ customColors = {}, avatarUrl = "", saleId, tokenType, adminCapId }) => {
  // Default color settings (in case the user doesn't provide them)
  const {
    primaryColor = "#a19d9d",  // Default primary color
    bgrColor = "#151516",      // Default background color
    accentColor = "#f8df00"    // Default accent color
  } = customColors;

  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { summary: saleSummary, isLoading: loadingSummary, isError: isSummaryError, error: summaryError } = useSaleSummary(saleId);
  const { stageView, isLoading: loadingStage, isError: isStageError, error: stageError } = useSaleStage(saleId);

  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the current account is an admin
  useEffect(() => {
    if (account && saleSummary?.admin) {
      const adminAddr = saleSummary.admin;
      setIsAdmin(account.address === adminAddr);
    }
  }, [account, saleSummary]);

  const handleDisconnect = () => {
    disconnect();
  };

  // Apply dynamic color styles to the root
  useEffect(() => {
    const primaryRgb = hexToRgb(primaryColor);
    if (primaryRgb) {
      // Dynamically set CSS variables based on passed custom colors
      document.documentElement.style.setProperty('--primary-color-r', primaryRgb.r);
      document.documentElement.style.setProperty('--primary-color-g', primaryRgb.g);
      document.documentElement.style.setProperty('--primary-color-b', primaryRgb.b);
    }

    document.documentElement.style.setProperty('--bgr-color', bgrColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [primaryColor, bgrColor, accentColor]);

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
            saleId={saleId}         // Now using dynamic `saleId` from user input
            packageId={PACKAGE_ID}  // Constant import for `PACKAGE_ID`
            adminCapId={adminCapId} // Dynamic `adminCapId` from user input
            tokenType={tokenType}   // Dynamic `tokenType` from user input
            summary={saleSummary}
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
          />
        ) : (
          <BuyWidget
            saleId={saleId}         // Using dynamic `saleId` here
            package_id={PACKAGE_ID} // Constant `PACKAGE_ID` here
            tokenType={tokenType}   // Dynamic `tokenType` from user input
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
            account={account}
            avatarUrl={avatarUrl}   // Passing dynamic `avatarUrl` here
          />
        )}

        {account ? (
          <Button
            label="Disconnect"
            styling="secondary"
            onClick={handleDisconnect}
            customColors={customColors}
            
          />
        ) : (
          <ConnectButton 
          className="button secondary"
          style={{
            color: primaryColor, 
            padding: "var(--button-padding)",      // Inline dynamic text color
          }} 
          />
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
      <AdminWidget
               saleId={saleId}         // Now using dynamic `saleId` from user input
               packageId={PACKAGE_ID}  // Constant import for `PACKAGE_ID`
               adminCapId={adminCapId} // Dynamic `adminCapId` from user input
               tokenType={tokenType}   // Dynamic `tokenType` from user input
               summary={saleSummary}
               stageView={stageView}
               customColors={{ primaryColor, bgrColor, accentColor }}/>
    </div>
  
  );
};

export default App;
