import React, { useState, useEffect } from "react";
import Button from "./Button";
import Toggle from "./Toggle";
import { useAdvanceSale } from "../hooks/useAdvanceSale";
import { useAutopilotToggle } from "../hooks/useAutopilotToggle";
import useAdminCap from "../hooks/useAdminCap";

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

  const adminCapId = useAdminCap(saleId, tokenType, account?.address);

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
      <p style={{ fontSize: 12, opacity: 0.7 }}>
        AdminCap ID: {adminCapId || "null"}
      </p>
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
        ""
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
