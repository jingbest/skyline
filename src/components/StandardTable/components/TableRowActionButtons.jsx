import React, { PureComponent } from 'react';
import { Menu, Dropdown, Button, Icon, Divider } from 'antd';
import TableAction from '@/components/Actions/TableAction';
import styles from '../index.less';

const { SubMenu } = Menu;

async function checkAllowed(item, action) {
  const { allowed } = action;
  let result = false;
  if (allowed) {
    result = allowed(item);
    if (result instanceof Promise) {
      result = await result;
    }
  }
  return result;
}

// 第一个action一定保留， aciton | 更多
function DropdownActionButton({ firstAction = null, moreActions = [],
  alloweds = [], item, actionCallback, handleActionLoading }) {
  if (alloweds.length === 0) {
    return null;
  }
  if (!firstAction && moreActions.length === 0) {
    return null;
  }
  let firstElement = null;
  let dividerElement = null;
  let moreElement = null;
  if (firstAction) {
    const isAllowed = alloweds[0];
    firstElement = (
      <TableAction {...firstAction.action}
        buttonType="link"
        needHide={false}
        isAllowed={isAllowed}
        item={item}
        actionCallback={actionCallback}
        buttonClassName={styles['first-action']}
        handleActionLoading={handleActionLoading}/>
    )
  }
  if (firstAction && moreActions.length > 0) {
    dividerElement = <Divider type="vertical" />;
  }

  if (moreActions.length > 0) {
    const menuContent = moreActions.map((it, index) => {
      if (!it.actions) {
        const isAllowed = alloweds[it.allowedIndex];
        const key = it.key || `key-more-${index}`;
        return (
          <Menu.Item key={key}>
            <TableAction {...it.action} isAllowed={isAllowed}
              buttonType="link"
              item={item}
              actionCallback={actionCallback}
              handleActionLoading={handleActionLoading}/>
          </Menu.Item>
        )
      }
      let allowedCount = 0;
      const menuItems = it.actions.map((action, actionIndex) => {
        const isAllowed = alloweds[action.allowedIndex];
        const key = action.key || `key-more-${index}-${actionIndex}`;
        if (isAllowed) {
          allowedCount += 1;
        }
        return (
          <Menu.Item key={key}>
            <TableAction {...action.action}
              isAllowed={isAllowed}
              buttonType="link"
              item={item}
              actionCallback={actionCallback}
              handleActionLoading={handleActionLoading}/>
          </Menu.Item>
        )
      });
      const menuKey = `sub-menu-${index}`;
      return (
        <SubMenu title={it.title} disabled={allowedCount === 0} key={menuKey}>
          {menuItems}
        </SubMenu>
      )
    });

    const menu = (
      <Menu>
        {menuContent}
      </Menu>
    )

    moreElement = (
      <Dropdown overlay={menu}>
        <Button type="link" className={styles['more-action']}>
          更多 <Icon type="down" />
        </Button>
      </Dropdown>);
  }

  return (
    <>
      {firstElement}
      {dividerElement}
      {moreElement}
    </>
  )
}


function getActionList(actions) {
  const { firstAction = null, moreActions = [] } = actions;
  const actionList = [];
  const newFirst = firstAction ?
    {
      action: firstAction,
      allowedIndex: 0,
    } : null;
  const newMoreActions = [];
  if (firstAction) {
    actionList.push(newFirst);
  }

  moreActions.forEach(it => {
    if (it.actions) {
      const newActions = [];
      it.actions.forEach(action => {
        const newAction = {
          action,
          allowedIndex: actionList.length,
        }
        newActions.push(newAction);
        actionList.push(newAction);
      });
      newMoreActions.push({
        ...it,
        actions: newActions,
      })
    } else if (it.action) {
      const newAction = {
        action: it.action,
        allowedIndex: actionList.length,
      };
      newMoreActions.push(newAction);
      actionList.push(newAction);
    }
  })

  return {
    actionList,
    firstAction: newFirst,
    moreActions: newMoreActions,
  };
}

async function getAllowedResults(actions, item) {
  const allowedPromises = actions.map(async it => {
    const result = checkAllowed(item, it.action);
    return result;
  });
  const results = await Promise.all(allowedPromises);
  return results;
}

export default class TableRowActionButtons extends PureComponent {
  constructor(props) {
    super(props);
    const { actionConfigs, item } = this.props;
    const {
      actionList,
      firstAction,
      moreActions } = getActionList(actionConfigs, item);
    this.actionList = actionList;
    this.firstAction = firstAction;
    this.moreActions = moreActions;
    this.state = {
      results: [],
    };
  }

  async componentDidMount() {
    const { item } = this.props;
    const results = await getAllowedResults(this.actionList, item);
    this.setState({
      results,
    });
  }

  render() {
    const { item, actionCallback, handleActionLoading } = this.props;
    return <DropdownActionButton
      handleActionLoading={handleActionLoading}
      actionCallback={actionCallback}
      firstAction={this.firstAction}
      moreActions={this.moreActions}
      alloweds={this.state.results}
      item={item}
    />;
  }
}
