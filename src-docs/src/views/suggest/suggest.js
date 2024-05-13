import React, { useState } from 'react';

import {
  WuiRadioGroup,
  WuiSuggest,
  WuiSpacer,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

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

const idPrefix = htmlIdGenerator()();

export default () => {
  const radios = [
    { id: `${idPrefix}0`, value: 'unchanged', label: 'No new changes' },
    { id: `${idPrefix}1`, value: 'unsaved', label: 'Not yet saved' },
    { id: `${idPrefix}2`, value: 'saved', label: 'Saved' },
    { id: `${idPrefix}3`, value: 'loading', label: 'Loading' },
  ];
  const [status, setStatus] = useState('unchanged');
  const [radioIdSelected, setSelectedId] = useState(`${idPrefix}0`);

  const onChange = optionId => {
    setSelectedId(optionId);
    setStatus(radios.find(x => x.id === optionId).value);
  };

  const onItemClick = item => {
    alert(`Item [${item.label}] was clicked`);
  };

  return (
    <div>
      <WuiRadioGroup
        options={radios}
        idSelected={radioIdSelected}
        onChange={id => onChange(id)}
      />
      <WuiSpacer size="xl" />
      <WuiSuggest
        status={status}
        onInputChange={() => {}}
        onItemClick={onItemClick}
        placeholder="Enter query to display suggestions"
        suggestions={sampleItems}
      />
    </div>
  );
};
