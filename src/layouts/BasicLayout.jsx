/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter, SettingDrawer, GetPageTitleProps } from '@ant-design/pro-layout';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Icon, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import HeaderContent from '@/components/GlobalHeader/HeaderContent';
// import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';
/**
 * use Authorized check all menu item
 */

const menuDataRender = menuList =>
  menuList.map(item => {
    // console.log(item);
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright="2019 蚂蚁金服体验技术部出品"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const footerRender = () => {
  return defaultFooterDom;
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = props => {
  const { dispatch, children, settings, collapsed } = props;
  // const [currentCollapsed, setCurrentCollapsed] = useState(collapsed);
  /**
   * constructor
   */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const handleMenuCollapse3 = () => {
    if (dispatch) {
      dispatch({
        type: 'global/toggleLayoutCollapsed',
      });
    }
  };

  return (
    <>
      <ProLayout
        className={styles.wrapperrrr}
        siderWidth={236}
        logo={logo}
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          // console.log('menuItemProps', menuItemProps);
          if (menuItemProps.isHidden) {
            return null;
          }
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        subMenuItemRender={(_, defaultDom) => (
          <a className="qixian-subMenuItem">{defaultDom}</a>
        )}
        breadcrumbRender={(routers = []) => {
          return [
            // {
            //   path: '/',
            //   breadcrumbName: formatMessage({
            //     id: 'menu.home',
            //     defaultMessage: 'Home',
            //   }),
            // },
            ...routers,
          ]
        }}
        itemRender={(route, params, routes, paths) => {
          // console.log('itemRender', route, params, routes, paths)
          return <span>{route.breadcrumbName}</span>;
          // const first = routes.indexOf(route) === 0;
          // return first ? (
          //   <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          // ) : (
          //   <span>{route.breadcrumbName}</span>
          // );
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        headerRender={headerProps => <HeaderContent {...headerProps} />}
        menuHeaderRender={(logo, title) => (
          <div id="customize_menu_header">
            <Link to="/">{logo}</Link>
            {!collapsed && title }
            <div onClick={handleMenuCollapse3} className={collapsed ? `${styles['folder-button']} ${styles.active}` : styles['folder-button']}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
            </div>
            {/* <div id="customize_menu_header_text">customize_menu_header</div> */}
          </div>
        )}
        // menuHeaderRender={(logo, title) => {
        //   return <h1>{title}</h1>
        // }}
        // rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
      {/* <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      /> */}
    </>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
