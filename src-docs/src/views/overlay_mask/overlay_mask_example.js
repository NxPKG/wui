import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { WuiCode } from '../../../../src/components';

import { WuiOverlayMaskProps } from './props';

import OverlayMask from './overlay_mask';
const overlayMaskSource = require('!!raw-loader!./overlay_mask');
const overlayMaskHtml = renderToHtml(OverlayMask);

import OverlayMaskHeader from './overlay_mask_header';
const overlayMaskHeaderSource = require('!!raw-loader!./overlay_mask_header');
const overlayMaskHeaderHtml = renderToHtml(OverlayMaskHeader);

export const OverlayMaskExample = {
  title: 'Overlay mask',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overlayMaskSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: overlayMaskHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>WuiOverlayMask</strong> is simply a display component used
            to obscure the main content to bring attention to its children or
            other content. It is best used in conjunction with hyper-focus
            content areas like <Link to="/layout/modal">modals</Link> and{' '}
            <Link to="/layout/flyout">flyouts</Link>.
          </p>
          <p>
            There are{' '}
            <a href="https://www.nngroup.com/articles/overuse-of-overlays/">
              many considerations
            </a>{' '}
            to make before choosing to use an overlay. At the very least, you
            must provide a visible button to close the overlay. You can also
            pass an <WuiCode>onClick</WuiCode> handler to handle closing the
            overlay.
          </p>
        </div>
      ),
      props: { WuiOverlayMask: WuiOverlayMaskProps },
      snippet: `<WuiOverlayMask onClick={() => {}}>
  <!-- Content goes here -->
</WuiOverlayMask>`,
      demo: <OverlayMask />,
    },
    {
      title: 'Masks with header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overlayMaskHeaderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: overlayMaskHeaderHtml,
        },
      ],
      text: (
        <div>
          <p>
            Managing z-index levels of multiple portal-positioned components and
            their different contexts is complicated from within the library.{' '}
            <strong>WuiOverlayMask</strong> gives you control over whether it
            should appear below or above an{' '}
            <Link to="/layout/header">
              <strong>WuiHeader</strong>
            </Link>{' '}
            by providing the <WuiCode>headerZindexLocation</WuiCode> prop. By
            default this is set to <WuiCode>{'"above"'}</WuiCode> for common
            cases like with{' '}
            <Link to="/layout/modal">
              <strong>WuiModal</strong>
            </Link>{' '}
            where the header should be obscured. However, a component like{' '}
            <Link to="/layout/flyout">
              <strong>WuiFlyout</strong>
            </Link>{' '}
            which utilizes the overlay mask but should keep the header visible
            needs to change this prop to <WuiCode>{'"below"'}</WuiCode>.
          </p>
        </div>
      ),
      props: { WuiOverlayMask: WuiOverlayMaskProps },
      snippet: `<WuiOverlayMask onClick={toggleFlyOut} headerZindexLocation="below" />
<WuiFlyout onClose={toggleFlyOut}></WuiFlyout>`,
      demo: <OverlayMaskHeader />,
    },
  ],
};
