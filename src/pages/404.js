import React from 'react';
import styles from './index.less'

export default () => (
  <div className={styles['notfound']} style={{ }}>
    <div style={{ textAlign: 'center' }}>
      <div><span style={{ fontSize: '60px', color: '#fff', fontFamily: '微软雅黑' }}>404 页面走丢了</span></div>
      <img src={'/images/404.svg'} width={'50%'} style={{ margin: '40px' }} />
      <div><a style={{ fontSize: '20px' }} href={'/'}>返回首页</a></div>
    </div>
  </div>
);

