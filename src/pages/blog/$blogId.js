import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import CodeBlock from '@/components/md/CodeBlock';
import HeadingBlock from '@/components/md/HeadingBlock';
import Markdown from 'react-markdown';
import Editor from 'for-editor';

@connect(({ blog }) => ({
  blog,
}))
class BlogPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    if (this.props.location !== undefined) {
      const { pathname } = this.props.location;
      const blogId = pathname.substring(pathname.lastIndexOf('/') + 1);

      if (blogId) {
        this.props.dispatch({
          type: 'blog/get',
          payload: {
            id: blogId,
          },
          callback: response => {
            console.log(response);
            if (response.code === 'SUCCEED') {
              this.setState({
                data: response.data.content,
              });
            } else {
              message.error(response.message);
            }
          },
        });
      }
    }
  }

  render() {

    return <div style={{ margin: '40px' }}>
     {/* <Editor
        toolbar={<span></span>}
        value={this.state.data}
        preview={true}
      />*/}
      <Markdown
        source={this.state.data}
        escapeHtml={false}
        renderers={{
          code: CodeBlock,
          heading: HeadingBlock,
        }}
      />
    </div>;
  }
}

export default BlogPage;