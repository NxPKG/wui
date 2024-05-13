import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiKeyPadMenu,
  WuiKeyPadMenuItem,
  WuiCallOut,
} from '../../../../src/components';
import { keyPadMenuItemConfig } from './playground';

import KeyPadMenu from './key_pad_menu';
const keyPadMenuSource = require('!!raw-loader!./key_pad_menu');
const keyPadMenuHtml = renderToHtml(KeyPadMenu);
const keyPadMenuSnippet = `<WuiKeyPadMenu>
  <WuiKeyPadMenuItem label={label1} href="#">
    <WuiIcon type={icon1} size="l" />
  </WuiKeyPadMenuItem>
  <WuiKeyPadMenuItem label={label2} href="#">
    <WuiIcon type={icon2} size="l" />
  </WuiKeyPadMenuItem>
</WuiKeyPadMenu>
`;

import KeyPadMenuItemButton from './key_pad_menu_item_button';
const keyPadMenuItemButtonSource = require('!!raw-loader!./key_pad_menu_item_button');
const keyPadMenuItemButtonHtml = renderToHtml(KeyPadMenuItemButton);
const keyPadMenuItemButtonSnippet = `<WuiKeyPadMenuItem
  label={label}
  onClick={handleClick}>
  <WuiIcon type={icon} size="l" />
</WuiKeyPadMenuItem>
`;

import KeyPadBeta from './key_pad_beta';
const keyPadBetaSource = require('!!raw-loader!./key_pad_beta');
const keyPadBetaHtml = renderToHtml(KeyPadBeta);
const keyPadBetaSnippet = `<WuiKeyPadMenuItem
  label={label}
  href="#"
  betaBadgeLabel={betaBadgeLabel}
  betaBadgeTooltipContent={tooltipContent}
  betaBadgeIconType={badgeIconType}>
  <WuiIcon type={menuItemIcon} size="l" />
</WuiKeyPadMenuItem>
`;

export const KeyPadMenuExample = {
  title: 'Key pad menu',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadMenuHtml,
        },
      ],
      text: (
        <>
          <p>
            The <strong>WuiKeyPadMenu</strong> component presents{' '}
            <strong>WuiKeyPadMenuItems</strong> in a tiled format, with a fixed
            width which will accommodate three items and then wrap.
          </p>
          <WuiCallOut
            iconType="accessibility"
            title={
              <>
                If the menu provides navigation for your application, wrap the{' '}
                <strong>WuiKeyPadMenu</strong> with{' '}
                <WuiCode language="html">
                  {'<nav aria-label="Nav title"></nav>'}
                </WuiCode>
                .
              </>
            }
          />
        </>
      ),
      props: { WuiKeyPadMenu, WuiKeyPadMenuItem },
      snippet: keyPadMenuSnippet,
      demo: <KeyPadMenu />,
    },
    {
      title: 'Item button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuItemButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadMenuItemButtonHtml,
        },
      ],
      text: (
        <p>
          The <strong>WuiKeyPadMenuItem</strong> component can act both as an
          anchor as well as a button by specifying <WuiCode>href</WuiCode> or
          <WuiCode>onClick</WuiCode> respectively.
        </p>
      ),
      snippet: keyPadMenuItemButtonSnippet,
      demo: <KeyPadMenuItemButton />,
    },
    {
      title: 'Beta item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadBetaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadBetaHtml,
        },
      ],
      text: (
        <div>
          <p>
            If the item links to a module that is not GA (beta, lab, etc), you
            can add a <WuiCode>betaBadgeLabel</WuiCode> and{' '}
            <WuiCode>betaBadgeTooltipContent</WuiCode> to the card and it will
            properly create and position an <strong>WuiBetaBadge</strong>.
          </p>
          <p>
            Supplying just a label will only show the first letter in the badge
            and supply the full label to the tooltip. You can also pass an{' '}
            <WuiCode>iconType</WuiCode> to replace the letter only badge and the
            label will still become the title.
          </p>
        </div>
      ),
      snippet: keyPadBetaSnippet,
      demo: <KeyPadBeta />,
    },
  ],
  playground: keyPadMenuItemConfig,
};
