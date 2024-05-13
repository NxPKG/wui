import React from 'react';

import { ThemeContext } from '../with_theme';
import { WuiSelect, WuiFormRow } from '../../../../src/components';
import { WUI_THEMES } from '../../../../src/themes';

export const GuideThemeSelector = () => {
  return (
    <ThemeContext.Consumer>
      {context => <GuideThemeSelectorComponent context={context} />}
    </ThemeContext.Consumer>
  );
};

const GuideThemeSelectorComponent = ({ context }) => {
  return (
    <WuiFormRow label="Theme">
      <WuiSelect
        options={WUI_THEMES}
        value={context.theme}
        onChange={e => {
          context.changeTheme(e.target.value);
        }}
        aria-label="Switch the theme"
      />
    </WuiFormRow>
  );
};
