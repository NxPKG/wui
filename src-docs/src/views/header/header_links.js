import React from 'react';

import {
  WuiHeader,
  WuiHeaderSectionItem,
  WuiHeaderLogo,
  WuiHeaderLinks,
  WuiHeaderLink,
} from '../../../../src/components';

export default () => {
  return (
    <WuiHeader>
      <WuiHeaderSectionItem border="right">
        <WuiHeaderLogo>Wazuh</WuiHeaderLogo>
      </WuiHeaderSectionItem>

      <WuiHeaderSectionItem>
        <WuiHeaderLinks aria-label="App navigation links example">
          <WuiHeaderLink isActive>Docs</WuiHeaderLink>

          <WuiHeaderLink>Code</WuiHeaderLink>

          <WuiHeaderLink iconType="help">Help</WuiHeaderLink>
        </WuiHeaderLinks>
      </WuiHeaderSectionItem>
    </WuiHeader>
  );
};
