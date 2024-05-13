import React from 'react';

import { Link } from 'react-router-dom';

import imageIcons from '../../images/icons.svg';
import imageButtons from '../../images/buttons.svg';
import imageTables from '../../images/tables.svg';
import imageForms from '../../images/forms.svg';
import imageFlexgrid from '../../images/flexgrid.svg';
import imageCards from '../../images/cards.svg';
import imagePages from '../../images/page.svg';
import imageText from '../../images/text.svg';
import imageCharts from '../../images/charts.svg';
import logoFigma from '../../images/logo-figma.svg';

import {
  WuiCard,
  WuiFlexGrid,
  WuiFlexGroup,
  WuiFlexItem,
  WuiIcon,
  WuiLink,
  WuiSpacer,
  WuiText,
  WuiTitle,
  WuiToolTip,
  WuiScreenReaderOnly,
} from '../../../../src/components';

import { CodeSandboxLink } from '../../components/codesandbox';

const pkg = require('../../../../package.json');

export const HomeView = () => (
  <div className="guideSection__text">
    <WuiFlexGroup alignItems="center">
      <WuiFlexItem>
        <WuiTitle size="l">
          <h1>Wazuh UI framework</h1>
        </WuiTitle>
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        <WuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <WuiFlexItem grow={false}>
            <WuiLink href="https://github.com/wazuh/wui">
              <WuiScreenReaderOnly>
                <span>Wazuh repo on GitHub</span>
              </WuiScreenReaderOnly>
              <WuiIcon type="logoGithub" aria-hidden="true" />
            </WuiLink>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <p>
              Version:{' '}
              <Link
                aria-label={`Version ${pkg.version}, View changelog`}
                to="/package/changelog">
                <strong>{pkg.version}</strong>
              </Link>
            </p>
          </WuiFlexItem>
        </WuiFlexGroup>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <WuiFlexItem grow={false}>
            <p>Libraries:</p>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiLink href="https://www.figma.com/community/file/809845546262698150">
              <WuiScreenReaderOnly>
                <span>Wazuh UI Library on Figma</span>
              </WuiScreenReaderOnly>
              <WuiToolTip
                title="Open Figma Design Library"
                postiion="down"
                content="The Figma Wazuh UI framework (WUI) is a design library in use at Wazuh to build internal products that need to share our aesthetics.">
                <WuiIcon type={logoFigma} aria-hidden="true" />
              </WuiToolTip>
            </WuiLink>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiToolTip
              title="Download zip"
              postiion="down"
              content="Import these sketch files into a new project as libraries.
                This will provide symbols that match against their WUI component
                counterparts.">
              <WuiLink href="https://github.com/wazuh/wui/releases/download/v8.0.0/wui_sketch_8.0.0.zip">
                <WuiScreenReaderOnly>
                  <span>Wazuh UI Library for Sketch</span>
                </WuiScreenReaderOnly>
                <WuiIcon type="logoSketch" aria-hidden="true" />
              </WuiLink>
            </WuiToolTip>
          </WuiFlexItem>
        </WuiFlexGroup>
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        <WuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <WuiFlexItem grow={false}>
            <CodeSandboxLink>
              <WuiLink>
                <strong>Codesandbox</strong>
              </WuiLink>
            </CodeSandboxLink>
          </WuiFlexItem>
          <WuiFlexItem grow={false}>
            <WuiIcon type="logoCodesandbox" />
          </WuiFlexItem>
        </WuiFlexGroup>
      </WuiFlexItem>
    </WuiFlexGroup>
    <WuiSpacer />
    <WuiText grow={false}>
      <p>
        The Wazuh UI framework (WUI) is a design library in use at Wazuh to
        build internal products that need to share our aesthetics. It
        distributes UI React components and static assets for use in building
        web layouts. Alongside the React components is a SASS/CSS layer that can
        be used independently on its own. If this is your first time using WUI
        you might want to read up on{' '}
        <WuiLink href="https://github.com/wazuh/wui/blob/master/wiki/consuming.md">
          how to consume WUI
        </WuiLink>{' '}
        and in general.
      </p>
    </WuiText>
    <WuiSpacer />
    <WuiFlexGrid gutterSize="l" columns={3}>
      <WuiFlexItem>
        <WuiCard
          href="#/display/icons"
          textAlign="left"
          image={imageIcons}
          title="Icons"
          description="Our SVG icon library gives you full control over size and color"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/navigation/button"
          textAlign="left"
          image={imageButtons}
          title="Buttons"
          description="Buttons for every usage you might need"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/display/text"
          textAlign="left"
          image={imageText}
          title="Text"
          description="Simple HTML text like paragraphs and lists are wrapped in a single text component for styling"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/layout/page"
          textAlign="left"
          image={imagePages}
          title="Pages"
          description="Layout your whole application page with this component and its series of child components"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/layout/flex"
          textAlign="left"
          image={imageFlexgrid}
          title="Flexible layouts"
          description="Create layouts by using flex groups, grids, and items"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/display/card"
          textAlign="left"
          image={imageCards}
          title="Cards"
          description="Cards like these help you make repeatable content more presentable"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/forms/form-layouts"
          textAlign="left"
          image={imageForms}
          title="Forms"
          description="Input tags, layouts, and validation for your forms"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/tabular-content/tables"
          textAlign="left"
          image={imageTables}
          title="Tables"
          description="Build tables from individual components or high level wrappers"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiCard
          href="#/wazuh-charts/creating-charts"
          textAlign="left"
          image={imageCharts}
          title="Charts"
          description="Learn charting best practices and how to integrate WUI with the Wazuh Charts library"
        />
      </WuiFlexItem>
    </WuiFlexGrid>
    <WuiSpacer />
    <WuiText grow={false}>
      <h2>Design goals</h2>
      <dl>
        <dt>WUI is accessible to everyone.</dt>
        <dd>
          Uses high contrast, color-blind safe palettes and tested with most
          assistive technology.
        </dd>
        <dt>WUI is themable.</dt>
        <dd>
          Theming involves changing fewer than a dozen lines of code. This means
          strict variable usage.
        </dd>
        <dt>WUI is flexible and composable.</dt>
        <dd>
          Configurable enough to meet the needs of a wide array of contexts
          while maintaining brand and low-level consistency.
        </dd>
        <dt>WUI is responsive.</dt>
        <dd>Supports multiple window sizes from large desktop to mobile.</dd>
        <dt>WUI is well documented and tested.</dt>
        <dd>Code is friendly to the novice and expert alike.</dd>
        <dt>WUI is playful.</dt>
        <dd>Simple and consistent use of animation brings life.</dd>
      </dl>
    </WuiText>
  </div>
);
