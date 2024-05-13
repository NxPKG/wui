import React, { Fragment } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiButtonIcon,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton href="http://www.wazuh.com">Link to wazuh.co</WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty href="http://www.wazuh.com">
          Link to wazuh.com
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonIcon
          href="http://www.wazuh.com"
          iconType="link"
          aria-label="This is a link"
        />
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton href="http://www.wazuh.com" isDisabled>
          Disabled link
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty href="http://www.wazuh.com" isDisabled>
          Disabled empty link
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonIcon
          href="http://www.wazuh.com"
          iconType="link"
          aria-label="This is a link"
          isDisabled
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  </Fragment>
);
