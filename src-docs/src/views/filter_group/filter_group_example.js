import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiFilterGroup,
  WuiFilterButton,
  WuiFilterSelectItem,
} from '../../../../src/components';

import FilterGroup from './filter_group';
const filterGroupSource = require('!!raw-loader!./filter_group');
const filterGroupHtml = renderToHtml(FilterGroup);

import FilterGroupSimple from './filter_group_simple';
const filterGroupSimpleSource = require('!!raw-loader!./filter_group_simple');
const filterGroupSimpleHtml = renderToHtml(FilterGroup);

import FilterGroupMulti from './filter_group_multi';
const filterGroupMultiSource = require('!!raw-loader!./filter_group_multi');
const filterGroupMultiHtml = renderToHtml(FilterGroup);

export const FilterGroupExample = {
  title: 'Filter group',
  sections: [
    {
      title: 'Filter buttons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filterGroupSimpleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filterGroupSimpleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use <strong>WuiFilterGroup</strong> to wrap{' '}
            <strong>WuiFilterButtons</strong> into a container that looks nice
            against form fields (like search). These buttons are used in two
            different patterns. The most simplest use is that of an on/off
            pattern to show whether a filter is on. Add the prop{' '}
            <WuiCode>withNext</WuiCode> to remove the border between it and the
            next WuiFilterButton to visually group similar or opposite style
            filters.
          </p>
          <p>
            Add the prop <WuiCode>withNext</WuiCode> to remove the border
            between it and the next WuiFilterButton to visually group similar or
            opposite style filters.
          </p>
          <p>
            Set <WuiCode>hasActiveFilters</WuiCode> to true when the filter is
            active.
          </p>
        </Fragment>
      ),
      props: { WuiFilterGroup, WuiFilterButton },
      demo: <FilterGroupSimple />,
      snippet: `<WuiFilterGroup>
  <WuiFilterButton
    hasActiveFilters={isFilterOn}
    onClick={toggleFilter}
  >
    Single filter
  </WuiFilterButton>
</WuiFilterGroup>`,
    },
    {
      title: 'Multi-select',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filterGroupMultiSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filterGroupMultiHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            To provide a long list of grouped filter, use a popover for
            filtering an array of passed items. This mostly uses standard
            popover mechanics, but the component{' '}
            <strong>WuiFilterSelectItem</strong> is used for the items
            themselves.
          </p>
          <h3>Indicating number of filters</h3>
          <p>
            By passing a number to <WuiCode>numFilters</WuiCode> you can express
            the number of filters available. When the user has applied these
            filter add the prop <WuiCode>hasActiveFilters</WuiCode> as before
            and this will change the coloring of the indicator. You can also
            supply a number to <WuiCode>numActiveFilters</WuiCode>
            which will change the number displayed.
          </p>
        </Fragment>
      ),
      props: { WuiFilterButton, WuiFilterSelectItem },
      demo: <FilterGroupMulti />,
      snippet: `<WuiFilterGroup>
  <WuiPopover
    button={
      <WuiFilterButton
        iconType="arrowDown"
        onClick={onButtonClick}
        isSelected={isPopoverOpen}
        numFilters={items.length}
        hasActiveFilters={true}
        numActiveFilters={2}
      >
        Filters
      </WuiFilterButton>
    }
    isOpen={isPopoverOpen}
    closePopover={closePopover}
  >
    ...
  </WuiPopover>
</WuiFilterGroup>`,
    },
    {
      title: 'Layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filterGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filterGroupHtml,
        },
      ],
      text: (
        <p>
          By default, the bar is auto-widthed based on its contents. To expand
          the bar to fill its parent&apos;s width add{' '}
          <WuiCode>fullWidth</WuiCode>. This will also set each button to grow.
          If you do not want the button to grow, set{' '}
          <WuiCode language="js">grow=false</WuiCode>.
        </p>
      ),
      components: { WuiFilterGroup },
      props: { WuiFilterGroup, WuiFilterButton, WuiFilterSelectItem },
      demo: <FilterGroup />,
      snippet: `<WuiFilterGroup fullWidth>
  <WuiFilterButton>
    Single filter
  </WuiFilterButton>
  <WuiFilterButton grow={false} withNext>
    On
  </WuiFilterButton>
  <WuiFilterButton grow={false}>
    Off
  </WuiFilterButton>
</WuiFilterGroup>`,
    },
  ],
};
