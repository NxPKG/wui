import React from 'react';
import { WuiBasicTable, WuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './sorting';
const source = require('!!raw-loader!./sorting');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding sorting to a table',
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
      The following example shows how to configure column sorting via the{' '}
      <WuiCode>sorting</WuiCode> property and flagging the sortable columns as{' '}
      <WuiCode language="js">sortable: true</WuiCode>. To enable the default
      sorting ability for <strong>every</strong> column, pass{' '}
      <WuiCode language="js">enableAllColumns: true</WuiCode> to the{' '}
      <WuiCode>sorting</WuiCode> prop.
    </p>
  ),
  components: { WuiBasicTable },
  demo: <Table />,
};
