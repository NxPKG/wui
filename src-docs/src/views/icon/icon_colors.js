// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS

// This example JS is overly complex for simple icon usage
// and is set up this way for ease of use in our docs.
//
// Check the snippet tab for a more common usage.

import React from 'react';

import classNames from 'classnames';

import {
  WuiFlexGrid,
  WuiFlexItem,
  WuiIcon,
  WuiPanel,
  WuiText,
  WuiCallOut, // eslint-disable-line @typescript-eslint/no-unused-vars
  WuiSpacer, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '../../../../src/components';

const iconColors = [
  'default',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
  'text',
  'subdued',
  'ghost',
  '#490',
  '#DA8B45',
  '#DDDDDD',
];

export default () => (
  <div>
    <WuiFlexGrid columns={4}>
      {iconColors.map(iconColor => (
        <WuiFlexItem
          className="guideDemo__icon"
          key={iconColor}
          style={{ width: '340px' }}>
          <WuiPanel
            className={classNames({
              guideDemo__ghostBackground: iconColor === 'ghost',
            })}>
            <WuiIcon type="brush" color={iconColor} />
            <WuiText
              size="s"
              color={iconColor === 'ghost' ? 'ghost' : 'default'}>
              <p>{iconColor}</p>
            </WuiText>
          </WuiPanel>
        </WuiFlexItem>
      ))}
    </WuiFlexGrid>

    {/* By the moment, this section has been disabled because
     there are not apps icons. This shows how to colorize them.
    */}
    {/* <WuiSpacer />

    <WuiCallOut
      color="warning"
      title="App icons have special, restricted coloring considerations"
      size="s"
    />

    <WuiSpacer />

    <WuiFlexGrid columns={4}>
      <WuiFlexItem className="guideDemo__icon" style={{ width: '340px' }}>
        <WuiPanel>
          <WuiIcon type="sampleApp" size="xl" />
          <WuiText size="s">
            <p>
              Default coloring of <strong>App</strong> icons is two-toned
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
      <WuiFlexItem className="guideDemo__icon" style={{ width: '340px' }}>
        <WuiPanel>
          <WuiIcon type="sampleApp" color="text" size="xl" />
          <WuiText size="s">
            <p>
              <strong>Special:</strong> the text color makes{' '}
              <strong>App</strong> icons fully that color
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
      <WuiFlexItem className="guideDemo__icon" style={{ width: '340px' }}>
        <WuiPanel>
          <WuiIcon type="sampleApp" color="primary" size="xl" />
          <WuiText size="s">
            <p>
              <strong>Special:</strong> the primary color makes{' '}
              <strong>App</strong> icons fully that color
            </p>
          </WuiText>
        </WuiPanel>
      </WuiFlexItem>
    </WuiFlexGrid> */}
  </div>
);
