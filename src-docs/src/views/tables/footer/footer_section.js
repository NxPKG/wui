import React from 'react';
import { WuiBasicTable, WuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './footer';
const source = require('!!raw-loader!./footer');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding a footer to a table',
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
      The following example shows how to add a footer to your table by adding{' '}
      <WuiCode>footer</WuiCode> to your column definitions. If one or more of
      your columns contains a <WuiCode>footer</WuiCode> definition, the footer
      area will be visible. By default, columns with no footer specified
      (undefined) will render an empty cell to preserve the table layout. Check
      out the <em>Build a custom table</em> section below for more examples of
      how you can work with table footers in WUI.
    </p>
  ),
  components: { WuiBasicTable },
  demo: <Table />,
};
