import { Divider, List, message, Modal, Radio, Tabs, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import DatabaseModal from '@/pages/tools/components/DatabaseModal';
import DMessage from '@/components/Alert/DMessage';

const { TabPane } = Tabs;

const dbImg = {
  add: '/images/db/add.svg',
  file: '/images/db/file.svg',
  MySQL: '/images/db/mysql.svg',
  Oracle: '/images/db/oracle.svg',
  SQLServer: '/images/db/sqlserver.svg',
  PostgreSQL: '/images/db/postgresql.svg',
  TBase: '/images/db/tbase.svg',
};

@connect(({ dataConnection }) => ({
  dataConnection: dataConnection,
}))
class rds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: '1',
      dbVisible: false,
      modalData: {
        isUrlLocked: true,
        type: 'MySQL',
        version: '5.1',
        name: undefined,
        description: undefined,
        database: undefined,
        schema: 'public',
        ip: undefined,
        port: '3306',
        username: undefined,
        password: undefined,
        url: undefined,
      },
      errorVisible: false,
      errorMessage: undefined,
      errorDetail: undefined,
    };
  }

  componentDidMount() {
    this.query();
  }

  query = queryBuilder => {
    this.props.dispatch({
      type: 'dataEtl/updateState',
      payload: {
        queryBuilder: {},
      },
    });

    this.props.dispatch({
      type: 'dataConnection/queryList',
      payload: {
        queryBuilder: queryBuilder ? queryBuilder : {},
      },
    });
  };

  pageChange = (page, pageSize) => {
    const { queryBuilder } = this.props.dataConnection;
    this.props.dispatch({
      type: 'dataConnection/queryList',
      payload: {
        page,
        pageSize,
        queryBuilder: queryBuilder,
      },
    });
  };

  openModal = record => {
    if (record && record.id) {
      this.openDbModal(record);
    } else {
      switch (record.type) {
        case 'add':
          this.openDbModal(record);
          break;
        case 'file':
          break;
      }
    }
  };

  openDbModal = record => {
    if (record.id) {
      const modalData = { ...record };
      this.setState({
        chooseVisible: false,
        dbVisible: true,
        modalData,
      });
    } else {
      const initData = {
        type: 'MySQL',
        version: '5.1',
        name: undefined,
        description: undefined,
        database: undefined,
        schema: 'public',
        ip: undefined,
        port: '3306',
        username: undefined,
        password: undefined,
        url: undefined,
      };

      this.setState({
        chooseVisible: false,
        dbVisible: true,
        urlEditable: false,
        modalData: initData,
      });
    }
  };

  onFormChange = (key, value) => {
    const { modalData } = this.state;
    modalData[key] = value;
    if (key === 'type') {
      modalData['version'] = undefined;
    }

    this.setState({
      modalData,
    });
  };

  testConnect = () => {
    if (this.validate()) {
      this.setState({
        testLoading: true,
      });
      const { modalData } = this.state;
      this.props.dispatch({
        type: 'dataConnection/testConnect',
        payload: {
          data: modalData,
        },
        callback: response => {
          if (response.code === 'SUCCEED') {
            message.success('连接成功');
          } else {
            this.setState({
              errorTitle: '连接失败',
              errorMessage: response.message,
              errorDetail: response.detail,
              errorVisible: true,
              submitLoading: false,
            });
          }
          this.setState({
            testLoading: false,
          });
        },
      });
    }
  };

  onSubmit = () => {
    if (this.validate()) {
      this.setState({
        submitLoading: true,
      });

      const { modalData } = this.state;

      this.props.dispatch({
        type: modalData.id ? 'dataConnection/edit' : 'dataConnection/save',
        payload: {
          data: modalData,
        },
        callback: (response) => {
          if (response.code === 'SUCCEED') {
            message.success('操作成功');
            const { pagination, queryBuilder } = this.props.dataConnection;
            this.props.dispatch({
              type: 'dataConnection/queryList',
              payload: {
                page: pagination.page,
                pageSize: pagination.pageSize,
                queryBuilder: queryBuilder,
              },
            });
            this.setState({
              dbVisible: false,
              submitLoading: false,
            });
          } else {
            this.setState({
              errorTitle: '连接失败',
              errorMessage: response.message,
              errorDetail: response.detail,
              errorVisible: true,
              submitLoading: false,
            });
          }
        },
      });
    }
  };

  validate = () => {
    const { name, database, ip, port, username, password, version } = this.state.modalData;
    if (!name || name.trim().length === 0) {
      message.error('请输入连接名称');
      return false;
    } else if (!version || version.trim().length === 0) {
      message.error('请选择数据库版本');
      return false;
    } else if (!database || database.trim().length === 0) {
      message.error('请输入数据库名称');
      return false;
    } else if (!ip || ip.trim().length === 0) {
      message.error('请输入IP地址');
      return false;
    } else if (!port || port.trim().length === 0) {
      message.error('请输入端口号');
      return false;
    } else if (!username || username.trim().length === 0) {
      message.error('请输入用户名');
      return false;
    } else if (!password || password.trim().length === 0) {
      message.error('请输入密码');
      return false;
    }
    return true;
  };

  onUrlEditableChange = (value) => {
    this.setState({
      urlEditable: value,
    });
  };

  onCancel = () => {
    this.setState({
      sheet: undefined,
      submitLoading: false,
      testLoading: false,
      dbVisible: false,
      fileVisible: false,
      loadFileVisible: false,
      chooseVisible: false,
      sheetVisible: false,
    });
  };

  onSearch = (value, opt) => {
    let query = {};
    query[opt] = value;
    const { pagination = {} } = this.props.dataConnection;
    const { pageSize = 10 } = pagination;
    this.props.dispatch({
      type: 'dataConnection/queryList',
      payload: {
        page: 1,
        pageSize,
        queryBuilder: query,
      },
    });
  };

  onTabChange = value => {
    this.setState({
      currentTab: value,
    });
  };

  getContent = item => {
    if (item.type === 'add') {
      return <div style={{ border: '1px solid #eeeeee', padding: '10px', position: 'relative' }}>
        <a onClick={() => this.openModal(item)}>
          <img src={dbImg[item.type]} style={{ width: '65%' }} alt='' />
        </a>
        <Divider style={{ width: '90%', margin: '10px 0px' }} />
        <div
          style={{
            width: '90%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <a style={{ color: '#575757' }} onClick={this.openModal}>新建连接</a>
        </div>
      </div>;
    } else if (item.type === 'file') {
      return <div style={{ border: '1px solid #eeeeee', padding: '10px', position: 'relative' }}>
        <a>
          <img src={dbImg[item.type]} style={{ width: '90%' }} />
        </a>
        <Divider style={{ width: '90%', margin: '10px 0px' }} />
        <div
          style={{
            width: '90%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <a style={{ color: '#575757' }}>文件</a>
        </div>
      </div>;
    } else {
      return <Tooltip
        color='#fff'
        placement='top'
        title={
          <div style={{ padding: '5px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: '#000' }}>
                  <span style={{ fontSize: 18, fontWeight: 900, wordBreak: 'break-all' }}>{item.name}</span>
                </div>
                <div style={{ color: 'rgba(0,0,0,.45)', marginTop: '5px' }}>
                  <span style={{ fontSize: 14, wordBreak: 'break-all' }}>{item.description}</span>
                </div>
                <div style={{ color: '#000', marginTop: '10px' }}>
                  <span style={{ fontSize: 14, wordBreak: 'break-all' }}>{item.ip}:{item.port}/{item.database}</span>
                </div>
              </div>
            </div>

          </div>
        }
      >
        <div style={{ border: '1px solid #eeeeee', padding: '10px', position: 'relative' }}>
          <a onClick={() => this.openModal(item)}>
            <img src={dbImg[item.type]} style={{ width: '90%' }} />
          </a>
          <Divider style={{ width: '90%', margin: '10px 0px' }} />
          <div
            style={{
              width: '90%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <a
              title={item.name}
              style={{ color: '#575757' }}
              onClick={() => this.openModal(item)}
            >
              {item.name}
            </a>
          </div>
        </div>
      </Tooltip>;
    }
  };

  radioChange = e => {
    this.setState({
      sheet: e.target.value,
    });
  };

  errorClose = () => {
    this.setState({
      errorVisible: false,
      errorTitle: undefined,
      status: 'error',
      errorMessage: undefined,
      errorDetail: undefined,
    });
  };

  render() {

    const { labels = [], data = [] } = this.props.dataConnection;
    const {
      modalData,
      dbVisible,
      submitLoading,
      testLoading,
      currentTab,
    } = this.state;
    const dataSource = [];
    switch (currentTab) {
      case '1':
        dataSource.push({
          type: 'add',
        }, {
          type: 'file',
        });
        break;
      case '2':
        dataSource.push({
          type: 'add',
        });
        break;
      case '3':
        dataSource.push({
          type: 'file',
        });
        break;
    }

    data.forEach(item => {
      switch (currentTab) {
        case '1':
          dataSource.push(item);
          break;
        case '2':
          if (item.type !== 'file') {
            dataSource.push(item);
          }
          break;
      }
    });

    const { sheets = [] } = this.state;
    const sheetList = [];
    if (sheets.length > 0) {
      sheets.forEach((item, index) => {
        sheetList.push(
          <Radio
            key={index}
            value={item}
            style={{
              display: 'block',
              height: '30px',
              lineHeight: '30px',
            }}
          >
            {item}
          </Radio>,
        );
      });
    }

    return (
      <div style={{ width: '100%', margin: '20px', textAlign: 'center' }}>
        <div>
          <span style={{ fontSize: '18px', color: '#373d41' }}>
            配置数据源连接后可根据数据库表一键生成代码
          </span>
        </div>
        <div style={{ marginTop: '10px' }}>
        </div>
        <div style={{ textAlign: 'center', margin: '0px 80px' }}>
          <Tabs
            defaultActiveKey='1'
            activeKey={currentTab}
            onChange={this.onTabChange}
          >
            <TabPane tab='全部' key='1'>
              <List
                style={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}
                grid={{ column: 6 }}
                size='small'
                dataSource={dataSource}
                renderItem={
                  item => (
                    <List.Item style={{ margin: '10px 0px' }}>
                      {this.getContent(item)}
                    </List.Item>
                  )}
              />
            </TabPane>
            <TabPane tab='关系数据库' key='2'>
              <List
                style={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}
                grid={{ column: 6 }}
                size='small'
                dataSource={dataSource}
                renderItem={
                  item => (
                    <List.Item style={{ margin: '10px 0px' }}>
                      {this.getContent(item)}
                    </List.Item>
                  )}
              />
            </TabPane>
            <TabPane tab='自定义模板' key='3'>
              <List
                style={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}
                grid={{ column: 6 }}
                size='small'
                dataSource={dataSource}
                renderItem={
                  item => (
                    <List.Item style={{ margin: '10px 0px' }}>
                      {this.getContent(item)}
                    </List.Item>
                  )}
              />
            </TabPane>
          </Tabs>
        </div>

        <DatabaseModal
          data={modalData}
          visible={dbVisible}
          allLabels={labels}
          onFormChange={this.onFormChange}
          testConnect={this.testConnect}
          onSubmit={this.onSubmit}
          onEdit={this.onEdit}
          urlEditable={this.state.urlEditable}
          onUrlEditableChange={this.onUrlEditableChange}
          onCancel={this.onCancel}
          testLoading={testLoading}
          submitLoading={submitLoading}
        />

        <DMessage
          style={{ marginTop: 80 }}
          visible={this.state.errorVisible}
          status={'ERROR'}
          title={this.state.errorTitle}
          message={this.state.errorMessage}
          detail={this.state.errorDetail}
          onCancel={this.errorClose}
        />

      </div>
    );

  }
}

export default rds;
