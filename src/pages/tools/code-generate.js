import React, { Component } from 'react';
import styles from './code-generate.less';
import { Button, Divider, Input, List, Table } from 'antd';
import { connect } from 'dva';

const { Search } = Input;

@connect(({ redis }) => ({
  redis,
}))
class CodeGenerate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDatabase: undefined,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'redis/read',
      payload: {
        name: 'name',
      },
      callback: response => {
        console.log('data', response);
      },
    });
  }

  databaseChange = id => {
    this.setState({
      currentDatabase: id,
    });
  };

  render() {

    const { currentDatabase } = this.state;

    const datasource = [
      {
        id: '1001',
        name: '测试数据源',
        ip: '192.168.11.59',
        database: 'datag',
      },
      {
        id: '1002',
        name: '测试数据源',
        ip: '192.168.11.59',
        database: 'datag',
      },
      {
        id: '1003',
        name: '测试数据源',
        ip: '192.168.11.59',
        database: 'datag',
      },
      {
        id: '1004',
        name: '测试数据源',
        ip: '192.168.11.59',
        database: 'datag',
      },
    ];

    const data = [
      {
        project: '大数据治理平台',
        package: 'com.bigdata',
        author: '邓卫平',
        datasource: '测试数据源(192.168.11.59/datag)',
        table: 'aaa_dwp_test1',
      },
      {
        project: '大数据治理平台',
        package: 'com.bigdata',
        author: '邓卫平',
        datasource: '测试数据源(192.168.11.59/datag)',
        table: 'aaa_dwp_test1',
      },
      {
        project: '大数据治理平台',
        package: 'com.bigdata',
        author: '邓卫平',
        datasource: '测试数据源(192.168.11.59/datag)',
        table: 'aaa_dwp_test1',
      },
      {
        project: '大数据治理平台',
        package: 'com.bigdata',
        author: '邓卫平',
        datasource: '测试数据源(192.168.11.59/datag)',
        table: 'aaa_dwp_test1',
      },
    ];

    const columns = [
      {
        title: '项目名称',
        dataIndex: 'project',
        key: 'project',
      },
      {
        title: '包名',
        dataIndex: 'package',
        key: 'package',
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: '数据源',
        dataIndex: 'datasource',
        key: 'datasource',
      },
      {
        title: '实体表',
        dataIndex: 'table',
        key: 'table',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => <a>查看</a>,
      },
    ];

    return <div style={{ width: '100%', padding: 20, display: 'flex' }}>
      <div className={styles['left']}>

        <div className={styles['left-one']}>
          <span>数据源</span>
          <Button>新建</Button>
        </div>

        <div className={styles['left-two']}>
          <Search
            placeholder='请输入搜索内容'
            allowClear
            enterButton='搜索'
          />
        </div>

        <div className={styles['left-three']}>
          <List
            style={{ marginTop: '20px' }}
            grid={{ gutter: 16, column: 1 }}
            dataSource={datasource}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                style={{
                  background: currentDatabase === item.id ? '#e8f0fe' : '',
                  padding: '5px',
                  margin: '2px',
                }}
              >
                <img src={'/images/database.svg'} width={20} height={25} />
                <a style={{ color: '#000', marginLeft: '10px' }} onClick={() => this.databaseChange(item.id)}>
                  {item.name}（{item.ip}/{item.database}）
                </a>
              </List.Item>
            )}
          />
        </div>
      </div>

      <Divider type={'vertical'} className={styles['divider']} />

      <div className={styles['right']}>
        <Button type={'primary'}>快速生成</Button>

        <Table
          style={{ marginTop: '20px' }}
          dataSource={data}
          columns={columns}
        />
      </div>
    </div>;
  }
}

export default CodeGenerate;
