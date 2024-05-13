import React from 'react';

import {
  WuiFlexGrid,
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
  WuiPanel,
  WuiText,
  WuiSpacer,
  WuiButton,
} from '../../../../src/components';

import reactSvg from '../../images/custom.svg';

export default () => (
  <div>
    <WuiFlexGrid columns={4}>
      <WuiFlexItem className="guideDemo__icon" style={{ width: '200px' }}>
        <WuiPanel>
          <WuiIcon type="logoWazuh" size="xl" />
          <WuiText size="s">
            <p>logoWazuh</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
      <WuiFlexItem className="guideDemo__icon" style={{ width: '200px' }}>
        <WuiPanel>
          <WuiIcon
            type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg"
            size="xl"
            title="My SVG logo"
          />
          <WuiText size="s">
            <p>http://some.svg</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
      <WuiFlexItem className="guideDemo__icon" style={{ width: '200px' }}>
        <WuiPanel>
          <WuiIcon type={reactSvg} size="xl" title="Custom SVG icon" />
          <WuiText size="s">
            <p>{'{reactSvg}'}</p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
    </WuiFlexGrid>

    <WuiSpacer />

    <WuiText>
      <p>
        Any component that utlizes <strong>WuiIcon</strong> can use custom SVGs
        as well
      </p>
    </WuiText>

    <WuiSpacer />

    <WuiFlexGroup>
      <WuiFlexItem grow={false}>
        <WuiButton
          iconType="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg"
          title="Another SVG Logo">
          http://some.svg
        </WuiButton>
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        <WuiButton iconType={reactSvg}>{'{reactSvg}'}</WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
