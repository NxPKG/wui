import React from 'react';

import { WuiScreenReaderOnly } from '../../../../src/components/accessibility/screen_reader';
import { WuiCallOut } from '../../../../src/components/call_out';
import { WuiText } from '../../../../src/components/text';
import { WuiTitle } from '../../../../src/components/title';
import { WuiLink } from '../../../../src/components/link';

export default () => (
  <div>
    <WuiText>
      <WuiTitle size="xxs">
        <h3>Visually hide content</h3>
      </WuiTitle>
      <p>
        <em>
          Use a screenreader to verify that there is a second paragraph in this
          example:
        </em>
      </p>
      <p>This is the first paragraph. It is visible to all.</p>
      <WuiScreenReaderOnly>
        <p>
          This is the second paragraph. It is hidden for sighted users but
          visible to screen readers.
        </p>
      </WuiScreenReaderOnly>
      <p>This is the third paragraph. It is visible to all.</p>
      <WuiTitle size="xxs">
        <h4>Show on focus</h4>
      </WuiTitle>
      <p>
        <em>
          Tab through this section with your keyboard to display a &lsquo;Skip
          navigation&rsquo; link:
        </em>
      </p>
      <p>
        This link is visible to all on focus:{' '}
        <WuiScreenReaderOnly showOnFocus>
          <WuiLink href="#">Skip navigation</WuiLink>
        </WuiScreenReaderOnly>
      </p>
      <WuiCallOut
        size="s"
        title="For a fully styled &lsquo;Skip to main content&rsquo; solution, see the WuiSkipLink component in the next section."
        iconType="iInCircle"
      />
    </WuiText>
  </div>
);
