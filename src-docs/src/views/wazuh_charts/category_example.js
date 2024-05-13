import React, { Fragment } from 'react';
import { ExternalBadge } from './shared';
import { CategoryChart } from './category_chart';

import { WuiSpacer, WuiCode } from '../../../../src/components';

export const WazuhChartsCategoryExample = {
  title: 'Categorical',
  intro: (
    <Fragment>
      <ExternalBadge />
      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      text: (
        <Fragment>
          <p>
            Categorical charts compare data between multiple distinct
            categories. Avoid using a line chart because it might create
            confusion with a time series chart. Use a bar chart instead.
          </p>

          <p>
            <strong>Key configurations</strong>
          </p>

          <ul>
            <li>
              <WuiCode language="js">Settings.rotation = 90</WuiCode>
            </li>
            <li>
              <WuiCode language="js">
                BarSeries.data = orderBy(DATASET, [&apos;count&apos;],
                [&apos;desc&apos;])
              </WuiCode>
            </li>
            <li>
              <WuiCode language="js">
                BarSeries.xAccessor = &quot;vizType&quot;
              </WuiCode>
            </li>
            <li>
              <WuiCode language="js">
                Axis.tickFormat = (d =&gt; Number(d)&apos;k&apos;)
              </WuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <CategoryChart />,
    },
  ],
};
