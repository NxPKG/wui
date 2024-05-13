import React from 'react';
import { WuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_controlled_pagination';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_controlled_pagination');
const html = renderToHtml(Table);

export const controlledPaginationSection = {
  title: 'In-memory table with controlled pagination',
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
        By default <WuiCode>WuiInMemoryTable</WuiCode> resets its page index
        when receiving a new <WuiCode>WuiInMemoryTable</WuiCode> array. To avoid
        this behavior the pagination object optionally takes a
        <WuiCode>pageIndex</WuiCode> value to control this yourself.
        Additionally, <WuiCode>pageSize</WuiCode> can also be controlled the
        same way. Both of these are provided to your app during the
        <WuiCode>onTableChange</WuiCode> callback.
      </p>
      <p>
        The example below updates the array of users every second, randomly
        toggling their online status. Pagination state is maintained by the app,
        preventing it from being reset by the updates.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
