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
  <WuiResizableContainer style={{ height: '400px' }}>
    {(WuiResizablePanel, WuiResizableButton) => (
      <>
        <WuiResizablePanel initialSize={50} minSize="30%">
          <WuiText>
            <p>{text}</p>
            <a href="">Hello world</a>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton />

        <WuiResizablePanel initialSize={50} minSize="200px">
          <WuiText>
            <p>{text}</p>
          </WuiText>
        </WuiResizablePanel>
      </>
    )}
  </WuiResizableContainer>
);
