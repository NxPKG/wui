import React from 'react';

import {
  WuiPage,
  WuiPageBody,
  WuiPageContent,
  WuiPageContentBody,
  WuiPageContentHeader,
  WuiPageContentHeaderSection,
  WuiPageHeader,
  WuiPageHeaderSection,
  WuiTitle,
} from '../../../../src/components';

export default () => (
  <WuiPage>
    <WuiPageBody component="div">
      <WuiPageHeader>
        <WuiPageHeaderSection>
          <WuiTitle size="l">
            <h1>Page title</h1>
          </WuiTitle>
        </WuiPageHeaderSection>
      </WuiPageHeader>
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
