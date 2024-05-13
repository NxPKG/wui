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
  WuiPageSideBar,
  WuiTitle,
} from '../../../../src/components';

export default () => (
  <WuiPage>
    <WuiPageSideBar>SideBar nav</WuiPageSideBar>
    <WuiPageBody component="div">
      <WuiPageHeader>
        <WuiPageHeaderSection>
          <WuiTitle size="l">
            <h1>Page title</h1>
          </WuiTitle>
        </WuiPageHeaderSection>
        <WuiPageHeaderSection>Page abilities</WuiPageHeaderSection>
      </WuiPageHeader>
      <WuiPageContent>
        <WuiPageContentHeader>
          <WuiPageContentHeaderSection>
            <WuiTitle>
              <h2>Content title</h2>
            </WuiTitle>
          </WuiPageContentHeaderSection>
          <WuiPageContentHeaderSection>
            Content abilities
          </WuiPageContentHeaderSection>
        </WuiPageContentHeader>
        <WuiPageContentBody>Content body</WuiPageContentBody>
      </WuiPageContent>
    </WuiPageBody>
  </WuiPage>
);
