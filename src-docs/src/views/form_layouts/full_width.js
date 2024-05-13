import React, { Fragment } from 'react';

import {
  WuiFieldSearch,
  WuiRange,
  WuiTextArea,
  WuiFormRow,
  WuiFlexGroup,
  WuiFlexItem,
  WuiSpacer,
  WuiButton,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <WuiFlexGroup>
      <WuiFlexItem>
        <WuiFieldSearch
          placeholder="Search..."
          fullWidth
          aria-label="An example of search with fullWidth"
        />
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        <WuiButton>Search</WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer size="l" />

    <WuiFormRow
      label="Works on form rows too"
      fullWidth
      helpText="Note that the fullWidth prop is not passed to the form row's child">
      <WuiRange fullWidth min={0} max={100} name="range" />
    </WuiFormRow>

    <WuiFormRow label="Often useful for text areas" fullWidth>
      <WuiTextArea
        fullWidth
        placeholder="There is a reason we do not make forms ALWAYS 100% width.
          See how this text area becomes extremely hard to read when the individual
          lines get this long? It is much more readable when contained to a scannable max-width."
      />
    </WuiFormRow>
  </Fragment>
);
