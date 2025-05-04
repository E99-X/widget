import React from 'react';

const Stat = ({
  summary, 
  stageView, 
  isSummaryLoading, 
  isStageLoading, 
  isSummaryError, 
  isStageError, 
  summaryError, 
  stageError
}) => {

  if (isSummaryLoading || isStageLoading) return <p>Loading sale summary and stage...</p>;
  if (isSummaryError || isStageError) return <p>Error loading data — {summaryError?.message || stageError?.message || 'Please refresh.'}</p>;
  if (!summary || !stageView) return <p>No sale summary or stage available</p>;

  return (
    <section className="w-100 margin-top">
      <div className='stretch'><span>Stage:</span><span className='text-primary'>{`${stageView.stageNumber}/${summary.stageCount}`}</span></div>
        <div className='stretch'><span>Available:</span><span className='text-primary'>{stageView.tokensLeft}</span></div>
        <div className='stretch margin-top'><span>Max Supply:</span><span className='text-primary'>{summary.hardCap}</span></div>
        <div className='stretch'><span>Reserve:</span><span className='text-primary'>{`${summary.reserve}%`}</span></div>
        <div className='stretch'>
          <span>{summary.finModeText == 'Join Pool'? "Sold:" : "Burned:"}</span>
          <span className='text-primary'>{summary.finModeText == 'Join Pool' ? summary.totalSold : summary.totalBurned}</span>
        </div>
    </section>
  );
};

export default Stat;
