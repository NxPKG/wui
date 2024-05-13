import React, { Fragment, useState } from 'react';

import {
  WuiCode,
  WuiFieldText,
  WuiForm,
  WuiFormRow,
  WuiDescribedFormGroup,
  WuiFilePicker,
  WuiRange,
  WuiSelect,
  WuiSwitch,
  WuiLink,
} from '../../../../src/components';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <WuiForm>
      <WuiDescribedFormGroup
        title={<h3>Single text field</h3>}
        description={
          <Fragment>
            A single text field that can be used to display additional text. It
            can have{' '}
            <WuiLink href="http://www.wazuh.com" target="_blank">
              links
            </WuiLink>{' '}
            or any other type of content.
          </Fragment>
        }>
        <WuiFormRow label="Text field">
          <WuiFieldText name="first" aria-label="Example" />
        </WuiFormRow>
      </WuiDescribedFormGroup>

      <WuiDescribedFormGroup title={<h3>No description</h3>}>
        <WuiFormRow label="Text field">
          <WuiFieldText name="first" />
        </WuiFormRow>
      </WuiDescribedFormGroup>

      <WuiDescribedFormGroup
        title={<h3>Multiple fields</h3>}
        description="Here are three form rows. The first form row does not have a title.">
        <WuiFormRow
          hasEmptyLabelSpace
          helpText={<span>This is a help text</span>}>
          <WuiSelect
            hasNoInitialSelection
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            aria-label="An example of a form element without a visible label"
          />
        </WuiFormRow>

        <WuiFormRow label="File picker">
          <WuiFilePicker />
        </WuiFormRow>

        <WuiFormRow label="Range">
          <WuiRange min={0} max={100} name="range" id="range" />
        </WuiFormRow>
      </WuiDescribedFormGroup>

      <WuiDescribedFormGroup
        title={<h2>Full width</h2>}
        titleSize="xxxs"
        description={
          <Fragment>
            By default, <strong>WuiDescribedFormGroup</strong> will be double
            the default width of form elements. However, you can pass{' '}
            <WuiCode>fullWidth</WuiCode> prop to this, the individual field and
            row components to expand to their container.
          </Fragment>
        }
        fullWidth>
        <WuiFormRow
          label="Use a switch instead of a single checkbox"
          hasChildLabel={false}
          fullWidth>
          <WuiSwitch
            name="switch"
            label="Should we do this?"
            checked={isSwitchChecked}
            onChange={onSwitchChange}
          />
        </WuiFormRow>

        <WuiFormRow fullWidth>
          <WuiFieldText
            name="second"
            fullWidth
            aria-label="An example of WuiTextField with fullWidth"
          />
        </WuiFormRow>
      </WuiDescribedFormGroup>
    </WuiForm>
  );
};
