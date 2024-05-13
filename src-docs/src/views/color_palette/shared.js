import React from 'react';
import classNames from 'classnames';

import {
  WuiFlexItem,
  WuiCopy,
  WuiCode,
  WuiLink,
} from '../../../../src/components';

export const ColorPaletteFlexItem = ({ hexCode, className, ...rest }) => {
  return (
    <WuiFlexItem
      key={hexCode}
      grow={false}
      className={classNames('guideColorPalette__swatch', className)}
      {...rest}>
      <span title={hexCode} style={{ backgroundColor: hexCode }} />
    </WuiFlexItem>
  );
};

export const ColorPaletteCopyCode = ({ textToCopy, code }) => {
  return (
    <span>
      <WuiCopy
        beforeMessage="Click to copy palette config"
        textToCopy={textToCopy || code}>
        {copy => (
          <WuiLink onClick={copy}>
            <WuiCode>{code}</WuiCode>
          </WuiLink>
        )}
      </WuiCopy>
    </span>
  );
};
