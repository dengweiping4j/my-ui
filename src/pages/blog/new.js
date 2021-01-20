import React, { Component } from 'react';
import Editor from 'for-editor';
import { connect } from 'dva';
import { Input, message, Modal } from 'antd';
import { router } from 'umi';

const { TextArea } = Input;

@connect(({ blog }) => ({
  blog,
}))
class NewBlogPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      description: undefined,
      content: undefined,
      visible: false,
    };
  }

  handleChange(content) {
    this.setState({
      content,
    });
  }

  save = () => {
    if (this.state.content && this.state.content.trim().length > 0) {
      this.setState({
        visible: true,
      });
    } else {
      message.warn('请先填写博客内容');
    }
  };

  commit = () => {
    const { title, description, content } = this.state;

    if (title && title.trim().length > 0) {
      this.props.dispatch({
        type: 'blog/create',
        payload: {
          data: {
            title,
            description,
            content,
          },
        },
        callback: response => {
          if (response.code === 'SUCCEED') {
            router.push('/blog');
          } else {
            message.error(response.message);
          }
        },
      });
    } else {
      message.error('请填写文章标题');
    }

  };

  handleCancel = () => {
    this.setState({
      title: undefined,
      description: undefined,
      visible: false,
    });
  };

  formChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { content, title, description, visible } = this.state;

    return (<div>
      <Editor
        value={content}
        onChange={value => this.handleChange(value)}
        onSave={this.save}
        preview={true}
        subfield={true}
        height={828}
      />

      <Modal
        width={600}
        title={'发布博客'}
        visible={visible}
        destroyOnClose={true}
        maskClosable={false}
        onCancel={this.handleCancel}
        onOk={this.commit}
        okText={'发布'}
        cancelText={'取消'}
      >
        <Input
          placeholder={'文章标题'}
          value={title}
          onChange={(e) => this.formChange('title', e.target.value)}
        />
        <TextArea
          placeholder={'文章摘要'}
          rows={4}
          style={{ marginTop: '20px' }}
          value={description}
          onChange={(e) => this.formChange('description', e.target.value)}
        />
      </Modal>
    </div>);
  }
}

export default NewBlogPage;