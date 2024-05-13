import React from 'react';

import { WuiAccordion, WuiText } from '../../../../src/components';

export default () => (
  <div>
    <WuiAccordion
      id="accordion8"
      buttonContent="I have an `onToggle` callback"
      onToggle={isOpen =>
        console.log(`WuiAccordion is now ${isOpen ? 'open' : 'closed'}`)
      }
      paddingSize="l">
      <WuiText>
        <p>
          Any content inside of <strong>WuiAccordion</strong> will appear here.
        </p>
      </WuiText>
    </WuiAccordion>
  </div>
);
