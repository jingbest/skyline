import { Avatar, Icon, Menu, Spin, Button } from 'antd';
import { FormattedMessage, formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.PureComponent {

  changeLang = language => setLocale(language, true);

  onMenuClick = event => {
    const { key } = event;
    console.log(key);

    // if (key === 'logout') {
    //   this.handleLogout();

    //   return;
    // }

    // router.push(`/account/${key}`);
  };

  handleLogout = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  render() {
    const {
      currentUser = {
        username: '',
      },
      menu,
    } = this.props;
    const selectedLang = getLocale();
    // const { selectedLang } = this.state.selectedLang;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="user" className={`${styles['no-hover']} ${styles['name-item']}`}>
            <span style={{ lineHeight: '40px' }}>
              <span style={{ fontWeight: 'bold', marginRight: 8 }}>用户</span>
              <span>{currentUser.username}</span>
            </span>
            <Button type="link" onClick={this.handleLogout} style={{ float: 'right', lineHeight: '40px' }}>退出登录</Button>
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}
        {menu && (
          <Menu.Item key="language" className={`${styles['no-hover']} ${styles['language-item']}`}>
            <span>切换语言</span>
            <span style={{ float: 'right' }}>
              <Button type="link" disabled={selectedLang === 'zh-CN'}
                onClick={() => {
                  this.changeLang('zh-CN');
                }}>CN</Button>
              <span>/</span>
              <Button type="link" disabled={selectedLang === 'en-US'}
                onClick={() => {
                  this.changeLang('en-US');
                }}>EN</Button>
            </span>
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="center">
            <FormattedMessage id="menu.account.center" defaultMessage="account center" />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="billing">
            消费管理
            {/* <FormattedMessage id="menu.account.center" defaultMessage="account center" /> */}
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            下载RC文件
            {/* <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" /> */}
          </Menu.Item>
        )}
      </Menu>
    );
    // return currentUser && currentUser.name ? menuHeaderDropdown : null;
    return currentUser && currentUser.username ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <div className={`${styles.action} ${styles.account}`}>
          <Button shape="circle" icon="user" />
          {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
          {/* <span className={styles.name}>{currentUser.name}</span> */}
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
}))(AvatarDropdown);
