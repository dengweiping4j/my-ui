import React, { Component } from 'react';
import { Button, Divider, Input, Tabs } from 'antd';

const { TabPane } = Tabs;

class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: '1',
      formData: {},
    };
  }

  onChange = key => {
    console.log(key);
    this.setState({
      currentTab: key,
    });
  };

  onFormChange = (key, value) => {
    const { formData } = this.state;
    formData[key] = value;

    this.setState({
      formData,
    });
  };

  cancel = () => {
    this.props.onCancel();
  };

  login = () => {
    const { formData } = this.state;
    console.log('formData', formData);

    if (this.props.login) {
      this.props.login(formData);
    }
  };

  render() {
    const { currentTab, formData } = this.state;
    const { userName, password } = formData;

    return <div className={this.props.className}>
      <Tabs activeKey={currentTab} onChange={this.onChange}>
        <TabPane tab='登录' key='1'>
          <Input
            style={{ marginTop: '40px' }}
            placeholder={'用户名'}
            value={userName}
            onChange={(e) => this.onFormChange('userName', e.target.value)}
            bordered={false}
          />
          <Divider style={{ margin: '10px 0px' }} />

          <Input.Password
            value={password}
            onChange={(e) => this.onFormChange('password', e.target.value)}
            placeholder='密码'
            maxLength={100}
            bordered={false}
          />
          <Divider style={{ margin: '10px 0px' }} />

          <Button
            type={'primary'}
            style={{ marginTop: '40px' }}
            onClick={this.login}
            block
          >
            登录
          </Button>

          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#525253' }}>登录即代表同意《隐私保护协议》</div>
            <div style={{ marginTop: '120px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ color: '#525253', margin: '15px 0px' }}><h3>与我联系</h3></div>
              <div>
                <a href={'https://blog.csdn.net/qq_27574367'}>
                  <img src={'/images/csdn.png'} width={100} height={54} />
                </a>
                <a href={'https://github.com/dengweiping4j'} style={{ marginLeft: '20px' }}>
                  <img src={'/images/github.jpeg'} width={100} height={40} />
                </a>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab='注册' key='2'>

        </TabPane>
      </Tabs>
    </div>;
  }
}

export default LoginModal;