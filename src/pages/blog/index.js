import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import { Button, Input, List, Select } from 'antd';
import styles from './index.less';
import debounce from 'lodash/debounce';

const { Search } = Input;
const { Option } = Select;

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
      searchValue: undefined,
      fetching: false,
    };
    this.lastFetchId = 0;
    this.handleSearch = debounce(this.handleSearch, 500);
  }

  componentDidMount() {
    this.onSearch(' ');
  }

  toNewPage = () => {
    router.push('./blog/new');
  };

  toBlogDetail = id => {
    router.push('./blog/' + id);
  };

  onSearch = value => {
    this.props.dispatch({
      type: 'blog/query',
      payload: {
        page: 1,
        pageSize: 20,
        queryData: {
          content: value,
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
  };

  handleSearch = value => {
    //防抖
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ etlJobList: [], fetching: true });
    if (fetchId !== this.lastFetchId) {
      return;
    }

    this.props.dispatch({
      type: 'dataEtl/findEtlByJobName',
      payload: {
        jobName: value,
      },
      callback: (response) => {
        if (response) {
          this.setState({
            etlJobList: response,
            fetching: false,
            searchValue: value,
          });
        }
      },
    });
  };

  handleChange = value => {
    console.log('value', value);

    this.setState({
      searchValue: value,
    });
  };

  render() {
    const {
      page,
      pageSize,
      total,
      data,
      searchValue,
    } = this.state;

    const options = [
      <Option value={'测试'}>测试</Option>,
    ];

    return <div style={{ margin: '40px' }}>
      <div className={styles['header']}>
        <div style={{ width: '60%' }}>
          <Select
            className={styles['search']}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            showSearch
            value={searchValue}
            placeholder={'输入查询内容'}
            style={this.props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            notFoundContent={null}
            size="large"
          >
            {options}
          </Select>
          <Button size={'large'} type={'primary'} className={styles['search-button']}>查询</Button>
        </div>


        <Button
          onClick={this.toNewPage}
          type={'danger'}
          style={{ marginRight: '20px' }}
          size="large"
        >
          <img src={'/images/write.svg'} width={25} style={{ marginRight: '5px' }} />开始创作
        </Button>
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
