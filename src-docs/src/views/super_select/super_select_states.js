import React, { useState } from 'react';

import { WuiSuperSelect } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const options = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      disabled: true,
      'data-test-subj': 'option one',
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
    },
    {
      value: 'option_three',
      inputDisplay: (
        <span className="wui-textTruncate wui-displayBlock">
          Option three has a super long text and added truncation
        </span>
      ),
    },
  ];
  const [value, setValue] = useState(options[1].value);

  const onChange = value => {
    setValue(value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend={true} canAppend={true}>
      <WuiSuperSelect
        options={options}
        valueOfSelected={value}
        onChange={value => onChange(value)}
      />
    </DisplayToggles>
  );
};
