import React, { useEffect, useState, useRef } from "react";
import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { PACKAGE_ID } from "./constants/contract";
import Stat from "./components/Stat";
import EndStat from "./components/EndStat";
import AdminWidget from "./components/AdminWidget";
import BuyWidget from "./components/BuyWidget";
import Countdown from "./components/Countdown";
import Button from "./components/Button";
import { useSaleSummary } from "./hooks/useSaleSummary";
import { useSaleStage } from "./hooks/useSaleStage";
import defaultAvatar from "./assets/symbol.svg";

const App = ({ customColors = {}, avatarUrl, saleId }) => {
  const finalAvatarUrl = avatarUrl || defaultAvatar;
  const rootRef = useRef(null);
  const {
    primaryColor = "#a19d9d",
    bgrColor = "#1c1c1e",
    accentColor = "#f8df00",
  } = customColors;

  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const {
    summary: saleSummary,
    isLoading: loadingSummary,
    isError: isSummaryError,
    error: summaryError,
  } = useSaleSummary(saleId);
  const {
    stageView,
    isLoading: loadingStage,
    isError: isStageError,
    error: stageError,
  } = useSaleStage(saleId);

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

    el.style.setProperty("--widget-primary-color", primaryColor);
    el.style.setProperty("--widget-bgr-color", bgrColor);
    el.style.setProperty("--widget-accent-color", accentColor);

    const primaryRgb = hexToRgb(primaryColor);
    const bgrRgb = hexToRgb(bgrColor);

    if (primaryRgb) {
      el.style.setProperty("--widget-primary-color-r", primaryRgb.r);
      el.style.setProperty("--widget-primary-color-g", primaryRgb.g);
      el.style.setProperty("--widget-primary-color-b", primaryRgb.b);
    }

    if (bgrRgb) {
      const { h, s, l } = rgbToHsl(bgrRgb);

      const darkL = Math.max(6, l - 2); // stays near #151516
      const lightL = Math.min(20, l + 6); // subtle brighter tone

      el.style.setProperty("--widget-bgr-dark", `hsl(${h}, ${s}%, ${darkL}%)`);
      el.style.setProperty(
        "--widget-bgr-light",
        `hsl(${h}, ${s}%, ${lightL}%)`
      );
    }
  }, [primaryColor, bgrColor, accentColor]);

  const hexToRgb = (hex) => {
    const m = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex);
    if (!m) return null;
    const full =
      m[1].length === 3
        ? m[1]
            .split("")
            .map((c) => c + c)
            .join("")
        : m[1];
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return { r, g, b };
  };

  const rgbToHsl = ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
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
            account={account}
            saleId={saleId}
            tokenType={saleSummary?.tokenType}
            packageId={PACKAGE_ID}
            summary={saleSummary}
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
          />
        ) : (
          <BuyWidget
            saleId={saleId}
            tokenType={saleSummary?.tokenType}
            package_id={PACKAGE_ID}
            stageView={stageView}
            customColors={{ primaryColor, bgrColor, accentColor }}
            account={account}
            avatarUrl={finalAvatarUrl}
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
            style={{ padding: "var(--button-padding)" }}
          />
        )}
      </div>

      {saleSummary && saleSummary.saleState === "Finalized" ? (
        <EndStat
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
      ) : (
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
      )}

      <div className="footer w-100 text-center m-top-md ">
        <p>© 2025 EggX. All rights reserved.</p>
      </div>
    </div>
  );
};

export default App;
