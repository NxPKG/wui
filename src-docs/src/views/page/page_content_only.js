import React from 'react';

import {
  WuiPage,
  WuiPageBody,
  WuiPageContent,
  WuiPageContentBody,
  WuiPageContentHeader,
  WuiPageContentHeaderSection,
  WuiTitle,
} from '../../../../src/components';

export default () => (
  <WuiPage>
    <WuiPageBody component="div">
      <WuiPageContent>
        <WuiPageContentHeader>
          <WuiPageContentHeaderSection>
            <WuiTitle>
              <h2>Content title</h2>
            </WuiTitle>
          </WuiPageContentHeaderSection>
        </WuiPageContentHeader>
        <WuiPageContentBody>Content body</WuiPageContentBody>
      </WuiPageContent>
    </WuiPageBody>
  </WuiPage>
);
