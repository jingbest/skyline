import React, { PureComponent } from 'react';
import { Modal, Form, Spin } from 'antd';
import { gettext } from 'ttag';
import FormItem from '@/components/FormItem';

class SimpleModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formItems: [],
    }
  }

  static getDerivedStateFromProps(props) {
    const { formItems = [] } = props;
    return {
      formItems,
    }
  }

  handleOK = () => {
    const { form, onSubmit } = this.props;
    const { model } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        console.log('Values has error: ', err);
        return;
      }
      console.log('Received values of form: ', values);
      if (onSubmit) {
        onSubmit({
          ...model,
          values,
        });
      }
    });
  }

  getInitValue = (model, key, config) => {
    if ('initialValue' in config) {
      return config.initialValue;
    }
    if (key in model) {
      return model[key];
    }
    return null;
  }

  updateModel = (id, value) => {
    this.props.model[id] = value;
  }

  renderFormItem = itemConfig => {
    const { model, form } = this.props;
    const { id } = itemConfig;
    const initialValue = this.getInitValue(model, id, itemConfig);
    const config = {
      ...itemConfig,
      initialValue,
    }
    // config.initialValue = this.getInitValue(model, id, itemConfig);
    return (
      <FormItem form={form} {...config} key={id} updateModel={this.updateModel} model={model}/>
    )
  }

  render() {
    const { title, visible, onCancel, modalLoading,
      okText = gettext('Confirm'),
      cancelText = gettext('Cancel') } = this.props;

    const { formItems } = this.state;
    const items = formItems.map(it => this.renderFormItem(it));

    let display = null;
    // const values = form.getFieldsValue();
    // display = Object.keys(values).map(it => {
    //   return (
    //     <h4 key={it}>{it}: {values[it]}</h4>
    //   );
    // });

    return (
      <Modal
        width={580}
        destroyOnClose
        maskClosable={false}
        title={title}
        visible={visible}
        onOk={this.handleOK}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >
        <Spin spinning={modalLoading}>
          {items}
          {display}
        </Spin>

      </Modal>
    )
  }
}

export default Form.create()(SimpleModal);
