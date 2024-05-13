import React from 'react';

import { WuiSuggestItem, WuiSpacer } from '../../../../src/components';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    type: { iconType: 'qryField', color: 'tint5' },
    label: 'Field sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'qryValue', color: 'tint0' },
    label: 'Value sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'qrySelector', color: 'tint3' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'qryOperand', color: 'tint1' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'search', color: 'tint10' },
    label: 'Recent search',
  },
  {
    type: { iconType: 'save', color: 'tint7' },
    label: 'Saved query',
  },
];

const typeObj = { iconType: 'qryValue', color: 'tint0' };

const longLabel =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar.';

export default () => (
  <div>
    {sampleItems.map((item, index) => (
      <WuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        description={item.description}
      />
    ))}
    <WuiSpacer size="m" />
    <WuiSuggestItem
      type={typeObj}
      label={longLabel}
      description="This item has a fixed width label"
    />
    <WuiSuggestItem
      type={typeObj}
      labelDisplay="expand"
      label={longLabel}
      description="This item will expand its label if needed"
    />
    <WuiSpacer size="m" />
    <WuiSuggestItem
      type={{ iconType: 'search', color: 'tint10' }}
      label="Items with no description will expand their label"
    />
  </div>
);
