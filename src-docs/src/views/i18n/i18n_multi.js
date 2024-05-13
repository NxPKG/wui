import React from 'react';

import {
  WuiCard,
  WuiSpacer,
  WuiText,
  WuiI18n,
  WuiTitle,
  useWuiI18n,
} from '../../../../src/components';

export default () => {
  const [title, description] = useWuiI18n(
    ['wuiI18nMulti.title', 'wuiI18nMulti.description'],
    ['Card Title', 'Card Description']
  );
  return (
    <>
      <WuiTitle size="xs">
        <h3>useWuiI18n with multiple tokens</h3>
      </WuiTitle>
      <div>
        <WuiText>
          <p>
            Both title and description for the card are looked up in one call to{' '}
            <strong>useWuiI18n</strong>
          </p>
        </WuiText>
        <WuiSpacer />
        <WuiCard
          className="wui-displayInlineBlock"
          title={title}
          description={description}
        />
      </div>

      <WuiSpacer size="l" />

      <WuiTitle size="xs">
        <h3>WuiI18n render prop with multiple tokens</h3>
      </WuiTitle>
      <div>
        <WuiText>
          <p>
            Both title and description for the card are looked up in one call to{' '}
            <strong>WuiI18n</strong>
          </p>
        </WuiText>
        <WuiSpacer />
        <WuiI18n
          tokens={['wuiI18nMulti.title', 'wuiI18nMulti.description']}
          defaults={['Card Title', 'Card Description']}>
          {([title, description]) => (
            <WuiCard
              className="wui-displayInlineBlock"
              title={title}
              description={description}
            />
          )}
        </WuiI18n>
      </div>
    </>
  );
};
