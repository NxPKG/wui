import React from 'react';

import {
  WuiText,
  WuiCode,
  WuiSpacer,
  WuiIcon,
  WuiTextColor,
  WuiCodeBlock,
} from '../../../../src/components';

const longLink =
  'http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool';

const wrappingExampleStyle = {
  width: 290,
  padding: 16,
  background: 'rgba(254, 228, 181, 0.5)',
};

export default () => (
  <WuiText>
    <h4>Display</h4>

    <WuiCode className="wui-displayBlock">.wui-displayBlock</WuiCode>

    <WuiSpacer />

    <WuiCode className="wui-displayInline">.wui-displayInline</WuiCode>

    <WuiSpacer />

    <WuiCode className="wui-displayInlineBlock">
      .wui-displayInlineBlock
    </WuiCode>

    <WuiSpacer />

    <WuiCode className="wui-fullWidth">
      .wui-fullWidth (similar to wui-displayBlock but adds 100% width)
    </WuiCode>

    <WuiSpacer />

    <h4>Text</h4>

    <WuiSpacer />

    <WuiTextColor color="danger">
      <WuiCode className="wui-textInheritColor">.wui-textInheritColor</WuiCode>{' '}
      will force text to inherit its color from its parent.
    </WuiTextColor>

    <WuiSpacer />

    <div className="wui-textLeft">
      <WuiCode>.wui-textLeft</WuiCode>
    </div>

    <div className="wui-textCenter">
      <WuiCode>.wui-textCenter</WuiCode>
    </div>
    <div className="wui-textRight">
      <WuiCode>.wui-textRight</WuiCode>
    </div>

    <WuiSpacer />

    <WuiSpacer />

    <div style={wrappingExampleStyle} className="wui-textNoWrap">
      <WuiCode>.wui-textNoWrap</WuiCode> will force text not to wrap even in
      small containers.
    </div>

    <WuiSpacer />

    <div style={wrappingExampleStyle} className="wui-textTruncate">
      <WuiCode>.wui-textTruncate</WuiCode> will ellipsis after a certain point.
    </div>

    <WuiSpacer />

    <div style={wrappingExampleStyle} className="wui-textBreakWord">
      <WuiCode>.wui-textBreakWord</WuiCode> will only break up at the end of
      words. Long urls will still break {longLink}.
    </div>

    <WuiSpacer />

    <div style={wrappingExampleStyle} className="wui-textBreakAll">
      <WuiCode>.wui-textBreakAll</WuiCode> will break up anything. It is useful
      for long urls like {longLink}{' '}
      --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------.
    </div>

    <WuiSpacer />

    <div
      style={wrappingExampleStyle}
      className="wui-textBreakWord wui-textBreakNormal">
      <WuiCode>.wui-textBreakNormal</WuiCode> revert back to not forcing word
      breaks. It is <strong>not</strong> useful for long urls like {longLink}.
    </div>

    <WuiSpacer />

    <h4>Overflows</h4>

    <div
      style={{
        height: 180,
        overflowY: 'hidden',
        background: wrappingExampleStyle.background,
      }}>
      <WuiText
        className="wui-yScrollWithShadows"
        size="s"
        style={{ padding: wrappingExampleStyle.padding }}>
        <p>
          The vertical utility requires a wrapping element to control the height
          with <WuiCode>overflow-y: hidden;</WuiCode> and the content to use the
          CSS utility class <WuiCode>.wui-yScrollWithShadows</WuiCode>.
        </p>
        <p>
          <b>Example:</b>
        </p>
        <WuiCodeBlock language="html" isCopyable paddingSize="s">
          {`<BodyContent style={{ height: 200, overflowY: 'hidden' }}>
  <BodyScroll className="wui-yScrollWithShadows" />
</BodyContent>`}
        </WuiCodeBlock>
      </WuiText>
    </div>

    <WuiSpacer />

    <div
      style={{
        ...wrappingExampleStyle,
        padding: 0,
      }}>
      <div
        className="wui-xScrollWithShadows"
        style={{ padding: wrappingExampleStyle.padding }}>
        <WuiText size="s" style={{ width: '150%' }}>
          <p>
            When using the horizontal utility{' '}
            <WuiCode>.wui-xScrollWithShadows</WuiCode>, you may want to add
            padding to the sides of your content so the mask doesn&apos;t
            overlay it.
          </p>
        </WuiText>
      </div>
    </div>

    <WuiSpacer />
    <h4>Vertical alignment</h4>
    <WuiSpacer />

    <div>
      <WuiIcon type="logoWazuh" size="xxl" className="wui-alignTop" />
      <WuiCode>.wui-alignTop</WuiCode>
    </div>

    <WuiSpacer />

    <div>
      <WuiIcon type="logoWazuh" size="xxl" className="wui-alignMiddle" />
      <WuiCode>.wui-alignMiddle</WuiCode>
    </div>

    <WuiSpacer />

    <div>
      <WuiIcon type="logoWazuh" size="xxl" className="wui-alignBottom" />
      <WuiCode>.wui-alignBottom</WuiCode>
    </div>

    <WuiSpacer />

    <div>
      <WuiIcon type="logoWazuh" size="xxl" className="wui-alignBaseline" />
      <WuiCode>.wui-alignBaseline</WuiCode>
    </div>

    <WuiSpacer />

    <h4>Responsive</h4>

    <WuiCode className="wui-hideFor--xs">.wui-hideFor--xs</WuiCode>
    <WuiSpacer />
    <WuiCode className="wui-hideFor--s">.wui-hideFor--s</WuiCode>
    <WuiSpacer />
    <WuiCode className="wui-hideFor--m">.wui-hideFor--m</WuiCode>
    <WuiSpacer />
    <WuiCode className="wui-hideFor--l">.wui-hideFor--l</WuiCode>
    <WuiSpacer />
    <WuiCode className="wui-hideFor--xl">.wui-hideFor--xl</WuiCode>

    <WuiSpacer />

    <WuiCode className="wui-showFor--xs">.wui-showFor--xs</WuiCode>
    <WuiCode className="wui-showFor--s">.wui-showFor--s</WuiCode>
    <WuiCode className="wui-showFor--m">.wui-showFor--m</WuiCode>
    <WuiCode className="wui-showFor--l">.wui-showFor--l</WuiCode>
    <WuiCode className="wui-showFor--xl">.wui-showFor--xl</WuiCode>

    <WuiSpacer />

    <h5>Modifiers</h5>
    <p>
      The <WuiCode>.wui-showFor--[size]</WuiCode> classes will force display of{' '}
      <WuiCode>inline</WuiCode> when showing the element. You can modify this
      display property by appending <WuiCode>block</WuiCode>,{' '}
      <WuiCode>inlineBlock</WuiCode>, or <WuiCode>flex</WuiCode> to the class.
    </p>

    <WuiCode className="wui-showFor--xs">.wui-showFor--xs (inline)</WuiCode>
    <WuiCode className="wui-showFor--s">.wui-showFor--s (inline)</WuiCode>
    <WuiCode className="wui-showFor--m">.wui-showFor--m--block</WuiCode>
    <WuiCode className="wui-showFor--l">.wui-showFor--l--inlineBlock</WuiCode>
    <WuiCode className="wui-showFor--xl">.wui-showFor--xl--flex</WuiCode>

    <WuiSpacer />

    <div
      style={{ background: wrappingExampleStyle.background }}
      className="wui-showFor--xs wui-showFor--s wui-showFor--m--block wui-showFor--l--inlineBlock wui-showFor--xl--flex">
      <span style={wrappingExampleStyle}>span</span>
      <span style={wrappingExampleStyle}>span</span>
      <span style={wrappingExampleStyle}>span</span>
    </div>
  </WuiText>
);
