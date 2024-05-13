import React, { useState, Fragment } from 'react';

import {
  WuiButton,
  WuiButtonEmpty,
  WuiFieldText,
  WuiForm,
  WuiFormRow,
  WuiModal,
  WuiModalBody,
  WuiModalFooter,
  WuiModalHeader,
  WuiModalHeaderTitle,
  WuiOverlayMask,
  WuiRange,
  WuiSwitch,
  WuiCodeBlock,
  WuiSpacer,
  WuiSuperSelect,
  WuiText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [superSelectvalue, setSuperSelectValue] = useState('option_one');

  const onSwitchChange = () =>
    setIsSwitchChecked(isSwitchChecked => !isSwitchChecked);

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  const superSelectOptions = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <WuiText size="s" color="subdued">
            <p className="wuiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </WuiText>
        </Fragment>
      ),
    },
  ];

  const formSample = (
    <WuiForm>
      <WuiFormRow>
        <WuiSwitch
          id={htmlIdGenerator()()}
          name="popswitch"
          label="Isn't this modal form cool?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </WuiFormRow>

      <WuiFormRow label="A text field">
        <WuiFieldText name="popfirst" />
      </WuiFormRow>

      <WuiFormRow label="Range" helpText="Some help text for the range">
        <WuiRange min={0} max={100} name="poprange" />
      </WuiFormRow>

      <WuiFormRow label="A SuperSelect field">
        <WuiSuperSelect
          options={superSelectOptions}
          valueOfSelected={superSelectvalue}
          onChange={value => onSuperSelectChange(value)}
          itemLayoutAlign="top"
          hasDividers
        />
      </WuiFormRow>

      <WuiSpacer />

      <WuiCodeBlock language="html" paddingSize="s" isCopyable>
        {'<h1>Title</h1>'}
      </WuiCodeBlock>
    </WuiForm>
  );

  const onSuperSelectChange = value => {
    setSuperSelectValue(value);
  };

  let modal;

  if (isModalVisible) {
    modal = (
      <WuiOverlayMask>
        <WuiModal onClose={closeModal} initialFocus="[name=popswitch]">
          <WuiModalHeader>
            <WuiModalHeaderTitle>Modal title</WuiModalHeaderTitle>
          </WuiModalHeader>

          <WuiModalBody>{formSample}</WuiModalBody>

          <WuiModalFooter>
            <WuiButtonEmpty onClick={closeModal}>Cancel</WuiButtonEmpty>

            <WuiButton onClick={closeModal} fill>
              Save
            </WuiButton>
          </WuiModalFooter>
        </WuiModal>
      </WuiOverlayMask>
    );
  }
  return (
    <div>
      <WuiButton onClick={showModal}>Show modal</WuiButton>

      {modal}
    </div>
  );
};
