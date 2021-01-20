import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import { Button, List } from 'antd';
import styles from './index.less';

@connect(({ blog }) => ({
  blog,
}))
class BlogIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      total: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'blog/query',
      payload: {
        page: 1,
        pageSize: 20,
        queryData: {
          content: '测试',
        },
      },
      callback: response => {
        if (response) {
          this.setState({
            data: response.data,
            page: response.page,
            pageSize: response.pageSize,
            total: response.total,
          });
        }
      },
    });
  }

  toNewPage = () => {
    router.push('./blog/new');
  };

  toBlogDetail = id => {
    router.push('./blog/' + id);
  };

  render() {
    const {
      page,
      pageSize,
      total,
      data,
    } = this.state;

    return <div style={{ margin: '40px' }}>
      <div className={styles['header']}>
        <span className={styles['header-title']}>我的博客</span>
        <Button onClick={this.toNewPage} type={'primary'} style={{ marginRight: '40px' }}>写博客</Button>
      </div>

      <List
        style={{ margin: '20px 40px' }}
        itemLayout='horizontal'
        dataSource={data}
        renderItem={item => (
          <List.Item className={styles['list']}>
            <div>
              <a className={styles['title']} onClick={() => this.toBlogDetail(item.id)}>{item.title}</a>
              <div className={styles['description']}>{item.description}</div>
              <span className={styles['createDate']}>{item.createDate}</span>
            </div>
          </List.Item>
        )}
      />

      {total / pageSize > 0 ?
        <div style={{ margin: '20px 40px' }}>
          <a>下一页</a>
        </div>
        : null}
    </div>;
  }
}

export default BlogIndex;