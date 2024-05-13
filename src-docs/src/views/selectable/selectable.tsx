import React, { useState } from 'react';

import { WuiSelectable } from '../../../../src/components/selectable';
import { Options } from './data';

export default () => {
  const [options, setOptions] = useState(Options);

  return (
    <WuiSelectable
      aria-label="Basic example"
      options={options}
      listProps={{ bordered: true }}
      onChange={newOptions => setOptions(newOptions)}>
      {list => list}
    </WuiSelectable>
  );
};
