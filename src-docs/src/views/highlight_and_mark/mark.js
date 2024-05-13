import React, { Fragment } from 'react';

import { WuiMark } from '../../../../src/components';

export function Mark() {
  return (
    <Fragment>
      The quick brown fox <WuiMark>jumped over</WuiMark> the lazy dog
    </Fragment>
  );
}
