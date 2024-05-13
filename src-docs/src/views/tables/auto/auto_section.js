import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';
import { WuiCode } from '../../../../../src/components';

import { Table } from './auto';

const source = require('!!raw-loader!./auto');
const html = renderToHtml(Table);
const layoutSnippet = [
  `<WuiBasicTable
  columns={[
    { field: 'column1', name: 'Column 1' },
    { field: 'column2', name: 'Column 2' }
  ]}
  tableLayout="auto"
/>
`,
  `<WuiBasicTable
    columns={[
      { field: 'column1', name: 'Column 1', truncateText: true, width: '20%' },
      { field: 'column2', name: 'Column 2' }
    ]}
    tableLayout="fixed"
/>`,
];

export const section = {
  title: 'Table layout',
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
    <div>
      <p>
        <strong>WuiBasicTable</strong> has a fixed layout by default. You can
        change it to <WuiCode>auto</WuiCode> using the{' '}
        <WuiCode>tableLayout</WuiCode> prop. Note that setting{' '}
        <WuiCode>tableLayout</WuiCode> to <WuiCode>auto</WuiCode> prevents the{' '}
        <WuiCode>truncateText</WuiCode> prop from working properly. If you want
        to set different columns widths while still being able to use{' '}
        <WuiCode>truncateText</WuiCode>, set the width of each column using the{' '}
        <WuiCode>width</WuiCode> prop.
      </p>
    </div>
  ),
  snippet: layoutSnippet,
  demo: <Table />,
};
