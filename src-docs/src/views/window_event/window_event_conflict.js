import React, { useState } from 'react';

import {
  WuiModal,
  WuiModalBody,
  WuiModalHeader,
  WuiModalHeaderTitle,
  WuiOverlayMask,
  WuiFieldText,
  WuiSpacer,
} from '../../../../src/components';
import { keys } from '../../../../src/services';

import { ModalExample } from './modal_example_container';

const ConflictModal = props => {
  const [inputValue, setInputValue] = useState('');

  const updateInputValue = e => {
    setInputValue(e.target.value);
  };
  const clearInputValueOnEscape = event => {
    if (event.key === keys.ESCAPE) {
      setInputValue('');
      event.stopPropagation();
    }
  };

  return (
    <WuiOverlayMask>
      <WuiModal onClose={props.onClose} style={{ width: '800px' }}>
        <WuiModalHeader>
          <WuiModalHeaderTitle>Example modal</WuiModalHeaderTitle>
        </WuiModalHeader>
        <WuiModalBody>
          <WuiFieldText
            value={inputValue}
            onChange={updateInputValue}
            onKeyDown={clearInputValueOnEscape}
          />
          <WuiSpacer size="s" />
          <p>While typing in this field, ESC will clear the field.</p>
          <WuiSpacer size="l" />
          <p>
            Otherwise, the event bubbles up to the window and ESC closes the
            modal.
          </p>
        </WuiModalBody>
      </WuiModal>
    </WuiOverlayMask>
  );
};

export const WindowEventConflict = () => (
  <ModalExample
    modal={ConflictModal}
    buttonText="Open Modal with Conflicting Listener"
  />
);
