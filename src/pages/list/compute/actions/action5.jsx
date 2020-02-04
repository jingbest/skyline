import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import TableAction from '@/components/Actions/TableAction';

// const wrapper = Form.create()(CreateForm);

export default class Action5 extends PureComponent {
  render() {
    const formItems = [
      {
        type: 'button-checks',
        label: 'name',
        id: 'name',
        rules: [
          {
            required: true,
            message: '请输入至少五个字符的规则描述！',
          },
        ],
        titleMap: [
          { id: 1, value: 1, name: 'name1' },
          { id: 2, value: 2, name: 'name2' },
          { id: 3, value: 3, name: 'name3' },
          { id: 4, value: 4, name: 'name4' },
          { id: 5, value: 5, name: 'name5' },
          { id: 6, value: 6, name: 'name6' },
        ],
        onChange: value => {
          console.log(value);
        },
        isMulti: true,
        icon: <Icon type="apartment" />,
        initialValue: [{ id: 2 }, { id: 1 }],
      },
    ]

    const handleSubmit = values => {
      console.log(values);
      return true;
    }

    const config = {
      title: 'action5',
      formItems,
      onSubmit: handleSubmit,
      allowed: true,
      id: 'action5',
      name: 'action5',
    };

    return (
      <TableAction {...config}>

      </TableAction>
    );
  }
}
