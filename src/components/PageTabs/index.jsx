import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;

const tabItem = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
});

PageTabs.propTypes = {
  tabItems: PropTypes.arrayOf(tabItem),
  onTabChange: PropTypes.func,
}

PageTabs.defaultProps = {
  tabItems: [],
  onTabChange: null,
}

export default function PageTabs(props) {
  const { tabItems, onTabChange, isPage = true } = props;

  const callback = key => {
    if (onTabChange) {
      onTabChange(key);
    }
  }

  if (tabItems.length === 0) {
    return null;
  }

  const items = tabItems.map(it => {
    // const style = isPage ? {} : { padding: '0 15px' };
    const style = { paddingRight: '15px' };
    if (!isPage) {
      style.paddingLeft = '15px';
    }
    return <TabPane tab={it.title} key={it.id} style={style}>{it.children}</TabPane>
  });

  const defaultKey = items.length > 0 ? items[0].id : null;

  return (
    <Tabs defaultActiveKey={defaultKey} onChange={callback}>
      {items}
    </Tabs>
  );
}
