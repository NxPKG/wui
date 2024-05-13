import React, { useState, Fragment } from 'react';

import {
  WuiComboBox,
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

const optionsStatic = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Iapetus',
  },
  {
    label: 'Phoebe',
  },
  {
    label: 'Rhea',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPopoverOpen, setPopover] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const onChange = selectedOptions => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        option => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected(prevSelected => [...prevSelected, newOption]);
  };

  const comboBox = (
    <WuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
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
            <WuiModalHeaderTitle>Combo box in a modal</WuiModalHeaderTitle>
          </WuiModalHeader>

          <WuiModalBody>{comboBox}</WuiModalBody>
        </WuiModal>
      </WuiOverlayMask>
    );
  }

  return (
    <Fragment>
      <WuiFormRow
        label="Combo box"
        helpText="This combo box is inside of a form row">
        {comboBox}
      </WuiFormRow>

      <WuiSpacer />

      <WuiPopover
        id="popover"
        ownFocus
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <div style={{ width: '300px' }}>{comboBox}</div>
      </WuiPopover>

      <WuiSpacer size="m" />

      <WuiButton onClick={showModal}>Show modal</WuiButton>

      {modal}
    </Fragment>
  );
};
