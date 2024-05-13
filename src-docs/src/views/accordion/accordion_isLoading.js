import React, { useState } from 'react';

import {
  WuiAccordion,
  WuiButton,
  WuiButtonGroup,
  WuiSpacer,
  WuiFlexGroup,
  WuiFlexItem,
  WuiTitle,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();

const toggleButtons = [
  {
    id: `${idPrefix}0`,
    label: 'False',
  },
  {
    id: `${idPrefix}1`,
    label: 'True',
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
  },
];

export default () => {
  const [label, setLabel] = useState('False');
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}0`);

  const onChange = optionId => {
    setToggleIdSelected(optionId);
    setLabel(toggleButtons.find(x => x.id === optionId).label);
  };

  let isLoadingMessage;

  switch (label) {
    case 'True':
      isLoadingMessage = true;
      break;
    case 'False':
      isLoadingMessage = false;
      break;
    case 'Custom':
      isLoadingMessage = 'This is a custom loading message';
      break;
  }

  return (
    <>
      <WuiFlexGroup alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiTitle size="xs">
            <h3>isLoadingMessage: </h3>
          </WuiTitle>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiButtonGroup
            legend="Accordion loading message group"
            options={toggleButtons}
            idSelected={toggleIdSelected}
            onChange={onChange}
          />
        </WuiFlexItem>
      </WuiFlexGroup>

      <WuiSpacer size="m" />
      <WuiAccordion
        id="accordionLoading"
        initialIsOpen={true}
        buttonContent="Click to open"
        extraAction={<WuiButton size="s">Extra action!</WuiButton>}
        isLoading
        isLoadingMessage={isLoadingMessage}>
        <div>Opened content.</div>
      </WuiAccordion>
    </>
  );
};
