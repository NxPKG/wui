import React from 'react';
import { WuiLink } from '../../../../src/components';

const urls = [
  'https://wazuh.com',
  '//wazuh.co',
  'relative/url/somewhere',
  'http://username:password@example.com/',
  // eslint-disable-next-line no-script-url
  'javascript:alert()',
];

export const LinkValidation = () => {
  return (
    <>
      {urls.map(url => (
        <div key={url}>
          <WuiLink color="secondary" href={url}>
            {url}
          </WuiLink>
        </div>
      ))}
    </>
  );
};
