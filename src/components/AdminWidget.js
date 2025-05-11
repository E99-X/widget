import React, { useState, useEffect } from "react";
import Button from "./Button";
import Toggle from "./Toggle";
import { useSuiClient } from "@mysten/dapp-kit";
import { useAdvanceSale } from "../hooks/useAdvanceSale";
import { useAutopilotToggle } from "../hooks/useAutopilotToggle";
import { PACKAGE_ID } from "../constants/contract";

const AdminWidget = ({
  account,
  saleId,
  tokenType,
  packageId,
  summary,
  stageView,
  customColors,
}) => {
  const { saleState } = summary || {};
  const sui = useSuiClient();
  const [adminCapId, setAdminCapId] = useState(null);

  useEffect(() => {
    if (!account?.address || !tokenType) return;

    const adminCapType = `${PACKAGE_ID}::admin_config::AdminCap<${tokenType}>`;
    console.log("🔍 Looking for adminCap of type:", adminCapType);

    sui
      .getOwnedObjects({ owner: account.address, options: { showType: true } })
      .then((res) => {
        console.log("📦 Owned objects:", res);
        const match = res.data.find((obj) => obj.data?.type === adminCapType);

        if (match?.data?.objectId) {
          console.log("✅ Found AdminCap ID:", match.data.objectId);
          setAdminCapId(match.data.objectId);
        } else {
          console.warn("❌ AdminCap not found for type:", adminCapType);
        }
      })
      .catch((err) => {
        console.error("🔥 Failed to fetch admin cap:", err);
      });
  }, [account?.address, tokenType, sui]);

  const { advanceSale, isSubmitting } = useAdvanceSale({
    packageId,
    saleId,
    adminCapId,
    tokenType,
  });

  const {
    isAutopilotEnabled,
    toggleAutopilot,
    isSubmitting: isAutopilotSubmitting,
  } = useAutopilotToggle(saleId, adminCapId, tokenType);

  const stageNumber = stageView?.stageNumber ?? 0;

  return (
    <div className="text-center">
      <div className="my-sm">
        <p className="m-top-sm flex">
          <span>Sale state: </span>
          <span style={{ color: customColors.accentColor }}>{saleState}</span>
        </p>
        <p className="my-sm">
          Stage starts when tokens are sold out or countdown is over. Use
          Autopilot to automate the launch immediately on these triggers.
        </p>
      </div>

      {saleState === "Finalized" ? (
        <p className="my-sm" style={{ color: customColors.primaryColor }}>
          Token Sale is {saleState}
        </p>
      ) : (
        <>
          {saleState === "Not Started" ? (
            <div>
              <p className="my-sm" style={{ color: customColors.primaryColor }}>
                Start Token Sale Immediately
              </p>
              <Button
                label={isSubmitting ? "Launching…" : "Start Sale"}
                styling="primary"
                onClick={advanceSale}
                disabled={isSubmitting || !adminCapId}
                customColors={customColors}
              />
            </div>
          ) : (
            <div>
              <p className="my-sm" style={{ color: customColors.primaryColor }}>
                Set to Autopilot
              </p>
              <Toggle
                isEnabled={isAutopilotEnabled}
                onToggle={toggleAutopilot}
                disabled={isAutopilotSubmitting || !adminCapId}
                customColors={customColors}
              />
              <p className="my-sm" style={{ color: customColors.primaryColor }}>
                Start new Stage when ready
              </p>
              <Button
                label={
                  isSubmitting ? "Launching…" : `Start Stage ${stageNumber + 1}`
                }
                styling="primary"
                onClick={advanceSale}
                disabled={isSubmitting || !adminCapId}
                customColors={customColors}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminWidget;
