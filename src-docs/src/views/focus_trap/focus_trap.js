import React, { useState } from 'react';

import {
  WuiBadge,
  WuiButton,
  WuiFocusTrap,
  WuiPanel,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';

import FormExample from '../form_compressed/form_compressed';

export default () => {
  const [isDisabled, changeDisabled] = useState(true);

  const toggleDisabled = () => changeDisabled(!isDisabled);

  return (
    <div>
      <WuiBadge>Trap is {isDisabled ? 'disabled' : 'enabled'}</WuiBadge>
      <WuiSpacer size="s" />
      <WuiFocusTrap disabled={isDisabled}>
        <WuiPanel>
          <FormExample />

          <WuiSpacer size="m" />

          <WuiButton onClick={toggleDisabled}>
            {`${!isDisabled ? 'Disable' : 'Enable'} Focus Trap`}
          </WuiButton>
        </WuiPanel>
      </WuiFocusTrap>

      <WuiSpacer size="l" />

      <WuiText>
        The button below is not focusable by keyboard as long as the focus trap
        is enabled.
      </WuiText>

      <WuiButton onClick={() => alert('External event triggered')}>
        External Focusable Element
      </WuiButton>
    </div>
  );
};
