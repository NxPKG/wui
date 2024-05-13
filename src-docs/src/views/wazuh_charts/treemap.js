import React, { useContext } from 'react';
import { ThemeContext } from '../../components';
import { Chart, Partition, Settings, PartitionLayout } from '@elastic/charts';
import { GITHUB_DATASET_MOD } from './data';
import { wuiPaletteColorBlind } from '../../../../src/services';

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

  /**
   * Create a 3 rotation palette (one for each level)
   */
  const groupedPalette = wuiPaletteColorBlind({
    rotations: 3,
    order: 'group',
    sortBy: 'natural',
  });

  return (
    <div>
      <WuiTitle className="wui-textCenter" size="xs">
        <h3>Github issues by label</h3>
      </WuiTitle>
      <WuiSpacer />
      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings showLegend legendMaxDepth={2} />
            <Partition
              id="sunburst"
              data={GITHUB_DATASET_MOD}
              valueAccessor={d => d.count}
              layers={[
                {
                  groupByRollup: d => d.total,
                  shape: {
                    fillColor: isDarkTheme
                      ? WUI_CHARTS_THEME_DARK.partition.sectorLineStroke
                      : WUI_CHARTS_THEME_LIGHT.partition.sectorLineStroke,
                  },
                  hideInLegend: true,
                },
                {
                  groupByRollup: d => d.vizType,
                  shape: {
                    fillColor: d => groupedPalette[d.sortIndex * 3],
                  },
                },
                {
                  groupByRollup: d => d.issueType,
                  shape: {
                    fillColor: d =>
                      groupedPalette[d.parent.sortIndex * 3 + d.sortIndex + 1],
                  },
                },
              ]}
              config={{
                ...(isDarkTheme
                  ? WUI_CHARTS_THEME_DARK.partition
                  : WUI_CHARTS_THEME_LIGHT.partition),
                clockwiseSectors: false,
                fillLabel: {
                  ...(isDarkTheme
                    ? WUI_CHARTS_THEME_DARK.partition.fillLabel
                    : WUI_CHARTS_THEME_LIGHT.partition.fillLabel),
                  textInvertible: true,
                },
              }}
            />
          </Chart>
        </WuiFlexItem>
        <WuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings showLegend legendMaxDepth={1} />
            <Partition
              id="treemap"
              data={GITHUB_DATASET_MOD}
              valueAccessor={d => d.count}
              valueGetter="percent"
              topGroove={0}
              layers={[
                {
                  groupByRollup: d => d.vizType,
                  shape: {
                    fillColor: d => groupedPalette[d.sortIndex * 3],
                  },
                  fillLabel: {
                    valueFormatter: () => '',
                    textColor: 'rgba(0,0,0,0)', // Keeps the label in the legend, but hides it from view
                  },
                },
                {
                  groupByRollup: d => d.issueType,
                  shape: {
                    fillColor: d =>
                      groupedPalette[d.parent.sortIndex * 3 + d.sortIndex],
                  },
                },
              ]}
              config={{
                partitionLayout: PartitionLayout.treemap,
                ...(isDarkTheme
                  ? WUI_CHARTS_THEME_DARK.partition
                  : WUI_CHARTS_THEME_LIGHT.partition),
              }}
            />
          </Chart>
        </WuiFlexItem>
      </WuiFlexGrid>
    </div>
  );
};
