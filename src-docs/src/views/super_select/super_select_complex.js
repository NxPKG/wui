import React, { Fragment, useState } from 'react';

import { WuiSuperSelect, WuiText } from '../../../../src/components';

export default () => {
  const options = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
  ];

  const [value, setValue] = useState('option_one');

  const onChange = value => {
    setValue(value);
  };

  return (
    <WuiSuperSelect
      options={options}
      valueOfSelected={value}
      onChange={value => onChange(value)}
      itemLayoutAlign="top"
      hasDividers
    />
  );
};
