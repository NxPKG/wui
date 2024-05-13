import React, { useState, Fragment } from 'react';
import {
  WuiDelayRender,
  WuiFlexItem,
  WuiCheckbox,
  WuiFormRow,
  WuiFieldNumber,
  WuiLoadingSpinner,
} from '../../../../src/components';

export default () => {
  const [minimumDelay, setDelay] = useState(3000);
  const [render, setRender] = useState(false);

  const onChangeMinimumDelay = event => {
    setDelay(parseInt(event.target.value, 10));
  };

  const onChangeHide = event => {
    setRender(event.target.checked);
  };

  const status = render ? 'showing' : 'hidden';
  const label = `Child (${status})`;
  return (
    <Fragment>
      <WuiFlexItem>
        <WuiFormRow>
          <WuiCheckbox
            id="dummy-id"
            checked={render}
            onChange={onChangeHide}
            label="Show child"
          />
        </WuiFormRow>
        <WuiFormRow label="Minimum delay">
          <WuiFieldNumber
            value={minimumDelay}
            onChange={onChangeMinimumDelay}
          />
        </WuiFormRow>

        <WuiFormRow label={label}>
          {render ? (
            <WuiDelayRender delay={minimumDelay}>
              <WuiLoadingSpinner size="m" />
            </WuiDelayRender>
          ) : (
            <Fragment />
          )}
        </WuiFormRow>
      </WuiFlexItem>
    </Fragment>
  );
};
