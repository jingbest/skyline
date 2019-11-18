import React from 'react'
import { Button, Row, Col, Dropdown, Menu, Icon } from 'antd'
import PropTypes from 'prop-types'
import types from '../utils/commonTypes'

SearchForm.propTypes = {
  primaryActions: types.tableActions,
  batchActions: types.tableActions,
  selectedRowLength: PropTypes.number,
}

SearchForm.defaultProps = {
  primaryActions: [],
  batchActions: [],
  selectedRowLength: 0,
}

function actionToButton(action, selectedRowLength) {
  return <Button
    key={action.id}
    type={action.type || 'default'}
    icon={action.icon || ''}
    onClick={action.onClick}
    disabled={selectedRowLength === 0}
  >
    {action.name}</Button>;
}

function DropdownActionButton({ actions, selectedRowLength }) {
  if (actions.length < 1) {
    return null;
  }
  const menuItems = actions.map(it => (
    <Menu.Item key={it.id} disabled={selectedRowLength === 0}>{it.name}</Menu.Item>
  ));
  const menu = (
    <Menu onClick={item => {
      const action = actions.find(it => (it.id === item.key));
      action.onClick();
    }}>
      {menuItems}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} >
      <Button type="primary">
        更多操作 <Icon type="down" />
      </Button>
    </Dropdown>
  )
}

export default function SearchForm(props) {
  const showFreshButton = props.primaryActions.length > 0 || props.batchActions.length > 0;
  const primaryButtons = props.primaryActions.map(it => (
    <Col key={it.id}>
      {actionToButton(it)}
    </Col>
  ));
  const batchButtons = [];
  if (props.batchActions.length > 0) {
    batchButtons.push(<Col key="batch1">{actionToButton(props.batchActions[0], props.selectedRowLength)}</Col>);
  }
  if (props.batchActions.length > 1) {
    batchButtons.push(<Col key="batch2">{actionToButton(props.batchActions[1], props.selectedRowLength)}</Col>);
  }
  if (props.batchActions.length === 3) {
    batchButtons.push(<Col key="batch3">{actionToButton(props.batchActions[2], props.selectedRowLength)}</Col>);
  }
  if (props.batchActions.length > 3) {
    const restActions = props.batchActions.slice(2);
    const dropdown = <DropdownActionButton actions={restActions}
      selectedRowLength={props.selectedRowLength}></DropdownActionButton>;
    batchButtons.push(<Col key="batch3">{dropdown}</Col>);
  }
  return (
    <Row type="flex" gutter={10} style={{ marginBottom: '16px' }}>
      {showFreshButton && <Col key="fresh"><Button icon="sync" type="primary"
        onClick={() => props.freshData && props.freshData()}>
      </Button></Col>}
      {primaryButtons}
      {batchButtons}
    </Row>
  )
}
