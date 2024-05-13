import React from 'react';

import { WuiKeyboardAccessible, WuiText } from '../../../../src/components';

// For custom components, we just need to make sure they delegate props to their rendered root
// element, e.g. onClick, tabIndex, and role.
const CustomComponent = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

export default () => (
  <div>
    <WuiText>
      <WuiKeyboardAccessible>
        <div onClick={() => window.alert('Div clicked')}>Click this div</div>
      </WuiKeyboardAccessible>

      <WuiKeyboardAccessible>
        <a
          className="wuiLink"
          onClick={() => window.alert('Anchor tag clicked')}>
          Click this anchor tag
        </a>
      </WuiKeyboardAccessible>

      <WuiKeyboardAccessible>
        <CustomComponent
          onClick={() => window.alert('Custom component clicked')}>
          Click this custom component
        </CustomComponent>
      </WuiKeyboardAccessible>

      <WuiKeyboardAccessible>
        <div
          onClick={() => window.alert('Outer WuiKeyboardAccessible clicked')}>
          This WuiKeyboardAccessible contains another
          WuiKeyboardAccessible&nbsp;
          <WuiKeyboardAccessible>
            <a
              className="wuiLink"
              onClick={() =>
                window.alert('Inner WuiKeyboardAccessible clicked')
              }>
              Clicking this inner one should call both onClick handlers
            </a>
          </WuiKeyboardAccessible>
        </div>
      </WuiKeyboardAccessible>
    </WuiText>
  </div>
);
