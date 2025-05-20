import React from "react";

const EndStat = ({
  summary,
  stageView,
  isSummaryLoading,
  isStageLoading,
  isSummaryError,
  isStageError,
  summaryError,
  stageError,
  customColors,
}) => {
  if (isSummaryLoading || isStageLoading)
    return <p>Loading sale summary and stage...</p>;
  if (isSummaryError || isStageError)
    return (
      <p>
        Error loading data —{" "}
        {summaryError?.message || stageError?.message || "Please refresh."}
      </p>
    );
  if (!summary || !stageView)
    return <p className="text-center">No sale summary or stage available</p>;

  return (
    <section className="w-100 m-top-sm stat">
      <div className="stretch">
        <span>Final Supply:</span>
        <span style={{ color: customColors.primaryColor }}>
          {summary.hardCap - summary.totalBurned}
        </span>
      </div>
      <div className="stretch">
        <span>Sui collected:</span>
        <span style={{ color: customColors.primaryColor }}>
          {summary.suiCollected}
        </span>
      </div>
      <div className="stretch">
        <span>Sold:</span>
        <span style={{ color: customColors.primaryColor }}>
          {summary.totalSold}
        </span>
      </div>
    </section>
  );
};

export default EndStat;
