/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';

import { Theming } from './theming';
const themingSource = require('!!raw-loader!./theming');
const themingHtml = renderToHtml(Theming);

import { Categorical } from './theming_categorical';

import {
  WuiSpacer,
  WuiText,
  WuiCodeBlock,
  WuiLink,
  WuiCallOut,
} from '../../../../src/components';

export const WazuhChartsThemingExample = {
  title: 'Creating charts',
  intro: (
    <Fragment>
      <ExternalBadge />
      <WuiSpacer size="l" />
      <WuiText>
        <p>
          WUI provides utilities and documentation for working with{' '}
          <WuiLink
            href="https://elastic.github.io/elastic-charts"
            target="_blank">
            Elastic Charts
          </WuiLink>
          , an open source charting library also created and maintained by
          Elastic.
        </p>
      </WuiText>
      <WuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Theming via WUI',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: themingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            WUI provides both light and dark theme files to use in tandem with
            Elastic Charts. Simply import these objects from the themes folder
            and pass the correct one to the Settings.theme property.
          </p>
          <WuiCodeBlock language="javascript" isCopyable fontSize="s">
            {`import { WUI_CHARTS_THEME_DARK, WUI_CHARTS_THEME_LIGHT } from '@wazuh/wui/dist/wui_charts_theme';

const wuiTheme = isDarkTheme ? WUI_CHARTS_THEME_DARK.theme : WUI_CHARTS_THEME_LIGHT.theme;

<Settings theme={wuiTheme} />`}
          </WuiCodeBlock>
          <WuiCallOut title="Wazuh engineers" iconType="logoWazuh">
            <p>
              WUI provides a plugin utility for ease of pulling in the correct
              theme object depending on the current Wazuh theme. Learn more from
              this{' '}
              <WuiLink href="https://wazuh.com" target="_blank">
                readme
              </WuiLink>
              .
            </p>
          </WuiCallOut>
          <WuiSpacer />
          <p>
            WUI also provides some basic{' '}
            <Link to="/utilities/color-palettes">
              color palettes and functions
            </Link>{' '}
            if you would like to change the default color blind safe scheme to
            another palette. You can import these from the services folder.
            Create a new partial theme object with your chosen colors and
            prepend it to the list of themes supplied to Settings.
          </p>

          <WuiCodeBlock language="javascript" isCopyable fontSize="s">
            {`import { wuiPalettePositive } from '../../../../src/services';

const customColors = {
  colors: {
    vizColors: wuiPalettePositive(5),
  },
};

<Settings theme={[customColors, wuiTheme]} />`}
          </WuiCodeBlock>
          <p>You&apos;ll find an example of these in the demo below.</p>
        </Fragment>
      ),
      demo: <Theming />,
    },
    {
      title: 'Coloring charts',
      text: (
        <Fragment>
          <p>
            <strong>
              Use color to distinguish categories, represent quantity/density,
              and highlight data. When using color in this way, be aware that
              too many colors in a single chart can create noise and hinder
              quick comprehension.
            </strong>
          </p>
          <p>
            When creating a multi-series chart where each series shows{' '}
            <strong>contrasting</strong> data, use the color blind safe palette
            of contrasting colors. This will also avoid implying levels of
            magnitude.
          </p>
          <p>
            Think about the data you are delivering and if there is a way to{' '}
            <strong>highlight</strong> key indicators. If you can combine the
            series into logical groups, use contrasting shapes and styles, but
            keep the same color for within groups.
          </p>
          <h3>Quantity vs trends</h3>
          <p>
            When coloring for sequential series data (not categorical), rely on
            conventions. If the data signifies <strong>quantities</strong>, use
            a single color that spans from light colors for low amounts to dark
            colors for high amounts. If the data signifies{' '}
            <strong>trends</strong>, use a two-color divergent scheme, with the
            darkest colors at the extremes. Remember that red means bad/negative
            and green is good/positive.
          </p>
          <p>
            Whan signifying quantities, group values into intervals instead of a
            continuous gradient scale.
          </p>
        </Fragment>
      ),
      demo: <Categorical />,
    },
  ],
};
