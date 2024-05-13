import React from 'react';

import { WuiCollapsibleNavGroup } from '../../../../src/components/collapsible_nav';
import { WuiText } from '../../../../src/components/text';
import { WuiCode } from '../../../../src/components/code';

export default () => (
  <>
    <WuiCollapsibleNavGroup>
      <WuiText size="s" color="subdued">
        <p>This is a basic group without any modifications</p>
      </WuiText>
    </WuiCollapsibleNavGroup>
    <WuiCollapsibleNavGroup title="Nav group" iconType="logoWazuh">
      <WuiText size="s" color="subdued">
        <p>
          This is a nice group with a heading supplied via{' '}
          <WuiCode>title</WuiCode> and <WuiCode>iconType</WuiCode>.
        </p>
      </WuiText>
    </WuiCollapsibleNavGroup>
    <WuiCollapsibleNavGroup
      background="light"
      title="Nav group"
      isCollapsible={true}
      iconType="logoWazuh"
      initialIsOpen={true}>
      <WuiText size="s" color="subdued">
        <p>
          This group is <WuiCode>collapsible</WuiCode> and set with{' '}
          <WuiCode>initialIsOpen</WuiCode>. It has a heading that is the
          collapsing button via <WuiCode>title</WuiCode> and{' '}
          <WuiCode>iconType</WuiCode>.
        </p>
      </WuiText>
    </WuiCollapsibleNavGroup>
    <WuiCollapsibleNavGroup
      title="Nav group"
      iconType="logoGCPMono"
      iconSize="xxl"
      titleSize="s"
      isCollapsible={true}
      initialIsOpen={false}
      background="dark">
      <WuiText size="s">
        <p>
          This is a <WuiCode>dark</WuiCode> <WuiCode>collapsible</WuiCode> group
          that is initally set to closed,{' '}
          <WuiCode>iconSize=&quot;xxl&quot;</WuiCode> and{' '}
          <WuiCode>titleSize=&quot;s&quot;</WuiCode>.
        </p>
      </WuiText>
    </WuiCollapsibleNavGroup>
  </>
);
