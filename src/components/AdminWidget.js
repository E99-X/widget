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
          <span className="text-accent">{saleState}</span>
        </p>
        <p className="m-t-b">
          Stage starts when tokens sold out or countdown is over.
          Use Autopilot to automate the launch immediately on these triggers.
        </p>
      </div>
      {saleState == "Finalized" ? (
        <p className="m-t-b">Token Sale is {saleState}</p>
      ) : (
        <>
          {saleState == "Not Started" ? (
            <div>
              <p className="margin-top text-primary">Start Token Sale Immediately</p>
              <Button
                label={isSubmitting ? "Launching…" : "Start Sale"}
                style="primary"
                onClick={advanceSale}
                disabled={isSubmitting}
                customColors={customColors}
              />
            </div>
          ) : (
            <div>
              <p className="m-t-b text-primary">Set to Autopilot</p>
              <Toggle
                isEnabled={isAutopilotEnabled}
                onToggle={toggleAutopilot}
                disabled={isAutopilotSubmitting}
                customColors={customColors}
              />
              <p className="margin-top text-primary">Start new Stage when ready</p>
              <Button
                label={isSubmitting ? "Launching…" : `Start Stage ${stageNumber + 1}`}
                style="primary"
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
