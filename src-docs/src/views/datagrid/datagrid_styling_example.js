import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import {
  WuiDataGrid,
  WuiCode,
  WuiCodeBlock,
  WuiListGroupItem,
} from '../../../../src/components';

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');
const dataGridContainerHtml = renderToHtml(DataGridContainer);

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling');
const dataGridStylingHtml = renderToHtml(DataGridStyling);

import DataGridControls from './additional_controls';
const dataGridControlsSource = require('!!raw-loader!./additional_controls');
const dataGridControlsHtml = renderToHtml(DataGridControls);

import DataGridColumnWidths from './column_widths';
import DataGridColumnActions from './column_actions';
const dataGridColumnWidthsSource = require('!!raw-loader!./column_widths');
const dataGridColumnWidthsHtml = renderToHtml(DataGridColumnWidths);
const dataGridColumnActionsSource = require('!!raw-loader!./column_actions');
const dataGridColumnActionsHtml = renderToHtml(DataGridColumnActions);

import {
  WuiDataGridColumn,
  WuiDataGridColumnActions,
  WuiDataGridStyle,
  WuiDataGridToolBarVisibilityOptions,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

const gridSnippet = `<WuiDataGrid
  {...usualProps}
  columns={[
    // three columns are available, but restrict Avatar to 50px and don't let users resize it
    { id: 'Avatar', initialWidth: 50, isResizable: false },
    { id: 'Name' },
    { id: 'Email' },
  ]}
  // This can work as a shape.
  toolbarVisibility={{
    showStyleSelector: false
    showSortSelector: false
    showFullScreenSelector: false
    // showColumnSelector also takes an object, check the prop docs.
    showColumnSelector: false
    additionalControls: (
      <Fragment>
        <WuiButtonEmpty
          size="xs"
          iconType="bell"
          color="text"
          className="wuiDataGrid__controlBtn"
          onClick={() => alert('You clicked me! Hugs.')}>
          New button
        </WuiButtonEmpty>
        <WuiButtonEmpty
          size="xs"
          iconType="branch"
          color="text"
          className="wuiDataGrid__controlBtn"
          onClick={() => alert('You clicked me! Hugs.')}>
          Another button
        </WuiButtonEmpty>
      </Fragment>
    )
  }}
  // Or as a boolean to turn everything off.
  toolbarVisibility={false}
  // Change the initial style of the grid.
  gridStyle={{
    border: 'all',
    stripes: true,
    rowHover: 'highlight',
    header: 'shade',
    // If showStyleSelector={true} from toolbarVisibility, these last two will be superceded by what the user decides.
    fontSize: 'm',
    cellPadding: 'm',
    footer: 'overline'
  }}
/>
`;

const controlsSnippet = `<WuiDataGrid
  {...usualGridProps}
  toolbarVisibility={{
    // Use of a fragment for multiple items will insure proper margins
    additionalControls: (
      <Fragment>
        <WuiButtonEmpty
          size="xs"
          iconType="bell"
          color="text"
          className="wuiDataGrid__controlBtn"
          onClick={() => alert('You clicked me! Hugs.')}>
          New button
        </WuiButtonEmpty>
        <WuiButtonEmpty
          size="xs"
          iconType="branch"
          color="text"
          className="wuiDataGrid__controlBtn"
          onClick={() => alert('You clicked me! Hugs.')}>
          Another button
        </WuiButtonEmpty>
      </Fragment>
    )
  }}
/>
`;

const widthsSnippet = `<WuiDataGrid
  {...usualGridProps}
  columns={[
    {
      id: 'Column A',
      initialWidth: 100, // start at 100px
    },
    {
      id: 'Column B',
      isResizable: false, // don't let users resize this column
    },
  ]}
/>
`;

export const DataGridStylingExample = {
  title: 'Data grid styling and control',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridStylingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridStylingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Styling can be passed down to the grid through the{' '}
            <WuiCode>gridStyle</WuiCode> prop. It accepts an object that allows
            for customization.
          </p>
          <p>
            The <WuiCode>toolbarVisibility</WuiCode> prop when used as a boolean
            controls the visibility of the toolbar displayed above the grid.
            Using the prop as a shape, allows setting the visibility of the
            individual buttons within.
          </p>
          <p>
            With the default settings, the <WuiCode>showStyleSelector</WuiCode>{' '}
            setting in <WuiCode>toolbarVisibility</WuiCode> means the user has
            the ability to override the padding and font size passed into{' '}
            <WuiCode>gridStyle</WuiCode> by the engineer.
          </p>
          <WuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </WuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridStyling },

      props: {
        WuiDataGrid,
        WuiDataGridStyle,
        WuiDataGridToolBarVisibilityOptions,
      },
      demo: <DataGridStyling />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridContainerHtml,
        },
      ],
      title: 'Data grid adapts to its container',
      text: (
        <p>
          When wrapped inside a container, like a dashboard panel, the grid will
          start hiding controls and adopt a more strict flex layout. Use the
          <WuiCode>minSizeForControls</WuiCode> prop to control the min width to
          enables/disables grid controls based on available width.
        </p>
      ),
      components: { DataGridContainer },

      demo: <DataGridContainer />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridControlsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridControlsHtml,
        },
      ],
      title: 'Additional controls in the toolbar',
      text: (
        <p>
          Use the <WuiCode>toolbarVisibility.additionalControls</WuiCode> prop
          to pass additional controls to the toolbar. These will always live to
          the left of the full screen button. It will respect the{' '}
          <WuiCode language="js">toolbarVisibility={'{false}'}</WuiCode> setting
          and hide when appropriate. Although any node can fit in this space,
          the recommendation is to use <strong>WuiButtonEmpty</strong>{' '}
          components with the configuration shown in the snippet.
        </p>
      ),
      components: { DataGridControls },
      snippet: controlsSnippet,
      demo: <DataGridControls />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnWidthsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridColumnWidthsHtml,
        },
      ],
      title: 'Column width constraints',
      text: (
        <Fragment>
          <p>
            By default, visible columns are given equal widths to fill up
            available space in the grid and can be resized by the user to any
            desired width. There are two parameters on{' '}
            <strong>WuiDataGridColumn</strong> to change this default behavior.{' '}
            <WuiCode>initialWidth</WuiCode> is a numeric value providing the
            starting width of a column, in pixels. Second, the{' '}
            <WuiCode>isResizable</WuiCode> value can be set to{' '}
            <WuiCode>false</WuiCode> to remove the user&apos;s ability to resize
            column.
          </p>
          <p>
            Below, the first column is given an initial width and is not
            resizable. The second column is also given an initial width but its
            width can still be changed.
          </p>
        </Fragment>
      ),
      components: { DataGridColumnWidths },
      snippet: widthsSnippet,
      props: {
        WuiDataGrid,
        WuiDataGridColumn,
      },
      demo: <DataGridColumnWidths />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridColumnActionsHtml,
        },
      ],
      title: 'Column actions',
      text: (
        <Fragment>
          <p>
            By default, columns provide actions for sorting, moving and hiding.
            These can be extended with custom actions. You can customize the
            actions by setting the <WuiCode>actions</WuiCode> value of{' '}
            <strong>WuiDataGridColumn</strong>. Setting it to{' '}
            <WuiCode>false</WuiCode> removes the action menu displayed. You can
            configure it by passing an object of type{' '}
            <strong>WuiDataGridColumnAction</strong>. This allows you a hide,
            configure the existing actions and add new ones.
          </p>
          <p>
            Below, the first column provides no action, the second doesn&apos;t
            provide the ability to hide the columns, the 3rd provides an
            additional action, the 4th overwrites the hide action with a custom
            label and icon.
          </p>
        </Fragment>
      ),
      components: { DataGridColumnActions },
      snippet: widthsSnippet,
      props: {
        WuiDataGrid,
        WuiDataGridColumn,
        WuiDataGridColumnActions,
        WuiListGroupItem,
      },
      demo: <DataGridColumnActions />,
    },
  ],
};
