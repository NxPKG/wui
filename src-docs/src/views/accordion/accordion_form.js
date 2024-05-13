import React from 'react';

import {
  WuiAccordion,
  WuiText,
  WuiTextColor,
  WuiForm,
  WuiFormRow,
  WuiFieldText,
  WuiFieldPassword,
  WuiIcon,
  WuiTextArea,
  WuiSpacer,
  WuiFlexGroup,
  WuiFlexItem,
  WuiTitle,
  WuiButtonIcon,
} from '../../../../src/components';

const repeatableForm = (
  <WuiForm>
    <WuiFlexGroup>
      <WuiFlexItem>
        <WuiFormRow label="Username">
          <WuiFieldText icon="user" placeholder="John" />
        </WuiFormRow>
      </WuiFlexItem>

      <WuiFlexItem>
        <WuiFormRow
          label="Password"
          helpText="Must include one number and one symbol">
          <WuiFieldPassword icon="lock" />
        </WuiFormRow>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer size="m" />

    <WuiFormRow label="Body">
      <WuiTextArea placeholder="I am a textarea, put some content in me!" />
    </WuiFormRow>
  </WuiForm>
);

const buttonContent = (
  <div>
    <WuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
      <WuiFlexItem grow={false}>
        <WuiIcon type="logoWebhook" size="m" />
      </WuiFlexItem>

      <WuiFlexItem>
        <WuiTitle size="s" className="wuiAccordionForm__title">
          <h3>Webhook</h3>
        </WuiTitle>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiText size="s">
      <p>
        <WuiTextColor color="subdued">
          Will send a POST request to www.example.com/some/path/
        </WuiTextColor>
      </p>
    </WuiText>
  </div>
);

const extraAction = (
  <WuiButtonIcon
    iconType="cross"
    color="danger"
    className="wuiAccordionForm__extraAction"
    aria-label="Delete"
  />
);

export default () => (
  <div>
    <WuiTitle size="s">
      <h3>I am a complicated, highly styled, repeatable form!</h3>
    </WuiTitle>

    <WuiSpacer size="l" />

    <WuiAccordion
      id="accordionForm1"
      className="wuiAccordionForm"
      buttonClassName="wuiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
      paddingSize="l">
      {repeatableForm}
    </WuiAccordion>

    <WuiAccordion
      id="accordionForm2"
      className="wuiAccordionForm"
      buttonClassName="wuiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
      paddingSize="l">
      {repeatableForm}
    </WuiAccordion>
  </div>
);
