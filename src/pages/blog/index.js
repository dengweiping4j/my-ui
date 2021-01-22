import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import { Button, Divider, List, Select, Tag } from 'antd';
import styles from './index.less';
import debounce from 'lodash/debounce';
import AuthorInfo from '@/pages/blog/components/AuthorInfo';

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
      searchResult: [],
    };
    this.lastFetchId = 0;
    this.handleSearch = debounce(this.handleSearch, 500);
  }

  componentDidMount() {
    this.onSearch('content', '');
  }

  toNewPage = () => {
    router.push('./blog/new');
  };

  toBlogDetail = id => {
    router.push('./blog/' + id);
  };

  onSearch = (key, value) => {
    this.props.dispatch({
      type: 'blog/query',
      payload: {
        page: 1,
        pageSize: 20,
        queryData: {
          [key]: value,
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
            searchResult: response.data,
            fetching: false,
            searchValue: value,
          });
        }
      },
    });

  };

  handleChange = value => {
    router.push('./blog/' + value);
  };

  render() {
    const {
      page,
      pageSize,
      total,
      data,
      searchValue,
      searchResult = [],
    } = this.state;

    const options = [];
    searchResult.forEach(item => {
      options.push(<Option value={item.id}>{item.title}</Option>);
    });

    return <div className={styles['main']}>
      <div className={styles['left']}>
        <AuthorInfo />
      </div>

      <div className={styles['right']}>
        <div className={styles['header']}>
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
            size='large'
          >
            {options}
          </Select>

          <Button
            onClick={this.toNewPage}
            type={'danger'}
            style={{ marginRight: '40px' }}
            size='large'
          >
            <img src={'/images/write.svg'} width={25} style={{ marginRight: '5px' }} />开始创作
          </Button>
        </div>



        <Divider style={{ margin: 0 }} />

        <List
          className={styles['content']}
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item className={styles['list']}>
              <div>
                <Tag color='red'>原创</Tag>
                <a className={styles['title']} onClick={() => this.toBlogDetail(item.id)}>
                  {item.title}
                </a>
                <div className={styles['description']}>{item.description}</div>
                <div className={styles['footer']}>{item.createDate}</div>
              </div>
            </List.Item>
          )}
        />

        {total / pageSize > 0 ?
          <div style={{ width: '100%', textAlign: 'center', margin: '20px 40px' }}>
            <a>下一页</a>
          </div>
          : null}
      </div>

    </div>;
  }
}

export default BlogIndex;
