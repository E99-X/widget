import { useSuiClientQuery } from "@mysten/dapp-kit";
import { fixedToFloat } from "../utils/formatter";

export function useSaleSummary(saleId) {
  const {
    data: objResp,
    isPending,
    isError,
    error,
  } = useSuiClientQuery(
    "getObject",
    { id: saleId, options: { showContent: true, showType: true } },
    { refetchInterval: 10_000 }
  );

  let summary = null;
  let tokenType = null;

  if (objResp?.data?.content?.fields) {
    const f = objResp.data.content.fields;

    const stages = Array.isArray(f.stages) ? f.stages.map((s) => s.fields) : [];

    let saleState = "Unknown";
    const variant = f.state?.variant;

    if (variant) {
      if (variant === "NotStarted") saleState = "Not Started";
      else if (variant === "Active") saleState = "Active";
      else if (variant === "Finalized") saleState = "Finalized";
      else saleState = "Unknown State";
    }

    const finMode = f.config?.fields?.final_mode?.variant;
    let finModeText = "Unknown";
    if (finMode) {
      if (finMode === "JoinToPool") finModeText = "Join Pool";
      else if (finMode === "Burn") finModeText = "Burning Mode";
    }

    const fullType = objResp.data.type;

    if (fullType) {
      const match = fullType.match(/^.+<(.+)>$/);
      if (match) {
        tokenType = match[1];
      } else {
        console.warn("❌ Could not extract tokenType from:", fullType);
      }
    }

    const admin = f.admin?.fields?.admin ?? "Unknown Admin";

    summary = {
      tokenType,
      hardCap: fixedToFloat(f.config?.fields?.hard_cap ?? 0),
      admin,
      reserve: f.config?.fields?.reserve_percentage ?? 0,
      suiCollected: fixedToFloat(f.sui_collected ?? 0),
      saleState,
      totalSold: fixedToFloat(
        stages.reduce((sum, s) => sum + Number(s.tokens_sold ?? 0), 0)
      ),
      totalBurned: fixedToFloat(
        stages.reduce((sum, s) => sum + Number(s.tokens_burned ?? 0), 0)
      ),
      stageCount: Number(f.config?.fields?.number_of_stages ?? 0),
      finModeText,
    };
  }

  return {
    summary,
    isLoading: isPending,
    isError,
    error,
  };
}
