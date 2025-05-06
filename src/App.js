import React, { useEffect, useState } from "react";
import { ConnectButton, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "./constants/sale";  
import Stat from "./components/Stat";
import AdminWidget from "./components/AdminWidget";
import BuyWidget from "./components/BuyWidget";
import Countdown from "./components/Countdown";
import Button from "./components/Button";
import { useSaleSummary } from "./hooks/useSaleSummary";
import { useSaleStage } from './hooks/useSaleStage';

const App = ({ customColors = {}, avatarUrl = "", saleId, tokenType, adminCapId }) => {

  const {
    primaryColor = "#a19d9d",  
    bgrColor = "#151516",    
    accentColor = "#f8df00"  
  } = customColors;

  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { summary: saleSummary, isLoading: loadingSummary, isError: isSummaryError, error: summaryError } = useSaleSummary(saleId);
  const { stageView, isLoading: loadingStage, isError: isStageError, error: stageError } = useSaleStage(saleId);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (account && saleSummary?.admin) {
      const adminAddr = saleSummary.admin;
      setIsAdmin(account.address === adminAddr);
    }
  }, [account, saleSummary]);

  const handleDisconnect = () => {
    disconnect();
  };


  useEffect(() => {
    const primaryRgb = hexToRgb(primaryColor);
    if (primaryRgb) {

      document.documentElement.style.setProperty('--primary-color-r', primaryRgb.r);
      document.documentElement.style.setProperty('--primary-color-g', primaryRgb.g);
      document.documentElement.style.setProperty('--primary-color-b', primaryRgb.b);
    }

    document.documentElement.style.setProperty('--bgr-color', bgrColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [primaryColor, bgrColor, accentColor]);

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
            saleId={saleId}     
            packageId={PACKAGE_ID}  
            adminCapId={adminCapId} 
            tokenType={tokenType}  
            summary={saleSummary}
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
          />
        ) : (
          <BuyWidget
            saleId={saleId}    
            package_id={PACKAGE_ID} 
            tokenType={tokenType}
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
            account={account}
            avatarUrl={avatarUrl} 
          />
        )}

        {account ? (
          <Button
            label="Disconnect"
            style="secondary"
            onClick={handleDisconnect}
          />
        ) : (
          <ConnectButton 
          className="button secondary"
          style={{
            color: primaryColor, 
            padding: "var(--button-padding)",  
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
    </div>
  
  );
};

export default App;
