import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Comment, message } from 'antd';
import CodeBlock from '@/components/md/CodeBlock';
import HeadingBlock from '@/components/md/HeadingBlock';
import Markdown from 'react-markdown';

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
                author: response.data.author,
                title: response.data.title,
                description: response.data.description,
                content: response.data.content,
                createDate: response.data.createDate,
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

    const { author, title, description, content, createDate } = this.state;

    return <div style={{ margin: '20px 40px' }}>
      <Comment
        //actions={actions}
        author={<a>{title}</a>}
        avatar={
          <Avatar
            size={34}
            src={'/images/my.jpg'}
            alt={author}
          />
        }
        content={<p>{description}</p>}
        datetime={<span>{createDate}</span>}
      />

      {/* <Editor
        toolbar={<span></span>}
        value={this.state.data}
        preview={true}
      />*/}
      <div style={{ margin: '20px' }}>
        <Markdown
          source={content}
          escapeHtml={false}
          renderers={{
            code: CodeBlock,
            heading: HeadingBlock,
          }}
        />
      </div>

    </div>;
  }
}

export default BlogPage;