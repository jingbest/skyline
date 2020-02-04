import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import TableAction from '@/components/Actions/TableAction';

// const wrapper = Form.create()(CreateForm);

export default class Action7 extends PureComponent {
  render() {
    const formItems = [
      {
        type: 'slider',
        label: 'name',
        id: 'name',
        rules: [
          {
            required: true,
            message: '请输入至少五个字符的规则描述！',
          },
          // {
          //   type: 'number',
          //   message: '请输入数字',
          // },
          // {
          //   validator: (rule, value, callback) => {
          //     console.log('validator', value, rule);
          //     const { getFieldValue } = this.props.form;
          //     if (value < 20 || value > 100) {
          //       callback('两次输入不一致！')
          //     }

          //     // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
          //     callback()
          //   },
          // },
        ],
        min: 20,
        max: 100,
        minLabel: '20G',
        maxLabel: '100G',
        onChange: value => {
          console.log(value);
        },
        initialValue: 35,
      },
    ]

    const handleSubmit = values => {
      console.log(values);
      return true;
    }

    const config = {
      title: 'action7',
      formItems,
      onSubmit: handleSubmit,
      allowed: true,
      id: 'action7',
      name: 'action7',
    };

    return (
      <TableAction {...config}>

      </TableAction>
    );
  }
}
