import React, { useState, Fragment } from 'react';

import {
  WuiButton,
  WuiForm,
  WuiSelect,
  WuiFormRow,
  WuiTextArea,
  WuiFieldText,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const [showErrors, setShowErrors] = useState(true);

  const onButtonClick = () => {
    setShowErrors(!showErrors);
  };

  const button = (
    <WuiButton fill color="danger" onClick={onButtonClick}>
      Toggle errors
    </WuiButton>
  );

  let errors;

  if (showErrors) {
    errors = [
      "Here's an example of an error",
      'You might have more than one error, so pass an array.',
    ];
  }

  return (
    <Fragment>
      <WuiForm isInvalid={showErrors} error={errors}>
        <WuiFormRow label="Validation only" isInvalid={showErrors}>
          <WuiFieldText name="first" isInvalid={showErrors} />
        </WuiFormRow>

        <WuiFormRow
          label="Validation with help text and errors"
          helpText="I am some friendly help text."
          isInvalid={showErrors}
          error={errors}>
          <WuiFieldText name="text" isInvalid={showErrors} />
        </WuiFormRow>

        <WuiFormRow label="Text area" isInvalid={showErrors}>
          <WuiTextArea name="area" isInvalid={showErrors} />
        </WuiFormRow>

        <WuiFormRow label="Select" isInvalid={showErrors}>
          <WuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            isInvalid={showErrors}
          />
        </WuiFormRow>

        <WuiSpacer />

        {button}
      </WuiForm>
    </Fragment>
  );
};
