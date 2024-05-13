import React from 'react';

import { WuiAccordion, WuiText } from '../../../../src/components';

export default () => (
  <div>
    <WuiAccordion
      id="accordion2"
      buttonContent="I am opened by default. Click me to toggle close / open"
      initialIsOpen={true}
      paddingSize="l">
      <WuiText>
        <p>
          Any content inside of <strong>WuiAccordion</strong> will appear here.
        </p>
      </WuiText>
    </WuiAccordion>
  </div>
);
