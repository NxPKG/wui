import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';
import { WuiCode } from '../../../../../src/components';
import { propsInfo } from './props_info';

import { Table } from './basic';

const source = require('!!raw-loader!./basic');
const html = renderToHtml(Table);

export const section = {
  title: 'A basic table',
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
        <strong>WuiBasicTable</strong> is an opinionated high level component
        that standardizes both display and injection. At its most simple it only
        accepts two properties:
      </p>
      <ul>
        <li>
          <WuiCode>items</WuiCode> are an array of objects that should be
          displayed in the table; one item per row. The exact item data that
          will be rendered in each cell in these rows is determined by the{' '}
          <WuiCode>columns</WuiCode> property. You can define{' '}
          <WuiCode>rowProps</WuiCode> and <WuiCode>cellProps</WuiCode> props
          which can either be objects or functions that return objects. The
          returned objects will be applied as props to the rendered rows and row
          cells, respectively.
        </li>
        <li>
          <WuiCode>columns</WuiCode> defines what columns the table has and how
          to extract item data to display each cell in each row.
        </li>
      </ul>
      <p>
        This example shows the most basic form of the{' '}
        <strong>WuiBasicTable</strong>. It is configured with the required{' '}
        <WuiCode>items</WuiCode> and <WuiCode>columns</WuiCode> properties. It
        shows how each column defines the data it needs to display per item.
        Some columns display the value as is (e.g. <WuiCode>firstName</WuiCode>{' '}
        and <WuiCode>lastName</WuiCode> fields for the user column). Other
        columns customize the display of the data before it is injected. This
        customization can be done in two (non-mutual exclusive) ways:
      </p>
      <ul>
        <li>
          Provide a hint about the type of data (e.g. the &quot;Date of
          Birth&quot; column indicates that the data it shows is of type{' '}
          <WuiCode>date</WuiCode>). Providing data type hints will cause
          built-in display components to be adjusted (e.g. numbers will become
          right aligned, just like Excel).
        </li>
        <li>
          Provide a <WuiCode>render</WuiCode> function that given the value (and
          the item as a second argument) returns the React node that should be
          displayed as the content of the cell. This can be as simple as
          formatting values (e.g. the &quot;Date of Birth&quot; column) to
          utilizing more complex React components (e.g. the &quot;Online&quot;,
          &quot;Github&quot;, and &quot;Nationality&quot; columns as seen
          below).
          <br />
          <strong>Note:</strong> the basic table will treat any cells that use a{' '}
          <WuiCode>render</WuiCode> function as being{' '}
          <WuiCode language="js">textOnly: false</WuiCode>. This may cause
          unnecessary word breaks. Apply{' '}
          <WuiCode language="js">textOnly: true</WuiCode> to ensure it breaks
          properly.
        </li>
      </ul>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
