import React from 'react';
import DMenu from '@/components/DMenu';
import styles from './index.less';
import { Button } from 'antd';


function BasicLayout(props) {

  const data = {
    label: '实用工具',
    children: [
      {
        label: '代码生成器',
        description: '一款好用智能的代码生成工具',
        img: '/images/1.png',
        path: '/tools/code-generate',
      },
      {
        label: 'JSON格式化',
        description: '一键格式化JSON数据',
        img: '/images/2.png',
        path: '',
      },
      {
        label: '加密工具',
        description: 'MD5加密、对称加密等',
        img: '/images/3.png',
        path: '',
      },
    ],
  };

  const path = props.location.pathname;

  return (
    <div>
      <div className={styles['header']} style={{ height: path === '/' ? '600px' : '90px' }}>
        <div className={styles['menu-bar']}>
          <div style={{ display: 'flex' }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#fff',
              textAlign: 'center',
              paddingTop: '6px',
            }}>
              <img src={'/images/logo.png'} style={{ width: 30, height: 25 }} />
            </div>
            <span style={{
              fontFamily: '楷体',
              fontStyle: 'italic',
              fontSize: '24px',
              color: '#fff',
              marginBottom: '10px',
            }}>让天下没有难写的代码</span>
          </div>

          <div style={{ display: 'flex', marginTop: 5 }}>
            <a style={{ color: '#fff' }} href={'/'}>首页</a>
            <DMenu data={data} overlayStyle={{ color: '#fff' }} />
            <DMenu data={data} overlayStyle={{ color: '#fff' }} />
          </div>

        </div>

        {path === '/' ? <div className={styles['header-content']}>
          <div className={styles['header-content-title']}>
            Programmer Tools
          </div>
          <div className={styles['header-content-description']}>
            简单实用的编码利器，减少令人乏味的重复劳动
          </div>
          <Button style={{ borderRadius: 50 }} size='large' type={'primary'}>开始使用</Button>
          <Button style={{ borderRadius: 50, marginLeft: '20px' }} size='large'>使用文档</Button>
        </div> : null}
      </div>

      {props.children}

      <div className={styles['footer']}>
        <span style={{ color: '#fff' }}>Copyright © 2020 万乔软件技术有限公司</span>
        <a style={{ marginLeft: '20px', color: '#3765a1' }}>weipingdeng@qq.com</a>
      </div>
    </div>
  );
}

export default BasicLayout;
