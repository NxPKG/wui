# Consuming Wazuh WUI

## What's available

Wazuh WUI publishes React UI components, JavaScript helpers called services, and utilities for writing Jest tests. Please refer to the [Wazuh UI Framework website](https://wazuh.github.io/wui) for comprehensive info on what's available.

WUI is published through [NPM](https://www.npmjs.com/package/@wazuh/wui) as a dependency.

### Components

You can import React components from the top-level WUI module.

```js
import {
  WuiButton,
  WuiCallOut,
  WuiPanel,
} from '@wazuh/wui';
```

### Services

Most services are published from the `lib/services` directory. Some are published from their module directories in this directory.

```js
import { keys } from '@wazuh/wui/lib/services';
import { Timer } from '@wazuh/wui/lib/services/time';
```

### Test

Test utilities are published from the `lib/test` directory.

```js
import { findTestSubject } from '@wazuh/wui/lib/test';
```

## Requirements and dependencies

WUI expects that you polyfill ES2015 features, e.g. [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/). Without an ES2015 polyfill your app might throw errors on certain browsers.

WUI also has `moment` and `@elastic/datemath` as dependencies itself. These are already loaded in most Elastic repos, but make sure to install them if you are starting from scratch.

## Using WUI in a standalone project

You can consume WUI in standalone projects, such as plugins and prototypes.

### Importing CSS or SCSS

Most of the time, you just need the CSS, which provides the styling for the React components. In this case, you can use Webpack to import the compiled WUI CSS with the `style`,`css`, and `postcss` loaders.

```js
import '@wazuh/wui/dist/wui_theme_wazuh_light.css';
```

If you want access to the Sass variables, functions, and mixins in WUI then you'll need to import the Sass files. This will require `style`, `css`, `postcss`, and `sass` loaders. You'll also want to import the Sass file into one of your own Sass files, to gain access to these variables, functions, and mixins.

```scss
@import '@wazuh/wui/src/themes/wui/wui_colors_light.scss';
@import '@wazuh/wui/src/themes/wui/wui_globals.scss';
```

For the dark theme, import the dark colors file before the globals.

```scss
@import '@wazuh/wui/src/themes/wui/wui_colors_dark.scss';
@import '@wazuh/wui/src/themes/wui/wui_globals.scss';
```


By default, WUI ships with a font stack that includes some outside, open source fonts. If your system is internet available you can include these by adding the following imports to your SCSS/CSS files, otherwise you'll need to bundle the physical fonts in your build. WUI will drop to System Fonts (which you may prefer) in their absence.

```scss
// index.scss
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700,700i');
@import url('https://rsms.me/inter/inter-ui.css');
```

### Reusing the variables in JavaScript

The Sass variables are also made available for consumption as json files. This enables reuse of values in css-in-js systems like [styled-components](https://www.styled-components.com). As the following example shows, it can also make the downstream components theme-aware without much extra effort:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import * as wuiVars from '@wazuh/wui/dist/wui_theme_light.json';

const CustomComponent = styled.div`
  color: ${props => props.theme.wuiColorPrimary};
  border: ${props => props.theme.wuiBorderThin};
`;

ReactDOM.render(
  <ThemeProvider theme={wuiVars}>
    <CustomComponent>content</CustomComponent>
  </ThemeProvider>
, document.querySelector('#renderTarget'));
```

### "Module build failed" or "Module parse failed: Unexpected token" error

If you get an error when importing a React component, you might need to configure Webpack's `resolve.mainFields` to `['webpack', 'browser', 'main']` to import the components from `lib` instead of `src`. See the [Webpack docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields) for more info.

### Failing icon imports

To reduce WUI's impact to application bundle sizes, the icons are dynamically imported on-demand. This is problematic for some bundlers and/or deployments, so a method exists to preload specific icons an application needs.

```javascript
import { appendIconComponentCache } from '@wazuh/wui/es/components/icon/icon';

import { icon as WuiIconArrowDown } from '@wazuh/wui/es/components/icon/assets/arrow_down';
import { icon as WuiIconArrowLeft } from '@wazuh/wui/es/components/icon/assets/arrow_left';

// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
  arrowDown: WuiIconArrowDown,
  arrowLeft: WuiIconArrowLeft,
});
```

## Customizing with `className`

We do not recommend customizing WUI components by applying styles directly to WUI classes, eg. `.wuiButton`. All components allow you to pass a custom `className` prop directly to the component which will then append this to the class list. Utilizing the cascade feature of CSS, you can then customize by overriding styles so long as your styles are imported **after** the WUI import.

```jsx
<WuiButton className="myCustomClass__button" />

// Renders as:

<button class="wuiButton myCustomClass__button" />
```

## Using the `test-env` build

WUI provides a separate babel-transformed and partially mocked commonjs build for testing environments in consuming projects. The output is identical to that of `lib/`, but has transformed async functions and dynamic import statements, and also applies some useful mocks. This build mainly targets Kibana's Jest environment, but may be helpful for testing environments in other projects.

### Mapping to the `test-env` directory

In Kibana's Jest configuration, the `moduleNameMapper` option is used to resolve standard WUI import statements with `test-env` aliases.

```js
moduleNameMapper: {
  '@wazuh/wui$': '<rootDir>/node_modules/@wazuh/wui/test-env'
}
```

This eliminates the need to polyfill or transform the WUI build for an environment that otherwise has no need for such processing.

### Mocked component files

Besides babel transforms, the test environment build consumes mocked component files of the type `src/**/[name].testenv.*`. During the build, files of the type `src/**/[name].*` will be replaced by those with the `testenv` namespace. The purpose of this mocking is to further mitigate the impacts of time- and import-dependent rendering, and simplify environment output such as test snapshots. Information on creating mock component files can be found with [testing documentation](testing.md).
