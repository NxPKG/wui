import React from 'react';

import { WuiI18nNumber } from '../../../../src/components';

export default () => {
  return (
    <p>
      Formatted count of users: <WuiI18nNumber value={5000000} />
    </p>
  );
};
