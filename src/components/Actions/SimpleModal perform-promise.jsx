import React from 'react';
import { Modal, Form, Spin } from 'antd';
import { gettext } from 'ttag';
import ActionFormItem from './ActionFormItem';

function SimpleModal(props) {
  const { title, visible, onCancel, onSubmit, model, modalLoading,
    okText = gettext('Confirm'),
    cancelText = gettext('Cancel') } = props;

  const getInitValue = (key, config) => {
    const initValue = config.initialValue || (model && model[key]) || null;
    if (initValue === null) {
      return null;
    }
    return {
      initialValue: initValue,
    }
  }

  const { formItems = [], form } = props;
  const items = formItems.map(it => {
    const config = {
      ...it,
    }
    const initValue = getInitValue(it.id, it, form);
    if (initValue) {
      config.initialValue = initValue.initialValue;
    }
    return (
      <ActionFormItem form={form} {...config} key={config.id} />
    )
  });

  let display = null;
  // const values = form.getFieldsValue();
  // display = Object.keys(values).map(it => {
  //   return (
  //     <h4 key={it}>{it}: {values[it]}</h4>
  //   );
  // });

  const handleOK = () => {
    form.validateFields((err, values) => {
      if (err) {
        console.log('Values has error: ', err);
        return;
      }
      console.log('Received values of form: ', values);
      if (onSubmit) {
        onSubmit(values);
      }
    });
  }

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={visible}
      onOk={handleOK}
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

export default Form.create()(SimpleModal);
