import React, { Component } from 'react';
import styles from './AuthorInfo.less';
import { Avatar, Descriptions } from 'antd';

class AuthorInfo extends Component {
  render() {
    return <div style={{ background: '#f6f6f6', padding: '20px', ...this.props.style }}>
      <div style={{ display: 'flex' }}>
        <Avatar src={'/images/my.jpg'} size={64} alt={'头像'} />

        <div style={{ margin: '5px 20px' }}>
          <div><a>初学者</a></div>
          <span>技术大佬</span>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Descriptions>
          <Descriptions.Item label='原创'>12</Descriptions.Item>
          <Descriptions.Item label='转载'>5</Descriptions.Item>
          <Descriptions.Item label='收藏'>36</Descriptions.Item>
          <Descriptions.Item label='粉丝'>4</Descriptions.Item>
          <Descriptions.Item label='获赞'>128</Descriptions.Item>
          <Descriptions.Item label='评论'>108</Descriptions.Item>
        </Descriptions>

        <img src={'images/demo/1.png'} width={36} style={{ marginTop: '20px' }} />
        <img src={'images/demo/2.png'} width={36} style={{ marginTop: '20px' }}/>
        <img src={'images/demo/3.png'} width={36} style={{ marginTop: '20px' }}/>
        <img src={'images/demo/4.png'} width={36} style={{ marginTop: '20px' }}/>
      </div>

    </div>;
  }
}

export default AuthorInfo;