import React from 'react';
import {
  WuiButton,
  WuiPage,
  WuiPageBody,
  WuiPageContent,
  WuiPageContentBody,
  WuiPageContentHeader,
  WuiPageContentHeaderSection,
  WuiPageHeader,
  WuiPageHeaderSection,
  WuiTitle,
} from '../../../../../src/components';

export default ({ toggleFullScreen }) => (
  <WuiPage className="wuiNavDrawerPage">
    <WuiPageBody className="wuiNavDrawerPage__pageBody">
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
        <WuiPageContentBody>
          <WuiButton
            fill
            onClick={toggleFullScreen}
            iconType="exit"
            aria-label="Exit fullscreen demo">
            Exit fullscreen demo
          </WuiButton>
        </WuiPageContentBody>
      </WuiPageContent>
    </WuiPageBody>
  </WuiPage>
);
