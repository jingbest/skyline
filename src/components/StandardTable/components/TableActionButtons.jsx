import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableAction from '@/components/Actions/TableAction';
import updateKey from '@/utils/updateKey';
import styles from '../index.less';
import TableBatchButtons from './TableBatchButtons';
import TablePrimaryButtons from './TablePrimaryButtons';


// 表格上面的按钮
export default class TableActionButtons extends PureComponent {
  static propTypes() {
    return {
      visibleButtonNumber: PropTypes.number,
      primaryActionConfs: PropTypes.array,
      batchActionConfs: PropTypes.array,
      selectedItems: PropTypes.array,
    }
  }

  static defaultProps = {
    visibleButtonNumber: 3,
    primaryActionConfs: [],
    batchActionConfs: [],
    selectedItems: [],
  }

  render() {
    const { primaryActionConfs, batchActionConfs, selectedItems, actionCallback } = this.props;
    return (
      <div>
        <TablePrimaryButtons
          primaryActionConfs={primaryActionConfs}
          actionCallback={actionCallback}
        />
        <TableBatchButtons
          batchActionConfs={batchActionConfs}
          selectedItems={selectedItems}
          actionCallback={actionCallback}
        />
      </div>
    )
  }
}
