import React from 'react';
import {
  WuiCode,
  WuiTable,
  WuiTableBody,
  WuiTableHeader,
  WuiTableHeaderCell,
  WuiTableHeaderCellCheckbox,
  WuiTablePagination,
  WuiTableRow,
  WuiTableRowCellCheckbox,
  WuiTableHeaderMobile,
  WuiTableSortMobile,
  WuiTableSortMobileItem,
} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import Custom from './custom';
const source = require('!!raw-loader!./custom');
const html = renderToHtml(Custom);
import { cellPropsInfo } from './props_info';

export const section = {
  title: 'Build a custom table from individual components',
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
        As an alternative to <strong>WuiBasicTable</strong> you can instead
        construct a table from individual{' '}
        <strong>low level, basic components</strong> like{' '}
        <strong>WuiTableHeader</strong>
        &nbsp;and <strong>WuiTableRowCell</strong>. Below is one of many ways
        you might set this up on your own. Important to note are how you need to
        set individual props like the <WuiCode>truncateText</WuiCode> prop to
        cells to enforce a single-line behavior and truncate their contents, or
        set the <WuiCode>textOnly</WuiCode> prop to <WuiCode>false</WuiCode> if
        you need the contents to be a direct descendent of the cell.
      </p>
      <h3>Responsive extras</h3>
      <p>
        You must supply a <WuiCode language="js">mobileOptions.header</WuiCode>{' '}
        prop equivalent to the column header on each{' '}
        <strong>WuiTableRowCell</strong> so that the mobile version will use
        that to populate the per cell headers.
      </p>
      <p>
        Also, custom table implementations <strong>will not</strong>{' '}
        auto-populate any header level functions like selection and filtering.
        In order to add mobile support for these functions, you will need to
        implement the <strong>WuiTableHeaderMobile</strong> component as a
        wrapper around these and use <strong>WuiTableSortMobile</strong>
        &nbsp;and <strong>WuiTableSortMobileItem</strong> components to supply
        mobile sorting. See demo below.
      </p>
    </div>
  ),
  components: { WuiTable },
  props: {
    WuiTable,
    WuiTableBody,
    WuiTableHeader,
    WuiTableHeaderCell,
    WuiTableHeaderCellCheckbox,
    WuiTablePagination,
    WuiTableRow,
    WuiTableRowCellCheckbox,
    ...cellPropsInfo,
    WuiTableHeaderMobile,
    WuiTableSortMobile,
    WuiTableSortMobileItem,
  },
  demo: <Custom />,
};
