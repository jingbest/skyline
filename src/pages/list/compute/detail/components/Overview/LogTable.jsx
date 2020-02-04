import React from 'react';
import SimpleTable from '@/components/SimpleTable';
import { Table } from 'antd';

export default function Volumn(props) {
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

  const { item: { volumes } } = props;
  return (
    <SimpleTable
      columns={columns}
      dataSource={volumes}
    />
  )
}
