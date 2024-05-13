import React, { useState } from 'react';

import { WuiCollapsibleNav } from '../../../../src/components/collapsible_nav';
import { WuiButton, WuiButtonToggle } from '../../../../src/components/button';
import { WuiTitle } from '../../../../src/components/title';
import { WuiSpacer } from '../../../../src/components/spacer';
import { WuiText } from '../../../../src/components/text';
import { WuiCode } from '../../../../src/components/code';

export default () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, setNavIsDocked] = useState(false);

  return (
    <>
      <WuiCollapsibleNav
        isOpen={navIsOpen}
        isDocked={navIsDocked}
        button={
          <WuiButton onClick={() => setNavIsOpen(!navIsOpen)}>
            Toggle nav
          </WuiButton>
        }
        onClose={() => setNavIsOpen(false)}>
        <div style={{ padding: 16 }}>
          <WuiTitle>
            <h2>I am some nav</h2>
          </WuiTitle>
          <WuiSpacer />
          <WuiButtonToggle
            label={`Docked: ${navIsDocked ? 'on' : 'off'}`}
            fill={navIsDocked}
            onChange={() => {
              setNavIsDocked(!navIsDocked);
            }}
          />
        </div>
      </WuiCollapsibleNav>

      {navIsDocked && (
        <WuiText size="s" color="subdued">
          <p>
            The button gets hidden by default when the nav is docked unless you
            set <WuiCode language="js">showButtonIfDocked = true</WuiCode>.
          </p>
        </WuiText>
      )}
    </>
  );
};
