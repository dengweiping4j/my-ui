import React, { Component } from 'react';
import styles from './index.less';
import { List } from 'antd';

class IndexPage extends Component {

  render() {
    const data = [
      {
        title: '代码生成神器',
        description: '根据数据库表结构，就能自动生成基于 SpringBoot + React 的前后端代码',
        icon: '/images/tool-item/html.png',
        url: '',
      },
      {
        title: 'JSON在线解析',
        description: '这是一款校验JSON数据格式，并对其进行自动美化的实用工具',
        icon: '/images/tool-item/json.png',
        url: '',
      },
      {
        title: '文字加密工具',
        description: 'base64编码转换，md5加密等',
        icon: '/images/keyboard.jpg',
        url: '',
      },
    ];

    return (
      <div style={{ padding: '20px 40px' }}>
        <div className={styles['title']}>博主推荐</div>

        <List
          style={{ margin: 20 }}
          grid={{ gutter: 16, column: 3 }}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{
                display: 'flex',
                height: '250px',
                background: '#f6f6f6',
                padding: '40px',
              }}>
              <div>
                <div className={styles['item-title']}>{item.title}</div>
                <div className={styles['item-description']}>{item.description}</div>
              </div>
              <img src={item.icon} className={styles['item-icon']} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default IndexPage;
