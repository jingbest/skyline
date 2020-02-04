import React from 'react';
import { Dropdown, Menu, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import TableAction from '@/components/Actions/TableAction';
import updateKey from '@/utils/updateKey';
import styles from '../index.less';

const updateConf = (conf, selectedItems) => (
  {
    ...conf,
    isAllowed: selectedItems.length > 0,
    items: selectedItems,
    isBatch: true,
    needHide: false,
  }
)

TableBatchButtons.defaultProps = {
  visibleButtonNumber: 1,
}

TableBatchButtons.prototypes = {
  visibleButtonNumber: PropTypes.number,
}

function DropdownActionButton({ actionConfs, selectedItems, actionCallback }) {
  if (actionConfs.length < 1) {
    return null;
  }
  const menuItems = actionConfs.map(it => {
    const conf = {
      ...it,
      isAllowed: selectedItems.length > 0,
      needHide: false,
      actionCallback,
    };
    const key = `table-batch-more-${updateKey()}`;
    const newConf = updateConf(conf, selectedItems);
    newConf.actionCallback = actionCallback;
    return (
      <Menu.Item key={key}>
        <TableAction {...newConf} buttonType="link" />
      </Menu.Item>
    );
  });
  const menu = (
    <Menu>
      {menuItems}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} className={styles['table-action']}>
      <Button type="primary">
        更多操作 <Icon type="down" />
      </Button>
    </Dropdown>
  );
}

export default function TableBatchButtons(props) {
  const { selectedItems, visibleButtonNumber, batchActionConfs, actionCallback } = props;
  let moreButton = null;
  let batchButtons = null;
  let showedConfs = [];
  let restConfs = [];
  if (visibleButtonNumber < batchActionConfs.length) {
    if (visibleButtonNumber < 0) {
      restConfs = batchActionConfs;
    } else {
      showedConfs = batchActionConfs.slice(0, visibleButtonNumber);
      restConfs = batchActionConfs.slice(visibleButtonNumber);
    }
  } else {
    showedConfs = batchActionConfs;
  }
  batchButtons = showedConfs.map(it => (
    <TableAction
      {...(updateConf(it, selectedItems))}
      key={`table-btach-action-${updateKey()}`}
      buttonClassName={styles['table-action']}
      actionCallback={actionCallback}
    />
  ));
  moreButton = (
    <DropdownActionButton
      actionConfs={restConfs}
      selectedItems={selectedItems}
      actionCallback={actionCallback}
    />
  );
  return (
    <>
      {batchButtons}
      {moreButton}
    </>
  )
}
