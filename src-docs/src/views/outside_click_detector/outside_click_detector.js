import React, { useState } from 'react';

import {
  WuiButton,
  WuiOutsideClickDetector,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div>
      <WuiOutsideClickDetector
        onOutsideClick={() => {
          window.alert('Clicked outside');
        }}
        isDisabled={isDisabled}>
        <p>
          {isDisabled
            ? 'This detector is disabled, so clicking outside will do nothing.'
            : 'Clicking inside here will do nothing, but clicking outside will trigger an alert.'}
        </p>
      </WuiOutsideClickDetector>

      <WuiSpacer size="l" />

      <WuiButton onClick={toggleDisabled}>
        {isDisabled ? 'Enable' : 'Disable'} the detector
      </WuiButton>
    </div>
  );
};
