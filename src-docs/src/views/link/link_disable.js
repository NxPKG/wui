import React, { useState } from 'react';
import {
  WuiLink,
  WuiSwitch,
  WuiSpacer,
  WuiTextColor,
} from '../../../../src/components';

export const LinkDisable = () => {
  const [disableLink, setDisableLink] = useState(true);

  return (
    <div>
      <WuiSwitch
        label="Disable links"
        checked={disableLink}
        onChange={() => setDisableLink(!disableLink)}
      />
      <WuiSpacer size="m" />
      <p>
        This{' '}
        <WuiLink
          color="accent"
          disabled={disableLink}
          onClick={() => window.alert('Button clicked')}>
          paragraph
        </WuiLink>{' '}
        has two{disableLink ? ' disabled ' : ' enabled '}
        <WuiLink
          color="warning"
          disabled={disableLink}
          onClick={() => window.alert('Button clicked')}>
          links
        </WuiLink>{' '}
        in it.
      </p>
      <WuiSpacer size="m" />
      <WuiTextColor color="accent">
        When links are disabled, they inherit the{' '}
        <WuiLink
          color="secondary"
          disabled={disableLink}
          onClick={() => window.alert('Button clicked')}>
          color
        </WuiLink>{' '}
        of surrounding text.
      </WuiTextColor>
    </div>
  );
};
