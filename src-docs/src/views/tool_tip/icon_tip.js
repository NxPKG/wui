import React, { Fragment } from 'react';

import {
  WuiCheckbox,
  WuiFlexGroup,
  WuiFlexItem,
  WuiIconTip,
  WuiSpacer,
  WuiText,
  WuiCode,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <WuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
      <WuiFlexItem grow={false}>
        <WuiCheckbox
          id="explainedCheckbox"
          label="Use source maps"
          onChange={() => {}}
        />
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiIconTip
          content="Source maps allow browser dev tools to map minified code to the original source code"
          position="right"
        />
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiIconTip
      aria-label="Warning"
      size="xl"
      type="alert"
      color="warning"
      content="I do not think it means what you think it means"
    />

    <WuiSpacer />

    <WuiText>
      <p>
        Pass a position utility class via <WuiCode>iconProps</WuiCode> to shift
        for better alignment.
        <WuiIconTip
          type="iInCircle"
          color="subdued"
          content={
            <span>
              This was passed <WuiCode>.wui-alignTop</WuiCode>
            </span>
          }
          iconProps={{
            className: 'wui-alignTop',
          }}
        />
      </p>
    </WuiText>
  </Fragment>
);
