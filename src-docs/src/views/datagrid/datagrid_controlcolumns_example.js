import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { WuiDataGrid, WuiCodeBlock, WuiCode } from '../../../../src/components';

import DataGridControlColumns from './control_columns';
const dataGridControlColumnsSource = require('!!raw-loader!./control_columns');
const dataGridControlColumnsHtml = renderToHtml(DataGridControlColumns);

import { WuiDataGridControlColumn } from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

const gridSnippet = `<WuiDataGrid
  {...usualProps}
  leadingControlColumns={[
    {
      id: 'selection',
      width: 31,
      headerCellRender: () => <span>Select a Row</span>,
      rowCellRender: () => <div><WuiSelectBox ... /></div>,
    },
  ]}
  trailingControlColumns={[
    {
      id: 'actions',
      width: 40,
      headerCellRender: () => null,
      rowCellRender: MyGridActionsComponent,
    },
  ]}
/>
`;

export const DataGridControlColumnsExample = {
  title: 'Data grid control columns',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridControlColumnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridControlColumnsHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Control columns can be used to include ancillary cells not based on
            the dataset, such as row selection checkboxes or action buttons.
            These columns can be placed at either side of the data grid, and
            users are unable to resize, sort, or rearrange them.
          </p>
          <p>
            These custom columns are defined by passing an array of
            WuiDataGridControlColumn objects (see <em>Props</em> tab below) to{' '}
            <WuiCode>leadingControlColumns</WuiCode> and/or{' '}
            <WuiCode>trailingControlColumns</WuiCode>.
          </p>
          <p>
            As with the data grid&apos;s <WuiCode>renderCellValue</WuiCode>, the
            control columns&apos; <WuiCode>headerCellRender</WuiCode> and{' '}
            <WuiCode>rowCellRender</WuiCode> props are treated as React
            components.
          </p>
          <WuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </WuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridControlColumns },

      props: {
        WuiDataGrid,
        WuiDataGridControlColumn,
      },
      demo: <DataGridControlColumns />,
    },
  ],
};
