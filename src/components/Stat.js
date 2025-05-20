import React from "react";

const Stat = ({
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

  if (!summary) return <p className="text-center">No sale summary available</p>;

  const isFinalized = summary.saleState === "Finalized";

  return (
    <section className="w-100 m-top-sm stat">
      {isFinalized ? (
        <>
          <div className="stretch">
            <span>Final Supply:</span>
            <span style={{ color: customColors.primaryColor }}>
              {summary.hardCap - summary.totalBurned}
            </span>
          </div>
          <div className="stretch">
            <span>SUI Collected:</span>
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
        </>
      ) : (
        <>
          {!stageView ? (
            <p className="text-center">No stage data available</p>
          ) : (
            <>
              <div className="stretch">
                <span>Stage:</span>
                <span style={{ color: customColors.primaryColor }}>
                  {`${stageView.stageNumber}/${summary.stageCount}`}
                </span>
              </div>
              <div className="stretch">
                <span>Available:</span>
                <span style={{ color: customColors.primaryColor }}>
                  {stageView.tokensLeft}
                </span>
              </div>
            </>
          )}
          <div className="stretch">
            <span>Max Supply:</span>
            <span style={{ color: customColors.primaryColor }}>
              {summary.hardCap}
            </span>
          </div>
          <div className="stretch">
            <span>Reserve:</span>
            <span style={{ color: customColors.primaryColor }}>
              {`${summary.reserve}%`}
            </span>
          </div>
          <div className="stretch">
            <span>
              {summary.finModeText === "Join Pool" ? "Sold:" : "Burned:"}
            </span>
            <span style={{ color: customColors.primaryColor }}>
              {summary.finModeText === "Join Pool"
                ? summary.totalSold
                : summary.totalBurned}
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default Stat;
