import React, { useState } from 'react';

import {
  WuiAccordion,
  WuiText,
  WuiButtonGroup,
  WuiSpacer,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();

export default () => {
  const [trigger, setTrigger] = useState('closed');
  const [toggleIdSelected, setID] = useState(`${idPrefix}--closed`);
  const toggleButtons = [
    {
      id: `${idPrefix}--open`,
      label: 'Open',
    },
    {
      id: `${idPrefix}--closed`,
      label: 'Close',
    },
  ];

  const onChange = id => {
    setTrigger(id === toggleButtons[0].id ? 'open' : 'closed');
    setID(id);
  };

  const onToggle = isOpen => {
    const newState = isOpen ? 'open' : 'closed';
    setTrigger(newState);
    setID(`${idPrefix}--${newState}`);
  };

  return (
    <div>
      <WuiButtonGroup
        legend="This is a basic group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={onChange}
      />
      <WuiSpacer />
      <WuiAccordion
        id="accordion--forceState"
        forceState={trigger}
        onToggle={onToggle}
        buttonContent="I am controlled via prop">
        <WuiText>
          <p>
            Any content inside of <strong>WuiAccordion</strong> will appear
            here.
          </p>
        </WuiText>
      </WuiAccordion>
    </div>
  );
};
