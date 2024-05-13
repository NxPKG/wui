import React from 'react';

import { WuiAccordion, WuiText } from '../../../../src/components';

export default () => (
  <div>
    <WuiAccordion
      id="accordion1"
      buttonContent="Click me to toggle open / close">
      <WuiText>
        <p>
          Any content inside of <strong>WuiAccordion</strong> will appear here.
        </p>
      </WuiText>
    </WuiAccordion>
  </div>
);
