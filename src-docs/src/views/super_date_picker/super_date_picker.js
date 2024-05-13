import React, { useState, Fragment } from 'react';

import {
  WuiSuperDatePicker,
  WuiSpacer,
  WuiFormControlLayoutDelimited,
  WuiFormLabel,
  WuiPanel,
  WuiText,
} from '../../../../src/components';

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();

  const onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter(recentlyUsedRange => {
      const isDuplicate =
        recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10
        ? recentlyUsedRange.slice(0, 9)
        : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
  };

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise(resolve => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const onStartInputChange = e => {
    setStart(e.target.value);
  };

  const onEndInputChange = e => {
    setEnd(e.target.value);
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const onRefreshChange = ({ isPaused, refreshInterval }) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  const renderTimeRange = () => {
    return (
      <Fragment>
        <WuiPanel paddingSize="m">
          <WuiText size="s">
            WuiSuperDatePicker should be resilient to invalid date values. You
            can try to break it with unexpected values here.
          </WuiText>
          <WuiSpacer />
          <WuiFormControlLayoutDelimited
            prepend={<WuiFormLabel>Dates</WuiFormLabel>}
            startControl={
              <input
                onChange={onStartInputChange}
                type="text"
                value={start}
                placeholder="start"
                className="wuiFieldText"
              />
            }
            endControl={
              <input
                onChange={onEndInputChange}
                type="text"
                placeholder="end"
                value={end}
                className="wuiFieldText"
              />
            }
          />
        </WuiPanel>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <WuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
        onRefreshChange={onRefreshChange}
        recentlyUsedRanges={recentlyUsedRanges}
      />
      <WuiSpacer />
      {renderTimeRange()}
    </Fragment>
  );
};
