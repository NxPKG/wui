import React, { useContext, Fragment } from 'react';
import { cloneDeep } from 'lodash';
import { ThemeContext } from '../../components';
import {
  Chart,
  BarSeries,
  Settings,
  LineSeries,
  AreaSeries,
} from '@elastic/charts';

import {
  WUI_CHARTS_THEME_DARK,
  WUI_CHARTS_THEME_LIGHT,
  WUI_SPARKLINE_THEME_PARTIAL,
} from '../../../../src/themes/charts/themes';

import {
  WuiPanel,
  WuiStat,
  WuiFlexGrid,
  WuiFlexItem,
  WuiIcon,
  WuiSpacer,
  WuiText,
} from '../../../../src/components';

import { TIME_DATA_SMALL } from './data';
import {
  wuiPaletteForDarkBackground,
  wuiPaletteForLightBackground,
} from '../../../../src/services';

export const Sparklines = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const theme = [
    WUI_SPARKLINE_THEME_PARTIAL,
    isDarkTheme ? WUI_CHARTS_THEME_DARK.theme : WUI_CHARTS_THEME_LIGHT.theme,
  ];

  const TIME_DATA_SMALL_REVERSE = cloneDeep(TIME_DATA_SMALL).reverse();
  const TIME_DATA_SMALL_REVERSE_MAJOR = cloneDeep(TIME_DATA_SMALL_REVERSE);
  TIME_DATA_SMALL_REVERSE_MAJOR[
    TIME_DATA_SMALL_REVERSE_MAJOR.length - 1
  ][1] = -100;

  return (
    <Fragment>
      <WuiFlexGrid columns={4} responsive={false}>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat title="" description="Number of things" textAlign="right">
              <WuiSpacer size="s" />
              <Chart size={{ height: 64 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <BarSeries
                  id="numbers"
                  data={TIME_DATA_SMALL}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? wuiPaletteForDarkBackground()[1]
                      : wuiPaletteForLightBackground()[1],
                  ]}
                />
              </Chart>
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat
              title=""
              description="Increase over time"
              titleColor="secondary"
              textAlign="right">
              <WuiSpacer size="s" />
              <Chart size={{ height: 48 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <LineSeries
                  id="increase"
                  data={TIME_DATA_SMALL}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? wuiPaletteForDarkBackground()[1]
                      : wuiPaletteForLightBackground()[1],
                  ]}
                />
              </Chart>
              <WuiSpacer size="s" />
              <WuiText size="xs" color="secondary">
                <WuiIcon type="sortUp" /> <strong>15%</strong>
              </WuiText>
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat
              title={
                <span>
                  <WuiIcon size="xl" type="sortDown" /> 15%
                </span>
              }
              description="Major decrease over time"
              titleColor="danger"
              textAlign="right">
              <WuiSpacer size="s" />
              <Chart size={{ height: 16 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <LineSeries
                  id="major"
                  data={TIME_DATA_SMALL_REVERSE_MAJOR}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? wuiPaletteForDarkBackground()[3]
                      : wuiPaletteForLightBackground()[3],
                  ]}
                />
              </Chart>
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiPanel>
            <WuiStat
              title=""
              description="Subtle decrease"
              titleColor="danger"
              textAlign="right">
              <WuiSpacer size="s" />
              <Chart size={{ height: 48 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <AreaSeries
                  id="subtle"
                  data={TIME_DATA_SMALL_REVERSE}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? wuiPaletteForDarkBackground()[3]
                      : wuiPaletteForLightBackground()[3],
                  ]}
                />
              </Chart>
              <WuiSpacer size="s" />
              <WuiText size="xs" color="danger">
                - 15 points since last Tuesday
              </WuiText>
            </WuiStat>
          </WuiPanel>
        </WuiFlexItem>
      </WuiFlexGrid>
    </Fragment>
  );
};
