import { useSuiClientQuery } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";

export function useAutopilotStatus(parentId, saleId) {
  if (!parentId || !saleId || !isValidSuiObjectId(saleId)) {
    console.warn("useAutopilotStatus: invalid parentId or saleId", {
      parentId,
      saleId,
    });
    return {
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error("Invalid parentId or saleId"),
    };
  }

  const { data, isPending, isError, error } = useSuiClientQuery(
    "getDynamicFieldObject",
    {
      parentId,
      name: {
        type: "0x2::object::ID",
        value: saleId,
      },
    },
    {
      refetchInterval: 10_000,
      retry: false,
    }
  );

  console.log("Autopilot dynamic field result:", data);
  return { data, isPending, isError, error };
}
