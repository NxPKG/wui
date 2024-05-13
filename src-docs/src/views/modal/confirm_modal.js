import React, { useState } from 'react';

import {
  WuiButton,
  WuiConfirmModal,
  WuiOverlayMask,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [isEmptyModalVisible, setIsEmptyModalVisible] = useState(false);
  const [
    isButtonDisabledModalVisible,
    setIsButtonDisabledModalVisible,
  ] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);

  const closeEmptyModal = () => setIsEmptyModalVisible(false);
  const showEmptyModal = () => setIsEmptyModalVisible(true);

  const closeButtonDisabledModal = () => setIsButtonDisabledModalVisible(false);
  const showButtonDisabledModal = () => setIsButtonDisabledModalVisible(true);

  let modal;

  if (isModalVisible) {
    modal = (
      <WuiOverlayMask>
        <WuiConfirmModal
          title="Do this thing"
          onCancel={closeModal}
          onConfirm={closeModal}
          cancelButtonText="No, don't do it"
          confirmButtonText="Yes, do it"
          defaultFocusedButton="confirm">
          <p>You&rsquo;re about to do something.</p>
          <p>Are you sure you want to do this?</p>
        </WuiConfirmModal>
      </WuiOverlayMask>
    );
  }

  let destroyModal;

  if (isDestroyModalVisible) {
    destroyModal = (
      <WuiOverlayMask>
        <WuiConfirmModal
          title="Do this destructive thing"
          onCancel={closeDestroyModal}
          onConfirm={closeDestroyModal}
          cancelButtonText="No, don't do it"
          confirmButtonText="Yes, do it"
          buttonColor="danger"
          defaultFocusedButton="confirm">
          <p>You&rsquo;re about to destroy something.</p>
          <p>Are you sure you want to do this?</p>
        </WuiConfirmModal>
      </WuiOverlayMask>
    );
  }

  let emptyModal;

  if (isEmptyModalVisible) {
    emptyModal = (
      <WuiOverlayMask>
        <WuiConfirmModal
          title="Do this thing"
          onCancel={closeEmptyModal}
          onConfirm={closeEmptyModal}
          cancelButtonText="No, don't do it"
          confirmButtonText="Yes, do it"
          defaultFocusedButton="confirm"
        />
      </WuiOverlayMask>
    );
  }

  let buttonDisabledModal;

  if (isButtonDisabledModalVisible) {
    buttonDisabledModal = (
      <WuiOverlayMask>
        <WuiConfirmModal
          title="My button is disabled"
          onCancel={closeButtonDisabledModal}
          onConfirm={closeButtonDisabledModal}
          cancelButtonText="No, don't do it"
          confirmButtonText="Yes, do it"
          defaultFocusedButton="cancel"
          confirmButtonDisabled={true}
        />
      </WuiOverlayMask>
    );
  }

  return (
    <div>
      <WuiFlexGroup wrap gutterSize="xs">
        <WuiFlexItem grow={false}>
          <WuiButton onClick={showModal}>Show confirm modal</WuiButton>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiButton onClick={showDestroyModal}>
            Show dangerous confirm modal
          </WuiButton>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiButton onClick={showEmptyModal}>
            Show title-only confirm modal
          </WuiButton>
        </WuiFlexItem>
        <WuiFlexItem grow={false}>
          <WuiButton onClick={showButtonDisabledModal}>
            Show confirm disabled confirm modal
          </WuiButton>
        </WuiFlexItem>
      </WuiFlexGroup>
      {modal}
      {destroyModal}
      {emptyModal}
      {buttonDisabledModal}
    </div>
  );
};
