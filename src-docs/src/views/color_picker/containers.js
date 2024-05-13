import React, { Fragment, useState } from 'react';

import {
  WuiColorPicker,
  WuiColorStops,
  WuiButton,
  WuiPopover,
  WuiFormRow,
  WuiModal,
  WuiModalBody,
  WuiModalHeader,
  WuiModalHeaderTitle,
  WuiOverlayMask,
  WuiSpacer,
} from '../../../../src/components';

import {
  useColorPickerState,
  useColorStopsState,
} from '../../../../src/services';

export default () => {
  const [color, setColor] = useColorPickerState('#FFF');
  const [colorStops, setColorStops] = useColorStopsState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const colorPicker = <WuiColorPicker color={color} onChange={setColor} />;

  const stops = (
    <WuiColorStops
      label="Color stops"
      onChange={setColorStops}
      colorStops={colorStops}
      min={0}
      max={100}
    />
  );

  const button = (
    <WuiButton iconType="arrowDown" iconSide="right" onClick={togglePopover}>
      Open popover
    </WuiButton>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <WuiOverlayMask>
        <WuiModal onClose={closeModal} style={{ width: '800px' }}>
          <WuiModalHeader>
            <WuiModalHeaderTitle>Color picker in a modal</WuiModalHeaderTitle>
          </WuiModalHeader>

          <WuiModalBody>
            <WuiFormRow label="Color picker">{colorPicker}</WuiFormRow>
            <WuiSpacer />
            <WuiFormRow label="Color stops">{stops}</WuiFormRow>
          </WuiModalBody>
        </WuiModal>
      </WuiOverlayMask>
    );
  }

  return (
    <Fragment>
      <WuiFormRow
        label="Color picker"
        helpText="This color picker is inside of a form row">
        {colorPicker}
      </WuiFormRow>

      <WuiSpacer />

      <WuiFormRow
        label="Color stops"
        helpText="This color stops component is inside of a form row">
        {stops}
      </WuiFormRow>

      <WuiFormRow label="Unruly focus management">
        <WuiPopover
          id="popover"
          ownFocus={true}
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}>
          <div style={{ width: '300px' }}>
            <WuiFormRow label="Color picker">{colorPicker}</WuiFormRow>
            <WuiSpacer />
            <WuiFormRow label="Color stops">{stops}</WuiFormRow>
          </div>
        </WuiPopover>
      </WuiFormRow>

      <WuiSpacer size="m" />

      <WuiButton onClick={showModal}>Show modal</WuiButton>

      {modal}
    </Fragment>
  );
};
