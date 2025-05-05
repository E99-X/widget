// useAutopilotToggle.js
import { useState, useEffect } from "react";
import { useTransaction } from "./useTransaction";
import { AUTOPILOT, AUTO_PACKAGE_ID } from "../constants/sale";
import { Transaction } from "@mysten/sui/transactions";
import { useAutopilotStatus } from "./useAutopilotStatus";

export const useAutopilotToggle = (saleId, adminCapId, tokenType) => {
  const [isAutopilotEnabled, setIsAutopilotEnabled] = useState(false);
  const { data, isPending, isError } = useAutopilotStatus(AUTOPILOT, saleId);

  const { executeTransaction, isSubmitting } = useTransaction(
    (result) => {
      setIsAutopilotEnabled((prevState) => !prevState); // Toggle state after success
    },
    (error) => {
      console.error("Error occurred during autopilot toggle:", error);
    }
  );

  useEffect(() => {
    if (isPending || isError) return;
    setIsAutopilotEnabled(!!data?.data);
  }, [data, isError, isPending]);

  const toggleAutopilot = async () => {
    const endpoint = isAutopilotEnabled ? "autopilot_off" : "autopilot_on";
    const tx = new Transaction();

    tx.moveCall({
      target: `${AUTO_PACKAGE_ID}::autopilot_registry::${endpoint}`,
      arguments: [
        tx.object(saleId),
        tx.object(adminCapId),
        tx.object(AUTOPILOT),
      ],
      typeArguments: [tokenType],
    });

    await executeTransaction(tx);
  };

  return { isAutopilotEnabled, toggleAutopilot, isSubmitting };
};
