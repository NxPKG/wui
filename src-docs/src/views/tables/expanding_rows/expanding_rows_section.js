import React from 'react';
import { WuiBasicTable, WuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './expanding_rows';
const source = require('!!raw-loader!./expanding_rows');
const html = renderToHtml(Table);

export const section = {
  title: 'Expanding rows',
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
      You can expand rows by passing in a{' '}
      <WuiCode>itemIdToExpandedRowMap</WuiCode> prop which will contain the
      content you want rendered inside the expanded row. When building out your
      table manually (not using WuiBasicTable), you will also need to add the
      prop <WuiCode>isExpandedRow</WuiCode> to the row that will be revealed.
    </p>
  ),
  components: { WuiBasicTable },
  demo: <Table />,
};
