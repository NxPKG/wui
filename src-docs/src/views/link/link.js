import React from 'react';

import { WuiCode, WuiLink, WuiText } from '../../../../src/components';

export default () => (
  <WuiText>
    <p>
      Open the{' '}
      <WuiLink href="http://www.wazuh.com" target="_blank">
        Wazuh website
      </WuiLink>{' '}
      in a new tab.
    </p>
    <p>
      This{' '}
      <WuiLink href="http://www.wazuh.com" external target="_blank">
        link
      </WuiLink>{' '}
      has the <WuiCode>external</WuiCode> prop set to true.
    </p>
    <p>
      This link is actually a{' '}
      <WuiLink onClick={() => window.alert('Button clicked')}>button</WuiLink>{' '}
      with an onClick handler.
    </p>
    <p>
      Here is an example of a{' '}
      <WuiLink
        href="https://github.com/wazuh/wui"
        onClick={e => {
          if (!window.confirm('Are you sure you want to see the wui repo?')) {
            e.preventDefault();
          }
        }}>
        link
      </WuiLink>{' '}
      with both an href and an onClick handler.
    </p>
    <p>Links can be colored as well.</p>
    <ul>
      <li>
        <WuiLink color="subdued" href="#">
          subdued
        </WuiLink>
      </li>
      <li>
        <WuiLink color="secondary" href="#">
          secondary
        </WuiLink>
      </li>
      <li>
        <WuiLink color="accent" href="#">
          accent
        </WuiLink>
      </li>
      <li>
        <WuiLink color="danger" href="#">
          danger
        </WuiLink>
      </li>
      <li>
        <WuiLink color="warning" href="#">
          warning
        </WuiLink>
      </li>
      <li>
        <WuiLink color="text" href="#">
          text
        </WuiLink>
      </li>
      <li>
        <span style={{ background: 'black' }}>
          <WuiLink color="ghost" href="#">
            ghost
          </WuiLink>
        </span>
      </li>
    </ul>
  </WuiText>
);
