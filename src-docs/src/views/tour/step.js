import React, { useState } from 'react';

import {
  WuiLink,
  WuiText,
  WuiSpacer,
  WuiTourStep,
} from '../../../../src/components';

export default () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <WuiTourStep
        content={
          <WuiText>
            <p>The tour step content.</p>
          </WuiText>
        }
        isStepOpen={isOpen}
        minWidth={300}
        onFinish={() => setIsOpen(false)}
        step={1}
        stepsTotal={1}
        title="Title of the current step"
        subtitle="Title of the full tour"
        anchorPosition="rightUp">
        <WuiText>
          The tour step{' '}
          <WuiLink onClick={() => setIsOpen(!isOpen)}>anchor point</WuiLink>.
        </WuiText>
      </WuiTourStep>
      <WuiSpacer size="xxl" />
      <WuiSpacer size="xxl" />
    </div>
  );
};
