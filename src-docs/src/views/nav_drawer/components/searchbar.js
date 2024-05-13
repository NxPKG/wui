import React, { useState } from 'react';

import {
  WuiButtonEmpty,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSuggest,
  WuiSuperDatePicker,
  WuiFormRow,
} from '../../../../../src/components';

import HashtagPopover from '../../suggest/hashtag_popover';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    type: { iconType: 'qryField', color: 'tint4' },
    label: 'Field sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'qryValue', color: 'tint0' },
    label: 'Value sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'qrySelector', color: 'tint2' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'qryOperand', color: 'tint1' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'search', color: 'tint8' },
    label: 'Recent search',
  },
  {
    type: { iconType: 'save', color: 'tint3' },
    label: 'Saved search',
  },
];

export default () => {
  const status = 'unchanged';
  const [value, setValue] = useState('');

  const getInputValue = val => {
    setValue(val);
  };

  const onItemClick = item => {
    alert(`Item [${item.label}] was clicked`);
  };

  const onTimeChange = () => {
    alert('Time changed');
  };

  const append = <WuiButtonEmpty size={'s'}>QRY</WuiButtonEmpty>;

  return (
    <WuiFlexGroup gutterSize="s">
      <WuiFlexItem>
        <WuiSuggest
          status={status}
          prepend={<HashtagPopover value={value} />}
          append={append}
          suggestions={sampleItems}
          onItemClick={onItemClick}
          onInputChange={getInputValue}
          compressed={true}
        />
      </WuiFlexItem>
      <WuiFlexItem grow={false} className="savedQueriesInput__datepicker">
        <WuiFormRow display="rowCompressed">
          <WuiSuperDatePicker
            showUpdateButton={false}
            onTimeChange={onTimeChange}
          />
        </WuiFormRow>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
};
