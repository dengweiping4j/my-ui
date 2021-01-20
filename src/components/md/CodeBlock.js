import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// 设置高亮样式
import { coy,atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// 设置高亮的语言
import { jsx, javascript, java, sql } from 'react-syntax-highlighter/dist/esm/languages/prism';

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  componentWillMount() {
    SyntaxHighlighter.registerLanguage('jsx', jsx);
    SyntaxHighlighter.registerLanguage('javascript', javascript);
    SyntaxHighlighter.registerLanguage('java', java);
    SyntaxHighlighter.registerLanguage('sql', sql);
  }

  render() {
    const { language, value } = this.props;
    return (
      <figure className='highlight'>
        <SyntaxHighlighter language={language} style={atomDark}>
          {value}
        </SyntaxHighlighter>
      </figure>
    );
  }
}

export default CodeBlock;
