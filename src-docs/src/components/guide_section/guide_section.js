import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  WuiCode,
  WuiCodeBlock,
  WuiErrorBoundary,
  WuiSpacer,
  WuiTab,
  WuiTable,
  WuiTableBody,
  WuiTableHeader,
  WuiTableHeaderCell,
  WuiTableRow,
  WuiTableRowCell,
  WuiTabs,
  WuiText,
  WuiTextColor,
  WuiTitle,
  WuiLink,
  WuiButtonEmpty,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

import { CodeSandboxLink } from '../codesandbox';

import { cleanWuiImports } from '../../services';

import { extendedTypesInfo } from './guide_section_extends';

export const markup = text => {
  const regex = /(#[a-zA-Z]+)|(`[^`]+`)/g;
  return text.split('\n').map(token => {
    const values = token.split(regex).map((token, index) => {
      if (!token) {
        return '';
      }
      if (token.startsWith('#')) {
        const id = token.substring(1);
        const onClick = () => {
          document.getElementById(id).scrollIntoView();
        };
        return (
          <WuiLink key={`markup-${index}`} onClick={onClick}>
            {id}
          </WuiLink>
        );
      }
      if (token.startsWith('`')) {
        const code = token.substring(1, token.length - 1);
        return <WuiCode key={`markup-${index}`}>{code}</WuiCode>;
      }
      if (token.includes('\n')) {
        return token
          .split('\n')
          .map(item => [item, <br key={`markup-${index}`} />]);
      }
      return token;
    });
    return [...values, <br key="lineBreak" />];
  });
};

export const humanizeType = type => {
  if (!type) {
    return '';
  }

  let humanizedType;

  switch (type.name) {
    case 'enum':
      if (Array.isArray(type.value)) {
        humanizedType = type.value.map(({ value }) => value).join(', ');
        break;
      }
      humanizedType = type.value;
      break;

    case 'union':
      if (Array.isArray(type.value)) {
        const unionValues = type.value.map(({ name }) => name);
        unionValues[unionValues.length - 1] = `or ${
          unionValues[unionValues.length - 1]
        }`;

        if (unionValues.length > 2) {
          humanizedType = unionValues.join(', ');
        } else {
          humanizedType = unionValues.join(' ');
        }
        break;
      }
      humanizedType = type.value;
      break;

    default:
      humanizedType = type.name;
  }

  return humanizedType;
};

const nameToCodeClassMap = {
  javascript: 'javascript',
  html: 'html',
};

export class GuideSection extends Component {
  constructor(props) {
    super(props);

    this.componentNames = Object.keys(props.props);
    const hasSnippet = 'snippet' in props;

    this.tabs = [];

    if (props.demo) {
      this.tabs.push({
        name: 'demo',
        displayName: 'Demo',
      });
    }

    if (props.source) {
      this.tabs.push(
        {
          name: 'javascript',
          displayName: 'Demo JS',
          isCode: true,
        },
        {
          name: 'html',
          displayName: 'Demo HTML',
          isCode: true,
        }
      );
    }

    if (hasSnippet) {
      this.tabs.push({
        name: 'snippet',
        displayName: 'Snippet',
        isCode: true,
      });
    }

    if (this.componentNames.length) {
      this.tabs.push({
        name: 'props',
        displayName: 'Props',
      });
    }

    this.state = {
      selectedTab: this.tabs.length > 0 ? this.tabs[0] : undefined,
      renderedCode: null,
      sortedComponents: {},
    };

    this.memoScroll = 0;
  }

  onSort = componentName => {
    const { sortedComponents } = this.state;
    if (
      !sortedComponents[componentName] ||
      sortedComponents[componentName] === 'NONE'
    ) {
      this.setState({
        sortedComponents: { ...sortedComponents, [componentName]: 'ASC' },
      });
    } else if (sortedComponents[componentName] === 'ASC') {
      this.setState({
        sortedComponents: { ...sortedComponents, [componentName]: 'DSC' },
      });
    } else {
      this.setState({
        sortedComponents: { ...sortedComponents, [componentName]: 'NONE' },
      });
    }
  };

  onSelectedTabChanged = selectedTab => {
    const { name } = selectedTab;
    let renderedCode = null;

    if (name === 'html' || name === 'javascript') {
      const { code } = this.props.source.find(
        sourceObject => sourceObject.type === name
      );
      renderedCode = code;

      if (name === 'javascript') {
        renderedCode = renderedCode.default
          .replace(
            /(from )'(..\/)+src\/services(\/?';)/g,
            "from '@wazuh/wui/lib/services';"
          )
          .replace(
            /(from )'(..\/)+src\/components\/.*?';/g,
            "from '@wazuh/wui';"
          );
        renderedCode = renderedCode.split('\n');
        const linesWithImport = [];
        // eslint-disable-next-line guard-for-in
        for (const idx in renderedCode) {
          const line = renderedCode[idx];
          if (line.includes('import') && line.includes("from '@wazuh/wui';")) {
            linesWithImport.push(line);
            renderedCode[idx] = '';
          }
        }
        if (linesWithImport.length > 1) {
          linesWithImport[0] = linesWithImport[0].replace(
            " } from '@wazuh/wui';",
            ','
          );
          for (let i = 1; i < linesWithImport.length - 1; i++) {
            linesWithImport[i] = linesWithImport[i]
              .replace('import {', '')
              .replace(" } from '@wazuh/wui';", ',');
          }
          linesWithImport[linesWithImport.length - 1] = linesWithImport[
            linesWithImport.length - 1
          ].replace('import {', '');
        }
        const newImport = linesWithImport.join('');
        renderedCode.unshift(newImport);
        renderedCode = renderedCode.join('\n');
        let len = renderedCode.replace('\n\n\n', '\n\n').length;
        while (len < renderedCode.length) {
          renderedCode = renderedCode.replace('\n\n\n', '\n\n');
          len = renderedCode.replace('\n\n\n', '\n\n').length;
        }
        renderedCode = cleanWuiImports(renderedCode);
      } else if (name === 'html') {
        renderedCode = code.render();
      }
    }

    this.setState({ selectedTab, renderedCode }, () => {
      if (name === 'javascript') {
        requestAnimationFrame(() => {
          const pre = this.refs.javascript.querySelector('.wuiCodeBlock__pre');
          if (!pre) return;
          pre.scrollTop = this.memoScroll;
        });
      }
    });
  };

  renderTabs() {
    return this.tabs.map(tab => (
      <WuiTab
        onClick={() => this.onSelectedTabChanged(tab)}
        isSelected={tab === this.state.selectedTab}
        key={tab.name}>
        {tab.displayName}
      </WuiTab>
    ));
  }

  renderText() {
    const { text } = this.props;

    if (!text) {
      return;
    }

    return [<WuiText key="text">{text}</WuiText>];
  }

  renderSnippet() {
    const { snippet } = this.props;

    if (!snippet) {
      return;
    }

    let snippetCode;
    if (typeof snippet === 'string') {
      snippetCode = (
        <Fragment key="snippet">
          <WuiSpacer size="m" />
          <WuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
            {snippet}
          </WuiCodeBlock>
        </Fragment>
      );
    } else {
      snippetCode = snippet.map((snip, index) => (
        <Fragment key={`snippet${index}`}>
          <WuiSpacer size="m" />
          <WuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
            {snip}
          </WuiCodeBlock>
        </Fragment>
      ));
    }

    return snippetCode;
  }

  renderPropsForComponent = (componentName, component) => {
    if (!component.__docgenInfo) {
      return;
    }

    const docgenInfo = Array.isArray(component.__docgenInfo)
      ? component.__docgenInfo[0]
      : component.__docgenInfo;
    const { description, props, extendedInterfaces } = docgenInfo;

    if (!props && !description) {
      return;
    }

    const { sortedComponents } = this.state;

    const propNames = Object.keys(props);
    if (
      sortedComponents[componentName] &&
      sortedComponents[componentName] !== 'NONE'
    ) {
      propNames.sort((a, b) => {
        if (sortedComponents[componentName] === 'ASC') {
          return a < b ? -1 : 1;
        } else {
          return a < b ? 1 : -1;
        }
      });
    }

    const rows = propNames.map(propName => {
      const {
        description: propDescription = '',
        required,
        defaultValue,
        type,
      } = props[propName];

      const codeBlockProps = {
        className: 'guideSection__tableCodeBlock',
        paddingSize: 'none',
        language: 'ts',
      };

      let humanizedName = (
        <strong className="wui-textBreakNormal">{propName}</strong>
      );

      if (required) {
        humanizedName = (
          <span>
            {humanizedName}{' '}
            <WuiTextColor color="danger">(required)</WuiTextColor>
          </span>
        );
      }

      const humanizedType = humanizeType(type);

      const functionMatches = [
        ...humanizedType.matchAll(/\([^=]*\) =>\s\w*\)*/g),
      ];
      const types = humanizedType.split(/\([^=]*\) =>\s\w*\)*/);

      const typeMarkup = (
        <span className="wui-textBreakNormal">{markup(humanizedType)}</span>
      );
      const descriptionMarkup = markup(propDescription);
      let defaultValueMarkup = '';
      if (defaultValue) {
        defaultValueMarkup = [
          <WuiCodeBlock {...codeBlockProps} key={`defaultValue-${propName}`}>
            {defaultValue.value}
          </WuiCodeBlock>,
        ];
        if (defaultValue.comment) {
          defaultValueMarkup.push(`(${defaultValue.comment})`);
        }
      }

      let defaultTypeCell = (
        <WuiTableRowCell key="type" header="Type" textOnly={false}>
          <WuiCodeBlock {...codeBlockProps}>{typeMarkup}</WuiCodeBlock>
        </WuiTableRowCell>
      );
      if (functionMatches.length > 0) {
        const elements = [];
        let j = 0;
        for (let i = 0; i < types.length; i++) {
          if (functionMatches[j]) {
            elements.push(
              <Fragment key={`type-${i}`}>
                {types[i]} <br />
              </Fragment>
            );
            elements.push(
              <Fragment key={`function-${i}`}>
                {functionMatches[j][0]} <br />
              </Fragment>
            );
            j++;
          } else {
            elements.push(
              <Fragment key={`type-${i}`}>
                {types[i]} <br />
              </Fragment>
            );
          }
        }
        defaultTypeCell = (
          <WuiTableRowCell key="type" header="Type" textOnly={false}>
            <WuiCodeBlock whiteSpace="pre" {...codeBlockProps}>
              {elements}
            </WuiCodeBlock>
          </WuiTableRowCell>
        );
      }

      const cells = [
        <WuiTableRowCell key="name" header="Prop">
          {humanizedName}
        </WuiTableRowCell>,
        defaultTypeCell,
        <WuiTableRowCell
          key="defaultValue"
          header="Default"
          hideForMobile={!defaultValue}>
          {defaultValueMarkup}
        </WuiTableRowCell>,
        <WuiTableRowCell
          key="description"
          header="Note"
          isMobileFullWidth={true}
          hideForMobile={!propDescription}>
          {descriptionMarkup}
        </WuiTableRowCell>,
      ];

      return <WuiTableRow key={propName}>{cells}</WuiTableRow>;
    });

    const extendedTypes = extendedInterfaces
      ? extendedInterfaces.filter(type => !!extendedTypesInfo[type])
      : [];
    // if there is an HTMLAttributes type present among others, remove HTMLAttributes
    if (extendedTypes.includes('HTMLAttributes') && extendedTypes.length > 1) {
      const htmlAttributesIndex = extendedTypes.indexOf('HTMLAttributes');
      extendedTypes.splice(htmlAttributesIndex, 1);
    }
    const extendedTypesElements = extendedTypes.map((type, index) => (
      <Fragment key={`extendedTypeValue-${extendedTypesInfo[type].name}`}>
        <WuiLink href={extendedTypesInfo[type].url}>
          {extendedTypesInfo[type].name}
        </WuiLink>
        {index + 1 < extendedTypes.length && ', '}
      </Fragment>
    ));

    let descriptionElement;

    if (description) {
      descriptionElement = (
        <div key={`description-${componentName}`}>
          <WuiText>
            <p>{markup(description)}</p>
          </WuiText>
          <WuiSpacer size="m" id={`propsSpacer-${componentName}`} />
        </div>
      );
    }

    let table;

    if (rows.length) {
      table = (
        <WuiTable compressed key={`propsTable-${componentName}`}>
          <WuiTableHeader>
            <WuiTableHeaderCell
              onSort={() => {
                this.onSort(componentName);
              }}
              isSorted={
                sortedComponents[componentName] &&
                sortedComponents[componentName] !== 'NONE'
              }
              isSortAscending={
                sortedComponents[componentName] &&
                sortedComponents[componentName] === 'ASC'
              }
              style={{ Width: '20%' }}>
              Prop
            </WuiTableHeaderCell>

            <WuiTableHeaderCell style={{ width: '15%' }}>
              Type
            </WuiTableHeaderCell>

            <WuiTableHeaderCell style={{ width: '15%' }}>
              Default
            </WuiTableHeaderCell>

            <WuiTableHeaderCell style={{ width: '50%' }}>
              Note
            </WuiTableHeaderCell>
          </WuiTableHeader>

          <WuiTableBody>{rows}</WuiTableBody>
        </WuiTable>
      );
    }

    return [
      <WuiSpacer size="m" key={`propsSpacer-${componentName}-1`} />,
      <WuiFlexGroup
        key={`propsName-${componentName}`}
        alignItems="baseline"
        wrap>
        <WuiFlexItem grow={false}>
          <WuiTitle size="s">
            <h3 id={componentName}>{componentName}</h3>
          </WuiTitle>
        </WuiFlexItem>
        {extendedTypesElements.length > 0 && (
          <WuiFlexItem>
            <WuiText size="s">
              <p>[ extends {extendedTypesElements} ]</p>
            </WuiText>
          </WuiFlexItem>
        )}
      </WuiFlexGroup>,
      <WuiSpacer size="s" key={`propsSpacer-${componentName}-2`} />,
      descriptionElement,
      table,
    ];
  };

  renderProps() {
    const { props } = this.props;
    return this.componentNames
      .map(componentName =>
        this.renderPropsForComponent(componentName, props[componentName])
      )
      .reduce((a, b) => a.concat(b), []); // Flatten the resulting array
  }

  renderChrome() {
    let title;

    if (this.props.title) {
      title = (
        <Fragment>
          <WuiTitle>
            <h2>{this.props.title}</h2>
          </WuiTitle>
          <WuiSpacer size="m" key="textSpacer" />
        </Fragment>
      );
    }
    return (
      <div>
        <div className="guideSection__text">
          {title}
          {this.renderText()}
        </div>

        {this.tabs.length > 0 && (
          <>
            <WuiSpacer size="m" />
            <WuiTabs>{this.renderTabs()}</WuiTabs>
          </>
        )}
      </div>
    );
  }

  renderCode(name) {
    const wuiCodeBlock = (
      <WuiCodeBlock language={nameToCodeClassMap[name]} overflowHeight={400}>
        {this.state.renderedCode}
      </WuiCodeBlock>
    );

    const divProps = {
      key: name,
      ref: name,
    };

    const memoScrollUtility = () => {
      const pre = this.refs.javascript.querySelector('.wuiCodeBlock__pre');
      this.memoScroll = pre.scrollTop;
    };

    if (name === 'javascript') {
      return (
        <div {...divProps} onScroll={memoScrollUtility}>
          {name === 'javascript' ? this.renderCodeSandBoxButton() : null}
          {wuiCodeBlock}
        </div>
      );
    }

    return <div {...divProps}> {wuiCodeBlock} </div>;
  }

  renderContent() {
    if (typeof this.state.selectedTab === 'undefined') {
      return;
    }

    if (this.state.selectedTab.name === 'snippet') {
      return <WuiErrorBoundary>{this.renderSnippet()}</WuiErrorBoundary>;
    }

    if (this.state.selectedTab.isCode) {
      return (
        <WuiErrorBoundary>
          {this.renderCode(this.state.selectedTab.name)}
        </WuiErrorBoundary>
      );
    }

    if (this.state.selectedTab.name === 'props') {
      return <WuiErrorBoundary>{this.renderProps()}</WuiErrorBoundary>;
    }

    return (
      <WuiErrorBoundary>
        <div>
          <div className="guideSection__space" />
          {this.props.demo}
        </div>
      </WuiErrorBoundary>
    );
  }

  renderCodeSandBoxButton() {
    return (
      <CodeSandboxLink content={this.props.source[0].code.default}>
        <WuiButtonEmpty size="xs" iconType="logoCodesandbox">
          Try out this demo on Code Sandbox
        </WuiButtonEmpty>
      </CodeSandboxLink>
    );
  }

  render() {
    const chrome = this.renderChrome();

    return (
      <div className="guideSection" id={this.props.id}>
        {chrome}
        {this.renderContent()}
        {this.props.extraContent}
      </div>
    );
  }
}

GuideSection.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  source: PropTypes.array,
  snippet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.any,
  routes: PropTypes.object.isRequired,
  props: PropTypes.object,
};

GuideSection.defaultProps = {
  props: {},
};
