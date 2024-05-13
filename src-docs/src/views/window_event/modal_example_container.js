import React, { useState } from 'react';
import { WuiButton } from '../../../../src/components';

import { WuiWindowEvent } from '../../../../src/services';

export const ModalExample = props => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const close = () => {
    if (open) {
      setOpen(false);
    }
  };

  const closeOnEscape = ({ key }) => {
    if (key === 'Escape') {
      close();
    }
  };

  const { modal: Modal, buttonText = 'Open Modal' } = props;
  const button = <WuiButton onClick={openModal}>{buttonText}</WuiButton>;

  return (
    <div>
      <WuiWindowEvent event="keydown" handler={closeOnEscape} />
      {open ? <Modal onClose={close} /> : button}
    </div>
  );
};
