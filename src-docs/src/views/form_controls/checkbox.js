import React, { useState, Fragment } from 'react';

import { WuiCheckbox, WuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setindeterminate] = useState(true);

  const onChange = e => {
    setChecked(e.target.checked);
  };

  const onChangeIndeterminate = () => {
    setindeterminate(!indeterminate);
  };

  return (
    <Fragment>
      <WuiCheckbox
        id={htmlIdGenerator()()}
        label="I am a checkbox"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <WuiSpacer size="m" />

      <WuiCheckbox
        id={htmlIdGenerator()()}
        label="I am an indeterminate checkbox"
        indeterminate={indeterminate}
        onChange={() => onChangeIndeterminate()}
      />

      <WuiSpacer size="m" />

      <WuiCheckbox
        id={htmlIdGenerator()()}
        label="I am a disabled checkbox"
        checked={checked}
        onChange={e => onChange(e)}
        disabled
      />

      <WuiSpacer size="m" />

      <WuiCheckbox
        id={htmlIdGenerator()()}
        label="I am a compressed checkbox"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
