import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { gettext } from 'ttag';
import PropTypes from 'prop-types';
import TableAction from '../TableAction';
import styles from './index.less';

async function checkAllowed(item, allowed) {
  let result = false;
  if (allowed) {
    result = allowed(item);
    if (result instanceof Promise) {
      result = await result;
    }
  }
  return result;
}

export default class index extends PureComponent {
  static defaultProps = {
    name: '',
    label: gettext('name'),
    placeholder: gettext('Please input'),
    columnId: 'name',
    item: null,
    rules: [
      {
        required: true,
        message: gettext('Please input at least 1 words'),
        min: 1,
      },
    ],
    onSubmit: null,
    allowed: null,
    submitSuccessMsg: '',
    submitErrorMsg: '',
    alertMsg: '',
  };

  static propTypes() {
    return {
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      columnId: PropTypes.string,
      allowed: PropTypes.func,
      onSubmit: PropTypes.func,
      submitSuccessMsg: PropTypes.string,
      submitErrorMsg: PropTypes.string,
      alertMsg: PropTypes.string,
      rules: PropTypes.array,
      item: PropTypes.object,
    }
  }

  state = {
    isEditing: false,
    isAllowed: false,
  };

  async componentDidMount() {
    const { item, allowed } = this.props;
    if (item && allowed) {
      const result = await checkAllowed(item, allowed);
      this.setState({
        isAllowed: result,
      })
    }
  }

  updateIsEditing = flag => {
    this.setState({
      isEditing: flag,
    });
  };

  preHandle = () => {
    this.updateIsEditing(true);
  };

  callback = () => {
    this.updateIsEditing(false);
  }

  handleSubmit = (values, item) => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(values, item);
    }
    return true;
  }

  render() {
    const { label, placeholder, id, initialValue, rules, item, title } = this.props;
    const { isAllowed } = this.state;
    const inputInitialValue = initialValue || (item && item[id]);

    if (!isAllowed) {
      return <span>{inputInitialValue}</span>
    }

    const { isEditing } = this.state;
    const formItems = [
      {
        type: 'input',
        label,
        placeholder,
        id,
        rules,
        initialValue: inputInitialValue,
      },
    ];

    const config = {
      title,
      formItems,
      onSubmit: this.handleSubmit,
      isAllowed,
      id,
      name: <Icon type="edit" theme="filled" />,
      preHandle: this.preHandle,
      callback: this.callback,
    };

    return (
      <div className={isEditing ? `${styles.edit} ${styles.active}` : styles.edit}>
        <span>{inputInitialValue}</span>
        <TableAction {...config} key={config.id}>
        </TableAction>
      </div>
    )
  }
}
