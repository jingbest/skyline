import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableAction from '@/components/Actions/TableAction';
import updateKey from '@/utils/updateKey';
import styles from '../index.less';

async function checkAllowed(actionConfig) {
  const { allowed } = actionConfig;
  let result = false;
  if (allowed) {
    result = allowed();
    if (result instanceof Promise) {
      result = await result;
    }
  }
  return result;
}

async function getAllowedResults(actionConfigs) {
  const allowedPromises = actionConfigs.map(async it => {
    const result = checkAllowed(it);
    return result;
  });
  const results = await Promise.all(allowedPromises);
  return results;
}

// 表格上面的按钮
export default class TablePrimaryButtons extends PureComponent {
  static propTypes() {
    return {
      visibleButtonNumber: PropTypes.number,
      primaryActionConfs: PropTypes.array,
    }
  }

  static defaultProps = {
    visibleButtonNumber: 3,
    primaryActionConfs: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      primaryAllowedResults: [],
    };
  }

  async componentDidMount() {
    const { primaryActionConfs } = this.props;
    const results = await getAllowedResults(primaryActionConfs);
    this.setState({
      primaryAllowedResults: results,
    });
  }

  render() {
    const { primaryAllowedResults } = this.state;
    const { primaryActionConfs, actionCallback } = this.props;
    const primaryActionButtons = primaryActionConfs.map((it, index) => {
      const key = `primary-${updateKey()}`;
      return (
        <TableAction {...it}
          key={key}
          isAllowed={primaryAllowedResults[index]}
          buttonClassName={styles['table-action']}
          actionCallback={actionCallback}
        />
      )
    });
    return (
      <div className={styles['table-primary-buttons-wrapper']}>
        {primaryActionButtons}
      </div>
    )
  }
}
