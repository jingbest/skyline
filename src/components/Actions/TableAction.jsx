import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { gettext } from 'ttag';
import notification from '../notification';
import updateKey from '@/utils/updateKey';
import SimpleModal from './SimpleModal';
import StepModal from './StepModal';

// import types from './actionTypes';

async function getPerform(perform, item) {
  if (perform instanceof Promise) {
    const result = await perform(item);
    return result;
  }
  return perform(item);
}

class TableAction extends PureComponent {
  static defaultProps = {
    item: undefined,
    isAllowed: false,
    confirm: false,
    // formItems: [],
    steps: [],
    confirmContext: '',
    needHide: true,
    isStep: false,
    buttonType: 'link',
    items: [],
    isBatch: false,
    // submitSuccessMsg: gettext('Success'),
    // submitErrorMsg: gettext('Error'),
  }

  static propTypes() {
    return {
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      perform: PropTypes.func.isRequired,
      item: PropTypes.object,
      // formItems: PropTypes.array,
      confirm: PropTypes.bool,
      // type: PropTypes.string,
      icon: PropTypes.string,
      isAllowed: PropTypes.bool,
      // onSubmit: PropTypes.func,
      // submitSuccessMsg: PropTypes.string,
      // submitErrorMsg: PropTypes.string,
      // alertMsg: PropTypes.string,
      // confirmMsg: PropTypes.string,
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
    const { id } = props;
    if (!id) {
      throw Error('need id');
    }
    // if (formItems.length && confirm && steps) {
    //   throw Error('form, confirm, steps can not exist together');
    // }
    // if (!formItems.length && !confirm && !steps) {
    //   throw Error('form, confirm, steps must exist one');
    // }
    // if (!this.checkFormItems()) {
    //   throw Error('formItems must has unique id');
    // }
    this.modal = null;
    this.formItems = null;
  }

  state = {
    visible: false,
    submitLoading: false,
    modalLoading: false,
    config: null,
  };

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
    // this.onCallback();
  }

  handleModalVisible = flag => {
    this.setState({
      visible: !!flag,
      config: null,
    });
    if (flag) {
      this.setState({
        modalLoading: true,
      }, () => {
        this.updateConfig();
      });
    }
  }

  handlePerformLoading = flag => {
    const { handleActionLoading } = this.props;
    if (handleActionLoading) {
      handleActionLoading(flag);
    }
  }

  updateConfig = async () => {
    const { visible } = this.state;
    if (!visible) {
      return;
    }
    const { confirm, isAllowed, perform, isBatch, item, items } = this.props;
    if (confirm || !isAllowed) {
      return;
    }
    const data = isBatch ? items : item;
    this.handlePerformLoading(true);
    const config = await getPerform(perform, data);
    this.setState({
      config,
    }, () => {
      this.handlePerformLoading(false);
      this.handleModalLoading(false);
    });
  }

  handleSubmitLoading = flag => {
    this.setState({
      submitLoading: !!flag,
    })
  }

  handleModalLoading = flag => {
    this.setState({
      modalLoading: !!flag,
    })
  }

  handleSubmit = values => {
    const { item, isBatch, items } = this.props;
    if (!this.onSubmit) return;
    this.handleSubmitLoading(true);
    const data = isBatch ? items : item;
    const result = this.onSubmit(values, data);
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
    const { submitSuccessMsg = gettext('Success') } = this.labels;
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
    const title = (error && error.message) || gettext('Error');
    if (this.formItems && this.formItems.length > 0) {
      Modal.error({
        title,
      });
    } else {
      notification.error(title);
      this.onCallback();
    }
  }

  onShowConfirm = () => {
    const { perform, isBatch, item, items } = this.props;
    const data = isBatch ? items : item;
    const { labels, onSubmit } = perform(data);
    const { title } = labels;
    this.labels = labels;
    const {
      okText = gettext('Confirm'),
      cancelText = gettext('Cancel'),
      confirmContext = '',
    } = this.labels;
    Modal.confirm({
      title,
      content: confirmContext,
      okText,
      cancelText,
      confirmLoading: this.state.submitLoading,
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

  renderModal = () => {
    const { confirm, isAllowed, isStep, id } = this.props;
    const { visible, modalLoading, config } = this.state;
    if (!visible || confirm || !isAllowed) {
      return null;
    }
    if (!config) {
      return null;
      return <SimpleModal modalLoading={modalLoading} visible={visible}/>
    }
    const { formItems, labels, onSubmit, model } = config;
    const { title } = labels;
    this.labels = labels;
    this.onSubmit = onSubmit;
    this.formItems = formItems;
    if (!isStep) {
      const modalProps = {
        title,
        visible,
        onCancel: this.onCancel,
        key: `modal-${id}-${updateKey()}`,
        onSubmit: this.handleSubmit,
        formItems,
        model,
        modalLoading,
      };
      return <SimpleModal {...modalProps} />;
    }
    const { rightContext, steps, initialValues } = this.props;
    const modalProps = {
      title: this.title,
      visible: this.state.visible,
      onSubmit: this.handleSubmit,
      onCancel: this.onCancel,
      key: `step-modal-${id}-${updateKey()}`,
      steps,
      initialValues,
      rightContext,
    };
    return <StepModal {...modalProps} />
  }

  render() {
    const { isAllowed, needHide, buttonType,
      buttonClassName, name, id } = this.props;
    if (!isAllowed && needHide) {
      return null;
    }

    const modal = this.renderModal();
    return (
      <>
        <Button
          type={buttonType}
          onClick={this.onClick}
          key={id}
          disabled={!isAllowed}
          className={buttonClassName}
        >
          {name}
        </Button>
        {modal}
      </>
    );
  }
}

export default TableAction;
