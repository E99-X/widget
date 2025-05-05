import { useTransaction } from "./useTransaction";
import { Transaction } from "@mysten/sui/transactions";

export function useAdvanceSale({ packageId, saleId, adminCapId, tokenType }) {
  const { executeTransaction, isSubmitting } = useTransaction(
    (result) => {
      console.log("Sale advanced successfully:", result);
    },
    (error) => {
      const errorMessage = handleContractError(error);
      alert(errorMessage);
    }
  );

  const advanceSale = async () => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::sale_utils::advance_sale`,
      arguments: [
        tx.object(saleId),
        tx.object(adminCapId),
        tx.object.clock(),
      ],
      typeArguments: [tokenType],
    });

    await executeTransaction(tx);
  };

  return { advanceSale, isSubmitting };
}
