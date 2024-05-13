import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiModal,
  WuiConfirmModal,
  WuiOverlayMask,
} from '../../../../src/components';
import Guidelines from './guidelines';

import Modal from './modal';
const modalSource = require('!!raw-loader!./modal');
const modalHtml = renderToHtml(Modal);

import ConfirmModal from './confirm_modal';
const confirmModalSource = require('!!raw-loader!./confirm_modal');
const confirmModalHtml = renderToHtml(ConfirmModal);

import OverflowTest from './overflow_test';
const overflowTestSource = require('!!raw-loader!./overflow_test');
const overflowTestHtml = renderToHtml(OverflowTest);

const modalSnippet = `<WuiModal onClose={closeModal}>
  <WuiModalHeader>
    <WuiModalHeaderTitle><!-- Modal title --></WuiModalHeaderTitle>
  </WuiModalHeader>

  <WuiModalBody>
    <!-- Modal body -->
  </WuiModalBody>

  <WuiModalFooter>
    <!-- Modal footer -->
  </WuiModalFooter>
</WuiModal>`;

const confirmModalSnippet = [
  `<WuiConfirmModal
  title={title}
  onCancel={closeModal}
  onConfirm={closeModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}>
  <!-- ConfirmModal content -->
</WuiConfirmModal>`,
  `<WuiConfirmModal
  title={title}
  onCancel={closeDestroyModal}
  onConfirm={closeDestroyModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}
  buttonColor="danger">
  <!-- Dangerous ConfirmModal content -->
</WuiConfirmModal>`,
];

export const ModalExample = {
  title: 'Modal',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: modalHtml,
        },
      ],
      text: (
        <p>
          Use a modal to temporarily interrupt a user’s current task and block
          interactions to the content below it. Be sure to read the full{' '}
          <Link to="/layout/modal/guidelines">modal usage guidelines</Link>.
        </p>
      ),
      props: { WuiModal, WuiOverlayMask },
      snippet: modalSnippet,
      demo: <Modal />,
    },
    {
      title: 'Confirm modal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: confirmModalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: confirmModalHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>WuiConfirmModal</strong> to ask the user to confirm a
          decision. The default type is a positive or neutral confirmation. To
          change the main button color change the <WuiCode>buttonColor</WuiCode>{' '}
          property to any of the button color options.
        </p>
      ),
      props: { WuiConfirmModal },
      snippet: confirmModalSnippet,
      demo: <ConfirmModal />,
    },
    {
      title: 'Overflow test',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overflowTestSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: overflowTestHtml,
        },
      ],
      text: <p>This demo is to test long overflowing body content.</p>,
      props: { WuiConfirmModal },
      demo: <OverflowTest />,
    },
  ],
  guidelines: <Guidelines />,
};
