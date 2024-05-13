import React from 'react';

import { WuiAccordion, WuiText, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiAccordion
      id="accordion9"
      buttonContent="Arrows default to the left"
      paddingSize="s">
      <WuiText>
        <p>
          Any content inside of <strong>WuiAccordion</strong> will appear here.
        </p>
      </WuiText>
    </WuiAccordion>
    <WuiSpacer />
    <WuiAccordion
      id="accordion10"
      arrowDisplay="right"
      buttonContent="This one has it on the right"
      paddingSize="s">
      <WuiText>
        <p>
          Any content inside of <strong>WuiAccordion</strong> will appear here.
        </p>
      </WuiText>
    </WuiAccordion>
    <WuiSpacer />
    <WuiAccordion
      id="accordion11"
      arrowDisplay="none"
      buttonContent="This one has it removed entirely"
      paddingSize="s">
      <WuiText>
        <p>
          Any content inside of <strong>WuiAccordion</strong> will appear here.
        </p>
      </WuiText>
    </WuiAccordion>
  </div>
);
