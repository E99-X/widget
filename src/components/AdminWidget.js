// AdminWidget.js
import React, { useState } from "react";
import Button from "./Button";
import Toggle from "./Toggle";
import { useAdvanceSale } from "../hooks/useAdvanceSale";
import { useAutopilotToggle } from "../hooks/useAutopilotToggle";

const AdminWidget = ({
  saleId,
  packageId,
  adminCapId,
  tokenType,
  summary,
  stageView,
  customColors
}) => {
  const { saleState } = summary || {};
  const { advanceSale, isSubmitting } = useAdvanceSale({
    packageId,
    saleId,
    adminCapId,
    tokenType,
  });

  const { isAutopilotEnabled, toggleAutopilot, isSubmitting: isAutopilotSubmitting } = useAutopilotToggle(saleId, adminCapId, tokenType);
  const stageNumber = stageView ? stageView.stageNumber : 0;

  return (
    <div className="text-center">
      <div className="m-t-b">

        <p className="margin-top flex">
          <span className="">Sale state:</span>
          <span style={{color: customColors.accentColor}}>{saleState}</span>
        </p>
        <p className="m-t-b">
          Stage starts when tokens sold out or countdown is over.
          Use Autopilot to automate the launch immediately on these triggers.
        </p>
      </div>
      {saleState == "Finalized" ? (
        <p className="m-t-b" style={{color: customColors.primaryColor}}>Token Sale is {saleState}</p>
      ) : (
        <>
          {saleState == "Not Started" ? (
            <div>
              <p className="margin-top text-primary" style={{color: customColors.primaryColor}}>Start Token Sale Immediately</p>
              <Button
                label={isSubmitting ? "Launching…" : "Start Sale"}
                styling="primary"
                onClick={advanceSale}
                disabled={isSubmitting}
                customColors={customColors}
              />
            </div>
          ) : (
            <div>
              <p className="m-t-b" style={{color: customColors.primaryColor}}>Set to Autopilot</p>
              <Toggle
                isEnabled={isAutopilotEnabled}
                onToggle={toggleAutopilot}
                disabled={isAutopilotSubmitting}
                customColors={customColors}
                style={{color: customColors.accentColor}}
              />
              <p className="margin-top" style={{color: customColors.primaryColor}}>Start new Stage when ready</p>
              <Button
                label={isSubmitting ? "Launching…" : `Start Stage ${stageNumber + 1}`}
                styling="primary"
                onClick={advanceSale}
                disabled={isSubmitting}
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
