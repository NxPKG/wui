import React from 'react';

import { WuiAccordion, WuiButton, WuiSpacer } from '../../../../src/components';

export default () => (
  <>
    <WuiAccordion
      id="accordionExtraWithLeftArrow"
      buttonContent="Click to open (Arrow on the left)"
      extraAction={<WuiButton size="s">Extra action!</WuiButton>}
      paddingSize="l">
      <div>Opened content.</div>
    </WuiAccordion>

    <WuiSpacer />

    <WuiAccordion
      id="accordionExtraWithRightArrow"
      arrowDisplay="right"
      buttonContent="Click to open (Arrow on the right)"
      extraAction={<WuiButton size="s">Extra action!</WuiButton>}
      paddingSize="l">
      <div>Opened content.</div>
    </WuiAccordion>
  </>
);
