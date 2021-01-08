import React, { Component } from 'react';
import { connect } from 'dva';
import LoginModal from '@/pages/components/LoginModal';

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
      },
    });
  };

  render() {

    return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <LoginModal login={this.login} style={{ width: '300px', margin: '40px' }} />
    </div>;
  }
}

export default LoginPage;
