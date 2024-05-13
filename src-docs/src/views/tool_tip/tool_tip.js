import React from 'react';

import {
  WuiIcon,
  WuiToolTip,
  WuiLink,
  WuiText,
  WuiFieldText,
  WuiSpacer,
  WuiButton,
} from '../../../../src/components';

export default () => (
  <div>
    <WuiText>
      <p>
        This tooltip appears on the{' '}
        <WuiToolTip position="top" content="Here is some tooltip text">
          <WuiLink href="#">top</WuiLink>
        </WuiToolTip>
      </p>

      <p>
        This tooltip appears on the{' '}
        <WuiToolTip
          position="left"
          title="Tooltip titles are optional"
          content="Here is some tooltip text. Lets add some more content to see how it wraps.">
          <WuiLink href="#">left</WuiLink>
        </WuiToolTip>{' '}
        and includes the optional title.
      </p>

      <p>
        This tooltip appears on the{' '}
        <WuiToolTip position="right" content="Here is some tooltip text">
          <WuiLink href="#">right</WuiLink>
        </WuiToolTip>
      </p>

      <p>
        This tooltip has a long delay because it might be in a repeatable
        component{' '}
        <WuiToolTip delay="long" content="Here is some tooltip text">
          <WuiLink href="#">wink</WuiLink>
        </WuiToolTip>
      </p>

      <p>
        This tooltip appears on the bottom of this icon:{' '}
        <WuiToolTip position="bottom" content="Here is some tooltip text">
          <WuiIcon tabIndex="0" type="alert" title="Icon with tooltip" />
        </WuiToolTip>
      </p>
    </WuiText>

    <WuiSpacer />

    <WuiToolTip position="right" content="Works on anything">
      <WuiFieldText
        placeholder="Hover over me"
        aria-label="ToolTip appears on hover"
      />
    </WuiToolTip>

    <WuiSpacer />

    <WuiToolTip
      position="top"
      content={
        <p>
          Works on any kind of element &mdash; buttons, inputs, you name it!
        </p>
      }>
      <WuiButton
        onClick={() => alert('Buttons are still clickable within tooltips.')}>
        Hover me
      </WuiButton>
    </WuiToolTip>
  </div>
);
