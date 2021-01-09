import React, { Component } from 'react';
import { connect } from 'dva';
import LoginModal from '@/pages/components/LoginModal';
import { message } from 'antd';
import styles from './login.less';
import { router } from 'umi';

@connect(({ user }) => ({
  user,
}))
class LoginPage extends Component {

  login = data => {
    this.props.dispatch({
      type: 'user/login',
      payload: {
        data,
      },
      callback: response => {
        console.log('response', response);
        if (response.code === 'SUCCEED') {
          message.success('登录成功');
          router.push('/');
        } else {
          message.error(response.message);
        }
      },
    });
  };

  render() {

    return <div className={styles['main']}>
      <img src={'/images/bg.png'} className={styles['img']} />
      <LoginModal
        login={this.login}
        className={styles['login']}
      />
    </div>;
  }
}

export default LoginPage;
