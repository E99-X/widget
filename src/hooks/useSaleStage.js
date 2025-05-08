import { useSuiClientQuery } from "@mysten/dapp-kit";
import { fixedToFloat } from "../utils/formatter";

export function useSaleStage(saleId) {
  const {
    data: objResp,
    isPending,
    isError,
    error,
  } = useSuiClientQuery(
    "getObject",
    { id: saleId, options: { showContent: true } },
    { refetchInterval: 10_000 }
  );

  let stageView = null;

  if (objResp?.data?.content?.fields) {
    const f = objResp.data.content.fields;
    const saleState = Number(f.sale_state);

    if (saleState === 0) {
      stageView = null;
    } else {
      const stages = f.stages ? f.stages.map((s) => s.fields) : [];

      if (stages.length > 0) {
        const last = stages[stages.length - 1];

        stageView = {
          stageNumber: Number(last.stage_number),
          tokensLeft: fixedToFloat(last.tokens_for_sale),
          tokensSold: fixedToFloat(last.tokens_sold),
          tokensBurned: fixedToFloat(last.tokens_burned),
          price: fixedToFloat(last.price),
          startMs: Number(last.start_date),
          endMs: Number(last.end_date),
        };
      } else {
        stageView = null;
      }
    }
  }

  return {
    stageView,
    isLoading: isPending,
    isError,
    error,
  };
}
