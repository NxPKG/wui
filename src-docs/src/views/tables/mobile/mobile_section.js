import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './mobile';
import { propsInfo } from './props_info';
import { WuiTextColor } from '../../../../../src/components/text';
import { WuiCode, WuiCodeBlock } from '../../../../../src/components/code';
const source = require('!!raw-loader!./mobile');
const html = renderToHtml(Table);

const exampleItem = `{
  field: 'firstName',
  name: 'First Name',
  truncateText: true,
  mobileOptions: {
    render: (item) => (<span>{item.firstName} {item.lastName}</span>), // Custom renderer for mobile view only
    header: false,   // Won't show inline header in mobile view
    fullWidth: true, // Forces 100% width of the cell
    enlarge: true,   // Increase text size compared to rest of cells
    truncateText: false, // Only works if a 'render()' is also provided
  }
}`;

export const section = {
  title: 'Responsive tables',
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
        Allowing a table to be responsive means breaking each row down into its
        own section and individually displaying each table header above the cell
        contents. There are few times when you may want to exclude this behavior
        from your table, for instance, when the table has very few columns or
        the table does not break down easily into this format. For these use
        cases, you may set <WuiCode language="js">responsive=false</WuiCode>.
      </p>
      <h4>
        To make your table work responsively, please make sure you add the
        following <WuiTextColor color="danger">additional</WuiTextColor> props
        to the top level table component (<strong>WuiBasicTable</strong> or{' '}
        <strong>WuiInMemoryTable</strong>):
      </h4>
      <ul>
        <li>
          <WuiCode>isSelectable</WuiCode>: if the table has a single column of
          checkboxes for selecting rows
        </li>
        <li>
          <WuiCode>isExpandable</WuiCode>: if the table has rows that can expand
        </li>
        <li>
          <WuiCode>hasActions</WuiCode>: if the table has a column for actions
          which may/may not be hidden in hover
        </li>
      </ul>
      <h4>
        The <WuiCode>mobileOptions</WuiCode> object can be passed to the{' '}
        <strong>WuiTableRowCell</strong> directly or with each column item
        provided to <strong>WuiBasicTable</strong>.
      </h4>
      <WuiCodeBlock language="js">{exampleItem}</WuiCodeBlock>
      <h4>Note:</h4>
      <p>
        You can also change basic table row cell props like{' '}
        <WuiCode>truncateText</WuiCode> and <WuiCode>textOnly</WuiCode> for
        mobile layouts, though you must also be passing a mobile specific render
        function.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
