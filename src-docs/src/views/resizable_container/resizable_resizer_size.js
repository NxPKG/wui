import React from 'react';

import {
  WuiText,
  WuiCode,
  WuiResizableContainer,
} from '../../../../src/components';

export default () => (
  <WuiResizableContainer style={{ height: '200px' }}>
    {(WuiResizablePanel, WuiResizableButton) => (
      <>
        <WuiResizablePanel initialSize={35} minSize="100px">
          <WuiText size="s">
            <p>
              The <strong>WuiResizableButton</strong> to the right of this{' '}
              <strong>WuiResizablePanel</strong> uses size <WuiCode>xl</WuiCode>
            </p>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton size="xl" />

        <WuiResizablePanel initialSize={25}>
          <WuiText size="s">
            <p>
              The <strong>WuiResizableButton</strong> to the right of this{' '}
              <strong>WuiResizablePanel</strong> uses size <WuiCode>l</WuiCode>
            </p>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton size="l" />

        <WuiResizablePanel initialSize={15}>
          <WuiText size="s">
            <p>
              The <strong>WuiResizableButton</strong> to the right of this{' '}
              <strong>WuiResizablePanel</strong> uses size <WuiCode>m</WuiCode>,
              which is the <strong>default</strong> size.
            </p>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton size="m" />

        <WuiResizablePanel initialSize={15}>
          <WuiText size="s">
            <p>
              The <strong>WuiResizableButton</strong> to the right of this{' '}
              <strong>WuiResizablePanel</strong> uses size <WuiCode>s</WuiCode>
            </p>
          </WuiText>
        </WuiResizablePanel>

        <WuiResizableButton size="s" />

        <WuiResizablePanel initialSize={10} minSize="100px">
          <WuiText size="s">
            <p>
              This is the last <strong>WuiResizablePanel</strong>, so it is not
              followed by a <strong>WuiResizableButton</strong>
            </p>
          </WuiText>
        </WuiResizablePanel>
      </>
    )}
  </WuiResizableContainer>
);
