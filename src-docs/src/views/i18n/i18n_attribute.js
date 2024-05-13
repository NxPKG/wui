import React from 'react';

import {
  WuiCode,
  WuiFieldText,
  WuiI18n,
  WuiFormRow,
  WuiTitle,
  useWuiI18n,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  return (
    <>
      <WuiTitle size="xs">
        <h3>useWuiI18n used in an attribute</h3>
      </WuiTitle>
      <p>
        <WuiFormRow
          label={
            <>
              This text field&apos;s placeholder reads from{' '}
              <WuiCode>wuiI18nAttribute.placeholderName</WuiCode>
            </>
          }>
          <WuiFieldText
            placeholder={useWuiI18n(
              'wuiI18nAttribute.placeholderName',
              'John Doe'
            )}
          />
        </WuiFormRow>
      </p>

      <WuiSpacer size="l" />

      <WuiTitle size="xs">
        <h3>WuiI18n used as a render prop</h3>
      </WuiTitle>
      <WuiI18n token="wuiI18nAttribute.placeholderName" default="John Doe">
        {placeholderName => (
          <WuiFormRow
            label={
              <>
                This text field&apos;s placeholder reads from{' '}
                <WuiCode>wuiI18nAttribute.placeholderName</WuiCode>
              </>
            }>
            <WuiFieldText placeholder={placeholderName} />
          </WuiFormRow>
        )}
      </WuiI18n>
    </>
  );
};
