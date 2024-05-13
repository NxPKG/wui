import React, { Fragment } from 'react';

import {
  WuiFormControlLayout,
  WuiSpacer,
  WuiFormLabel,
  WuiButtonEmpty,
  WuiText,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <WuiFormControlLayout icon="search">
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout isLoading>
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout clear={{ onClick: () => {} }}>
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout isLoading clear={{ onClick: () => {} }}>
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout isLoading icon="search">
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout isLoading icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout isLoading clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout isLoading clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="wuiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout
      prepend={<WuiFormLabel htmlFor="textField19">Label</WuiFormLabel>}>
      <input
        type="text"
        className="wuiFieldText wuiFieldText--inGroup"
        id="textField19"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout
      readOnly
      prepend={<WuiFormLabel htmlFor="textField19a">Read only</WuiFormLabel>}>
      <input
        type="text"
        className="wuiFieldText wuiFieldText--inGroup"
        id="textField19a"
        readOnly
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout
      append={
        <WuiText size="xs">
          <strong>%</strong>
        </WuiText>
      }>
      <input
        type="number"
        className="wuiFieldNumber wuiFieldNumber--inGroup"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>

    <WuiSpacer size="m" />

    <WuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      prepend={
        <WuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
          Button
        </WuiButtonEmpty>
      }>
      <input
        type="text"
        className="wuiFieldText wuiFieldText--inGroup"
        aria-label="Use aria labels when no actual label is in use"
      />
    </WuiFormControlLayout>
  </Fragment>
);
