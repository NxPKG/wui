import React, { useState } from 'react';

import {
  WuiButtonEmpty,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSuggest,
  WuiSuperDatePicker,
} from '../../../../src/components';

import { GlobalFilterBar } from './global_filter_bar';
import GlobalFilterOptions from './global_filter_options';
import HashtagPopover from './hashtag_popover';

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
  const [hideDatepicker, setHide] = useState(false);
  const filters = [
    {
      id: 'filter0',
      field: '@tags.keyword',
      operator: 'IS',
      value: 'value',
      isDisabled: false,
      isPinned: true,
      isExcluded: false,
    },
    {
      id: 'filter1',
      field:
        'Filter with a very long title to test if the badge will properly get truncated in the separate set of filter badges that are not quite as long but man does it really need to be long',
      operator: 'IS',
      value: 'value',
      isDisabled: true,
      isPinned: false,
      isExcluded: false,
    },
    {
      id: 'filter2',
      field: '@tags.keyword',
      operator: 'IS NOT',
      value: 'value',
      isDisabled: false,
      isPinned: true,
      isExcluded: true,
    },
    {
      id: 'filter3',
      field: '@tags.keyword',
      operator: 'IS',
      value: 'value',
      isDisabled: false,
      isPinned: false,
      isExcluded: false,
    },
  ];

  const onFieldFocus = () => {
    setHide(true);
  };

  const onFieldBlur = () => {
    setHide(false);
  };

  const getInputValue = val => {
    setValue(val);
  };

  const onItemClick = item => {
    alert(`Item [${item.label}] was clicked`);
  };

  const onTimeChange = () => {
    alert('Time changed');
  };

  const append = <WuiButtonEmpty>QRY</WuiButtonEmpty>;

  return (
    <div className="savedQueriesInput">
      <WuiFlexGroup
        gutterSize="s"
        className={hideDatepicker ? 'savedQueriesInput__hideDatepicker' : ''}>
        <WuiFlexItem>
          <WuiSuggest
            status={status}
            onFocus={onFieldFocus}
            onBlur={onFieldBlur}
            prepend={<HashtagPopover value={value} />}
            append={append}
            suggestions={sampleItems}
            onItemClick={onItemClick}
            onInputChange={getInputValue}
          />
        </WuiFlexItem>
        <WuiFlexItem grow={false} className="savedQueriesInput__datepicker">
          <WuiSuperDatePicker onTimeChange={onTimeChange} />
        </WuiFlexItem>
      </WuiFlexGroup>
      <WuiFlexGroup
        className="globalFilterGroup"
        gutterSize="none"
        alignItems="flexStart"
        responsive={false}>
        <WuiFlexItem className="globalFilterGroup__branch" grow={false}>
          <GlobalFilterOptions />
        </WuiFlexItem>
        <WuiFlexItem className="globalFilterGroup__filterFlexItem">
          <GlobalFilterBar
            className="globalFilterGroup__filterBar"
            filters={filters}
          />
        </WuiFlexItem>
      </WuiFlexGroup>
    </div>
  );
};
