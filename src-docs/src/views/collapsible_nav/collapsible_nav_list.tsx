import React from 'react';

import { WuiCollapsibleNavGroup } from '../../../../src/components/collapsible_nav';
import { WuiText } from '../../../../src/components/text';
import {
  WuiListGroup,
  WuiListGroupProps,
  WuiPinnableListGroup,
  WuiPinnableListGroupItemProps,
} from '../../../../src/components/list_group';
import { WuiSpacer } from '../../../../src/components/spacer';
import { WuiButton, WuiButtonIcon } from '../../../../src/components/button';
import { WuiLink } from '../../../../src/components/link';

const deploymentsList: WuiListGroupProps['listItems'] = [
  {
    label: 'combining-binaries',
    iconType: 'logoAzureMono',
    size: 's',
  },
  {
    label: 'stack-monitoring',
    iconType: 'logoAWSMono',
    size: 's',
  },
];

export const TopNavLinks: WuiPinnableListGroupItemProps[] = [
  {
    label: 'Home',
    iconType: 'home',
    isActive: true,
    pinnable: false,
  },
  { label: 'Dashboards', pinned: true },
  { label: 'Dev tools', pinned: true },
  { label: 'Maps', pinned: true },
];

export const WazuhNavLinks: WuiPinnableListGroupItemProps[] = [
  { label: 'Discover' },
  { label: 'Visualize' },
  { label: 'Dashboards' },
  { label: 'Canvas' },
  { label: 'Maps' },
  { label: 'Machine Learning' },
  { label: 'Graph' },
];

export const DeploymentsGroup = (
  <WuiCollapsibleNavGroup
    title={
      <span>
        <small style={{ fontWeight: 'normal' }}>Deployment</small> <br />
        <strong>personal-databoard</strong>
      </span>
    }
    iconType="logoGCPMono"
    iconSize="xl"
    isCollapsible={true}
    initialIsOpen={false}
    background="dark">
    <div role="group" className="wazuhNavDeployment__content">
      <WuiListGroup listItems={deploymentsList} flush />
      <WuiSpacer size="s" />
      <WuiButton color="ghost" fullWidth>
        Manage deployments
      </WuiButton>
    </div>
  </WuiCollapsibleNavGroup>
);

export const SecurityGroup = (
  <WuiCollapsibleNavGroup
    background="light"
    iconType="logoSecurity"
    title="Wazuh Security"
    isCollapsible={true}
    initialIsOpen={true}
    arrowDisplay="none"
    extraAction={
      <WuiButtonIcon
        aria-label="Hide and never show again"
        title="Hide and never show again"
        iconType="cross"
      />
    }>
    <WuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
      <p>
        Threat prevention, detection, and response with SIEM and endpoint
        security.
        <br />
        <WuiLink>Learn more</WuiLink>
      </p>
    </WuiText>
  </WuiCollapsibleNavGroup>
);

export default () => (
  <>
    {DeploymentsGroup}
    <WuiCollapsibleNavGroup background="light">
      <WuiPinnableListGroup
        listItems={TopNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="text"
        gutterSize="none"
        size="s"
      />
    </WuiCollapsibleNavGroup>
    <WuiCollapsibleNavGroup
      title="Wazuh"
      iconType="logoWazuh"
      isCollapsible={true}
      initialIsOpen={true}>
      <WuiPinnableListGroup
        listItems={WazuhNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="subdued"
        gutterSize="none"
        size="s"
      />
    </WuiCollapsibleNavGroup>
    {SecurityGroup}
  </>
);
