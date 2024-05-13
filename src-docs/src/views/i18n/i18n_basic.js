import React from 'react';

import {
  WuiI18n,
  WuiTitle,
  WuiSpacer,
  useWuiI18n,
} from '../../../../src/components';

export default () => {
  return (
    <>
      <WuiTitle size="xs">
        <h3>Basic useWuiI18n usage</h3>
      </WuiTitle>
      <p>
        {useWuiI18n(
          'wuiI18nBasic.basicexample',
          'This is the English copy that would be replaced by a translation defined by the i18n.basicexample token.'
        )}
      </p>

      <WuiSpacer size="l" />

      <WuiTitle size="xs">
        <h3>Basic WuiI18n usage</h3>
      </WuiTitle>
      <p>
        <WuiI18n
          token="wuiI18nBasic.basicexample"
          default="This is the English copy that would be replaced by a translation defined by the i18n.basicexample token."
        />
      </p>
    </>
  );
};
