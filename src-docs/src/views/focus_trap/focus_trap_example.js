import React from 'react';
import { Link } from 'react-router-dom';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import { WuiCode, WuiFocusTrap } from '../../../../src/components';

import FocusTrap from './focus_trap';
const focusTrapSource = require('!!raw-loader!./focus_trap');
const focusTrapHtml = renderToHtml(FocusTrap);

export const FocusTrapExample = {
  title: 'Focus trap',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: focusTrapSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: focusTrapHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            Use <strong>WuiFocusTrap</strong> to prevent keyboard-initiated
            focus from leaving a defined area. Temporary flows and UX escapes
            that occur in components such as{' '}
            <Link to="/layout/modal">
              <strong>WuiModal</strong>
            </Link>{' '}
            and{' '}
            <Link to="/layout/flyout">
              <strong>WuiFlyout</strong>
            </Link>{' '}
            are prime examples.
          </p>
          <p>
            For components that project content in a React portal,{' '}
            <strong>WuiFocusTrap</strong> will maintain the tab order expected
            by users.
          </p>
          <p>
            Use <WuiCode>clickOutsideDisables</WuiCode> to disable the focus
            trap when the user clicks outside the trap.
          </p>
          <p>
            Use <WuiCode>noIsolation=false</WuiCode> when pointer events on
            outside elements should be disallowed.
          </p>
        </React.Fragment>
      ),
      props: { WuiFocusTrap },
      demo: <FocusTrap />,
    },
  ],
};
