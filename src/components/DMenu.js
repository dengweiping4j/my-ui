import React, { Component } from 'react';
import { Divider, Dropdown, Menu } from 'antd';
import styles from './DMenu.less';

class DMenu extends Component {
  render() {
    const { data = {} } = this.props;
    let overlay;
    if (data.children) {
      const menuItem = [];
      data.children.forEach((item, index) => {
        menuItem.push(<Menu.Item style={{ padding: 0 }}>
          <a target="_blank" rel="noopener noreferrer" href={item.path} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', padding: '0px 10px' }}>
              <img src={item.img} style={{ width: 45, height: 40, margin: '5px 10px' }} />
              <div>
                <h3 className={styles['label']}>{item.label}</h3>
                <span className={styles['description']}>{item.description}</span>
              </div>
            </div>
          </a>
          {index < data.children.length - 1 ? <Divider style={{ margin: '0px' }} /> : null}
        </Menu.Item>);
      });

      overlay = (
        <Menu>
          {menuItem}
        </Menu>
      );
    }

    return (
      <div style={{ marginLeft: '40px', ...this.props.style }}>
        <Dropdown overlay={overlay} placement="bottomCenter" arrow>
          <a onClick={e => e.preventDefault()} style={{ ...this.props.overlayStyle }}>
            {data.label}
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default DMenu;