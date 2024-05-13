import React, { useState, Fragment } from 'react';

import {
  WuiContext,
  WuiButton,
  WuiFieldText,
  WuiFlexGroup,
  WuiFlexItem,
  WuiFormRow,
  WuiSpacer,
  WuiI18n,
  WuiI18nNumber,
  useWuiI18n,
} from '../../../../src/components';

const mappings = {
  fr: {
    'wuiContext.english': 'Anglais',
    'wuiContext.french': 'Française',
    'wuiContext.greeting': 'Salutations!',
    'wuiContext.guestNo': 'Vous êtes invité #',
    'wuiContext.question': 'Quel est votre nom?',
    'wuiContext.placeholder': 'Jean Dupont',
    'wuiContext.action': 'Soumettre',
  },
};

const ContextConsumer = () => {
  return (
    <div>
      <strong>
        <WuiI18n token="wuiContext.greeting" default="Welcome!" />
      </strong>

      <WuiSpacer size="s" />

      <p>
        <WuiI18n token="wuiContext.guestNo" default="You are guest #" />
        <WuiI18nNumber value={1582394} />
      </p>

      <WuiSpacer size="m" />

      <Fragment>
        <WuiFormRow
          label={useWuiI18n('wuiContext.question', 'What is your name?')}>
          <WuiFieldText
            placeholder={useWuiI18n('wuiContext.placeholder', 'John Doe')}
          />
        </WuiFormRow>

        <WuiSpacer />

        <WuiButton>{useWuiI18n('wuiContext.action', 'Submit')}</WuiButton>
      </Fragment>
    </div>
  );
};

export default () => {
  const [language, setLanguage] = useState('en');

  const i18n = {
    mapping: mappings[language],
    formatNumber: value => new Intl.NumberFormat(language).format(value),
  };

  return (
    <>
      <WuiFlexGroup gutterSize="s" alignItems="center">
        <WuiFlexItem grow={false}>
          <WuiButton fill={language === 'en'} onClick={() => setLanguage('en')}>
            <WuiI18n token="wuiContext.english" default="English" />
          </WuiButton>
        </WuiFlexItem>

        <WuiFlexItem grow={false}>
          <WuiButton fill={language === 'fr'} onClick={() => setLanguage('fr')}>
            <WuiI18n token="wuiContext.french" default="French" />
          </WuiButton>
        </WuiFlexItem>
      </WuiFlexGroup>

      <WuiSpacer size="m" />

      <WuiContext i18n={i18n}>
        <ContextConsumer />
      </WuiContext>
    </>
  );
};
