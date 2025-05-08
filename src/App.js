import React, { useEffect, useState, useRef  } from "react";
import { ConnectButton, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "./constants/contract";
import Stat from "./components/Stat";
import AdminWidget from "./components/AdminWidget";
import BuyWidget from "./components/BuyWidget";
import Countdown from "./components/Countdown";
import Button from "./components/Button";
import { useSaleSummary } from "./hooks/useSaleSummary";
import { useSaleStage } from './hooks/useSaleStage';

const App = ({ customColors = {}, avatarUrl = "", saleId, tokenType, adminCapId }) => {
  const rootRef = useRef(null);
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
    const el = rootRef.current;
    if (!el) return;

    el.style.setProperty("--primary-color", primaryColor);
    el.style.setProperty("--bgr-color", bgrColor);
    el.style.setProperty("--accent-color", accentColor);

    const rgb = hexToRgb(primaryColor);
    if (rgb) {
      el.style.setProperty("--primary-color-r", rgb.r);
      el.style.setProperty("--primary-color-g", rgb.g);
      el.style.setProperty("--primary-color-b", rgb.b);
    }
  }, [primaryColor, bgrColor, accentColor]);

  const hexToRgb = (hex) => {
    const m = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex);
    if (!m) return null;
    const full = m[1].length === 3
      ? m[1].split("").map((c) => c + c).join("")
      : m[1];
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return { r, g, b };
  };

  return (
    <div ref={rootRef} className="eggxWidgetRoot widgetContainerImg">
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
            styling="secondary"
            onClick={handleDisconnect}
            customColors={customColors}
            
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
