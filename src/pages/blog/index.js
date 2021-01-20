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
      data: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'blog/query',
      payload: {
        page: 1,
        pageSize: 20,
      },
      callback: response => {
        this.setState({
          data: response,
        });
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
    const data = [
      {
        id: '6dc74fe3-b3d9-43fc-a99d-f073bd33b2e5',
        title: '基于React+SpringCloud的个人博客系统（含代码生成工具）',
        description: '程序员工具箱-前端所用技术Reactumiantd项目地址：my-ui程序员工具箱-后端所用技术springbootspringcloudjwtredismysqljpa项目地址：programmer-tool-cloud-svc目前实现了登录认证，token生成等功能，在zuul模块通过gateway拦截器对请求进行拦截，验证相关权限,程序员工具箱-前端所用技术Reactumiantd项目地址：my-ui程序员工具箱-后端所用技术springbootspringcloudjwtredismysqljpa项目地址：programmer-tool-cloud-svc目前实现了登录认证，token生成等功能，在zuul模块通过gateway拦截器对请求进行拦截，验证相关权限，通过后访问具体模块...',
        createDate: '2021-01-20',
      },
      {
        id: '6dc74fe3-b3d9-43fc-a99d-f073bd33b2e5',
        title: '基于React+SpringCloud的个人博客系统（含代码生成工具）',
        description: '程序员工具箱-前端所用技术Reactumiantd项目地址：my-ui程序员工具箱-后端所用技术springbootspringcloudjwtredismysqljpa项目地址：programmer-tool-cloud-svc目前实现了登录认证，token生成等功能，在zuul模块通过gateway拦截器对请求进行拦截，验证相关权限,程序员工具箱-前端所用技术Reactumiantd项目地址：my-ui程序员工具箱-后端所用技术springbootspringcloudjwtredismysqljpa项目地址：programmer-tool-cloud-svc目前实现了登录认证，token生成等功能，在zuul模块通过gateway拦截器对请求进行拦截，验证相关权限，通过后访问具体模块...',
        createDate: '2021-01-20',
      },
      {
        id: '6dc74fe3-b3d9-43fc-a99d-f073bd33b2e5',
        title: '基于React+SpringCloud的个人博客系统（含代码生成工具）',
        description: '程序员工具箱-前端所用技术Reactumiantd项目地址：my-ui程序员工具箱-后端所用技术springbootspringcloudjwtredismysqljpa项目地址：programmer-tool-cloud-svc目前实现了登录认证，token生成等功能，在zuul模块通过gateway拦截器对请求进行拦截，验证相关权限,程序员工具箱-前端所用技术Reactumiantd项目地址：my-ui程序员工具箱-后端所用技术springbootspringcloudjwtredismysqljpa项目地址：programmer-tool-cloud-svc目前实现了登录认证，token生成等功能，在zuul模块通过gateway拦截器对请求进行拦截，验证相关权限，通过后访问具体模块...',
        createDate: '2021-01-20',
      },
    ];
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

    </div>;
  }
}

export default BlogIndex;