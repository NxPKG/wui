import React, { useState, Fragment } from 'react';
import {
  WuiDelayHide,
  WuiFlexItem,
  WuiCheckbox,
  WuiFormRow,
  WuiFieldNumber,
  WuiLoadingSpinner,
} from '../../../../src/components';

export default () => {
  const [minimumDuration, setDuration] = useState(3000);
  const [hide, setHide] = useState(false);

  const onChangeMinimumDuration = event => {
    setDuration(parseInt(event.target.value, 10));
  };

  const onChangeHide = event => {
    setHide(event.target.checked);
  };

  return (
    <Fragment>
      <WuiFlexItem>
        <WuiFormRow>
          <WuiCheckbox
            id="dummy-id"
            checked={hide}
            onChange={onChangeHide}
            label="Hide child"
          />
        </WuiFormRow>
        <WuiFormRow label="Minimum duration">
          <WuiFieldNumber
            value={minimumDuration}
            onChange={onChangeMinimumDuration}
          />
        </WuiFormRow>

        <WuiFormRow label="Child to render">
          <WuiDelayHide
            hide={hide}
            minimumDuration={minimumDuration}
            render={() => <WuiLoadingSpinner size="m" />}
          />
        </WuiFormRow>
      </WuiFlexItem>
    </Fragment>
  );
};
