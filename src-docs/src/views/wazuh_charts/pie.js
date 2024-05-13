import React, { useContext } from 'react';
import { ThemeContext } from '../../components';
import { Chart, Partition } from '@elastic/charts';

import {
  WUI_CHARTS_THEME_DARK,
  WUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';
import {
  WuiFlexGrid,
  WuiFlexItem,
  WuiTitle,
  WuiSpacer,
} from '../../../../src/components';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const wuiChartTheme = isDarkTheme
    ? WUI_CHARTS_THEME_DARK
    : WUI_CHARTS_THEME_LIGHT;
  const wuiPartitionConfig = wuiChartTheme.partition;

  return (
    <div>
      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <WuiTitle className="wui-textCenter" size="xs">
            <h3>Year to date PR count by status</h3>
          </WuiTitle>
          <WuiSpacer />
          <Chart size={{ height: 200 }}>
            <Partition
              id="pieByPR"
              data={[
                {
                  status: 'Open',
                  count: 25,
                },
                {
                  status: 'Closed',
                  count: 319,
                },
              ]}
              valueAccessor={d => d.count}
              layers={[
                {
                  groupByRollup: d => d.status,
                  shape: {
                    fillColor: d =>
                      wuiChartTheme.theme.colors.vizColors[d.sortIndex],
                  },
                },
              ]}
              config={{
                ...wuiPartitionConfig,
                clockwiseSectors: false,
              }}
            />
          </Chart>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiTitle className="wui-textCenter" size="xs">
            <h3>Code languages</h3>
          </WuiTitle>
          <WuiSpacer />
          <Chart size={{ height: 200 }}>
            <Partition
              id="donutByLanguage"
              data={[
                {
                  language: 'JavaScript',
                  percent: 51.4,
                },
                {
                  language: 'TypeScript',
                  percent: 39.6,
                },
                {
                  language: 'CSS',
                  percent: 8.7,
                },
              ]}
              valueAccessor={d => Number(d.percent)}
              valueFormatter={() => ''}
              layers={[
                {
                  groupByRollup: d => d.language,
                  shape: {
                    fillColor: d =>
                      wuiChartTheme.theme.colors.vizColors[d.sortIndex],
                  },
                },
              ]}
              config={{
                ...wuiPartitionConfig,
                emptySizeRatio: 0.4,
                clockwiseSectors: false,
              }}
            />
          </Chart>
        </WuiFlexItem>
      </WuiFlexGrid>
    </div>
  );
};
