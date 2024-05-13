import React from 'react';

import {
  WuiButton,
  WuiCard,
  WuiIcon,
  WuiFlexGroup,
  WuiFlexItem,
  WuiLink,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup gutterSize="l">
    <WuiFlexItem>
      <WuiCard
        icon={<WuiIcon size="xxl" type="devToolsApp" />}
        title="Developers Tools"
        description="Example of a short card description."
        footer={
          <div>
            <WuiButton aria-label="Go to Developers Tools">Go for it</WuiButton>
            <WuiSpacer size="xs" />
            <WuiText size="s">
              <p>
                Or try <WuiLink href="http://google.com">this</WuiLink>
              </p>
            </WuiText>
          </div>
        }
      />
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiCard
        icon={<WuiIcon size="xxl" type="dashboardApp" />}
        title="Dashboards"
        description="Example of a longer card description. See how the footers stay lined up."
        footer={
          <div>
            <WuiButton aria-label="Go to Dashboards">Go for it</WuiButton>
            <WuiSpacer size="xs" />
            <WuiText size="s">
              <p>
                Or try <WuiLink href="http://google.com">this</WuiLink>
              </p>
            </WuiText>
          </div>
        }
      />
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiCard
        icon={<WuiIcon size="xxl" type="savedObjectsApp" />}
        title="Save Objects"
        description="Example of a short card description."
        footer={
          <div>
            <WuiButton aria-label="Go to Save Objects">Go for it</WuiButton>
            <WuiSpacer size="xs" />
            <WuiText size="s">
              <p>
                Or try <WuiLink href="http://google.com">this</WuiLink>
              </p>
            </WuiText>
          </div>
        }
      />
    </WuiFlexItem>
  </WuiFlexGroup>
);
