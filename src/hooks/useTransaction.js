import { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";

export const useTransaction = (onSuccess, onError) => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const executeTransaction = (tx) => {
    setIsSubmitting(true); 

    signAndExecuteTransaction(
      { transaction: tx },
      {
        onSuccess: (result) => {
          onSuccess(result);
        },
        onError: (error) => {
          onError(error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  return { executeTransaction, isSubmitting };
};
