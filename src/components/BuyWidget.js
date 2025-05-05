import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useBuyTokens } from "../hooks/useBuyTokens";
import symbol from "../assets/symbol.svg";

const BuyWidget = ({ saleId, package_id, tokenType, stageView, customColors, account, avatarUrl }) => {
  const [coinName, setCoinName] = useState("Huh?!");

  const {
    tokenAmount,
    setTokenAmount,
    inputError,
    suiAmount,
    handleInputChange,
    handleBuyTokens,
    isSubmitting,
    isSuccess,
  } = useBuyTokens({ saleId, package_id, tokenType, stageView });

  useEffect(() => {
    const extractCoinName = (tokenType) => {
      // Check if tokenType is valid and not undefined before calling split
      if (tokenType && typeof tokenType === "string") {
        const parts = tokenType.split("::");
        return parts.length > 2 ? parts[2] : "Huh?!";  // Get the coin name, or use fallback
      }
      return "Huh?!";  // Default fallback if tokenType is invalid
    };
    
    // Set coin name based on tokenType (fallback to default if undefined or invalid)
    setCoinName(extractCoinName(tokenType));
  }, [tokenType]);  // Ensure useEffect runs when tokenType changes

  useEffect(() => {
    if (isSuccess) {
      console.log("Transaction successful, resetting input.");
    }
  }, [isSuccess]);

  return (
    <div className="w-100">
      <div className="img-container w-100">
        <img src={avatarUrl || symbol} alt="Token" />
      </div>

      {/* Input field with dynamic border color */}
      <input
        type="number"
        value={tokenAmount}
        onChange={handleInputChange}
        placeholder="0"
        className=""
      />

      {inputError && <p className="">{inputError}</p>}

      <p className="stretch">
        <span>You pay:</span>{" "}
        <span className="text-primary">{suiAmount > 0 ? suiAmount.toFixed(2) : "0.00"} SUI</span>
      </p>

      <Button
        label={`Buy ${coinName}`}
        style="primary"
        onClick={handleBuyTokens}
        disabled={!account || !!inputError || !tokenAmount || isSubmitting}
        customColors={customColors}
      />
    </div>
  );
};

export default BuyWidget;
