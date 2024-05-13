import React, { useCallback, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import {
  WuiMarkdownEditor,
  WuiSpacer,
  WuiCodeBlock,
  WuiButtonToggle,
  WuiFormErrorText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const initialContent = `## Errors

The tooltip is empty and will error

!{tooltip[]()}
`;

export default () => {
  const errorElementId = useRef(htmlIdGenerator()());
  const [value, setValue] = useState(initialContent);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const [isAstShowing, setIsAstShowing] = useState(false);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);
  return (
    <>
      <WuiMarkdownEditor
        aria-label="WUI markdown editor demo"
        aria-describedby={errorElementId.current}
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
      />
      <WuiSpacer size="s" />

      <WuiFormErrorText
        id={errorElementId.current}
        className="wuiFormRow__text">
        Utilize error text or{' '}
        <strong>
          <Link to="/forms/form-validation">WuiFormRow</Link>
        </strong>{' '}
        for more permanent error feedback
      </WuiFormErrorText>

      <div className="wui-textRight">
        <WuiButtonToggle
          label={isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
          size="s"
          isEmpty
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onChange={() => setIsAstShowing(!isAstShowing)}
          isSelected={isAstShowing}
        />
      </div>

      {isAstShowing && <WuiCodeBlock language="json">{ast}</WuiCodeBlock>}
    </>
  );
};
