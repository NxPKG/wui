import React from 'react';

import {
  WuiModal,
  WuiModalBody,
  WuiModalHeader,
  WuiModalHeaderTitle,
  WuiOverlayMask,
} from '../../../../src/components';

import { ModalExample } from './modal_example_container';

const BasicModal = ({ onClose }) => (
  <WuiOverlayMask>
    <WuiModal onClose={onClose} style={{ width: '800px' }}>
      <WuiModalHeader>
        <WuiModalHeaderTitle>Example modal</WuiModalHeaderTitle>
      </WuiModalHeader>
      <WuiModalBody>
        <p>
          This modal closes when you press ESC, using a window event listener.
        </p>
      </WuiModalBody>
    </WuiModal>
  </WuiOverlayMask>
);

export const BasicWindowEvent = () => <ModalExample modal={BasicModal} />;
