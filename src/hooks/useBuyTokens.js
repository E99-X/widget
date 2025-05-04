import { useState, useEffect } from "react";
import { useTransaction } from "./useTransaction";
import { floatToFixed, isValidPositiveNumber, getMaxInputFloat } from '../utils/formatter';
import { Transaction } from '@mysten/sui/transactions';

export const useBuyTokens = ({ saleId, package_id, tokenType, stageView }) => {
  const { executeTransaction, isSubmitting } = useTransaction(
    (result) => {
      console.log("Transaction successful:", result);
      setTokenAmount("");
      alert("Purchase successful!");
    },
    (error) => {
      console.error("Transaction failed:", error);
      alert("An error occurred during the purchase.");
    }
  );
  const [tokenAmount, setTokenAmount] = useState("");
  const [price, setPrice] = useState(0);
  const [suiAmount, setSuiAmount] = useState(0);
  const [inputError, setInputError] = useState(null);

  const maxInput = getMaxInputFloat();

  useEffect(() => {
    setPrice(stageView?.price || 0);
  }, [stageView]);

  useEffect(() => {
    if (!isValidPositiveNumber(tokenAmount)) {
      setInputError("Invalid number");
      setSuiAmount(0);
      return;
    }
    const amt = Number(tokenAmount);
    if (amt > maxInput) {
      setInputError(`Max allowed is ${maxInput.toFixed(6)}`);
      setSuiAmount(0);
      return;
    }
    setInputError(null);
    setSuiAmount(price * amt);
  }, [tokenAmount, price, maxInput]);

  const handleInputChange = (e) => {
    const v = e.target.value;
    if (v === "" || isValidPositiveNumber(v)) {
      setTokenAmount(v);
    }
  };

  const handleBuyTokens = async () => {
    setInputError(null);
    const amt = Number(tokenAmount);

    if (isNaN(amt) || amt <= 0) {
      setInputError("Must be greater than zero");
      return;
    }

    if (amt > maxInput) {
      setInputError(`Max allowed is ${maxInput.toFixed(6)}`);
      return;
    }

    const tx = new Transaction();
    const amountInMist = BigInt(floatToFixed(tokenAmount));
    const totalCostInMist = floatToFixed(suiAmount);
    const [paymentCoin] = tx.splitCoins(tx.gas, [
      tx.pure.u64(totalCostInMist),
    ]);

    tx.moveCall({
      target: `${package_id}::sale_utils::buy_tokens`,
      arguments: [
        tx.object(saleId),
        tx.pure.u64(amountInMist),
        paymentCoin,
        tx.object.clock(),
      ],
      typeArguments: [tokenType],
    });

    executeTransaction(tx);
  };

  return {
    tokenAmount,
    setTokenAmount,
    inputError,
    suiAmount,
    handleInputChange,
    handleBuyTokens,
    isSubmitting,
  };
};
