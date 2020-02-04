import React, { PureComponent } from 'react';
import StandardTable from '@/components/StandardTable';

export default class Logs extends PureComponent {
  render() {
    const columns = [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Name',
      },
      {
        key: 'id',
        dataIndex: 'id',
        title: 'ID',
      },
      {
        key: 'size',
        dataIndex: 'size',
        title: 'Size',
        render: val => (`${val}G`),
      },
      {
        key: 'status',
        dataIndex: 'status',
        title: 'Status',
      },
      {
        key: 'type',
        dataIndex: 'volume_type',
        title: 'Type',
        render: val => val.name,
      },
    ];
    const { item: { volumes } } = this.props;
    return (
      <StandardTable
        columns={columns}
        datas={volumes}
        canSelect={false}
      />
    )
  }
}
