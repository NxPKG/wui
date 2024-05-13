import React from 'react';
import { WuiBasicTable, WuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './selection';
const source = require('!!raw-loader!./selection');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding selection to a table',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    },
    {
      type: GuideSectionTypes.HTML,
      code: html,
    },
  ],
  text: (
    <p>
      The following example shows how to configure selection via the{' '}
      <WuiCode>selection</WuiCode>
      property. You can set items to be selected initially by passing an array
      of items as the <WuiCode>initialSelected</WuiCode> value inside{' '}
      <WuiCode>selection</WuiCode> property. You can also use the{' '}
      <WuiCode>setSelection</WuiCode> method to take complete control over table
      selection. This can be useful if you want to handle selection in table
      based on user interaction with another part of the UI.
    </p>
  ),
  components: { WuiBasicTable },
  demo: <Table />,
};
