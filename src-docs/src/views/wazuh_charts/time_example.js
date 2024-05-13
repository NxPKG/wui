import React, { Fragment } from 'react';

import { ExternalBadge } from './shared';
import { TimeChart } from './time_chart';

import { WuiSpacer, WuiCode } from '../../../../src/components';

export const WazuhChartsTimeExample = {
  title: 'Time series',
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
            Time series charts show data over a period of time, such as trends
            or comparisons across multiple categories. When smaller changes
            exist, it’s better to use line charts rather than bar charts.
          </p>

          <p>
            <strong>Key configurations</strong>
          </p>
          <ul>
            <li>
              <WuiCode language="js">
                BarSeries.xScaleType = &quot;time&quot;
              </WuiCode>
            </li>
            <li>
              <WuiCode language="js">
                tickFormat = timeFormatter(niceTimeFormatByDay(1));
              </WuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <TimeChart />,
    },
  ],
};
