import React, { Component } from 'react';
import { connect } from 'dva';
import Editor from 'for-editor';
//import aaa from '!!raw-loader!@/assets/md/Maven之pom.xml配置文件详解.md';
import aaa from '@/assets/md/Maven之pom.xml配置文件详解.md';
import Markdown from 'react-markdown';
import CodeBlock from '@/components/md/CodeBlock';
import HeadingBlock from '@/components/md/HeadingBlock';

@connect(({ blog }) => ({
  blog,
}))
class BlogIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'blog/get',
      callback: response => {
        console.log(response);
      },
    });
  }

  handleChange(value) {
    console.log(value);

    this.setState({
      value,
    });
  }

  render() {
    const { value } = this.state;

    return (<div>
{/*      <Editor
        value={value}
        onChange={value => this.handleChange(value)}
        preview={true}
        subfield={true}
        height={828}
      />*/}
      <Markdown
        source={aaa}
        escapeHtml={false}
        renderers={{
          code: CodeBlock,
          heading: HeadingBlock,
        }}
      />
    </div>);
  }
}

export default BlogIndex;