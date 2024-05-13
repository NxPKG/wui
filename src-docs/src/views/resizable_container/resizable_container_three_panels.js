import React from 'react';
import { WuiText, WuiResizableContainer } from '../../../../src/components';
import { fake } from 'faker';

const text = fake('{{lorem.paragraphs}}');

export default () => (
  <WuiResizableContainer style={{ height: '400px' }}>
    {(WuiResizablePanel, WuiResizableButton) => (
      <>
        <WuiResizablePanel initialSize={100 / 3} minSize="50px">
          <WuiText>
            <p>{text}</p>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton size="l" />

        <WuiResizablePanel initialSize={100 / 3}>
          <WuiText>
            <p>{text}</p>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton size="l" />

        <WuiResizablePanel initialSize={100 / 3} minSize="10%">
          <WuiText>
            <p>{text}</p>
          </WuiText>
        </WuiResizablePanel>
      </>
    )}
  </WuiResizableContainer>
);
