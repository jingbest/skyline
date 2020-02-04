import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { gettext } from 'ttag';
import notification from '../notification';
import ActionFormItem from './ActionFormItem';
import updateKey from '@/utils/updateKey';
import SimpleModal from './SimpleModal';
import StepModal from './StepModal';

// import types from './actionTypes';

class TableAction extends PureComponent {
  static defaultProps = {
    item: undefined,
    isAllowed: false,
    confirm: false,
    formItems: [],
    steps: [],
    confirmContext: '',
    needHide: true,
    isStep: false,
    buttonType: 'link',
    items: [],
    isBatch: false,
    submitSuccessMsg: gettext('Success'),
    submitErrorMsg: gettext('Error'),
  }

  static propTypes() {
    return {
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      item: PropTypes.object,
      formItems: PropTypes.array,
      confirm: PropTypes.bool,
      type: PropTypes.string,
      icon: PropTypes.string,
      isAllowed: PropTypes.bool,
      onSubmit: PropTypes.func,
      submitSuccessMsg: PropTypes.string,
      submitErrorMsg: PropTypes.string,
      alertMsg: PropTypes.string,
      confirmMsg: PropTypes.string,
      needHide: PropTypes.bool,
      isStep: PropTypes.bool,
      buttonType: PropTypes.string,
      items: PropTypes.array,
      isBatch: PropTypes.bool,
      steps: PropTypes.array,
    }
  }

  constructor(props) {
    super(props);
    const { id, formItems, confirm, steps } = props;
    if (!id) {
      throw Error('need id');
    }
    if (formItems.length && confirm && steps) {
      throw Error('form, confirm, steps can not exist together');
    }
    if (!formItems.length && !confirm && !steps) {
      throw Error('form, confirm, steps must exist one');
    }
    if (!this.checkFormItems()) {
      throw Error('formItems must has unique id');
    }
    this.modal = null;
  }

  state = {
    visible: false,
    loading: false,
  };

  componentDidMount() {
    // console.log('table action');
    // this.checkAllowed();
  }

  onClick = () => {
    const { confirm, preHandle } = this.props;
    if (preHandle) {
      preHandle();
    }
    if (confirm) {
      this.onShowConfirm();
    } else {
      this.handleModalVisible(true);
    }
  }

  onCancel = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.handleModalVisible();
    this.onCallback();
  }

  handleModalVisible = flag => {
    this.setState({
      visible: !!flag,
    });
  }

  handleSubmitLoading = flag => {
    this.setState({
      loading: !!flag,
    })
  }

  onSubmit = values => {
    const { onSubmit, item, isBatch, items } = this.props;
    if (!onSubmit) return;
    this.handleSubmitLoading(true);
    const data = isBatch ? items : item;
    const result = onSubmit(values, data);
    if (result instanceof Promise) {
      result.then(res => {
        this.onShowSuccess();
      }, error => {
        this.onShowError(error);
      }).finally(() => {
        this.handleSubmitLoading();
      });
    } else {
      this.handleSubmitLoading();
      if (result) {
        this.onShowSuccess();
      } else {
        this.onShowError(result);
      }
    }
  }

  onOK = () => {
    const { onSubmit, form, item, isBatch, items } = this.props;
    if (!onSubmit) return;
    this.handleSubmitLoading(true);
    form.validateFields((err, values) => {
      if (err) {
        console.log('Values has error: ', err);
        return;
      }
      console.log('Received values of form: ', values);
      const data = isBatch ? items : item;
      const result = onSubmit(form.getFieldsValue(), data);
      if (result instanceof Promise) {
        result.then(res => {
          this.onShowSuccess();
        }, error => {
          this.onShowError(error);
        }).finally(() => {
          this.handleSubmitLoading();
        });
      } else {
        this.handleSubmitLoading();
        if (result) {
          this.onShowSuccess();
        } else {
          this.onShowError(result);
        }
      }
    });
  }

  onShowSuccess = () => {
    this.handleModalVisible();
    const { submitSuccessMsg } = this.props;
    notification.success(submitSuccessMsg);
    this.onCallback();
  }

  onCallback = () => {
    const { actionCallback } = this.props;
    if (actionCallback) {
      actionCallback();
    }
  }

  onShowError = error => {
    // this.handleModalVisible();
    const { formItems } = this.props;
    const title = (error && error.message) || gettext('Error');
    if (formItems && formItems.length > 0) {
      Modal.error({
        title,
      });
    } else {
      notification.error(title);
      this.onCallback();
    }
  }

  onShowConfirm = () => {
    const {
      okText = gettext('Confirm'),
      cancelText = gettext('Cancel'),
      confirmContext = '',
      title,
      isBatch,
      item,
      items,
      onSubmit,
    } = this.props;
    const data = isBatch ? items : item;
    Modal.confirm({
      title,
      content: confirmContext,
      okText,
      cancelText,
      confirmLoading: this.state.loading,
      onOk: () => this.onConfirmOK(data, onSubmit),
      onCancel() { },
    });
  }

  onConfirmOK = (data, onSubmit) => {
    return new Promise((resolve, reject) => {
      const result = onSubmit(data);
      if (result instanceof Promise) {
        result.then(res => {
          this.onShowSuccess();
          resolve();
        }, error => {
          reject(error);
        });
      }
      if (result) {
        this.onShowSuccess();
        resolve();
      } else {
        reject(result);
      }
    }).catch(error => {
      this.onShowError(error);
    });
  }

  onConfirmSubmit = (data, onSubmit) => {
    this.handleSubmitLoading(true);
    const result = onSubmit(data);
    if (result instanceof Promise) {
      result.then(res => {
        this.onShowSuccess();
      }, error => {
        this.onShowError(error);
      }).finally(() => {
        this.handleSubmitLoading();
      });
    } else {
      this.handleSubmitLoading();
      if (result) {
        this.onShowSuccess();
      } else {
        this.onShowError(result);
      }
    }
  }

  checkFormItems() {
    const { formItems } = this.props;
    let result = true;
    const ids = [];
    formItems.forEach(it => {
      if (!it.id || ids.includes(it.id)) {
        result = false;
      } else {
        ids.push(it.id);
      }
    });
    return result;
  }

  render() {
    const { isAllowed, needHide, isStep, buttonType,
      buttonClassName, title, name, id } = this.props;
    if (!isAllowed && needHide) {
      return null;
    }

    let modal = null;
    if (!isStep) {
      const { formItems } = this.props;
      const modalProps = {
        title,
        visible: this.state.visible,
        onCancel: this.onCancel,
        key: `modal-${id}-${updateKey()}`,
        onSubmit: this.onSubmit,
        formItems,
      };
      modal = <SimpleModal {...modalProps} />;
    } else {
      const { rightContext, steps, initialValues } = this.props;
      const modalProps = {
        title,
        visible: this.state.visible,
        onSubmit: this.onSubmit,
        onCancel: this.onCancel,
        key: `step-modal-${id}-${updateKey()}`,
        steps,
        initialValues,
        rightContext,
      };
      modal = <StepModal {...modalProps} />
    }
    return (
      <>
        <Button
          type={buttonType}
          onClick={this.onClick}
          key={id}
          disabled={!isAllowed}
          className={buttonClassName}
        >
          {name || title}
        </Button>
        {modal}
      </>
    );
  }
}

export default TableAction;
