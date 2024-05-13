import React from 'react';

import { WuiText, WuiResizableContainer } from '../../../../src/components';
import { fake } from 'faker';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

export default () => (
  <WuiResizableContainer style={{ height: '600px' }} direction="vertical">
    {(WuiResizablePanel, WuiResizableButton) => (
      <>
        <WuiResizablePanel initialSize={60} minSize="40%">
          <WuiText>
            <p>{text}</p>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton size="xl" />

        <WuiResizablePanel initialSize={40} minSize="10%">
          <WuiText>
            <p>{text}</p>
          </WuiText>
        </WuiResizablePanel>
      </>
    )}
  </WuiResizableContainer>
);
