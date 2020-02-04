import React, { PureComponent } from 'react';
import TableAction from '@/components/Actions/TableAction';

// const wrapper = Form.create()(CreateForm);

export default class Action4 extends PureComponent {
  render() {
    const formItems = [
      {
        type: 'input',
        label: 'name',
        placeholder: 'please input',
        id: 'name',
        rules: [
          {
            required: true,
            message: '请输入至少五个字符的规则描述！',
            min: 5,
          },
        ],
      },
    ]

    const handleSubmit = values => {
      console.log(values);
      return true;
    }

    const config = {
      title: 'action4-submit-true',
      formItems,
      onSubmit: handleSubmit,
      allowed: true,
      id: 'action4',
      name: 'action4',
    };

    return (
      <TableAction {...config}>

      </TableAction>
    );
  }
}
