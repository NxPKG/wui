import React, { Fragment, useState } from 'react';

import {
  WuiHighlight,
  WuiFieldSearch,
  WuiFormRow,
  WuiSpacer,
  WuiSwitch,
} from '../../../../src/components';

export function Highlight() {
  const [searchValue, setSearchValue] = useState('jumped over');
  const [isHighlightAll, setHighlightAll] = useState(false);

  const onSearchChange = e => {
    setSearchValue(e.target.value);
  };
  const changeHighlightAll = e => {
    setHighlightAll(e.target.checked);
  };

  return (
    <Fragment>
      <WuiFormRow label="Enter text to highlight substrings within a string">
        <WuiFieldSearch
          value={searchValue}
          onChange={e => {
            onSearchChange(e);
          }}
        />
      </WuiFormRow>

      <WuiSpacer size="m" />
      <WuiSwitch
        label="Highlight all"
        checked={isHighlightAll}
        onChange={e => changeHighlightAll(e)}
      />
      <WuiSpacer size="m" />
      <WuiHighlight search={searchValue} highlightAll={isHighlightAll}>
        The quick brown fox jumped over the lazy dog
      </WuiHighlight>
    </Fragment>
  );
}
