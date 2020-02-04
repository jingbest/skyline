import { Icon, Menu, Spin, Button, Divider } from 'antd';
import { FormattedMessage, formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class ProjectDropdown extends React.PureComponent {
  onMenuClick = event => {
    const { key } = event;
    console.log(key);

    // if (key === 'logout') {
    //   this.handleLogout();

    //   return;
    // }

    // router.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        project_name: '',
        project_id: '',
        projects: [],
      },
    } = this.props;
    const items = currentUser.projects.map(it => (
      <Menu.Item key={it.id}>
        {it.name}
      </Menu.Item>
    ));
    // const { selectedLang } = this.state.selectedLang;
    const menuHeaderDropdown = (
      <Menu className={styles['project-menu']}
        selectedKeys={[currentUser.project_id]}
        onClick={this.onMenuClick}>
        <Menu.Item key="user" className={styles.title}>
          <span style={{ fontWeight: 'bold', marginRight: 8 }}>项目</span>
        </Menu.Item>
        <Menu.Divider />
        {items}
      </Menu>
    );
    // return currentUser && currentUser.name ? menuHeaderDropdown : null;
    return currentUser && currentUser.project_name ? (
      <HeaderDropdown overlay={menuHeaderDropdown} trigger={['click']}>
        <div className={styles.project}>
          <Icon type="appstore" style={{ marginRight: 10 }} />
          <span style={{ display: 'inline-block', width: '115px' }}>{currentUser.project_name}</span>
          <Icon type="caret-down" />
          <Divider type="vertical" />
        </div>
      </HeaderDropdown>
    ) : (
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(ProjectDropdown);
