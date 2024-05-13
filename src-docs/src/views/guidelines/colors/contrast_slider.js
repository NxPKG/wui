import React, { useState } from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiFormRow,
  WuiRange,
  WuiToolTip,
  WuiIcon,
  WuiSwitch,
  WuiSpacer,
} from '../../../../../src/components';
import { ratingAAA, ratingAA18, ratingAA, ratingAll } from './_utilities';

export const ContrastSlider = ({
  contrastValue,
  showTextVariants,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(contrastValue);
  const [checked, setChecked] = useState(showTextVariants);
  const ticks = [
    {
      value: 0,
      label: (
        <WuiToolTip
          position="bottom"
          content={
            <ul>
              <li>
                <WuiIcon type="minusInCircle" /> Contrast is between 2 and 3.
                Use only for disabled or inconsequential content.
              </li>
              <li>
                <WuiIcon type="cross" /> Contrast is less than 2. Do not use.
              </li>
            </ul>
          }>
          {ratingAll}
        </WuiToolTip>
      ),
    },
    {
      value: 3,
      label: (
        <WuiToolTip
          position="bottom"
          content={
            <p>
              <WuiIcon type="partial" /> Partially passes with a contrast of 3+,
              but only for graphics or if the text is at least 18px, or 14px and
              bold
            </p>
          }>
          {ratingAA18}
        </WuiToolTip>
      ),
    },
    {
      value: 4.5,
      label: (
        <WuiToolTip
          position="bottom"
          content={
            <p>
              <WuiIcon type="checkInCircleFilled" /> Passes with a contrast of
              4.5+
            </p>
          }>
          {ratingAA}
        </WuiToolTip>
      ),
    },
    {
      value: 7,
      label: (
        <WuiToolTip
          position="bottom"
          content={
            <p>
              <WuiIcon type="checkInCircleFilled" /> Passes with a contrast of
              7+
            </p>
          }>
          {ratingAAA}
        </WuiToolTip>
      ),
    },
  ];

  return (
    <WuiFlexGroup
      className="guideSection__emptyBox guideColorsPage__stickySlider"
      justifyContent="center"
      {...rest}>
      <WuiFlexItem className="guideSection__shadedBox">
        <WuiFormRow
          id="ratingsRange"
          label="Minimum color contrast combinations to show">
          <WuiRange
            min={0}
            max={7}
            step={0.5}
            value={value}
            onChange={e => {
              setValue(e.currentTarget.value);
              onChange(e.currentTarget.value, checked);
            }}
            showTicks
            showValue
            ticks={ticks}
            valueAppend="+"
          />
        </WuiFormRow>
      </WuiFlexItem>
      <WuiFlexItem className="guideSection__shadedBox">
        <WuiFormRow
          labelType="legend"
          label="Use text variant variables of core colors for better text contrast"
          hasChildLabel={false}>
          <div>
            <WuiSpacer size="s" />
            <WuiSwitch
              label="Show text variant"
              checked={showTextVariants}
              onChange={e => {
                setChecked(e.target.checked);
                onChange(value, e.target.checked);
              }}
            />
          </div>
        </WuiFormRow>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
};
