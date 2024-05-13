import React, { useState } from 'react';

import {
  WuiAccordion,
  WuiButton,
  WuiSpacer,
  WuiText,
  WuiScreenReaderOnly,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const Rows = () => {
  const [counter, setCounter] = useState(1);
  const rows = [];
  for (let i = 1; i <= counter; i++) {
    rows.push(<li key={i}>Row {i}</li>);
  }
  const growingAccordianDescriptionId = htmlIdGenerator()();
  const listId = htmlIdGenerator()();
  return (
    <WuiText>
      <WuiScreenReaderOnly>
        <p id={growingAccordianDescriptionId}>
          Currently height is set to {counter} items
        </p>
      </WuiScreenReaderOnly>
      <WuiSpacer size="s" />
      <p>
        <WuiButton
          onClick={() => setCounter(counter + 1)}
          aria-controls={listId}
          aria-describedby={growingAccordianDescriptionId}>
          Increase height to {counter + 1} items
        </WuiButton>{' '}
        <WuiButton
          aria-controls={listId}
          aria-describedby={growingAccordianDescriptionId}
          onClick={() => setCounter(Math.max(0, counter - 1))}
          isDisabled={counter === 1}>
          Decrease height to {counter - 1} item{counter > 2 && 's'}
        </WuiButton>
      </p>
      <ul id={listId}>{rows}</ul>
    </WuiText>
  );
};

export default () => (
  <WuiAccordion
    id="accordian7"
    buttonContent="Click me to toggle close / open"
    initialIsOpen={true}
    paddingSize="l">
    <Rows />
  </WuiAccordion>
);
