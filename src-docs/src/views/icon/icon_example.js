import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  WuiCode,
  WuiIcon,
  WuiToken,
  WuiLink,
  WuiText,
  WuiSpacer,
  WuiCallOut,
} from '../../../../src/components';
import iconConfig from './playground';

import Icons from './icons';
const iconsSnippet = '<WuiIcon type="alert" />';

import Tokens from './tokens';
const tokensSnippet = [
  '<WuiToken iconType="tokenAnnotation" />',
  `<WuiToken
  iconType="tokenElement"
  color="wuiColorVis07"
  shape="circle"
/>`,
  `<WuiToken
  iconType="visMapCoordinate"
  size="l"
  color="#FF0000"
  shape="rectangle"
  fill="dark"
/>`,
];

// Icons for apps were removed, but we keep the component that renders the section
// for future additions
import Apps from './apps';
const appsSnippet = '<WuiIcon type="sampleApp" size="xl" />';

import Editor from './editor';
const editorSnippet = '<WuiIcon type="editorAlignLeft" />';

import Logos from './logos';
const logosSnippet = '<WuiIcon type="logoWazuh" size="xl" />';

import LogosThird from './logos_third';
const logosThirdSnippet = '<WuiIcon type="logoApache" size="xl" />';

import IconSizes from './icon_sizes';
const iconSizesSnippet = '<WuiIcon type="logoWazuh" size="xl" />';

import IconColors from './icon_colors';
const iconColorsSnippet = [
  '<WuiIcon type="brush" color="primary" />',
  '<WuiIcon type="brush" color="#DA8B45" />',
];

import IconTypes from './icon_types';
const iconTypesSource = require('!!raw-loader!./icon_types');
const iconTypesHtml = renderToHtml(IconTypes);
const iconTypesSnippet = [
  '<WuiIcon type="logoWazuh" size="xl" />',
  '<WuiIcon type={reactSVGElement} size="xl" />',
  '<WuiIcon type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" size="xl" title="My SVG logo" />',
  '<WuiButton iconType={reactSVGElement}>Works in other components too</WuiButton>',
];

export const IconExample = {
  title: 'Icons',
  intro: (
    <div>
      <WuiText>
        <p>
          <strong>WuiIcon</strong> is a handy component for using our custom
          glyphs and logos. The <WuiCode>type</WuiCode> prop accepts either an
          enumerated name from one of the sets below, a location to a custom SVG
          asset, or a React Element.
        </p>
        <p>
          When using custom SVGs please{' '}
          <strong>remove all fill attributes</strong> on the SVG and utilize the
          CSS helpers if you have complex logos that need to work with theming.
        </p>
      </WuiText>
      <WuiSpacer />
      <WuiCallOut
        title={
          <>
            For better accessibility it's always recommended to give a
            descriptive <WuiCode>title</WuiCode> based on the icon use.
          </>
        }
        color="warning">
        <p>
          If no title is provided the icon is going to be purely decorative and
          it will get by default an <WuiCode language="js">aria-hidden=true</WuiCode>.
        </p>
      </WuiCallOut>
      <WuiSpacer />
    </div>
  ),
  sections: [
    {
      title: 'Glyphs',
      text: (
        <div>
          <p>
            Glyphs are small, monochromatic icons that typically should always
            use the default size of{' '}
            <WuiCode language="js">size=&quot;m&quot;</WuiCode>. They tend to be
            pixel perfect and don&apos;t scale very well into larger sizes.
          </p>
        </div>
      ),
      props: { WuiIcon },
      snippet: iconsSnippet,
      demo: <Icons />,
    },
    {
      title: 'Editor controls',
      text: (
        <p>
          Editor icons relate to the visual styling of elements and are commonly
          used within <strong>WuiButtonGroup</strong> components.
        </p>
      ),
      snippet: editorSnippet,
      demo: <Editor />,
    },
    {
      title: 'Tokens',
      text: (
        <div>
          <p>
            Tokens are most commonly used to visually signify field or code
            types. An <strong>WuiToken</strong> accepts any valid{' '}
            <strong>WuiIcon</strong> as its
            <WuiCode>iconType</WuiCode> property. However, icons designed
            specifically for use in the <strong>WuiToken</strong> are prefixed
            with &quot;token&quot; in their name and have pre-defined styles.
          </p>
        </div>
      ),
      props: { WuiToken },
      snippet: tokensSnippet,
      demo: <Tokens />,
    },
    {
      title: 'Wazuh logos',
      text: (
        <p>
          Product logos follow similar rules as app logos. Note the use of{' '}
          <WuiCode>.wuiIcon__fillNegative</WuiCode> on portions of the SVGs to
          handle flipping colors for dark mode.
        </p>
      ),
      snippet: logosSnippet,
      demo: <Logos />,
    },
    {
      title: 'Sizes',
      text: (
        <p>
          Use the <WuiCode>size</WuiCode> prop to automatically size your icons.
          Medium is the default, and will output a <WuiCode>16x16</WuiCode>{' '}
          icon.
        </p>
      ),
      snippet: iconSizesSnippet,
      demo: <IconSizes />,
    },
    {
      title: 'Colors',
      text: (
        <p>
          The default behavior of icons is to inherit from the text color. You
          can use the <WuiCode>color</WuiCode> prop to assign a custom color
          which accepts a named color from our palette or a valid&nbsp;
          <WuiLink
            target="_blank"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">
            CSS color data type
          </WuiLink>
          &nbsp;which will be passed down through the inline-style{' '}
          <WuiCode>fill</WuiCode>&nbsp; property.{' '}
          <strong>We recommend relying on the WUI named color palette</strong>
          &nbsp; unless the custom color is initiated by the user (like as a
          graph color).
        </p>
      ),
      snippet: iconColorsSnippet,
      demo: <IconColors />,
    },
    {
      title: 'Custom SVGs',
      text: (
        <p>
          The <WuiCode>type</WuiCode> prop can accept a valid enum, string or
          React SVG Element. When using a custom SVG, please make sure it sits
          on a square canvas and preferably utilizes one of WUI&apos;s sizes
          (16x16, 32x32...etc). For IE11 compatibility, the SVG file{' '}
          <em>must</em> contain a <WuiCode>viewBox</WuiCode>.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: iconTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: iconTypesHtml,
        },
      ],
      props: { WuiIcon },
      snippet: iconTypesSnippet,
      demo: <IconTypes />,
    },
    {
      title: 'Third party logos',
      text: (
        <p>
          WUI's library of third party logos are mostly maintained for legacy
          usages. <strong>WuiIcon</strong> now accepts custom SVG and image
          content which is how we recommend displaying external logos.
        </p>
      ),
      snippet: logosThirdSnippet,
      demo: <LogosThird />,
    },
  ],
  playground: iconConfig,
};
