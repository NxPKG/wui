import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { WuiDataGrid, WuiCodeBlock, WuiCode } from '../../../../src/components';

import DataGridFooterRow from './footer_row';
const dataGridControlColumnsSource = require('!!raw-loader!./footer_row');
const dataGridControlColumnsHtml = renderToHtml(DataGridFooterRow);

import { WuiDataGridControlColumn } from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';
import { WuiDataGridCellValueElementProps } from '!!prop-loader!../../../../src/components/datagrid/data_grid_cell';

const gridSnippet = `const footerCellValues = {
  // desired data
};

<WuiDataGrid
  {...usualProps}
  renderFooterCellValue={({ columnId }) =>
    footerCellValues[columnId] || null
  }
/>
`;

export const DataGridFooterRowExample = {
  title: 'Data grid footer row',
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
            A footer row can be used to include value aggregations to the grid.
            Values could be based on the dataset, such as sum/average/min/max of
            numeric values in a column, or any other necessary data.
          </p>
          <p>
            The footer row is defined by passing{' '}
            <WuiCode>renderFooterCellValue</WuiCode> function prop into
            WuiDataGrid. <WuiCode>renderFooterCellValue</WuiCode> acts like a
            React component, receiving{' '}
            <WuiCode>WuiDataGridCellValueElementProps</WuiCode> and returning a
            React node.
          </p>
          <WuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </WuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridFooterRow },

      props: {
        WuiDataGrid,
        WuiDataGridControlColumn,
        WuiDataGridCellValueElementProps,
      },
      demo: <DataGridFooterRow />,
    },
  ],
};
