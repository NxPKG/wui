import React from 'react';
import sizes from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_size.scss';
import zindexs from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_z_index.scss';
import animations from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_animations.scss';
import breakpoints from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_responsive.scss';
import { rgbToHex } from '../../../../src/services';

import { Link } from 'react-router-dom';

import { GuidePage, GuideRuleTitle } from '../../components';
import { getSassVars } from './_get_sass_vars';
import { allowedColors } from './colors/_utilities';

import {
  WuiText,
  WuiSpacer,
  WuiFlexGroup,
  WuiFlexGrid,
  WuiFlexItem,
  WuiTitle,
  WuiLink,
  WuiCode,
  WuiCodeBlock,
  WuiCallOut,
  WuiPanel,
} from '../../../../src/components';

const wuiColors = [...allowedColors, 'wuiColorGhost', 'wuiColorInk'];

const wuiTextColors = ['wuiTextColor', 'wuiColorDarkShade', 'wuiLinkColor'];

const wuiSizeS = [
  'wuiSizeXS',
  'wuiSizeS',
  'wuiSizeM',
  'wuiSize',
  'wuiSizeL',
  'wuiSizeXL',
  'wuiSizeXXL',
];

const wuiFontSizes = [
  'wuiFontSizeXS',
  'wuiFontSizeS',
  'wuiFontSizeM',
  'wuiFontSize',
  'wuiFontSizeL',
  'wuiFontSizeXL',
];

const wuiShadows = [
  'wuiBottomShadowFlat',
  'wuiSlightShadow',
  'wuiBottomShadowSmall',
  'wuiBottomShadowMedium',
  'wuiBottomShadow',
  'wuiBottomShadowLarge',
];

const wuiBorders = ['wuiBorderThin', 'wuiBorderThick', 'wuiBorderEditable'];

const wuiLevels = [
  'wuiZToastList',
  'wuiZComboBox',
  'wuiZModal',
  'wuiZMask',
  'wuiZNavigation',
  'wuiZContentMenu',
  'wuiZHeader',
  'wuiZContent',
];

const wuiAnimationSpeeds = [
  'wuiAnimSpeedExtraFast',
  'wuiAnimSpeedFast',
  'wuiAnimSpeedNormal',
  'wuiAnimSpeedSlow',
  'wuiAnimSpeedExtraSlow',
];

const wuiAnimationTimings = ['wuiAnimSlightBounce', 'wuiAnimSlightResistance'];

const wuiBreakPoints = Object.getOwnPropertyNames(breakpoints.wuiBreakpoints);

function renderPaletteColor(palette, color) {
  let optionalDefault;
  if (color === 'wuiTextColor') {
    optionalDefault = (
      <WuiFlexItem grow={false}>
        <strong>default</strong>
      </WuiFlexItem>
    );
  }

  return (
    <WuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      className="guideSass__swatchItem"
      key={color}>
      <WuiFlexItem grow={false}>
        <div
          className="guideSass__swatch"
          style={{ background: rgbToHex(palette[color].rgba).toUpperCase() }}
        />
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        <WuiCode>${color}</WuiCode>
      </WuiFlexItem>
      {optionalDefault}
    </WuiFlexGroup>
  );
}

function renderSize(size) {
  return (
    <WuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={size}
      className="guideSass__sizeRow">
      <WuiFlexItem grow={false} className="guideSass__sizeItem">
        <div
          className="guideSass__size"
          style={{ width: sizes[size], height: sizes[size] }}
        />
      </WuiFlexItem>
      <WuiFlexItem grow={false} style={{ minWidth: 184 }}>
        <div>
          <WuiCode>${size}</WuiCode>
        </div>
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiText size="s">{sizes[size]}px</WuiText>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
}

function renderFontSize(size) {
  return (
    <div key={size} className="guideSass__fontSizeExample">
      <div className={`guideSass__fontSize guideSass__fontSize--${size}`}>
        The quick brown fox
      </div>
      <WuiCode>${size}</WuiCode>
    </div>
  );
}

function renderLevel(level, index) {
  return (
    <WuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={level}
      className="guideSass__levelRow">
      <WuiFlexItem grow={false}>
        <div
          className="guideSass__level"
          style={{ opacity: 1 - index * 0.1 }}
        />
      </WuiFlexItem>
      <WuiFlexItem grow={false} style={{ minWidth: 200, paddingLeft: 16 }}>
        <div>
          <WuiCode>${level}</WuiCode>
        </div>
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiText size="s">{zindexs[level]}</WuiText>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
}

function renderShadow(shadow) {
  return (
    <div
      key={shadow}
      className={`guideSass__shadow guideSass__shadow--${shadow}`}>
      <WuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        @include {shadow};
      </WuiCodeBlock>
    </div>
  );
}

function renderBorder(border) {
  return (
    <WuiFlexItem
      key={border}
      className={`guideSass__border guideSass__border--${border}`}>
      <WuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        border: ${border}
      </WuiCodeBlock>
    </WuiFlexItem>
  );
}

function renderAnimationSpeed(speed) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <WuiFlexGroup alignItems="center" gutterSize="s">
        <WuiFlexItem grow={false}>
          {animations[speed]}ms
          <WuiSpacer size="s" />
          <WuiCodeBlock
            transparentBackground
            paddingSize="none"
            language="scss">
            animation-duration: ${speed}
          </WuiCodeBlock>
          <WuiSpacer size="s" />
        </WuiFlexItem>
      </WuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderAnimationTiming(speed) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <WuiFlexGroup alignItems="center" gutterSize="s">
        <WuiFlexItem grow={false}>
          {animations[speed]}
          <WuiSpacer size="s" />
          <WuiCodeBlock
            transparentBackground
            paddingSize="none"
            language="scss">
            animation-timing-function: ${speed}
          </WuiCodeBlock>
          <WuiSpacer size="s" />
        </WuiFlexItem>
      </WuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderBreakpoint(size) {
  return (
    <WuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={size}>
      <WuiFlexItem grow={false}>
        <WuiText size="s" className="wui-textRight" style={{ minWidth: 50 }}>
          <WuiCode>{size}</WuiCode>
        </WuiText>
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiText size="s">{breakpoints.wuiBreakpoints[size]}px</WuiText>
      </WuiFlexItem>
    </WuiFlexGroup>
  );
}

const bemExample = `// Use camelCase naming
.wuiButton {
  // Put mixins first before properties
  @include wuiButton;
  @include wuiSlightShadow;

  border-radius: $wuiBorderRadius;


  // Elements exist within the component
  .wuiButton__content {
    padding: 0 ($wuiSize - $wuiSizeXS);
  }

  // Modifiers augment existing components or elements
  &.wuiButton--primary {
    background-color: $wuiColorPrimary;
  }

  // States are written with a verb prefix
  &.wuiButton-isLoading {
    opacity: .5;
  }
}

// Put breakpoints at the bottom of the document
@include wuiBreakpoint("xs", "s") {
  .wuiButton {
    width: 100%;
  }
}
`;

const borderRadiusExample = `border: $wuiBorderThin;
border-radius: $wuiBorderRadius;
`;

const importWazuhExample = `// In Wazuh you can add this to the top of your Sass file
@import 'ui/public/styles/styling_constants';
`;

const importOutsideExample = `// In an outside project, import the core variables like so
@import '@wazuh/wui/src/global_styling/functions/index';
@import '@wazuh/wui/src/global_styling/variables/index';
@import '@wazuh/wui/src/global_styling/mixins/index';
`;

const tintOrShadeExample = `// tintOrShade(color, tint_percent, shade_percent)
// will tint the color by % in light themes
// and shade the color by % in dark themes
.themedBox {
  background-color: tintOrShade($wuiColorPrimary, 90%, 70%);
  border-left: $wuiBorderThick;
  border-color: $wuiColorPrimary;
  padding: $wuiSize;
  color: $wuiTextColor;
}
`;

const contrastExample = `// Make sure text passes a contrast check
.contrastBox {
  $backgroundColor: tintOrShade($wuiColorWarning, 90%, 70%);
  background: $backgroundColor;

  // Given two colors, adjust the first until contrast is 4.5
  color: makeHighContrastColor($wuiColorWarning, $backgroundColor);
  padding: $wuiSize;
  border-left: $wuiBorderThick;
  border-color: $wuiColorWarning;

  // Graphics can have a lower minimum contrast level of 3.0
  .square {
    fill: makeGraphicContrastColor($wuiColorWarning, $backgroundColor);
  }
}
`;

export const SassGuidelines = ({ selectedTheme }) => {
  const palette = getSassVars(selectedTheme);

  return (
    <GuidePage title="Sass guidelines">
      <WuiTitle>
        <h2>Core variables</h2>
      </WuiTitle>

      <WuiSpacer size="xxl" />

      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <div>
            <WuiTitle size="s">
              <h3>Sizing</h3>
            </WuiTitle>

            <WuiSpacer />

            {wuiSizeS.map(function(size, index) {
              return renderSize(size, index);
            })}

            <WuiSpacer />

            <WuiTitle size="s">
              <h3>Z-index</h3>
            </WuiTitle>

            <WuiSpacer />

            {wuiLevels.map(function(level, index) {
              return renderLevel(level, index);
            })}
          </div>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Color</h3>
          </WuiTitle>

          <WuiSpacer />

          {wuiColors.map(function(color, index) {
            return renderPaletteColor(palette, color, index);
          })}
        </WuiFlexItem>
      </WuiFlexGrid>

      <WuiSpacer size="xxl" />

      <GuideRuleTitle>Going beyond the provided colors</GuideRuleTitle>

      <WuiSpacer size="xxl" />

      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Theming patterns</h3>
          </WuiTitle>

          <WuiSpacer />
          <WuiText>
            <p>
              Often you need to go beyond the provided color set. When doing so{' '}
              <strong>always</strong> use color functions to modify the base
              set. Here are some examples.
            </p>
          </WuiText>
          <WuiSpacer />

          <WuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <WuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--danger" />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiCode>$wuiCodeDanger</WuiCode>
            </WuiFlexItem>
          </WuiFlexGroup>
          <WuiSpacer />
          <WuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <WuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerTint" />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiCode>tint($wuiCodeDanger, 30%)</WuiCode>
            </WuiFlexItem>
          </WuiFlexGroup>
          <WuiSpacer />
          <WuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <WuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerShade" />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiCode>shade($wuiCodeDanger, 30%)</WuiCode>
            </WuiFlexItem>
          </WuiFlexGroup>

          <WuiSpacer />
          <WuiText>
            <p>
              Remember that WUI provides dark and light mode theming support.
              Sometimes the traditional color functions don&apos;t give enough
              flexibility for both modes.
            </p>
            <p>
              For example, depending upon what theme you use{' '}
              <WuiCode>$WuiColorPrimary</WuiCode> will be a different hex value.
            </p>
          </WuiText>
          <WuiSpacer />

          <WuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <WuiFlexItem
              grow={false}
              style={{ background: '#FFF', padding: 8 }}>
              <div className="guideSass__swatch guideSass__swatch--primaryLight" />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiCode>$wuiColorPrimary</WuiCode>
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiText size="s">
                <p>is #0079A5 in the light theme</p>
              </WuiText>
            </WuiFlexItem>
          </WuiFlexGroup>
          <WuiSpacer />
          <WuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <WuiFlexItem
              grow={false}
              style={{ background: '#222', padding: 8 }}>
              <div className="guideSass__swatch guideSass__swatch--primaryDark" />
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiCode>$wuiColorPrimary</WuiCode>
            </WuiFlexItem>
            <WuiFlexItem grow={false}>
              <WuiText size="s">
                <p>is #4da1c0 in the dark theme</p>
              </WuiText>
            </WuiFlexItem>
          </WuiFlexGroup>

          <WuiSpacer />
          <WuiText>
            <p>
              Taking the default primary color above we want to tint the color
              in the light mode, but shade it in the dark mode. This makes the
              background color more subtle in both use cases.
            </p>
          </WuiText>

          <WuiSpacer />

          <WuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {tintOrShadeExample}
          </WuiCodeBlock>

          <WuiSpacer />

          <WuiFlexGrid columns={2}>
            <WuiFlexItem style={{ background: '#FFF', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--light">
                Light theme
              </div>
            </WuiFlexItem>
            <WuiFlexItem style={{ background: '#222', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--dark">
                Dark theme
              </div>
            </WuiFlexItem>
          </WuiFlexGrid>
        </WuiFlexItem>

        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Color contrast patterns</h3>
          </WuiTitle>

          <WuiSpacer />

          <WuiText>
            <p>
              WUI provides some nifty color functions for auto-adjusting color
              to pass AA contrast checks. Often this is needed when using the
              base colors on top of each other. Here is an example similar to
              our callouts with a pesky orange.
            </p>
          </WuiText>

          <WuiSpacer />

          <WuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {contrastExample}
          </WuiCodeBlock>

          <WuiSpacer />

          <div className="guideSass__contrastExample">
            <svg
              className="square"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16">
              <rect
                width="12"
                height="12"
                x="2"
                y="2"
                rx="2"
                fillRule="evenodd"
              />
            </svg>{' '}
            This orange text now passes a contrast check!
          </div>

          <WuiSpacer />

          <WuiTitle size="s">
            <h3>More on color contrast</h3>
          </WuiTitle>

          <WuiSpacer />

          <WuiText>
            <p>
              Consult the larger{' '}
              <Link to="/guidelines/colors">color guidelines</Link> page for a
              better explanation about passing color contrast.
            </p>
          </WuiText>

          <WuiSpacer />
        </WuiFlexItem>
      </WuiFlexGrid>

      <GuideRuleTitle>Typography</GuideRuleTitle>

      <WuiText grow={false} className="guideSection__text">
        <p>
          View the{' '}
          <WuiLink href="https://github.com/wazuh/wui/blob/master/src/global_styling/variables/_typography.scss">
            variable
          </WuiLink>{' '}
          and{' '}
          <WuiLink href="https://github.com/wazuh/wui/blob/master/src/global_styling/mixins/_typography.scss">
            mixins
          </WuiLink>{' '}
          Sass code for typography. For most of your components we recommend
          using <Link to="/display/text">WuiText</Link> or{' '}
          <Link to="/display/title">WuiTitle</Link> instead of these Sass
          variables.
        </p>
      </WuiText>

      <WuiSpacer />
      <WuiCallOut
        size="s"
        color="warning"
        title={
          <span>
            It is more common to use these as a mixin (e.g.{' '}
            <WuiCode language="css">@include wuiFontSizeS;</WuiCode>) to
            automatically apply line-height as well as size.
          </span>
        }
      />

      <WuiSpacer />
      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Text sizes</h3>
          </WuiTitle>

          <WuiSpacer />
          {wuiFontSizes.map(function(size, index) {
            return renderFontSize(size, index);
          })}
        </WuiFlexItem>
        <WuiFlexItem>
          <div>
            <WuiTitle size="s">
              <h3>Text colors</h3>
            </WuiTitle>

            <WuiSpacer />

            {wuiTextColors.map(function(color, index) {
              return renderPaletteColor(palette, color, index);
            })}

            <WuiSpacer />

            <WuiTitle>
              <h3>Font families</h3>
            </WuiTitle>

            <WuiSpacer />

            <WuiFlexGroup responsive={false} alignItems="center">
              <WuiFlexItem grow={false} className="guideSass__fontFamily">
                Abc
              </WuiFlexItem>
              <WuiFlexItem grow={false}>
                <WuiCode language="css">@include wuiFont;</WuiCode>
              </WuiFlexItem>
            </WuiFlexGroup>

            <WuiFlexGroup responsive={false} alignItems="center">
              <WuiFlexItem
                grow={false}
                className="guideSass__fontFamily guideSass__fontFamily--code">
                Abc
              </WuiFlexItem>
              <WuiFlexItem grow={false}>
                <WuiCode language="css">@include wuiCodeFont;</WuiCode>
              </WuiFlexItem>
            </WuiFlexGroup>
          </div>
        </WuiFlexItem>
      </WuiFlexGrid>

      <WuiSpacer size="xxl" />

      <GuideRuleTitle>Borders</GuideRuleTitle>

      <WuiSpacer size="xxl" />

      <WuiText grow={false}>
        <p>
          WUI provides some helper variables for setting common border types.
        </p>
      </WuiText>

      <WuiSpacer />

      <WuiFlexGrid columns={3}>
        {wuiBorders.map(function(border, index) {
          return renderBorder(border, index);
        })}
      </WuiFlexGrid>

      <WuiSpacer />

      <WuiText grow={false}>
        <p>
          In addition, you can utilize <WuiCode>$wuiBorderRadius</WuiCode> to
          round the corners.
        </p>
      </WuiText>

      <WuiSpacer />

      <WuiFlexGrid columns={3}>
        <WuiFlexItem className="guideSass__border guideSass__border--radius">
          <WuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {borderRadiusExample}
          </WuiCodeBlock>
        </WuiFlexItem>
      </WuiFlexGrid>

      <GuideRuleTitle>Shadow and Depth</GuideRuleTitle>

      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Use mixins for shadows</h3>
          </WuiTitle>

          <WuiText>
            <p>
              <WuiLink href="https://github.com/wazuh/wui/blob/master/src/global_styling/mixins/_shadow.scss">
                View the Sass code for shadow mixins
              </WuiLink>
              .
            </p>
          </WuiText>

          <WuiSpacer />

          {wuiShadows.map(function(shadow, index) {
            return renderShadow(shadow, index);
          })}

          <WuiSpacer />

          <WuiTitle size="s">
            <h3>Adding color to shadows</h3>
          </WuiTitle>

          <WuiText>
            <p>Most shadow mixins can also accept color.</p>
          </WuiText>

          <WuiSpacer />

          <div className="guideSass__shadow guideSass__shadow--color wui-textBreakAll">
            <WuiCodeBlock
              language="scss"
              paddingSize="none"
              transparentBackground>
              @include wuiBottomShadowLarge(desaturate($wuiColorPrimary, 30%));
            </WuiCodeBlock>
          </div>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Shadows to create graceful overflows</h3>
          </WuiTitle>

          <WuiText>
            <p>
              Primarily used in modals and flyouts, the overflow shadow masks
              the edges to indicate there is more content.
            </p>
          </WuiText>

          <WuiSpacer />

          <WuiTitle size="xs">
            <h4>
              Vertical scrolling with <WuiCode>wuiYScrollWithShadows</WuiCode>
            </h4>
          </WuiTitle>

          <WuiSpacer size="s" />

          <WuiPanel paddingSize="none" grow={false}>
            <div className="guideSass__overflowShadows">
              <WuiText className="guideSass__overflowShadowText" size="s">
                <p>
                  It requires a wrapping element to control the height with{' '}
                  <WuiCode>overflow-y: hidden;</WuiCode> and the content to
                  <WuiCode>@include wuiYScrollWithShadows;</WuiCode> or use the{' '}
                  <Link to="/utilities/css-utility-classes">
                    CSS utility class
                  </Link>{' '}
                  <WuiCode>.wui-yScrollWithShadows</WuiCode>.
                </p>
                <p>
                  <b>Example:</b>
                </p>
                <WuiCodeBlock language="sass" isCopyable paddingSize="s">
                  {`.overflowY {
  height: 200px;
  overflow-y: hidden;

  .overflowY__content {
    @include wuiYScrollWithShadows;
  }
}`}
                </WuiCodeBlock>
                <p>
                  Consequuntur atque nulla atque nemo tenetur numquam. Assumenda
                  aspernatur qui aut sit. Aliquam doloribus iure sint id.
                  Possimus dolor qui soluta cum id tempore ea illum. Facilis
                  voluptatem aut aut ut similique ut. Sed repellendus commodi
                  iure officiis exercitationem praesentium dolor. Ratione non ut
                  nulla accusamus et. Optio laboriosam id incidunt. Ipsam
                  voluptate ab quia necessitatibus sequi earum voluptate. Porro
                  tempore et veritatis quo omnis. Eaque ut libero tempore sit
                  placeat maxime laudantium. Mollitia tempore minus qui autem
                  modi adipisci ad. Iste reprehenderit accusamus voluptatem
                  velit. Quidem delectus eos veritatis et vitae et nisi.
                  Doloribus ut corrupti voluptates qui exercitationem dolores.
                </p>
              </WuiText>
            </div>
          </WuiPanel>

          <WuiSpacer />

          <WuiTitle size="xs">
            <h4>
              Horizontal scrolling with <WuiCode>wuiXScrollWithShadows</WuiCode>
            </h4>
          </WuiTitle>

          <WuiSpacer size="s" />

          <WuiPanel paddingSize="none" grow={false}>
            <div className="guideSass__overflowShadowsX">
              <WuiText className="guideSass__overflowShadowTextX" size="s">
                <p>
                  You may want to add at least <WuiCode>$wuiSizeS</WuiCode>
                  &apos;s worth of padding to the sides of your content so the
                  mask doesn&apos;t overlay it.
                </p>
                <p>
                  <b>Example:</b>
                </p>
                <WuiCodeBlock language="sass" isCopyable paddingSize="s">
                  {`.overflowXContent {
  @include wuiXScrollWithShadows;
  padding-left: $wuiSizeS;
  padding-right: $wuiSizeS;
}`}
                </WuiCodeBlock>
              </WuiText>
            </div>
          </WuiPanel>
          <WuiSpacer size="xl" />
          <WuiText>
            <p>
              If you need to further customize the position or side of the
              overflow shadow use the <WuiCode>wuiOverflowShadow</WuiCode>{' '}
              <WuiLink href="https://github.com/wazuh/wui/blob/master/src/global_styling/mixins/_shadow.scss">
                mixin
              </WuiLink>
              .
            </p>
          </WuiText>
        </WuiFlexItem>
      </WuiFlexGrid>

      <WuiSpacer size="xxl" />

      <GuideRuleTitle>Media queries and breakpoints</GuideRuleTitle>

      <WuiText className="guideSection__text">
        <p>
          <WuiLink href="https://github.com/wazuh/wui/blob/master/src/global_styling/mixins/_responsive.scss">
            View the Sass code for media queries
          </WuiLink>
          .
        </p>
        <p>
          Breakpoints in WUI are provided through the use of a Sass mixin{' '}
          <WuiCode>@include wuiBreakpoint()</WuiCode> that accepts an array of
          sizes.
        </p>
      </WuiText>

      <WuiSpacer />
      <div className="guideSass__breakpointExample" />
      <WuiSpacer />

      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <div>
            <WuiTitle size="s">
              <h3>Breakpoint sizing</h3>
            </WuiTitle>

            <WuiSpacer />

            {wuiBreakPoints.map(function(size, index) {
              return renderBreakpoint(size, index);
            })}
          </div>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Mixin usage</h3>
          </WuiTitle>

          <WuiSpacer />

          <WuiText>
            <p>Target mobile devices only</p>
          </WuiText>
          <WuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include wuiBreakpoint('xs','s') {...}"}
          </WuiCodeBlock>

          <WuiSpacer />

          <WuiText>
            <p>Target mobile and tablets</p>
          </WuiText>
          <WuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include wuiBreakpoint('xs', 's', 'm') {...}"}
          </WuiCodeBlock>

          <WuiSpacer />

          <WuiText>
            <p>Target tablets only</p>
          </WuiText>
          <WuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include wuiBreakpoint('m') {...}"}
          </WuiCodeBlock>

          <WuiSpacer />

          <WuiText>
            <p>Target very wide displays only</p>
          </WuiText>
          <WuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include wuiBreakpoint('xl') {...}"}
          </WuiCodeBlock>

          <WuiSpacer />
        </WuiFlexItem>
      </WuiFlexGrid>

      <WuiSpacer size="xxl" />

      <GuideRuleTitle>Animation</GuideRuleTitle>
      <WuiText grow={false} className="guideSection__text">
        <p>
          <WuiLink href="https://github.com/wazuh/wui/blob/master/src/global_styling/variables/_animations.scss">
            View the Sass code for animation
          </WuiLink>
          .
        </p>
        <p>
          WUI utilizes the following constants to maintain a similar
          &apos;bounce&apos; to its animations. That said, animations are
          tricky, and if they aren&apos;t working for your specific application
          this is the one place where we think it&apos;s OK to come up with your
          own rules.
        </p>
      </WuiText>
      <WuiSpacer />
      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Speed</h3>
          </WuiTitle>

          <WuiSpacer />

          {wuiAnimationSpeeds.map(function(speed, index) {
            return renderAnimationSpeed(speed, index);
          })}
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiTitle size="s">
            <h3>Timing</h3>
          </WuiTitle>

          <WuiSpacer />

          {wuiAnimationTimings.map(function(speed, index) {
            return renderAnimationTiming(speed, index);
          })}
        </WuiFlexItem>
      </WuiFlexGrid>

      <WuiSpacer size="xl" />

      <GuideRuleTitle>Sass best practices</GuideRuleTitle>

      <WuiSpacer size="xl" />

      <WuiFlexGrid columns={2}>
        <WuiFlexItem>
          <WuiText>
            <h3>Component based naming</h3>
            <p>
              WUI is written in a{' '}
              <WuiLink href="http://getbem.com/introduction/">BEM</WuiLink>ish
              style with the addition of verb states (ex:{' '}
              <WuiCode>*-isLoading</WuiCode>). Below is an example of proper
              formatting.
            </p>
          </WuiText>
          <WuiSpacer />
          <WuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {bemExample}
          </WuiCodeBlock>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiText grow={false} className="guideSection__text">
            <h3>Writing Sass the WUI way</h3>
            <p>
              In general, when writing new SCSS in a project that installs WUI
              as a dependency try to follow these best practices:
            </p>
          </WuiText>
          <WuiSpacer />
          <WuiText size="s" grow={false} className="guideSection__text">
            <ul>
              <li>
                Utilize color variables and functions rather than hard-coded
                values
              </li>
              <li>Utilize the sizing variables for padding and margins</li>
              <li>
                Utilize the animation variables for animations when possible
              </li>
              <li>
                Utilize the responsive mixins for all screen width calculations
              </li>
              <li>
                Utilize the typography mixins and variables for all font family,
                weight, and sizing
              </li>
              <li>
                Utilize the shadow mixins and z-index variables to manage depth
              </li>
              <li>
                Utilize the border and border-radius variable to handle border
                usage
              </li>
              <li>
                Minimize your overwrites and try to make new Sass additive in
                nature
              </li>
            </ul>
          </WuiText>

          <WuiSpacer />

          <WuiTitle size="s">
            <h3>Importing WUI global Sass</h3>
          </WuiTitle>

          <WuiSpacer />

          <WuiText grow={false} className="guideSection__text">
            <p>
              Most WUI based projects should already import the WUI global
              scope. For example, Wazuh has its own liner that will give you
              everything on this page.
            </p>
          </WuiText>
          <WuiSpacer />
          <WuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {importWazuhExample}
          </WuiCodeBlock>
          <WuiSpacer />
          <WuiText grow={false} className="guideSection__text">
            <p>
              If you want to construct your own import, you would just need to
              import the following core files into a fresh Sass project.
            </p>
          </WuiText>

          <WuiSpacer />

          <WuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {importOutsideExample}
          </WuiCodeBlock>
        </WuiFlexItem>
      </WuiFlexGrid>
    </GuidePage>
  );
};
